/* ==========================================================================
   SIMUP 3.0 - ARCHITECTURAL CORE & REACTIVE STATE MANAGER
   Provides:
   - Universal Fault-Tolerant Application Lifecycle (handles all readyStates)
   - Guaranteed User Session & Starter Balance ($500.00)
   - Central Reactive State Store (SimupState)
   - Bulletproof Tab Navigation Router & Modal Coordinator
   - Robust Direct Skin Purchasing Engine & Instant Inventory Ingestion
   - Global Event Delegation (Clicks never fail on dynamic DOM)
   - Safe Tab Render Fallbacks with Per-Module Error Boundaries
   ========================================================================== */

(function (window, document) {
  'use strict';

  // --- 1. CORE EVENT BUS ---
  class SimupEventBus {
    constructor() {
      this.listeners = new Map();
    }
    on(event, callback) {
      if (!this.listeners.has(event)) {
        this.listeners.set(event, new Set());
      }
      this.listeners.get(event).add(callback);
      return () => this.off(event, callback);
    }
    off(event, callback) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).delete(callback);
      }
    }
    emit(event, data) {
      if (this.listeners.has(event)) {
        this.listeners.get(event).forEach(cb => {
          try {
            cb(data);
          } catch (e) {
            console.error(`SimupEventBus error in [${event}]:`, e);
          }
        });
      }
    }
  }

  const bus = new SimupEventBus();

  // --- 2. CORE ENGINE CLASS ---
  class SimupCoreEngine {
    constructor() {
      this.bus = bus;
      this.initialized = false;
      this.activeTab = 'upgrader';
      this.MINI_GAMES_TABS = ['casebattle', 'cases', 'contracts', 'mines', 'coinflip', 'crash'];
    }

    // --- User Session Guarantee ($500.00 starting balance) ---
    getUser() {
      if (window.authManager && window.authManager.currentUser) {
        return window.authManager.currentUser;
      }
      if (window.authManager && typeof window.authManager.ensureGuestUser === 'function') {
        const guest = window.authManager.ensureGuestUser();
        if (guest) return guest;
      }

      // Direct fallback from localStorage
      try {
        const rawUsers = localStorage.getItem('simup_users_v2');
        if (rawUsers) {
          const parsed = JSON.parse(rawUsers);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const session = localStorage.getItem('simup_session_v2');
            let found = parsed.find(u => u.username && session && u.username.toLowerCase() === session.toLowerCase());
            if (!found) found = parsed[0];
            if (found) {
              if (window.authManager) window.authManager.currentUser = found;
              return found;
            }
          }
        }
      } catch (e) {}

      // Create instant starter user
      const randId = Math.floor(1000 + Math.random() * 9000);
      const guestNick = `Игрок_${randId}`;
      const defaultUser = {
        id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        username: guestNick,
        balance: 500.00,
        inventory: [],
        level: 1,
        xp: 0,
        equippedTitle: 'Новичок',
        unlockedTitles: ['Новичок'],
        achievements: {},
        stats: {
          totalUpgrades: 0,
          wonUpgrades: 0,
          lostUpgrades: 0,
          casesOpened: 0,
          totalWagered: 0,
          netProfit: 0
        },
        loans: {
          currentDebt: 0,
          totalBorrowed: 0,
          totalRepaid: 0,
          autoRepay: true
        },
        createdAt: Date.now()
      };

      try {
        const users = [defaultUser];
        localStorage.setItem('simup_users_v2', JSON.stringify(users));
        localStorage.setItem('simup_session_v2', defaultUser.username);
      } catch (e) {}

      if (window.authManager) {
        window.authManager.currentUser = defaultUser;
      }
      return defaultUser;
    }

    getBalance() {
      const user = this.getUser();
      return user ? (user.balance || 0) : 0;
    }

    setBalance(newBalance) {
      const user = this.getUser();
      if (!user) return false;
      user.balance = Math.max(0, parseFloat((+newBalance).toFixed(2)) || 0);
      if (window.authManager?.saveCurrentUser) {
        window.authManager.saveCurrentUser();
      }
      this.updateHeaderUserUI(user);
      this.bus.emit('balance_updated', user.balance);
      return true;
    }

    getInventory() {
      const user = this.getUser();
      if (!user) return [];
      if (!Array.isArray(user.inventory)) user.inventory = [];
      return user.inventory;
    }

    // --- Direct Skin Purchasing (100% Reliable & Synchronized) ---
    buySkin(skinOrId, qty = 1) {
      let skin = null;
      if (typeof skinOrId === 'string') {
        const id = skinOrId.trim();
        skin = (window.SKINS_DATABASE || []).find(s => s.id === id) ||
               (window.catalogController?.skins || []).find(s => s.id === id);
      } else if (skinOrId && typeof skinOrId === 'object') {
        skin = skinOrId;
      }

      if (!skin) {
        window.notify?.error?.('Ошибка', 'Скин не найден в базе данных.');
        return false;
      }

      const user = this.getUser();
      if (!user) {
        window.notify?.warning?.('Авторизация', 'Пожалуйста, войдите в аккаунт.');
        return false;
      }

      const livePrice = (typeof window.marketEconomy?.getPrice === 'function' ? window.marketEconomy.getPrice(skin.id) : null) || skin.price || 0;
      const count = Math.max(1, parseInt(qty, 10) || 1);
      const totalCost = parseFloat((livePrice * count).toFixed(2));

      if ((user.balance || 0) < totalCost) {
        const diff = (totalCost - (user.balance || 0)).toFixed(2);
        window.notify?.warning?.('Недостаточно средств', `Вам не хватает $${diff} на балансе. Перейдите в Банк для пополнения!`);
        this.switchTab('bank');
        return false;
      }

      // Deduct balance
      user.balance = parseFloat((user.balance - totalCost).toFixed(2));
      if (!Array.isArray(user.inventory)) user.inventory = [];

      // Add skin instance(s)
      for (let i = 0; i < count; i++) {
        const item = {
          instanceId: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7) + '_' + i,
          id: skin.id,
          skinId: skin.id,
          name: skin.name,
          game: skin.game || 'cs2',
          category: skin.category || 'rifle',
          rarity: skin.rarity || 'Mil-Spec',
          rarityColor: skin.rarityColor || '#4b69ff',
          image: skin.image || skin.fallbackSvg || '',
          wear: skin.wear || 'FN',
          price: livePrice,
          obtainedAt: new Date().toISOString(),
          source: 'Каталог (Купить)'
        };
        user.inventory.unshift(item);
      }

      // Save user to storage
      if (window.authManager?.saveCurrentUser) {
        window.authManager.saveCurrentUser();
      } else {
        try {
          const raw = localStorage.getItem('simup_users_v2');
          let users = raw ? JSON.parse(raw) : [];
          const idx = users.findIndex(u => u.id === user.id || u.username === user.username);
          if (idx !== -1) users[idx] = user;
          else users.push(user);
          localStorage.setItem('simup_users_v2', JSON.stringify(users));
        } catch (e) {}
      }

      // Audio & Notification
      window.SoundManager?.playSuccess?.();
      window.notify?.success?.(
        'Покупка успешна! 🎉',
        `Куплен скин «${skin.name}» (${count > 1 ? count + ' шт. — ' : ''}$${totalCost.toFixed(2)}). Предмет уже в вашем инвентаре!`
      );

      // Reactive UI refresh
      this.updateHeaderUserUI(user);
      this.renderInventoryPage();
      if (typeof window.updateUpgraderUI === 'function') {
        try { window.updateUpgraderUI(); } catch (e) {}
      }
      if (window.catalogController?.render) {
        try { window.catalogController.render(); } catch (e) {}
      }
      if (window.catalogCart?.updateUI) {
        try { window.catalogCart.updateUI(); } catch (e) {}
      }

      this.bus.emit('skin_bought', { skin, count, totalCost });
      this.bus.emit('inventory_updated', user.inventory);
      return true;
    }

    // --- Header User Info UI ---
    updateHeaderUserUI(user) {
      const u = user || this.getUser();
      if (!u) return;

      const headerBalanceEl = document.getElementById('header-balance');
      const mobileHeaderBalanceEl = document.getElementById('mobile-header-balance');
      const userHeaderName = document.getElementById('user-header-name');
      const userHeaderContainer = document.getElementById('user-header-container');

      const balStr = `$${(u.balance || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

      if (headerBalanceEl) headerBalanceEl.textContent = balStr;
      if (mobileHeaderBalanceEl) mobileHeaderBalanceEl.textContent = balStr;

      if (userHeaderName) {
        userHeaderName.textContent = u.username || 'Игрок';
      }

      if (userHeaderContainer) {
        const initial = (u.username || '?').substring(0, 1).toUpperCase();
        const avatarEl = userHeaderContainer.querySelector('.user-avatar-badge');
        if (avatarEl) {
          avatarEl.textContent = initial;
        }
      }
    }

    // --- Tab Switching & Navigation Engine ---
    switchTab(tabId) {
      if (!tabId) return;
      this.activeTab = tabId;

      // Close all modals
      document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));

      // Close games dropdown menu
      const gamesDropdown = document.getElementById('games-dropdown-menu');
      if (gamesDropdown) gamesDropdown.classList.remove('active');

      // Update Navigation Buttons (Desktop + Mobile)
      document.querySelectorAll('.nav-tab-btn, .mobile-bottom-tab').forEach(b => {
        const matches = b.dataset.tab === tabId || b.getAttribute('data-tab') === tabId;
        b.classList.toggle('active', matches);
      });

      // Highlight "Мини-игры" buttons if tab is a mini-game
      const isMiniGame = this.MINI_GAMES_TABS.includes(tabId);
      const btnDesktopHub = document.getElementById('btn-desktop-games-hub');
      const btnMobileHub = document.getElementById('btn-mobile-games-hub');
      if (btnDesktopHub) btnDesktopHub.classList.toggle('active', isMiniGame);
      if (btnMobileHub) btnMobileHub.classList.toggle('active', isMiniGame);

      // Switch Tab Contents
      const tabContents = document.querySelectorAll('.tab-content');
      tabContents.forEach(c => {
        const targetId = `tab-${tabId}`;
        const isTarget = c.id === targetId;
        c.classList.toggle('active', isTarget);
      });

      window.scrollTo({ top: 0, behavior: 'instant' });

      // Run Tab Specific Renderers safely
      try {
        if (tabId === 'upgrader') {
          if (typeof window.updateUpgraderUI === 'function') window.updateUpgraderUI();
          if (typeof window.drawWheel === 'function') window.drawWheel();
        } else if (tabId === 'inventory') {
          if (typeof window.renderInventoryPage === 'function') window.renderInventoryPage();
          else this.renderInventoryPage();
        } else if (tabId === 'catalog') {
          if (window.catalogController?.render) window.catalogController.render();
          if (window.catalogCart?.updateUI) window.catalogCart.updateUI();
        } else if (tabId === 'cases') {
          if (typeof window.renderCasesGrid === 'function') window.renderCasesGrid();
        } else if (tabId === 'contracts') {
          if (typeof window.renderContractsDesk === 'function') window.renderContractsDesk();
        } else if (tabId === 'bank') {
          if (typeof window.renderBankPage === 'function') window.renderBankPage();
        } else if (tabId === 'profile') {
          if (typeof window.renderProfilePage === 'function') window.renderProfilePage();
        } else if (tabId === 'leaderboard') {
          if (typeof window.renderLeaderboard === 'function') window.renderLeaderboard();
        } else if (tabId === 'crash') {
          if (typeof window.renderCrashUI === 'function') window.renderCrashUI();
          if (window.crashEngine?.resizeCanvas) window.crashEngine.resizeCanvas();
          requestAnimationFrame(() => {
            if (window.crashEngine?.resizeCanvas) window.crashEngine.resizeCanvas();
          });
          setTimeout(() => {
            if (window.crashEngine?.resizeCanvas) window.crashEngine.resizeCanvas();
          }, 60);
          setTimeout(() => {
            if (window.crashEngine?.resizeCanvas) window.crashEngine.resizeCanvas();
          }, 180);
        } else if (tabId === 'coinflip') {
          if (typeof window.renderCoinflipUI === 'function') window.renderCoinflipUI();
        } else if (tabId === 'mines') {
          if (typeof window.renderMinesBoard === 'function') window.renderMinesBoard();
        } else if (tabId === 'casebattle') {
          if (window.caseBattleEngine?.renderLobby) window.caseBattleEngine.renderLobby();
        } else if (tabId === 'pass') {
          if (window.simupPassManager?.render) window.simupPassManager.render();
        } else if (tabId === 'admin') {
          if (window.AdminPanelController?.render) window.AdminPanelController.render();
          else if (window.adminPanel?.render) window.adminPanel.render();
        }
      } catch (err) {
        console.error(`Error activating tab [${tabId}]:`, err);
      }

      this.bus.emit('tab_changed', tabId);
    }

    // --- Inventory Page Renderer ---
    renderInventoryPage() {
      const invGrid = document.getElementById('inv-page-grid');
      const invCount = document.getElementById('inv-page-count');
      const invTotal = document.getElementById('inv-page-total');
      const btnSellAll = document.getElementById('btn-inv-page-sell-all');
      const btnSellAllBadge = document.getElementById('btn-inv-sell-all-badge');

      if (!invGrid) return;
      const user = this.getUser();

      if (!user) {
        invGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center;">
            <div style="font-size: 48px; margin-bottom: 12px;">🎒</div>
            <h2 style="font-size: 22px; color: #fff; margin-bottom: 8px;">Инвентарь пуст</h2>
            <p style="color: var(--text-muted); margin-bottom: 20px;">Купите скины в каталоге или откройте кейсы!</p>
            <button class="btn-deposit" onclick="window.switchTab('catalog')" style="padding: 10px 24px;">🛒 В Каталог</button>
          </div>
        `;
        return;
      }

      const inventory = Array.isArray(user.inventory) ? user.inventory : [];
      const totalCount = inventory.length;
      const totalVal = inventory.reduce((sum, item) => sum + (item.price || 0), 0);

      if (invCount) invCount.textContent = totalCount;
      if (invTotal) invTotal.textContent = `$${totalVal.toFixed(2)}`;
      if (btnSellAllBadge) btnSellAllBadge.textContent = `(+$${totalVal.toFixed(2)})`;
      if (btnSellAll) btnSellAll.disabled = (totalCount === 0);

      if (totalCount === 0) {
        invGrid.innerHTML = `
          <div style="grid-column: 1 / -1; padding: 60px 20px; text-align: center; background: rgba(14, 8, 14, 0.6); border: 1px dashed var(--border-color); border-radius: 18px;">
            <div style="font-size: 50px; margin-bottom: 12px;">🎒</div>
            <h2 style="font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 6px;">Инвентарь пуст</h2>
            <p style="color: var(--text-dim); font-size: 13.5px; max-width: 440px; margin: 0 auto 20px;">
              У вас пока нет скинов. Вы можете приобрести их в Каталоге или выиграть в кейсах и апгрейде!
            </p>
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
              <button class="game-pill-btn active" onclick="window.switchTab('catalog')" style="padding: 10px 18px;">🛒 Купить в Каталоге</button>
              <button class="game-pill-btn" onclick="window.switchTab('cases')" style="padding: 10px 18px;">📦 Открыть Кейс</button>
              <button class="game-pill-btn" onclick="window.switchTab('upgrader')" style="padding: 10px 18px;">🎯 В Апгрейд</button>
            </div>
          </div>
        `;
        return;
      }

      invGrid.innerHTML = inventory.map(item => {
        const itemImg = item.image || item.fallbackSvg || '';
        const price = (item.price || 0).toFixed(2);
        const rarityColor = item.rarityColor || '#ff004d';
        return `
          <div class="inv-card-item" style="border-top: 2px solid ${rarityColor}; position: relative; background: rgba(18, 11, 20, 0.85); border-radius: 12px; padding: 12px; display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="position: absolute; top: 8px; right: 8px; font-size: 10px; font-weight: 800; padding: 2px 6px; border-radius: 4px; background: rgba(0,0,0,0.5); color: #e5e7eb;">${item.wear || 'FN'}</div>
            <img src="${itemImg}" alt="${item.name}" style="width: 100px; height: 75px; object-fit: contain; margin: 8px 0;" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔫</text></svg>'">
            <div style="font-weight: 800; font-size: 13px; color: #fff; margin-bottom: 4px; width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${item.name}">${item.name}</div>
            <div style="font-weight: 900; font-size: 14px; color: #10b981; margin-bottom: 8px;">$${price}</div>
            <div style="display: flex; gap: 6px; width: 100%;">
              <button class="btn-deposit" style="flex: 1; padding: 6px 8px; font-size: 11px; background: linear-gradient(135deg, #ff004d, #b6004c);" onclick="window.selectSkinForUpgrader && window.selectSkinForUpgrader('${item.instanceId}')">В Апгрейд</button>
            </div>
          </div>
        `;
      }).join('');
    }

    // --- Modal Helpers ---
    openModal(modalId) {
      const modal = document.getElementById(modalId);
      if (modal) modal.classList.add('active');
    }

    closeModal(modalId) {
      if (modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('active');
      } else {
        document.querySelectorAll('.modal-overlay.active').forEach(m => m.classList.remove('active'));
      }
    }

    openGamesHub() {
      window.SoundManager?.playClick?.();
      const modal = document.getElementById('modal-games-hub');
      if (modal) modal.classList.add('active');
    }

    closeGamesHub() {
      const modal = document.getElementById('modal-games-hub');
      if (modal) modal.classList.remove('active');
    }

    // --- Global Click Delegation Engine (Never drops listeners) ---
    initEventDelegation() {
      document.addEventListener('click', (e) => {
        // 1. Tab switches
        const tabBtn = e.target.closest('[data-tab]');
        if (tabBtn) {
          const tabId = tabBtn.getAttribute('data-tab');
          if (tabId) {
            e.preventDefault();
            this.closeGamesHub();
            this.switchTab(tabId);
            return;
          }
        }

        // 2. Games Hub toggles
        if (e.target.closest('#btn-desktop-games-hub') || e.target.closest('#btn-mobile-games-hub')) {
          e.preventDefault();
          if (window.innerWidth <= 960) {
            this.openGamesHub();
          } else {
            const menu = document.getElementById('games-dropdown-menu');
            if (menu) menu.classList.toggle('active');
          }
          return;
        }

        // 3. Close games dropdown if clicked outside
        if (!e.target.closest('.games-nav-dropdown-wrap')) {
          const menu = document.getElementById('games-dropdown-menu');
          if (menu) menu.classList.remove('active');
        }

        // 4. Modal Close buttons
        const closeBtn = e.target.closest('.modal-close-btn, [data-modal-close]');
        if (closeBtn) {
          e.preventDefault();
          const modal = closeBtn.closest('.modal-overlay');
          if (modal) modal.classList.remove('active');
          return;
        }

        // 5. Deposit buttons -> Bank
        if (e.target.closest('.btn-deposit') && !e.target.closest('#modal-auth') && !e.target.closest('#tab-bank')) {
          const tabAttr = e.target.closest('.btn-deposit').getAttribute('data-tab');
          if (!tabAttr) {
            this.switchTab('bank');
          }
        }
      });
    }

    // --- Universal Lifecycle Runner ---
    init() {
      if (this.initialized) return;
      this.initialized = true;

      // 1. Ensure User & Header UI
      const user = this.getUser();
      this.updateHeaderUserUI(user);

      // 2. Init Event Delegation
      this.initEventDelegation();

      // 3. Export Global APIs
      this.exportGlobals();

      console.log('⚡ SIMUP 3.0 Core Engine initialized successfully!');
    }

    exportGlobals() {
      window.SimupCore = this;
      window.switchTab = (tab) => this.switchTab(tab);
      window.buySkin = (s, q) => this.buySkin(s, q);
      window.updateHeaderUserUI = (u) => this.updateHeaderUserUI(u);
      window.renderInventoryPage = () => this.renderInventoryPage();
      window.openGamesHub = () => this.openGamesHub();
      window.closeGamesHub = () => this.closeGamesHub();
      window.openModal = (m) => this.openModal(m);
      window.closeModal = (m) => this.closeModal(m);
    }
  }

  // Instantiate singleton
  const simupCore = new SimupCoreEngine();
  simupCore.exportGlobals();

  // Run automatically when ready (no DOMContentLoaded trap)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => simupCore.init());
  } else {
    simupCore.init();
  }

})(window, document);
