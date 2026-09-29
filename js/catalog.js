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

      html += `
        <div class="skin-card skin-rarity-${skin.rarity}" data-skin-id="${skin.id}" style="--rarity-clr: ${skin.rarityColor};">
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
              <span class="skin-price">$${formattedPrice}</span>
              <div style="display: flex; gap: 4px;">
                <button type="button" class="btn-buy-catalog-skin" data-buy-id="${skin.id}" title="Купить скин в инвентарь за баланс" style="background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.4); color: #10b981; padding: 4px 8px; border-radius: var(--radius-sm); font-size: 11px; font-weight: 800; cursor: pointer; transition: all 0.2s ease;">
                  Купить
                </button>
                <button type="button" class="btn-select-target" data-target-id="${skin.id}" title="Выбрать целью апгрейда">
                  Выбрать
                </button>
              </div>
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

        // 2. Buy button (Fast purchase with balance)
        const buyBtn = e.target.closest('[data-buy-id]');
        if (buyBtn) {
          e.stopPropagation();
          const skinId = buyBtn.dataset.buyId;
          const skin = this.skins.find(s => s.id === skinId);
          if (!skin) return;

          const user = window.authManager?.currentUser;
          if (!user) {
            if (typeof window.showAuthModal === 'function') {
              window.showAuthModal('login');
            }
            return;
          }

          if (user.balance < skin.price) {
            window.notify?.error?.(
              'Недостаточно средств',
              `Для покупки ${skin.name} требуется $${skin.price.toFixed(2)}, ваш баланс: $${user.balance.toFixed(2)}.`
            );
            return;
          }

          // Deduct balance
          user.balance = Number((user.balance - skin.price).toFixed(2));

          // Add skin to inventory
          const newInstance = {
            instanceId: 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            skinId: skin.id,
            name: skin.name,
            wear: skin.wear || 'STANDARD',
            wearName: skin.wearName || 'Базовое качество',
            game: skin.game,
            rarity: skin.rarity,
            rarityColor: skin.rarityColor,
            price: skin.price,
            image: skin.image,
            fallbackSvg: skin.fallbackSvg,
            acquiredAt: Date.now()
          };
          user.inventory.push(newInstance);

          window.authManager.saveCurrentUser();
          if (window.soundManager?.playCoin) {
            window.soundManager.playCoin();
          }
          window.notify?.success?.(
            'Скин куплен!',
            `${skin.name} ($${skin.price.toFixed(2)}) успешно добавлен в ваш инвентарь!`
          );
          if (typeof window.updateUpgraderUI === 'function') {
            window.updateUpgraderUI();
          }
          return;
        }

        // 3. Select card target
        const card = e.target.closest('.skin-card');
        if (card) {
          const skinId = card.dataset.skinId;
          const skin = this.skins.find(s => s.id === skinId);
          if (skin && this.onSelectTargetCallback) {
            this.onSelectTargetCallback(skin);
          }
        }
      });
    }
  }
}

window.catalogController = new CatalogController();
