/* ==========================================================================
   SIMUP - MAIN APPLICATION CONTROLLER (BLOCK 1 FOUNDATION)
   Coordinates navigation, authentication flows, theme management and catalog.
   ========================================================================== */

function initMainApp() {
  if (window.__SIMUP_APP_INITIALIZED__) return;
  window.__SIMUP_APP_INITIALIZED__ = true;
  // 1. Initialize State
  let currentAuthMode = 'register'; // 'register' or 'login'
  let isSoundMuted = localStorage.getItem('simup_sound_muted') === 'true';

  // 2. DOM Elements
  const headerBalanceEl = document.getElementById('header-balance');
  const userHeaderContainer = document.getElementById('user-header-container');
  const navTabButtons = document.querySelectorAll('.nav-tab-btn');
  const tabContents = document.querySelectorAll('.tab-content');
  const brandLogoBtn = document.getElementById('brand-logo-btn');

  // Modals
  const modalAuth = document.getElementById('modal-auth');
  const authModalClose = document.getElementById('auth-modal-close');
  const authModeRegisterBtn = document.getElementById('auth-mode-register');
  const authModeLoginBtn = document.getElementById('auth-mode-login');
  const authForm = document.getElementById('auth-form');
  const authUsernameInput = document.getElementById('auth-username');
  const authPasswordInput = document.getElementById('auth-password');
  const authSubmitBtn = document.getElementById('auth-submit-btn');
  const authModalTitle = document.getElementById('auth-modal-title');
  const authModalSubtitle = document.getElementById('auth-modal-subtitle');

  // Theme elements
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const modalTheme = document.getElementById('modal-theme');
  const themeModalClose = document.getElementById('theme-modal-close');
  const themeOptions = document.querySelectorAll('.theme-card-option');

  // Audio button
  const audioToggleBtn = document.getElementById('audio-toggle-btn');

  // Catalog elements
  const catalogSearchInput = document.getElementById('catalog-search');
  const gameFilterPills = document.querySelectorAll('#game-filter-pills .game-pill-btn');
  const priceFilterPills = document.querySelectorAll('#price-quick-pills .game-pill-btn');
  const rarityFilterSelect = document.getElementById('rarity-filter');
  const sortFilterSelect = document.getElementById('sort-filter');
  const skinsGrid = document.getElementById('skins-grid');
  const catalogCountBadge = document.getElementById('catalog-count-badge');

  // Profile container
  const profileContainer = document.getElementById('profile-content-container');

  // =========================================================================
  // THEME & UPGRADER CUSTOMIZATION (BLOCK 3)
  // =========================================================================
  const arrowOptions = document.querySelectorAll('.arrow-choice-btn');
  const arenaOptions = document.querySelectorAll('.arena-choice-btn');
  const wheelNeedleEl = document.getElementById('wheel-needle');
  const upgraderWheelBox = document.querySelector('.upgrader-wheel-box');

  const ARROW_NAMES_MAP = {
    'arrow-laser': '🎯 Лазер',
    'arrow-blade': '⚔️ Лезвие',
    'arrow-needle': '📍 Игла',
    'arrow-classic': '🔺 Классик'
  };

  let savedTheme = localStorage.getItem('simup_theme');
  if (!savedTheme || savedTheme === 'emerald') {
    savedTheme = 'cherry';
    localStorage.setItem('simup_theme', 'cherry');
  }
  const savedArrow = localStorage.getItem('simup_arrow_style') || 'arrow-laser';
  const savedWheelStyle = localStorage.getItem('simup_wheel_style') || 'wheel-style-dark';

  applyTheme(savedTheme);
  applyArrowStyle(savedArrow);
  applyWheelStyle(savedWheelStyle);

  function applyTheme(themeName) {
    document.body.setAttribute('data-theme', themeName);
    localStorage.setItem('simup_theme', themeName);
    themeOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset?.theme === themeName);
    });
    // Trigger wheel re-draw with updated CSS variables
    if (typeof updateUpgraderUI === 'function') {
      try { updateUpgraderUI(); } catch (e) {}
    }
  }

  function applyArrowStyle(arrowClass) {
    if (wheelNeedleEl) {
      wheelNeedleEl.classList.remove('arrow-laser', 'arrow-blade', 'arrow-needle', 'arrow-classic');
      wheelNeedleEl.classList.add(arrowClass);
    }
    localStorage.setItem('simup_arrow_style', arrowClass);
    arrowOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.arrow === arrowClass);
    });
    const label = document.getElementById('label-arrow-style-name');
    if (label) {
      label.textContent = ARROW_NAMES_MAP[arrowClass] || '🎯 Стрелка';
    }
  }

  function applyWheelStyle(styleClass) {
    if (upgraderWheelBox) {
      upgraderWheelBox.classList.remove('wheel-style-dark', 'wheel-style-neon', 'wheel-style-gold');
      upgraderWheelBox.classList.add(styleClass);
    }
    localStorage.setItem('simup_wheel_style', styleClass);
    arenaOptions.forEach(opt => {
      opt.classList.toggle('active', opt.dataset.wheelStyle === styleClass);
    });
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      modalTheme?.classList.add('active');
    });
  }

  if (themeModalClose) {
    themeModalClose.addEventListener('click', () => {
      modalTheme?.classList.remove('active');
    });
  }

  themeOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const theme = opt.dataset.theme;
      applyTheme(theme);
    });
  });

  arrowOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const arrow = opt.dataset.arrow;
      applyArrowStyle(arrow);
    });
  });

  arenaOptions.forEach(opt => {
    opt.addEventListener('click', () => {
      const style = opt.dataset.wheelStyle;
      applyWheelStyle(style);
    });
  });

  // =========================================================================
  // AUDIO TOGGLE & VOLUME SLIDER
  // =========================================================================
  const audioVolumeSlider = document.getElementById('audio-volume-slider');
  const audioVolumeText = document.getElementById('audio-volume-text');
  const audioPresetBtns = document.querySelectorAll('.audio-preset-btn');
  const initialVolume = Math.round((window.SoundManager?.volume || 0.8) * 100);

  if (audioVolumeSlider) audioVolumeSlider.value = initialVolume;
  if (audioVolumeText) audioVolumeText.textContent = `${initialVolume}%`;

  updateAudioIcon();

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      isSoundMuted = !isSoundMuted;
      window.SoundManager?.setMuted(isSoundMuted);
      updateAudioIcon();
    });
  }

  audioVolumeSlider?.addEventListener('input', (e) => {
    const val = parseInt(e.target.value, 10);
    if (audioVolumeText) audioVolumeText.textContent = `${val}%`;
    window.SoundManager?.setVolume(val / 100);
    isSoundMuted = (val === 0);
    updateAudioIcon();
  });

  audioPresetBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const val = parseInt(btn.dataset.vol, 10);
      if (audioVolumeSlider) audioVolumeSlider.value = val;
      if (audioVolumeText) audioVolumeText.textContent = `${val}%`;
      window.SoundManager?.setVolume(val / 100);
      isSoundMuted = (val === 0);
      updateAudioIcon();
    });
  });

  function updateAudioIcon() {
    audioToggleBtn.innerHTML = isSoundMuted ? '🔇' : '🔊';
    audioToggleBtn.style.opacity = isSoundMuted ? '0.6' : '1';
    if (audioVolumeSlider && isSoundMuted) {
      audioVolumeSlider.value = 0;
      if (audioVolumeText) audioVolumeText.textContent = '0%';
    }
  }

  // =========================================================================
  // NAVIGATION ROUTING (GAMES HUB & 5-PILLAR TABS)
  // =========================================================================
  const modalGamesHub = document.getElementById('modal-games-hub');
  const gamesHubCloseBtn = document.getElementById('games-hub-modal-close');
  const MINI_GAMES_TABS = ['casebattle', 'cases', 'contracts', 'mines', 'coinflip', 'crash'];

  function openGamesHub() {
    window.SoundManager?.playClick();
    gamesHubIsDragging = false;
    gamesHubSuppressClicksUntil = 0;
    modalGamesHub?.classList.add('active');
  }

  function closeGamesHub() {
    modalGamesHub?.classList.remove('active');
  }

  gamesHubCloseBtn?.addEventListener('click', closeGamesHub);
  const btnDesktopGamesHub = document.getElementById('btn-desktop-games-hub');
  const gamesDropdownMenu = document.getElementById('games-dropdown-menu');

  // Toggle mini-games dropdown on CLICK ONLY (never on hover)
  btnDesktopGamesHub?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.innerWidth <= 960) {
      openGamesHub();
    } else {
      gamesDropdownMenu?.classList.toggle('active');
    }
  });
  document.getElementById('btn-mobile-games-hub')?.addEventListener('click', openGamesHub);

  // Bulletproof mobile touch scroll tracking: never open a game on scroll/touch drag, but always trigger on tap
  let gamesHubTouchStartX = 0;
  let gamesHubTouchStartY = 0;
  let gamesHubIsDragging = false;
  let gamesHubSuppressClicksUntil = 0;

  const gamesModal = document.getElementById('modal-games-hub');
  gamesModal?.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches[0]) {
      gamesHubTouchStartX = e.touches[0].clientX;
      gamesHubTouchStartY = e.touches[0].clientY;
      gamesHubIsDragging = false;
    }
  }, { passive: true });

  gamesModal?.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      const deltaX = Math.abs(e.touches[0].clientX - gamesHubTouchStartX);
      const deltaY = Math.abs(e.touches[0].clientY - gamesHubTouchStartY);
      if (deltaY > 14 || deltaX > 14) {
        gamesHubIsDragging = true;
        gamesHubSuppressClicksUntil = Date.now() + 250;
      }
    }
  }, { passive: true });

  gamesModal?.addEventListener('touchend', () => {
    setTimeout(() => {
      gamesHubIsDragging = false;
    }, 100);
  }, { passive: true });

  // Direct click handlers for games hub cards and dropdown items
  document.querySelectorAll('.games-hub-card, .games-drop-item').forEach(card => {
    card.addEventListener('click', (e) => {
      if (gamesHubIsDragging || Date.now() < gamesHubSuppressClicksUntil) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      e.preventDefault();
      const tabId = card.getAttribute('data-tab');
      if (tabId) {
        window.SoundManager?.playClick();
        closeGamesHub();
        gamesDropdownMenu?.classList.remove('active');
        switchTab(tabId);
      }
    });
  });

  // Delegated clicks for other navigation items
  document.addEventListener('click', (e) => {
    // Close desktop games dropdown if clicked outside
    if (!e.target.closest('.games-nav-dropdown-wrap')) {
      gamesDropdownMenu?.classList.remove('active');
    }

    if (e.target.closest('.games-hub-card') || e.target.closest('.games-drop-item')) {
      return;
    }

    const target = e.target.closest('[data-tab]');
    if (!target) return;
    const tabId = target.dataset.tab;
    if (tabId) {
      closeGamesHub();
      gamesDropdownMenu?.classList.remove('active');
      switchTab(tabId);
    }
  });

  // Desktop Nav horizontal scroll support (chevrons + mouse wheel)
  const desktopNavScroller = document.getElementById('desktop-nav-scroller');
  const navArrowLeft = document.getElementById('nav-arrow-left');
  const navArrowRight = document.getElementById('nav-arrow-right');

  if (desktopNavScroller) {
    desktopNavScroller.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        desktopNavScroller.scrollLeft += e.deltaY;
      }
    }, { passive: false });

    navArrowLeft?.addEventListener('click', () => {
      desktopNavScroller.scrollBy({ left: -180, behavior: 'smooth' });
    });

    navArrowRight?.addEventListener('click', () => {
      desktopNavScroller.scrollBy({ left: 180, behavior: 'smooth' });
    });
  }

  brandLogoBtn?.addEventListener('click', () => {
    switchTab('upgrader');
  });

  function switchTab(tabId) {
    // Close any active modal overlay so tab is immediately visible
    document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));

    document.querySelectorAll('.nav-tab-btn, .mobile-bottom-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });

    // If active tab is one of mini-games, highlight the "Мини-игры" buttons
    const isMiniGame = MINI_GAMES_TABS.includes(tabId);
    document.getElementById('btn-desktop-games-hub')?.classList.toggle('active', isMiniGame);
    document.getElementById('btn-mobile-games-hub')?.classList.toggle('active', isMiniGame);

    tabContents.forEach(c => c.classList.toggle('active', c.id === `tab-${tabId}`));
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (tabId === 'profile') {
      renderProfilePage();
    } else if (tabId === 'inventory') {
      renderInventoryPage();
    } else if (tabId === 'leaderboard') {
      if (typeof renderLeaderboard === 'function') renderLeaderboard();
    } else if (tabId === 'catalog') {
      if (window.CatalogController?.renderGrid) window.CatalogController.renderGrid();
      if (window.catalogController?.render) window.catalogController.render();
      if (window.CatalogCart?.updateUI) window.CatalogCart.updateUI();
      if (window.catalogCart?.updateUI) window.catalogCart.updateUI();
    } else if (tabId === 'casebattle') {
      if (window.CaseBattleController?.init) window.CaseBattleController.init();
    } else if (tabId === 'pass') {
      if (window.SimupPassController?.render) window.SimupPassController.render();
    } else if (tabId === 'admin') {
      if (window.AdminPanelController?.render) window.AdminPanelController.render();
    }
  }
  window.switchTab = switchTab;

  // =========================================================================
  // AUTHENTICATION MODAL (BLOCK 1: RELIABLE LOGIN & NO AVATARS)
  // =========================================================================
  const authToggleHint = document.getElementById('auth-toggle-hint');
  const authLinkSwitch = document.getElementById('auth-link-switch');

  function openAuthModal(mode = 'register') {
    setAuthMode(mode);
    if (!modalAuth?.classList.contains('active')) {
      modalAuth?.classList.add('active');
    }
  }

  window.showAuthModal = openAuthModal;

  function closeAuthModal() {
    if (!window.authManager || !window.authManager.isAuthenticated()) {
      return; // Mandatory auth: cannot dismiss
    }
    modalAuth?.classList.remove('active');
  }

  function setAuthMode(mode) {
    currentAuthMode = mode;
    const hasRef = Boolean(localStorage.getItem('simup_ref_code'));
    if (mode === 'register') {
      authModeRegisterBtn?.classList.add('active');
      authModeLoginBtn?.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Регистрация в SIMUP';
      if (authModalSubtitle) {
        authModalSubtitle.innerHTML = hasRef 
          ? 'Создайте профиль со стартовым подарком <strong>$5,000.00</strong> по ссылке друга!' 
          : 'Создайте профиль со стартовым балансом <strong>$500.00</strong> (или <strong>$5,000.00</strong> по реферальной ссылке)!';
      }
      if (authSubmitBtn) authSubmitBtn.textContent = hasRef ? 'Создать аккаунт (+ $5,000.00)' : 'Создать аккаунт (+ $500.00)';
      if (authToggleHint) {
        authToggleHint.innerHTML = 'Уже есть аккаунт? <a href="#" id="auth-link-switch" style="color: var(--accent-color); font-weight: 700; text-decoration: none;">Войти в профиль</a>';
        document.getElementById('auth-link-switch')?.addEventListener('click', (e) => {
          e.preventDefault();
          setAuthMode('login');
        });
      }
    } else {
      authModeLoginBtn?.classList.add('active');
      authModeRegisterBtn?.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Вход в аккаунт';
      if (authModalSubtitle) authModalSubtitle.textContent = 'Введите ваш никнейм и пароль для продолжения';
      if (authSubmitBtn) authSubmitBtn.textContent = 'Войти в аккаунт';
      if (authToggleHint) {
        authToggleHint.innerHTML = 'Впервые на сайте? <a href="#" id="auth-link-switch" style="color: var(--accent-color); font-weight: 700; text-decoration: none;">Зарегистрироваться (+ $500.00)</a>';
        document.getElementById('auth-link-switch')?.addEventListener('click', (e) => {
          e.preventDefault();
          setAuthMode('register');
        });
      }
    }
  }

  authModeRegisterBtn?.addEventListener('click', () => setAuthMode('register'));
  authModeLoginBtn?.addEventListener('click', () => setAuthMode('login'));

  authForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = authUsernameInput.value.trim();
    const password = authPasswordInput.value.trim();

    if (!username || !password) {
      window.notify.warning('Внимание', 'Пожалуйста, введите никнейм и пароль.');
      return;
    }

    if (currentAuthMode === 'register') {
      const res = await window.authManager.register(username, password);
      if (res && res.success) {
        localStorage.setItem('simup_has_authenticated', '1');
        modalAuth?.classList.remove('active');
        authForm.reset();
        const bonusMsg = (res.user?.balance >= 5000) ? 'Стартовый подарок $5,000.00 по ссылке друга зачислен!' : 'Стартовый баланс $500.00 зачислен!';
        window.notify.bigWin('Добро пожаловать!', `Аккаунт ${res.user.username} создан! ${bonusMsg}`);
        updateHeaderUserUI(res.user);
      } else {
        window.notify.error('Ошибка регистрации', res?.error || 'Не удалось зарегистрироваться');
      }
    } else {
      const res = await window.authManager.login(username, password);
      if (res && res.success) {
        localStorage.setItem('simup_has_authenticated', '1');
        modalAuth?.classList.remove('active');
        authForm.reset();
        window.notify.success('С возвращением!', `Вы успешно вошли как ${res.user.username}.`);
        updateHeaderUserUI(res.user);
      } else {
        window.notify.error('Ошибка входа', res?.error || 'Не удалось войти');
      }
    }
  });

  // Universal backdrop dismissal for modals (except mandatory auth)
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        if (overlay.id === 'modal-auth' && (!window.authManager || !window.authManager.isAuthenticated())) {
          return; // Mandatory auth
        }
        overlay.classList.remove('active');
      }
    });
  });

  // Prompt nickname & password modal on first launch and check URL parameters (?ref= and ?battle=)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      localStorage.setItem('simup_ref_code', refParam);
      window.notify?.info('🤝 Приглашение', `Вас пригласил игрок ${refParam}! Зарегистрируйтесь и получите стартовый подарок +$5,000.00!`);
    }

    const isAuth = window.authManager && window.authManager.isAuthenticated();
    if (!isAuth) {
      setTimeout(() => {
        openAuthModal('register');
      }, 100);
    }

    const hasBattle = urlParams.get('battle_id') || urlParams.get('battle') || urlParams.get('battle_up') || urlParams.get('battle_mode');
    if (hasBattle) {
      setTimeout(() => {
        if (typeof switchTab === 'function') switchTab('casebattle');
        window.caseBattleEngine?.checkUrlForInvite();
      }, 400);
    }
  } catch (e) {}

  // =========================================================================
  // USER STATE LISTENER
  // =========================================================================
  window.authManager.onUserChange((user) => {
    updateHeaderUserUI(user);
    if (user && profileContainer) {
      renderProfilePage();
    }
    // Re-render inventory page & drawer & arena
    try {
      if (typeof renderInventoryPage === 'function') {
        renderInventoryPage();
      }
      if (typeof renderInventoryDrawer === 'function') {
        renderInventoryDrawer();
      }
      if (typeof updateUpgraderUI === 'function') {
        updateUpgraderUI();
      }
      if (typeof renderLeaderboard === 'function') {
        renderLeaderboard();
      }
    } catch (e) {
      console.warn('UI update on user change notice:', e);
    }
  });

  function updateHeaderUserUI(user) {
    if (user) {
      const totalWagered = user.stats?.totalWagered || 0;
      const level = user.level !== undefined ? user.level : Math.floor(totalWagered / 250);

      headerBalanceEl.textContent = `$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      userHeaderContainer.innerHTML = `
        <div class="user-profile-btn" id="header-user-btn" title="Профиль ${user.username}">
          <span class="user-name-label">${user.username}</span>
          <span class="player-title-badge-header">${user.equippedTitle || 'Новичок'}</span>
          <span class="user-level-pill">LVL ${level}</span>
        </div>
      `;
      document.getElementById('header-user-btn')?.addEventListener('click', () => {
        switchTab('profile');
      });
    } else {
      headerBalanceEl.textContent = '$0.00';
      userHeaderContainer.innerHTML = `
        <button class="btn-login-trigger" id="btn-header-login">
          <span class="btn-login-full">Вход / Регистрация</span>
          <span class="btn-login-compact">Войти</span>
        </button>
      `;
      document.getElementById('btn-header-login')?.addEventListener('click', () => {
        openAuthModal('login');
      });
    }
  }
  window.updateHeaderUserUI = updateHeaderUserUI;

  // Initial user header display
  if (window.authManager.currentUser) {
    updateHeaderUserUI(window.authManager.currentUser);
  }

  // =========================================================================
  // CATALOG ENGINE INITIALIZATION (BLOCK 1 CORE)
  // =========================================================================
  window.catalogController.init();
  renderCatalog();

  function renderCatalog() {
    window.catalogController.renderTo(skinsGrid, (selectedSkin) => {
      window.notify.info('Выбран целевой скин', `${selectedSkin.name} (${selectedSkin.wearName}) за $${selectedSkin.price.toFixed(2)}`);
      // Scroll smoothly to top upgrader arena
      document.getElementById('upgrader-arena-placeholder')?.scrollIntoView({ behavior: 'smooth' });
    });

    const count = window.catalogController.getFilteredSkins().length;
    catalogCountBadge.textContent = `${count} ${getNoun(count, 'скин', 'скина', 'скинов')}`;
  }

  function getNoun(number, one, two, five) {
    let n = Math.abs(number);
    n %= 100;
    if (n >= 5 && n <= 20) return five;
    n %= 10;
    if (n === 1) return one;
    if (n >= 2 && n <= 4) return two;
    return five;
  }

  // Catalog search input
  catalogSearchInput.addEventListener('input', (e) => {
    window.catalogController.setSearchQuery(e.target.value);
    renderCatalog();
  });

  // Game filter pills
  gameFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      gameFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      window.catalogController.setGameFilter(pill.dataset.game);
      renderCatalog();
    });
  });

  // Price quick filter pills
  priceFilterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      priceFilterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const range = pill.dataset.priceRange;
      if (range === 'all') {
        window.catalogController.setPriceRange(0, 999999);
      } else if (range === 'budget') {
        window.catalogController.setPriceRange(0, 20);
      } else if (range === 'mid') {
        window.catalogController.setPriceRange(20, 200);
      } else if (range === 'high') {
        window.catalogController.setPriceRange(200, 1000);
      } else if (range === 'knife') {
        window.catalogController.setPriceRange(1000, 999999);
      }
      renderCatalog();
    });
  });

  // Rarity dropdown
  rarityFilterSelect.addEventListener('change', (e) => {
    window.catalogController.setRarityFilter(e.target.value);
    renderCatalog();
  });

  // Sort dropdown
  sortFilterSelect.addEventListener('change', (e) => {
    window.catalogController.setSortBy(e.target.value);
    renderCatalog();
  });

  // =========================================================================
  // BLOCK 2: BANK & CREDIT CONTROLLER (FAUCETS REMOVED)
  // =========================================================================
  const loanStatusBadge = document.getElementById('loan-status-badge');
  const loanMaxLimitEl = document.getElementById('loan-max-limit');
  const loanCurrentDebtEl = document.getElementById('loan-current-debt');
  const loanRatingPenaltyEl = document.getElementById('loan-rating-penalty');
  const loanInputAmount = document.getElementById('loan-input-amount');
  const btnTakeLoan = document.getElementById('btn-take-loan');
  const loanRepayInput = document.getElementById('loan-repay-input');
  const btnRepayPartial = document.getElementById('btn-repay-partial');
  const btnRepayFull = document.getElementById('btn-repay-full');
  const loanChips = document.querySelectorAll('[data-loan-chip]');
  const loanAutoRepayToggle = document.getElementById('loan-auto-repay-toggle');

  // Quick header & profile buttons redirect directly to Bank
  document.getElementById('btn-header-bank')?.addEventListener('click', () => {
    switchTab('bank');
  });
  document.getElementById('header-balance-card')?.addEventListener('click', () => {
    switchTab('bank');
  });
  document.getElementById('btn-quick-deposit')?.addEventListener('click', () => {
    switchTab('bank');
  });

  loanChips.forEach(btn => {
    btn.addEventListener('click', () => {
      const chipVal = btn.dataset.loanChip;
      const num = parseFloat(chipVal);
      if (!isNaN(num)) {
        loanInputAmount.value = Math.min(100000, num);
      }
    });
  });

  btnTakeLoan?.addEventListener('click', () => {
    const val = parseFloat(loanInputAmount.value);
    if (isNaN(val) || val < 10) {
      window.notify.warning('Сумма займа', 'Минимальная сумма кредита — $10.00.');
      return;
    }
    if (val > 100000) {
      window.notify.error('Лимит превышен 🛑', 'Максимальная сумма разового займа — $100,000.00! У вас не получилось взять кредит, так как сумма превышает $100,000. Уменьшите разовую сумму.');
      return;
    }
    const res = window.economyManager.takeLoan(val);
    if (res.success) {
      loanInputAmount.value = '';
      renderBankPage();
    } else {
      window.notify.error('Ошибка займа', res.error);
    }
  });

  btnRepayPartial?.addEventListener('click', () => {
    const val = parseFloat(loanRepayInput.value);
    const res = window.economyManager.repayLoan(val);
    if (res.success) {
      loanRepayInput.value = '';
      renderBankPage();
    } else {
      window.notify.error('Ошибка платежа', res.error);
    }
  });

  btnRepayFull?.addEventListener('click', () => {
    const user = window.authManager.currentUser;
    if (!user) return;
    const debt = user.loans?.currentDebt || 0;
    const res = window.economyManager.repayLoan(debt);
    if (res.success) {
      loanRepayInput.value = '';
      renderBankPage();
    } else {
      window.notify.error('Ошибка платежа', res.error);
    }
  });

  loanAutoRepayToggle?.addEventListener('change', (e) => {
    window.economyManager.toggleAutoRepay(e.target.checked);
    window.notify.info(
      'Автопогашение',
      e.target.checked
        ? 'Автопогашение включено (20% с чистых выигрышей пойдет в счет долга)'
        : 'Автопогашение кредита отключено'
    );
  });

  function renderBankPage() {
    const user = window.authManager.currentUser;
    if (!user) return;

    const maxLimit = window.economyManager.getMaxLoanLimit(user);
    const debt = user.loans?.currentDebt || 0;
    const debtPenalty = debt * 1.5;

    if (loanMaxLimitEl) {
      loanMaxLimitEl.textContent = isFinite(maxLimit) ? `$${maxLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}` : 'БЕЗЛИМИТ ∞';
    }
    if (loanCurrentDebtEl) {
      loanCurrentDebtEl.textContent = `$${debt.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
    if (loanRatingPenaltyEl) {
      loanRatingPenaltyEl.textContent = `-$${debtPenalty.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }
    if (loanAutoRepayToggle) {
      loanAutoRepayToggle.checked = user.loans?.autoRepay !== false;
    }

    if (debt <= 0) {
      loanStatusBadge.className = 'loan-status-pill loan-status-clean';
      loanStatusBadge.textContent = 'Без долгов';
    } else if (debt > user.balance || debt > 3000) {
      loanStatusBadge.className = 'loan-status-pill loan-status-danger';
      loanStatusBadge.textContent = 'Критический долг';
    } else {
      loanStatusBadge.className = 'loan-status-pill loan-status-active';
      loanStatusBadge.textContent = 'Активный кредит';
    }

    renderDailyStreak();
    renderAchievements();
  }

  window.renderBankPage = renderBankPage;
  window.updateHeaderUserUI = updateHeaderUserUI;

  // React to any user profile updates (including auto-repay debt deductions)
  window.authManager.subscribe((user) => {
    if (user) {
      updateHeaderUserUI(user);
      renderBankPage();
    }
  });

  // =========================================================================
  // BLOCK 2: DAILY STREAK REWARDS
  // =========================================================================
  const streakCardsGrid = document.getElementById('streak-cards-grid');
  const streakCounterBadge = document.getElementById('streak-counter-badge');
  const streakTimerText = document.getElementById('streak-timer-text');
  const btnClaimStreak = document.getElementById('btn-claim-streak');

  function renderDailyStreak() {
    const user = window.authManager.currentUser;
    if (!user) return;

    const status = window.economyManager.getDailyStatus(user);
    streakCounterBadge.textContent = `Серия: ${status.streak} дн.`;

    if (status.canClaim) {
      streakTimerText.innerHTML = `<span style="color: var(--accent-color); font-weight: 700;">🎁 Награда за День ${status.currentDay} готова к получению!</span>`;
      btnClaimStreak.disabled = false;
      btnClaimStreak.style.opacity = '1';
    } else {
      const hours = Math.floor(status.timeLeftMs / (1000 * 60 * 60));
      const mins = Math.floor((status.timeLeftMs % (1000 * 60 * 60)) / (1000 * 60));
      streakTimerText.innerHTML = `Следующая награда через: <strong>${hours}ч ${mins}м</strong>`;
      btnClaimStreak.disabled = true;
      btnClaimStreak.style.opacity = '0.5';
    }

    streakCardsGrid.innerHTML = '';
    window.economyManager.DAILY_STREAK_REWARDS.forEach(d => {
      const isClaimed = d.day <= status.streak && !status.canClaim;
      const isToday = d.day === status.currentDay && status.canClaim;

      const card = document.createElement('div');
      card.className = `streak-day-card ${isClaimed ? 'claimed' : ''} ${isToday ? 'active-today' : ''}`;
      card.innerHTML = `
        <div class="streak-day-title">${d.day === 7 ? '★ ДЕНЬ 7' : `ДЕНЬ ${d.day}`}</div>
        <div class="streak-day-icon">${d.specialGift ? '🗡️' : '💰'}</div>
        <div class="streak-day-amount">+$${d.reward}</div>
      `;
      streakCardsGrid.appendChild(card);
    });
  }

  btnClaimStreak.addEventListener('click', () => {
    const res = window.economyManager.claimDailyReward();
    if (res.success) {
      renderBankPage();
    } else {
      window.notify.error('Ежедневный бонус', res.error);
    }
  });

  // =========================================================================
  // BLOCK 2: ACHIEVEMENTS CONTROLLER
  // =========================================================================
  const achievementsContainer = document.getElementById('achievements-list-container');
  const achCompletedCount = document.getElementById('ach-completed-count');

  function renderAchievements() {
    const user = window.authManager.currentUser;
    if (!user) return;

    if (!user.claimedAchievements) user.claimedAchievements = [];

    let completed = 0;
    achievementsContainer.innerHTML = '';

    window.economyManager.ACHIEVEMENTS_CONFIG.forEach(ach => {
      const isClaimed = user.claimedAchievements.includes(ach.id);
      const isReadyToClaim = !isClaimed && ach.check(user);

      if (isClaimed) completed++;

      const card = document.createElement('div');
      card.className = `achievement-card ${isClaimed ? 'completed' : ''}`;

      let btnHtml = '';
      if (isClaimed) {
        btnHtml = `<button class="btn-claim-ach disabled" disabled>✓ Получено</button>`;
      } else if (isReadyToClaim) {
        btnHtml = `<button class="btn-claim-ach" data-ach-claim="${ach.id}">Забрать +$${ach.reward}</button>`;
      } else {
        btnHtml = `<button class="btn-claim-ach disabled" disabled>В процессе</button>`;
      }

      card.innerHTML = `
        <div class="ach-left-col">
          <div class="ach-icon-box">${ach.icon}</div>
          <div>
            <div class="ach-title">${ach.title}</div>
            <div class="ach-desc">${ach.desc}</div>
            <span class="ach-reward-badge">+ $${ach.reward.toFixed(2)}</span>
          </div>
        </div>
        <div>
          ${btnHtml}
        </div>
      `;

      achievementsContainer.appendChild(card);
    });

    achCompletedCount.textContent = `Выполнено: ${completed} / ${window.economyManager.ACHIEVEMENTS_CONFIG.length}`;

    // Attach claim listeners
    achievementsContainer.querySelectorAll('[data-ach-claim]').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.achClaim;
        const res = window.economyManager.claimAchievement(id);
        if (res.success) {
          renderAchievements();
        }
      });
    });
  }

  // =========================================================================
  // BLOCK 2: PROFILE PAGE & INVENTORY MANAGEMENT
  // =========================================================================
  const modalSellAll = document.getElementById('modal-sell-all');
  const sellAllModalClose = document.getElementById('sell-all-modal-close');
  const btnCancelSellAll = document.getElementById('btn-cancel-sell-all');
  const btnConfirmSellAll = document.getElementById('btn-confirm-sell-all');
  const sellAllSummaryText = document.getElementById('sell-all-summary-text');

  function openSellAllModal() {
    const user = window.authManager.currentUser;
    if (!user || !user.inventory || user.inventory.length === 0) {
      window.notify.warning('Инвентарь пуст', 'У вас нет предметов для продажи.');
      return;
    }
    const totalVal = user.inventory.reduce((s, it) => s + (it.price || 0), 0);
    sellAllSummaryText.innerHTML = `Вы получите <strong>+$${totalVal.toFixed(2)}</strong> на баланс за продажу всех <strong>${user.inventory.length}</strong> предметов.`;
    modalSellAll.classList.add('active');
  }

  function closeSellAllModal() {
    modalSellAll.classList.remove('active');
  }

  sellAllModalClose.addEventListener('click', closeSellAllModal);
  btnCancelSellAll.addEventListener('click', closeSellAllModal);

  btnConfirmSellAll.addEventListener('click', () => {
    const res = window.economyManager.sellAllItems();
    closeSellAllModal();
    if (res.success) {
      renderProfilePage();
      renderInventoryPage();
      if (typeof updateUpgraderUI === 'function') updateUpgraderUI();
    }
  });

  function renderProfilePage() {
    const user = window.authManager.currentUser;
    if (!user) {
      profileContainer.innerHTML = `
        <div style="padding: 40px;">
          <div style="font-size: 44px; margin-bottom: 12px;">🔒</div>
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 10px;">Профиль недоступен</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Пожалуйста, войдите в аккаунт, чтобы просмотреть инвентарь и статистику.</p>
          <button class="btn-submit-action" style="max-width: 200px; margin: 0 auto;" onclick="window.showAuthModal('login')">Войти в аккаунт</button>
        </div>
      `;
      return;
    }

    const regDate = new Date(user.createdAt).toLocaleDateString('ru-RU');
    const itemsCount = user.inventory.length;
    const invValue = user.inventory.reduce((sum, item) => sum + (item.price || 0), 0);
    const totalWagered = user.stats?.totalWagered || 0;
    const level = user.level !== undefined ? user.level : Math.floor(totalWagered / 250);
    const xpInCurrentLevel = Math.floor(totalWagered % 250);
    const progressPercent = Math.min(100, Math.floor((xpInCurrentLevel / 250) * 100));

    profileContainer.innerHTML = `
      <div style="max-width: 900px; margin: 0 auto; text-align: left;">
        <!-- Profile Header -->
        <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--border-color); padding-bottom: 20px; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
          <div style="display: flex; align-items: center; gap: 16px;">
            <div>
              <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                <h2 style="font-size: 24px; font-weight: 800; color: #fff;">${user.username}</h2>
                <span class="player-title-badge">${user.equippedTitle || 'Новичок'}</span>
                <span class="user-level-pill">LVL ${level}</span>
                <button id="btn-edit-nickname" title="Сменить никнейм" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; padding: 4px 10px; font-size: 11.5px; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: all 0.2s;">
                  ✏️ Сменить ник
                </button>
              </div>
              <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">Регистрация: ${regDate} | ID: #${user.id.slice(-6)}</div>
              <div style="display: flex; align-items: center; gap: 10px; margin-top: 8px;">
                <div style="width: 160px; height: 8px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; position: relative;">
                  <div style="width: ${progressPercent}%; height: 100%; background: linear-gradient(90deg, var(--accent-color), #ffd700); border-radius: 999px; transition: width 0.3s ease;"></div>
                </div>
                <span style="font-size: 11.5px; color: var(--text-dim); font-weight: 700;">$${xpInCurrentLevel} / $250 XP до след. уровня</span>
              </div>
            </div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button id="btn-export-backup" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); color: #fff; padding: 9px 13px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; cursor: pointer; transition: all var(--transition-fast);" title="Сохранить профиль в JSON файл">
              💾 Экспорт
            </button>
            <button id="btn-import-backup-trigger" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); color: #fff; padding: 9px 13px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; cursor: pointer; transition: all var(--transition-fast);" title="Загрузить профиль из JSON файла">
              📥 Импорт
            </button>
            <input type="file" id="input-import-backup" accept=".json" style="display: none;">
            <button id="btn-profile-deposit" class="btn-deposit" style="padding: 9px 16px;">
              🏦 Кредит в Банке
            </button>
            <button id="btn-logout" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239, 68, 68, 0.3); color: #f87171; padding: 9px 16px; border-radius: var(--radius-sm); font-weight: 700; cursor: pointer; transition: all var(--transition-fast);">
              Выйти
            </button>
          </div>
        </div>

        <!-- Stats Overview Cards -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 12px; margin-bottom: 28px;">
          <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Баланс</div>
            <div style="font-size: 20px; font-weight: 800; color: var(--accent-color); margin-top: 4px;">$${user.balance.toFixed(2)}</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Стоимость инвентаря</div>
            <div style="font-size: 20px; font-weight: 800; color: #fff; margin-top: 4px;">$${invValue.toFixed(2)} (${itemsCount} шт.)</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Апгрейды</div>
            <div style="font-size: 20px; font-weight: 800; color: #fff; margin-top: 4px;">${user.stats.totalUpgrades} (Win: ${user.stats.wonUpgrades})</div>
          </div>
          <div style="background: rgba(0,0,0,0.3); padding: 14px; border-radius: var(--radius-md); border: 1px solid var(--border-color);">
            <div style="font-size: 11px; text-transform: uppercase; color: var(--text-dim); font-weight: 700;">Долг по кредиту</div>
            <div style="font-size: 20px; font-weight: 800; color: ${user.loans.currentDebt > 0 ? '#ef4444' : '#10b981'}; margin-top: 4px;">$${(user.loans.currentDebt || 0).toFixed(2)}</div>
          </div>
        </div>

        <!-- REFERRAL PROGRAM & PASS BANNER -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 14px; margin-bottom: 24px;">
          <!-- Referral Card -->
          <div style="background: rgba(255, 0, 77, 0.05); border: 1px solid rgba(255, 0, 77, 0.25); border-radius: var(--radius-md); padding: 18px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
              <span style="font-weight: 800; color: #fff; font-size: 14px;">🤝 Реферальная система</span>
              <span style="font-size: 11px; font-weight: 700; color: var(--accent-color); background: rgba(255,0,77,0.15); padding: 2px 8px; border-radius: 999px;">+$5,000 другу / +$2,500 вам</span>
            </div>
            <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 12px;">
              Поделитесь ссылкой с другом! При регистрации он получит <strong>+$5,000.00</strong> бонуса, а вы — <strong>+$2,500.00</strong> на баланс!
            </p>
            <div style="display: flex; gap: 6px; margin-bottom: 10px;">
              <input type="text" id="ref-link-input" readonly value="${window.location.origin}${window.location.pathname}?ref=${user.username}" style="flex: 1; background: rgba(0,0,0,0.5); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; padding: 6px 10px; font-size: 11.5px; outline: none;">
              <button id="btn-copy-ref-link" class="btn-sm-action" style="background: var(--accent-gradient); color: #fff; border: 1px solid #ff004d; border-radius: 6px; padding: 6px 12px; font-weight: 800; cursor: pointer; white-space: nowrap; font-size: 11.5px;">Копировать</button>
            </div>
            <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11.5px; color: var(--text-muted);">
              <span>Приглашено: <strong style="color: #fff;">${user.referrals?.count || 0} чел.</strong></span>
              <span>Заработано: <strong style="color: #10b981;">+$${(user.referrals?.totalBonus || 0).toFixed(2)}</strong></span>
            </div>
            ${!user.referredBy ? `
              <div style="margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.08); display: flex; gap: 6px;">
                <input type="text" id="ref-redeem-code-input" placeholder="Код приглашения друга" style="flex: 1; background: rgba(0,0,0,0.4); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; padding: 6px 10px; font-size: 11.5px; outline: none;">
                <button id="btn-redeem-ref-code" class="btn-sm-action" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: #fff; border-radius: 6px; padding: 6px 12px; font-weight: 700; cursor: pointer; white-space: nowrap; font-size: 11.5px;">Активировать</button>
              </div>
            ` : `<div style="margin-top: 8px; font-size: 11px; color: var(--text-dim);">Активирован код от игрока: <strong style="color: #fff;">${user.referredBy}</strong></div>`}
          </div>

          <!-- SIMUP PASS & Quick Admin Card -->
          <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <span style="font-weight: 800; color: #fff; font-size: 14px;">👑 SIMUP PASS: Уровень ${user.pass?.level || 1}</span>
                <span style="font-size: 11px; font-weight: 800; color: #ffd700;">XP: ${user.pass?.xp || 0}</span>
              </div>
              <p style="font-size: 12px; color: var(--text-dim); margin-bottom: 12px;">
                Повышайте уровень ставками и квестами! Забирайте эксклюзивные скины, скидки на комиссию до 0% и льготы по кредитам.
              </p>
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button onclick="window.switchTab('pass')" class="btn-sm-action" style="flex: 1; background: var(--accent-gradient); color: #fff; border: 1px solid #ff004d; border-radius: 6px; padding: 8px; font-weight: 800; cursor: pointer; text-align: center;">
                Открыть SIMUP PASS 👑
              </button>
              <button onclick="window.switchTab('admin')" class="btn-sm-action" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); color: var(--text-dim); border-radius: 6px; padding: 8px 12px; font-weight: 700; cursor: pointer;">
                ⚙️ Админка
              </button>
            </div>
          </div>
        </div>

        <!-- TITLES SHOWCASE SECTION -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div>
              <div style="font-size: 15px; font-weight: 800; color: #fff;">🎖️ Титулы игрока</div>
              <div style="font-size: 11.5px; color: var(--text-dim);">Титул отображается в шапке, рейтинге и дуэлях рядом с никнеймом</div>
            </div>
            <span style="font-size: 12px; font-weight: 800; color: var(--accent-color);">
              Открыто: ${(user.unlockedTitles || ['Новичок']).length} из ${(window.TITLES_LIST || []).length}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 10px;">
            ${(window.TITLES_LIST || []).map(t => {
              const isUnlocked = (user.unlockedTitles || ['Новичок']).includes(t.name) || t.id === 'novice';
              const isEquipped = (user.equippedTitle || 'Новичок') === t.name;
              return `
                <div style="background: ${isEquipped ? 'rgba(255, 0, 77, 0.12)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${isEquipped ? '#ff004d' : (isUnlocked ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)')}; border-radius: 8px; padding: 12px; opacity: ${isUnlocked ? '1' : '0.5'}; transition: all 0.2s;">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                    <span style="font-size: 18px;">${t.icon}</span>
                    ${isEquipped ? `
                      <span style="font-size: 10px; font-weight: 900; color: #fff; background: #ff004d; padding: 2px 7px; border-radius: 999px;">АКТИВЕН</span>
                    ` : (isUnlocked ? `
                      <button class="btn-equip-title" data-title-name="${t.name}" style="background: rgba(255,255,255,0.08); border: 1px solid var(--border-color); color: #fff; font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 4px; cursor: pointer;">Надеть</button>
                    ` : `
                      <span style="font-size: 10px; color: var(--text-dim);">🔒 Закрыто</span>
                    `)}
                  </div>
                  <div style="font-weight: 800; font-size: 13px; color: #fff;">${t.name}</div>
                  <div style="font-size: 11px; color: var(--text-dim); margin-top: 3px;">${t.desc}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- ACHIEVEMENTS SECTION -->
        <div style="background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 18px; margin-bottom: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
            <div>
              <div style="font-size: 15px; font-weight: 800; color: #fff;">🏆 Достижения и награды</div>
              <div style="font-size: 11.5px; color: var(--text-dim);">Выполняйте задания для получения бонусного баланса, опыта и титулов</div>
            </div>
            <span style="font-size: 12px; font-weight: 800; color: #10b981;">
              Забрано: ${Object.keys(user.achievements || {}).filter(k => user.achievements[k]?.claimed).length} из ${(window.ACHIEVEMENTS_LIST || []).length}
            </span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 12px;">
            ${(window.ACHIEVEMENTS_LIST || []).map(ach => {
              const status = (user.achievements || {})[ach.id];
              const isClaimed = Boolean(status?.claimed);
              const prog = window.authManager.getAchievementProgress(ach);
              const canClaim = prog.completed && !isClaimed;

              return `
                <div style="background: ${canClaim ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255,255,255,0.03)'}; border: 1px solid ${canClaim ? '#10b981' : (isClaimed ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)')}; border-radius: 10px; padding: 14px; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.2s;">
                  <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                      <span style="font-size: 20px;">${ach.icon}</span>
                      <span style="font-size: 11px; font-weight: 800; color: #ffd700; background: rgba(255,215,0,0.12); padding: 2px 7px; border-radius: 999px;">
                        +$${ach.reward.toFixed(2)} | +${ach.xp} XP
                      </span>
                    </div>
                    <div style="font-weight: 800; font-size: 13.5px; color: #fff;">${ach.title}</div>
                    <div style="font-size: 11.5px; color: var(--text-dim); margin: 4px 0 10px;">${ach.desc}</div>
                    ${ach.titleUnlock ? `<div style="font-size: 11px; color: var(--accent-color); font-weight: 700; margin-bottom: 8px;">🎖️ Титул: «${ach.titleUnlock}»</div>` : ''}
                  </div>

                  <div>
                    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-bottom: 4px;">
                      <span>Прогресс:</span>
                      <span style="font-weight: 700; color: #fff;">${prog.current} / ${prog.target}</span>
                    </div>
                    <div style="width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 999px; overflow: hidden; margin-bottom: 10px;">
                      <div style="width: ${prog.percent}%; height: 100%; background: ${canClaim ? '#10b981' : 'linear-gradient(90deg, var(--accent-color), #ff004d)'}; border-radius: 999px;"></div>
                    </div>

                    ${isClaimed ? `
                      <div style="text-align: center; font-size: 11.5px; font-weight: 800; color: #10b981; padding: 6px; background: rgba(16,185,129,0.08); border-radius: 6px;">
                        ✅ Награда получена
                      </div>
                    ` : (canClaim ? `
                      <button class="btn-claim-achievement" data-ach-id="${ach.id}" style="width: 100%; background: #10b981; color: #000; border: none; font-weight: 800; font-size: 12px; padding: 8px; border-radius: 6px; cursor: pointer;">
                        Забрать награду 🎁
                      </button>
                    ` : `
                      <div style="text-align: center; font-size: 11px; color: var(--text-dim); padding: 5px;">
                        В процессе (${prog.percent}%)
                      </div>
                    `)}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Inventory Header & Action Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; flex-wrap: wrap; gap: 10px;">
          <h3 style="font-size: 18px; font-weight: 800; color: #fff;">Инвентарь предметов (${itemsCount})</h3>
          ${itemsCount > 0 ? `
            <button id="btn-trigger-sell-all" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #34d399; padding: 7px 14px; border-radius: var(--radius-sm); font-size: 13px; font-weight: 700; cursor: pointer; transition: all var(--transition-fast);">
              💰 Продать всё ($${invValue.toFixed(2)})
            </button>
          ` : ''}
        </div>

        <!-- Inventory Grid -->
        ${itemsCount === 0 ? `
          <div class="empty-catalog-state" style="padding: 40px 20px;">
            <div class="empty-icon">🎒</div>
            <div class="empty-title">Инвентарь пуст</div>
            <div class="empty-desc">Крутите апгрейды или открывайте кейсы, чтобы пополнить коллекцию скинов!</div>
          </div>
        ` : `
          <div id="user-inventory-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 14px;">
            ${user.inventory.map(item => `
              <div class="skin-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor || '#888'};">
                <div class="skin-card-header">
                  <span class="game-badge game-${item.game}">${(item.game || 'CS2').toUpperCase()}</span>
                  ${item.wear && item.wear !== 'STANDARD' ? `<span class="wear-pill">${item.wear}</span>` : ''}
                </div>
                <div class="skin-img-wrap">
                  <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="skin-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
                </div>
                <div class="skin-info">
                  <div class="skin-name" title="${item.name}">${item.name}</div>
                  <div class="skin-price" style="font-size: 15px; margin: 4px 0;">$${item.price.toFixed(2)}</div>
                  <div class="inv-card-actions">
                    <button class="btn-inv-sell" data-sell-item="${item.instanceId}">
                      💵 $${item.price.toFixed(2)}
                    </button>
                    <button class="btn-inv-upgrade" data-upgrade-item="${item.instanceId}">
                      🎯 В апгрейд
                    </button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        `}

        <!-- ROUND HISTORY & PROVABLY FAIR SECTION (BLOCK 5) -->
        <div style="margin-top: 36px; border-top: 1px solid var(--border-color); padding-top: 24px;">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; flex-wrap: wrap; gap: 10px;">
            <div>
              <h3 style="font-size: 18px; font-weight: 800; color: #fff;">История последних игр (до 50)</h3>
              <div style="font-size: 12px; color: var(--text-muted); margin-top: 2px;">
                Апгрейды и кейсы с возможностью криптографической проверки SHA-256
              </div>
            </div>
            <div style="display: flex; gap: 6px; flex-wrap: wrap;" id="profile-history-filter-wrap">
              <button class="game-pill-btn active" data-hist-filter="all">Все</button>
              <button class="game-pill-btn" data-hist-filter="upgrade">⚡ Апгрейды</button>
              <button class="game-pill-btn" data-hist-filter="case">📦 Кейсы</button>
              <button class="game-pill-btn" data-hist-filter="contract">📜 Контракты</button>
              <button class="game-pill-btn" data-hist-filter="mines">💣 Мины</button>
              <button class="game-pill-btn" data-hist-filter="coinflip">🪙 Коинфлип</button>
              <button class="game-pill-btn" data-hist-filter="crash">🚀 Краш</button>
            </div>
          </div>

          <div id="profile-history-items-list">
            <!-- Dynamically populated via renderProfileHistoryItems() -->
          </div>
        </div>

      </div>
    `;

    // Render History Items with active filter
    let activeHistFilter = 'all';
    renderProfileHistoryItems(activeHistFilter);

    function renderProfileHistoryItems(filter) {
      const historyContainer = document.getElementById('profile-history-items-list');
      if (!historyContainer) return;

      const history = (user.history || []).filter(h => {
        if (filter === 'all') return true;
        if (filter === 'upgrade') return h.type === 'upgrade' || !h.type;
        if (filter === 'case') return h.type === 'case';
        if (filter === 'contract') return h.type === 'contract';
        if (filter === 'mines') return h.type === 'mines';
        if (filter === 'coinflip') return h.type === 'coinflip';
        if (filter === 'crash') return h.type === 'crash';
        return true;
      });

      if (history.length === 0) {
        let emptyDesc = 'Сыграйте раунд в Апгрейде, откройте Кейс, подпишите Контракт, испытайте Мины, Коинфлип или Краш!';
        if (filter === 'case') emptyDesc = 'Вы еще не открывали кейсы.';
        else if (filter === 'contract') emptyDesc = 'Вы еще не подписывали контракты обмена.';
        else if (filter === 'mines') emptyDesc = 'Вы еще не играли в Сапер (Мины).';
        else if (filter === 'coinflip') emptyDesc = 'Вы еще не участвовали в дуэлях Coinflip 1v1.';
        else if (filter === 'crash') emptyDesc = 'Вы еще не запускали Краш-Ракету.';

        historyContainer.innerHTML = `
          <div class="empty-catalog-state" style="padding: 30px 20px;">
            <div style="font-size: 28px; margin-bottom: 8px;">📜</div>
            <div style="font-size: 15px; font-weight: 700; color: #fff;">История пуста</div>
            <div style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">
              ${emptyDesc}
            </div>
          </div>
        `;
        return;
      }

      historyContainer.innerHTML = history.map((h, idx) => {
        const timeStr = new Date(h.date || Date.now()).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        
        if (h.type === 'coinflip') {
          const isWin = h.isWin;
          const profitColor = isWin ? '#10b981' : '#ef4444';
          const profitSign = isWin ? '+' : '';
          const badgeText = isWin ? 'ПОБЕДА' : 'ПОРАЖЕНИЕ';
          const badgeClass = isWin ? 'history-status-win' : 'history-status-lose';

          return `
            <div class="history-item-row">
              <div class="history-item-left">
                <span class="history-status-badge ${badgeClass}">${badgeText}</span>
                <div style="font-size: 22px; margin: 0 4px;">🪙</div>
                <div>
                  <div style="font-weight: 800; font-size: 13.5px; color: #fff;">
                    Coinflip 1v1 (${h.chosenSide} vs ${h.winningSide})
                  </div>
                  <div class="history-meta-sub">
                    Ставка: $${(h.betAmount || 0).toFixed(2)} • Сторона: ${h.chosenSide === 'T' ? 'Terrorist' : 'Counter-T'} • ${timeStr}
                  </div>
                </div>
              </div>
              <div class="history-item-right">
                <div style="text-align: right;">
                  <div style="font-weight: 900; font-size: 14.5px; color: ${profitColor};">
                    ${profitSign}$${(h.profit || 0).toFixed(2)}
                  </div>
                  <div class="history-meta-sub">${isWin ? `Выплата: $${(h.payout || 0).toFixed(2)} (1.95x)` : 'Потеряно'}</div>
                </div>
              </div>
            </div>
          `;
        }

        if (h.type === 'crash') {
          const isWin = h.isWin;
          const profitColor = isWin ? '#10b981' : '#ef4444';
          const profitSign = isWin ? '+' : '';
          const badgeText = isWin ? 'КЭШАУТ' : 'КРАШ';
          const badgeClass = isWin ? 'history-status-win' : 'history-status-lose';

          return `
            <div class="history-item-row">
              <div class="history-item-left">
                <span class="history-status-badge ${badgeClass}">${badgeText}</span>
                <div style="font-size: 22px; margin: 0 4px;">🚀</div>
                <div>
                  <div style="font-weight: 800; font-size: 13.5px; color: #fff;">
                    Краш-Ракета • ${isWin ? `Забрано на ${(h.multiplier || 1).toFixed(2)}x` : `Взрыв на ${(h.crashPoint || 1).toFixed(2)}x`}
                  </div>
                  <div class="history-meta-sub">
                    Ставка: $${(h.betAmount || 0).toFixed(2)} • Взрыв: ${(h.crashPoint || 1).toFixed(2)}x • ${timeStr}
                  </div>
                </div>
              </div>
              <div class="history-item-right">
                <div style="text-align: right;">
                  <div style="font-weight: 900; font-size: 14.5px; color: ${profitColor};">
                    ${profitSign}$${(h.profit || 0).toFixed(2)}
                  </div>
                  <div class="history-meta-sub">${isWin ? `Выплата: $${(h.payout || 0).toFixed(2)}` : 'Сгорело'}</div>
                </div>
              </div>
            </div>
          `;
        }

        if (h.type === 'mines') {
          const isProfit = (h.profit || 0) >= 0;
          const profitSign = isProfit ? '+' : '';
          const profitColor = isProfit ? '#10b981' : '#ef4444';
          const badgeText = h.isWin ? 'ВЫИГРЫШ' : 'ПОРАЖЕНИЕ';
          const badgeClass = h.isWin ? 'history-status-win' : 'history-status-lose';

          return `
            <div class="history-item-row">
              <div class="history-item-left">
                <span class="history-status-badge ${badgeClass}">${badgeText}</span>
                <div style="font-size: 22px; margin: 0 4px;">${h.isWin ? '💎' : '💥'}</div>
                <div>
                  <div style="font-weight: 800; font-size: 13.5px; color: #fff;">
                    Мины (${h.minesCount} шт) • ${h.isWin ? `${(h.multiplier || 1).toFixed(2)}x` : 'Взрыв'}
                  </div>
                  <div class="history-meta-sub">
                    Открыто алмазов: ${h.gemsFound || 0} • Ставка: $${(h.betAmount || 0).toFixed(2)} • ${timeStr}
                  </div>
                </div>
              </div>
              <div class="history-item-right">
                <div style="text-align: right;">
                  <div style="font-weight: 900; font-size: 14.5px; color: ${profitColor};">
                    ${profitSign}$${(h.profit || 0).toFixed(2)}
                  </div>
                  <div class="history-meta-sub">${h.isWin ? `Выплата: $${(h.payout || 0).toFixed(2)}` : 'Потеряно'}</div>
                </div>
              </div>
            </div>
          `;
        }

        if (h.type === 'contract') {
          const isProfit = (h.profit || 0) >= 0;
          const profitSign = isProfit ? '+' : '';
          const profitColor = isProfit ? '#10b981' : '#ef4444';

          return `
            <div class="history-item-row">
              <div class="history-item-left">
                <span class="history-status-badge" style="background: rgba(245, 158, 11, 0.15); color: #fbbf24; border: 1px solid rgba(245, 158, 11, 0.3);">КОНТРАКТ</span>
                <img src="${h.winner?.image || ''}" alt="" style="width: 38px; height: 26px; object-fit: contain;">
                <div>
                  <div style="font-weight: 800; font-size: 13.5px; color: #fff;">${h.winner?.name || 'Предмет'}</div>
                  <div class="history-meta-sub">Контракт (${h.contractItemsCount || 0} предм.) • Вложено: $${(h.totalCost || 0).toFixed(2)} • ${timeStr}</div>
                </div>
              </div>
              <div class="history-item-right">
                <div style="text-align: right;">
                  <div style="font-weight: 900; font-size: 14.5px; color: ${profitColor};">
                    ${profitSign}$${(h.profit || 0).toFixed(2)}
                  </div>
                  <div class="history-meta-sub">Дроп: $${(h.winner?.price || 0).toFixed(2)}</div>
                </div>
              </div>
            </div>
          `;
        }

        if (h.type === 'case') {
          const isProfit = h.profit >= 0;
          const profitSign = isProfit ? '+' : '';
          const profitColor = isProfit ? '#10b981' : '#ef4444';

          return `
            <div class="history-item-row">
              <div class="history-item-left">
                <span class="history-status-badge" style="background: rgba(168, 85, 247, 0.15); color: #c084fc; border: 1px solid rgba(168, 85, 247, 0.3);">КЕЙС</span>
                <img src="${h.winner?.image || ''}" alt="" style="width: 38px; height: 26px; object-fit: contain;">
                <div>
                  <div style="font-weight: 800; font-size: 13.5px; color: #fff;">${h.winner?.name || 'Предмет'}</div>
                  <div class="history-meta-sub">${h.caseName || 'Кейс'} • Стоимость: $${(h.cost || 0).toFixed(2)} • ${timeStr}</div>
                </div>
              </div>
              <div class="history-item-right">
                <div style="text-align: right;">
                  <div style="font-weight: 900; font-size: 14.5px; color: ${profitColor};">
                    ${profitSign}$${h.profit.toFixed(2)}
                  </div>
                  <div class="history-meta-sub">Дроп: $${(h.winner?.price || 0).toFixed(2)}</div>
                </div>
              </div>
            </div>
          `;
        }

        // Upgrade item
        const isWin = h.isWin;
        const statusBadge = isWin 
          ? `<span class="history-status-badge history-status-win">ПОБЕДА</span>`
          : `<span class="history-status-badge history-status-lose">ПОРАЖЕНИЕ</span>`;

        return `
          <div class="history-item-row">
            <div class="history-item-left">
              ${statusBadge}
              ${h.targetSkin ? `<img src="${h.targetSkin.image}" alt="" style="width: 38px; height: 26px; object-fit: contain;">` : ''}
              <div>
                <div style="font-weight: 800; font-size: 13.5px; color: #fff;">
                  ${h.targetSkin?.name || 'Скин для апгрейда'}
                </div>
                <div class="history-meta-sub">
                  Выпало: <strong style="color: #fff;">${h.roll}</strong> • Шанс: ${h.chance}% • Множитель: ${h.multiplier}x • ${timeStr}
                </div>
              </div>
            </div>

            <div class="history-item-right">
              <div style="text-align: right;">
                <div style="font-weight: 900; font-size: 14.5px; color: ${isWin ? 'var(--accent-color)' : 'var(--text-muted)'};">
                  ${isWin ? `+$${(h.targetSkin?.price || 0).toFixed(2)}` : `-$${(h.totalBet || 0).toFixed(2)}`}
                </div>
                <div class="history-meta-sub">Ставка: $${(h.totalBet || 0).toFixed(2)}</div>
              </div>
            </div>
          </div>
        `;
      }).join('');
    }

    // Filter pill buttons in history
    document.querySelectorAll('#profile-history-filter-wrap .game-pill-btn').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('#profile-history-filter-wrap .game-pill-btn').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        activeHistFilter = pill.dataset.histFilter;
        renderProfileHistoryItems(activeHistFilter);
      });
    });

    document.getElementById('btn-export-backup')?.addEventListener('click', () => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(user, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `simup_backup_${user.username}_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      window.notify.success('Бэкап сохранен', `Профиль ${user.username} успешно экспортирован в JSON.`);
    });

    const fileInput = document.getElementById('input-import-backup');
    document.getElementById('btn-import-backup-trigger')?.addEventListener('click', () => {
      fileInput?.click();
    });

    fileInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const importedUser = JSON.parse(event.target.result);
          if (!importedUser.username || typeof importedUser.balance !== 'number') {
            throw new Error('Некорректный формат файла сохранения.');
          }

          const accounts = window.authManager.getAllUsers();
          const existingIdx = accounts.findIndex(a => a.id === importedUser.id || a.username.toLowerCase() === importedUser.username.toLowerCase());
          if (existingIdx !== -1) {
            accounts[existingIdx] = importedUser;
          } else {
            accounts.push(importedUser);
          }

          localStorage.setItem('simup_accounts_v1', JSON.stringify(accounts));
          window.authManager.currentUser = importedUser;
          window.authManager.saveCurrentUser();

          window.notify.bigWin('Импорт завершен!', `Профиль ${importedUser.username} успешно загружен!`);
          renderProfilePage();
          updateHeaderUserUI(importedUser);
        } catch (err) {
          window.notify.error('Ошибка импорта', err.message || 'Не удалось прочитать файл');
        }
      };
      reader.readAsText(file);
    });

    document.getElementById('btn-profile-deposit')?.addEventListener('click', () => {
      switchTab('bank');
    });

    document.getElementById('btn-trigger-sell-all')?.addEventListener('click', openSellAllModal);

    document.getElementById('btn-copy-ref-link')?.addEventListener('click', () => {
      const input = document.getElementById('ref-link-input');
      if (input) {
        input.select();
        navigator.clipboard?.writeText(input.value);
        window.notify?.bigWin('Ссылка скопирована! 📋', 'Отправьте ссылку другу: ' + input.value);
      }
    });

    document.getElementById('btn-redeem-ref-code')?.addEventListener('click', () => {
      const codeInput = document.getElementById('ref-redeem-code-input');
      if (!codeInput || !codeInput.value.trim()) {
        window.notify?.warning('Внимание', 'Введите реферальный код друга.');
        return;
      }
      const res = window.authManager.redeemReferralCode(codeInput.value.trim());
      if (res.success) {
        window.notify?.bigWin('Код активирован! 🎉', `Вам начислен стартовый подарок +$${res.bonus.toLocaleString()}.00 от игрока ${res.referrer}!`);
        renderProfilePage();
      } else {
        window.notify?.error('Ошибка кода', res.error);
      }
    });

    document.getElementById('btn-logout')?.addEventListener('click', () => {
      window.authManager.logout();
      window.notify.info('Выход', 'Вы вышли из своего профиля.');
      switchTab('upgrader');
    });

    // Nickname Change Listener
    document.getElementById('btn-edit-nickname')?.addEventListener('click', () => {
      const currentNick = user.username;
      const newNick = prompt('Введите новый никнейм игрока (от 3 до 18 символов):', currentNick);
      if (newNick && newNick.trim() && newNick.trim() !== currentNick) {
        const res = window.authManager.changeNickname(newNick.trim());
        if (res.success) {
          window.notify.success('Никнейм изменен! ✨', `Ваш новый никнейм: ${res.newNick}!`);
          renderProfilePage();
          updateHeaderUserUI(window.authManager.currentUser);
        } else {
          window.notify.error('Ошибка смены ника', res.error || 'Не удалось сменить ник.');
        }
      }
    });

    // Equip Title Listeners
    document.querySelectorAll('.btn-equip-title').forEach(btn => {
      btn.addEventListener('click', () => {
        const titleName = btn.dataset.titleName;
        if (window.authManager.equipTitle(titleName)) {
          window.notify.success('Титул надет! 🎖️', `Вы надели титул «${titleName}»!`);
          renderProfilePage();
          updateHeaderUserUI(window.authManager.currentUser);
        }
      });
    });

    // Claim Achievement Listeners
    document.querySelectorAll('.btn-claim-achievement').forEach(btn => {
      btn.addEventListener('click', () => {
        const achId = btn.dataset.achId;
        const res = window.authManager.claimAchievement(achId);
        if (res.success) {
          window.notify.bigWin('ДОСТИЖЕНИЕ ПОЛУЧЕНО! 🎁', `Награда: +$${res.reward.toFixed(2)} и +${res.xp} XP!${res.unlockedTitle ? ` Открыт титул «${res.unlockedTitle}»!` : ''}`);
          renderProfilePage();
          updateHeaderUserUI(window.authManager.currentUser);
        } else {
          window.notify.error('Ошибка', res.error || 'Не удалось получить награду.');
        }
      });
    });

    // Attach individual item sell & upgrade listeners
    document.querySelectorAll('[data-sell-item]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instanceId = btn.dataset.sellItem;
        const res = window.economyManager.sellItem(instanceId);
        if (res.success) {
          renderProfilePage();
        }
      });
    });

    document.querySelectorAll('[data-upgrade-item]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instanceId = btn.dataset.upgradeItem;
        const item = user.inventory.find(it => it.instanceId === instanceId);
        if (item) {
          window.upgraderEngine.selectedItems = [item];
          switchTab('upgrader');
          updateUpgraderUI();
          window.notify.info('Скин выбран для ставки', `${item.name} ($${item.price.toFixed(2)}) отправлен на арену!`);
          document.getElementById('upgrader-arena')?.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  // =========================================================================
  // DEDICATED INVENTORY TAB CONTROLLER (FULL VIEW & SELLING)
  // =========================================================================
  let invSelectedGame = 'all';
  let invSearchQuery = '';
  let invSortOrder = 'price-desc';

  const invPageCount = document.getElementById('inv-page-count');
  const invPageTotal = document.getElementById('inv-page-total');
  const invPageGrid = document.getElementById('inv-page-grid');
  const btnInvPageSellAll = document.getElementById('btn-inv-page-sell-all');
  const btnInvSellAllBadge = document.getElementById('btn-inv-sell-all-badge');
  const invPageSearch = document.getElementById('inv-page-search');
  const invPageGamePills = document.querySelectorAll('#inv-page-game-pills .game-pill-btn');
  const invPageSort = document.getElementById('inv-page-sort');

  invPageGamePills.forEach(pill => {
    pill.addEventListener('click', () => {
      invPageGamePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      invSelectedGame = pill.dataset.invGame;
      renderInventoryPage();
    });
  });

  invPageSearch?.addEventListener('input', (e) => {
    invSearchQuery = e.target.value.toLowerCase().trim();
    renderInventoryPage();
  });

  invPageSort?.addEventListener('change', (e) => {
    invSortOrder = e.target.value;
    renderInventoryPage();
  });

  btnInvPageSellAll?.addEventListener('click', () => {
    openSellAllModal();
  });

  function renderInventoryPage() {
    const user = window.authManager?.currentUser;
    if (!invPageGrid) return;

    if (!user) {
      invPageGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center;">
          <div style="font-size: 48px; margin-bottom: 12px;">🔒</div>
          <h2 style="font-size: 22px; color: #fff; margin-bottom: 8px;">Инвентарь заблокирован</h2>
          <p style="color: var(--text-muted); margin-bottom: 20px;">Авторизуйтесь в системе, чтобы увидеть свои скины.</p>
          <button class="btn-deposit" onclick="window.showAuthModal('login')" style="padding: 10px 24px;">Войти в аккаунт</button>
        </div>
      `;
      return;
    }

    const inventory = user.inventory || [];
    const totalCount = inventory.length;
    const totalVal = inventory.reduce((sum, item) => sum + (item.price || 0), 0);

    if (invPageCount) invPageCount.textContent = totalCount;
    if (invPageTotal) invPageTotal.textContent = `$${totalVal.toFixed(2)}`;
    if (btnInvSellAllBadge) btnInvSellAllBadge.textContent = `(+$${totalVal.toFixed(2)})`;
    if (btnInvPageSellAll) btnInvPageSellAll.disabled = (totalCount === 0);

    if (totalCount === 0) {
      invPageGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: rgba(14, 8, 14, 0.6); border: 1px dashed var(--border-color); border-radius: 18px;">
          <div style="font-size: 50px; margin-bottom: 12px;">🎒</div>
          <h2 style="font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 6px;">Инвентарь пуст</h2>
          <p style="color: var(--text-dim); font-size: 13.5px; max-width: 440px; margin: 0 auto 20px;">
            У вас пока нет скинов. Вы можете приобрести их на бирже или выиграть в кейсах и апгрейде!
          </p>
          <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
            <button class="game-pill-btn active" onclick="switchTab('catalog')" style="padding: 10px 18px;">🛒 Купить в Каталоге</button>
            <button class="game-pill-btn" onclick="switchTab('cases')" style="padding: 10px 18px;">📦 Открыть Кейс</button>
            <button class="game-pill-btn" onclick="switchTab('upgrader')" style="padding: 10px 18px;">🎯 В Апгрейд</button>
          </div>
        </div>
      `;
      return;
    }

    // Filter by game
    let filtered = [...inventory];
    if (invSelectedGame !== 'all') {
      filtered = filtered.filter(item => (item.game || 'cs2') === invSelectedGame);
    }

    // Filter by search query
    if (invSearchQuery) {
      filtered = filtered.filter(item => 
        (item.name && item.name.toLowerCase().includes(invSearchQuery)) ||
        (item.nameEn && item.nameEn.toLowerCase().includes(invSearchQuery))
      );
    }

    // Sort
    if (invSortOrder === 'price-desc') {
      filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (invSortOrder === 'price-asc') {
      filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (invSortOrder === 'name') {
      filtered.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }

    if (filtered.length === 0) {
      invPageGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 40px 20px; text-align: center; color: var(--text-dim);">
          По запросу «${invSearchQuery}» ничего не найдено в инвентаре.
        </div>
      `;
      return;
    }

    invPageGrid.innerHTML = filtered.map(item => `
      <div class="skin-card skin-rarity-${item.rarity}" id="inv-card-${item.instanceId}" style="--rarity-clr: ${item.rarityColor || '#888'};">
        <div class="skin-card-header">
          <span class="game-badge game-${item.game || 'cs2'}">${(item.game || 'CS2').toUpperCase()}</span>
          ${item.wear && item.wear !== 'STANDARD' ? `<span class="wear-pill">${item.wear}</span>` : ''}
        </div>
        <div class="skin-img-wrap">
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="skin-img" loading="lazy" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
        </div>
        <div class="skin-info">
          <div class="skin-name" title="${item.name}">${item.name}</div>
          <div class="skin-price" style="font-size: 15px; margin: 4px 0; color: #ff004d; font-weight: 800;">$${item.price.toFixed(2)}</div>
          <div class="inv-card-actions" style="display: flex; gap: 6px; margin-top: 6px;">
            <button class="btn-inv-sell-card" data-sell-instance="${item.instanceId}" style="flex: 1; padding: 7px 6px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10b981; font-weight: 800; font-size: 11.5px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
              💵 Продать
            </button>
            <button class="btn-inv-upgrade-card" data-upgrade-instance="${item.instanceId}" title="Использовать для апгрейда" style="padding: 7px 10px; background: rgba(255, 0, 77, 0.15); border: 1px solid rgba(255, 0, 77, 0.4); color: #ff004d; font-weight: 800; font-size: 11.5px; border-radius: 8px; cursor: pointer; transition: all 0.2s;">
              🎯 В апгрейд
            </button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach individual sell and upgrade handlers
    invPageGrid.querySelectorAll('[data-sell-instance]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instanceId = btn.dataset.sellInstance;
        const res = window.economyManager.sellItem(instanceId);
        if (res.success) {
          const card = document.getElementById(`inv-card-${instanceId}`);
          if (card) {
            card.style.transform = 'scale(0.8)';
            card.style.opacity = '0';
            setTimeout(() => {
              renderInventoryPage();
              renderProfilePage();
              if (typeof updateUpgraderUI === 'function') updateUpgraderUI();
            }, 220);
          } else {
            renderInventoryPage();
          }
        }
      });
    });

    invPageGrid.querySelectorAll('[data-upgrade-instance]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const instanceId = btn.dataset.upgradeInstance;
        const skin = user.inventory.find(it => it.instanceId === instanceId);
        if (skin && window.upgraderEngine) {
          window.upgraderEngine.selectedItems = [skin];
          switchTab('upgrader');
          if (typeof updateUpgraderUI === 'function') updateUpgraderUI();
          window.notify?.info('Скин выбран', `${skin.name} загружен в ставку апгрейда.`);
        }
      });
    });
  }

  window.renderInventoryPage = renderInventoryPage;

  // =========================================================================
  // BLOCK 3: UPGRADER ARENA & WHEEL CONTROLLER
  // =========================================================================
  const wheelCanvas = document.getElementById('wheel-canvas');
  const wheelNeedle = document.getElementById('wheel-needle');
  const wheelChanceVal = document.getElementById('wheel-chance-val');
  const wheelMultVal = document.getElementById('wheel-mult-val');
  const wheelCenterStatus = document.getElementById('wheel-center-status');
  const btnFireUpgrade = document.getElementById('btn-fire-upgrade');
  const btnUpgradePriceTag = document.getElementById('btn-upgrade-price-tag');

  const arenaTotalBetVal = document.getElementById('arena-total-bet-val');
  const arenaSelectedItemsSummary = document.getElementById('arena-selected-items-summary');
  const arenaInventoryDrawer = document.getElementById('arena-inventory-drawer');
  const drawerSelectedCount = document.getElementById('drawer-selected-count');
  const btnSelectCheapest = document.getElementById('btn-select-cheapest');
  const btnSelectAllInv = document.getElementById('btn-select-all-inv');
  const btnClearInvSelection = document.getElementById('btn-clear-inv-selection');
  const arenaInvSearch = document.getElementById('arena-inv-search');
  const arenaInvSort = document.getElementById('arena-inv-sort');
  const btnArenaBuySkins = document.getElementById('btn-arena-buy-skins');
  const btnQuickArrowStyle = document.getElementById('btn-quick-arrow-style');

  const btnDirUnder = document.getElementById('btn-dir-under');
  const btnDirOver = document.getElementById('btn-dir-over');

  const targetSkinShowcase = document.getElementById('target-skin-showcase');
  const targetSkinImg = document.getElementById('target-skin-img');
  const targetSkinName = document.getElementById('target-skin-name');
  const targetSkinPrice = document.getElementById('target-skin-price');
  const targetGlowBack = document.getElementById('target-glow-back');
  const targetWinPayoutVal = document.getElementById('target-win-payout-val');
  const btnBrowseCatalogTarget = document.getElementById('btn-browse-catalog-target');
  const btnOpenTargetPicker = document.getElementById('btn-open-target-picker');
  const inputCustomMultiplier = document.getElementById('input-custom-multiplier');
  const btnApplyCustomMult = document.getElementById('btn-apply-custom-mult');
  const modalTargetPicker = document.getElementById('modal-target-picker');
  const targetPickerClose = document.getElementById('target-picker-modal-close');
  const targetPickerSearch = document.getElementById('target-picker-search');
  const targetPickerGrid = document.getElementById('target-picker-grid');
  const targetPickerGamePills = document.querySelectorAll('#target-picker-game-pills .game-pill-btn');

  // Restore or set default initial target skin & multiplier (Remembering user choice)
  const allSkins = window.catalogController?.skins || window.SKINS_DATABASE || [];
  const savedMode = localStorage.getItem('simup_last_target_mode') || 'skin';
  const savedSkinId = localStorage.getItem('simup_last_target_skin_id');
  const savedMult = parseFloat(localStorage.getItem('simup_last_multiplier')) || 2.0;

  if (inputCustomMultiplier) inputCustomMultiplier.value = savedMult;

  if (savedMode === 'multiplier' && savedMult) {
    window.upgraderEngine.setDesiredMultiplier(savedMult);
  } else if (savedSkinId) {
    const found = allSkins.find(s => s.id === savedSkinId);
    if (found) {
      window.upgraderEngine.setTargetSkin(found);
    } else if (allSkins.length > 0) {
      window.upgraderEngine.setTargetSkin(allSkins[0]);
    }
  } else if (allSkins.length > 0) {
    const defaultTarget = allSkins.find(s => s.nameEn && s.nameEn.includes('Printstream')) || allSkins[0];
    window.upgraderEngine.setTargetSkin(defaultTarget);
  }

  // Draw wheel on canvas with 100% synchronized bottom-centered win zone (180 deg) & cherry glow
  function drawWheel(chance, direction = null, currentRoll = null) {
    if (!wheelCanvas) return;
    const ctx = wheelCanvas.getContext('2d');
    if (!ctx) return;
    const w = wheelCanvas.width;
    const h = wheelCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 120;
    const thickness = 14;

    const effectiveChance = (typeof chance === 'number' && chance > 0)
      ? chance
      : (window.upgraderEngine?.desiredChance || 50);

    ctx.clearRect(0, 0, w, h);

    // 0. Textured Disc Background (Obsidian carbon texture with cyber radial lines)
    ctx.save();
    const bgGrad = ctx.createRadialGradient(cx, cy, 20, cx, cy, radius + 22);
    bgGrad.addColorStop(0, 'rgba(28, 14, 36, 0.75)');
    bgGrad.addColorStop(0.55, 'rgba(16, 8, 22, 0.92)');
    bgGrad.addColorStop(1, 'rgba(6, 3, 9, 0.98)');
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 20, 0, Math.PI * 2);
    ctx.fillStyle = bgGrad;
    ctx.fill();

    // Concentric cyber grid rings (dashed technical rings)
    ctx.lineWidth = 1.4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    [radius - 42, radius - 24, radius + 16].forEach(r => {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Dashed tech accent ring (Cyber Ruby)
    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.arc(cx, cy, radius + 8, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 0, 77, 0.75)';
    ctx.stroke();

    // Dashed tech accent ring (Cyber Emerald)
    ctx.beginPath();
    ctx.setLineDash([3, 6]);
    ctx.arc(cx, cy, radius - 14, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 255, 170, 0.65)';
    ctx.stroke();
    ctx.setLineDash([]);

    // Radial Cyber Spokes (16 technical spokes with glowing neon pips)
    for (let s = 0; s < 16; s++) {
      const spAng = (s / 16) * Math.PI * 2;
      const xStart = cx + Math.cos(spAng) * (radius - 52);
      const yStart = cy + Math.sin(spAng) * (radius - 52);
      const xEnd = cx + Math.cos(spAng) * (radius - 8);
      const yEnd = cy + Math.sin(spAng) * (radius - 8);
      ctx.beginPath();
      ctx.moveTo(xStart, yStart);
      ctx.lineTo(xEnd, yEnd);
      ctx.lineWidth = s % 4 === 0 ? 2.2 : 1.4;
      ctx.strokeStyle = s % 4 === 0 ? 'rgba(255, 0, 77, 0.75)' : (s % 2 === 0 ? 'rgba(0, 240, 255, 0.65)' : 'rgba(255, 255, 255, 0.40)');
      ctx.stroke();

      // Outer illuminated tech pip
      const px = cx + Math.cos(spAng) * (radius + 14);
      const py = cy + Math.sin(spAng) * (radius + 14);
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = s % 4 === 0 ? '#ff004d' : (s % 2 === 0 ? '#00f0ff' : '#ffffff');
      ctx.shadowColor = s % 4 === 0 ? '#ff004d' : '#00f0ff';
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
    ctx.restore();

    // 1. Draw outer hairline ring
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 15, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.stroke();

    // Inner hairline
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 15, 0, Math.PI * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.stroke();

    // 2. Base dark obsidian circular track
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = 'rgba(18, 11, 20, 0.95)';
    ctx.stroke();

    // Dark track inner border
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.lineWidth = thickness - 4;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.stroke();
    ctx.restore();

    // 3. Draw 100 precision tick marks around circumference
    ctx.save();
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 10 === 0;
      const isMedium = i % 5 === 0;
      const tickInner = radius - (isMajor ? 11 : (isMedium ? 7 : 4));
      const tickOuter = radius + (isMajor ? 11 : (isMedium ? 7 : 4));

      const x1 = cx + Math.cos(angle) * tickInner;
      const y1 = cy + Math.sin(angle) * tickInner;
      const x2 = cx + Math.cos(angle) * tickOuter;
      const y2 = cy + Math.sin(angle) * tickOuter;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = isMajor ? 2 : (isMedium ? 1.2 : 0.8);
      ctx.strokeStyle = isMajor ? 'rgba(255, 255, 255, 0.45)' : (isMedium ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.07)');
      ctx.stroke();
    }
    ctx.restore();

    // 4. Center bottom calibration marker (180° / 6 o'clock)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(cx, cy + radius - 15);
    ctx.lineTo(cx, cy + radius + 15);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#00ffaa';
    ctx.shadowColor = '#00ffaa';
    ctx.shadowBlur = 8;
    ctx.stroke();
    ctx.restore();

    if (effectiveChance <= 0) return;

    // 5. Draw winning glowing sector centered AT THE BOTTOM (180° / 6 o'clock)
    const angleSpanDeg = (effectiveChance / 100) * 360;
    const halfSpan = angleSpanDeg / 2;
    const winStartDeg = 180 - halfSpan;
    const winEndDeg = 180 + halfSpan;

    const startAngle = (winStartDeg - 90) * (Math.PI / 180);
    const endAngle = (winEndDeg - 90) * (Math.PI / 180);

    // Outer rich cherry glow pass
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    ctx.lineWidth = thickness + 4;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = 'rgba(255, 0, 77, 0.7)';
    ctx.shadowColor = '#ff004d';
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();

    // Bright core ruby pass
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    ctx.lineWidth = thickness;
    ctx.lineCap = 'butt';
    ctx.strokeStyle = '#ff1a53';
    ctx.stroke();

    // Inner bright laser highlight
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 6;
    ctx.stroke();

    // Razor-sharp radial boundary pins at exact win zone limits
    const rIn = radius - thickness / 2 - 4;
    const rOut = radius + thickness / 2 + 4;
    [startAngle, endAngle].forEach(ang => {
      const x1 = cx + Math.cos(ang) * rIn;
      const y1 = cy + Math.sin(ang) * rIn;
      const x2 = cx + Math.cos(ang) * rOut;
      const y2 = cy + Math.sin(ang) * rOut;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = '#ff004d';
      ctx.shadowBlur = 10;
      ctx.stroke();
    });
    ctx.restore();
  }

  function updateUpgraderUI(skipDrawerRebuild = false) {
    const totalBet = window.upgraderEngine.getTotalBetAmount();
    const chance = window.upgraderEngine.calculateChance();
    const multiplier = window.upgraderEngine.calculateMultiplier();
    const target = window.upgraderEngine.targetSkin;
    const selectedCount = window.upgraderEngine.selectedItems.length;

    if (arenaTotalBetVal) {
      arenaTotalBetVal.textContent = `$${totalBet.toFixed(2)}`;
    }
    if (arenaSelectedItemsSummary) {
      arenaSelectedItemsSummary.textContent = `${selectedCount} ${getNoun(selectedCount, 'предмет', 'предмета', 'предметов')}`;
    }
    if (drawerSelectedCount) {
      drawerSelectedCount.textContent = `Выбрано: ${selectedCount} шт.`;
    }
    if (btnUpgradePriceTag) {
      btnUpgradePriceTag.textContent = totalBet > 0 ? `($${totalBet.toFixed(2)})` : '(Выберите скин)';
    }
    if (btnFireUpgrade) {
      btnFireUpgrade.disabled = (selectedCount === 0 || !target || window.upgraderEngine.isSpinning);
    }

    const isMystery = window.upgraderEngine.isMysteryMode;
    const currentMult = multiplier > 0 ? multiplier : (window.upgraderEngine.desiredMultiplier || 2.0);
    const currentChance = chance > 0 ? chance : (window.upgraderEngine.desiredChance || 50);

    if (wheelChanceVal) wheelChanceVal.textContent = isMystery ? '??? %' : `${currentChance.toFixed(2)}%`;
    if (wheelMultVal) wheelMultVal.textContent = isMystery ? '??? x' : `${currentMult.toFixed(2)}x`;

    // Target skin showcase
    if (isMystery) {
      if (targetSkinImg) {
        targetSkinImg.src = 'data:image/svg+xml;utf8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect width="100" height="100" rx="18" fill="#140816" stroke="#ff004d" stroke-width="2.5"/><text x="50" y="66" font-size="48" font-weight="900" fill="#ff004d" text-anchor="middle" font-family="sans-serif">?</text></svg>');
      }
      if (targetSkinName) targetSkinName.textContent = '🎲 Таинственный скин (Секретный x)';
      if (targetSkinPrice) targetSkinPrice.textContent = '??? $';
      if (targetWinPayoutVal) targetWinPayoutVal.textContent = '??? $ (Секретный выигрыш)';
      if (targetGlowBack) targetGlowBack.style.setProperty('--target-clr', '#ff004d');
      if (inputCustomMultiplier) inputCustomMultiplier.value = '???';
    } else if (target) {
      if (targetSkinImg) {
        targetSkinImg.src = target.image || target.fallbackSvg || '';
        targetSkinImg.alt = target.name;
        targetSkinImg.onerror = function() {
          if (window.handleSkinImgError) {
            window.handleSkinImgError(this, target.id, target.name, target.rarity, target.category, target.game);
          }
        };
      }
      if (targetSkinName) {
        targetSkinName.textContent = `${target.name} ${target.wear && target.wear !== 'STANDARD' ? `(${target.wear})` : ''}`;
      }
      if (targetSkinPrice) targetSkinPrice.textContent = `$${target.price.toFixed(2)}`;
      if (targetGlowBack) targetGlowBack.style.setProperty('--target-clr', target.rarityColor || '#ff004d');

      if (targetWinPayoutVal) {
        const profit = Math.max(0, target.price - totalBet);
        targetWinPayoutVal.textContent = totalBet > 0 ? `+$${profit.toFixed(2)} профит` : `+$${target.price.toFixed(2)}`;
      }
    }

    // Update active multiplier chips & input
    document.querySelectorAll('[data-quick-mult]').forEach(btn => {
      const chipVal = parseFloat(btn.dataset.quickMult);
      btn.classList.toggle('active', Math.abs(chipVal - currentMult) < 0.08);
    });
    if (inputCustomMultiplier && document.activeElement !== inputCustomMultiplier) {
      inputCustomMultiplier.value = currentMult.toFixed(1);
    }

    // Update active chance chips & slider
    const sliderCustomChance = document.getElementById('slider-custom-chance');
    const labelChanceSliderReadout = document.getElementById('label-chance-slider-readout');
    if (sliderCustomChance && document.activeElement !== sliderCustomChance) {
      sliderCustomChance.value = Math.round(currentChance);
    }
    if (labelChanceSliderReadout) {
      labelChanceSliderReadout.textContent = `${currentChance.toFixed(currentChance % 1 === 0 ? 0 : 1)}%`;
    }
    document.querySelectorAll('[data-quick-chance]').forEach(btn => {
      const chipVal = parseFloat(btn.dataset.quickChance);
      btn.classList.toggle('active', Math.abs(chipVal - currentChance) < 2.0);
    });

    // Direction pills
    if (btnDirUnder) btnDirUnder.classList.toggle('active', window.upgraderEngine.direction === 'under');
    if (btnDirOver) btnDirOver.classList.toggle('active', window.upgraderEngine.direction === 'over');

    // Sync Random Upgrade mystery button
    const btnRandomEl = document.getElementById('btn-random-upgrade');
    if (btnRandomEl) {
      btnRandomEl.classList.toggle('active', Boolean(isMystery));
    }

    // Ensure needle pointer is visible
    if (wheelNeedle) {
      wheelNeedle.style.display = 'block';
      wheelNeedle.style.visibility = 'visible';
    }

    // Draw Wheel
    drawWheel(currentChance, window.upgraderEngine.direction);

    // Render drawer only if full rebuild requested
    if (!skipDrawerRebuild) {
      renderInventoryDrawer();
    }
  }

  window.updateUpgraderUI = updateUpgraderUI;

  function renderInventoryDrawer() {
    if (!arenaInventoryDrawer) return;
    const user = window.authManager.currentUser;
    if (!user || !user.inventory || user.inventory.length === 0) {
      arenaInventoryDrawer.innerHTML = `
        <div style="font-size: 11.5px; color: var(--text-dim); text-align: center; padding: 28px 12px;">
          <div style="font-size: 26px; margin-bottom: 6px;">🎒</div>
          <div style="color: #fff; font-weight: 700; margin-bottom: 4px;">Инвентарь пуст</div>
          <p style="margin-bottom: 12px; font-size: 11px;">Ставки делаются только скинами. Купите скины в каталоге за баланс!</p>
          <button id="btn-empty-buy-skins" class="btn-sm-action" style="background: var(--accent-color); color: #000; font-weight: 800; border: none; padding: 6px 14px; border-radius: 4px; cursor: pointer;">
            Купить скины
          </button>
        </div>
      `;
      document.getElementById('btn-empty-buy-skins')?.addEventListener('click', () => {
        switchTab('catalog');
      });
      if (drawerSelectedCount) drawerSelectedCount.textContent = 'Выбрано: 0 шт.';
      return;
    }

    let items = [...user.inventory];
    const query = (arenaInvSearch?.value || '').trim().toLowerCase();
    if (query) {
      items = items.filter(it => it.name.toLowerCase().includes(query) || (it.wearName && it.wearName.toLowerCase().includes(query)));
    }

    const sortType = arenaInvSort?.value || 'cheap';
    if (sortType === 'cheap') {
      items.sort((a, b) => a.price - b.price);
    } else {
      items.sort((a, b) => b.price - a.price);
    }

    const selectedIds = window.upgraderEngine.selectedItems.map(it => it.instanceId);
    if (drawerSelectedCount) drawerSelectedCount.textContent = `Выбрано: ${selectedIds.length} шт.`;

    if (items.length === 0) {
      arenaInventoryDrawer.innerHTML = `
        <div style="font-size: 11.5px; color: var(--text-dim); text-align: center; padding: 20px 0;">
          По запросу «${query}» ничего не найдено.
        </div>
      `;
      return;
    }

    arenaInventoryDrawer.innerHTML = items.map(item => {
      const isSel = selectedIds.includes(item.instanceId);
      return `
        <div class="drawer-item-row ${isSel ? 'selected' : ''}" data-drawer-id="${item.instanceId}">
          <div class="drawer-item-status-icon">${isSel ? '✓' : ''}</div>
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="drawer-item-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
          <div style="flex: 1; min-width: 0; margin: 0 8px;">
            <div class="drawer-item-name" title="${item.name}">${item.name}</div>
            <div style="font-size: 9.5px; color: var(--text-dim);">${item.wear && item.wear !== 'STANDARD' ? item.wear : (item.game || 'CS2').toUpperCase()}</div>
          </div>
          <span class="drawer-item-price">$${item.price.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    // Attach delegated click listener once to avoid lag and memory leaks
    if (!arenaInventoryDrawer._hasDelegation) {
      arenaInventoryDrawer._hasDelegation = true;
      arenaInventoryDrawer.addEventListener('click', (e) => {
        const row = e.target.closest('[data-drawer-id]');
        if (!row) return;
        const curUser = window.authManager.currentUser;
        if (!curUser || !curUser.inventory) return;
        const id = row.dataset.drawerId;
        const item = curUser.inventory.find(it => it.instanceId === id);
        if (item) {
          const isNowSelected = window.upgraderEngine.toggleItemSelection(item);
          row.classList.toggle('selected', isNowSelected);
          const iconEl = row.querySelector('.drawer-item-status-icon');
          if (iconEl) iconEl.textContent = isNowSelected ? '✓' : '';
          updateUpgraderUI(true);
        }
      });
    }
  }

  // Inventory Quick Action buttons
  btnSelectCheapest?.addEventListener('click', () => {
    const user = window.authManager.currentUser;
    if (!user || !user.inventory || user.inventory.length === 0) {
      window.notify.warning('Инвентарь пуст', 'Сначала приобретите скины в каталоге за баланс.');
      return;
    }
    const cheapest = [...user.inventory].sort((a, b) => a.price - b.price)[0];
    if (cheapest) {
      window.upgraderEngine.selectedItems = [cheapest];
      updateUpgraderUI();
      window.notify.info('Выбран скин', `${cheapest.name} ($${cheapest.price.toFixed(2)}) выбран для ставки.`);
    }
  });

  btnSelectAllInv?.addEventListener('click', () => {
    const user = window.authManager.currentUser;
    if (!user || !user.inventory || user.inventory.length === 0) {
      window.notify.warning('Инвентарь пуст', 'Сначала приобретите скины в каталоге за баланс.');
      return;
    }
    window.upgraderEngine.selectAllItems(user.inventory);
    updateUpgraderUI();
    window.notify.info('Выбраны все скины', `Все ${user.inventory.length} предметов выбраны для ставки.`);
  });

  btnClearInvSelection?.addEventListener('click', () => {
    window.upgraderEngine.clearSelectedItems();
    updateUpgraderUI();
  });

  arenaInvSearch?.addEventListener('input', () => {
    renderInventoryDrawer();
  });

  arenaInvSort?.addEventListener('change', () => {
    renderInventoryDrawer();
  });

  btnArenaBuySkins?.addEventListener('click', () => {
    switchTab('catalog');
  });

  // Quick arrow style cycle button
  const ARROW_STYLES_ARRAY = ['arrow-laser', 'arrow-blade', 'arrow-needle', 'arrow-classic'];
  btnQuickArrowStyle?.addEventListener('click', () => {
    const current = localStorage.getItem('simup_arrow_style') || 'arrow-laser';
    let idx = ARROW_STYLES_ARRAY.indexOf(current);
    if (idx === -1) idx = 0;
    const nextStyle = ARROW_STYLES_ARRAY[(idx + 1) % ARROW_STYLES_ARRAY.length];
    applyArrowStyle(nextStyle);
    window.notify.info('Стиль стрелки', `Установлен стиль: ${ARROW_NAMES_MAP[nextStyle]}`);
  });

  // Random Upgrade button (Mystery Mode: toggle on/off)
  const btnRandomUpgrade = document.getElementById('btn-random-upgrade');
  btnRandomUpgrade?.addEventListener('click', () => {
    window.SoundManager?.playClick();
    if (window.upgraderEngine.isMysteryMode) {
      window.upgraderEngine.clearMysteryMode();
      updateUpgraderUI();
      window.notify.info('🎲 Режим отменен', 'Таинственный множитель отключен. Отображаются точные параметры апгрейда.');
      return;
    }
    window.upgraderEngine.rollRandomUpgrade();
    updateUpgraderUI();
    window.notify.info('🎲 Таинственный икс активирован!', 'Множитель и скин засекречены (???x)! Крутите колесо или выберите проценты, чтобы отменить!');
  });

  // Quick Chance chips
  document.querySelectorAll('[data-quick-chance]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.upgraderEngine.clearMysteryMode();
      const ch = parseFloat(btn.dataset.quickChance);
      const matched = window.upgraderEngine.setDesiredChance(ch);
      const slider = document.getElementById('slider-custom-chance');
      const label = document.getElementById('label-chance-slider-readout');
      if (slider) slider.value = ch;
      if (label) label.textContent = `${ch}%`;
      updateUpgraderUI();
      if (matched) {
        window.notify.info(`Шанс ${ch}%`, `Подобран скин: ${matched.name} ($${matched.price.toFixed(2)})`);
      } else {
        window.notify.info(`Шанс ${ch}% выбран`, 'Выберите скины из инвентаря для ставки.');
      }
    });
  });

  // Chance Range Slider
  const sliderCustomChance = document.getElementById('slider-custom-chance');
  sliderCustomChance?.addEventListener('input', (e) => {
    window.upgraderEngine.clearMysteryMode();
    const ch = parseFloat(e.target.value);
    const label = document.getElementById('label-chance-slider-readout');
    if (label) label.textContent = `${ch}%`;
    window.upgraderEngine.setDesiredChance(ch);
    updateUpgraderUI(true);
  });

  // Quick multipliers
  document.querySelectorAll('[data-quick-mult]').forEach(btn => {
    btn.addEventListener('click', () => {
      window.upgraderEngine.clearMysteryMode();
      const mult = parseFloat(btn.dataset.quickMult);
      const matched = window.upgraderEngine.setDesiredMultiplier(mult);
      updateUpgraderUI();
      if (matched) {
        window.notify.info(`Множитель ${mult}x`, `Подобран скин: ${matched.name} ($${matched.price.toFixed(2)})`);
      } else {
        window.notify.info(`Множитель ${mult}x выбран`, 'Множитель сохранён. Выберите скины из инвентаря для ставки.');
      }
    });
  });

  // Manual multiplier application
  function applyManualMultiplier(mult) {
    const val = parseFloat(mult);
    if (isNaN(val) || val < 1.1) {
      window.notify.warning('Множитель', 'Минимальный множитель 1.1x');
      return;
    }
    const clamped = Math.min(1000, val);
    const matched = window.upgraderEngine.setDesiredMultiplier(clamped);
    updateUpgraderUI();
    if (matched) {
      window.notify.info(`Множитель ${clamped}x`, `Подобран скин: ${matched.name} ($${matched.price.toFixed(2)})`);
    } else {
      window.notify.info(`Множитель ${clamped}x сохранён`, 'Выберите скины из инвентаря для ставки.');
    }
  }

  btnApplyCustomMult?.addEventListener('click', () => {
    applyManualMultiplier(inputCustomMultiplier?.value);
  });

  inputCustomMultiplier?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      applyManualMultiplier(inputCustomMultiplier?.value);
    }
  });

  // Target Picker Modal logic
  function renderTargetPickerGrid(searchTerm = '', gameFilter = 'all') {
    if (!targetPickerGrid) return;
    const all = window.catalogController?.skins || window.SKINS_DATABASE || [];
    const term = searchTerm.trim().toLowerCase();

    const filtered = all.filter(s => {
      const matchGame = (gameFilter === 'all' || s.game === gameFilter || ((gameFilter === 'dota2' || gameFilter === 'dota') && (s.game === 'dota2' || s.game === 'dota')));
      const matchName = !term || (s.name && s.name.toLowerCase().includes(term)) || (s.nameEn && s.nameEn.toLowerCase().includes(term));
      return matchGame && matchName;
    });

    if (filtered.length === 0) {
      targetPickerGrid.innerHTML = `<div style="grid-column: 1/-1; text-align: center; padding: 30px; color: var(--text-dim);">Скины не найдены</div>`;
      return;
    }

    targetPickerGrid.innerHTML = filtered.map(s => `
      <div class="target-picker-item" data-picker-skin-id="${s.id}" style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-color); border-radius: 12px; padding: 10px 8px; cursor: pointer; text-align: center; transition: all 0.18s ease; display: flex; flex-direction: column; align-items: center; justify-content: space-between;">
        <img src="${s.image || s.fallbackSvg}" alt="${s.name}" style="width: 100%; height: 68px; object-fit: contain; margin-bottom: 6px;" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${s.id || ''}', '${s.name?.replace(/['\"\\]/g, '') || ''}', '${s.rarity || 'milspec'}', '${s.category || 'weapon'}', '${s.game || 'cs2'}');">
        <div style="font-size: 11px; font-weight: 700; max-width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff;" title="${s.name}">${s.name}</div>
        <div style="font-size: 12px; font-weight: 900; color: var(--accent-color); margin-top: 4px;">$${s.price.toFixed(2)}</div>
      </div>
    `).join('');

    targetPickerGrid.querySelectorAll('.target-picker-item').forEach(el => {
      el.addEventListener('click', () => {
        const skinId = el.dataset.pickerSkinId;
        const skin = all.find(s => s.id === skinId);
        if (skin) {
          window.upgraderEngine.setTargetSkin(skin);
          updateUpgraderUI();
          modalTargetPicker?.classList.remove('active');
          window.notify.success('Целевой скин выбран', `${skin.name} ($${skin.price.toFixed(2)}) готов к апгрейду!`);
        }
      });
    });
  }

  let currentTargetGameFilter = 'all';

  function openTargetPickerModal() {
    if (!modalTargetPicker) return;
    if (targetPickerSearch) targetPickerSearch.value = '';
    currentTargetGameFilter = 'all';
    targetPickerGamePills?.forEach(p => p.classList.toggle('active', p.dataset.targetGame === 'all'));
    renderTargetPickerGrid('', 'all');
    modalTargetPicker.classList.add('active');
  }

  btnOpenTargetPicker?.addEventListener('click', openTargetPickerModal);
  targetSkinShowcase?.addEventListener('click', openTargetPickerModal);
  btnBrowseCatalogTarget?.addEventListener('click', openTargetPickerModal);
  targetPickerClose?.addEventListener('click', () => modalTargetPicker?.classList.remove('active'));

  targetPickerSearch?.addEventListener('input', (e) => {
    renderTargetPickerGrid(e.target.value, currentTargetGameFilter);
  });

  targetPickerGamePills?.forEach(pill => {
    pill.addEventListener('click', () => {
      targetPickerGamePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentTargetGameFilter = pill.dataset.targetGame || 'all';
      renderTargetPickerGrid(targetPickerSearch?.value || '', currentTargetGameFilter);
    });
  });

  // Selection from catalog overrides target skin
  window.catalogController.onSelectTargetCallback = (skin) => {
    window.upgraderEngine.setTargetSkin(skin);
    updateUpgraderUI();
    window.notify.info('Целевой скин выбран 🎯', `${skin.name} ($${skin.price.toFixed(2)}) готов к апгрейду!`);
    if (typeof switchTab === 'function') switchTab('upgrader');
    document.getElementById('upgrader-arena')?.scrollIntoView({ behavior: 'smooth' });
  };

  // =========================================================================
  // SPIN EXECUTION (PHYSICAL 60FPS NEEDLE & TICK SOUNDS)
  // =========================================================================
  btnFireUpgrade.addEventListener('click', async () => {
    if (window.upgraderEngine.isSpinning) return;

    if (!window.authManager.currentUser) {
      window.notify.warning('Вход в аккаунт', 'Пожалуйста, авторизуйтесь для игры в апгрейдер.');
      openAuthModal('login');
      return;
    }

    if (window.upgraderEngine.selectedItems.length === 0) {
      window.notify.warning('Выберите скин для ставки', 'В апгрейдере ставки делаются только скинами! Выберите один или несколько скинов из инвентаря слева.');
      return;
    }

    if (!window.upgraderEngine.targetSkin) {
      window.notify.warning('Выберите цель', 'Выберите целевой скин для апгрейда в каталоге справа или выберите множитель.');
      return;
    }

    btnFireUpgrade.disabled = true;
    wheelCenterStatus.textContent = 'КРУТИМ...';
    wheelCenterStatus.style.color = 'var(--accent-color)';

    await window.upgraderEngine.spin({
      onStart: ({ chance }) => {
        if (wheelNeedle) wheelNeedle.style.transition = 'none';
      },
      onTick: (normDeg, totalDeg) => {
        if (wheelNeedle) wheelNeedle.style.transform = `rotate(${totalDeg}deg)`;
        const curRoll = (((normDeg % 360 + 360) % 360) / 360 * 100).toFixed(2);
        if (wheelChanceVal) wheelChanceVal.textContent = `${curRoll}%`;
      },
      onComplete: ({ isWin, roll, targetSkin }) => {
        btnFireUpgrade.disabled = false;
        wheelCenterStatus.textContent = isWin ? '★ ПОБЕДА!' : '✕ МИМО';
        wheelCenterStatus.style.color = isWin ? 'var(--accent-color)' : '#ef4444';
        if (wheelChanceVal) wheelChanceVal.textContent = `${roll.toFixed(2)}%`;

        if (isWin && targetSkin) {
          window.questsManager?.recordAction('upgrade_wins', 1);
          if (window.updateQuestsBadge) window.updateQuestsBadge();
          const curUser = window.authManager?.currentUser;
          if (curUser) {
            addLiveDrop({
              avatar: curUser.avatar || '🗡️',
              username: curUser.username,
              item: targetSkin,
              type: 'upgrade',
              multiplier: window.upgraderEngine.calculateMultiplier()
            });
          }
        }

        setTimeout(() => {
          updateUpgraderUI();
          wheelCenterStatus.textContent = 'Шанс';
          wheelCenterStatus.style.color = 'var(--text-dim)';
        }, 3200);
      }
    });
  });



  // =========================================================================
  // BLOCK 4: CASES CONTROLLER & ROULETTE REEL
  // =========================================================================
  const casesGrid = document.getElementById('cases-grid');
  const casesGamePills = document.querySelectorAll('#cases-game-pills .game-pill-btn');
  const casesCountBadge = document.getElementById('cases-count-badge');

  // Case Opening Modal Elements
  const modalCaseOpen = document.getElementById('modal-case-open');
  const caseOpenModalClose = document.getElementById('case-open-modal-close');
  const modalCaseIcon = document.getElementById('modal-case-icon');
  const modalCaseName = document.getElementById('modal-case-name');
  const modalCaseDesc = document.getElementById('modal-case-desc');
  const modalCasePrice = document.getElementById('modal-case-price');
  const caseReelTrack = document.getElementById('case-reel-track');
  const btnSpinCase = document.getElementById('btn-spin-case');
  const btnSpinCasePrice = document.getElementById('btn-spin-case-price');
  const modalCaseDropsPreview = document.getElementById('modal-case-drops-preview');
  const modalCaseItemsCount = document.getElementById('modal-case-items-count');

  // Case Win Modal Elements
  const modalCaseWin = document.getElementById('modal-case-win');
  const caseWinModalClose = document.getElementById('case-win-modal-close');
  const caseWinGlow = document.getElementById('case-win-glow');
  const caseWinImg = document.getElementById('case-win-img');
  const caseWinName = document.getElementById('case-win-name');
  const caseWinWear = document.getElementById('case-win-wear');
  const caseWinPrice = document.getElementById('case-win-price');
  const btnWinSell = document.getElementById('btn-win-sell');
  const btnWinUpgrade = document.getElementById('btn-win-upgrade');
  const btnWinOpenAgain = document.getElementById('btn-win-open-again');

  // Multi-Case Controls & Win Modal Elements
  const inputCaseQty = document.getElementById('input-case-qty');
  const btnSpinCaseLabel = document.getElementById('btn-spin-case-label');
  const modalMultiCaseWin = document.getElementById('modal-multi-case-win');
  const multiWinModalClose = document.getElementById('multi-win-modal-close');
  const multiWinTitle = document.getElementById('multi-win-title');
  const multiWinSpent = document.getElementById('multi-win-spent');
  const multiWinTotalVal = document.getElementById('multi-win-total-val');
  const multiWinProfit = document.getElementById('multi-win-profit');
  const btnMultiSellAll = document.getElementById('btn-multi-sell-all');
  const btnMultiKeepAll = document.getElementById('btn-multi-keep-all');
  const btnMultiOpenAgain = document.getElementById('btn-multi-open-again');
  const multiDropsList = document.getElementById('multi-drops-list');

  let currentSelectedCase = null;
  let lastDroppedItem = null;
  let lastMultiDropResult = null;

  function renderCasesGrid() {
    if (!casesGrid) return;
    const cases = window.casesManager.getFilteredCases();
    casesCountBadge.textContent = `${cases.length} ${getNoun(cases.length, 'кейс', 'кейса', 'кейсов')}`;

    const pillCustom = document.getElementById('pill-custom-cases');
    if (pillCustom) {
      const count = window.caseBuilderManager?.customCases.length || 0;
      pillCustom.textContent = `⭐ Мои кейсы (${count})`;
    }

    if (cases.length === 0) {
      casesGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 48px 20px; text-align: center;">
          <div style="font-size: 40px; margin-bottom: 10px;">📦</div>
          <div style="font-size: 18px; font-weight: 700; color: #fff;">Кейсов не найдено</div>
          <div style="font-size: 13px; color: var(--text-muted); margin-top: 4px;">
            Создайте свой первый кейс в Конструкторе прямо сейчас!
          </div>
          <button class="btn-deposit" onclick="document.getElementById('btn-open-case-builder')?.click()" style="margin-top: 16px; padding: 10px 20px; display: inline-block;">
            🛠️ Создать собственный кейс
          </button>
        </div>
      `;
      return;
    }

    casesGrid.innerHTML = cases.map(c => `
      <div class="case-card ${c.isCustom ? 'custom-user-case' : ''}" data-case-id="${c.id}" style="--case-clr: ${c.color || '#f59e0b'};">
        <div>
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <span class="game-badge game-${c.game}">${c.game.toUpperCase()}</span>
            <span style="font-size: 11px; color: var(--text-dim); font-weight: 700;">${c.items.length} скинов</span>
          </div>
          <div class="case-icon-wrap" style="color: ${c.color || '#f59e0b'};">
            ${c.image ? `
              <img src="${c.image}" alt="${c.name}" class="case-card-img" loading="lazy" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
              <span class="case-fallback-icon" style="display: none;">${c.icon || '📦'}</span>
            ` : (c.icon || '📦')}
          </div>
          <div class="case-title">${c.name}</div>
          <div class="case-desc">${c.description || (c.isCustom ? 'Автор: ' + (c.author || 'Игрок') : '')}</div>
        </div>
        <div class="case-bottom-row">
          <div class="case-price-tag">$${c.price.toFixed(2)}</div>
          <div style="display: flex; gap: 6px;">
            <button class="btn-open-case-card">Открыть</button>
            ${c.isCustom ? `<button class="btn-delete-custom-case" data-delete-case="${c.id}" title="Удалить этот кейс" style="background: rgba(239, 68, 68, 0.15); border: 1px solid rgba(239,68,68,0.3); color: #ef4444; border-radius: 4px; padding: 0 8px; font-size: 12px; cursor: pointer;">&times;</button>` : ''}
          </div>
        </div>
      </div>
    `).join('');

    casesGrid.querySelectorAll('.case-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('[data-delete-case]')) return;
        const id = card.dataset.caseId;
        const caseData = window.casesManager.getCaseById(id);
        if (caseData) {
          openCaseModal(caseData);
        }
      });
    });

    casesGrid.querySelectorAll('[data-delete-case]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.deleteCase;
        if (confirm('Удалить этот кастомный кейс?')) {
          window.caseBuilderManager?.deleteCase(id);
          window.notify.info('Кейс удален', 'Кастомный кейс был успешно удален.');
          renderCasesGrid();
        }
      });
    });
  }

  // Filter cases by game pills
  casesGamePills.forEach(pill => {
    pill.addEventListener('click', () => {
      casesGamePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      window.casesManager.setGameFilter(pill.dataset.casesGame);
      renderCasesGrid();
    });
  });

  function openCaseModal(caseData) {
    currentSelectedCase = caseData;
    if (caseData.image) {
      modalCaseIcon.innerHTML = `<img src="${caseData.image}" alt="${caseData.name}" style="width: 100%; height: 100%; object-fit: contain; filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));">`;
    } else {
      modalCaseIcon.textContent = caseData.icon || '📦';
    }
    modalCaseName.textContent = caseData.name;
    modalCaseDesc.textContent = caseData.description;
    modalCasePrice.textContent = `$${caseData.price.toFixed(2)}`;

    // Reset multi-open quantity to 1
    if (inputCaseQty) inputCaseQty.value = '1';
    updateCaseOpenButtonState();

    // Reset reel position
    caseReelTrack.style.transition = 'none';
    caseReelTrack.style.transform = 'translateX(0px)';

    // Pre-populate dummy reel preview with case items
    const items = window.casesManager.getResolvedCaseItems(caseData);
    modalCaseItemsCount.textContent = `${items.length} предметов`;

    caseReelTrack.innerHTML = items.slice(0, 8).map(item => `
      <div class="reel-item-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor};">
        <span class="reel-item-wear">${item.wear && item.wear !== 'STANDARD' ? item.wear : ''}</span>
        <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="reel-item-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
        <div class="reel-item-name">${item.name}</div>
        <div class="reel-item-price">$${item.price.toFixed(2)}</div>
      </div>
    `).join('');

    // Populate drops preview grid with exact percent chances
    modalCaseDropsPreview.innerHTML = items.map(item => `
      <div class="case-drop-preview-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor};">
        <span class="case-drop-chance-pill">${item.percent}%</span>
        <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="drop-preview-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
        <div class="drop-preview-name">${item.name}</div>
        <div class="drop-preview-price">$${item.price.toFixed(2)}</div>
      </div>
    `).join('');

    btnSpinCase.disabled = false;
    modalCaseOpen.classList.add('active');
  }

  function updateCaseOpenButtonState() {
    if (!currentSelectedCase) return;
    const qty = Math.max(1, parseInt(inputCaseQty?.value, 10) || 1);
    const totalPrice = Number((currentSelectedCase.price * qty).toFixed(2));
    if (btnSpinCaseLabel) {
      btnSpinCaseLabel.textContent = qty > 1 ? `📦 ОТКРЫТЬ ${qty} КЕЙСОВ` : '📦 ОТКРЫТЬ КЕЙС';
    }
    if (btnSpinCasePrice) {
      btnSpinCasePrice.textContent = `($${totalPrice.toFixed(2)})`;
    }
    document.querySelectorAll('[data-case-qty]').forEach(chip => {
      const chipVal = chip.dataset.caseQty;
      if (chipVal === 'max') {
        chip.classList.toggle('active', false);
      } else {
        chip.classList.toggle('active', parseInt(chipVal, 10) === qty);
      }
    });
  }

  // Multi-case quantity chips
  document.querySelectorAll('[data-case-qty]').forEach(chip => {
    chip.addEventListener('click', () => {
      if (!currentSelectedCase) return;
      const chipVal = chip.dataset.caseQty;
      if (chipVal === 'max') {
        const user = window.authManager?.currentUser;
        const userBal = user?.balance || 0;
        const maxQty = Math.max(1, Math.floor(userBal / currentSelectedCase.price));
        if (inputCaseQty) inputCaseQty.value = maxQty;
        chip.classList.add('active');
      } else {
        const val = parseInt(chipVal, 10) || 1;
        if (inputCaseQty) inputCaseQty.value = val;
      }
      updateCaseOpenButtonState();
    });
  });

  inputCaseQty?.addEventListener('input', () => {
    if (!inputCaseQty) return;
    const val = parseInt(inputCaseQty.value, 10);
    if (!isNaN(val) && val < 1) {
      inputCaseQty.value = 1;
    }
    updateCaseOpenButtonState();
  });

  caseOpenModalClose.addEventListener('click', () => {
    if (window.casesManager.isSpinning) return;
    modalCaseOpen.classList.remove('active');
  });

  // Execute Case Spin (Single 60fps roulette OR Multi-Open with full drops list)
  btnSpinCase.addEventListener('click', () => {
    if (!currentSelectedCase || window.casesManager.isSpinning) return;
    const qty = Math.max(1, parseInt(inputCaseQty?.value, 10) || 1);

    if (qty === 1) {
      btnSpinCase.disabled = true;
      window.casesManager.openCase({
        caseData: currentSelectedCase,
        reelTrackElement: caseReelTrack,
        onTick: () => {},
        onComplete: ({ winner, caseData }) => {
          btnSpinCase.disabled = false;
          lastDroppedItem = winner;
          modalCaseOpen.classList.remove('active');
          showCaseWinModal(winner, caseData);
          window.questsManager?.recordAction('open_cases', 1);
          if (window.updateQuestsBadge) window.updateQuestsBadge();
        }
      });
    } else {
      btnSpinCase.disabled = true;
      window.casesManager.openMultipleCases({
        caseData: currentSelectedCase,
        count: qty,
        onComplete: (res) => {
          btnSpinCase.disabled = false;
          modalCaseOpen.classList.remove('active');
          showMultiCaseWinModal(res);
          window.questsManager?.recordAction('open_cases', res.count);
          if (window.updateQuestsBadge) window.updateQuestsBadge();
        }
      });
    }
  });

  function showMultiCaseWinModal(result) {
    lastMultiDropResult = result;
    if (multiWinTitle) multiWinTitle.textContent = `Выпавший дроп (${result.count} шт.)`;
    if (multiWinSpent) multiWinSpent.textContent = `$${result.totalCost.toFixed(2)}`;
    if (multiWinTotalVal) multiWinTotalVal.textContent = `$${result.totalDroppedVal.toFixed(2)}`;
    if (multiWinProfit) {
      if (result.netProfit >= 0) {
        multiWinProfit.textContent = `+$${result.netProfit.toFixed(2)}`;
        multiWinProfit.style.color = '#10b981';
      } else {
        multiWinProfit.textContent = `-$${Math.abs(result.netProfit).toFixed(2)}`;
        multiWinProfit.style.color = '#ef4444';
      }
    }
    if (btnMultiSellAll) {
      btnMultiSellAll.textContent = `💵 Продать весь дроп ($${result.totalDroppedVal.toFixed(2)})`;
    }

    if (multiDropsList) {
      multiDropsList.innerHTML = result.droppedItems.map(item => `
        <div class="case-drop-preview-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor || '#ffd700'}; position: relative; padding: 10px 8px; text-align: center; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; display: flex; flex-direction: column; justify-content: space-between;">
          <span class="case-drop-chance-pill" style="font-size: 9px; position: absolute; top: 6px; left: 6px;">${item.wear && item.wear !== 'STANDARD' ? item.wear : (item.game || 'CS2').toUpperCase()}</span>
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="drop-preview-img" style="width: 100%; height: 62px; object-fit: contain; margin: 4px 0;" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || item.skinId || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
          <div class="drop-preview-name" style="font-size: 10.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #fff;" title="${item.name}">${item.name}</div>
          <div class="drop-preview-price" style="font-size: 12px; font-weight: 900; color: #ffd700; margin-top: 4px;">$${item.price.toFixed(2)}</div>
        </div>
      `).join('');
    }

    modalMultiCaseWin?.classList.add('active');

    const curUser = window.authManager?.currentUser;
    if (curUser && result.droppedItems && result.droppedItems.length > 0) {
      const topDrops = [...result.droppedItems].sort((a, b) => b.price - a.price).slice(0, 3);
      topDrops.forEach(item => {
        addLiveDrop({
          avatar: curUser.avatar || '🗡️',
          username: curUser.username,
          item,
          type: 'case'
        });
      });
    }
  }

  multiWinModalClose?.addEventListener('click', () => {
    modalMultiCaseWin?.classList.remove('active');
  });

  btnMultiKeepAll?.addEventListener('click', () => {
    modalMultiCaseWin?.classList.remove('active');
    if (lastMultiDropResult) {
      window.notify?.success('Инвентарь', `Все ${lastMultiDropResult.count} скинов сохранены в вашем инвентаре!`);
    }
  });

  btnMultiSellAll?.addEventListener('click', () => {
    if (!lastMultiDropResult || !lastMultiDropResult.droppedItems) return;
    const itemsToSell = [...lastMultiDropResult.droppedItems];
    let soldCount = 0;
    let totalGot = 0;
    itemsToSell.forEach(item => {
      const res = window.economyManager?.sellItem(item.instanceId);
      if (res && res.success) {
        soldCount++;
        totalGot += item.price;
      }
    });
    modalMultiCaseWin?.classList.remove('active');
    window.notify?.success(
      'Весь дроп продан!',
      `Продано ${soldCount} скинов на сумму $${totalGot.toFixed(2)}. Баланс пополнен!`
    );
  });

  btnMultiOpenAgain?.addEventListener('click', () => {
    modalMultiCaseWin?.classList.remove('active');
    if (currentSelectedCase) {
      openCaseModal(currentSelectedCase);
    }
  });

  // Win Drop Modal Handlers
  function showCaseWinModal(item, caseData) {
    caseWinImg.src = item.image;
    caseWinName.textContent = item.name;
    caseWinWear.textContent = `${item.wearName || item.wear} • ${(item.game || 'CS2').toUpperCase()} • ${item.rarityLabel || ''}`;
    caseWinPrice.textContent = `$${item.price.toFixed(2)}`;
    caseWinGlow.style.background = item.rarityColor || '#ffd700';

    btnWinSell.textContent = `💵 Продать за $${item.price.toFixed(2)}`;
    modalCaseWin.classList.add('active');

    const curUser = window.authManager?.currentUser;
    if (curUser && item) {
      addLiveDrop({
        avatar: curUser.avatar || '🗡️',
        username: curUser.username,
        item,
        type: 'case'
      });
    }
  }

  caseWinModalClose.addEventListener('click', () => {
    modalCaseWin.classList.remove('active');
  });

  // Win modal: Sell item immediately
  btnWinSell.addEventListener('click', () => {
    if (!lastDroppedItem) return;
    const res = window.economyManager.sellItem(lastDroppedItem.instanceId);
    if (res.success) {
      modalCaseWin.classList.remove('active');
    }
  });

  // Win modal: Send straight to Upgrader
  btnWinUpgrade.addEventListener('click', () => {
    if (!lastDroppedItem) return;
    window.upgraderEngine.selectedItems = [lastDroppedItem];
    modalCaseWin.classList.remove('active');
    switchTab('upgrader');
    updateUpgraderUI();
    window.notify.info('Скин готов к апгрейду', `${lastDroppedItem.name} ($${lastDroppedItem.price.toFixed(2)}) отправлен на арену!`);
    document.getElementById('upgrader-arena')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Win modal: Open another case
  btnWinOpenAgain.addEventListener('click', () => {
    modalCaseWin.classList.remove('active');
    if (currentSelectedCase) {
      openCaseModal(currentSelectedCase);
    }
  });

  // =========================================================================
  // BLOCK 5: LEADERBOARD & REAL PLAYERS ENGINE
  // =========================================================================
  let currentLeaderboardView = 'profit'; // 'profit' or 'debtors'

  const lbMetricPlayers = document.getElementById('lb-metric-players');
  const lbMetricVolume = document.getElementById('lb-metric-volume');
  const lbMetricBestWin = document.getElementById('lb-metric-best-win');
  const lbMetricDebt = document.getElementById('lb-metric-debt');
  const lbViewProfitBtn = document.getElementById('lb-view-profit');
  const lbViewDebtorsBtn = document.getElementById('lb-view-debtors');
  const lbThead = document.getElementById('leaderboard-thead');
  const lbTbody = document.getElementById('leaderboard-tbody');
  const lbEmptyState = document.getElementById('leaderboard-empty-state');

  function renderLeaderboard(view = currentLeaderboardView) {
    currentLeaderboardView = view;
    if (lbViewProfitBtn && lbViewDebtorsBtn) {
      lbViewProfitBtn.classList.toggle('active', view === 'profit');
      lbViewDebtorsBtn.classList.toggle('active', view === 'debtors');
    }

    if (!window.leaderboardManager) return;

    // 1. Update Global Aggregate Metrics
    const metrics = window.leaderboardManager.getGlobalMetrics();
    if (lbMetricPlayers) lbMetricPlayers.textContent = metrics.totalPlayers;
    if (lbMetricVolume) lbMetricVolume.textContent = `$${metrics.totalVolume.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    if (lbMetricBestWin) lbMetricBestWin.textContent = metrics.recordWinMult > 0 ? `${metrics.recordWinMult}x` : '0.00x';
    if (lbMetricDebt) lbMetricDebt.textContent = `$${metrics.totalDebt.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;

    const currentUser = window.authManager?.currentUser;

    if (view === 'profit') {
      const players = window.leaderboardManager.getTopProfitPlayers();

      if (lbThead) {
        lbThead.innerHTML = `
          <tr>
            <th style="width: 70px;">#</th>
            <th>Игрок</th>
            <th>Чистый профит</th>
            <th>Капитал (Net Worth)</th>
            <th>Винрейт / Апгрейды</th>
            <th>Рекордный дроп</th>
          </tr>
        `;
      }

      if (players.length === 0) {
        if (lbTbody) lbTbody.innerHTML = '';
        if (lbEmptyState) lbEmptyState.style.display = 'block';
        return;
      }

      if (lbEmptyState) lbEmptyState.style.display = 'none';
      if (lbTbody) {
        lbTbody.innerHTML = players.map((p, idx) => {
          const isCurrent = currentUser && currentUser.id === p.id;
          let rankBadge = `<div class="rank-badge">#${idx + 1}</div>`;
          if (idx === 0) rankBadge = `<div class="rank-badge rank-gold">🥇 1</div>`;
          else if (idx === 1) rankBadge = `<div class="rank-badge rank-silver">🥈 2</div>`;
          else if (idx === 2) rankBadge = `<div class="rank-badge rank-bronze">🥉 3</div>`;

          const isPositive = p.netProfit >= 0;
          const profitColor = isPositive ? '#10b981' : '#ef4444';
          const profitSign = isPositive ? '+' : '';

          const bestDropHtml = p.bestWinSkin ? `
            <div style="display: flex; align-items: center; gap: 8px;">
              ${p.bestWinSkin.image ? `<img src="${p.bestWinSkin.image}" alt="" style="width: 32px; height: 22px; object-fit: contain;">` : '<span style="font-size: 16px;">🏆</span>'}
              <span style="font-weight: 800; color: #fff;">$${(p.bestWinSkin.price || 0).toFixed(2)}</span>
              ${p.bestWinMultiplier > 0 ? `<span style="font-size: 11px; color: var(--accent-color); font-weight: 800;">(${p.bestWinMultiplier}x)</span>` : ''}
            </div>
          ` : `<span style="color: var(--text-dim); font-size: 12px;">—</span>`;

          return `
            <tr class="${isCurrent ? 'current-user-row' : ''}">
              <td>${rankBadge}</td>
              <td>
                <div class="player-info-cell">
                  <div class="player-avatar-sm" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); font-weight: 800; font-size: 11px; color: var(--accent-color);">${(p.username || '?').substring(0, 2).toUpperCase()}</div>
                  <div class="player-name-wrap">
                    <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                      <span style="font-weight: 800; color: #fff;">${p.username}</span>
                      ${p.equippedTitle ? `<span class="player-title-badge-table">${p.equippedTitle}</span>` : ''}
                      ${isCurrent ? '<span class="you-badge">★ ВЫ</span>' : ''}
                      ${p.isOnline ? '<span class="global-player-badge" style="background:rgba(16,185,129,.14);border-color:rgba(16,185,129,.4);color:#6ee7b7;">● ONLINE</span>' : ''}
                      ${p.isGlobal ? '<span class="global-player-badge">🌐 Игрок</span>' : ''}
                      ${!isCurrent && p.isGlobal ? '<span class="global-badge" title="Игрок глобального рейтинга" style="font-size:9.5px;font-weight:800;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.35);color:#38bdf8;padding:1px 6px;border-radius:20px;">🌐 TOP</span>' : ''}
                      ${p.currentDebt > 0 ? `<span class="loan-status-pill loan-status-danger" style="padding: 1px 6px; font-size: 9.5px;">⚠️ Долг: -$${p.currentDebt.toFixed(2)}</span>` : ''}
                    </div>
                  </div>
                </div>
              </td>
              <td>
                <span style="font-weight: 900; font-size: 14.5px; color: ${profitColor};">
                  ${profitSign}$${p.netProfit.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                ${p.currentDebt > 0 ? `<div style="font-size: 10px; color: #f87171;">Штраф 1.5x: -$${p.debtPenalty.toFixed(2)}</div>` : ''}
              </td>
              <td>
                <div style="font-weight: 800; color: ${p.netWorth >= 0 ? '#fff' : '#ef4444'};">$${p.netWorth.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
                <div style="font-size: 11px; color: var(--text-muted);">$${p.balance.toFixed(2)} баланс • ${p.invCount} скинов</div>
              </td>
              <td>
                <div style="font-weight: 700; color: #e5e7eb;">${p.winrate}%</div>
                <div style="font-size: 11px; color: var(--text-muted);">${p.wonUpgrades} побед из ${p.totalUpgrades}</div>
              </td>
              <td>
                ${bestDropHtml}
              </td>
            </tr>
          `;
        }).join('');
      }

    } else {
      // Debtors view
      const debtors = window.leaderboardManager.getTopDebtors();

      if (lbThead) {
        lbThead.innerHTML = `
          <tr>
            <th style="width: 70px;">#</th>
            <th>Игрок</th>
            <th>Текущий долг</th>
            <th>Всего взято</th>
            <th>Баланс игрока</th>
            <th>Кредитный статус</th>
          </tr>
        `;
      }

      if (debtors.length === 0) {
        if (lbTbody) lbTbody.innerHTML = '';
        if (lbEmptyState) {
          lbEmptyState.style.display = 'block';
          const title = lbEmptyState.querySelector('div:nth-child(2)');
          const desc = lbEmptyState.querySelector('div:nth-child(3)');
          if (title) title.textContent = 'Нет активных должников';
          if (desc) desc.textContent = 'Все зарегистрированные игроки вовремя закрыли задолженность или еще не брали кредит!';
        }
        return;
      }

      if (lbEmptyState) lbEmptyState.style.display = 'none';
      if (lbTbody) {
        lbTbody.innerHTML = debtors.map((p, idx) => {
          const isCurrent = currentUser && currentUser.id === p.id;
          const rankBadge = `<div class="rank-badge" style="color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3);">#${idx + 1}</div>`;

          let statusPill = '';
          if (p.currentDebt > 5000) {
            statusPill = `<span class="loan-status-pill loan-status-danger">Критический долг</span>`;
          } else if (p.currentDebt > 0) {
            statusPill = `<span class="loan-status-pill loan-status-active">Активный заём</span>`;
          } else {
            statusPill = `<span class="loan-status-pill loan-status-clean">Долг закрыт</span>`;
          }

          return `
            <tr class="${isCurrent ? 'current-user-row' : ''}">
              <td>${rankBadge}</td>
              <td>
                <div class="player-info-cell">
                  <div class="player-avatar-sm" style="background: rgba(255,255,255,0.06); border: 1px solid var(--border-color); font-weight: 800; font-size: 11px; color: var(--accent-color);">${(p.username || '?').substring(0, 2).toUpperCase()}</div>
                  <div class="player-name-wrap">
                    <span style="font-weight: 800; color: #fff;">${p.username}</span>
                    ${p.equippedTitle ? `<span class="player-title-badge-table">${p.equippedTitle}</span>` : ''}
                    ${isCurrent ? '<span class="you-badge">★ ВЫ</span>' : ''}
                    ${!isCurrent && p.isGlobal ? '<span class="global-badge" title="Игрок глобального рейтинга" style="font-size:9.5px;font-weight:800;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.35);color:#38bdf8;padding:1px 6px;border-radius:20px;">🌐 TOP</span>' : ''}
                  </div>
                </div>
              </td>
              <td>
                <span style="font-weight: 900; font-size: 15px; color: #ef4444;">
                  $${p.currentDebt.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </td>
              <td>
                <span style="font-weight: 700; color: var(--text-main);">
                  $${p.totalBorrowed.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </td>
              <td>
                <span style="font-weight: 800; color: var(--accent-color);">
                  $${p.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </td>
              <td style="white-space: nowrap !important; text-align: right; min-width: 110px;">
                ${statusPill}
              </td>
            </tr>
          `;
        }).join('');
      }
    }
  }

  lbViewProfitBtn?.addEventListener('click', () => renderLeaderboard('profit'));
  lbViewDebtorsBtn?.addEventListener('click', () => renderLeaderboard('debtors'));

  // Online leaderboard live re-render (called by OnlineDB when fresh top arrives)
  window.renderOnlineLeaderboard = window.requestLeaderboardRerender = function () {
    try {
      const activeTab = document.querySelector('.tab-content.active');
      if (activeTab && activeTab.id === 'tab-leaderboard') {
        renderLeaderboard(currentLeaderboardView);
      }
    } catch (e) {}
  };

  // =========================================================================
  // LIVE DROPS TICKER & SKINOMETRY INSPECTOR
  // =========================================================================
  const liveDropsTrack = document.getElementById('live-drops-track');

  function addLiveDrop({ avatar, username, item, type, multiplier }) {
    if (!liveDropsTrack || !item) return;

    const card = document.createElement('div');
    card.className = 'live-drop-card';
    card.style.setProperty('--drop-clr', item.rarityColor || '#888');
    card.title = `Игрок: ${username} • ${item.name} ($${item.price.toFixed(2)})`;

    card.innerHTML = `
      <div class="live-drop-user-avatar" title="${username}">${avatar || '🗡️'}</div>
      <img src="${item.image || item.fallbackSvg}" alt="" class="live-drop-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${(item.name || 'Skin').replace(/['\"\\]/g, '')}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
      <div class="live-drop-info">
        <div class="live-drop-name">${item.name}</div>
        <div class="live-drop-price">$${item.price.toFixed(2)}</div>
      </div>
    `;

    card.addEventListener('click', () => {
      openSkinInspectModal(item, { username, type, multiplier });
    });

    liveDropsTrack.prepend(card);

    if (liveDropsTrack.children.length > 25) {
      liveDropsTrack.lastElementChild?.remove();
    }
  }

  function initLiveDrops() {
    if (!liveDropsTrack) return;
    const allUsers = window.authManager?.getAllUsers() || [];
    const recentWins = [];

    allUsers.forEach(u => {
      (u.history || []).forEach(h => {
        if (h.isWin && h.targetSkin) {
          recentWins.push({
            avatar: u.avatar,
            username: u.username,
            item: h.targetSkin,
            type: 'upgrade',
            multiplier: h.multiplier,
            date: h.date
          });
        } else if (h.type === 'case' && h.winner) {
          recentWins.push({
            avatar: u.avatar,
            username: u.username,
            item: h.winner,
            type: 'case',
            date: h.date
          });
        } else if (h.type === 'contract' && h.winner) {
          recentWins.push({
            avatar: u.avatar,
            username: u.username,
            item: h.winner,
            type: 'contract',
            date: h.date
          });
        } else if (h.type === 'mines' && h.isWin && h.payout > 0) {
          recentWins.push({
            avatar: u.avatar,
            username: u.username,
            item: {
              name: `Мины (${h.minesCount || 3} шт) ${h.multiplier ? h.multiplier.toFixed(2) : '1.50'}x`,
              price: h.payout,
              rarityColor: h.multiplier >= 3 ? '#ffd700' : '#10b981',
              image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💎</text></svg>'
            },
            type: 'mines',
            multiplier: h.multiplier,
            date: h.date
          });
        } else if (h.type === 'coinflip' && h.isWin && h.payout > 0) {
          recentWins.push({
            avatar: u.avatar,
            username: u.username,
            item: h.stakedSkin || {
              name: `Coinflip (${h.winningSide}) 1.95x`,
              price: h.payout,
              rarityColor: '#ffd700',
              image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪙</text></svg>'
            },
            type: 'coinflip',
            multiplier: 1.95,
            date: h.date
          });
        } else if (h.type === 'crash' && h.isWin && h.payout > 0) {
          recentWins.push({
            avatar: u.avatar,
            username: u.username,
            item: {
              name: `Crash ${h.multiplier ? h.multiplier.toFixed(2) : '2.00'}x`,
              price: h.payout,
              rarityColor: (h.multiplier || 1) >= 5 ? '#ffd700' : '#10b981',
              image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚀</text></svg>'
            },
            type: 'crash',
            multiplier: h.multiplier,
            date: h.date
          });
        }
      });
    });

    recentWins.sort((a, b) => (b.date || 0) - (a.date || 0));

    if (recentWins.length > 0) {
      recentWins.slice(0, 16).reverse().forEach(drop => addLiveDrop(drop));
    } else {
      const skins = window.catalogController?.skins || [];
      const samples = skins.slice(0, 14);
      samples.forEach(skin => {
        addLiveDrop({
          avatar: '🎮',
          username: 'SIMUP Player',
          item: skin,
          type: 'upgrade'
        });
      });
    }
  }

  // Skin Inspection Modal Elements
  const modalSkinInspect = document.getElementById('modal-skin-inspect');
  const inspectModalClose = document.getElementById('inspect-modal-close');
  const inspectSkinImg = document.getElementById('inspect-skin-img');
  const inspectGlowBg = document.getElementById('inspect-glow-bg');
  const inspectSkinName = document.getElementById('inspect-skin-name');
  const inspectSkinSub = document.getElementById('inspect-skin-sub');
  const inspectSkinPrice = document.getElementById('inspect-skin-price');
  const inspectSkinFloat = document.getElementById('inspect-skin-float');
  const inspectSkinRarity = document.getElementById('inspect-skin-rarity');
  const btnInspectSetTarget = document.getElementById('btn-inspect-set-target');
  const btnInspectBuyDirect = document.getElementById('btn-inspect-buy-direct');
  let currentInspectedSkin = null;

  function openSkinInspectModal(skin, meta = {}) {
    if (!skin || !modalSkinInspect) return;
    currentInspectedSkin = skin;

    inspectSkinImg.src = skin.image;
    inspectSkinName.textContent = skin.name;
    const wearLabel = skin.wearName || skin.wear || 'Стандарт';
    const gameLabel = (skin.game || 'CS2').toUpperCase();
    inspectSkinSub.textContent = `${gameLabel} • ${wearLabel} ${meta.username ? `(Выбил: ${meta.username})` : ''}`;
    inspectSkinPrice.textContent = `$${skin.price.toFixed(2)}`;
    inspectSkinRarity.textContent = skin.rarityLabel || skin.rarity || 'Обычное';
    inspectSkinRarity.style.color = skin.rarityColor || '#fff';
    inspectGlowBg.style.background = skin.rarityColor || '#00ff88';

    if (btnInspectBuyDirect) {
      if (skin.exclusive) {
        btnInspectBuyDirect.style.display = 'none';
      } else {
        btnInspectBuyDirect.style.display = 'inline-flex';
        btnInspectBuyDirect.textContent = `⚡ Купить ($${skin.price.toFixed(2)})`;
      }
    }

    // Deterministic realistic float based on skin id/name
    let hash = 0;
    const str = skin.name + (skin.id || skin.instanceId || 'simup');
    for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
    const floatVal = (Math.abs(hash % 90000) / 100000 + 0.00318).toFixed(5);
    inspectSkinFloat.textContent = floatVal;

    modalSkinInspect.classList.add('active');
  }

  window.openSkinInspectModal = openSkinInspectModal;

  inspectModalClose?.addEventListener('click', () => {
    modalSkinInspect.classList.remove('active');
  });

  btnInspectBuyDirect?.addEventListener('click', () => {
    if (!currentInspectedSkin) return;
    if (window.catalogCart && typeof window.catalogCart.buyDirect === 'function') {
      const ok = window.catalogCart.buyDirect(currentInspectedSkin, 1);
      if (ok) modalSkinInspect.classList.remove('active');
    } else if (typeof window.buySkin === 'function') {
      const ok = window.buySkin(currentInspectedSkin);
      if (ok) modalSkinInspect.classList.remove('active');
    }
  });

  btnInspectSetTarget?.addEventListener('click', () => {
    if (!currentInspectedSkin) return;
    window.upgraderEngine.setTargetSkin(currentInspectedSkin);
    modalSkinInspect.classList.remove('active');
    switchTab('upgrader');
    updateUpgraderUI();
    window.notify.success('Целевой скин установлен', `${currentInspectedSkin.name} ($${currentInspectedSkin.price.toFixed(2)}) отправлен на арену!`);
    document.getElementById('upgrader-arena')?.scrollIntoView({ behavior: 'smooth' });
  });

  // =========================================================================
  // SPEED MODE CONTROLLER (Fast 1.2s, Standard 3.5s, Slow 7.6s)
  // =========================================================================
  const speedPills = document.querySelectorAll('.btn-speed-pill');
  const currentSpeed = window.upgraderEngine?.speedMode || 'normal';
  speedPills.forEach(btn => {
    const isThis = btn.dataset.speed === currentSpeed;
    btn.classList.toggle('active', isThis);
    btn.style.background = isThis ? 'var(--accent-color)' : 'transparent';
    btn.style.color = isThis ? '#fff' : 'var(--text-dim)';

    btn.addEventListener('click', () => {
      window.SoundManager?.playClick();
      const speed = btn.dataset.speed;
      window.upgraderEngine.setSpeedMode(speed);
      speedPills.forEach(b => {
        const match = b.dataset.speed === speed;
        b.classList.toggle('active', match);
        b.style.background = match ? 'var(--accent-color)' : 'transparent';
        b.style.color = match ? '#fff' : 'var(--text-dim)';
      });
      const names = { fast: 'Быстрая (1.2 сек)', normal: 'Стандартная (3.5 сек)', slow: 'Медленная (7.6 сек)' };
      window.notify.info('Скорость вращения', `Выбран режим: ${names[speed] || speed}`);
    });
  });

  // =========================================================================
  // GLOBAL HOTKEYS & TACTILE AUDIO FEEDBACK
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.code === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => {
        if (m.id === 'modal-auth' && (!window.authManager || !window.authManager.isAuthenticated())) return;
        m.classList.remove('active');
      });
      return;
    }

    if (e.code === 'Space') {
      e.preventDefault();
      if (modalCaseOpen?.classList.contains('active')) {
        btnSpinCase?.click();
      } else if (document.getElementById('tab-upgrader')?.classList.contains('active')) {
        btnFireUpgrade?.click();
      } else if (document.getElementById('tab-mines')?.classList.contains('active')) {
        document.getElementById('btn-mines-action')?.click();
      } else if (document.getElementById('tab-coinflip')?.classList.contains('active')) {
        document.getElementById('btn-fire-coinflip')?.click();
      } else if (document.getElementById('tab-crash')?.classList.contains('active')) {
        document.getElementById('btn-crash-action')?.click();
      }
      return;
    }

    const quickKeys = { 'Digit1': '1.5', 'Digit2': '2', 'Digit3': '5', 'Digit4': '10', 'Digit5': '20', 'Digit6': '50', 'Digit7': '100' };
    if (quickKeys[e.code]) {
      const multBtn = document.querySelector(`[data-quick-mult="${quickKeys[e.code]}"]`);
      if (multBtn) multBtn.click();
    }
  });

  // Tactile sound clicks across UI
  document.addEventListener('click', (e) => {
    const interactive = e.target.closest('button, .nav-tab-btn, .game-pill-btn, .bet-chip, .btn-mult-chip, .deposit-chip-btn, .avatar-choice-btn, .theme-card-option');
    if (interactive) {
      window.SoundManager?.playClick();
    }
  });

  // =========================================================================
  // TRADE-UP CONTRACTS CONTROLLER
  // =========================================================================
  function renderContractsDesk() {
    const user = window.authManager.currentUser;
    const slotsGrid = document.getElementById('contract-slots-grid');
    const totalValEl = document.getElementById('contract-total-val');
    const itemsCountEl = document.getElementById('contract-items-count');
    const outcomeRangeEl = document.getElementById('contract-outcome-range');
    const btnSign = document.getElementById('btn-sign-contract');
    const invPicker = document.getElementById('contract-inventory-picker');

    if (!slotsGrid || !window.contractsManager) return;

    const metrics = window.contractsManager.getMetrics();

    // 1. Update Metrics UI
    if (totalValEl) totalValEl.textContent = `$${metrics.totalValue.toFixed(2)}`;
    if (itemsCountEl) itemsCountEl.textContent = `${metrics.count} / 10 (мин. 3)`;
    if (outcomeRangeEl) {
      if (metrics.count >= 3) {
        outcomeRangeEl.textContent = `$${metrics.minOutcome.toFixed(2)} — $${metrics.maxOutcome.toFixed(2)}`;
      } else {
        outcomeRangeEl.textContent = `$0.00 — $0.00`;
      }
    }
    if (btnSign) {
      btnSign.disabled = !metrics.canSign;
    }

    // 2. Render 10 slots
    slotsGrid.innerHTML = '';
    for (let i = 0; i < 10; i++) {
      const item = window.contractsManager.selectedItems[i];
      const slotEl = document.createElement('div');
      slotEl.className = `contract-slot ${item ? 'filled' : ''}`;
      if (item) {
        slotEl.style.setProperty('--slot-clr', item.rarityColor || '#888');
        slotEl.innerHTML = `
          <button class="contract-slot-remove" data-remove-id="${item.instanceId}" title="Убрать из контракта">&times;</button>
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="contract-slot-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
          <div class="contract-slot-name" title="${item.name}">${item.name}</div>
          <div class="contract-slot-price">$${item.price.toFixed(2)}</div>
        `;
        slotEl.querySelector('.contract-slot-remove')?.addEventListener('click', (e) => {
          e.stopPropagation();
          window.SoundManager?.playClick();
          window.contractsManager.removeSkin(item.instanceId);
          renderContractsDesk();
        });
      } else {
        slotEl.innerHTML = `
          <span class="contract-slot-empty-plus">+</span>
          <span style="font-size: 10px; color: var(--text-dim); margin-top: 4px; font-weight: 700;">Слот #${i + 1}</span>
        `;
      }
      slotsGrid.appendChild(slotEl);
    }

    // 3. Render Available User Inventory
    if (!invPicker) return;
    if (!user || !user.inventory || user.inventory.length === 0) {
      invPicker.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
          🎒 В вашем инвентаре пока нет предметов для контракта.<br>
          <span style="font-size: 12px; color: var(--text-dim);">Выбивайте скины в Апгрейде или Кейсах!</span>
        </div>
      `;
      return;
    }

    const selectedIds = new Set(window.contractsManager.selectedItems.map(s => s.instanceId));
    const availableItems = user.inventory.filter(it => !selectedIds.has(it.instanceId));

    if (availableItems.length === 0) {
      invPicker.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-muted); font-size: 13px;">
          Все доступные предметы уже добавлены на стол контракта!
        </div>
      `;
      return;
    }

    invPicker.innerHTML = availableItems.map(item => `
      <div class="skin-card skin-rarity-${item.rarity}" data-add-contract="${item.instanceId}" style="--rarity-clr: ${item.rarityColor || '#888'}; cursor: pointer; padding: 10px; transition: transform 0.15s ease;">
        <div class="skin-card-header">
          <span class="game-badge game-${item.game}">${(item.game || 'CS2').toUpperCase()}</span>
          ${item.wear && item.wear !== 'STANDARD' ? `<span class="wear-pill">${item.wear}</span>` : ''}
        </div>
        <div class="skin-img-wrap" style="height: 60px;">
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="skin-img" style="max-height: 55px;" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id || ''}', '${item.name?.replace(/['\"\\]/g, '') || ''}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
        </div>
        <div class="skin-info" style="margin-top: 4px;">
          <div class="skin-name" style="font-size: 11px;" title="${item.name}">${item.name}</div>
          <div class="skin-price" style="font-size: 13px; margin: 2px 0;">$${item.price.toFixed(2)}</div>
          <div style="font-size: 10px; color: var(--accent-color); font-weight: 700; text-align: center; margin-top: 4px;">+ В контракт</div>
        </div>
      </div>
    `).join('');

    invPicker.querySelectorAll('[data-add-contract]').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.addContract;
        const item = user.inventory.find(it => it.instanceId === id);
        if (!item) return;

        const res = window.contractsManager.addSkin(item);
        if (res.success) {
          window.SoundManager?.playClick();
          renderContractsDesk();
        } else {
          window.notify.warning('Контракт', res.error);
        }
      });
    });
  }

  // Contract Action Buttons
  const btnSignContract = document.getElementById('btn-sign-contract');
  btnSignContract?.addEventListener('click', () => {
    const res = window.contractsManager.executeContract();
    if (!res.success) {
      window.notify.error('Ошибка контракта', res.error);
      return;
    }

    const user = window.authManager.currentUser;
    updateHeaderUserUI(user);
    renderContractsDesk();
    window.questsManager?.recordAction('sign_contract', 1);
    if (window.updateQuestsBadge) window.updateQuestsBadge();

    // Add to Live Drops
    addLiveDrop({
      avatar: user.avatar,
      username: user.username,
      item: res.winner,
      type: 'contract'
    });

    // Notify user & trigger Inspection modal
    const isJackpot = res.winner.price > res.totalCost * 1.5;
    if (isJackpot) {
      window.notify.bigWin('🎉 ДЖЕКПОТ КОНТРАКТА!', `Выкован ${res.winner.name} стоимостью $${res.winner.price.toFixed(2)} (Профит +$${res.profit.toFixed(2)})!`);
    } else {
      window.notify.success('Контракт подписан!', `Получен ${res.winner.name} стоимостью $${res.winner.price.toFixed(2)}!`);
    }

    openSkinInspectModal(res.winner, { username: user.username, type: 'contract' });
  });

  const btnContractFillCheapest = document.getElementById('btn-contract-fill-cheapest');
  btnContractFillCheapest?.addEventListener('click', () => {
    const user = window.authManager.currentUser;
    if (!user || !user.inventory || user.inventory.length === 0) {
      window.notify.warning('Инвентарь пуст', 'У вас нет предметов для контракта.');
      return;
    }
    const added = window.contractsManager.fillCheapest(user.inventory);
    if (added > 0) {
      window.SoundManager?.playClick();
      window.notify.info('Автозаполнение', `Добавлено ${added} самых дешевых предметов в контракт.`);
      renderContractsDesk();
    } else {
      window.notify.warning('Контракт', 'Не удалось добавить предметы (слоты заполнены или предметов нет).');
    }
  });

  // =========================================================================
  // LUCKY WHEEL OF FORTUNE CONTROLLER
  // =========================================================================
  const modalLuckyWheel = document.getElementById('modal-lucky-wheel');
  const luckyWheelModalClose = document.getElementById('lucky-wheel-modal-close');
  const btnOpenLuckyWheel = document.getElementById('btn-open-lucky-wheel');
  const btnSpinLuckyWheel = document.getElementById('btn-spin-lucky-wheel');

  function openLuckyWheel() {
    if (!modalLuckyWheel) return;
    modalLuckyWheel.classList.add('active');
    setTimeout(() => {
      window.luckyWheelManager?.init('lucky-wheel-canvas');
      window.luckyWheelManager?.updateModalState();
    }, 60);
  }

  btnOpenLuckyWheel?.addEventListener('click', openLuckyWheel);
  luckyWheelModalClose?.addEventListener('click', () => {
    if (window.luckyWheelManager?.isSpinning) return;
    modalLuckyWheel.classList.remove('active');
  });

  btnSpinLuckyWheel?.addEventListener('click', () => {
    window.luckyWheelManager?.spin();
  });

  // =========================================================================
  // CUSTOM CASE BUILDER CONTROLLER
  // =========================================================================
  const modalCaseBuilder = document.getElementById('modal-case-builder');
  const caseBuilderModalClose = document.getElementById('case-builder-modal-close');
  const btnOpenCaseBuilder = document.getElementById('btn-open-case-builder');
  const builderCaseName = document.getElementById('builder-case-name');
  const builderCaseGame = document.getElementById('builder-case-game');
  const builderCaseIcon = document.getElementById('builder-case-icon');
  const builderSlotsGrid = document.getElementById('builder-slots-grid');
  const builderItemsCount = document.getElementById('builder-items-count');
  const builderCalculatedPrice = document.getElementById('builder-calculated-price');
  const builderCatalogSearch = document.getElementById('builder-catalog-search');
  const builderCatalogGrid = document.getElementById('builder-catalog-grid');
  const btnSaveCustomCase = document.getElementById('btn-save-custom-case');

  function renderCaseBuilder() {
    if (!builderSlotsGrid || !window.caseBuilderManager) return;
    const metrics = window.caseBuilderManager.calculateMetrics();

    if (builderItemsCount) builderItemsCount.textContent = window.caseBuilderManager.selectedSkins.length;
    if (builderCalculatedPrice) builderCalculatedPrice.textContent = `Цена кейса: $${metrics.casePrice.toFixed(2)}`;
    if (btnSaveCustomCase) btnSaveCustomCase.disabled = !metrics.canSave;

    // Render Slots in Builder
    if (metrics.itemsWithOdds.length === 0) {
      builderSlotsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-dim); font-size: 13px;">
          Кейс пока пуст. Добавьте от 3 до 10 скинов из каталога ниже!
        </div>
      `;
    } else {
      builderSlotsGrid.innerHTML = metrics.itemsWithOdds.map(it => `
        <div style="background: rgba(0,0,0,0.5); border: 1px solid ${it.skin.rarityColor || 'var(--border-color)'}; border-radius: var(--radius-sm); padding: 6px; text-align: center; position: relative;">
          <button class="btn-builder-remove-skin" data-remove-skin="${it.skin.id}" style="position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; border-radius: 50%; background: rgba(239,68,68,0.3); color: #ef4444; border: none; font-size: 11px; cursor: pointer;">&times;</button>
          <img src="${it.skin.image}" alt="" style="width: 50px; height: 36px; object-fit: contain;">
          <div style="font-size: 10px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 90px; margin: 2px auto;">${it.skin.name}</div>
          <div style="font-size: 10px; color: var(--accent-color); font-weight: 800;">$${it.skin.price.toFixed(2)}</div>
          <div style="font-size: 9.5px; color: #ffd700; font-weight: 800; background: rgba(255,215,0,0.15); padding: 1px 4px; border-radius: 3px; margin-top: 2px;">${it.chance}%</div>
        </div>
      `).join('');

      builderSlotsGrid.querySelectorAll('[data-remove-skin]').forEach(btn => {
        btn.addEventListener('click', () => {
          window.caseBuilderManager.removeSkin(btn.dataset.removeSkin);
          renderCaseBuilder();
        });
      });
    }

    // Render Catalog Items for current game
    const selectedGame = builderCaseGame?.value || 'cs2';
    const query = (builderCatalogSearch?.value || '').toLowerCase().trim();
    const allSkins = window.catalogController?.skins || [];
    const available = allSkins.filter(s => {
      const matchGame = s.game === selectedGame;
      const matchQuery = !query || s.name.toLowerCase().includes(query);
      return matchGame && matchQuery;
    }).slice(0, 40);

    if (builderCatalogGrid) {
      builderCatalogGrid.innerHTML = available.map(skin => {
        const isAdded = window.caseBuilderManager.selectedSkins.some(s => s.id === skin.id);
        return `
          <div class="skin-card skin-rarity-${skin.rarity}" style="--rarity-clr: ${skin.rarityColor}; padding: 8px; cursor: pointer; opacity: ${isAdded ? '0.4' : '1'};">
            <div class="skin-img-wrap" style="height: 48px;">
              <img src="${skin.image}" alt="" class="skin-img" style="max-height: 44px;">
            </div>
            <div class="skin-info" style="margin-top: 4px;">
              <div class="skin-name" style="font-size: 10px;" title="${skin.name}">${skin.name}</div>
              <div class="skin-price" style="font-size: 11px; margin: 2px 0;">$${skin.price.toFixed(2)}</div>
              <button class="btn-builder-add-skin" data-add-skin="${skin.id}" style="width: 100%; padding: 4px; font-size: 10px; background: rgba(var(--accent-rgb), 0.15); border: 1px solid var(--accent-color); color: var(--accent-color); border-radius: 4px; cursor: pointer;" ${isAdded ? 'disabled' : ''}>
                ${isAdded ? '✓ В кейсе' : '+ Добавить'}
              </button>
            </div>
          </div>
        `;
      }).join('');

      builderCatalogGrid.querySelectorAll('[data-add-skin]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const skinId = btn.dataset.addSkin;
          const skin = allSkins.find(s => s.id === skinId);
          if (!skin) return;

          const res = window.caseBuilderManager.addSkin(skin);
          if (res.success) {
            window.SoundManager?.playClick();
            renderCaseBuilder();
          } else {
            window.notify.warning('Конструктор', res.error);
          }
        });
      });
    }
  }

  btnOpenCaseBuilder?.addEventListener('click', () => {
    modalCaseBuilder?.classList.add('active');
    renderCaseBuilder();
  });

  caseBuilderModalClose?.addEventListener('click', () => {
    modalCaseBuilder?.classList.remove('active');
  });

  builderCaseGame?.addEventListener('change', () => {
    renderCaseBuilder();
  });

  builderCatalogSearch?.addEventListener('input', () => {
    renderCaseBuilder();
  });

  btnSaveCustomCase?.addEventListener('click', () => {
    const name = builderCaseName.value;
    const icon = builderCaseIcon.value;
    const game = builderCaseGame.value;

    const res = window.caseBuilderManager.createCase(name, icon, game);
    if (res.success) {
      window.SoundManager?.playJackpot();
      window.notify.bigWin('Кейс создан!', `Кейс «${res.case.name}» стоимостью $${res.case.price.toFixed(2)} добавлен в список!`);
      modalCaseBuilder?.classList.remove('active');
      renderCasesGrid();
    } else {
      window.notify.error('Ошибка создания', res.error);
    }
  });

  // =========================================================================
  // MINES MINI-GAME CONTROLLER
  // =========================================================================
  const minesBetInput = document.getElementById('mines-bet-input');
  const minesUserBalance = document.getElementById('mines-user-balance');
  const minesCountSlider = document.getElementById('mines-count-slider');
  const minesCountDisplay = document.getElementById('mines-count-display');
  const minesPresetChips = document.querySelectorAll('#mines-preset-chips .game-pill-btn');
  const btnMinesAction = document.getElementById('btn-mines-action');
  const minesLiveMultiplier = document.getElementById('mines-live-multiplier');
  const minesNextMultiplier = document.getElementById('mines-next-multiplier');
  const minesLivePayout = document.getElementById('mines-live-payout');
  const minesGridContainer = document.getElementById('mines-grid-container');
  const minesPfStatus = document.getElementById('mines-pf-status');
  const minesPfHash = document.getElementById('mines-pf-hash');

  function renderMinesBoard() {
    const user = window.authManager.currentUser;
    const engine = window.minesEngine;
    if (!minesGridContainer || !engine) return;

    if (minesUserBalance && user) {
      minesUserBalance.textContent = `Баланс: $${user.balance.toFixed(2)}`;
    }

    const state = engine.gameState;
    const bet = parseFloat(minesBetInput?.value) || 10;

    // 1. Update Controls & Action Button
    if (state === 'idle') {
      if (btnMinesAction) {
        btnMinesAction.textContent = `🎮 Начать игру ($${bet.toFixed(2)})`;
        btnMinesAction.style.background = 'linear-gradient(135deg, var(--accent-color), #059669)';
        btnMinesAction.disabled = false;
      }
      if (minesBetInput) minesBetInput.disabled = false;
      if (minesCountSlider) minesCountSlider.disabled = false;
      if (minesLiveMultiplier) minesLiveMultiplier.textContent = '1.00x';
      if (minesNextMultiplier) {
        const next = engine.calculateMultiplier(parseInt(minesCountSlider?.value, 10) || 3, 1);
        minesNextMultiplier.textContent = `${next.toFixed(2)}x`;
      }
      if (minesLivePayout) minesLivePayout.textContent = `$${bet.toFixed(2)}`;
    } else if (state === 'playing') {
      if (btnMinesAction) {
        btnMinesAction.textContent = engine.revealedCount === 0
          ? '🎯 Выберите клетку...'
          : `💰 Забрать $${engine.currentPayout.toFixed(2)} (${engine.currentMultiplier.toFixed(2)}x)`;
        btnMinesAction.style.background = 'linear-gradient(135deg, #10b981, #047857)';
        btnMinesAction.disabled = engine.revealedCount === 0;
      }
      if (minesBetInput) minesBetInput.disabled = true;
      if (minesCountSlider) minesCountSlider.disabled = true;
      if (minesLiveMultiplier) minesLiveMultiplier.textContent = `${engine.currentMultiplier.toFixed(2)}x`;
      if (minesNextMultiplier) minesNextMultiplier.textContent = `${engine.nextMultiplier.toFixed(2)}x`;
      if (minesLivePayout) minesLivePayout.textContent = `$${engine.currentPayout.toFixed(2)}`;
      if (minesPfStatus) minesPfStatus.textContent = 'Раунд активен (Хэш зафиксирован)';
      if (minesPfHash) minesPfHash.textContent = engine.serverSeedHash;
    } else if (state === 'ended') {
      if (btnMinesAction) {
        btnMinesAction.textContent = `🎮 Играть снова ($${bet.toFixed(2)})`;
        btnMinesAction.style.background = 'linear-gradient(135deg, var(--accent-color), #059669)';
        btnMinesAction.disabled = false;
      }
      if (minesBetInput) minesBetInput.disabled = false;
      if (minesCountSlider) minesCountSlider.disabled = false;
      if (minesPfStatus) minesPfStatus.textContent = 'Раунд завершен (Seed раскрыт)';
      if (minesPfHash) minesPfHash.textContent = `Server Seed: ${engine.serverSeed}`;
    }

    // 2. Render 25 Cells
    minesGridContainer.innerHTML = '';
    for (let i = 0; i < 25; i++) {
      const tile = document.createElement('div');
      tile.className = 'mine-tile';

      if (state === 'idle') {
        tile.textContent = '?';
      } else if (state === 'playing') {
        const cell = engine.grid[i];
        if (cell.revealed) {
          tile.classList.add('revealed-gem');
          tile.textContent = '💎';
        } else {
          tile.textContent = '?';
          tile.addEventListener('click', () => handleMineTileClick(i));
        }
      } else if (state === 'ended') {
        const cell = engine.grid[i];
        if (cell.isBomb) {
          tile.classList.add('revealed-bomb');
          tile.textContent = '💣';
          if (!cell.revealed) tile.classList.add('dimmed');
        } else {
          tile.classList.add('revealed-gem');
          tile.textContent = '💎';
          if (!cell.revealed) tile.classList.add('dimmed');
        }
      }

      minesGridContainer.appendChild(tile);
    }
  }

  function handleMineTileClick(index) {
    const engine = window.minesEngine;
    if (engine.gameState !== 'playing') return;

    const res = engine.revealCell(index);
    if (!res.success) return;

    if (res.isBomb) {
      document.body.classList.add('screen-shake');
      setTimeout(() => document.body.classList.remove('screen-shake'), 450);
      window.notify.error('💥 ВЗРЫВ МИНЫ!', 'Вы наступили на мину. Ставка сгорела!');
    } else if (res.isCashout) {
      window.notify.bigWin('🎉 ПОЛНАЯ ЗАЧИСТКА!', `Вы открыли все кристаллы! Джекпот $${res.payout.toFixed(2)} (${res.multiplier.toFixed(2)}x)!`);
      const user = window.authManager.currentUser;
      if (user) {
        addLiveDrop({
          avatar: user.avatar,
          username: user.username,
          item: {
            name: `Мины (${engine.minesCount} шт) ${res.multiplier.toFixed(2)}x`,
            price: res.payout,
            rarityColor: '#ffd700',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💎</text></svg>'
          },
          type: 'mines',
          multiplier: res.multiplier
        });
      }
    }

    renderMinesBoard();
    updateHeaderUserUI(window.authManager.currentUser);
  }

  // Mines Action Button Click (Start / Cashout)
  btnMinesAction?.addEventListener('click', async () => {
    const engine = window.minesEngine;
    const user = window.authManager.currentUser;
    if (!user) {
      window.showAuthModal('login');
      return;
    }

    if (engine.gameState === 'idle' || engine.gameState === 'ended') {
      const bet = Math.max(0.1, parseFloat(minesBetInput.value) || 10);
      const mines = parseInt(minesCountSlider.value, 10) || 3;

      const res = await engine.startRound({ betAmount: bet, minesCount: mines });
      if (!res.success) {
        window.notify.warning('Мины', res.error);
        return;
      }

      window.SoundManager?.playClick();
      renderMinesBoard();
      updateHeaderUserUI(user);
    } else if (engine.gameState === 'playing') {
      const res = engine.cashOut();
      if (res.success) {
        window.notify.bigWin('💰 ВЫИГРЫШ ЗАБРАН!', `Вы забрали $${res.payout.toFixed(2)} (${res.multiplier.toFixed(2)}x, профит +$${res.profit.toFixed(2)})!`);
        addLiveDrop({
          avatar: user.avatar,
          username: user.username,
          item: {
            name: `Мины (${engine.minesCount} шт) ${res.multiplier.toFixed(2)}x`,
            price: res.payout,
            rarityColor: res.multiplier >= 3 ? '#ffd700' : '#10b981',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">💎</text></svg>'
          },
          type: 'mines',
          multiplier: res.multiplier
        });
        if (res.multiplier >= 2.0) {
          window.questsManager?.recordAction('mines_clear', 1);
          if (window.updateQuestsBadge) window.updateQuestsBadge();
        }
        renderMinesBoard();
        updateHeaderUserUI(user);
      }
    }
  });

  // Slider & Presets Listeners
  minesCountSlider?.addEventListener('input', () => {
    const val = parseInt(minesCountSlider.value, 10);
    if (minesCountDisplay) {
      minesCountDisplay.textContent = `${val} ${getNoun(val, 'мина', 'мины', 'мин')}`;
    }
    minesPresetChips.forEach(chip => {
      chip.classList.toggle('active', parseInt(chip.dataset.presetMines, 10) === val);
    });
    if (window.minesEngine?.gameState === 'idle') {
      renderMinesBoard();
    }
  });

  minesPresetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const val = parseInt(chip.dataset.presetMines, 10);
      if (minesCountSlider) minesCountSlider.value = val;
      if (minesCountDisplay) {
        minesCountDisplay.textContent = `${val} ${getNoun(val, 'мина', 'мины', 'мин')}`;
      }
      minesPresetChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      if (window.minesEngine?.gameState === 'idle') {
        renderMinesBoard();
      }
    });
  });

  // Bet quick chips
  document.querySelectorAll('[data-mines-chip]').forEach(btn => {
    btn.addEventListener('click', () => {
      const add = parseFloat(btn.dataset.minesChip);
      const cur = parseFloat(minesBetInput.value) || 0;
      minesBetInput.value = (cur + add).toFixed(2);
      renderMinesBoard();
    });
  });

  document.querySelectorAll('[data-mines-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.minesAction;
      const cur = parseFloat(minesBetInput.value) || 10;
      const user = window.authManager.currentUser;
      const bal = user ? user.balance : 1000;

      if (act === 'half') {
        minesBetInput.value = Math.max(0.1, Number((cur / 2).toFixed(2)));
      } else if (act === 'double') {
        minesBetInput.value = Math.min(bal, Number((cur * 2).toFixed(2)));
      } else if (act === 'max') {
        minesBetInput.value = Math.max(0.1, Number(bal.toFixed(2)));
      }
      renderMinesBoard();
    });
  });

  minesBetInput?.addEventListener('input', () => {
    if (window.minesEngine?.gameState === 'idle') {
      renderMinesBoard();
    }
  });

  // =========================================================================
  // DAILY QUESTS & BATTLE PASS CONTROLLER
  // =========================================================================
  const modalQuests = document.getElementById('modal-quests');
  const btnOpenQuests = document.getElementById('btn-open-quests');
  const questsModalClose = document.getElementById('quests-modal-close');
  const questsListContainer = document.getElementById('quests-list-container');
  const questsBadge = document.getElementById('quests-badge');
  const questsResetTimer = document.getElementById('quests-reset-timer');
  const championBonusStatus = document.getElementById('champion-bonus-status');
  const btnClaimChampionBonus = document.getElementById('btn-claim-champion-bonus');

  function updateQuestsBadge() {
    if (!window.questsManager) return;
    const count = window.questsManager.getUnclaimedCount();
    const badges = document.querySelectorAll('#quests-badge, #quests-badge-count');
    badges.forEach(b => {
      if (count > 0) {
        b.style.display = 'block';
        b.textContent = count;
      } else {
        b.style.display = 'none';
      }
    });
  }
  window.updateQuestsBadge = updateQuestsBadge;

  function renderQuestsModal() {
    if (!questsListContainer || !window.questsManager) return;
    const data = window.questsManager.getCurrentUserQuests();
    if (!data) return;

    // Render Quests list
    questsListContainer.innerHTML = data.quests.map(q => {
      const isCompleted = q.progress >= q.target;
      const isClaimed = q.claimed;
      const pct = Math.min(100, Math.round((q.progress / q.target) * 100));

      let btnLabel = 'В процессе';
      let btnDisabled = true;
      if (isClaimed) {
        btnLabel = '✓ Получено';
        btnDisabled = true;
      } else if (isCompleted) {
        btnLabel = 'Забрать';
        btnDisabled = false;
      }

      return `
        <div class="quest-card ${isCompleted ? 'completed' : ''} ${isClaimed ? 'claimed' : ''}">
          <div class="quest-left-col">
            <div class="quest-icon-wrap">${q.icon}</div>
            <div class="quest-info">
              <div class="quest-title">${q.title}</div>
              <div class="quest-desc">${q.desc}</div>
              <div class="quest-progress-track">
                <div class="quest-progress-fill" style="width: ${pct}%;"></div>
              </div>
              <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-dim); margin-top: 4px;">
                <span>Прогресс: ${q.progress} / ${q.target}</span>
                <span style="font-weight: 700; color: ${isCompleted ? '#10b981' : 'var(--text-muted)'};">${pct}%</span>
              </div>
            </div>
          </div>
          <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 8px;">
            <div class="quest-rewards-badge">
              <span class="quest-reward-cash">+$${q.rewardCash}</span>
              <span class="quest-reward-xp">+${q.rewardXp} XP</span>
            </div>
            <button class="btn-quest-claim" data-claim-quest="${q.id}" ${btnDisabled ? 'disabled' : ''}>
              ${btnLabel}
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind claim buttons
    questsListContainer.querySelectorAll('[data-claim-quest]').forEach(btn => {
      btn.addEventListener('click', () => {
        const qid = btn.dataset.claimQuest;
        const res = window.questsManager.claimQuest(qid);
        if (res.success) {
          window.notify.success('Награда получена! 🎉', `Вам начислено +$${res.rewardCash.toFixed(2)} и +${res.rewardXp} XP!`);
          renderQuestsModal();
          updateQuestsBadge();
          updateHeaderUserUI(window.authManager.currentUser);
        } else {
          window.notify.warning('Задания', res.error);
        }
      });
    });

    // Update Champion bonus status
    const completedCount = data.quests.filter(q => q.progress >= q.target).length;
    if (championBonusStatus) {
      championBonusStatus.textContent = `Прогресс: ${completedCount} / 5 заданий`;
    }
    if (btnClaimChampionBonus) {
      if (data.claimedBonus) {
        btnClaimChampionBonus.disabled = true;
        btnClaimChampionBonus.textContent = '✓ Забран сегодня';
      } else if (completedCount >= 5) {
        btnClaimChampionBonus.disabled = false;
        btnClaimChampionBonus.textContent = '🎁 Открыть сундук';
      } else {
        btnClaimChampionBonus.disabled = true;
        btnClaimChampionBonus.textContent = `Закрыто (${completedCount}/5)`;
      }
    }

    // Update timer until midnight
    if (questsResetTimer) {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      const diffMs = midnight - now;
      const hours = String(Math.floor(diffMs / (1000 * 60 * 60))).padStart(2, '0');
      const mins = String(Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
      const secs = String(Math.floor((diffMs % (1000 * 60)) / 1000)).padStart(2, '0');
      questsResetTimer.textContent = `${hours}:${mins}:${secs}`;
    }
  }

  // Quests modal triggers (Header, Desktop nav, Mobile subnav, etc.)
  document.querySelectorAll('#btn-open-quests, #btn-header-quests, #btn-subnav-quests, .btn-open-quests-trigger').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!window.authManager.currentUser) {
        window.showAuthModal('login');
        return;
      }
      renderQuestsModal();
      modalQuests?.classList.add('active');
    });
  });

  // Header Cart trigger
  const btnHeaderCart = document.getElementById('btn-header-cart');
  btnHeaderCart?.addEventListener('click', () => {
    window.CatalogCart?.openModal();
  });

  questsModalClose?.addEventListener('click', () => {
    modalQuests?.classList.remove('active');
  });

  btnClaimChampionBonus?.addEventListener('click', () => {
    const res = window.questsManager.claimBonusChest();
    if (res.success) {
      window.notify.bigWin('🏆 СУПЕР-БОНУС ЧЕМПИОНА!', `Вы получили +$${res.bonusCash.toFixed(2)}, +${res.bonusXp} XP и секретный скин: ${res.bonusSkin ? res.bonusSkin.name : 'Тайный скин'}!`);
      renderQuestsModal();
      updateQuestsBadge();
      updateHeaderUserUI(window.authManager.currentUser);
    } else {
      window.notify.warning('Бонус Чемпиона', res.error);
    }
  });

  // =========================================================================
  // COINFLIP ARENA (1-ON-1 DUELS) CONTROLLER
  // =========================================================================
  let cfMode = 'balance'; // 'balance' or 'skin'
  let cfSelectedSide = 'T'; // 'T' or 'CT'
  let cfSelectedSkin = null;

  const btnSideT = document.getElementById('btn-side-t');
  const btnSideCT = document.getElementById('btn-side-ct');
  const btnCfModeBalance = document.getElementById('btn-cf-mode-balance');
  const btnCfModeSkin = document.getElementById('btn-cf-mode-skin');
  const cfBalanceSection = document.getElementById('cf-balance-bet-section');
  const cfSkinSection = document.getElementById('cf-skin-bet-section');
  const cfBetInput = document.getElementById('cf-bet-input');
  const cfUserBalanceBadge = document.getElementById('cf-user-balance-badge');
  const cfSelectedSkinPreview = document.getElementById('cf-selected-skin-preview');
  const cfInventoryList = document.getElementById('cf-inventory-list');
  const cfPotentialPayout = document.getElementById('cf-potential-payout');
  const cfPotentialProfit = document.getElementById('cf-potential-profit');
  const btnFireCoinflip = document.getElementById('btn-fire-coinflip');
  const coin3dElement = document.getElementById('coin-3d-element');
  const cfPlayerAvatar = document.getElementById('cf-player-avatar');
  const cfPlayerName = document.getElementById('cf-player-name');
  const cfPlayerSideBadge = document.getElementById('cf-player-side-badge');
  const cfBotSideBadge = document.getElementById('cf-bot-side-badge');
  const cfStatusTitle = document.getElementById('cf-status-title');
  const cfStatusDesc = document.getElementById('cf-status-desc');
  const cfPfStatus = document.getElementById('cf-pf-status');
  const cfPfHash = document.getElementById('cf-pf-hash');

  function renderCoinflipUI() {
    const user = window.authManager.currentUser;
    const bal = user ? user.balance : 0;

    if (cfUserBalanceBadge) {
      cfUserBalanceBadge.textContent = `Баланс: $${bal.toFixed(2)}`;
    }
    if (cfPlayerAvatar && user) {
      cfPlayerAvatar.textContent = user.avatar || '🗡️';
    }
    if (cfPlayerName && user) {
      cfPlayerName.textContent = user.username || 'Вы';
    }

    // Side buttons
    if (btnSideT) btnSideT.classList.toggle('active', cfSelectedSide === 'T');
    if (btnSideCT) btnSideCT.classList.toggle('active', cfSelectedSide === 'CT');

    if (cfPlayerSideBadge) {
      cfPlayerSideBadge.className = `cf-player-side-badge ${cfSelectedSide === 'T' ? 'side-t' : 'side-ct'}`;
      cfPlayerSideBadge.textContent = `Ставка: ${cfSelectedSide === 'T' ? 'T (Золото)' : 'CT (Серебро)'}`;
    }
    if (cfBotSideBadge) {
      const botSide = cfSelectedSide === 'T' ? 'CT' : 'T';
      cfBotSideBadge.className = `cf-player-side-badge ${botSide === 'T' ? 'side-t' : 'side-ct'}`;
      cfBotSideBadge.textContent = `Ставка: ${botSide === 'T' ? 'T (Золото)' : 'CT (Серебро)'}`;
    }

    // Mode
    if (btnCfModeBalance) btnCfModeBalance.classList.toggle('active', cfMode === 'balance');
    if (btnCfModeSkin) btnCfModeSkin.classList.toggle('active', cfMode === 'skin');
    if (cfBalanceSection) cfBalanceSection.style.display = cfMode === 'balance' ? 'block' : 'none';
    if (cfSkinSection) cfSkinSection.style.display = cfMode === 'skin' ? 'block' : 'none';

    // Calculate payouts
    let bet = 10;
    if (cfMode === 'balance') {
      bet = Math.max(0.5, parseFloat(cfBetInput?.value) || 10);
    } else if (cfSelectedSkin) {
      bet = cfSelectedSkin.price;
    }
    const payout = Number((bet * 1.95).toFixed(2));
    const profit = Number((payout - bet).toFixed(2));

    if (cfPotentialPayout) cfPotentialPayout.textContent = `$${payout.toFixed(2)}`;
    if (cfPotentialProfit) cfPotentialProfit.textContent = `+$${profit.toFixed(2)}`;
    if (btnFireCoinflip) {
      btnFireCoinflip.textContent = `🪙 ПОДБРОСИТЬ МОНЕТУ ($${bet.toFixed(2)})`;
    }

    // Render Inventory for Skin Mode
    if (cfMode === 'skin' && cfInventoryList) {
      if (!user || !user.inventory || user.inventory.length === 0) {
        cfInventoryList.innerHTML = `<div style="grid-column: 1 / -1; padding: 14px; text-align: center; color: var(--text-dim); font-size: 12px;">Инвентарь пуст. Пополните баланс или выбейте скины!</div>`;
      } else {
        cfInventoryList.innerHTML = user.inventory.map(skin => `
          <div class="skin-card skin-rarity-${skin.rarity}" data-cf-select-skin="${skin.instanceId}" style="--rarity-clr: ${skin.rarityColor || '#888'}; padding: 6px; cursor: pointer; ${cfSelectedSkin?.instanceId === skin.instanceId ? 'border-color: #ffd700; transform: scale(1.04);' : ''}">
            <img src="${skin.image}" alt="" style="width: 100%; height: 40px; object-fit: contain;">
            <div style="font-size: 9.5px; font-weight: 700; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-top: 2px;">${skin.name}</div>
            <div style="font-size: 10.5px; color: var(--accent-color); font-weight: 800;">$${skin.price.toFixed(2)}</div>
          </div>
        `).join('');

        cfInventoryList.querySelectorAll('[data-cf-select-skin]').forEach(el => {
          el.addEventListener('click', () => {
            const instId = el.dataset.cfSelectSkin;
            cfSelectedSkin = user.inventory.find(it => it.instanceId === instId) || null;
            if (cfSelectedSkinPreview && cfSelectedSkin) {
              cfSelectedSkinPreview.innerHTML = `
                <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                  <img src="${cfSelectedSkin.image}" alt="" style="width: 44px; height: 32px; object-fit: contain;">
                  <div style="text-align: left; flex: 1;">
                    <div style="font-size: 12px; font-weight: 800; color: #fff;">${cfSelectedSkin.name}</div>
                    <div style="font-size: 11px; color: var(--accent-color); font-weight: 700;">$${cfSelectedSkin.price.toFixed(2)}</div>
                  </div>
                  <button id="btn-cf-clear-skin" style="background: none; border: none; color: #ef4444; font-size: 16px; cursor: pointer;">&times;</button>
                </div>
              `;
              document.getElementById('btn-cf-clear-skin')?.addEventListener('click', () => {
                cfSelectedSkin = null;
                renderCoinflipUI();
              });
            }
            renderCoinflipUI();
          });
        });
      }
    }

    // Provably fair hash display
    if (cfPfHash && window.coinflipEngine) {
      cfPfHash.textContent = `Server Seed Hash: ${window.coinflipEngine.serverSeedHash}`;
    }
  }

  // Side Selection
  btnSideT?.addEventListener('click', () => {
    cfSelectedSide = 'T';
    window.SoundManager?.playClick();
    renderCoinflipUI();
  });
  btnSideCT?.addEventListener('click', () => {
    cfSelectedSide = 'CT';
    window.SoundManager?.playClick();
    renderCoinflipUI();
  });

  // Mode Selection
  btnCfModeBalance?.addEventListener('click', () => {
    cfMode = 'balance';
    renderCoinflipUI();
  });
  btnCfModeSkin?.addEventListener('click', () => {
    cfMode = 'skin';
    renderCoinflipUI();
  });

  // Bet quick chips
  document.querySelectorAll('[data-cf-chip]').forEach(btn => {
    btn.addEventListener('click', () => {
      const add = parseFloat(btn.dataset.cfChip);
      const cur = parseFloat(cfBetInput.value) || 0;
      cfBetInput.value = (cur + add).toFixed(2);
      renderCoinflipUI();
    });
  });

  document.querySelectorAll('[data-cf-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.cfAction;
      const cur = parseFloat(cfBetInput.value) || 10;
      const user = window.authManager.currentUser;
      const bal = user ? user.balance : 1000;

      if (act === 'half') {
        cfBetInput.value = Math.max(0.5, Number((cur / 2).toFixed(2)));
      } else if (act === 'double') {
        cfBetInput.value = Math.min(bal, Number((cur * 2).toFixed(2)));
      } else if (act === 'max') {
        cfBetInput.value = Math.max(0.5, Number(bal.toFixed(2)));
      }
      renderCoinflipUI();
    });
  });

  cfBetInput?.addEventListener('input', () => {
    renderCoinflipUI();
  });

  // Execute Coinflip
  let cfCurrentRotations = 0;
  btnFireCoinflip?.addEventListener('click', async () => {
    const user = window.authManager.currentUser;
    if (!user) {
      window.showAuthModal('login');
      return;
    }

    let bet = 10;
    let stakedSkin = null;
    if (cfMode === 'balance') {
      bet = Math.max(0.5, parseFloat(cfBetInput.value) || 10);
    } else {
      if (!cfSelectedSkin) {
        window.notify.warning('Коинфлип', 'Выберите скин для дуэли из инвентаря!');
        return;
      }
      bet = cfSelectedSkin.price;
      stakedSkin = cfSelectedSkin;
    }

    const res = await window.coinflipEngine.playRound({
      betAmount: bet,
      chosenSide: cfSelectedSide,
      stakedSkin
    });

    if (!res.success) {
      window.notify.warning('Коинфлип', res.error);
      return;
    }

    btnFireCoinflip.disabled = true;
    if (cfStatusTitle) cfStatusTitle.textContent = 'Монетка летит в воздухе...';
    if (cfStatusDesc) cfStatusDesc.textContent = 'Кто победит: Terrorist или Counter-Terrorist?';

    // Physical 3D Coin Spin
    window.SoundManager?.playCoinToss();

    // 0deg = T (Front / Gold), 180deg = CT (Back / Silver)
    const baseSpins = 8 * 360;
    const targetDeg = (res.roundData.winningSide === 'T') ? 0 : 180;
    const currentMod = ((cfCurrentRotations % 360) + 360) % 360;
    const neededAngle = (targetDeg - currentMod + 360) % 360;
    cfCurrentRotations += baseSpins + neededAngle;

    if (coin3dElement) {
      coin3dElement.style.transition = `transform ${res.duration / 1000}s cubic-bezier(0.12, 0.8, 0.2, 1)`;
      coin3dElement.style.transform = `rotateY(${cfCurrentRotations}deg)`;
    }

    setTimeout(() => {
      const finalResult = window.coinflipEngine.finalizeRound();
      btnFireCoinflip.disabled = false;
      if (!finalResult) return;
      renderCoinflipUI();
      updateHeaderUserUI(window.authManager.currentUser);

      const sideName = finalResult.winningSide === 'T' ? 'Terrorist (Золото)' : 'Counter-T (Серебро)';

      if (finalResult.isWin) {
        if (cfStatusTitle) {
          cfStatusTitle.textContent = `★ ВЫИГРЫШ: ВЫПАЛ ${finalResult.winningSide}!`;
          cfStatusTitle.style.color = '#ffd700';
        }
        if (cfStatusDesc) {
          cfStatusDesc.textContent = `Поздравляем! Выигрыш $${finalResult.payout.toFixed(2)} (Профит +$${finalResult.profit.toFixed(2)})!`;
        }

        window.SoundManager?.playWin();
        if (window.confettiEffect) window.confettiEffect();
        window.notify.bigWin('🎉 ПОБЕДА В COINFLIP!', `Выпала сторона ${sideName}! Вы выиграли $${finalResult.payout.toFixed(2)}!`);

        addLiveDrop({
          avatar: user.avatar,
          username: user.username,
          item: finalResult.stakedSkin || {
            name: `Coinflip (${finalResult.winningSide}) 1.95x`,
            price: finalResult.payout,
            rarityColor: '#ffd700',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🪙</text></svg>'
          },
          type: 'coinflip',
          multiplier: 1.95
        });
      } else {
        if (cfStatusTitle) {
          cfStatusTitle.textContent = `✕ ПРОИГРЫШ: ВЫПАЛ ${finalResult.winningSide}`;
          cfStatusTitle.style.color = '#ef4444';
        }
        if (cfStatusDesc) {
          cfStatusDesc.textContent = `Победил House Master (${sideName}). Ставка $${finalResult.betAmount.toFixed(2)} сгорела!`;
        }

        document.body.classList.add('screen-shake');
        setTimeout(() => document.body.classList.remove('screen-shake'), 450);
        window.SoundManager?.playDefeat();
        window.notify.error('Поражение в Coinflip', `Выпала сторона ${sideName}. Попробуйте снова!`);
      }

      // Reset staked skin
      cfSelectedSkin = null;
      renderCoinflipUI();
    }, res.duration);
  });

  // =========================================================================
  // CRASH ARENA (MULTIPLIER ROCKET) CONTROLLER
  // =========================================================================
  const crashBetInput = document.getElementById('crash-bet-input');
  const crashAutoInput = document.getElementById('crash-auto-input');
  const btnCrashAction = document.getElementById('btn-crash-action');
  const crashUserBalance = document.getElementById('crash-user-balance');
  const crashPfStatus = document.getElementById('crash-pf-status');
  const crashPfHash = document.getElementById('crash-pf-hash');
  const crashRecentPills = document.getElementById('crash-recent-pills');

  // History of recent crash multipliers
  const recentCrashHistory = [1.45, 2.12, 1.15, 4.80, 1.02, 12.40, 1.88, 3.25];

  function renderCrashRecentPills() {
    if (!crashRecentPills) return;
    crashRecentPills.innerHTML = recentCrashHistory.slice(0, 12).map(m => {
      let tier = 'low';
      if (m >= 10) tier = 'high';
      else if (m >= 2) tier = 'mid';
      return `<div class="crash-history-pill ${tier}">${m.toFixed(2)}x</div>`;
    }).join('');
  }

  function renderCrashUI() {
    const user = window.authManager?.currentUser;
    const bal = user ? user.balance : 0;
    if (crashUserBalance) {
      crashUserBalance.textContent = `Баланс: $${bal.toFixed(2)}`;
    }

    if (window.crashEngine) {
      if (crashPfHash) {
        crashPfHash.textContent = `Server Seed Hash: ${window.crashEngine.serverSeedHash || 'Сгенерирован'}`;
      }
      if (crashPfStatus) {
        crashPfStatus.textContent = window.crashEngine.gameState === 'flying' ? 'Раунд идет' : 'Хэш готов';
      }

      if (btnCrashAction) {
        if (window.crashEngine.gameState === 'flying') {
          btnCrashAction.classList.remove('btn-start');
          btnCrashAction.classList.add('btn-cashout');
          const payout = (window.crashEngine.betAmount * window.crashEngine.currentMultiplier).toFixed(2);
          btnCrashAction.innerHTML = `<span>💰 ЗАБРАТЬ</span> <span>$${payout} (${window.crashEngine.currentMultiplier.toFixed(2)}x)</span>`;
          btnCrashAction.disabled = window.crashEngine.hasCashedOut;
        } else {
          btnCrashAction.classList.remove('btn-cashout');
          btnCrashAction.classList.add('btn-start');
          const bet = parseFloat(crashBetInput?.value) || 10;
          btnCrashAction.innerHTML = `<span>🚀 ЗАПУСТИТЬ РАКЕТУ</span> <span>($${bet.toFixed(2)})</span>`;
          btnCrashAction.disabled = false;
        }
      }
    }
    renderCrashRecentPills();
  }

  // Quick Bet chips
  document.querySelectorAll('[data-crash-chip]').forEach(btn => {
    btn.addEventListener('click', () => {
      const add = parseFloat(btn.dataset.crashChip);
      const cur = parseFloat(crashBetInput.value) || 0;
      crashBetInput.value = (cur + add).toFixed(2);
      renderCrashUI();
    });
  });

  document.querySelectorAll('[data-crash-action]').forEach(btn => {
    btn.addEventListener('click', () => {
      const act = btn.dataset.crashAction;
      const cur = parseFloat(crashBetInput.value) || 10;
      const user = window.authManager?.currentUser;
      const bal = user ? user.balance : 1000;

      if (act === 'half') {
        crashBetInput.value = Math.max(0.5, Number((cur / 2).toFixed(2)));
      } else if (act === 'double') {
        crashBetInput.value = Math.min(bal, Number((cur * 2).toFixed(2)));
      } else if (act === 'max') {
        crashBetInput.value = Math.max(0.5, Number(bal.toFixed(2)));
      }
      renderCrashUI();
    });
  });

  // Auto cashout pills
  document.querySelectorAll('[data-crash-auto]').forEach(btn => {
    btn.addEventListener('click', () => {
      const val = parseFloat(btn.dataset.crashAuto);
      if (val === 0) {
        crashAutoInput.value = '';
      } else {
        crashAutoInput.value = val.toFixed(2);
      }
      document.querySelectorAll('[data-crash-auto]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  crashBetInput?.addEventListener('input', () => {
    renderCrashUI();
  });

  // Init crash engine canvas and callbacks
  if (window.crashEngine) {
    window.crashEngine.initCanvas('crash-canvas');

    window.crashEngine.onTick = (mult) => {
      if (window.crashEngine.gameState === 'flying' && !window.crashEngine.hasCashedOut && btnCrashAction) {
        const payout = (window.crashEngine.betAmount * mult).toFixed(2);
        btnCrashAction.innerHTML = `<span>💰 ЗАБРАТЬ</span> <span>$${payout} (${mult.toFixed(2)}x)</span>`;
      }
    };

    window.crashEngine.onCashout = ({ multiplier, payout, profit }) => {
      window.notify.bigWin('🚀 УСПЕШНЫЙ КЭШАУТ!', `Вы вовремя катапультировались на ${multiplier.toFixed(2)}x и забрали $${payout.toFixed(2)} (+${profit.toFixed(2)})!`);
      if (window.confettiEffect) window.confettiEffect();
      const user = window.authManager?.currentUser;
      if (user) {
        addLiveDrop({
          avatar: user.avatar,
          username: user.username,
          item: {
            name: `Crash ${multiplier.toFixed(2)}x`,
            price: payout,
            rarityColor: multiplier >= 5 ? '#ffd700' : '#10b981',
            image: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">🚀</text></svg>'
          },
          type: 'crash',
          multiplier: multiplier
        });
        updateHeaderUserUI(user);
      }
      renderCrashUI();
    };

    window.crashEngine.onCrash = ({ crashPoint }) => {
      document.body.classList.add('screen-shake');
      setTimeout(() => document.body.classList.remove('screen-shake'), 450);
      window.notify.error('💥 КРАШ!', `Ракета взорвалась на отметке ${crashPoint.toFixed(2)}x!`);
      recentCrashHistory.unshift(crashPoint);
      if (recentCrashHistory.length > 20) recentCrashHistory.pop();
      renderCrashUI();
      const user = window.authManager?.currentUser;
      if (user) updateHeaderUserUI(user);
    };
  }

  // Crash Action Button (Launch or Cashout)
  btnCrashAction?.addEventListener('click', async () => {
    const user = window.authManager?.currentUser;
    if (!user) {
      window.showAuthModal('login');
      return;
    }

    if (!window.crashEngine) return;

    if (window.crashEngine.gameState === 'idle' || window.crashEngine.gameState === 'crashed') {
      const bet = Math.max(0.5, parseFloat(crashBetInput.value) || 10);
      const autoMult = parseFloat(crashAutoInput.value) || 0;

      const res = await window.crashEngine.startCountdown({ betAmount: bet, autoCashoutMult: autoMult });
      if (!res.success) {
        window.notify.warning('Краш', res.error);
        return;
      }
      window.SoundManager?.playClick();
      updateHeaderUserUI(user);
      renderCrashUI();
    } else if (window.crashEngine.gameState === 'flying') {
      window.crashEngine.cashOut();
    }
  });

  // Global haptic & click sound for buttons, tabs, and chips
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .mobile-bottom-tab, .mobile-subnav-btn, .game-pill-btn, .bet-chip, .theme-card-option, .arrow-choice-btn, .arena-choice-btn');
    if (btn) {
      window.SoundManager?.playClick();
    }
  }, { passive: true });

  // =========================================================================
  // DEVICE CLOUD SYNC & CROSS-DEVICE ACCOUNT LINKING
  // =========================================================================
  const modalDeviceSync = document.getElementById('modal-device-sync');
  const btnOpenSyncModal = document.getElementById('btn-open-sync-modal');
  const deviceSyncModalClose = document.getElementById('device-sync-modal-close');
  const tabSyncExportBtn = document.getElementById('tab-sync-export-btn');
  const tabSyncImportBtn = document.getElementById('tab-sync-import-btn');
  const panelSyncExport = document.getElementById('panel-sync-export');
  const panelSyncImport = document.getElementById('panel-sync-import');
  const syncQrCanvas = document.getElementById('sync-qr-canvas');
  const syncQrImage = document.getElementById('sync-qr-image');
  const syncQrContainer = document.getElementById('sync-qr-container');
  const syncExportKeyInput = document.getElementById('sync-export-key-input');
  const btnCopySyncKey = document.getElementById('btn-copy-sync-key');
  const syncImportKeyInput = document.getElementById('sync-import-key-input');
  const btnApplySyncImport = document.getElementById('btn-apply-sync-import');

  function updateSyncExportDisplay() {
    if (!window.authManager) return;
    const user = window.authManager.currentUser;
    const container = document.getElementById('sync-qr-container');
    const keyInput = document.getElementById('sync-export-key-input');

    if (!user) {
      if (keyInput) keyInput.value = 'Сначала войдите в профиль';
      if (container) {
        container.innerHTML = '<div style="padding: 30px 10px; text-align: center; color: #ef4444; font-weight: 700; font-size: 13px;">🔒 Войдите в профиль,<br>чтобы получить QR-код синхронизации!</div>';
      }
      return;
    }

    const token = window.authManager.exportSyncData();
    if (!token) return;
    if (keyInput) keyInput.value = token;

    // Construct QR code URL with direct sync link
    let baseUrl = window.location.origin + window.location.pathname;
    if (!baseUrl || baseUrl === 'null' || window.location.protocol === 'file:') {
      baseUrl = 'https://simup.app/';
    }
    const syncUrl = `${baseUrl}#sync=${token}`;

    if (container) {
      container.innerHTML = `<canvas id="sync-qr-canvas" width="180" height="180" style="display: block; width: 180px; height: 180px; border-radius: 8px;"></canvas>`;
      const canvas = document.getElementById('sync-qr-canvas');
      try {
        if (window.QRCode && canvas) {
          window.QRCode.toCanvas(canvas, syncUrl, {
            size: 180,
            margin: 2,
            colorDark: '#0b1120',
            colorLight: '#ffffff'
          });
        } else if (window.QRCode) {
          container.innerHTML = window.QRCode.toSVG(syncUrl, {
            size: 180,
            margin: 2,
            colorDark: '#0b1120',
            colorLight: '#ffffff'
          });
        }
      } catch (err) {
        console.warn('QRCode local rendering fallback to SVG/IMG:', err);
        try {
          if (window.QRCode) {
            container.innerHTML = window.QRCode.toSVG(syncUrl, { size: 180, margin: 2, colorDark: '#0b1120', colorLight: '#ffffff' });
          } else {
            container.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(syncUrl)}" alt="QR Code" style="width: 180px; height: 180px; border-radius: 8px;">`;
          }
        } catch (e2) {
          container.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(syncUrl)}" alt="QR Code" style="width: 180px; height: 180px; border-radius: 8px;" onerror="this.outerHTML='<div style=\\'padding: 30px 10px; font-size: 12px; color: var(--text-dim); text-align: center;\\'>Используйте код синхронизации ниже</div>'">`;
        }
      }
    }
  }

  btnOpenSyncModal?.addEventListener('click', () => {
    updateSyncExportDisplay();
    if (modalDeviceSync) modalDeviceSync.classList.add('active');
  });

  deviceSyncModalClose?.addEventListener('click', () => {
    if (modalDeviceSync) modalDeviceSync.classList.remove('active');
  });

  tabSyncExportBtn?.addEventListener('click', () => {
    tabSyncExportBtn.classList.add('active');
    tabSyncImportBtn?.classList.remove('active');
    if (panelSyncExport) panelSyncExport.style.display = 'block';
    if (panelSyncImport) panelSyncImport.style.display = 'none';
    updateSyncExportDisplay();
  });

  tabSyncImportBtn?.addEventListener('click', () => {
    tabSyncImportBtn.classList.add('active');
    tabSyncExportBtn?.classList.remove('active');
    if (panelSyncExport) panelSyncExport.style.display = 'none';
    if (panelSyncImport) panelSyncImport.style.display = 'block';
  });

  btnCopySyncKey?.addEventListener('click', async () => {
    if (!syncExportKeyInput || !syncExportKeyInput.value) return;
    try {
      await navigator.clipboard.writeText(syncExportKeyInput.value);
      btnCopySyncKey.textContent = '✓ Скопировано!';
      setTimeout(() => { btnCopySyncKey.textContent = '📋 Копировать'; }, 2000);
      window.notify?.success('Ключ скопирован', 'Отправьте этот ключ себе на телефон и вставьте во вкладке «Ввести код»!');
    } catch (e) {
      syncExportKeyInput.select();
      document.execCommand('copy');
      window.notify?.info('Ключ выделен', 'Нажмите Ctrl+C для копирования.');
    }
  });

  btnApplySyncImport?.addEventListener('click', () => {
    const val = (syncImportKeyInput?.value || '').trim();
    if (!val) {
      window.notify?.warning('Введите ключ', 'Вставьте ключ синхронизации в текстовое поле.');
      return;
    }
    const res = window.authManager.importSyncData(val);
    if (res.success) {
      modalDeviceSync?.classList.remove('active');
      window.notify?.success('Синхронизация успешна!', `Добро пожаловать, ${res.user.username}! Все данные перенесены.`);
      updateHeaderUserUI(res.user);
      updateUpgraderUI();
    } else {
      window.notify?.error('Ошибка переноса', res.error || 'Не удалось распознать ключ синхронизации.');
    }
  });

  // Auto-import sync hash on URL startup (e.g. from QR scan)
  try {
    if (window.location.hash && window.location.hash.includes('#sync=')) {
      const token = window.location.hash.split('#sync=')[1];
      if (token && window.authManager) {
        const res = window.authManager.importSyncData(token);
        if (res.success) {
          window.notify?.success('Устройство привязано!', `Аккаунт ${res.user.username} успешно синхронизирован!`);
        }
        history.replaceState(null, null, window.location.pathname + window.location.search);
      }
    }
  } catch (e) {
    console.warn('Sync hash check error:', e);
  }

  // Initial draw
  updateUpgraderUI();
  renderCasesGrid();
  renderLeaderboard('profit');
  renderContractsDesk();
  renderMinesBoard();
  renderCoinflipUI();
  renderCrashUI();
  updateQuestsBadge();

  // Refresh pages on tab switch
  const originalSwitchTab = switchTab;
  switchTab = function(tabId) {
    originalSwitchTab(tabId);

    // Scroll main window to top smoothly on tab switch so new tab opens at the top
    try { window.scrollTo({ top: 0, behavior: 'instant' }); } catch(e) {}

    // Safely center active tab in horizontal scrollers without scrolling the window
    function centerItemInScroller(scrollerEl, targetItem) {
      if (!scrollerEl || !targetItem) return;
      try {
        const scrollerRect = scrollerEl.getBoundingClientRect();
        const itemRect = targetItem.getBoundingClientRect();
        const scrollDelta = (itemRect.left - scrollerRect.left) - (scrollerRect.width / 2) + (itemRect.width / 2);
        scrollerEl.scrollBy({ left: scrollDelta, behavior: 'smooth' });
      } catch (e) {}
    }

    const activeBottomTab = document.querySelector(`.mobile-bottom-tab[data-tab="${tabId}"]`);
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    if (activeBottomTab && bottomNav) {
      centerItemInScroller(bottomNav, activeBottomTab);
    }
    const activeSubnavBtn = document.querySelector(`.mobile-subnav-btn[data-tab="${tabId}"]`);
    const subnavScroller = document.querySelector('.mobile-subnav-scroller, .mobile-subnav-track');
    if (activeSubnavBtn && subnavScroller) {
      centerItemInScroller(subnavScroller, activeSubnavBtn);
    }

    try {
      if (tabId === 'bank') {
        renderBankPage();
      } else if (tabId === 'catalog') {
        window.CatalogController?.renderGrid();
        window.CatalogCart?.updateUI();
      } else if (tabId === 'upgrader') {
        updateUpgraderUI();
      } else if (tabId === 'inventory') {
        renderInventoryPage();
      } else if (tabId === 'cases') {
        renderCasesGrid();
      } else if (tabId === 'contracts') {
        renderContractsDesk();
      } else if (tabId === 'mines') {
        renderMinesBoard();
      } else if (tabId === 'coinflip') {
        renderCoinflipUI();
      } else if (tabId === 'crash') {
        renderCrashUI();
        requestAnimationFrame(() => {
          window.crashEngine?.resizeCanvas();
        });
        setTimeout(() => {
          window.crashEngine?.resizeCanvas();
        }, 60);
      } else if (tabId === 'casebattle') {
        window.caseBattleEngine?.renderLobby();
      } else if (tabId === 'pass') {
        window.simupPassManager?.render();
      } else if (tabId === 'admin') {
        window.adminPanel?.render();
      } else if (tabId === 'leaderboard') {
        renderLeaderboard();
      } else if (tabId === 'profile') {
        renderProfilePage();
      }
    } catch (err) {
      console.error('Error rendering tab', tabId, err);
    }
  };
  window.switchTab = switchTab;
  window.updateUpgraderUI = updateUpgraderUI;
  window.renderInventoryPage = renderInventoryPage;
  window.updateHeaderUserUI = updateHeaderUserUI;

  function buySkin(skinOrId) {
    const skin = typeof skinOrId === 'string'
      ? ((window.SKINS_DATABASE || []).find(s => s.id === skinOrId) || (window.catalogController?.skins || []).find(s => s.id === skinOrId))
      : skinOrId;
    if (!skin) return false;
    if (window.catalogCart && typeof window.catalogCart.buyDirect === 'function') {
      return window.catalogCart.buyDirect(skin);
    }
    const user = window.authManager?.currentUser;
    if (!user) {
      window.notify?.warning('Вход в аккаунт', 'Пожалуйста, войдите в профиль для совершения покупок!');
      if (typeof window.showAuthModal === 'function') window.showAuthModal('login');
      return false;
    }
    const price = (typeof window.marketEconomy?.getPrice === 'function' ? window.marketEconomy.getPrice(skin.id) : null) || skin.price || 0;
    if ((user.balance || 0) < price) {
      const diff = (price - (user.balance || 0)).toFixed(2);
      window.notify?.warning('Недостаточно средств', `Вам не хватает $${diff} на балансе. Пополните баланс в Банке!`);
      if (typeof switchTab === 'function') switchTab('bank');
      return false;
    }
    user.balance = parseFloat((user.balance - price).toFixed(2));
    if (!user.inventory) user.inventory = [];
    const invItem = {
      instanceId: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      id: skin.id,
      skinId: skin.id,
      name: skin.name,
      game: skin.game || 'cs2',
      category: skin.category || 'rifle',
      rarity: skin.rarity || 'Mil-Spec',
      rarityColor: skin.rarityColor || '#4b69ff',
      image: skin.image || skin.fallbackSvg,
      wear: skin.wear || 'FN',
      price: price,
      obtainedAt: new Date().toISOString(),
      source: 'Каталог (Купить)'
    };
    user.inventory.unshift(invItem);
    window.authManager.saveCurrentUser();
    window.SoundManager?.playSuccess?.();
    window.notify?.success('Покупка успешна! 🎉', `Скин «${skin.name}» за $${price.toFixed(2)} добавлен в ваш инвентарь!`);
    updateHeaderUserUI(user);
    updateUpgraderUI();
    renderInventoryPage();
    if (window.catalogController) window.catalogController.render();
    return true;
  }
  window.buySkin = buySkin;

  // Responsive dynamic re-scaler for PC & Smartphones
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (window.crashEngine && typeof window.crashEngine.resizeCanvas === 'function') {
        window.crashEngine.resizeCanvas();
      }
      if (typeof updateUpgraderUI === 'function') {
        try { updateUpgraderUI(); } catch (e) {}
      }
    }, 100);
  }, { passive: true });

  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      if (window.crashEngine && typeof window.crashEngine.resizeCanvas === 'function') {
        window.crashEngine.resizeCanvas();
      }
      if (typeof updateUpgraderUI === 'function') {
        try { updateUpgraderUI(); } catch (e) {}
      }
    }, 200);
  }, { passive: true });
}

// Universal Ready State Dispatcher
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initMainApp);
} else {
  initMainApp();
}



