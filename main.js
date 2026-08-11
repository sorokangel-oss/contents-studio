/**
 * AURORANIK AI CONTENTS STUDIO - MAIN SCRIPT
 * Handles gallery rendering, floating quick contact widget,
 * and client inquiry recording into Admin Dashboard & Open KakaoTalk / Email dispatch.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --------------------------------------------------------------------------
  // 1. Theme Toggle (Dark / Light)
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggle');
  const body = document.body;

  const savedTheme = localStorage.getItem('auroranik_theme');
  if (savedTheme === 'dark') {
    body.classList.replace('light-theme', 'dark-theme');
    if (themeToggleBtn) themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun text-gold"></i>';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun text-gold"></i>';
        localStorage.setItem('auroranik_theme', 'dark');
      } else {
        body.classList.replace('dark-theme', 'light-theme');
        themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        localStorage.setItem('auroranik_theme', 'light');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Admin Authentication State & Controls
  // --------------------------------------------------------------------------
  let isAdmin = sessionStorage.getItem('auroranik_admin_logged_in') === 'true';

  const adminAuthTriggerBtn = document.getElementById('adminAuthTriggerBtn');
  const footerAdminLoginBtn = document.getElementById('footerAdminLoginBtn');
  const adminBtnText = document.getElementById('adminBtnText');
  const adminAuthModal = document.getElementById('adminAuthModal');
  const closeAdminAuthBtn = document.getElementById('closeAdminAuthBtn');
  const adminAuthForm = document.getElementById('adminAuthForm');
  const adminPasscode = document.getElementById('adminPasscode');

  function updateAdminUIState() {
    if (isAdmin) {
      if (adminBtnText) adminBtnText.textContent = '관리자 로그아웃';
      if (adminAuthTriggerBtn) {
        adminAuthTriggerBtn.classList.replace('btn-outline', 'btn-emerald');
        adminAuthTriggerBtn.innerHTML = '<i class="fa-solid fa-user-check"></i> <span>관리자 로그아웃</span>';
      }
    } else {
      if (adminBtnText) adminBtnText.textContent = '관리자 로그인';
      if (adminAuthTriggerBtn) {
        adminAuthTriggerBtn.innerHTML = '<i class="fa-solid fa-lock text-emerald"></i> <span>관리자 로그인</span>';
      }
    }
  }

  updateAdminUIState();

  function triggerAdminAuthFlow() {
    if (isAdmin) {
      if (confirm('관리자 모드에서 로그아웃 하시겠습니까?')) {
        isAdmin = false;
        sessionStorage.removeItem('auroranik_admin_logged_in');
        updateAdminUIState();
        renderGalleryGrid();
        alert('관리자 로그아웃 되었습니다.');
      }
    } else {
      if (adminAuthModal) adminAuthModal.classList.add('active');
    }
  }

  if (adminAuthTriggerBtn) {
    adminAuthTriggerBtn.addEventListener('click', triggerAdminAuthFlow);
  }

  if (footerAdminLoginBtn) {
    footerAdminLoginBtn.addEventListener('click', (e) => {
      e.preventDefault();
      triggerAdminAuthFlow();
    });
  }

  if (closeAdminAuthBtn) {
    closeAdminAuthBtn.addEventListener('click', () => {
      if (adminAuthModal) adminAuthModal.classList.remove('active');
    });
  }

  if (adminAuthModal) {
    adminAuthModal.addEventListener('click', (e) => {
      if (e.target === adminAuthModal) adminAuthModal.classList.remove('active');
    });
  }

  if (adminAuthForm && adminPasscode) {
    adminAuthForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = adminPasscode.value.trim().toLowerCase();

      if (code === 'auroranik' || code === '1234' || code === 'admin') {
        isAdmin = true;
        sessionStorage.setItem('auroranik_admin_logged_in', 'true');
        updateAdminUIState();
        adminAuthForm.reset();
        if (adminAuthModal) adminAuthModal.classList.remove('active');
        
        window.open('admin.html', '_blank');
      } else {
        alert('❌ 올바르지 않은 관리자 암호입니다. (기본 암호: auroranik 또는 1234)');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Dynamic Image & Video Gallery Engine
  // --------------------------------------------------------------------------
  const portfolioCategoryMenu = document.getElementById('portfolioCategoryMenu');
  const portfolioGalleryGrid = document.getElementById('portfolioGalleryGrid');
  let activeFilterId = 'all';

  function renderCategoryMenu() {
    if (!portfolioCategoryMenu) return;
    const categories = getCategoriesData();
    portfolioCategoryMenu.innerHTML = '';

    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `cat-filter-btn ${cat.id === activeFilterId ? 'active' : ''}`;
      btn.setAttribute('data-cat-id', cat.id);
      btn.textContent = cat.name;
      
      btn.addEventListener('click', () => {
        activeFilterId = cat.id;
        renderCategoryMenu();
        renderGalleryGrid();
      });

      portfolioCategoryMenu.appendChild(btn);
    });
  }

  function renderGalleryGrid() {
    if (!portfolioGalleryGrid) return;
    const items = getPortfolioData();
    const categories = getCategoriesData();

    const filteredItems = activeFilterId === 'all' 
      ? items 
      : items.filter(i => i.categoryId === activeFilterId);

    portfolioGalleryGrid.innerHTML = '';

    if (filteredItems.length === 0) {
      portfolioGalleryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem; color: var(--text-muted);">
          <i class="fa-regular fa-folder-open" style="font-size: 3rem; margin-bottom: 1rem; color: var(--emerald-light);"></i>
          <p>선택하신 카테고리에 등록된 포트폴리오 사례가 없습니다.</p>
        </div>
      `;
      return;
    }

    filteredItems.forEach(item => {
      const catObj = categories.find(c => c.id === item.categoryId);
      const catLabel = catObj ? catObj.name : (item.categoryName || '기타');
      const isVideo = item.mediaType === 'video';
      const imgSrc = item.image || item.mediaUrl || 'assets/images/hero_workspace.jpg';

      const card = document.createElement('div');
      card.className = 'gallery-card';
      
      let mediaPreviewHTML = '';
      if (isVideo) {
        mediaPreviewHTML = `
          <div class="gallery-img-wrapper">
            <span class="gallery-badge video-type-badge"><i class="fa-solid fa-play"></i> VIDEO / 릴스</span>
            ${item.ratio ? `<span class="gallery-ratio-tag">${item.ratio}</span>` : ''}
            <div class="play-icon-overlay"><i class="fa-solid fa-play"></i></div>
            <video src="${item.mediaUrl}" poster="${imgSrc}" autoplay loop muted playsinline class="gallery-video"></video>
          </div>
        `;
      } else {
        mediaPreviewHTML = `
          <div class="gallery-img-wrapper">
            <span class="gallery-badge">${item.badge || 'PORTFOLIO'}</span>
            ${item.ratio ? `<span class="gallery-ratio-tag">${item.ratio}</span>` : ''}
            <img src="${imgSrc}" alt="${item.title}" class="gallery-img" loading="lazy" onerror="this.src='assets/images/hero_workspace.jpg'">
          </div>
        `;
      }

      const hasLink = item.linkUrl && item.linkUrl.trim() !== '';

      card.innerHTML = `
        ${mediaPreviewHTML}
        <div class="gallery-card-body">
          <span class="gallery-cat-name">${catLabel}</span>
          <h3 class="gallery-card-title">${item.title}</h3>
          <p class="gallery-card-sub">${item.subtitle || ''}</p>
          <div class="gallery-card-footer">
            <button class="btn btn-emerald btn-sm view-detail-btn" data-id="${item.id}" style="flex-grow: 1;">
              <i class="fa-solid ${isVideo ? 'fa-circle-play' : 'fa-expand'}"></i> ${isVideo ? '영상 재생 & 상세보기' : '상세보기'}
            </button>
            ${hasLink ? `
              <a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm visit-site-btn" title="관련 홈페이지 새 창으로 이동">
                <i class="fa-solid fa-globe text-emerald"></i> 사이트 바로가기 <i class="fa-solid fa-arrow-up-right-from-square" style="font-size:0.7rem;"></i>
              </a>
            ` : ''}
          </div>
        </div>
      `;

      portfolioGalleryGrid.appendChild(card);
    });

    const detailBtns = portfolioGalleryGrid.querySelectorAll('.view-detail-btn');
    detailBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.getAttribute('data-id');
        openPortfolioDetailModal(itemId);
      });
    });

    const mediaWrappers = portfolioGalleryGrid.querySelectorAll('.gallery-img-wrapper');
    mediaWrappers.forEach((wrapper) => {
      wrapper.addEventListener('click', () => {
        const cardBtn = wrapper.closest('.gallery-card').querySelector('.view-detail-btn');
        if (cardBtn) {
          const itemId = cardBtn.getAttribute('data-id');
          openPortfolioDetailModal(itemId);
        }
      });
    });
  }

  renderCategoryMenu();
  renderGalleryGrid();

  window.addEventListener('storage', (e) => {
    if (e.key === 'auroranik_portfolio_data_v4' || e.key === 'auroranik_categories_v4') {
      renderCategoryMenu();
      renderGalleryGrid();
    }
  });

  // --------------------------------------------------------------------------
  // 4. Portfolio Detail View Modal
  // --------------------------------------------------------------------------
  const portfolioDetailModal = document.getElementById('portfolioDetailModal');
  const closeDetailModalBtn = document.getElementById('closeDetailModalBtn');
  const detailModalBody = document.getElementById('detailModalBody');

  const fullSizeLightboxModal = document.getElementById('fullSizeLightboxModal');
  const closeLightboxBtn = document.getElementById('closeLightboxBtn');
  const lightboxMediaWrapper = document.getElementById('lightboxMediaWrapper');
  const lightboxTitle = document.getElementById('lightboxTitle');

  function openLightbox(item) {
    if (!fullSizeLightboxModal || !lightboxMediaWrapper) return;
    const isVideo = item.mediaType === 'video';
    const imgSrc = item.image || item.mediaUrl;

    if (isVideo) {
      lightboxMediaWrapper.innerHTML = `
        <video src="${item.mediaUrl}" poster="${imgSrc}" controls autoplay loop playsinline style="max-width:90vw; max-height:80vh; border-radius:12px;"></video>
      `;
    } else {
      lightboxMediaWrapper.innerHTML = `
        <img src="${imgSrc}" alt="${item.title}" style="max-width:90vw; max-height:80vh; object-fit:contain; border-radius:12px;" onerror="this.src='assets/images/hero_workspace.jpg'">
      `;
    }

    if (lightboxTitle) {
      lightboxTitle.innerHTML = `
        <i class="fa-solid fa-up-right-and-down-left-from-center text-emerald"></i> ${item.title} (100% 원본 해상도 풀뷰)
      `;
    }

    fullSizeLightboxModal.classList.add('active');
  }

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', () => {
      fullSizeLightboxModal.classList.remove('active');
    });
  }

  if (fullSizeLightboxModal) {
    fullSizeLightboxModal.addEventListener('click', (e) => {
      if (e.target === fullSizeLightboxModal) {
        fullSizeLightboxModal.classList.remove('active');
      }
    });
  }

  function openPortfolioDetailModal(itemId) {
    const items = getPortfolioData();
    const item = items.find(i => i.id === itemId);
    if (!item || !detailModalBody) return;

    const isVideo = item.mediaType === 'video';
    const imgSrc = item.image || item.mediaUrl;

    let mediaDisplayHTML = '';
    if (isVideo) {
      mediaDisplayHTML = `
        <div class="media-frame" style="text-align:center;">
          <video src="${item.mediaUrl}" poster="${imgSrc}" controls autoplay loop playsinline style="width:100%; border-radius:14px; max-height:550px; object-fit:contain; background:#000; cursor:pointer;" title="클릭시 원본 풀사이즈 보기"></video>
          <button class="btn btn-outline btn-sm open-full-lightbox-btn" style="margin-top:0.75rem; width:100%;"><i class="fa-solid fa-magnifying-glass-plus text-emerald"></i> 🔍 원본 사이즈 크기로 확대 보기</button>
        </div>
      `;
    } else {
      mediaDisplayHTML = `
        <div class="media-frame" style="text-align:center;">
          <img src="${imgSrc}" alt="${item.title}" class="case-img" style="width:100%; border-radius:14px; max-height:550px; object-fit:contain; cursor:pointer;" onerror="this.src='assets/images/hero_workspace.jpg'" title="클릭시 원본 풀사이즈 보기">
          <button class="btn btn-outline btn-sm open-full-lightbox-btn" style="margin-top:0.75rem; width:100%;"><i class="fa-solid fa-magnifying-glass-plus text-emerald"></i> 🔍 원본 사이즈 크기로 확대 보기</button>
        </div>
      `;
    }

    let specsHTML = '';
    if (item.specs && item.specs.length > 0) {
      specsHTML = item.specs.map(s => `
        <div class="spec-item">
          <h4><i class="fa-solid ${s.icon}"></i> ${s.title}</h4>
          <ul>
            ${s.items.map(i => `<li>${i}</li>`).join('')}
          </ul>
        </div>
      `).join('');
    }

    let timelineHTML = '';
    if (item.timeline && item.timeline.length > 0) {
      timelineHTML = `
        <div class="reels-timeline-box">
          <h4><i class="fa-solid fa-film text-purple"></i> 릴스 영상 기획 타임라인</h4>
          <div class="timeline-items">
            ${item.timeline.map(t => `
              <div class="tl-item">
                <span class="tl-time">${t.time}</span>
                <p>${t.text}</p>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    let colorChipsHTML = '';
    if (item.colorChips && item.colorChips.length > 0) {
      colorChipsHTML = `
        <div class="color-grid" style="margin-top: 1rem;">
          ${item.colorChips.map(c => `
            <div class="color-chip ${c.class}"><span>${c.code}</span> ${c.text}</div>
          `).join('')}
        </div>
      `;
    }

    let mockupsHTML = '';
    if (item.mockups && item.mockups.length > 0) {
      mockupsHTML = `
        <div class="mini-mockups" style="margin-top: 1rem;">
          ${item.mockups.map(m => `
            <div class="mockup-card">
              <span class="mockup-label">${m.label}</span>
              <p>${m.text}</p>
            </div>
          `).join('')}
        </div>
      `;
    }

    const hasLink = item.linkUrl && item.linkUrl.trim() !== '';

    detailModalBody.innerHTML = `
      <div class="case-detail-grid">
        <div class="case-info">
          <div class="case-badge ${isVideo ? 'video-type-badge' : ''}">
            <i class="fa-solid ${isVideo ? 'fa-film' : 'fa-image'}"></i> ${item.badge || (isVideo ? 'REELS VIDEO' : 'PORTFOLIO')}
          </div>
          <h3>${item.title}</h3>
          <p class="case-subtext">${item.subtitle || ''}</p>
          <div class="case-spec-group">
            ${specsHTML}
            ${item.highlightQuote ? `<p class="highlight-quote">${item.highlightQuote}</p>` : ''}
            ${colorChipsHTML}
          </div>

          ${hasLink ? `
            <div style="margin-top: 1.5rem; padding: 1.25rem; background: var(--emerald-subtle); border-radius: 14px; border: 1px solid var(--border-color);">
              <h4 style="font-size:0.95rem; margin-bottom:0.5rem; color:var(--emerald-dark);"><i class="fa-solid fa-globe"></i> 관련 브랜드 공식 홈페이지</h4>
              <a href="${item.linkUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-emerald btn-lg btn-full" style="display:inline-flex; align-items:center; justify-content:center; gap:0.5rem;">
                <i class="fa-solid fa-arrow-up-right-from-square"></i> 관련 홈페이지 새 창으로 방문하기
              </a>
            </div>
          ` : ''}
        </div>

        <div class="case-media">
          ${mediaDisplayHTML}
          ${mockupsHTML}
          ${timelineHTML}
        </div>
      </div>
    `;

    const lightboxBtn = detailModalBody.querySelector('.open-full-lightbox-btn');
    const mediaElem = detailModalBody.querySelector('.case-img, video');

    if (lightboxBtn) lightboxBtn.addEventListener('click', () => openLightbox(item));
    if (mediaElem) mediaElem.addEventListener('click', () => openLightbox(item));

    portfolioDetailModal.classList.add('active');
  }

  if (closeDetailModalBtn) {
    closeDetailModalBtn.addEventListener('click', () => {
      portfolioDetailModal.classList.remove('active');
    });
  }

  if (portfolioDetailModal) {
    portfolioDetailModal.addEventListener('click', (e) => {
      if (e.target === portfolioDetailModal) {
        portfolioDetailModal.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 5. Contact Form Submission & Inquiry Saving to Admin Dashboard
  // --------------------------------------------------------------------------
  const contactModal = document.getElementById('contactModal');
  const openModalBtns = document.querySelectorAll('.open-contact-modal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const packageSelect = document.getElementById('packageSelect');
  const contactForm = document.getElementById('contactForm');

  const contactSuccessModal = document.getElementById('contactSuccessModal');
  const sendKakaoBtn = document.getElementById('sendKakaoBtn');
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  const closeSuccessBtn = document.getElementById('closeSuccessBtn');

  let currentInquiryText = '';

  openModalBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const selectedPkg = btn.getAttribute('data-package');
      if (selectedPkg && packageSelect) {
        packageSelect.value = selectedPkg;
      }
      if (contactModal) contactModal.classList.add('active');
    });
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      if (contactModal) contactModal.classList.remove('active');
    });
  }

  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) {
        contactModal.classList.remove('active');
      }
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const clientName = document.getElementById('clientName').value.trim();
      const clientContact = document.getElementById('clientContact').value.trim();
      const industryType = document.getElementById('industryType').value;
      const packageVal = document.getElementById('packageSelect').value;
      const clientMessage = document.getElementById('clientMessage').value.trim();

      const now = new Date();
      const dateStr = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')} ${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;

      // 1. SAVE TO ADMIN DASHBOARD INQUIRIES DATA
      const inquiries = getInquiriesData();
      const newInquiry = {
        id: `inq-${Date.now()}`,
        date: dateStr,
        name: clientName,
        contact: clientContact,
        industry: industryType,
        package: packageVal,
        message: clientMessage || '내용 없음'
      };
      inquiries.unshift(newInquiry);
      saveInquiriesData(inquiries);

      // 2. PREPARE TEXT FOR KAKAO / EMAIL
      currentInquiryText = `[오로라닉 AI 콘텐츠 상담 신청]
• 접수 일시: ${dateStr}
• 성함/업체명: ${clientName}
• 연락처/이메일: ${clientContact}
• 업종 분류: ${industryType}
• 희망 패키지: ${packageVal}
• 문의 세부내용: ${clientMessage || '내용 없음'}`;

      contactForm.reset();
      if (contactModal) contactModal.classList.remove('active');
      if (contactSuccessModal) contactSuccessModal.classList.add('active');
    });
  }

  // DISPATCH TO OPEN KAKAOTALK
  if (sendKakaoBtn) {
    sendKakaoBtn.addEventListener('click', () => {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(currentInquiryText).then(() => {
          alert('📋 상담 신청 내용이 복사되었습니다!\n오픈카톡 채팅창에 붙여넣기(Ctrl+V) 하시면 상담이 더욱 빨라집니다.');
        }).catch(() => {});
      }
      window.open('https://open.kakao.com/o/slXbPiBi', '_blank');
      if (contactSuccessModal) contactSuccessModal.classList.remove('active');
    });
  }

  // DISPATCH TO EMAIL (MAILTO)
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      const mailSubject = encodeURIComponent('[오로라닉] AI 콘텐츠 1:1 상담 신청');
      const mailBody = encodeURIComponent(currentInquiryText);
      window.location.href = `mailto:auroranik@naver.com?subject=${mailSubject}&body=${mailBody}`;
      if (contactSuccessModal) contactSuccessModal.classList.remove('active');
    });
  }

  if (closeSuccessBtn) {
    closeSuccessBtn.addEventListener('click', () => {
      if (contactSuccessModal) contactSuccessModal.classList.remove('active');
    });
  }

  if (contactSuccessModal) {
    contactSuccessModal.addEventListener('click', (e) => {
      if (e.target === contactSuccessModal) {
        contactSuccessModal.classList.remove('active');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 6. Before & After Toggle
  // --------------------------------------------------------------------------
  const showBeforeBtn = document.getElementById('showBeforeBtn');
  const showAfterBtn = document.getElementById('showAfterBtn');
  const baAfterView = document.querySelector('.ba-after-view');
  const baBeforeView = document.querySelector('.ba-before-view');

  if (showBeforeBtn && showAfterBtn && baAfterView && baBeforeView) {
    showBeforeBtn.addEventListener('click', () => {
      showBeforeBtn.classList.add('active');
      showAfterBtn.classList.remove('active');
      baAfterView.classList.add('hidden');
      baBeforeView.classList.remove('hidden');
    });

    showAfterBtn.addEventListener('click', () => {
      showAfterBtn.classList.add('active');
      showBeforeBtn.classList.remove('active');
      baBeforeView.classList.add('hidden');
      baAfterView.classList.remove('hidden');
    });
  }

  // --------------------------------------------------------------------------
  // 7. FAQ Accordion
  // --------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) item.classList.add('active');
      });
    }
  });

  // --------------------------------------------------------------------------
  // 8. Mobile Menu Toggle
  // --------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      if (navMenu.style.display === 'flex') {
        navMenu.style.display = 'none';
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'var(--glass-bg)';
        navMenu.style.padding = '1.5rem';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
      }
    });
  }
});
