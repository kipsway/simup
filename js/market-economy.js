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

    // Run tick every 20 seconds
    setInterval(() => this.tick(), 20000);
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
    if (typeof SKINS_DATABASE === 'undefined' || SKINS_DATABASE.length < 2) return;

    // Pick 2 random skins to form a balanced pair
    const idxA = Math.floor(Math.random() * SKINS_DATABASE.length);
    let idxB = Math.floor(Math.random() * SKINS_DATABASE.length);
    while (idxB === idxA) {
      idxB = Math.floor(Math.random() * SKINS_DATABASE.length);
    }

    const skinA = SKINS_DATABASE[idxA];
    const skinB = SKINS_DATABASE[idxB];

    // Delta between 0.8% and 2.8%
    const deltaPct = (Math.random() * 2.0 + 0.8) / 100;
    const direction = Math.random() < 0.5 ? 1 : -1;

    // Shift skin A in direction, skin B in opposite direction
    this.shiftSkinPrice(skinA, direction * deltaPct);
    this.shiftSkinPrice(skinB, -direction * deltaPct);

    this.saveState();

    // Smooth UI re-render
    if (window.catalogController && typeof window.catalogController.render === 'function') {
      const activeTab = document.querySelector('.tab-content.active');
      if (activeTab && (activeTab.id === 'tab-catalog' || activeTab.id === 'tab-upgrader')) {
        window.catalogController.render();
      }
    }
    if (typeof updateUpgraderUI === 'function') {
      try { updateUpgraderUI(); } catch (e) {}
    }
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
      if (stored) this.items = JSON.parse(stored);
    } catch (e) {
      this.items = [];
    }
  }

  save() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    } catch (e) {}
    this.updateUI();
  }

  addItem(skin) {
    if (!skin) return;
    const cartItem = {
      cartId: 'cart_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      id: skin.id,
      name: skin.name,
      game: skin.game,
      category: skin.category,
      rarity: skin.rarity,
      rarityColor: skin.rarityColor || '#888',
      image: skin.image || skin.fallbackSvg,
      wear: skin.wear || 'FN',
      price: skin.price
    };
    this.items.push(cartItem);
    this.save();
    window.SoundManager?.playClick();
    window.notify?.success('В корзине! 🛒', `Скин "${skin.name}" добавлен в корзину ($${skin.price.toFixed(2)})`);
  }

  removeItem(cartId) {
    this.items = this.items.filter(item => item.cartId !== cartId);
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

  getTotalPrice() {
    return this.items.reduce((sum, item) => sum + (item.price || 0), 0);
  }

  getCount() {
    return this.items.length;
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

    // Add purchased skins to inventory
    this.items.forEach(cartItem => {
      const invItem = {
        instanceId: 'inv_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        id: cartItem.id,
        name: cartItem.name,
        game: cartItem.game,
        category: cartItem.category,
        rarity: cartItem.rarity,
        rarityColor: cartItem.rarityColor,
        image: cartItem.image,
        wear: cartItem.wear,
        price: cartItem.price,
        obtainedAt: new Date().toISOString(),
        source: 'Каталог (Корзина)'
      };
      user.inventory.unshift(invItem);
    });

    window.authManager.saveCurrentUser();

    const count = this.items.length;
    this.clear();
    window.SoundManager?.playSuccess?.();
    window.notify?.success('Покупка успешна! 🎉', `Куплено ${count} скинов на сумму $${total.toFixed(2)}. Предметы добавлены в инвентарь!`);

    this.closeCartModal();

    // Update Header and Inventory
    if (typeof updateHeaderUserUI === 'function') updateHeaderUserUI(user);
    if (typeof updateUpgraderUI === 'function') updateUpgraderUI();
    if (window.catalogController) window.catalogController.render();
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
        dockEl.classList.add('visible');
      } else {
        dockEl.classList.remove('visible');
      }
    }
    if (dockCount) dockCount.textContent = `${count} ${count === 1 ? 'скин' : (count < 5 ? 'скина' : 'скинов')}`;
    if (dockTotal) dockTotal.textContent = `$${total.toFixed(2)}`;

    // Update Header Cart Badge
    const headerBadge = document.getElementById('cart-header-badge');
    const headerBtn = document.getElementById('btn-header-cart');
    if (headerBadge) {
      headerBadge.textContent = count;
      headerBadge.style.display = count > 0 ? 'inline-flex' : 'none';
    }
    if (headerBtn) {
      headerBtn.classList.toggle('has-items', count > 0);
    }

    // Re-render modal if open
    this.renderModal();
  }

  renderModal() {
    const listEl = document.getElementById('cart-modal-items-list');
    const modalTotalEl = document.getElementById('cart-modal-total-price');
    const modalCountEl = document.getElementById('cart-modal-count');
    const modalBalanceEl = document.getElementById('cart-modal-user-balance');
    const modalRemainderEl = document.getElementById('cart-modal-balance-remainder');
    const checkoutBtn = document.getElementById('btn-cart-modal-checkout');

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
        : (user && balance < total ? `Не хватает $${(total - balance).toFixed(2)}` : `💳 Оплатить $${total.toFixed(2)}`);
    }

    if (!listEl) return;

    if (count === 0) {
      listEl.innerHTML = `
        <div style="padding: 36px 16px; text-align: center; color: var(--text-dim);">
          <div style="font-size: 36px; margin-bottom: 8px;">🛒</div>
          <div style="font-size: 16px; font-weight: 700; color: #fff;">Ваша корзина пуста</div>
          <div style="font-size: 12px; margin-top: 4px;">Добавляйте скины кнопкой «🛒 В корзину»!</div>
        </div>
      `;
      return;
    }

    listEl.innerHTML = this.items.map(item => `
      <div class="cart-modal-row" data-cart-item-id="${item.cartId}">
        <img src="${item.image}" alt="${item.name}" class="cart-modal-thumb" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${item.id}');">
        <div class="cart-modal-meta">
          <div class="cart-modal-name" title="${item.name}">${item.name}</div>
          <div class="cart-modal-sub">${(item.game || 'CS2').toUpperCase()} • ${item.wear}</div>
        </div>
        <div class="cart-modal-price">$${item.price.toFixed(2)}</div>
        <button class="btn-cart-modal-remove" data-remove-cart-id="${item.cartId}" title="Удалить из корзины">&times;</button>
      </div>
    `).join('');

    listEl.querySelectorAll('[data-remove-cart-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeItem(btn.dataset.removeCartId);
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
    document.getElementById('btn-cart-dock-open')?.addEventListener('click', () => {
      window.catalogCart.openCartModal();
    });
    document.getElementById('btn-cart-clear')?.addEventListener('click', () => {
      window.catalogCart.clear();
      window.catalogCart.updateUI();
      if (window.catalogController) window.catalogController.render();
    });
    document.getElementById('btn-cart-checkout')?.addEventListener('click', () => {
      window.catalogCart.openCartModal();
    });
    document.getElementById('btn-header-cart')?.addEventListener('click', () => {
      window.catalogCart.openCartModal();
    });
    document.getElementById('cart-modal-close')?.addEventListener('click', () => {
      window.catalogCart.closeCartModal();
    });
    document.getElementById('btn-cart-modal-checkout')?.addEventListener('click', () => {
      window.catalogCart.checkout();
    });
  });
}
