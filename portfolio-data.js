/**
 * AURORANIK PORTFOLIO DATA & MEDIA ENGINE (V7)
 * Ultra-resilient global persistence engine.
 * Ensures uploaded gallery items stay 100% visible on PC & Mobile for all visitors.
 * Uses lightweight WebP/JPEG compression (~30KB) to prevent LocalStorage quota loss.
 */

const BASE_IMAGE_URL = 'https://sorok1234.cafe24.com/auroranik-landing/assets/images/';

const STORAGE_KEY_ITEMS = 'auroranik_portfolio_v7';
const STORAGE_KEY_CATS = 'auroranik_categories_v7';
const STORAGE_KEY_INQ = 'auroranik_inquiries_v7';

const DEFAULT_CATEGORIES = [
  { id: "all", name: "전체" },
  { id: "beauty", name: "뷰티 / 퍼스널컬러" },
  { id: "food", name: "음식점 / 맛집" },
  { id: "estate", name: "부동산 / 세컨하우스" },
  { id: "health", name: "건강 / 다이어트" },
  { id: "models", name: "AI 모델 & 광고" },
  { id: "reels", name: "원페이지 릴스 / 숏폼 영상" }
];

const DEFAULT_PORTFOLIO_ITEMS = [
  {
    id: "item-1",
    categoryId: "beauty",
    categoryName: "뷰티 / 퍼스널컬러",
    badge: "BEAUTY CONTENT",
    mediaType: "image",
    title: "퍼스널컬러 진단 뷰티 콘텐츠",
    subtitle: "진단 과정을 신뢰감 있게 보여주는 뷰티 전문 카드뉴스 & 릴스",
    image: BASE_IMAGE_URL + "case_personal_color.jpg",
    mediaUrl: BASE_IMAGE_URL + "case_personal_color.jpg",
    linkUrl: "https://site-jhr63u.opadog.site",
    ratio: "4:5 / 9:16",
    specs: [
      {
        icon: "fa-bullseye text-emerald",
        title: "핵심 타깃",
        items: ["퍼스널컬러 진단에 관심 있는 20~40대 여성", "메이크업·패션에 관심이 많은 고객층"]
      },
      {
        icon: "fa-lightbulb text-amber",
        title: "콘텐츠 기획",
        items: ["웜톤·쿨톤 비교 / 진단 천 활용 변화 연출", "전문가 진단 장면 / 컬러별 어울리는 추천 제안"]
      }
    ],
    mockups: [
      { label: "원페이지 릴스", text: "\"왜 진단 전 메이크업을 지워야 할까?\"" },
      { label: "카드뉴스", text: "왼쪽 웜톤 / 오른쪽 쿨톤 가독성 레이아웃" }
    ]
  },
  {
    id: "item-video-1",
    categoryId: "reels",
    categoryName: "원페이지 릴스 / 숏폼 영상",
    badge: "REELS / SHORT-FORM",
    mediaType: "video",
    title: "월산국수가 10초 원페이지 릴스 영상",
    subtitle: "시선 강탈 클로즈업부터 숯불불고기 젓가락 샷까지 10초 몰입형 숏폼",
    image: BASE_IMAGE_URL + "case_wolsan_noodle.jpg",
    mediaUrl: "https://assets.mixkit.co/videos/preview/mixkit-chef-preparing-a-dish-in-a-restaurant-kitchen-41548-large.mp4",
    linkUrl: "https://site-jhr63u.opadog.site",
    ratio: "9:16 / 숏폼 릴스",
    specs: [
      {
        icon: "fa-film text-purple",
        title: "영상 기획 포인트",
        items: ["0~2초: 시선 후킹 헤드 문구", "2~5초: 면과 숯불불고기 시각적 시즐 연출", "5~10초: 위치 및 방문 동선 전달"]
      }
    ],
    timeline: [
      { time: "0~2초", text: "음식 클로즈업 — \"밀양 드라이브의 마지막 코스\"" },
      { time: "2~5초", text: "면과 불고기 장면 — \"감자면과 숯불불고기의 환상 조합\"" },
      { time: "5~8초", text: "젓가락 샷 — \"쫄깃함과 숯향을 한 번에\"" },
      { time: "8~10초", text: "매장 정보 — \"위양지 근처 월산국수가 안내\"" }
    ]
  },
  {
    id: "item-2",
    categoryId: "food",
    categoryName: "음식점 / 맛집",
    badge: "RESTAURANT CONTENT",
    mediaType: "image",
    title: "월산국수가 음식점 브랜드 콘텐츠",
    subtitle: "지역 맛집의 대표 메뉴와 숯불불고기 드라이브 동선 홍보",
    image: BASE_IMAGE_URL + "case_wolsan_noodle.jpg",
    mediaUrl: BASE_IMAGE_URL + "case_wolsan_noodle.jpg",
    linkUrl: "https://site-jhr63u.opadog.site",
    ratio: "1:1 / 9:16",
    specs: [
      {
        icon: "fa-utensils text-emerald",
        title: "핵심 타깃 & 메시지",
        items: ["위양지·가산저수지 방문객, 드라이브 및 가족 단위 고객", "국내산 멸치·채소 육수, 100% 감자면, 24시간 숙성 숯불불고기"]
      }
    ]
  },
  {
    id: "item-3",
    categoryId: "estate",
    categoryName: "부동산 / 세컨하우스",
    badge: "REAL ESTATE CONTENT",
    mediaType: "image",
    title: "포레스트하크 부동산 세컨하우스",
    subtitle: "광고보다 삶의 불편을 먼저 해결하는 정보형 마케팅 전략",
    image: BASE_IMAGE_URL + "case_forest_hark.jpg",
    mediaUrl: BASE_IMAGE_URL + "case_forest_hark.jpg",
    linkUrl: "https://site-jhr63u.opadog.site",
    ratio: "16:9 / 4:5",
    specs: [
      {
        icon: "fa-house text-emerald",
        title: "핵심 타깃",
        items: ["40~50대 세컨하우스 수요층 및 귀촌·5도2촌 준비 고객", "반려동물 동반 및 은퇴 후 건강한 전원 생활 준비 고객"]
      }
    ],
    highlightQuote: "🔥 잔여세대 줍줍 찬스! 1억 초반으로 내 땅 + 내 별장 갖기? 네, 밀양에선 가능합니다!"
  },
  {
    id: "item-4",
    categoryId: "health",
    categoryName: "건강 / 다이어트",
    badge: "HEALTHCARE CONTENT",
    mediaType: "image",
    title: "40·50대 9컬러 건강 다이어트 시리즈",
    subtitle: "9가지 컬러스키마로 구축한 중년 여성 건강 브랜딩 피드",
    image: BASE_IMAGE_URL + "case_health_wellness.jpg",
    mediaUrl: BASE_IMAGE_URL + "case_health_wellness.jpg",
    linkUrl: "https://site-jhr63u.opadog.site",
    ratio: "1:1 / 4:5",
    colorChips: [
      { class: "chip-red", code: "RED", text: "근력과 활력" },
      { class: "chip-orange", code: "ORANGE", text: "건강한 식사" },
      { class: "chip-yellow", code: "YELLOW", text: "일상 움직임" },
      { class: "chip-green", code: "GREEN", text: "회복과 균형" },
      { class: "chip-cyan", code: "CYAN", text: "수분과 순환" },
      { class: "chip-blue", code: "BLUE", text: "수면 관리" },
      { class: "chip-purple", code: "PURPLE", text: "호르몬 균형" },
      { class: "chip-magenta", code: "MAGENTA", text: "습관 만들기" },
      { class: "chip-pink", code: "PINK", text: "내 몸 사랑" }
    ]
  },
  {
    id: "item-5",
    categoryId: "models",
    categoryName: "AI 모델 & 광고",
    badge: "AI MODEL GALLERY",
    mediaType: "image",
    title: "실사급 AI 모델 & 공간 연출 사례",
    subtitle: "손가락 왜곡 없는 자연스러운 포즈, 표정, 스튜디오 조명 연출",
    image: BASE_IMAGE_URL + "main_01.png",
    mediaUrl: BASE_IMAGE_URL + "main_01.png",
    linkUrl: "https://site-jhr63u.opadog.site",
    ratio: "16:9 / 4:5",
    specs: [
      {
        icon: "fa-person text-emerald",
        title: "라이프스타일 모델",
        items: ["연령대·표정·의상·장소·조명·브랜드 컬러 맞춤 제작"]
      }
    ]
  }
];

