<?php
/**
 * AURORANIK PORTFOLIO - MEDIA UPLOAD API
 * 업로드된 이미지/영상 파일을 실제 서버(cafe24)의
 * assets/images/ 또는 assets/videos/ 폴더에 저장하고,
 * 모든 방문자가 접근 가능한 절대 URL을 반환합니다.
 */

require_once __DIR__ . '/config.php';

header('Content-Type: application/json; charset=utf-8');

function send_error($message, $code = 400) {
  http_response_code($code);
  echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  send_error('지원하지 않는 요청 방식입니다.', 405);
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] === UPLOAD_ERR_NO_FILE) {
  send_error('업로드할 파일이 없습니다.');
}

$file = $_FILES['file'];

if ($file['error'] !== UPLOAD_ERR_OK) {
  $uploadErrors = [
    UPLOAD_ERR_INI_SIZE => '서버 설정(upload_max_filesize)보다 파일이 큽니다.',
    UPLOAD_ERR_FORM_SIZE => '허용된 크기보다 파일이 큽니다.',
    UPLOAD_ERR_PARTIAL => '파일이 일부만 업로드되었습니다. 다시 시도해주세요.',
    UPLOAD_ERR_NO_TMP_DIR => '서버 임시 폴더가 없습니다.',
    UPLOAD_ERR_CANT_WRITE => '서버에 파일을 쓸 수 없습니다.',
  ];
  send_error($uploadErrors[$file['error']] ?? '파일 업로드 중 오류가 발생했습니다.', 500);
}

// 실제 파일 내용 기반으로 MIME 타입 검사 (확장자 위조 방지)
$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

$isImage = strpos($mimeType, 'image/') === 0;
$isVideo = strpos($mimeType, 'video/') === 0;

if (!$isImage && !$isVideo) {
  send_error('이미지 또는 동영상 파일만 업로드할 수 있습니다. (감지된 형식: ' . $mimeType . ')');
}

$ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedImageExt = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$allowedVideoExt = ['mp4', 'webm', 'mov', 'm4v'];

if ($isImage && !in_array($ext, $allowedImageExt, true)) {
  send_error('허용되지 않는 이미지 확장자입니다. (jpg, jpeg, png, webp, gif만 가능)');
}
if ($isVideo && !in_array($ext, $allowedVideoExt, true)) {
  send_error('허용되지 않는 동영상 확장자입니다. (mp4, webm, mov, m4v만 가능)');
}

// 용량 제한: 이미지 15MB, 영상 80MB
$maxSize = $isVideo ? 80 * 1024 * 1024 : 15 * 1024 * 1024;
if ($file['size'] > $maxSize) {
  $limitMb = round($maxSize / 1024 / 1024);
  send_error("파일 용량이 너무 큽니다. (최대 {$limitMb}MB)");
}

// 안전한 파일명 생성 (원본 파일명은 참고용으로만 사용)
// mbstring 확장이 없는 cafe24 환경에서도 안전하게 동작하도록 PCRE(u modifier)만 사용합니다.
$originalBase = pathinfo($file['name'], PATHINFO_FILENAME);
$safeBase = preg_replace('/[^a-zA-Z0-9가-힣_-]/u', '', $originalBase);
if ($safeBase === null) {
  $safeBase = ''; // preg_replace가 잘못된 UTF-8 등으로 실패한 경우 대비
}

if (function_exists('mb_substr')) {
  $safeBase = mb_substr($safeBase, 0, 40);
} else {
  $chars = preg_split('//u', $safeBase, -1, PREG_SPLIT_NO_EMPTY);
  $safeBase = ($chars !== false) ? implode('', array_slice($chars, 0, 40)) : substr($safeBase, 0, 60);
}

if ($safeBase === '') {
  $safeBase = $isVideo ? 'video' : 'image';
}
$uniqueName = date('Ymd_His') . '_' . substr(bin2hex(random_bytes(4)), 0, 8) . '_' . $safeBase . '.' . $ext;

$targetDir = $isVideo ? VIDEOS_DIR : IMAGES_DIR;
$targetUrl = $isVideo ? VIDEOS_URL : IMAGES_URL;
$targetPath = $targetDir . $uniqueName;

if (!move_uploaded_file($file['tmp_name'], $targetPath)) {
  send_error('서버에 파일을 저장하지 못했습니다. assets 폴더 쓰기 권한(755 또는 775)을 확인해주세요.', 500);
}

@chmod($targetPath, 0644);

echo json_encode([
  'success' => true,
  'url' => $targetUrl . $uniqueName,
  'mediaType' => $isVideo ? 'video' : 'image',
  'fileName' => $uniqueName
], JSON_UNESCAPED_UNICODE);
