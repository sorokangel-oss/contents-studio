<?php
/**
 * AURORANIK PORTFOLIO - SERVER CONFIG
 * 실제 서버 저장 경로를 정의합니다. 도메인이 변경되면 BASE_URL만 수정하세요.
 */

// 사이트 절대 경로 (마지막에 슬래시 포함)
define('BASE_URL', 'https://sorok1234.cafe24.com/auroranik-landing/');

// 서버 내부 실제 폴더 경로 (이 config.php 기준 상위 폴더)
define('ROOT_DIR', dirname(__DIR__) . '/');
define('DATA_DIR', ROOT_DIR . 'data/');
define('IMAGES_DIR', ROOT_DIR . 'assets/images/');
define('VIDEOS_DIR', ROOT_DIR . 'assets/videos/');

// 브라우저에서 접근할 URL 경로
define('IMAGES_URL', BASE_URL . 'assets/images/');
define('VIDEOS_URL', BASE_URL . 'assets/videos/');

// 필요한 폴더가 없으면 자동 생성
foreach ([DATA_DIR, IMAGES_DIR, VIDEOS_DIR] as $dir) {
  if (!is_dir($dir)) {
    @mkdir($dir, 0755, true);
  }
}
