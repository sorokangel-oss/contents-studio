<?php
/**
 * AURORANIK PORTFOLIO - DEFAULT SEED DATA
 * 최초 실행 시(또는 "샘플 복원" 클릭 시) 사용되는 기본 6종 포트폴리오 데이터입니다.
 * 기존 portfolio-data.js(V7)의 DEFAULT_* 데이터와 동일한 내용을 유지합니다.
 */

require_once __DIR__ . '/config.php';

$__BASE_IMG = IMAGES_URL;

$DEFAULT_CATEGORIES = [
  ["id" => "all", "name" => "전체"],
  ["id" => "beauty", "name" => "뷰티 / 퍼스널컬러"],
  ["id" => "food", "name" => "음식점 / 맛집"],
  ["id" => "estate", "name" => "부동산 / 세컨하우스"],
  ["id" => "health", "name" => "건강 / 다이어트"],
  ["id" => "models", "name" => "AI 모델 & 광고"],
  ["id" => "reels", "name" => "원페이지 릴스 / 숏폼 영상"]
];

$DEFAULT_ITEMS = [
  [
    "id" => "item-1",
    "categoryId" => "beauty",
    "categoryName" => "뷰티 / 퍼스널컬러",
    "badge" => "BEAUTY CONTENT",
    "mediaType" => "image",
    "title" => "퍼스널컬러 진단 뷰티 콘텐츠",
    "subtitle" => "진단 과정을 신뢰감 있게 보여주는 뷰티 전문 카드뉴스 & 릴스",
    "image" => $__BASE_IMG . "case_personal_color.jpg",
    "mediaUrl" => $__BASE_IMG . "case_personal_color.jpg",
    "linkUrl" => "https://site-jhr63u.opadog.site",
    "ratio" => "4:5 / 9:16",
    "specs" => [
      [
        "icon" => "fa-bullseye text-emerald",
        "title" => "핵심 타깃",
        "items" => ["퍼스널컬러 진단에 관심 있는 20~40대 여성", "메이크업·패션에 관심이 많은 고객층"]
      ],
      [
        "icon" => "fa-lightbulb text-amber",
        "title" => "콘텐츠 기획",
        "items" => ["웜톤·쿨톤 비교 / 진단 천 활용 변화 연출", "전문가 진단 장면 / 컬러별 어울리는 추천 제안"]
      ]
    ],
    "mockups" => [
      ["label" => "원페이지 릴스", "text" => "\"왜 진단 전 메이크업을 지워야 할까?\""],
      ["label" => "카드뉴스", "text" => "왼쪽 웜톤 / 오른쪽 쿨톤 가독성 레이아웃"]
    ]
  ],
  [
    "id" => "item-video-1",
    "categoryId" => "reels",
    "categoryName" => "원페이지 릴스 / 숏폼 영상",
    "badge" => "REELS / SHORT-FORM",
    "mediaType" => "video",
    "title" => "월산국수가 10초 원페이지 릴스 영상",
    "subtitle" => "시선 강탈 클로즈업부터 숯불불고기 젓가락 샷까지 10초 몰입형 숏폼",
    "image" => $__BASE_IMG . "case_wolsan_noodle.jpg",
    "mediaUrl" => "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-restaurant-kitchen-41548-large.mp4",
    "linkUrl" => "https://site-jhr63u.opadog.site",
    "ratio" => "9:16 / 숏폼 릴스",
    "specs" => [
      [
        "icon" => "fa-film text-purple",
        "title" => "영상 기획 포인트",
        "items" => ["0~2초: 시선 후킹 헤드 문구", "2~5초: 면과 숯불불고기 시각적 시즐 연출", "5~10초: 위치 및 방문 동선 전달"]
      ]
    ],
    "timeline" => [
      ["time" => "0~2초", "text" => "음식 클로즈업 — \"밀양 드라이브의 마지막 코스\""],
      ["time" => "2~5초", "text" => "면과 불고기 장면 — \"감자면과 숯불불고기의 환상 조합\""],
      ["time" => "5~8초", "text" => "젓가락 샷 — \"쫄깃함과 숯향을 한 번에\""],
      ["time" => "8~10초", "text" => "매장 정보 — \"위양지 근처 월산국수가 안내\""]
    ]
  ],
  [
    "id" => "item-2",
    "categoryId" => "food",
    "categoryName" => "음식점 / 맛집",
    "badge" => "RESTAURANT CONTENT",
    "mediaType" => "image",
    "title" => "월산국수가 음식점 브랜드 콘텐츠",
    "subtitle" => "지역 맛집의 대표 메뉴와 숯불불고기 드라이브 동선 홍보",
    "image" => $__BASE_IMG . "case_wolsan_noodle.jpg",
    "mediaUrl" => $__BASE_IMG . "case_wolsan_noodle.jpg",
    "linkUrl" => "https://site-jhr63u.opadog.site",
    "ratio" => "1:1 / 9:16",
    "specs" => [
      [
        "icon" => "fa-utensils text-emerald",
        "title" => "핵심 타깃 & 메시지",
        "items" => ["위양지·가산저수지 방문객, 드라이브 및 가족 단위 고객", "국내산 멸치·채소 육수, 100% 감자면, 24시간 숙성 숯불불고기"]
      ]
    ]
  ],
  [
    "id" => "item-3",
    "categoryId" => "estate",
    "categoryName" => "부동산 / 세컨하우스",
    "badge" => "REAL ESTATE CONTENT",
    "mediaType" => "image",
    "title" => "포레스트하크 부동산 세컨하우스",
    "subtitle" => "광고보다 삶의 불편을 먼저 해결하는 정보형 마케팅 전략",
    "image" => $__BASE_IMG . "case_forest_hark.jpg",
    "mediaUrl" => $__BASE_IMG . "case_forest_hark.jpg",
    "linkUrl" => "https://site-jhr63u.opadog.site",
    "ratio" => "16:9 / 4:5",
    "specs" => [
      [
        "icon" => "fa-house text-emerald",
        "title" => "핵심 타깃",
        "items" => ["40~50대 세컨하우스 수요층 및 귀촌·5도2촌 준비 고객", "반려동물 동반 및 은퇴 후 건강한 전원 생활 준비 고객"]
      ]
    ],
    "highlightQuote" => "🔥 잔여세대 줍줍 찬스! 1억 초반으로 내 땅 + 내 별장 갖기? 네, 밀양에선 가능합니다!"
  ],
  [
    "id" => "item-4",
    "categoryId" => "health",
    "categoryName" => "건강 / 다이어트",
    "badge" => "HEALTHCARE CONTENT",
    "mediaType" => "image",
    "title" => "40·50대 9컬러 건강 다이어트 시리즈",
    "subtitle" => "9가지 컬러스키마로 구축한 중년 여성 건강 브랜딩 피드",
    "image" => $__BASE_IMG . "case_health_wellness.jpg",
    "mediaUrl" => $__BASE_IMG . "case_health_wellness.jpg",
    "linkUrl" => "https://site-jhr63u.opadog.site",
    "ratio" => "1:1 / 4:5",
    "colorChips" => [
      ["class" => "chip-red", "code" => "RED", "text" => "근력과 활력"],
      ["class" => "chip-orange", "code" => "ORANGE", "text" => "건강한 식사"],
      ["class" => "chip-yellow", "code" => "YELLOW", "text" => "일상 움직임"],
      ["class" => "chip-green", "code" => "GREEN", "text" => "회복과 균형"],
      ["class" => "chip-cyan", "code" => "CYAN", "text" => "수분과 순환"],
      ["class" => "chip-blue", "code" => "BLUE", "text" => "수면 관리"],
      ["class" => "chip-purple", "code" => "PURPLE", "text" => "호르몬 균형"],
      ["class" => "chip-magenta", "code" => "MAGENTA", "text" => "습관 만들기"],
      ["class" => "chip-pink", "code" => "PINK", "text" => "내 몸 사랑"]
    ]
  ],
  [
    "id" => "item-5",
    "categoryId" => "models",
    "categoryName" => "AI 모델 & 광고",
    "badge" => "AI MODEL GALLERY",
    "mediaType" => "image",
    "title" => "실사급 AI 모델 & 공간 연출 사례",
    "subtitle" => "손가락 왜곡 없는 자연스러운 포즈, 표정, 스튜디오 조명 연출",
    "image" => $__BASE_IMG . "main_01.png",
    "mediaUrl" => $__BASE_IMG . "main_01.png",
    "linkUrl" => "https://site-jhr63u.opadog.site",
    "ratio" => "16:9 / 4:5",
    "specs" => [
      [
        "icon" => "fa-person text-emerald",
        "title" => "라이프스타일 모델",
        "items" => ["연령대·표정·의상·장소·조명·브랜드 컬러 맞춤 제작"]
      ]
    ]
  ]
];

$DEFAULT_INQUIRIES = [
  [
    "id" => "inq-sample-1",
    "date" => "2026-07-30 14:30",
    "name" => "김민준 (오로라 뷰티)",
    "contact" => "010-9876-5432 / minjun@example.com",
    "industry" => "뷰티 / 메이크업",
    "package" => "STANDARD AI 콘텐츠 제작",
    "message" => "퍼스널컬러 진단 카드뉴스 및 인스타그램 원페이지 릴스 숏폼 3건 제작 문의드립니다."
  ]
];
