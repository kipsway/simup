/* ==========================================================================
   SIMUP 2.0 - DYNAMIC MARKET ECONOMY & SHOPPING CART SYSTEM
   1. Real-time stock market price fluctuations (Steam Market 1:1 feel)
   2. Zero-sum coupled economy: one skin rises, another falls in balance
   3. Max fluctuation strictly capped at ±20% from baseline
   4. Multi-item Shopping Cart (batch purchase without instant checkout)
   ========================================================================== */

// ─────────────────────────────────────────────────────────────────────────────
// 1. DYNAMIC MARKET ECONOMY MANAGER (Live Steam Community Exchange)
// ─────────────────────────────────────────────────────────────────────────────
class MarketEconomy {
  constructor() {
    this.storageKey = 'simup_dynamic_market_v2';
    this.maxFluctuation = 0.20; // Maximum ±20%
    this.fluctuations = {};
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;

    // Set base prices on all database items
    if (typeof SKINS_DATABASE !== 'undefined' && Array.isArray(SKINS_DATABASE)) {
      SKINS_DATABASE.forEach(s => {
        if (!s.basePrice) s.basePrice = s.price;
      });
    }

    this.loadState();
    this.applyToDatabase();

    // Run tick every 10 seconds
    setInterval(() => this.tick(), 10000);
  }

