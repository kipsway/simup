/* ==========================================================================
   SIMUP - MAIN APPLICATION CONTROLLER (BLOCK 1 FOUNDATION)
   Coordinates navigation, authentication flows, theme management and catalog.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
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

  const savedTheme = localStorage.getItem('simup_theme') || 'emerald';
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
  // NAVIGATION ROUTING (DESKTOP & MOBILE BOTTOM BAR)
  // =========================================================================
  document.querySelectorAll('.nav-tab-btn, .mobile-subnav-btn, .mobile-bottom-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.dataset.tab;
      if (targetTab) switchTab(targetTab);
    });
  });

  brandLogoBtn?.addEventListener('click', () => {
    switchTab('upgrader');
  });

  function switchTab(tabId) {
    document.querySelectorAll('.nav-tab-btn, .mobile-subnav-btn, .mobile-bottom-tab').forEach(b => {
      b.classList.toggle('active', b.dataset.tab === tabId);
    });
    tabContents.forEach(c => c.classList.toggle('active', c.id === `tab-${tabId}`));

    if (tabId === 'profile') {
      renderProfilePage();
    } else if (tabId === 'leaderboard') {
      if (typeof renderLeaderboard === 'function') renderLeaderboard();
    }
  }

  // =========================================================================
  // AUTHENTICATION MODAL (BLOCK 1: RELIABLE LOGIN & NO AVATARS)
  // =========================================================================
  const authToggleHint = document.getElementById('auth-toggle-hint');
  const authLinkSwitch = document.getElementById('auth-link-switch');

  function openAuthModal(mode = 'register') {
    setAuthMode(mode);
    modalAuth.classList.add('active');
  }

  window.showAuthModal = openAuthModal;

  function closeAuthModal() {
    modalAuth?.classList.remove('active');
  }

  authModalClose?.addEventListener('click', closeAuthModal);

  function setAuthMode(mode) {
    currentAuthMode = mode;
    if (mode === 'register') {
      authModeRegisterBtn?.classList.add('active');
      authModeLoginBtn?.classList.remove('active');
      if (authModalTitle) authModalTitle.textContent = 'Регистрация в SIMUP';
      if (authModalSubtitle) authModalSubtitle.innerHTML = 'Создайте профиль со стартовым балансом <strong>$500.00</strong> и скином!';
      if (authSubmitBtn) authSubmitBtn.textContent = 'Создать аккаунт (+ $500.00)';
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
        authToggleHint.innerHTML = 'Впервые на сайте? <a href="#" id="auth-link-switch" style="color: var(--accent-color); font-weight: 700; text-decoration: none;">Зарегистрироваться (+ $500)</a>';
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
      if (res.success) {
        modalAuth.classList.remove('active');
        authForm.reset();
        window.notify.bigWin('Добро пожаловать!', `Аккаунт ${res.user.username} создан! Стартовый бонус $500.00 и скин зачислены.`);
      } else {
        window.notify.error('Ошибка регистрации', res.error);
      }
    } else {
      const res = await window.authManager.login(username, password);
      if (res.success) {
        modalAuth.classList.remove('active');
        authForm.reset();
        window.notify.success('С возвращением!', `Вы успешно вошли как ${res.user.username}.`);
      } else {
        window.notify.error('Ошибка входа', res.error);
      }
    }
  });

  // =========================================================================
  // USER STATE LISTENER
  // =========================================================================
  window.authManager.onUserChange((user) => {
    updateHeaderUserUI(user);
    if (user && profileContainer) {
      renderProfilePage();
    }
    // Re-render inventory drawer & arena
    try {
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
      const level = Math.max(1, Math.floor(totalWagered / 250) + 1);

      headerBalanceEl.textContent = `$${user.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
      userHeaderContainer.innerHTML = `
        <div class="user-profile-btn" id="header-user-btn" title="Профиль ${user.username}">
          <span class="user-name-label">${user.username}</span>
          <span class="user-level-pill">LVL ${level}</span>
        </div>
      `;
      document.getElementById('header-user-btn')?.addEventListener('click', () => {
        switchTab('profile');
      });
    } else {
      headerBalanceEl.textContent = '$0.00';
      userHeaderContainer.innerHTML = `
        <button class="btn-login-trigger" id="btn-header-login">Вход / Регистрация</button>
      `;
      document.getElementById('btn-header-login')?.addEventListener('click', () => {
        openAuthModal('login');
      });
    }
  }

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
  document.getElementById('btn-quick-deposit')?.addEventListener('click', () => {
    switchTab('bank');
  });

  loanChips.forEach(btn => {
    btn.addEventListener('click', () => {
      const chipVal = btn.dataset.loanChip;
      const user = window.authManager.currentUser;
      if (chipVal === 'max') {
        const maxLimit = window.economyManager.getMaxLoanLimit(user);
        const debt = user?.loans?.currentDebt || 0;
        const available = Math.max(50, Math.floor(maxLimit - debt));
        loanInputAmount.value = available;
      } else {
        loanInputAmount.value = chipVal;
      }
    });
  });

  btnTakeLoan?.addEventListener('click', () => {
    const val = parseFloat(loanInputAmount.value);
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
      loanMaxLimitEl.textContent = `$${maxLimit.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
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
    const level = Math.max(1, Math.floor(totalWagered / 250) + 1);
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
                <span class="user-level-pill">LVL ${level}</span>
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
                  <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="skin-img" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${item.name.replace(/'/g, '')}', '${item.rarity}', '${item.category}', '${item.game}');">
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

    document.getElementById('btn-logout')?.addEventListener('click', () => {
      window.authManager.logout();
      window.notify.info('Выход', 'Вы вышли из своего профиля.');
      switchTab('upgrader');
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



  // Set default initial target skin
  const allSkins = window.catalogController?.skins || [];
  if (allSkins.length > 0) {
    // Choose a popular skin like AK-47 Printstream or Redline
    const defaultTarget = allSkins.find(s => s.nameEn && s.nameEn.includes('Printstream')) || allSkins[0];
    window.upgraderEngine.setTargetSkin(defaultTarget);
  }

  // Draw wheel on canvas
  function drawWheel(chance, direction, currentRoll = null) {
    if (!wheelCanvas) return;
    const ctx = wheelCanvas.getContext('2d');
    if (!ctx) return;
    const w = wheelCanvas.width;
    const h = wheelCanvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = 120;
    const thickness = 16;

    ctx.clearRect(0, 0, w, h);

    // 1. Draw base dark circular track
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.lineWidth = thickness;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.stroke();

    // 2. Draw 100 subtle tick marks around circumference
    for (let i = 0; i < 100; i++) {
      const angle = (i / 100) * Math.PI * 2 - Math.PI / 2;
      const isMajor = i % 10 === 0;
      const tickInner = radius - (isMajor ? 12 : 7);
      const tickOuter = radius + (isMajor ? 12 : 7);

      const x1 = cx + Math.cos(angle) * tickInner;
      const y1 = cy + Math.sin(angle) * tickInner;
      const x2 = cx + Math.cos(angle) * tickOuter;
      const y2 = cy + Math.sin(angle) * tickOuter;

      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.lineWidth = isMajor ? 2 : 1;
      ctx.strokeStyle = isMajor ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.08)';
      ctx.stroke();
    }

    if (chance <= 0) return;

    // 3. Draw winning glowing sector
    const sectorRad = (chance / 100) * (Math.PI * 2);
    let startAngle = -Math.PI / 2;
    let endAngle = startAngle + sectorRad;

    if (direction === 'over') {
      startAngle = -Math.PI / 2;
      endAngle = startAngle - sectorRad;
    }

    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius, startAngle, endAngle, direction === 'over');
    ctx.lineWidth = thickness + 4;
    ctx.lineCap = 'round';

    // Accent glow color
    const computedAccent = getComputedStyle(document.body).getPropertyValue('--accent-color').trim() || '#00ff88';
    ctx.strokeStyle = computedAccent;
    ctx.shadowColor = computedAccent;
    ctx.shadowBlur = 18;
    ctx.stroke();
    ctx.restore();
  }

  function updateUpgraderUI() {
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
    if (btnUpgradePriceTag) {
      btnUpgradePriceTag.textContent = totalBet > 0 ? `($${totalBet.toFixed(2)})` : '(Выберите скин)';
    }
    if (btnFireUpgrade) {
      btnFireUpgrade.disabled = (selectedCount === 0 || !target || window.upgraderEngine.isSpinning);
    }

    if (wheelChanceVal) wheelChanceVal.textContent = `${chance.toFixed(2)}%`;
    if (wheelMultVal) wheelMultVal.textContent = multiplier > 0 ? `${multiplier.toFixed(2)}x` : '0.00x';

    // Target skin showcase
    if (target) {
      if (targetSkinImg) {
        targetSkinImg.src = target.image || target.fallbackSvg || '';
        targetSkinImg.alt = target.name;
        targetSkinImg.onerror = function() {
          this.onerror = null;
          if (window.generateSkinSvg) {
            this.src = window.generateSkinSvg(target.name, target.rarity, target.category, target.game);
          }
        };
      }
      if (targetSkinName) {
        targetSkinName.textContent = `${target.name} ${target.wear && target.wear !== 'STANDARD' ? `(${target.wear})` : ''}`;
      }
      if (targetSkinPrice) targetSkinPrice.textContent = `$${target.price.toFixed(2)}`;
      if (targetGlowBack) targetGlowBack.style.setProperty('--target-clr', target.rarityColor || '#00ff88');

      if (targetWinPayoutVal) {
        const profit = Math.max(0, target.price - totalBet);
        targetWinPayoutVal.textContent = totalBet > 0 ? `+$${profit.toFixed(2)} профит` : `+$${target.price.toFixed(2)}`;
      }
    }

    // Direction pills
    if (btnDirUnder) btnDirUnder.classList.toggle('active', window.upgraderEngine.direction === 'under');
    if (btnDirOver) btnDirOver.classList.toggle('active', window.upgraderEngine.direction === 'over');

    // Draw Wheel
    drawWheel(chance, window.upgraderEngine.direction);

    // Render drawer
    renderInventoryDrawer();
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
        document.querySelector('.catalog-section')?.scrollIntoView({ behavior: 'smooth' });
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
          <input type="checkbox" ${isSel ? 'checked' : ''} style="accent-color: var(--accent-color); pointer-events: none; margin-right: 6px;">
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="drawer-item-img" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${item.name.replace(/'/g, '')}', '${item.rarity}', '${item.category}', '${item.game}');">
          <div style="flex: 1; min-width: 0; margin: 0 8px;">
            <div class="drawer-item-name" title="${item.name}">${item.name}</div>
            <div style="font-size: 9.5px; color: var(--text-dim);">${item.wear && item.wear !== 'STANDARD' ? item.wear : (item.game || 'CS2').toUpperCase()}</div>
          </div>
          <span class="drawer-item-price">$${item.price.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    arenaInventoryDrawer.querySelectorAll('[data-drawer-id]').forEach(row => {
      row.addEventListener('click', () => {
        const id = row.dataset.drawerId;
        const item = user.inventory.find(it => it.instanceId === id);
        if (item) {
          window.upgraderEngine.toggleItemSelection(item);
          updateUpgraderUI();
        }
      });
    });
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
    document.querySelector('.catalog-section')?.scrollIntoView({ behavior: 'smooth' });
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

  // Direction toggle
  btnDirUnder?.addEventListener('click', () => {
    window.upgraderEngine.setDirection('under');
    updateUpgraderUI();
  });

  btnDirOver?.addEventListener('click', () => {
    window.upgraderEngine.setDirection('over');
    updateUpgraderUI();
  });

  // Quick multipliers
  document.querySelectorAll('[data-quick-mult]').forEach(btn => {
    btn.addEventListener('click', () => {
      const mult = parseFloat(btn.dataset.quickMult);
      const matched = window.upgraderEngine.setQuickMultiplier(mult);
      if (matched) {
        updateUpgraderUI();
        window.notify.info(`Множитель ${mult}x`, `Подобран скин: ${matched.name} ($${matched.price.toFixed(2)})`);
      } else {
        window.notify.warning('Множитель', 'Выберите скины из инвентаря для ставки, чтобы рассчитать множитель.');
      }
    });
  });

  // Target skin browse button
  btnBrowseCatalogTarget.addEventListener('click', () => {
    document.querySelector('.catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  });

  // Selection from catalog overrides target skin
  window.catalogController.onSelectTargetCallback = (skin) => {
    window.upgraderEngine.setTargetSkin(skin);
    updateUpgraderUI();
    window.notify.info('Целевой скин выбран', `${skin.name} ($${skin.price.toFixed(2)}) готов к апгрейду!`);
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
        // Reset needle to top
        wheelNeedle.style.transition = 'none';
        wheelNeedle.style.transform = 'rotate(0deg)';
      },
      onTick: (normDeg, totalDeg) => {
        wheelNeedle.style.transform = `rotate(${totalDeg}deg)`;
        const curRoll = ((normDeg / 360) * 100).toFixed(2);
        wheelChanceVal.textContent = curRoll;
      },
      onComplete: ({ isWin, roll, targetSkin }) => {
        btnFireUpgrade.disabled = false;
        wheelCenterStatus.textContent = isWin ? '★ ПОБЕДА!' : '✕ МИМО';
        wheelCenterStatus.style.color = isWin ? 'var(--accent-color)' : '#ef4444';
        wheelChanceVal.textContent = `${roll.toFixed(2)}`;

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

  let currentSelectedCase = null;
  let lastDroppedItem = null;

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
            ${c.icon || '📦'}
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
    modalCaseIcon.textContent = caseData.icon;
    modalCaseName.textContent = caseData.name;
    modalCaseDesc.textContent = caseData.description;
    modalCasePrice.textContent = `$${caseData.price.toFixed(2)}`;
    btnSpinCasePrice.textContent = `($${caseData.price.toFixed(2)})`;

    // Reset reel position
    caseReelTrack.style.transition = 'none';
    caseReelTrack.style.transform = 'translateX(0px)';

    // Pre-populate dummy reel preview with case items
    const items = window.casesManager.getResolvedCaseItems(caseData);
    modalCaseItemsCount.textContent = `${items.length} предметов`;

    caseReelTrack.innerHTML = items.slice(0, 8).map(item => `
      <div class="reel-item-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor};">
        <span class="reel-item-wear">${item.wear && item.wear !== 'STANDARD' ? item.wear : ''}</span>
        <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="reel-item-img" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${item.name.replace(/'/g, '')}', '${item.rarity}', '${item.category}', '${item.game}');">
        <div class="reel-item-name">${item.name}</div>
        <div class="reel-item-price">$${item.price.toFixed(2)}</div>
      </div>
    `).join('');

    // Populate drops preview grid with exact percent chances
    modalCaseDropsPreview.innerHTML = items.map(item => `
      <div class="case-drop-preview-card skin-rarity-${item.rarity}" style="--rarity-clr: ${item.rarityColor};">
        <span class="case-drop-chance-pill">${item.percent}%</span>
        <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="drop-preview-img" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${item.name.replace(/'/g, '')}', '${item.rarity}', '${item.category}', '${item.game}');">
        <div class="drop-preview-name">${item.name}</div>
        <div class="drop-preview-price">$${item.price.toFixed(2)}</div>
      </div>
    `).join('');

    btnSpinCase.disabled = false;
    modalCaseOpen.classList.add('active');
  }

  caseOpenModalClose.addEventListener('click', () => {
    if (window.casesManager.isSpinning) return;
    modalCaseOpen.classList.remove('active');
  });

  // Execute Case Spin
  btnSpinCase.addEventListener('click', () => {
    if (!currentSelectedCase || window.casesManager.isSpinning) return;
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
              <img src="${p.bestWinSkin.image}" alt="" style="width: 32px; height: 22px; object-fit: contain;">
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
                      ${isCurrent ? '<span class="you-badge">★ ВЫ</span>' : ''}
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
                    ${isCurrent ? '<span class="you-badge">★ ВЫ</span>' : ''}
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
              <td>
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
      <img src="${item.image || item.fallbackSvg}" alt="" class="live-drop-img" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${(item.name || 'Skin').replace(/'/g, '')}', '${item.rarity || 'milspec'}', '${item.category || 'weapon'}', '${item.game || 'cs2'}');">
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
  // TURBO MODE CONTROLLER
  // =========================================================================
  const btnToggleTurbo = document.getElementById('btn-toggle-turbo');
  btnToggleTurbo?.addEventListener('click', () => {
    window.SoundManager?.playClick();
    window.upgraderEngine.isTurbo = !window.upgraderEngine.isTurbo;
    btnToggleTurbo.classList.toggle('active', window.upgraderEngine.isTurbo);
    if (window.upgraderEngine.isTurbo) {
      window.notify.info('⚡ Турбо режим включен', 'Спин колеса теперь длится всего 1.2 секунды!');
    } else {
      window.notify.info('Турбо режим отключен', 'Стандартная длительность вращения (4.6 сек).');
    }
  });

  // =========================================================================
  // GLOBAL HOTKEYS & TACTILE AUDIO FEEDBACK
  // =========================================================================
  document.addEventListener('keydown', (e) => {
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

    if (e.code === 'Escape') {
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
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
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="contract-slot-img" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${item.name.replace(/'/g, '')}', '${item.rarity}', '${item.category}', '${item.game}');">
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
          <img src="${item.image || item.fallbackSvg}" alt="${item.name}" class="skin-img" style="max-height: 55px;" onerror="this.onerror=null; if(window.generateSkinSvg) this.src=window.generateSkinSvg('${item.name.replace(/'/g, '')}', '${item.rarity}', '${item.category}', '${item.game}');">
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
    if (!questsBadge || !window.questsManager) return;
    const count = window.questsManager.getUnclaimedCount();
    if (count > 0) {
      questsBadge.style.display = 'block';
      questsBadge.textContent = count;
    } else {
      questsBadge.style.display = 'none';
    }
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

  btnOpenQuests?.addEventListener('click', () => {
    if (!window.authManager.currentUser) {
      window.showAuthModal('login');
      return;
    }
    renderQuestsModal();
    modalQuests?.classList.add('active');
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

    // 0deg = T, 180deg = CT
    // Add 8 to 10 full 360-degree rotations
    const baseSpins = 8 * 360;
    const targetDeg = (res.roundData.winningSide === 'T') ? 0 : 180;
    cfCurrentRotations += baseSpins + targetDeg + (360 - (cfCurrentRotations % 360));
    if (res.roundData.winningSide === 'CT') {
      cfCurrentRotations += 180;
    }

    if (coin3dElement) {
      coin3dElement.style.transition = `transform ${res.duration / 1000}s cubic-bezier(0.12, 0.8, 0.2, 1)`;
      coin3dElement.style.transform = `rotateY(${cfCurrentRotations}deg)`;
    }

    setTimeout(() => {
      const finalResult = window.coinflipEngine.finalizeRound();
      btnFireCoinflip.disabled = false;
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
    const btn = e.target.closest('button, .mobile-bottom-tab, .game-pill-btn, .bet-chip, .theme-card-option, .arrow-choice-btn, .arena-choice-btn');
    if (btn) {
      window.SoundManager?.playClick();
    }
  }, { passive: true });

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
    if (tabId === 'bank') {
      renderBankPage();
    } else if (tabId === 'upgrader') {
      updateUpgraderUI();
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
      window.crashEngine?.resizeCanvas();
    } else if (tabId === 'leaderboard') {
      renderLeaderboard();
    } else if (tabId === 'profile') {
      renderProfilePage();
    }
  };
});



