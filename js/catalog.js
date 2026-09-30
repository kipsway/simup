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
    // Mobile performance: paginated rendering (avoid 100+ heavy cards at once)
    this.visibleLimit = 30;
    this.pageStep = 30;
  }

  resetPagination() {
    this.visibleLimit = this.pageStep;
  }

  showMore() {
    this.visibleLimit += this.pageStep;
    this.render();
  }

  init() {
    if (typeof window.getAllSkinVariants === 'function') {
      this.skins = window.getAllSkinVariants();
    }
  }

  setGameFilter(game) {
    this.selectedGame = game;
    this.resetPagination();
  }

  setRarityFilter(rarity) {
    this.selectedRarity = rarity;
    this.resetPagination();
  }

  setSearchQuery(q) {
    this.searchQuery = (q || '').trim().toLowerCase();
    this.resetPagination();
  }

  setSortBy(sort) {
    this.sortBy = sort;
    this.resetPagination();
  }

  setPriceRange(min, max) {
    this.minPrice = parseFloat(min) || 0;
    this.maxPrice = parseFloat(max) || 999999;
    this.resetPagination();
  }

  getFilteredSkins() {
    let result = this.skins.filter(item => {
      // Game filter (CS2, Dota 2, Rust)
      if (this.selectedGame !== 'all') {
        const isDota = (this.selectedGame === 'dota2' || this.selectedGame === 'dota') && (item.game === 'dota2' || item.game === 'dota');
        if (item.game !== this.selectedGame && !isDota) {
          return false;
        }
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

  render() {
    const grid = document.getElementById('skins-grid');
    if (grid) {
      this.renderTo(grid, this.onSelectTargetCallback);
      const total = this.getFilteredSkins().length;
      const countBadge = document.getElementById('catalog-count-badge');
      if (countBadge) {
        countBadge.textContent = `${total} скинов`;
      }
    }
  }

  getVisibleSkins() {
    return this.getFilteredSkins().slice(0, this.visibleLimit);
  }

  renderTo(containerElement, onSelectCallback) {
    if (!containerElement) return;
    this.onSelectTargetCallback = onSelectCallback;

    const allItems = this.getFilteredSkins();
    const items = allItems.slice(0, this.visibleLimit);
    const remaining = allItems.length - items.length;
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
      const cartQty = window.catalogCart ? window.catalogCart.getQty(skin.id) : 0;
      const inCart = cartQty > 0;
      const trendPct = skin.priceChangePct || 0;
      const trendClass = trendPct >= 0 ? 'trend-up' : 'trend-down';
      const trendSign = trendPct >= 0 ? '▲ +' : '▼ ';

      const actionRow = skin.exclusive ? `
        <div class="skin-exclusive-badge ${skin.exclusive === 'pass' ? 'badge-pass' : 'badge-case'}" style="margin-top:6px; height:34px; line-height:34px; border-radius:8px; font-size:11px; font-weight:800; text-align:center; background:${skin.exclusive === 'pass' ? 'rgba(255, 215, 0, 0.12)' : 'rgba(255, 0, 77, 0.12)'}; border:1px solid ${skin.exclusive === 'pass' ? 'rgba(255, 215, 0, 0.35)' : 'rgba(255, 0, 77, 0.35)'}; color:${skin.exclusive === 'pass' ? '#ffd700' : '#ff3366'};" title="${skin.exclusiveLabel} (не продается в магазине)">
          ${skin.exclusiveLabel || '🔒 Эксклюзив'}
        </div>
      ` : `
        <div class="skin-actions-level-row" style="display:grid; grid-template-columns: 1fr 1fr; gap: 6px; align-items: center; width: 100%; height: 34px; margin-top: 6px; box-sizing: border-box;">
          <!-- 1. Купить сразу в 1 клик -->
          <button type="button" class="btn-level-action btn-direct-buy" data-buy-direct-id="${skin.id}" style="background: linear-gradient(135deg, #ff004d, #b6004c); color: #fff; font-weight: 800; border: none; border-radius: 8px; font-size: 11.5px; height: 32px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 8px rgba(255,0,77,0.3);" title="Купить сразу в инвентарь">
            Купить
          </button>

          <!-- 2. Корзина -->
          <button type="button" class="btn-level-action btn-cart-inc ${inCart ? 'in-cart' : ''}" data-cart-toggle-id="${skin.id}" style="font-size: 11px; height: 32px; border-radius: 8px;" title="Добавить в корзину">
            ${inCart ? `Корзина ×${cartQty}` : '+ Корзина'}
          </button>
        </div>
      `;

      html += `
        <div class="skin-card skin-rarity-${skin.rarity}" data-skin-id="${skin.id}" style="--rarity-clr: ${skin.rarityColor}; cursor: pointer;">
          <div class="card-glow-bg"></div>
          <div class="skin-card-header">
            <span class="game-badge game-${skin.game}">${gameBadge}</span>
            ${wearBadge}
            <button class="btn-card-inspect" data-inspect-skin-id="${skin.id}" title="Осмотреть скин" style="margin-left: auto; background: rgba(0,0,0,0.3); border: 1px solid var(--border-color); color: var(--text-muted); border-radius: 4px; padding: 2px 6px; font-size: 11px; cursor: pointer;">🔍</button>
          </div>
          <div class="skin-img-wrap">
            <img src="${skin.image || skin.fallbackSvg}" alt="${skin.name}" loading="lazy" decoding="async" class="skin-img" onerror="if(window.handleSkinImgError) window.handleSkinImgError(this, '${skin.id}');"/>
          </div>
          <div class="skin-info">
            <div class="skin-name" title="${skin.name}">${skin.name}</div>
            <div class="skin-price-headline" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 2px;">
              <span class="skin-price" style="font-size: 16px; font-weight: 900; color: #fff;">$${formattedPrice}</span>
              <span style="font-size: 10px; color: var(--text-dim); text-transform: uppercase;">Рынок</span>
            </div>
            ${actionRow}
          </div>
        </div>
      `;
    });

    if (remaining > 0) {
      html += `
        <div style="grid-column: 1 / -1; text-align: center; padding: 12px 0 4px;">
          <button type="button" class="game-pill-btn" data-catalog-show-more style="padding: 12px 26px; font-size: 14px; font-weight: 800;">
            Показать ещё ${Math.min(remaining, this.pageStep)} из ${remaining} ↓
          </button>
          <div style="font-size: 11px; color: var(--text-muted); margin-top: 6px;">Показано ${items.length} из ${allItems.length} — постраничная загрузка ускоряет телефон</div>
        </div>
      `;
    }

    containerElement.innerHTML = html;

    // Fast, ultra-smooth event delegation on container (Zero DOM listener leaks)
    if (!containerElement._hasDelegation) {
      containerElement._hasDelegation = true;
      containerElement.addEventListener('click', (e) => {
        // 0. Show more pagination (mobile performance)
        const showMoreBtn = e.target.closest('[data-catalog-show-more]');
        if (showMoreBtn) {
          e.stopPropagation();
          this.showMore();
          return;
        }

        // 0.1 Trend click (Price growth details)
        const trendBtn = e.target.closest('[data-trend-skin-id]');
        if (trendBtn) {
          e.stopPropagation();
          const skinId = trendBtn.dataset.trendSkinId;
          const skin = this.skins.find(s => s.id === skinId);
          if (skin) {
            const pct = skin.priceChangePct || 0;
            const sign = pct >= 0 ? '+' : '';
            const status = pct >= 0 ? '📈 Рост цены' : '📉 Спад цены';
            window.notify?.info(
              `${status} (${sign}${pct.toFixed(1)}%)`,
              `Скин: ${skin.name}\nТекущая стоимость: $${skin.price.toFixed(2)}\nБазовая цена: $${(skin.basePrice || skin.price).toFixed(2)}\nРыночные колебания рассчитываются динамически.`
            );
          }
          return;
        }
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

        // 1.5 Direct Buy in 1 Click
        const buyDirectBtn = e.target.closest('[data-buy-direct-id]');
        if (buyDirectBtn) {
          e.stopPropagation();
          const skinId = buyDirectBtn.dataset.buyDirectId;
          const skin = this.skins.find(s => s.id === skinId);
          if (skin) {
            if (window.SimupCore) {
              window.SimupCore.buySkin(skin, 1);
            } else if (typeof window.buySkin === 'function') {
              window.buySkin(skin);
            }
          }
          return;
        }

        // 2. Shopping Cart quantity controls (multiple identical skins)
        const cartDecBtn = e.target.closest('[data-cart-dec-id]');
        if (cartDecBtn) {
          e.stopPropagation();
          const skinId = cartDecBtn.dataset.cartDecId;
          if (window.catalogCart) window.catalogCart.decrement(skinId);
          // decrement() already re-renders; guard double render
          return;
        }
        const cartBtn = e.target.closest('[data-cart-toggle-id]');
        if (cartBtn) {
          e.stopPropagation();
          const skinId = cartBtn.dataset.cartToggleId;
          const skin = this.skins.find(s => s.id === skinId);
          if (!skin || !window.catalogCart) return;
          // Each click adds ONE more identical skin (quantity support)
          window.catalogCart.addItem(skin, 1);
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
