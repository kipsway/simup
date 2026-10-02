/* ==========================================================================
   SIMUP - PROCEDURAL SKIN GENERATOR & COLLECTOR ENGINE (FLAGSHIP MODE)
   Five-layer generation: Base & Rarity, Exact Float (8 dec), Paint Seed (1-1000),
   StatTrak/Souvenir, Sticker Combos (0-4x), Jackpot Blue Gems & Megacombos.
   Includes 8 full sub-sections:
   1. Workbench (Станок)
   2. Collection Storage (Склад)
   3. Secure Vault (Сейф)
   4. Upgrades Tree (Улучшения)
   5. Smart Auto-Sell Filters (Авто-продажа)
   6. Rarity Atlas (Атлас Редкостей)
   7. 24h Quests & Contracts (Контракты)
   8. Analytics & Stats (Статистика)
   ========================================================================== */

(function(window, document) {
  'use strict';

  const BLUE_GEM_SEEDS = {
    tier1: [661, 387, 321, 670, 179],
    tier2: [151, 555, 955, 828, 760, 4],
    tier3: [139, 429, 571, 868, 872, 905]
  };

  const STICKER_POOL = [
    { id: 'titan_kato14', name: 'Titan (Holo) | Katowice 2014', tier: 'god', price: 45000, color: '#38bdf8' },
    { id: 'ibp_kato14', name: 'iBUYPOWER (Holo) | Katowice 2014', tier: 'god', price: 60000, color: '#ef4444' },
    { id: 'reason_kato14', name: 'Reason (Holo) | Katowice 2014', tier: 'mythic', price: 32000, color: '#f97316' },
    { id: 'crown_foil', name: 'Crown (Foil)', tier: 'legendary', price: 750, color: '#ffd700' },
    { id: 'howling_dawn', name: 'Howling Dawn', tier: 'legendary', price: 900, color: '#ff2b6d' },
    { id: 'dignitas_col14', name: 'Dignitas (Holo) | Cologne 2014', tier: 'rare', price: 450, color: '#eab308' },
    { id: 'c9_dh14', name: 'Cloud9 (Holo) | DreamHack 2014', tier: 'rare', price: 320, color: '#0ea5e9' },
    { id: 'navi_stockholm21', name: 'NaVi (Gold) | Stockholm 2021', tier: 'uncommon', price: 150, color: '#fbbf24' },
    { id: 'spirit_cph24', name: 'Team Spirit (Holo) | Cph 2024', tier: 'uncommon', price: 85, color: '#a855f7' },
    { id: 'battle_scarred', name: 'Battle Scarred (Holo)', tier: 'common', price: 25, color: '#10b981' }
  ];

  class ProceduralSkinGenerator {
    constructor() {
      this.STORAGE_KEY = 'simup_procedural_generator_v2';
      this.BASE_PULL_COST = 3000;
      this.activeTab = 'workbench';
      this.isRolling = false;
      this.autoRollActive = false;
      this.autoRollTimer = null;
      this.passiveIncomeTimer = null;
      this.lastGeneratedItem = null;

      this.state = this.loadState();
      this.initQuests();
      this.startPassiveGenerator();
    }

    loadState() {
      const defaultState = {
        coins: 15000, // Generator currency (in coins)
        totalRolls: 0,
        totalSpent: 0,
        totalEarned: 0,
        bestSkinPrice: 0,
        bestSkinName: '—',
        bestFloat: 1.0,
        collectionCapacity: 15,
        vaultCapacity: 3,
        collection: [],
        vault: [],
        upgrades: {
          costDiscount: 0,      // Level 0-5 (-10% per level)
          statTrakBoost: 0,     // Level 0-5 (+3% per level)
          seedLuck: 0,          // Level 0-5 (+20% chance rare seeds)
          stickerLuck: 0,       // Level 0-5 (+15% Holo/Kato)
          capacityBoost: 0,     // Level 0-5 (+10 slots per level)
          passiveEngine: 0      // Level 0-5 (passive rolls)
        },
        autoSellConfig: {
          enabled: false,
          sellBelowRarity: 'industrial', // none | consumer | industrial | milspec
          sellNonStatTrak: false,
          sellBadFloat: false, // float > 0.38 (WW & BS)
          protectBlueGems: true,
          protectKatowice: true
        },
        hallOfFame: [],
        quests: [],
        lastQuestDate: 0,
        stats: {
          blueGemsFound: 0,
          megaCombosFound: 0,
          totalSkinsSold: 0,
          profitFromSales: 0
        }
      };

      try {
        const saved = localStorage.getItem(this.STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          return Object.assign(defaultState, parsed);
        }
      } catch (e) {
        console.warn('Could not load generator state:', e);
      }
      return defaultState;
    }

    saveState() {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
        this.updateHeaderMetrics();
      } catch (e) {
        console.error('Error saving generator state:', e);
      }
    }

    getEffectivePullCost() {
      const discountPct = (this.state.upgrades.costDiscount || 0) * 0.10; // max 50%
      return Math.round(this.BASE_PULL_COST * (1 - discountPct));
    }

    getStorageMax() {
      return 15 + (this.state.upgrades.capacityBoost || 0) * 10;
    }

    // =========================================================================
    // 5-LAYER PROCEDURAL GENERATION ENGINE
    // =========================================================================
    rollProceduralSkin() {
      const allSkins = (window.SKINS_DATABASE && window.SKINS_DATABASE.length > 0)
        ? window.SKINS_DATABASE
        : (window.getAllSkinVariants ? window.getAllSkinVariants() : []);

      // Filter weapons/knives/gloves
      const pool = allSkins.filter(s => s.game === 'cs2' || !s.game);
      const baseSkin = pool[Math.floor(Math.random() * pool.length)] || {
        id: 'cs2_ak47_case_hardened',
        name: 'AK-47 | Поверхностная закалка',
        category: 'rifle',
        rarity: 'classified',
        price: 180,
        image: ''
      };

      // 1. Layer 2: Precise Float (0.00000000 - 0.99999999)
      // Beta distribution approximation leaning towards FT/MW
      let rawFloat;
      const r = Math.random();
      if (r < 0.08) {
        rawFloat = Math.random() * 0.07; // FN (8%)
      } else if (r < 0.32) {
        rawFloat = 0.07 + Math.random() * 0.08; // MW (24%)
      } else if (r < 0.70) {
        rawFloat = 0.15 + Math.random() * 0.23; // FT (38%)
      } else if (r < 0.85) {
        rawFloat = 0.38 + Math.random() * 0.07; // WW (15%)
      } else {
        rawFloat = 0.45 + Math.random() * 0.55; // BS (15%)
      }
      const floatValue = Number(rawFloat.toFixed(8));

      let wearTag = 'FT';
      let wearName = 'Field-Tested';
      let wearColor = '#f59e0b';
      if (floatValue < 0.07) {
        wearTag = 'FN'; wearName = 'Factory New'; wearColor = '#10b981';
      } else if (floatValue < 0.15) {
        wearTag = 'MW'; wearName = 'Minimal Wear'; wearColor = '#06b6d4';
      } else if (floatValue < 0.38) {
        wearTag = 'FT'; wearName = 'Field-Tested'; wearColor = '#f59e0b';
      } else if (floatValue < 0.45) {
        wearTag = 'WW'; wearName = 'Well-Worn'; wearColor = '#f97316';
      } else {
        wearTag = 'BS'; wearName = 'Battle-Scarred'; wearColor = '#ef4444';
      }

      // 2. Layer 3: Paint Seed (1 - 1000) & Blue Gem Detection
      const seedLuckLevel = this.state.upgrades.seedLuck || 0;
      let paintSeed;
      const isCaseHardened = baseSkin.name.toLowerCase().includes('case hardened') || baseSkin.name.toLowerCase().includes('поверхностная');
      
      const seedRoll = Math.random();
      if (isCaseHardened && (seedRoll < 0.02 + seedLuckLevel * 0.015)) {
        // Force Tier 1 Blue Gem!
        paintSeed = BLUE_GEM_SEEDS.tier1[Math.floor(Math.random() * BLUE_GEM_SEEDS.tier1.length)];
      } else if (isCaseHardened && (seedRoll < 0.07 + seedLuckLevel * 0.03)) {
        paintSeed = BLUE_GEM_SEEDS.tier2[Math.floor(Math.random() * BLUE_GEM_SEEDS.tier2.length)];
      } else {
        paintSeed = Math.floor(Math.random() * 1000) + 1;
      }

      let blueGemTier = null;
      let seedMultiplier = 1.0;
      if (isCaseHardened) {
        if (BLUE_GEM_SEEDS.tier1.includes(paintSeed)) {
          blueGemTier = 'Tier 1 (#661 Scar Blue Gem)';
          seedMultiplier = paintSeed === 661 ? 25.0 : 15.0;
        } else if (BLUE_GEM_SEEDS.tier2.includes(paintSeed)) {
          blueGemTier = 'Tier 2 (Ocean Blue Gem)';
          seedMultiplier = 6.0;
        } else if (BLUE_GEM_SEEDS.tier3.includes(paintSeed)) {
          blueGemTier = 'Tier 3 (Blue Gem)';
          seedMultiplier = 2.5;
        }
      }

      // 3. Layer 4: Modifier (StatTrak / Souvenir / Normal)
      const stBoost = (this.state.upgrades.statTrakBoost || 0) * 0.03;
      const modRoll = Math.random();
      let modifier = 'normal';
      let modLabel = '';
      let modMultiplier = 1.0;
      if (modRoll < (0.10 + stBoost)) {
        modifier = 'stattrak';
        modLabel = 'StatTrak™';
        modMultiplier = 1.6;
      } else if (modRoll < 0.14) {
        modifier = 'souvenir';
        modLabel = 'Souvenir ⭐';
        modMultiplier = 2.0;
      }

      // 4. Layer 5: Sticker Combo (0 to 4 stickers)
      const stickerLuck = (this.state.upgrades.stickerLuck || 0) * 0.05;
      const countRoll = Math.random();
      let stickerCount = 0;
      if (countRoll < 0.40) stickerCount = 0;
      else if (countRoll < 0.65) stickerCount = 1;
      else if (countRoll < 0.83) stickerCount = 2;
      else if (countRoll < 0.93) stickerCount = 3;
      else stickerCount = 4;

      const stickers = [];
      let stickerValue = 0;
      let is4xCombo = false;

      if (stickerCount > 0) {
        // Determine if 4x identical combo
        const isHomogeneous = stickerCount === 4 && (Math.random() < (0.25 + stickerLuck));
        const pickedSticker = STICKER_POOL[Math.floor(Math.random() * STICKER_POOL.length)];

        for (let s = 0; s < stickerCount; s++) {
          const st = isHomogeneous ? pickedSticker : STICKER_POOL[Math.floor(Math.random() * STICKER_POOL.length)];
          stickers.push({ ...st, slot: s + 1 });
          stickerValue += st.price;
        }

        if (isHomogeneous) {
          is4xCombo = true;
          stickerValue *= 2.2; // 4x synergy multiplier
        }
      }

      // Float rarity price multiplier (Super-low float premium)
      let floatMultiplier = 1.0;
      if (floatValue < 0.001) floatMultiplier = 5.0;
      else if (floatValue < 0.01) floatMultiplier = 2.5;
      else if (floatValue < 0.07) floatMultiplier = 1.4;
      else if (floatValue > 0.70) floatMultiplier = 0.75;

      // Final dynamic valuation calculation
      const baseVal = baseSkin.price || 15.0;
      const calculatedValue = Math.round(
        (baseVal * floatMultiplier * seedMultiplier * modMultiplier + stickerValue * 0.15) * 100
      ) / 100;

      // Megacombo detection (One of a kind)
      const isMegaCombo = (
        (blueGemTier && blueGemTier.includes('Tier 1')) ||
        (stickers.some(s => s.id === 'titan_kato14' || s.id === 'ibp_kato14') && is4xCombo) ||
        (modifier === 'stattrak' && floatValue < 0.005 && baseSkin.rarity === 'covert')
      );

      const generatedInstance = {
        instanceId: `gen_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        baseId: baseSkin.id,
        name: baseSkin.name,
        category: baseSkin.category || 'weapon',
        rarity: baseSkin.rarity || 'milspec',
        image: baseSkin.image || '',
        floatValue,
        wearTag,
        wearName,
        wearColor,
        paintSeed,
        blueGemTier,
        modifier,
        modLabel,
        stickers,
        is4xCombo,
        isMegaCombo,
        price: calculatedValue,
        generatedAt: Date.now()
      };

      return generatedInstance;
    }

    // =========================================================================
    // INTERACTIVE ACTIONS & PULL EXECUTION
    // =========================================================================
    executePull() {
      if (this.isRolling) return;
      const cost = this.getEffectivePullCost();

      if (this.state.coins < cost) {
        window.notify?.warning('Недостаточно монет', `Для крутки требуется ${cost.toLocaleString()} 🪙. Продайте скины со склада или выполните контракты.`);
        this.stopAutoRoll();
        return;
      }

      this.isRolling = true;
      this.state.coins -= cost;
      this.state.totalRolls += 1;
      this.state.totalSpent += cost;

      const item = this.rollProceduralSkin();
      this.lastGeneratedItem = item;

      // Update analytics
      if (item.price > this.state.bestSkinPrice) {
        this.state.bestSkinPrice = item.price;
        this.state.bestSkinName = `${item.modLabel ? item.modLabel + ' ' : ''}${item.name} (${item.wearTag})`;
      }
      if (item.floatValue < this.state.bestFloat) {
        this.state.bestFloat = item.floatValue;
      }
      if (item.blueGemTier) {
        this.state.stats.blueGemsFound += 1;
      }
      if (item.isMegaCombo) {
        this.state.stats.megaCombosFound += 1;
      }

      // Check quests progress
      this.checkQuestsProgress(item);

      // Render stage animation
      this.renderGeneratedItemPreview(item);

      // Audio & Special Effects
      if (item.isMegaCombo) {
        window.SoundManager?.playJackpot?.();
        if (typeof window.confettiEffect === 'function') window.confettiEffect();
        window.notify?.bigWin('👑 ONE OF A KIND РЕЛИКВИЯ!', `Вы выбили ${item.name} с Blue Gem & топовыми параметрами! Оценка: $${item.price.toFixed(2)}!`);
      } else if (item.price >= 500) {
        window.SoundManager?.playWin?.();
      } else {
        window.SoundManager?.playTick?.(800, 0.04);
      }

      // Check Smart Auto-Sell Filters
      const shouldAutoSell = this.shouldAutoSellItem(item);
      if (this.state.autoSellConfig.enabled && shouldAutoSell) {
        this.sellCurrentItem(false);
      } else {
        // Automatically put to storage if capacity allows, else prompt
        if (this.state.collection.length < this.getStorageMax()) {
          this.state.collection.unshift(item);
        }
      }

      this.saveState();
      this.isRolling = false;

      // If auto-roll is active, schedule next
      if (this.autoRollActive) {
        this.autoRollTimer = setTimeout(() => {
          if (this.autoRollActive) this.executePull();
        }, 800);
      }
    }

    shouldAutoSellItem(item) {
      const cfg = this.state.autoSellConfig;
      if (cfg.protectBlueGems && item.blueGemTier) return false;
      if (cfg.protectKatowice && item.stickers.some(s => s.tier === 'god' || s.tier === 'mythic')) return false;
      if (item.isMegaCombo) return false;

      const rarityWeight = { consumer: 1, industrial: 2, milspec: 3, restricted: 4, classified: 5, covert: 6, extraordinary: 7, contraband: 8 };
      const threshold = rarityWeight[cfg.sellBelowRarity] || 0;
      if (threshold > 0 && (rarityWeight[item.rarity] || 0) <= threshold) {
        return true;
      }
      if (cfg.sellNonStatTrak && item.modifier !== 'stattrak') {
        return true;
      }
      if (cfg.sellBadFloat && item.floatValue > 0.38) {
        return true;
      }
      return false;
    }

    sellCurrentItem(manual = true) {
      if (!this.lastGeneratedItem) return;
      const item = this.lastGeneratedItem;
      const coinYield = Math.round(item.price * 25); // Currency exchange rate

      this.state.coins += coinYield;
      this.state.totalEarned += coinYield;
      this.state.stats.totalSkinsSold += 1;
      this.state.stats.profitFromSales += coinYield;

      // Remove from collection if present
      this.state.collection = this.state.collection.filter(i => i.instanceId !== item.instanceId);
      this.lastGeneratedItem = null;

      if (manual) {
        window.SoundManager?.playCash?.();
        window.notify?.success('Предмет продан', `Вы получили +${coinYield.toLocaleString()} 🪙`);
      }

      this.saveState();
      this.renderWorkbenchStageIdle();
    }

    keepCurrentItem() {
      if (!this.lastGeneratedItem) return;
      if (this.state.collection.length >= this.getStorageMax()) {
        window.notify?.warning('Склад полон', `Вместимость склада (${this.getStorageMax()} слотов) исчерпана. Продайте скины или улучшите вместимость.`);
        return;
      }
      window.notify?.info('Сохранено', `${this.lastGeneratedItem.name} добавлен на склад.`);
      this.lastGeneratedItem = null;
      this.saveState();
      this.renderWorkbenchStageIdle();
    }

    vaultCurrentItem() {
      if (!this.lastGeneratedItem) return;
      if (this.state.vault.length >= 3) {
        window.notify?.warning('Сейф полон', 'В защищенном сейфе доступно только 3 ячейки.');
        return;
      }
      this.state.vault.unshift(this.lastGeneratedItem);
      // Remove from storage if there
      this.state.collection = this.state.collection.filter(i => i.instanceId !== this.lastGeneratedItem.instanceId);
      window.notify?.success('Сейф защищен', `${this.lastGeneratedItem.name} перемещен в неприкасаемый сейф.`);
      this.lastGeneratedItem = null;
      this.saveState();
      this.renderWorkbenchStageIdle();
    }

    toggleAutoRoll(enable) {
      this.autoRollActive = enable;
      const knob = document.getElementById('gen-auto-roll-knob');
      const pill = document.getElementById('gen-auto-roll-pill');
      if (knob && pill) {
        knob.style.transform = enable ? 'translateX(20px)' : 'translateX(0px)';
        pill.style.background = enable ? 'var(--accent-color)' : 'var(--border-light)';
      }
      if (enable) {
        this.executePull();
      } else {
        this.stopAutoRoll();
      }
    }

    stopAutoRoll() {
      this.autoRollActive = false;
      if (this.autoRollTimer) {
        clearTimeout(this.autoRollTimer);
        this.autoRollTimer = null;
      }
      const knob = document.getElementById('gen-auto-roll-knob');
      const pill = document.getElementById('gen-auto-roll-pill');
      if (knob && pill) {
        knob.style.transform = 'translateX(0px)';
        pill.style.background = 'var(--border-light)';
      }
    }

    // =========================================================================
    // PASSIVE GENERATOR LOOP
    // =========================================================================
    startPassiveGenerator() {
      if (this.passiveIncomeTimer) clearInterval(this.passiveIncomeTimer);
      this.passiveIncomeTimer = setInterval(() => {
        const lvl = this.state.upgrades.passiveEngine || 0;
        if (lvl > 0) {
          const passiveYield = lvl * 150; // passive coin drip
          this.state.coins += passiveYield;
          this.state.totalEarned += passiveYield;
          this.saveState();
        }
      }, 15000);
      if (this.passiveIncomeTimer && typeof this.passiveIncomeTimer.unref === 'function') {
        this.passiveIncomeTimer.unref();
      }
    }

    // =========================================================================
    // 24H DYNAMIC QUESTS
    // =========================================================================
    initQuests() {
      const now = Date.now();
      const oneDay = 86400000;
      if (!this.state.quests || this.state.quests.length === 0 || (now - (this.state.lastQuestDate || 0)) > oneDay) {
        this.state.lastQuestDate = now;
        this.state.quests = [
          { id: 'q1', title: 'Снайперский Float', desc: 'Сгенерируйте скин с Float < 0.08 (Factory New)', target: 1, current: 0, reward: 12000, completed: false },
          { id: 'q2', title: 'Охотник за StatTrak', desc: 'Выбейте 2 любых предмета со счетчиком StatTrak™', target: 2, current: 0, reward: 18000, completed: false },
          { id: 'q3', title: 'Голографический стиль', desc: 'Сгенерируйте скин с минимум 2 наклейками', target: 1, current: 0, reward: 15000, completed: false },
          { id: 'q4', title: 'Станочник-Ветеран', desc: 'Совершите 20 процедурных круток', target: 20, current: 0, reward: 25000, completed: false }
        ];
        this.saveState();
      }
    }

    checkQuestsProgress(item) {
      if (!this.state.quests) return;
      this.state.quests.forEach(q => {
        if (q.completed) return;
        if (q.id === 'q1' && item.floatValue < 0.08) q.current += 1;
        if (q.id === 'q2' && item.modifier === 'stattrak') q.current += 1;
        if (q.id === 'q3' && item.stickers.length >= 2) q.current += 1;
        if (q.id === 'q4') q.current += 1;

        if (q.current >= q.target) {
          q.current = q.target;
          q.completed = true;
          this.state.coins += q.reward;
          window.notify?.bigWin('🎯 КОНТРАКТ ВЫПОЛНЕН!', `«${q.title}» завершен! Награда: +${q.reward.toLocaleString()} 🪙`);
          window.SoundManager?.playWin?.();
        }
      });
    }

    // =========================================================================
    // SECTION NAVIGATION & RENDERING (8 SUB-SECTIONS)
    // =========================================================================
    render() {
      this.updateHeaderMetrics();
      this.bindWorkbenchEvents();
      this.switchSection(this.activeTab || 'workbench');
    }

    switchSection(sectionId) {
      this.activeTab = sectionId;
      document.querySelectorAll('#tab-generator .gen-subtab-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-gen-section') === sectionId);
      });

      const area = document.getElementById('gen-content-area');
      if (!area) return;

      // Render corresponding view
      switch (sectionId) {
        case 'workbench':
          this.renderWorkbenchView(area);
          break;
        case 'collection':
          this.renderCollectionView(area);
          break;
        case 'vault':
          this.renderVaultView(area);
          break;
        case 'upgrades':
          this.renderUpgradesView(area);
          break;
        case 'autosell':
          this.renderAutoSellView(area);
          break;
        case 'atlas':
          this.renderAtlasView(area);
          break;
        case 'quests':
          this.renderQuestsView(area);
          break;
        case 'stats':
          this.renderStatsView(area);
          break;
      }
    }

    updateHeaderMetrics() {
      if (!document || typeof document.getElementById !== 'function') return;
      const storageBadge = document.getElementById('gen-metric-storage');
      const vaultBadge = document.getElementById('gen-metric-vault');
      const navStorage = document.getElementById('gen-nav-storage-count');
      const navVault = document.getElementById('gen-nav-vault-count');
      const rollBtn = document.getElementById('btn-gen-roll-once');

      const maxStorage = this.getStorageMax();
      if (storageBadge) storageBadge.textContent = `${this.state.collection.length} / ${maxStorage}`;
      if (vaultBadge) vaultBadge.textContent = `${this.state.vault.length} / 3`;
      if (navStorage) navStorage.textContent = this.state.collection.length;
      if (navVault) navVault.textContent = this.state.vault.length;
      if (rollBtn) rollBtn.innerHTML = `⚡ Крутить оружие (${this.getEffectivePullCost().toLocaleString()} 🪙)`;

      // Quick balance chip in header
      if (typeof document.querySelector === 'function') {
        const chip = document.querySelector('.gen-metric-chip strong');
        if (chip) chip.textContent = `${this.state.coins.toLocaleString()} 🪙`;
      }
    }

    // 1. WORKBENCH VIEW
    renderWorkbenchView(container) {
      // Workbench is statically placed in index.html, ensure it is active
      const bench = document.getElementById('gen-view-workbench');
      if (bench) {
        bench.style.display = 'block';
      }
      // Hide other dynamically created views
      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      this.bindWorkbenchEvents();
    }

    bindWorkbenchEvents() {
      const btnRoll = document.getElementById('btn-gen-roll-once');
      const btnSell = document.getElementById('btn-gen-action-sell');
      const btnKeep = document.getElementById('btn-gen-action-keep');
      const btnVault = document.getElementById('btn-gen-action-vault');
      const toggleAuto = document.getElementById('gen-auto-roll-toggle');

      if (btnRoll && !btnRoll._bound) {
        btnRoll._bound = true;
        btnRoll.addEventListener('click', () => this.executePull());
      }
      if (btnSell && !btnSell._bound) {
        btnSell._bound = true;
        btnSell.addEventListener('click', () => this.sellCurrentItem(true));
      }
      if (btnKeep && !btnKeep._bound) {
        btnKeep._bound = true;
        btnKeep.addEventListener('click', () => this.keepCurrentItem());
      }
      if (btnVault && !btnVault._bound) {
        btnVault._bound = true;
        btnVault.addEventListener('click', () => this.vaultCurrentItem());
      }
      if (toggleAuto && !toggleAuto._bound) {
        toggleAuto._bound = true;
        toggleAuto.addEventListener('change', (e) => this.toggleAutoRoll(e.target.checked));
      }
    }

    renderGeneratedItemPreview(item) {
      const pill = document.getElementById('gen-skin-rarity-pill');
      const price = document.getElementById('gen-skin-price-tag');
      const title = document.getElementById('gen-skin-title');
      const subtitle = document.getElementById('gen-skin-subtitle');
      const strip = document.getElementById('gen-layers-strip');
      const art = document.getElementById('gen-skin-artwork');
      const glow = document.getElementById('gen-skin-backglow');

      const btnSell = document.getElementById('btn-gen-action-sell');
      const btnKeep = document.getElementById('btn-gen-action-keep');
      const btnVault = document.getElementById('btn-gen-action-vault');

      if (pill) {
        pill.textContent = `${item.modLabel ? item.modLabel + ' • ' : ''}${item.rarity.toUpperCase()}`;
        pill.style.color = '#fff';
        pill.style.background = 'rgba(224, 30, 90, 0.4)';
        pill.style.borderColor = 'var(--accent-color)';
      }
      if (price) {
        price.textContent = `$${item.price.toFixed(2)} (${Math.round(item.price * 25).toLocaleString()} 🪙)`;
      }
      if (title) {
        title.innerHTML = `${item.modLabel ? `<span style="color:#f59e0b;">${item.modLabel}</span> ` : ''}${item.name} <span style="color:${item.wearColor}; font-size:14px;">(${item.wearTag})</span>`;
      }
      if (subtitle) {
        subtitle.innerHTML = `Паттерн: <strong>#${item.paintSeed}</strong> • Износ Float: <strong style="font-family:monospace; color:${item.wearColor};">${item.floatValue.toFixed(8)}</strong>`;
      }
      if (art && item.image) {
        art.src = item.image;
        art.onerror = () => { art.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='80'%3E🔫%3C/text%3E%3C/svg%3E"; };
      }
      if (glow) {
        glow.style.background = item.isMegaCombo ? '#ffd700' : (item.blueGemTier ? '#00e5ff' : 'var(--accent-color)');
        glow.style.opacity = '0.4';
      }

      if (strip) {
        strip.innerHTML = `
          <span class="bet-chip" style="color:${item.wearColor}; border-color:${item.wearColor};">Float: ${item.floatValue.toFixed(8)}</span>
          <span class="bet-chip" style="${item.blueGemTier ? 'color:#00e5ff; border-color:#00e5ff; font-weight:900;' : ''}">Seed: #${item.paintSeed} ${item.blueGemTier ? '💎 ' + item.blueGemTier : ''}</span>
          ${item.modLabel ? `<span class="bet-chip" style="color:#f59e0b; border-color:#f59e0b; font-weight:800;">${item.modLabel}</span>` : ''}
          ${item.stickers.length > 0 ? `<span class="bet-chip" style="color:#38bdf8; border-color:#38bdf8;">Стикеры: ${item.stickers.length}x ${item.is4xCombo ? '🔥 4X COMBO' : ''}</span>` : '<span class="bet-chip" style="opacity:0.5;">Без стикеров</span>'}
        `;
      }

      if (btnSell) { btnSell.disabled = false; btnSell.innerHTML = `💵 Продать (+${Math.round(item.price * 25).toLocaleString()} 🪙)`; }
      if (btnKeep) { btnKeep.disabled = false; }
      if (btnVault) { btnVault.disabled = false; }
    }

    renderWorkbenchStageIdle() {
      const pill = document.getElementById('gen-skin-rarity-pill');
      const price = document.getElementById('gen-skin-price-tag');
      const title = document.getElementById('gen-skin-title');
      const subtitle = document.getElementById('gen-skin-subtitle');
      const strip = document.getElementById('gen-layers-strip');
      const art = document.getElementById('gen-skin-artwork');
      const glow = document.getElementById('gen-skin-backglow');

      const btnSell = document.getElementById('btn-gen-action-sell');
      const btnKeep = document.getElementById('btn-gen-action-keep');
      const btnVault = document.getElementById('btn-gen-action-vault');

      if (pill) { pill.textContent = 'Ожидание крутки...'; pill.style.background = 'rgba(0,0,0,0.6)'; pill.style.borderColor = 'var(--border-color)'; }
      if (price) price.textContent = '0 🪙';
      if (title) title.textContent = 'Нажмите «Крутить» для генерации';
      if (subtitle) subtitle.textContent = 'Случайная комбинация из 5 процедурных слоев';
      if (art) art.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='80'%3E⚡%3C/text%3E%3C/svg%3E";
      if (glow) { glow.style.background = 'var(--accent-color)'; glow.style.opacity = '0.15'; }
      if (strip) {
        strip.innerHTML = `
          <span class="bet-chip" style="font-size: 10.5px; opacity: 0.6;">Float: —</span>
          <span class="bet-chip" style="font-size: 10.5px; opacity: 0.6;">Seed: —</span>
          <span class="bet-chip" style="font-size: 10.5px; opacity: 0.6;">StatTrak: —</span>
          <span class="bet-chip" style="font-size: 10.5px; opacity: 0.6;">Стикеры: —</span>
        `;
      }

      if (btnSell) { btnSell.disabled = true; btnSell.textContent = '💵 Продать'; }
      if (btnKeep) btnKeep.disabled = true;
      if (btnVault) btnVault.disabled = true;
    }

    // 2. COLLECTION STORAGE VIEW
    renderCollectionView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      const items = this.state.collection;
      const maxStorage = this.getStorageMax();

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 20px;">
          <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="font-size:17px; font-weight:900; color:#fff; margin:0;">🎒 Склад коллекции (${items.length} / ${maxStorage})</h3>
              <p style="font-size:12px; color:var(--text-muted); margin:4px 0 0;">Хранилище сгенерированных предметов с быстрой оценкой и фильтрами</p>
            </div>
            <button class="btn-deposit" id="btn-gen-sell-all-unlocked" style="font-size:12px; font-weight:800; color:#ef4444; border-color:rgba(239,68,68,0.3);">
              🗑️ Продать весь склад
            </button>
          </div>

          ${items.length === 0 ? `
            <div style="text-align:center; padding:60px 20px; color:var(--text-muted);">
              <div style="font-size:48px; margin-bottom:12px;">🎒</div>
              <div style="font-size:16px; font-weight:800; color:#fff;">Склад пуст</div>
              <div style="font-size:12px; margin-top:4px;">Крутите станок в главном меню и сохраняйте интересные скины!</div>
            </div>
          ` : `
            <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr)); gap:14px;">
              ${items.map((it, idx) => `
                <div style="background:var(--bg-tertiary); border:1px solid ${it.blueGemTier ? '#00e5ff' : 'var(--border-color)'}; border-radius:var(--radius-md); padding:14px; display:flex; flex-direction:column; justify-content:space-between; gap:10px; position:relative;">
                  ${it.blueGemTier ? '<span style="position:absolute; top:8px; right:8px; font-size:9.5px; background:rgba(0,229,255,0.2); color:#00e5ff; border:1px solid #00e5ff; padding:2px 6px; border-radius:4px; font-weight:900;">BLUE GEM</span>' : ''}
                  <div>
                    <div style="display:flex; justify-content:space-between; font-size:11px; margin-bottom:6px;">
                      <span style="color:${it.wearColor}; font-weight:800;">${it.wearTag} (${it.floatValue.toFixed(4)})</span>
                      <span style="color:var(--text-dim);">Seed #${it.paintSeed}</span>
                    </div>
                    <div style="text-align:center; height:90px; display:flex; align-items:center; justify-content:center;">
                      <img src="${it.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='70'%3E🔫%3C/text%3E%3C/svg%3E"}" style="max-height:80px; max-width:100%; object-fit:contain;" alt="">
                    </div>
                    <div style="font-size:13px; font-weight:800; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                      ${it.modLabel ? `<span style="color:#f59e0b;">${it.modLabel}</span> ` : ''}${it.name}
                    </div>
                    <div style="font-size:14px; font-weight:900; color:var(--success); margin-top:4px;">
                      $${it.price.toFixed(2)} <span style="font-size:11px; color:var(--text-dim);">(${Math.round(it.price * 25).toLocaleString()} 🪙)</span>
                    </div>
                  </div>

                  <div style="display:flex; gap:6px;">
                    <button class="btn-deposit" style="flex:1; font-size:11px; padding:6px; color:#ef4444;" onclick="window.ProceduralGenerator.sellStorageItem('${it.instanceId}')">Продать</button>
                    <button class="btn-deposit" style="flex:1; font-size:11px; padding:6px; color:var(--gold-accent);" onclick="window.ProceduralGenerator.moveStorageToVault('${it.instanceId}')">В сейф</button>
                  </div>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      `;

      container.appendChild(view);

      document.getElementById('btn-gen-sell-all-unlocked')?.addEventListener('click', () => {
        if (confirm('Продать все незащищенные скины со склада?')) {
          this.sellAllStorage();
        }
      });
    }

    sellStorageItem(instanceId) {
      const idx = this.state.collection.findIndex(i => i.instanceId === instanceId);
      if (idx === -1) return;
      const item = this.state.collection.splice(idx, 1)[0];
      const yieldCoins = Math.round(item.price * 25);
      this.state.coins += yieldCoins;
      this.state.totalEarned += yieldCoins;
      this.state.stats.totalSkinsSold += 1;
      this.state.stats.profitFromSales += yieldCoins;
      this.saveState();
      window.SoundManager?.playCash?.();
      window.notify?.success('Скин продан', `+$${item.price.toFixed(2)} (+${yieldCoins.toLocaleString()} 🪙)`);
      this.renderCollectionView(document.getElementById('gen-content-area'));
    }

    moveStorageToVault(instanceId) {
      if (this.state.vault.length >= 3) {
        window.notify?.warning('Сейф полон', 'В защищенном сейфе доступно только 3 ячейки.');
        return;
      }
      const idx = this.state.collection.findIndex(i => i.instanceId === instanceId);
      if (idx === -1) return;
      const item = this.state.collection.splice(idx, 1)[0];
      this.state.vault.unshift(item);
      this.saveState();
      window.notify?.success('Перемещено в сейф', `${item.name} теперь надежно защищен.`);
      this.renderCollectionView(document.getElementById('gen-content-area'));
    }

    sellAllStorage() {
      let totalYield = 0;
      this.state.collection.forEach(it => {
        totalYield += Math.round(it.price * 25);
        this.state.stats.totalSkinsSold += 1;
      });
      this.state.coins += totalYield;
      this.state.totalEarned += totalYield;
      this.state.stats.profitFromSales += totalYield;
      this.state.collection = [];
      this.saveState();
      window.SoundManager?.playCash?.();
      window.notify?.bigWin('Склад очищен', `Проданы все предметы на сумму +${totalYield.toLocaleString()} 🪙`);
      this.renderCollectionView(document.getElementById('gen-content-area'));
    }

    // 3. SECURE VAULT VIEW (3 SLOTS)
    renderVaultView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      const vaultItems = this.state.vault || [];

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
          <div style="margin-bottom:20px;">
            <h3 style="font-size:18px; font-weight:900; color:#fff; display:flex; align-items:center; gap:8px;">
              🛡️ Неприкасаемый Сейф Реликвий (${vaultItems.length} / 3)
            </h3>
            <p style="font-size:12.5px; color:var(--text-muted); margin:4px 0 0;">
              3 сверхзащищенных слота для святых Граалей симулятора. Предметы в сейфе невозможно продать оптом или случайно уничтожить.
            </p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
            ${[0, 1, 2].map(slotIdx => {
              const item = vaultItems[slotIdx];
              return `
                <div style="background:rgba(0,0,0,0.4); border:2px dashed ${item ? 'var(--gold-accent)' : 'var(--border-color)'}; border-radius:var(--radius-lg); padding:20px; min-height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; position:relative;">
                  ${item ? `
                    <span style="position:absolute; top:12px; left:12px; font-size:10px; background:rgba(255,215,0,0.2); color:#ffd700; border:1px solid #ffd700; padding:2px 8px; border-radius:4px; font-weight:900;">VAULT #${slotIdx + 1}</span>
                    <img src="${item.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='70'%3E👑%3C/text%3E%3C/svg%3E"}" style="max-height:110px; max-width:85%; object-fit:contain; margin-bottom:12px;" alt="">
                    <div style="font-size:14px; font-weight:900; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; width:100%;">
                      ${item.modLabel ? `<span style="color:#f59e0b;">${item.modLabel}</span> ` : ''}${item.name}
                    </div>
                    <div style="font-size:11.5px; color:${item.wearColor}; margin-top:2px;">
                      ${item.wearName} (Float: ${item.floatValue.toFixed(6)})
                    </div>
                    <div style="font-size:16px; font-weight:900; color:var(--gold-accent); margin-top:6px;">
                      $${item.price.toFixed(2)}
                    </div>
                    <button class="btn-deposit" style="margin-top:14px; font-size:11px; padding:6px 14px;" onclick="window.ProceduralGenerator.releaseVaultItem('${item.instanceId}')">
                      Вернуть на склад
                    </button>
                  ` : `
                    <div style="font-size:36px; opacity:0.3; margin-bottom:8px;">🔒</div>
                    <div style="font-size:13px; font-weight:800; color:var(--text-dim);">Пустая ячейка сейфа</div>
                    <div style="font-size:11px; color:var(--text-muted); margin-top:4px;">Сохраняйте редчайшие скины со станка или склада</div>
                  `}
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      container.appendChild(view);
    }

    releaseVaultItem(instanceId) {
      if (this.state.collection.length >= this.getStorageMax()) {
        window.notify?.warning('Склад переполнен', 'Освободите место на складе перед извлечением реликвии.');
        return;
      }
      const idx = this.state.vault.findIndex(i => i.instanceId === instanceId);
      if (idx === -1) return;
      const item = this.state.vault.splice(idx, 1)[0];
      this.state.collection.unshift(item);
      this.saveState();
      window.notify?.info('Извлечено', `${item.name} возвращен на основной склад.`);
      this.renderVaultView(document.getElementById('gen-content-area'));
    }

    // 4. UPGRADES TREE VIEW
    renderUpgradesView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      const UPGRADE_CONFIG = [
        { key: 'costDiscount', name: 'Снижение себестоимости', desc: '-10% стоимости крутки за уровень (макс -50%)', max: 5, costs: [5000, 15000, 45000, 100000, 250000], icon: '🪙' },
        { key: 'statTrakBoost', name: 'Магнетизм StatTrak™', desc: '+3% к шансу получить StatTrak и сувенирный статус', max: 5, costs: [8000, 20000, 50000, 120000, 300000], icon: '⭐' },
        { key: 'seedLuck', name: 'Паттерн-инженер (Blue Gem)', desc: '+20% к вероятности выпадения Tier 1 & 2 Blue Gem', max: 5, costs: [10000, 28000, 75000, 180000, 450000], icon: '💎' },
        { key: 'stickerLuck', name: 'Стикерный энтузиаст', desc: '+15% шанс на 4x Holo комбо и Katowice 2014', max: 5, costs: [6000, 18000, 48000, 110000, 280000], icon: '🎨' },
        { key: 'capacityBoost', name: 'Расширение ангара склада', desc: '+10 дополнительных ячеек хранения (до 65)', max: 5, costs: [4000, 12000, 30000, 70000, 160000], icon: '🎒' },
        { key: 'passiveEngine', name: 'Автономный генератор', desc: 'Пассивный приток монет каждые 15 секунд', max: 5, costs: [12000, 35000, 90000, 220000, 500000], icon: '⚡' }
      ];

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
          <div style="margin-bottom:20px;">
            <h3 style="font-size:18px; font-weight:900; color:#fff;">🚀 Дерево улучшений станка</h3>
            <p style="font-size:12.5px; color:var(--text-muted); margin:4px 0 0;">Вкладывайте заработанные очки в постоянные модули для повышения шансов на реликвии</p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px;">
            ${UPGRADE_CONFIG.map(up => {
              const currentLvl = this.state.upgrades[up.key] || 0;
              const isMax = currentLvl >= up.max;
              const nextCost = isMax ? 0 : up.costs[currentLvl];
              const canAfford = !isMax && this.state.coins >= nextCost;

              return `
                <div style="background:var(--bg-tertiary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:18px; display:flex; flex-direction:column; justify-content:space-between; gap:12px;">
                  <div>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <div style="font-size:24px;">${up.icon}</div>
                      <span style="font-size:11px; font-weight:800; color:var(--accent-color); background:rgba(224,30,90,0.15); padding:2px 8px; border-radius:4px;">
                        LVL ${currentLvl} / ${up.max}
                      </span>
                    </div>
                    <div style="font-size:15px; font-weight:800; color:#fff; margin-top:8px;">${up.name}</div>
                    <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${up.desc}</div>
                  </div>

                  <button class="btn-primary" style="width:100%; padding:10px; font-size:13px; font-weight:800; ${isMax ? 'background:rgba(255,255,255,0.08); color:var(--text-muted);' : (!canAfford ? 'opacity:0.6;' : '')}"
                    ${isMax || !canAfford ? 'disabled' : ''} onclick="window.ProceduralGenerator.purchaseUpgrade('${up.key}', ${nextCost})">
                    ${isMax ? 'МАКСИМАЛЬНЫЙ УРОВЕНЬ' : `Улучшить за ${nextCost.toLocaleString()} 🪙`}
                  </button>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      container.appendChild(view);
    }

    purchaseUpgrade(key, cost) {
      if (this.state.coins < cost) {
        window.notify?.warning('Недостаточно монет', 'Продайте скины для оплаты улучшения.');
        return;
      }
      this.state.coins -= cost;
      this.state.upgrades[key] = (this.state.upgrades[key] || 0) + 1;
      this.saveState();
      window.SoundManager?.playWin?.();
      window.notify?.success('Модуль улучшен!', `Улучшение успешно приобретено.`);
      this.renderUpgradesView(document.getElementById('gen-content-area'));
    }

    // 5. SMART AUTO-SELL FILTERS
    renderAutoSellView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      const cfg = this.state.autoSellConfig;

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px; max-width: 680px;">
          <div style="margin-bottom:20px;">
            <h3 style="font-size:18px; font-weight:900; color:#fff; display:flex; align-items:center; gap:8px;">
              ⚙️ Фильтры авто-продажи (Smart Filters)
            </h3>
            <p style="font-size:12.5px; color:var(--text-muted); margin:4px 0 0;">
              Настройте правила автоматической ликвидации низкосортных скинов для непрерывного фарма без засорения склада
            </p>
          </div>

          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-tertiary); padding:14px 18px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div>
                <div style="font-size:14px; font-weight:800; color:#fff;">Включить авто-продажу</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Автоматически конвертировать подходящие скины в монеты</div>
              </div>
              <input type="checkbox" id="cfg-autosell-enable" ${cfg.enabled ? 'checked' : ''} style="width:20px; height:20px; accent-color:var(--accent-color); cursor:pointer;">
            </div>

            <div style="background:var(--bg-tertiary); padding:14px 18px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div style="font-size:14px; font-weight:800; color:#fff; margin-bottom:6px;">Продавать всё ниже редкости:</div>
              <select id="cfg-autosell-rarity" class="form-input" style="padding:8px 12px; font-weight:700;">
                <option value="none" ${cfg.sellBelowRarity === 'none' ? 'selected' : ''}>Не продавать по редкости</option>
                <option value="consumer" ${cfg.sellBelowRarity === 'consumer' ? 'selected' : ''}>Ширпотреб (Consumer Grade)</option>
                <option value="industrial" ${cfg.sellBelowRarity === 'industrial' ? 'selected' : ''}>Промышленное (Industrial Grade)</option>
                <option value="milspec" ${cfg.sellBelowRarity === 'milspec' ? 'selected' : ''}>Армейское качество (Mil-Spec)</option>
              </select>
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-tertiary); padding:14px 18px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div>
                <div style="font-size:14px; font-weight:800; color:#fff;">Продавать обычные скины (без StatTrak™)</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Оставлять в коллекции только модификаторы StatTrak и Souvenir</div>
              </div>
              <input type="checkbox" id="cfg-autosell-stattrak" ${cfg.sellNonStatTrak ? 'checked' : ''} style="width:20px; height:20px; accent-color:var(--accent-color); cursor:pointer;">
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-tertiary); padding:14px 18px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div>
                <div style="font-size:14px; font-weight:800; color:#fff;">Защита Blue Gem семян (Всегда сохранять)</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Игнорировать фильтры для редких паттернов #661, #387, #321 и др.</div>
              </div>
              <input type="checkbox" id="cfg-autosell-bluegem" ${cfg.protectBlueGems ? 'checked' : ''} style="width:20px; height:20px; accent-color:#00e5ff; cursor:pointer;">
            </div>

            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-tertiary); padding:14px 18px; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div>
                <div style="font-size:14px; font-weight:800; color:#fff;">Защита Katowice 2014 & 4x Holo</div>
                <div style="font-size:11.5px; color:var(--text-muted);">Никогда не продавать скины с Titan/iBUYPOWER Holo</div>
              </div>
              <input type="checkbox" id="cfg-autosell-kato" ${cfg.protectKatowice ? 'checked' : ''} style="width:20px; height:20px; accent-color:#ffd700; cursor:pointer;">
            </div>

            <button class="btn-primary" id="btn-save-autosell-cfg" style="margin-top:10px; padding:12px; font-size:14px; font-weight:900;">
              💾 Сохранить конфигурацию фильтров
            </button>
          </div>
        </div>
      `;

      container.appendChild(view);

      document.getElementById('btn-save-autosell-cfg')?.addEventListener('click', () => {
        cfg.enabled = document.getElementById('cfg-autosell-enable')?.checked || false;
        cfg.sellBelowRarity = document.getElementById('cfg-autosell-rarity')?.value || 'none';
        cfg.sellNonStatTrak = document.getElementById('cfg-autosell-stattrak')?.checked || false;
        cfg.protectBlueGems = document.getElementById('cfg-autosell-bluegem')?.checked || false;
        cfg.protectKatowice = document.getElementById('cfg-autosell-kato')?.checked || false;
        this.saveState();
        window.notify?.success('Настройки сохранены', 'Фильтры авто-продажи обновлены.');
      });
    }

    // 6. RARITY ATLAS VIEW
    renderAtlasView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
          <div style="margin-bottom:20px;">
            <h3 style="font-size:18px; font-weight:900; color:#fff;">📖 Атлас Редкостей и Семян (Encyclopedia)</h3>
            <p style="font-size:12.5px; color:var(--text-muted); margin:4px 0 0;">Реестр легендарных паттернов, Blue Gem классификации и топовых коэффициентов</p>
          </div>

          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px;">
            <div style="background:var(--bg-tertiary); border:1px solid #00e5ff; border-radius:var(--radius-md); padding:18px;">
              <h4 style="font-size:15px; font-weight:900; color:#00e5ff; margin:0 0 10px 0;">💎 Blue Gem Tier 1 (Scar & Pure Blue)</h4>
              <div style="font-size:12.5px; color:var(--text-muted); margin-bottom:12px;">Скины с почти 100% синей поверхностью и максимальным множителем:</div>
              <ul style="padding-left:18px; margin:0; font-size:13px; color:#fff; display:flex; flex-direction:column; gap:6px;">
                <li><strong style="color:#ffd700;">Seed #661</strong> — «Scar Pattern» (Множитель 25.0x / $40,000+)</li>
                <li><strong style="color:#00e5ff;">Seed #387</strong> — «Fake Scar» (Множитель 15.0x)</li>
                <li><strong style="color:#00e5ff;">Seed #321</strong> — «Ocean Wave» (Множитель 15.0x)</li>
                <li><strong style="color:#00e5ff;">Seed #670</strong> — «Reverse Scar» (Множитель 15.0x)</li>
                <li><strong style="color:#00e5ff;">Seed #179</strong> — «Deep Sea Blue» (Множитель 15.0x)</li>
              </ul>
            </div>

            <div style="background:var(--bg-tertiary); border:1px solid #ffd700; border-radius:var(--radius-md); padding:18px;">
              <h4 style="font-size:15px; font-weight:900; color:#ffd700; margin:0 0 10px 0;">👑 Священные Граали Наклеек</h4>
              <div style="font-size:12.5px; color:var(--text-muted); margin-bottom:12px;">Легендарные турнирные стикеры Katowice 2014:</div>
              <ul style="padding-left:18px; margin:0; font-size:13px; color:#fff; display:flex; flex-direction:column; gap:6px;">
                <li><strong style="color:#ef4444;">iBUYPOWER (Holo) Kato 14</strong> — $60,000 за наклейку</li>
                <li><strong style="color:#38bdf8;">Titan (Holo) Kato 14</strong> — $45,000 за наклейку</li>
                <li><strong style="color:#f97316;">Reason Gaming (Holo) Kato 14</strong> — $32,000 за наклейку</li>
                <li><strong style="color:#ffd700;">4x Holo Synergy</strong> — экспоненциальный буст +120% к оценке</li>
              </ul>
            </div>
          </div>
        </div>
      `;

      container.appendChild(view);
    }

    // 7. 24H QUESTS VIEW
    renderQuestsView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      const quests = this.state.quests || [];

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
          <div style="margin-bottom:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <h3 style="font-size:18px; font-weight:900; color:#fff;">🎯 Ежедневные контракты (24h Quests)</h3>
              <p style="font-size:12.5px; color:var(--text-muted); margin:4px 0 0;">Выполняйте процедурные задания во время круток и забирайте щедрые награды</p>
            </div>
            <span style="font-size:12px; font-weight:800; color:var(--accent-color);">Смена заданий: Раз в сутки</span>
          </div>

          <div style="display:flex; flex-direction:column; gap:12px;">
            ${quests.map(q => {
              const progressPct = Math.min(100, Math.round((q.current / q.target) * 100));
              return `
                <div style="background:var(--bg-tertiary); border:1px solid ${q.completed ? 'var(--success)' : 'var(--border-color)'}; border-radius:var(--radius-md); padding:18px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                  <div style="flex:1; min-width:240px;">
                    <div style="display:flex; align-items:center; gap:8px;">
                      <div style="font-size:15px; font-weight:800; color:#fff;">${q.title}</div>
                      ${q.completed ? '<span style="font-size:10px; background:rgba(16,185,129,0.2); color:#10b981; border:1px solid #10b981; padding:2px 6px; border-radius:4px; font-weight:900;">ВЫПОЛНЕНО</span>' : ''}
                    </div>
                    <div style="font-size:12px; color:var(--text-muted); margin-top:4px;">${q.desc}</div>
                    
                    <!-- Progress bar -->
                    <div style="width:100%; height:6px; background:rgba(255,255,255,0.08); border-radius:3px; margin-top:10px; overflow:hidden;">
                      <div style="height:100%; width:${progressPct}%; background:${q.completed ? 'var(--success)' : 'var(--accent-color)'};"></div>
                    </div>
                  </div>

                  <div style="text-align:right;">
                    <div style="font-size:11px; color:var(--text-dim); font-weight:700;">Награда:</div>
                    <div style="font-size:16px; font-weight:900; color:var(--gold-accent);">+${q.reward.toLocaleString()} 🪙</div>
                    <div style="font-size:11px; color:var(--text-muted); margin-top:2px;">Прогресс: ${q.current} / ${q.target}</div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;

      container.appendChild(view);
    }

    // 8. ANALYTICS & STATS VIEW
    renderStatsView(container) {
      const bench = document.getElementById('gen-view-workbench');
      if (bench) bench.style.display = 'none';

      document.querySelectorAll('#gen-content-area > .dynamic-gen-view').forEach(v => v.remove());
      const view = document.createElement('div');
      view.className = 'dynamic-gen-view';

      const s = this.state;
      const netGain = s.totalEarned - s.totalSpent;

      view.innerHTML = `
        <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 24px;">
          <div style="margin-bottom:20px;">
            <h3 style="font-size:18px; font-weight:900; color:#fff;">📊 Аналитика и Статистика генератора</h3>
            <p style="font-size:12.5px; color:var(--text-muted); margin:4px 0 0;">Детальные показатели вашей процедурной коллекции и экономической эффективности</p>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 1fr)); gap:16px;">
            <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:11px; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Всего круток</div>
              <div style="font-size:24px; font-weight:900; color:#fff; margin-top:4px;">${s.totalRolls.toLocaleString()}</div>
            </div>

            <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:11px; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Рекордная оценка</div>
              <div style="font-size:24px; font-weight:900; color:var(--success); margin-top:4px;">$${s.bestSkinPrice.toFixed(2)}</div>
              <div style="font-size:11px; color:var(--text-muted); margin-top:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${s.bestSkinName}</div>
            </div>

            <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:11px; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Рекордный Float</div>
              <div style="font-size:22px; font-weight:900; color:#10b981; margin-top:4px; font-family:monospace;">${s.bestFloat < 1.0 ? s.bestFloat.toFixed(8) : '—'}</div>
            </div>

            <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:11px; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Найдено Blue Gem</div>
              <div style="font-size:24px; font-weight:900; color:#00e5ff; margin-top:4px;">${s.stats.blueGemsFound}</div>
            </div>

            <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:11px; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Мега-комбинаций</div>
              <div style="font-size:24px; font-weight:900; color:var(--gold-accent); margin-top:4px;">${s.stats.megaCombosFound}</div>
            </div>

            <div style="background:var(--bg-tertiary); padding:16px; border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <div style="font-size:11px; color:var(--text-dim); font-weight:700; text-transform:uppercase;">Баланс очков</div>
              <div style="font-size:24px; font-weight:900; color:${netGain >= 0 ? '#10b981' : '#ef4444'}; margin-top:4px;">${s.coins.toLocaleString()} 🪙</div>
            </div>
          </div>
        </div>
      `;

      container.appendChild(view);
    }
  }

  window.ProceduralGenerator = new ProceduralSkinGenerator();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.ProceduralGenerator.render());
  } else {
    window.ProceduralGenerator.render();
  }
})(typeof window !== 'undefined' ? window : this, typeof document !== 'undefined' ? document : null);
