/**
 * AURORANIK PORTFOLIO DATA & MEDIA ENGINE (V8 - SERVER SYNCED)
 * ------------------------------------------------------------------
 * V7까지는 브라우저 localStorage에 데이터를 저장해서,
 * 관리자가 올린 사진/영상이 "그 브라우저에서만" 보이는 문제가 있었습니다.
 *
 * V8부터는 서버(cafe24)의 PHP API(/api/data.php, /api/upload.php)를 통해
 * - 포트폴리오 데이터(카테고리/아이템/문의)는 서버의 JSON 파일에 저장되고
 * - 업로드한 이미지/영상 파일은 실제 assets/images, assets/videos 폴더에 저장됩니다.
 *
 * 그 결과 누가 언제 어디서(PC/모바일, 어떤 브라우저) 접속해도 동일한 콘텐츠가 보입니다.
 */

const BASE_IMAGE_URL = 'https://sorok1234.cafe24.com/auroranik-landing/assets/images/';

// index.html / admin.html 모두 같은 폴더에 있으므로 상대경로로 API를 호출합니다.
const API_BASE = 'api/';

let _cachedData = null;
let _pendingFetch = null;

async function _fetchAllData() {
  if (_cachedData) return _cachedData;
  if (_pendingFetch) return _pendingFetch;

  _pendingFetch = (async () => {
    try {
      const res = await fetch(API_BASE + 'data.php', { cache: 'no-store' });
      if (!res.ok) throw new Error('서버 응답 오류 (' + res.status + ')');
      const data = await res.json();
      _cachedData = {
        items: Array.isArray(data.items) ? data.items : [],
        categories: Array.isArray(data.categories) ? data.categories : [{ id: 'all', name: '전체' }],
        inquiries: Array.isArray(data.inquiries) ? data.inquiries : []
      };
      return _cachedData;
    } catch (e) {
      console.error('[AURORANIK] 서버 데이터 로드 실패:', e);
      alert('⚠ 서버(api/data.php)에서 포트폴리오 데이터를 불러오지 못했습니다.\n\napi 폴더가 서버에 올바르게 업로드되었는지, cafe24 호스팅이 PHP를 지원하는지 확인해주세요.');
      return { items: [], categories: [{ id: 'all', name: '전체' }], inquiries: [] };
    } finally {
      _pendingFetch = null;
    }
  })();

  return _pendingFetch;
}

function _invalidateCache() {
  _cachedData = null;
}

async function _postAction(action, payload) {
  try {
    const res = await fetch(API_BASE + 'data.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.assign({ action }, payload))
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok || !result.success) {
      throw new Error(result.error || ('서버 응답 오류 (' + res.status + ')'));
    }
    _invalidateCache();
    return result;
  } catch (e) {
    console.error('[AURORANIK] 서버 저장 실패:', e);
    alert('⚠ 서버에 데이터를 저장하지 못했습니다.\n\n' + (e.message || '') + '\n\ndata 폴더 쓰기 권한(755/775)을 확인해주세요.');
    return { success: false, error: e.message };
  }
}

// --------------------------------------------------------------------------
// PUBLIC API (기존 함수명을 그대로 유지하되, 모두 비동기(Promise)로 동작합니다)
// --------------------------------------------------------------------------

async function getCategoriesData() {
  const data = await _fetchAllData();
  return data.categories;
}

async function saveCategoriesData(categories) {
  return _postAction('save_categories', { categories });
}

async function getPortfolioData() {
  const data = await _fetchAllData();
  return data.items;
}

async function savePortfolioData(items) {
  return _postAction('save_items', { items });
}

async function getInquiriesData() {
  const data = await _fetchAllData();
  return data.inquiries;
}

async function saveInquiriesData(inquiries) {
  return _postAction('save_inquiries', { inquiries });
}

async function resetPortfolioData() {
  const result = await _postAction('reset', {});
  _invalidateCache();
  return {
    categories: result.categories || [],
    items: result.items || [],
    inquiries: result.inquiries || []
  };
}

/**
 * 이미지 또는 동영상 파일을 실제 cafe24 서버(assets 폴더)에 업로드합니다.
 * 성공 시 { success:true, url, mediaType } 를 반환합니다.
 * 이 URL은 절대경로이므로 모든 방문자에게 동일하게 보입니다.
 */
async function uploadMediaFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(API_BASE + 'upload.php', {
    method: 'POST',
    body: formData
  });

  const result = await res.json().catch(() => ({}));

  if (!res.ok || !result.success) {
    throw new Error(result.error || '파일 업로드에 실패했습니다.');
  }

  return result;
}