  loadState() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        this.fluctuations = JSON.parse(stored);
      }
    } catch (e) {
      this.fluctuations = {};
    }
  }

  saveState() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.fluctuations));
    } catch (e) {}
  }

  tick() {
    if (typeof SKINS_DATABASE === 'undefined' || SKINS_DATABASE.length < 4) return;
    // Mobile perf: never re-render while tab hidden (battery + fps)
    if (typeof document !== 'undefined' && document.hidden) return;

    // Pick 2 balanced pairs (4 skins total: 2 rise, 2 fall)
    for (let p = 0; p < 2; p++) {
      const idxA = Math.floor(Math.random() * SKINS_DATABASE.length);
      let idxB = Math.floor(Math.random() * SKINS_DATABASE.length);
      while (idxB === idxA) {
        idxB = Math.floor(Math.random() * SKINS_DATABASE.length);
      }

      const skinA = SKINS_DATABASE[idxA];
      const skinB = SKINS_DATABASE[idxB];

      // Delta between 0.8% and 3.2%
      const deltaPct = (Math.random() * 2.4 + 0.8) / 100;
      const direction = Math.random() < 0.5 ? 1 : -1;

      // Shift skin A in direction, skin B in opposite direction
      this.shiftSkinPrice(skinA, direction * deltaPct);
      this.shiftSkinPrice(skinB, -direction * deltaPct);
    }

    this.saveState();

    // Mobile-friendly UI refresh: never re-render while hidden, modal open
    // or user is typing in catalog search (prevents lag + focus steal)
    try {
      if (typeof document !== 'undefined' && document.hidden) return;
      if (document.getElementById('modal-cart')?.classList.contains('active')) {
        window.catalogCart?.updateUI();
        return;
      }
      const searchEl = document.getElementById('catalog-search');
      if (searchEl && document.activeElement === searchEl) {
        window.catalogCart?.updateUI();
        return;
      }
    } catch (e) {}
    const doRender = () => {
      if (window.catalogController && typeof window.catalogController.render === 'function') {
        const activeTab = document.querySelector('.tab-content.active');
        if (activeTab && (activeTab.id === 'tab-catalog' || activeTab.id === 'tab-upgrader')) {
          window.catalogController.render();
        }
      }
      if (typeof updateUpgraderUI === 'function') {
        try { updateUpgraderUI(); } catch (e) {}
      }
      window.catalogCart?.updateUI();
    };
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(doRender);
    else doRender();
  }

  shiftSkinPrice(skin, deltaPct) {
    if (!skin) return;
    const base = skin.basePrice || skin.price;
    const currentData = this.fluctuations[skin.id] || { currentPrice: base, changePct: 0, basePrice: base };

    let newPrice = currentData.currentPrice * (1 + deltaPct);

    // Strict cap: base * 0.80 <= newPrice <= base * 1.20
    const minPrice = base * (1 - this.maxFluctuation);
    const maxPrice = base * (1 + this.maxFluctuation);

    if (newPrice < minPrice) newPrice = minPrice;
    if (newPrice > maxPrice) newPrice = maxPrice;

    const changePct = ((newPrice - base) / base) * 100;

    this.fluctuations[skin.id] = {
      currentPrice: parseFloat(newPrice.toFixed(2)),
      changePct: parseFloat(changePct.toFixed(1)),
      basePrice: base
    };

    skin.price = this.fluctuations[skin.id].currentPrice;
    skin.priceChangePct = this.fluctuations[skin.id].changePct;
  }

  applyToDatabase() {
    if (typeof SKINS_DATABASE === 'undefined' || !Array.isArray(SKINS_DATABASE)) return;

    SKINS_DATABASE.forEach(s => {
      const base = s.basePrice || s.price;
      s.basePrice = base;

      if (!this.fluctuations[s.id]) {
        // Initial organic variance between -7% and +7%
        const initDelta = (Math.random() * 14 - 7) / 100;
        const initPrice = parseFloat((base * (1 + initDelta)).toFixed(2));
        const initPct = parseFloat((initDelta * 100).toFixed(1));
        this.fluctuations[s.id] = {
          currentPrice: initPrice,
          changePct: initPct,
          basePrice: base
        };
      }

      s.price = this.fluctuations[s.id].currentPrice;
      s.priceChangePct = this.fluctuations[s.id].changePct;
    });

    this.saveState();
  }

  getPrice(skinId) {
    return this.fluctuations[skinId]?.currentPrice || null;
  }

  getChangePct(skinId) {
    return this.fluctuations[skinId]?.changePct || 0;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. CATALOG SHOPPING CART (BATCH PURCHASE)
// ─────────────────────────────────────────────────────────────────────────────
class CatalogCart {
  constructor() {
    this.storageKey = 'simup_cart_v2';
    this.items = [];
    this.load();
  }

  load() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const raw = JSON.parse(stored);
        if (Array.isArray(raw)) {
          // Migrate legacy per-unit entries into grouped qty entries
          const grouped = new Map();
          raw.forEach(entry => {
            if (!entry || !entry.id) return;
            const qty = Math.max(1, parseInt(entry.qty || 1, 10) || 1);
            if (grouped.has(entry.id)) {
              grouped.get(entry.id).qty += qty;
            } else {
              grouped.set(entry.id, { ...entry, qty });
            }
          });
          this.items = [...grouped.values()];
        }
      }
    } catch (e) {
      this.items = [];
    }
  }

  getLivePrice(item) {
    try {
      const live = window.marketEconomy?.getPrice(item.id);
      if (typeof live === 'number' && live > 0) return live;
    } catch (e) {}
    return item.price || 0;
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {}
    this.updateUI();
  }

  addItem(skin, qtyToAdd = 1) {
    if (!skin) return;
    if (skin.exclusive) {
      const msg = skin.exclusive === 'pass'
        ? `Скин "${skin.name}" является наградой SIMUP PASS и не продается в магазине!`
        : `Скин "${skin.name}" является кейс-эксклюзивом и не продается в магазине!`;
      window.notify?.warning('Эксклюзивный предмет', msg);
      return;
    }
    const qty = Math.max(1, Math.min(99, parseInt(qtyToAdd, 10) || 1));
    const existing = this.items.find(i => i.id === skin.id);
    if (existing) {
      existing.qty = Math.min(99, (existing.qty || 1) + qty);
      // Refresh snapshot price to current market price
      try {
        const live = window.marketEconomy?.getPrice(skin.id);
        if (typeof live === 'number' && live > 0) existing.price = live;
      } catch (e) {}
    } else {
      this.items.push({
        cartId: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        id: skin.id,
        name: skin.name,
        game: skin.game,
        category: skin.category,
        rarity: skin.rarity,
        rarityColor: skin.rarityColor || '#888',
        image: skin.image || skin.fallbackSvg,
        wear: skin.wear || 'FN',
        price: skin.price,
        qty
      });
    }
    this.save();
    window.SoundManager?.playClick();
    const totalQty = this.getQty(skin.id);
    window.notify?.success('В корзине! 🛒', `«${skin.name}» × ${totalQty} — $${((skin.price || 0) * totalQty).toFixed(2)}`);
  }

  increment(skinId) {
    const item = this.items.find(i => i.id === skinId);
    if (!item) return;
    item.qty = Math.min(99, (item.qty || 1) + 1);
    this.save();
    window.SoundManager?.playClick();
    if (window.catalogController) window.catalogController.render();
  }

  decrement(skinId) {
    const item = this.items.find(i => i.id === skinId);
    if (!item) return;
    item.qty = (item.qty || 1) - 1;
    if (item.qty <= 0) {
      this.items = this.items.filter(i => i.id !== skinId);
    }
    this.save();
    window.SoundManager?.playClick();
    if (window.catalogController) window.catalogController.render();
  }

  removeItem(cartId) {
    // Backward compatible: cartId may be legacy cartId OR skin id
    const before = this.items.length;
    this.items = this.items.filter(item => item.cartId !== cartId && item.id !== cartId);
    if (this.items.length !== before) {
      this.save();
      window.SoundManager?.playClick();
      if (window.catalogController) window.catalogController.render();
    }
  }

  removeBySkin(skinId) {
    this.items = this.items.filter(item => item.id !== skinId);
    this.save();
    window.SoundManager?.playClick();
  }

  clear() {
    this.items = [];
    this.save();
  }

  hasSkin(skinId) {
    return this.items.some(item => item.id === skinId);
  }

  getQty(skinId) {
    const item = this.items.find(i => i.id === skinId);
    return item ? (item.qty || 1) : 0;
  }

  getUniqueCount() {
    return this.items.length;
  }

  getCount() {
    return this.items.reduce((sum, item) => sum + (item.qty || 1), 0);
  }

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (this.getLivePrice(item) * (item.qty || 1)), 0);
  }

  openCartModal() {
    this.renderModal();
    document.getElementById('modal-cart')?.classList.add('active');
  }

  closeCartModal() {
    document.getElementById('modal-cart')?.classList.remove('active');
  }

  checkout() {
    const user = window.authManager?.currentUser;
    if (!user) {
      window.notify?.warning('Вход в аккаунт', 'Пожалуйста, войдите в профиль для совершения покупок!');
      if (typeof window.showAuthModal === 'function') window.showAuthModal('login');
      return;
    }

    if (this.items.length === 0) {
      window.notify?.warning('Корзина пуста', 'Добавьте хотя бы один скин в корзину перед оформлением!');
      return;
    }

    const total = this.getTotalPrice();
    if (user.balance < total) {
      const diff = (total - user.balance).toFixed(2);
      window.notify?.warning('Недостаточно средств', `Вам не хватает $${diff} на балансе. Пополните баланс в Банке!`);
      this.closeCartModal();
      if (typeof switchTab === 'function') switchTab('bank');
      return;
    }

    // Deduct balance
    user.balance = parseFloat((user.balance - total).toFixed(2));
    if (!user.inventory) user.inventory = [];

    // Add purchased skins to inventory (respecting quantity of each position)
    this.items.forEach(cartItem => {
      const qty = Math.max(1, cartItem.qty || 1);
      const unitPrice = this.getLivePrice(cartItem);
      for (let n = 0; n < qty; n++) {
        const invItem = {
          instanceId: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
          id: cartItem.id,
          skinId: cartItem.id,
          name: cartItem.name,
          game: cartItem.game,
          category: cartItem.category,
          rarity: cartItem.rarity,
          rarityColor: cartItem.rarityColor,
          image: cartItem.image,
          wear: cartItem.wear,
          price: unitPrice,
          obtainedAt: new Date().toISOString(),
          source: 'Каталог (Корзина)'
        };
        user.inventory.unshift(invItem);
      }
    });

    window.authManager.saveCurrentUser();

    const count = this.getCount();
    const unique = this.getUniqueCount();
    this.clear();
    window.SoundManager?.playSuccess?.();
    window.notify?.success('Покупка успешна! 🎉', `Куплено скинов: ${count} (позиций: ${unique}) на сумму $${total.toFixed(2)}. Предметы добавлены в инвентарь!`);

    this.closeCartModal();

    // Update Header and Inventory
    if (typeof updateHeaderUserUI === 'function') updateHeaderUserUI(user);
    if (typeof updateUpgraderUI === 'function') updateUpgraderUI();
    if (window.catalogController) window.catalogController.render();
  }

  openModal() {
    this.openCartModal();
  }

  closeModal() {
    this.closeCartModal();
  }

  static openModal() {
    window.catalogCart?.openCartModal();
  }

  static updateUI() {
    window.catalogCart?.updateUI();
  }

  updateUI() {
    const count = this.getCount();
    const total = this.getTotalPrice();

    // Update Dock
    const dockEl = document.getElementById('catalog-cart-dock');
    const dockCount = document.getElementById('cart-dock-count');
    const dockTotal = document.getElementById('cart-dock-total');
    if (dockEl) {
      if (count > 0) {
        dockEl.classList.add('visible', 'active');
      } else {
        dockEl.classList.remove('visible', 'active');
      }
    }
    if (dockCount) dockCount.textContent = `${count} ${count === 1 ? 'скин' : (count < 5 ? 'скина' : 'скинов')}`;
    if (dockTotal) dockTotal.textContent = `$${total.toFixed(2)}`;

    // Update Header Cart Badge
    const headerBadges = document.querySelectorAll('#cart-header-badge, #cart-badge-count');
    headerBadges.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'inline-flex' : 'none';
    });
    const headerBtn = document.getElementById('btn-header-cart');
    if (headerBtn) {
      headerBtn.classList.toggle('has-items', count > 0);
    }

    // Re-render modal if open
    this.renderModal();
  }

  renderModal() {
    const listEl = document.getElementById('cart-modal-items') || document.getElementById('cart-modal-items-list');
    const modalTotalEl = document.getElementById('cart-modal-total') || document.getElementById('cart-modal-total-price');
    const modalCountEl = document.getElementById('cart-modal-count');
    const modalBalanceEl = document.getElementById('cart-modal-user-balance');
    const modalRemainderEl = document.getElementById('cart-modal-balance-remainder');
    const checkoutBtn = document.getElementById('btn-cart-checkout-modal') || document.getElementById('btn-cart-modal-checkout');

    const total = this.getTotalPrice();
    const count = this.getCount();
    const user = window.authManager?.currentUser;
    const balance = user ? user.balance : 0;
    const remainder = balance - total;

    if (modalCountEl) modalCountEl.textContent = `${count} ${count === 1 ? 'предмет' : 'предметов'}`;
    if (modalTotalEl) modalTotalEl.textContent = `$${total.toFixed(2)}`;
    if (modalBalanceEl) modalBalanceEl.textContent = `$${balance.toFixed(2)}`;
    if (modalRemainderEl) {
      modalRemainderEl.textContent = `$${remainder.toFixed(2)}`;
      modalRemainderEl.style.color = remainder >= 0 ? 'var(--accent-color)' : '#ef4444';
    }

    if (checkoutBtn) {
      checkoutBtn.disabled = count === 0 || (user && balance < total);
      checkoutBtn.textContent = count === 0 
        ? 'Корзина пуста' 
        : (user && balance < total ? `Не хватает $${(total - balance).toFixed(2)}` : `⚡ Купить все скины ($${total.toFixed(2)})`);
    }

    if (!listEl) return;

    if (count === 0) {
      listEl.innerHTML = `
        <div style="padding: 40px 16px; text-align: center; color: var(--text-dim);">
          <div style="font-size: 40px; margin-bottom: 10px;">🛒</div>
          <div style="font-size: 16px; font-weight: 800; color: #fff;">Ваша корзина пуста</div>
          <div style="font-size: 12px; margin-top: 6px; color: var(--text-muted);">Добавляйте скины из Каталога кнопкой «🛒 В корзину»!</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.items.map(item => {
      const currentPrice = window.marketEconomy?.getPrice(item.id) || item.price;
      const qty = Math.max(1, item.qty || 1);
      const lineTotal = currentPrice * qty;
      const trendPct = window.marketEconomy?.getChangePct(item.id) || 0;
      const trendClass = trendPct >= 0 ? 'trend-up' : 'trend-down';
      const trendSign = trendPct >= 0 ? '▲ +' : '▼ ';
      return `
        <div class="cart-item-row" data-cart-item-id="${item.cartId}">
          <div class="cart-item-left">
            <img src="${item.image}" alt="${item.name}" class="cart-item-img" loading="lazy" decoding="async" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id}');">
            <div class="cart-item-details">
              <div class="cart-item-name" title="${item.name}">${item.name}</div>
              <div class="cart-item-meta">
                <span>${(item.game || 'CS2').toUpperCase()}</span>
                <span>•</span>
                <span>${item.wear}</span>
                <span class="price-trend ${trendClass}">${trendSign}${Math.abs(trendPct).toFixed(1)}%</span>
              </div>
              <div class="cart-qty-stepper" style="display:flex;align-items:center;gap:8px;margin-top:6px;">
                <button class="qty-btn" data-cart-dec="${item.id}" title="Уменьшить количество" style="width:26px;height:26px;border-radius:6px;background:rgba(255,255,255,.06);border:1px solid var(--border-color);color:#fff;font-weight:900;cursor:pointer;">−</button>
                <span style="font-weight:900;color:#fff;font-size:13px;min-width:44px;text-align:center;">× ${qty}</span>
                <button class="qty-btn" data-cart-inc="${item.id}" title="Добавить ещё один" style="width:26px;height:26px;border-radius:6px;background:rgba(var(--accent-rgb),.15);border:1px solid var(--accent-color);color:var(--accent-color);font-weight:900;cursor:pointer;">+</button>
              </div>
            </div>
          </div>
          <div class="cart-item-right">
            <div class="cart-item-price-col">
              <span class="cart-item-price">$${lineTotal.toFixed(2)}</span>
              <span style="font-size:11px;color:var(--text-muted);">$${currentPrice.toFixed(2)} / шт</span>
            </div>
            <button class="cart-item-remove-btn" data-remove-cart-id="${item.cartId}" title="Убрать позицию полностью">&times;</button>
          </div>
        </div>
      `;
    }).join('');

    listEl.querySelectorAll('[data-remove-cart-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeItem(btn.dataset.removeCartId);
      });
    });
    listEl.querySelectorAll('[data-cart-inc]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.increment(btn.dataset.cartInc);
      });
    });
    listEl.querySelectorAll('[data-cart-dec]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.decrement(btn.dataset.cartDec);
      });
    });
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.MarketEconomy = MarketEconomy;
  window.CatalogCart = CatalogCart;
  window.marketEconomy = new MarketEconomy();
  window.catalogCart = new CatalogCart();

  document.addEventListener('DOMContentLoaded', () => {
    window.marketEconomy.init();
    window.catalogCart.updateUI();

    // Wire up dock buttons
    document.querySelectorAll('#btn-dock-cart-open, #btn-cart-dock-open, #btn-dock-checkout, #btn-header-cart').forEach(btn => {
      btn.addEventListener('click', () => window.catalogCart.openCartModal());
    });
    document.querySelectorAll('#btn-dock-cart-clear, #btn-cart-clear, #btn-cart-clear-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        window.catalogCart.clear();
        window.catalogCart.updateUI();
        if (window.catalogController) window.catalogController.render();
      });
    });
    document.querySelectorAll('#cart-modal-close, #btn-cart-modal-close').forEach(btn => {
      btn.addEventListener('click', () => window.catalogCart.closeCartModal());
    });
    document.querySelectorAll('#btn-cart-checkout-modal, #btn-cart-modal-checkout').forEach(btn => {
      btn.addEventListener('click', () => window.catalogCart.checkout());
    });
  });
}
