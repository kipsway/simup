/* ==========================================================================
   SIMUP - CATALOG CONTROLLER & SEARCH/FILTER ENGINE
   Handles dynamic skin rendering, game tabs, rarity filters, search & sorting.
   ========================================================================== */

class CatalogController {
  constructor() {
    this.skins = [];
    this.selectedGame = 'all';
    this.selectedRarity = 'all';
    this.searchQuery = '';
    this.sortBy = 'price-desc';
    this.minPrice = 0;
    this.maxPrice = 999999;
    this.onSelectTargetCallback = null;
  }

  init() {
    if (typeof window.getAllSkinVariants === 'function') {
      this.skins = window.getAllSkinVariants();
    }
  }

  setGameFilter(game) {
    this.selectedGame = game;
  }

  setRarityFilter(rarity) {
    this.selectedRarity = rarity;
  }

  setSearchQuery(q) {
    this.searchQuery = (q || '').trim().toLowerCase();
  }

  setSortBy(sort) {
    this.sortBy = sort;
  }

  setPriceRange(min, max) {
    this.minPrice = parseFloat(min) || 0;
    this.maxPrice = parseFloat(max) || 999999;
  }

  getFilteredSkins() {
    let result = this.skins.filter(item => {
      // Game filter
      if (this.selectedGame !== 'all' && item.game !== this.selectedGame) {
        return false;
      }
      // Rarity filter
      if (this.selectedRarity !== 'all' && item.rarity !== this.selectedRarity) {
        return false;
      }
      // Price range
      if (item.price < this.minPrice || item.price > this.maxPrice) {
        return false;
      }
      // Search query (Russian or English name)
      if (this.searchQuery) {
        const matchRu = item.name.toLowerCase().includes(this.searchQuery);
        const matchEn = (item.nameEn || '').toLowerCase().includes(this.searchQuery);
        if (!matchRu && !matchEn) {
          return false;
        }
      }
      return true;
    });

    // Sort
    result.sort((a, b) => {
      if (this.sortBy === 'price-desc') return b.price - a.price;
      if (this.sortBy === 'price-asc') return a.price - b.price;
      if (this.sortBy === 'name') return a.name.localeCompare(b.name);
      return b.price - a.price;
    });

    return result;
  }

  renderTo(containerElement, onSelectCallback) {
    if (!containerElement) return;
    this.onSelectTargetCallback = onSelectCallback;

    const items = this.getFilteredSkins();
    if (items.length === 0) {
      containerElement.innerHTML = `
        <div class="empty-catalog-state">
          <div class="empty-icon">🔍</div>
          <div class="empty-title">Скины не найдены</div>
          <div class="empty-desc">Попробуйте изменить поисковый запрос или сбросить фильтры редкости и цены.</div>
        </div>
      `;
      return;
    }

    let html = '';
    items.forEach(skin => {
      const formattedPrice = skin.price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });

      const gameBadge = skin.game.toUpperCase();
      const wearBadge = skin.wear !== 'STANDARD' ? `<span class="wear-pill">${skin.wear}</span>` : '';
      const inCart = window.catalogCart ? window.catalogCart.hasSkin(skin.id) : false;
      const trendPct = skin.priceChangePct || 0;
      const trendClass = trendPct >= 0 ? 'trend-up' : 'trend-down';
      const trendSign = trendPct >= 0 ? '▲ +' : '▼ ';

      html += `
        <div class="skin-card skin-rarity-${skin.rarity}" data-skin-id="${skin.id}" style="--rarity-clr: ${skin.rarityColor}; cursor: pointer;">
          <div class="card-glow-bg"></div>
          <div class="skin-card-header">
            <span class="game-badge game-${skin.game}">${gameBadge}</span>
            ${wearBadge}
            <button class="btn-card-inspect" data-inspect-skin-id="${skin.id}" title="Осмотреть скин" style="margin-left: auto; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 4px; padding: 2px 6px; font-size: 11px; cursor: pointer;">🔍</button>
          </div>
          <div class="skin-img-wrap">
            <img src="${skin.image || skin.fallbackSvg}" alt="${skin.name}" loading="lazy" class="skin-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${skin.id}');"/>
          </div>
          <div class="skin-info">
            <div class="skin-name" title="${skin.name}">${skin.name}</div>
            <div class="skin-price-row">
              <div class="skin-price-box">
                <span class="skin-price">$${formattedPrice}</span>
                <span class="price-trend ${trendClass}">${trendSign}${Math.abs(trendPct).toFixed(1)}%</span>
              </div>
              <button type="button" class="btn-catalog-cart ${inCart ? 'in-cart' : ''}" data-cart-toggle-id="${skin.id}" title="${inCart ? 'Убрать из корзины' : 'Добавить в корзину'}">
                ${inCart ? '✓ В корзине' : '🛒 В корзину'}
              </button>
            </div>
          </div>
        </div>
      `;
    });

    containerElement.innerHTML = html;

    // Fast, ultra-smooth event delegation on container (Zero DOM listener leaks)
    if (!containerElement._hasDelegation) {
      containerElement._hasDelegation = true;
      containerElement.addEventListener('click', (e) => {
        // 1. Inspect button
        const inspectBtn = e.target.closest('[data-inspect-skin-id]');
        if (inspectBtn) {
          e.stopPropagation();
          const skinId = inspectBtn.dataset.inspectSkinId;
          const skin = this.skins.find(s => s.id === skinId);
          if (skin && window.openSkinInspectModal) {
            window.openSkinInspectModal(skin);
          }
          return;
        }

        // 2. Shopping Cart Toggle (Add or remove from batch cart)
        const cartBtn = e.target.closest('[data-cart-toggle-id]');
        if (cartBtn) {
          e.stopPropagation();
          const skinId = cartBtn.dataset.cartToggleId;
          const skin = this.skins.find(s => s.id === skinId);
          if (!skin || !window.catalogCart) return;

          if (window.catalogCart.hasSkin(skin.id)) {
            const existing = window.catalogCart.items.find(i => i.id === skin.id);
            if (existing) window.catalogCart.removeItem(existing.cartId);
          } else {
            window.catalogCart.addItem(skin);
          }
          this.render();
          return;
        }

        // 3. Card click (Select as upgrade target directly)
        const card = e.target.closest('.skin-card');
        if (card) {
          const skinId = card.dataset.skinId;
          const skin = this.skins.find(s => s.id === skinId);
          if (skin) {
            if (this.onSelectTargetCallback) {
              this.onSelectTargetCallback(skin);
            } else if (typeof window.selectTargetSkin === 'function') {
              window.selectTargetSkin(skin);
            }
            window.SoundManager?.playClick();
            window.notify?.info('Цель выбрана 🎯', `Скин "${skin.name}" выбран для апгрейда!`);
          }
        }
      });
    }
  }
}

window.catalogController = new CatalogController();