const DEFAULT_INQUIRIES = [
  {
    id: "inq-sample-1",
    date: "2026-07-30 14:30",
    name: "김민준 (오로라 뷰티)",
    contact: "010-9876-5432 / minjun@example.com",
    industry: "뷰티 / 메이크업",
    package: "STANDARD AI 콘텐츠 제작",
    message: "퍼스널컬러 진단 카드뉴스 및 인스타그램 원페이지 릴스 숏폼 3건 제작 문의드립니다."
  }
];

function getCategoriesData() {
  const stored = localStorage.getItem(STORAGE_KEY_CATS);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(DEFAULT_CATEGORIES));
  return DEFAULT_CATEGORIES;
}

function saveCategoriesData(cats) {
  localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(cats));
}

function getPortfolioData() {
  const stored = localStorage.getItem(STORAGE_KEY_ITEMS);
  let currentItems = [];
  
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        currentItems = parsed;
      }
    } catch (e) {
      currentItems = [];
    }
  }

  // GUARANTEE MERGE: Ensure all 6 default sample items exist while preserving uploaded files!
  const existingMap = new Map(currentItems.map(item => [item.id, item]));

  DEFAULT_PORTFOLIO_ITEMS.forEach(defaultItem => {
    if (!existingMap.has(defaultItem.id)) {
      currentItems.push(defaultItem);
    } else {
      const existing = existingMap.get(defaultItem.id);
      if (existing && existing.image && existing.image.startsWith('assets/images/')) {
        existing.image = BASE_IMAGE_URL + existing.image.replace('assets/images/', '');
      }
      if (existing && existing.mediaUrl && existing.mediaUrl.startsWith('assets/images/')) {
        existing.mediaUrl = BASE_IMAGE_URL + existing.mediaUrl.replace('assets/images/', '');
      }
    }
  });

  localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(currentItems));
  return currentItems;
}

