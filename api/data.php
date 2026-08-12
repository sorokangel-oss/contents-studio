<?php
/**
 * AURORANIK PORTFOLIO - DATA API
 * GET  : 전체 데이터(items, categories, inquiries) 조회
 * POST : { action: 'save_items' | 'save_categories' | 'save_inquiries' | 'reset', ... } 저장
 *
 * 이 파일이 서버(cafe24)에서 정상 동작하면, 관리자가 업로드한 콘텐츠가
 * data/*.json 파일에 실제로 저장되어 어떤 방문자/기기에서도 동일하게 보입니다.
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/defaults.php';

header('Content-Type: application/json; charset=utf-8');

$ITEMS_FILE = DATA_DIR . 'items.json';
$CATS_FILE  = DATA_DIR . 'categories.json';
$INQ_FILE   = DATA_DIR . 'inquiries.json';

function read_json_file($path, $fallback) {
  if (file_exists($path)) {
    $raw = file_get_contents($path);
    $decoded = json_decode($raw, true);
    if (is_array($decoded)) {
      return $decoded;
    }
  }
  return $fallback;
}

function write_json_file($path, $data) {
  $fp = fopen($path, 'c+');
  if ($fp === false) {
    return false;
  }
  $ok = flock($fp, LOCK_EX);
  if ($ok) {
    ftruncate($fp, 0);
    rewind($fp);
    fwrite($fp, json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    fflush($fp);
    flock($fp, LOCK_UN);
  }
  fclose($fp);
  return $ok;
}

function send_error($message, $code = 400) {
  http_response_code($code);
  echo json_encode(['success' => false, 'error' => $message], JSON_UNESCAPED_UNICODE);
  exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
  $items = read_json_file($ITEMS_FILE, null);
  if ($items === null) {
    $items = $DEFAULT_ITEMS;
    write_json_file($ITEMS_FILE, $items);
  }

  $cats = read_json_file($CATS_FILE, null);
  if ($cats === null) {
    $cats = $DEFAULT_CATEGORIES;
    write_json_file($CATS_FILE, $cats);
  }

  $inq = read_json_file($INQ_FILE, null);
  if ($inq === null) {
    $inq = $DEFAULT_INQUIRIES;
    write_json_file($INQ_FILE, $inq);
  }

  echo json_encode([
    'items' => $items,
    'categories' => $cats,
    'inquiries' => $inq
  ], JSON_UNESCAPED_UNICODE);
  exit;
}

if ($method === 'POST') {
  $raw = file_get_contents('php://input');
  $body = json_decode($raw, true);

  if (!is_array($body) || !isset($body['action'])) {
    send_error('잘못된 요청입니다.');
  }

  switch ($body['action']) {
    case 'save_items':
      if (!isset($body['items']) || !is_array($body['items'])) {
        send_error('items 데이터가 필요합니다.');
      }
      if (!write_json_file($ITEMS_FILE, $body['items'])) {
        send_error('서버에 저장하지 못했습니다. 폴더 쓰기 권한을 확인해주세요.', 500);
      }
      echo json_encode(['success' => true]);
      break;

    case 'save_categories':
      if (!isset($body['categories']) || !is_array($body['categories'])) {
        send_error('categories 데이터가 필요합니다.');
      }
      if (!write_json_file($CATS_FILE, $body['categories'])) {
        send_error('서버에 저장하지 못했습니다. 폴더 쓰기 권한을 확인해주세요.', 500);
      }
      echo json_encode(['success' => true]);
      break;

    case 'save_inquiries':
      if (!isset($body['inquiries']) || !is_array($body['inquiries'])) {
        send_error('inquiries 데이터가 필요합니다.');
      }
      if (!write_json_file($INQ_FILE, $body['inquiries'])) {
        send_error('서버에 저장하지 못했습니다. 폴더 쓰기 권한을 확인해주세요.', 500);
      }
      echo json_encode(['success' => true]);
      break;

    case 'reset':
      write_json_file($ITEMS_FILE, $DEFAULT_ITEMS);
      write_json_file($CATS_FILE, $DEFAULT_CATEGORIES);
      write_json_file($INQ_FILE, $DEFAULT_INQUIRIES);
      echo json_encode([
        'success' => true,
        'items' => $DEFAULT_ITEMS,
        'categories' => $DEFAULT_CATEGORIES,
        'inquiries' => $DEFAULT_INQUIRIES
      ], JSON_UNESCAPED_UNICODE);
      break;

    default:
      send_error('알 수 없는 action 입니다: ' . $body['action']);
  }
  exit;
}

send_error('지원하지 않는 요청 방식입니다.', 405);