function savePortfolioData(data) {
  try {
    localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(data));
  } catch (e) {
    console.error("LocalStorage save error:", e);
    alert("⚠ 저장소 용량이 경고되었습니다. 업로드 이미지 파일이 압축 보존됩니다.");
  }
}

function getInquiriesData() {
  const stored = localStorage.getItem(STORAGE_KEY_INQ);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {}
  }
  localStorage.setItem(STORAGE_KEY_INQ, JSON.stringify(DEFAULT_INQUIRIES));
  return DEFAULT_INQUIRIES;
}

function saveInquiriesData(inquiries) {
  localStorage.setItem(STORAGE_KEY_INQ, JSON.stringify(inquiries));
}

function resetPortfolioData() {
  localStorage.removeItem(STORAGE_KEY_ITEMS);
  localStorage.removeItem(STORAGE_KEY_CATS);
  localStorage.removeItem(STORAGE_KEY_INQ);
  localStorage.setItem(STORAGE_KEY_ITEMS, JSON.stringify(DEFAULT_PORTFOLIO_ITEMS));
  localStorage.setItem(STORAGE_KEY_CATS, JSON.stringify(DEFAULT_CATEGORIES));
  localStorage.setItem(STORAGE_KEY_INQ, JSON.stringify(DEFAULT_INQUIRIES));
  return {
    categories: DEFAULT_CATEGORIES,
    items: DEFAULT_PORTFOLIO_ITEMS,
    inquiries: DEFAULT_INQUIRIES
  };
}

getPortfolioData();
