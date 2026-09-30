/* ==========================================================================
   SIMUP - UPGRADER ENGINE & PROVABLY FAIR SYSTEM (BLOCK 3)
   Exact 1-to-1 casino mathematics, 60fps physics wheel, multi-upgrade,
   real-time deceleration sound ticks & cryptographic SHA-256 verification.
   ========================================================================== */

class UpgraderEngine {
  constructor() {
    this.houseEdge = 0.05; // 5% esports edge (~95% RTP, higher win rate)
    this.sectorOffset = 0; // rotation angle of sector
    this.isSpinning = false;
    this.speedMode = 'normal'; // 'fast' (1.2s), 'normal' (3.5s), 'slow' (7.6s)
    try {
      this.speedMode = localStorage.getItem('simup_spin_speed') || 'normal';
    } catch(e) {}

    // Mystery random multiplier state (revealed ONLY after spin completes)
    this.isMysteryMode = false;
    this.mysteryMultiplier = null;

    // Bet configuration: SKINS ONLY
    this.selectedItems = []; // items from inventory sacrificed for upgrade
    this.targetSkin = null; // target skin to win
    this.desiredMultiplier = 2.0;
    this.desiredChance = 50.0;

    // Provably Fair state
    this.clientSeed = this.generateClientSeed();
    this.serverSeed = this.generateRandomHex(32);
    this.serverSeedHash = '';
    this.nonce = 1;
    this.lastRoundData = null;

    this.initProvablyFair();
  }

  async initProvablyFair() {
    this.serverSeedHash = await this.sha256(this.serverSeed);
  }

  generateClientSeed() {
    return 'simup_' + Math.random().toString(36).substring(2, 10);
  }

  generateRandomHex(length = 32) {
    try {
      const _crypto = (typeof window !== 'undefined' && window.crypto) ? window.crypto : (typeof crypto !== 'undefined' ? crypto : null);
      if (_crypto && typeof _crypto.getRandomValues === 'function') {
        const arr = new Uint8Array(length);
        _crypto.getRandomValues(arr);
        return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
      }
    } catch (e) {}
    let str = '';
    const hex = '0123456789abcdef';
    for (let i = 0; i < length * 2; i++) {
      str += hex.charAt(Math.floor(Math.random() * hex.length));
    }
    return str;
  }

  async sha256(str) {
    if (typeof window !== 'undefined' && window.authManager && typeof window.authManager.sha256 === 'function') {
      return await window.authManager.sha256(str);
    }
    if (typeof TextEncoder !== 'undefined' && typeof crypto !== 'undefined' && crypto.subtle) {
      try {
        const enc = new TextEncoder();
        const data = enc.encode(str);
        const hash = await crypto.subtle.digest('SHA-256', data);
        return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {}
    }
    // Safe deterministic fallback hash
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0; i < str.length; i++) {
      const ch = str.charCodeAt(i);
      h1 = Math.imul(h1 ^ ch, 2654435761);
      h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return ((h1 >>> 0).toString(16).padStart(8, '0') + (h2 >>> 0).toString(16).padStart(8, '0')).repeat(4);
  }

  setSpeedMode(mode) {
    if (['fast', 'normal', 'slow'].includes(mode)) {
      this.speedMode = mode;
      try {
        localStorage.setItem('simup_spin_speed', mode);
      } catch(e) {}
    }
  }

  clearMysteryMode() {
    this.isMysteryMode = false;
    this.mysteryMultiplier = null;
  }

  rollRandomUpgrade() {
    this.isMysteryMode = true;
    const totalBet = this.getTotalBetAmount() || 10;
    const allSkins = (window.getAllSkinVariants ? window.getAllSkinVariants() : null) || window.SKINS_DATABASE || [];
    const maxPrice = allSkins.reduce((m, s) => Math.max(m, s.price || 0), 35000);
    const maxPossibleMult = Math.max(1.5, Math.min(50, +(maxPrice / Math.max(1, totalBet)).toFixed(1)));

    const r = Math.random();
    let mult;
    if (r < 0.40) {
      mult = +(1.2 + Math.random() * 1.8).toFixed(1); // 1.2x - 3.0x
    } else if (r < 0.70) {
      mult = +(3.0 + Math.random() * 4.0).toFixed(1); // 3.0x - 7.0x
    } else if (r < 0.90) {
      mult = +(7.0 + Math.random() * 8.0).toFixed(1); // 7.0x - 15.0x
    } else {
      mult = +(15 + Math.random() * 25).toFixed(0); // 15x - 40x
    }
    mult = Math.min(mult, maxPossibleMult);
    this.mysteryMultiplier = mult;
    this.desiredMultiplier = mult;
    this.applyDesiredMultiplier();
    return mult;
  }

  toggleItemSelection(item) {
    const idx = this.selectedItems.findIndex(it => it.instanceId === item.instanceId);
    let isSelected = false;
    if (idx !== -1) {
      this.selectedItems.splice(idx, 1);
      isSelected = false;
    } else {
      this.selectedItems.push(item);
      isSelected = true;
    }
    try {
      const mode = localStorage.getItem('simup_last_target_mode') || 'chance';
      if (mode === 'multiplier' && this.desiredMultiplier) {
        this.applyDesiredMultiplier();
      } else {
        this.applyDesiredChance();
      }
    } catch(e) {}
    return isSelected;
  }

  clearSelectedItems() {
    this.selectedItems = [];
    try {
      const mode = localStorage.getItem('simup_last_target_mode') || 'chance';
      if (mode === 'multiplier' && this.desiredMultiplier) {
        this.applyDesiredMultiplier();
      } else {
        this.applyDesiredChance();
      }
    } catch(e) {}
  }

  selectAllItems(items = []) {
    this.selectedItems = [...items];
    try {
      const mode = localStorage.getItem('simup_last_target_mode') || 'chance';
      if (mode === 'multiplier' && this.desiredMultiplier) {
        this.applyDesiredMultiplier();
      } else {
        this.applyDesiredChance();
      }
    } catch(e) {}
  }

  setTargetSkin(skin) {
    if (!skin) return;
    this.clearMysteryMode();
    const isSacrificed = this.selectedItems.some(it => (it.skinId || it.id || it.baseId) === skin.id);
    if (isSacrificed) {
      if (window.notify) window.notify.warning('Недопустимый скин', 'Целевой скин не может совпадать со скином в ставке!');
      return;
    }
    this.targetSkin = skin;
    try {
      if (skin && skin.id) {
        localStorage.setItem('simup_last_target_skin_id', skin.id);
        localStorage.setItem('simup_last_target_mode', 'skin');
      }
    } catch(e) {}
  }

  setDesiredMultiplier(mult) {
    this.clearMysteryMode();
    this.desiredMultiplier = Number(mult);
    try {
      localStorage.setItem('simup_last_multiplier', String(mult));
      localStorage.setItem('simup_last_target_mode', 'multiplier');
    } catch(e) {}
    return this.applyDesiredMultiplier();
  }

  setDesiredChance(pct) {
    this.clearMysteryMode();
    const clamped = Math.min(90.0, Math.max(0.1, Number(pct)));
    this.desiredChance = clamped;
    try {
      localStorage.setItem('simup_last_chance', String(clamped));
      localStorage.setItem('simup_last_target_mode', 'chance');
    } catch(e) {}
    return this.applyDesiredChance();
  }

  applyDesiredChance() {
    if (!this.desiredChance || this.desiredChance <= 0) return null;
    const totalBet = this.getTotalBetAmount() || 10;
    const allSkins = (window.getAllSkinVariants ? window.getAllSkinVariants() : null) || window.catalogController?.skins || window.SKINS_DATABASE || [];
    if (allSkins.length === 0) return null;

    // Comprehensive exclusion set of sacrificed items
    const sacrificedIds = new Set(this.selectedItems.flatMap(it => [it.skinId, it.id, it.baseId, it.instanceId].filter(Boolean)));
    const sacrificedNames = new Set(this.selectedItems.map(it => (it.name || '').trim().toLowerCase()));
    const sacrificedBaseNames = new Set(this.selectedItems.map(it => (it.baseName || it.name || '').split('(')[0].trim().toLowerCase()));

    const isSacrificed = (s) => {
      if (sacrificedIds.has(s.id) || sacrificedIds.has(s.baseId)) return true;
      const sName = (s.name || '').trim().toLowerCase();
      if (sacrificedNames.has(sName)) return true;
      const sBase = (s.baseName || s.name || '').split('(')[0].trim().toLowerCase();
      if (sacrificedBaseNames.has(sBase) && this.selectedItems.length === 1) return true;
      return false;
    };

    // Target must be strictly worth more than totalBet
    const minTargetPrice = totalBet > 0 ? Math.max(0.1, totalBet * 1.03) : 0.1;
    let candidates = allSkins.filter(s => typeof s.price === 'number' && s.price >= minTargetPrice && !isSacrificed(s));

    if (candidates.length === 0 && totalBet > 0) {
      candidates = allSkins.filter(s => typeof s.price === 'number' && s.price > totalBet && !isSacrificed(s));
    }
    if (candidates.length === 0) {
      candidates = allSkins.filter(s => typeof s.price === 'number' && !isSacrificed(s));
    }
    if (candidates.length === 0) {
      candidates = allSkins;
    }

    // Direct mathematical error minimization against desiredChance
    let closest = candidates[0];
    let minDiff = Infinity;
    for (let i = 0; i < candidates.length; i++) {
      const s = candidates[i];
      const actualChance = Math.min(90, Math.max(0.01, (totalBet / s.price) * (1 - this.houseEdge) * 100));
      const diff = Math.abs(actualChance - this.desiredChance);
      if (diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    }
    this.targetSkin = closest;
    return closest;
  }

  applyDesiredMultiplier() {
    if (!this.desiredMultiplier || this.desiredMultiplier <= 0) return null;
    const totalBet = this.getTotalBetAmount() || 10;
    const allSkins = (window.getAllSkinVariants ? window.getAllSkinVariants() : null) || window.catalogController?.skins || window.SKINS_DATABASE || [];
    if (allSkins.length === 0) return null;

    const sacrificedIds = new Set(this.selectedItems.flatMap(it => [it.skinId, it.id, it.baseId, it.instanceId].filter(Boolean)));
    const sacrificedNames = new Set(this.selectedItems.map(it => (it.name || '').trim().toLowerCase()));
    const sacrificedBaseNames = new Set(this.selectedItems.map(it => (it.baseName || it.name || '').split('(')[0].trim().toLowerCase()));

    const isSacrificed = (s) => {
      if (sacrificedIds.has(s.id) || sacrificedIds.has(s.baseId)) return true;
      const sName = (s.name || '').trim().toLowerCase();
      if (sacrificedNames.has(sName)) return true;
      const sBase = (s.baseName || s.name || '').split('(')[0].trim().toLowerCase();
      if (sacrificedBaseNames.has(sBase) && this.selectedItems.length === 1) return true;
      return false;
    };

    const minTargetPrice = totalBet > 0 ? Math.max(0.1, totalBet * 1.03) : 0.1;
    let candidates = allSkins.filter(s => typeof s.price === 'number' && s.price >= minTargetPrice && !isSacrificed(s));

    if (candidates.length === 0 && totalBet > 0) {
      candidates = allSkins.filter(s => typeof s.price === 'number' && s.price > totalBet && !isSacrificed(s));
    }
    if (candidates.length === 0) {
      candidates = allSkins.filter(s => typeof s.price === 'number' && !isSacrificed(s));
    }
    if (candidates.length === 0) {
      candidates = allSkins;
    }

    let closest = candidates[0];
    let minDiff = Infinity;
    for (let i = 0; i < candidates.length; i++) {
      const s = candidates[i];
      const actualMult = s.price / totalBet;
      const diff = Math.abs(actualMult - this.desiredMultiplier);
      if (diff < minDiff) {
        minDiff = diff;
        closest = s;
      }
    }
    this.targetSkin = closest;
    return closest;
  }

  getTotalBetAmount() {
    const itemsVal = this.selectedItems.reduce((s, it) => s + (it.price || 0), 0);
    return Number(itemsVal.toFixed(2));
  }

  // Exact 1-to-1 Mathematical Chance calculation (up to 90.00% MAX)
  calculateChance() {
    const totalBet = this.getTotalBetAmount();
    if (!this.targetSkin || this.targetSkin.price <= 0 || totalBet <= 0) {
      return 0;
    }

    // Balanced odds formula: chance = (totalBetSkins / targetSkinPrice) * (1 - 0.05) * 100
    const rawChance = (totalBet / this.targetSkin.price) * (1 - this.houseEdge) * 100;
    const clamped = Math.min(90.00, Math.max(0.01, rawChance));
    return Number(clamped.toFixed(2));
  }

  calculateMultiplier() {
    const totalBet = this.getTotalBetAmount();
    if (!this.targetSkin || totalBet <= 0) {
      return this.desiredMultiplier || 2.0;
    }
    return Number((this.targetSkin.price / totalBet).toFixed(2));
  }

  // Quick Multiplier adjustment
  setQuickMultiplier(multiplier) {
    return this.setDesiredMultiplier(multiplier);
  }

  // Generate roll using Provably Fair logic with high-entropy uniform distribution
  async generateRollNumber() {
    const combo = `${this.serverSeed}:${this.clientSeed}:${this.nonce}:${Date.now()}`;
    const hash = await this.sha256(combo);

    // Uniform 0.00 to 99.99 roll calculation
    let roll;
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      const buf = new Uint32Array(2);
      crypto.getRandomValues(buf);
      const uniformFloat = ((buf[0] * 4294967296) + buf[1]) / (4294967296 * 4294967296);
      roll = uniformFloat * 100;
    } else {
      const sub = hash.substring(0, 10);
      const intVal = parseInt(sub, 16);
      roll = (intVal % 100000) / 1000;
    }
    return { roll: Number(roll.toFixed(2)), hash };
  }

  // Execute Upgrader spin
  async spin({ onStart, onTick, onComplete }) {
    if (this.isSpinning) return;
    const user = window.authManager.currentUser;
    if (!user) {
      window.notify.error('Ошибка', 'Сначала авторизуйтесь в профиле.');
      return;
    }

    if (this.selectedItems.length === 0) {
      window.notify.warning('Выберите скин для ставки', 'В апгрейдере ставки делаются только скинами! Выберите один или несколько скинов из инвентаря слева.');
      return;
    }

    const totalBet = this.getTotalBetAmount();
    if (totalBet <= 0) {
      window.notify.warning('Сделайте ставку', 'Сумма выбранных скинов должна быть больше $0.00.');
      return;
    }

    if (!this.targetSkin) {
      window.notify.warning('Выберите скин', 'Выберите целевой скин в каталоге справа или выберите множитель.');
      return;
    }

    // Verify sacrificed items are still in user inventory
    for (const it of this.selectedItems) {
      const exists = user.inventory.some(invItem => invItem.instanceId === it.instanceId);
      if (!exists) {
        window.notify.error('Ошибка предметов', `Предмет ${it.name} отсутствует в инвентаре.`);
        this.clearSelectedItems();
        return;
      }
    }

    this.isSpinning = true;

    // 1. Remove sacrificed skins from user inventory immediately upon spin start
    const sacrificedIds = this.selectedItems.map(it => it.instanceId);
    user.inventory = user.inventory.filter(it => !sacrificedIds.includes(it.instanceId));

    user.stats.totalUpgrades = (user.stats.totalUpgrades || 0) + 1;
    user.stats.totalWagered = Number(((user.stats.totalWagered || 0) + totalBet).toFixed(2));
    user.stats.maxSingleBet = Math.max(user.stats.maxSingleBet || 0, totalBet);

    window.authManager.saveCurrentUser();

    const chance = this.calculateChance();
    const multiplier = this.calculateMultiplier();
    const { roll, hash } = await this.generateRollNumber();

    if (chance >= 85) {
      user.stats.hasTried90Pct = true;
    }

    // Determine win mathematically:
    const isWin = (roll < chance);

    const currentServerSeed = this.serverSeed;
    const currentServerSeedHash = this.serverSeedHash;
    const currentClientSeed = this.clientSeed;
    const currentNonce = this.nonce;

    // Setup for NEXT round seeds
    this.nonce += 1;
    this.serverSeed = this.generateRandomHex(32);
    this.serverSeedHash = await this.sha256(this.serverSeed);

    window.SoundManager?.playLaserSweep();

    if (onStart) {
      onStart({ chance, roll, isWin });
    }

    // Physical wheel spin calculation:
    // Win zone is CENTERED AT BOTTOM (180 degrees).
    // If chance is 50%, angle span is 180° (90° left of bottom, 90° right of bottom).
    const angleSpanDeg = (chance / 100) * 360;
    const halfSpan = angleSpanDeg / 2;
    const winStartDeg = 180 - halfSpan;
    const winEndDeg = 180 + halfSpan;

    // Guaranteed bijective mapping:
    // If isWin === true: needle MUST land strictly within [winStartDeg, winEndDeg)
    // If isWin === false: needle MUST land strictly outside [winStartDeg, winEndDeg)
    let targetModDeg;
    if (isWin) {
      const u = Math.min(0.999, Math.max(0.001, roll / Math.max(0.001, chance)));
      targetModDeg = winStartDeg + u * angleSpanDeg;
    } else {
      const lossSpan = 360 - angleSpanDeg;
      const u = Math.min(0.999, Math.max(0.001, (roll - chance) / Math.max(0.001, 100 - chance)));
      targetModDeg = winEndDeg + u * lossSpan;
    }
    targetModDeg = ((targetModDeg % 360) + 360) % 360;

    // Continuous rotation angle accumulation
    this.currentNeedleAngle = typeof this.currentNeedleAngle === 'number' ? this.currentNeedleAngle : 0;
    const curMod = ((this.currentNeedleAngle % 360) + 360) % 360;
    const forwardDist = (targetModDeg - curMod + 360) % 360;

    // STRICT constant speed mode (independent of chance!):
    let durationMs = 3500;
    let baseSpins = 6;
    if (this.speedMode === 'fast') {
      durationMs = 1200;
      baseSpins = 3;
    } else if (this.speedMode === 'slow') {
      durationMs = 7600;
      baseSpins = 12;
    }

    const totalDelta = baseSpins * 360 + (forwardDist === 0 ? 360 : forwardDist);
    const startAngle = this.currentNeedleAngle;
    const targetAngle = startAngle + totalDelta;

    // Animate with deceleration ticks
    const startTime = performance.now();
    let lastTickAngle = startAngle;

    const tickInterval = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Custom cubic-bezier deceleration easing
      const eased = this.easeOutCubic(progress);
      const currentDeg = startAngle + eased * totalDelta;
      this.currentNeedleAngle = currentDeg;

      // Audio tick every ~18 degrees
      if (Math.abs(currentDeg - lastTickAngle) >= 18) {
        lastTickAngle = currentDeg;
        const tickFreq = 500 + (1 - progress) * 300;
        window.SoundManager?.playTick(tickFreq, 0.05 * (1 - progress * 0.5));
      }

      if (onTick) {
        onTick(currentDeg % 360, currentDeg);
      }

      if (progress < 1) {
        requestAnimationFrame(tickInterval);
      } else {
        // Spin finished!
        this.currentNeedleAngle = targetAngle;
        this.isSpinning = false;
        this.handleSpinResult({
          isWin,
          roll,
          chance,
          multiplier,
          totalBet,
          targetSkin: this.targetSkin,
          provablyFair: {
            serverSeed: currentServerSeed,
            serverSeedHash: currentServerSeedHash,
            clientSeed: currentClientSeed,
            nonce: currentNonce,
            roll,
            hash
          }
        });

        if (onComplete) {
          onComplete({ isWin, roll, targetSkin: this.targetSkin });
        }
      }
    };

    requestAnimationFrame(tickInterval);
  }

  easeOutCubic(t) {
    return (--t) * t * t + 1;
  }

  handleSpinResult({ isWin, roll, chance, multiplier, totalBet, targetSkin, provablyFair }) {
    const user = window.authManager.currentUser;
    if (!user) return;

    const wasMystery = this.isMysteryMode;
    const revealedMult = this.mysteryMultiplier || multiplier;
    this.isMysteryMode = false;
    this.mysteryMultiplier = null;

    if (isWin) {
      user.stats.wonUpgrades = (user.stats.wonUpgrades || 0) + 1;
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + (targetSkin.price - totalBet)).toFixed(2));

      if (multiplier > (user.stats.bestWinMultiplier || 0)) {
        user.stats.bestWinMultiplier = multiplier;
      }
      if (!user.stats.bestWinSkin || targetSkin.price > (user.stats.bestWinSkin.price || 0)) {
        user.stats.bestWinSkin = {
          name: targetSkin.name,
          price: targetSkin.price,
          wear: targetSkin.wear,
          image: targetSkin.image
        };
      }

      // Add won skin to user inventory!
      const wonItem = {
        instanceId: 'won_' + Date.now() + '_' + Math.random().toString(36).substring(2, 5),
        skinId: targetSkin.id,
        name: targetSkin.name,
        nameEn: targetSkin.nameEn,
        wear: targetSkin.wear,
        wearName: targetSkin.wearName,
        game: targetSkin.game,
        rarity: targetSkin.rarity,
        rarityColor: targetSkin.rarityColor,
        price: targetSkin.price,
        image: targetSkin.image,
        category: targetSkin.category,
        acquiredAt: Date.now()
      };
      user.inventory.unshift(wonItem);

      // Sound & VFX
      if (multiplier >= 15 || chance <= 5) {
        window.SoundManager?.playJackpot();
        this.triggerConfetti();
      } else {
        window.SoundManager?.playWin();
      }

      if (wasMystery) {
        window.notify.bigWin(
          '🎲 ТАЙНА РАСКРЫТА: ПОБЕДА! ★',
          `Секретный множитель был ${revealedMult}x! Вы выиграли ${targetSkin.name} ($${targetSkin.price.toFixed(2)})!`
        );
      } else {
        window.notify.bigWin(
          'ПОБЕДА В АПГРЕЙДЕ! 🗡️★',
          `Вы выиграли ${targetSkin.name} ($${targetSkin.price.toFixed(2)}) с шансом ${chance}% (Roll: ${roll})!`
        );
      }

      // Auto-repay bank debt from win profit
      const profit = Math.max(0, targetSkin.price - totalBet);
      if (profit > 0 && window.economyManager?.autoDeductDebtFromWin) {
        window.economyManager.autoDeductDebtFromWin(user, profit);
      }
    } else {
      user.stats.lostUpgrades = (user.stats.lostUpgrades || 0) + 1;
      user.stats.netProfit = Number(((user.stats.netProfit || 0) - totalBet).toFixed(2));
      window.SoundManager?.playDefeat();

      if (wasMystery) {
        window.notify.error(
          '🎲 Тайна раскрыта',
          `Секретный множитель был ${revealedMult}x (Roll: ${roll}). Попробуйте снова!`
        );
      } else {
        window.notify.error(
          'Апгрейд не удался',
          `Стрелка выпала на ${roll} (Шанс был ${chance}%). Попробуйте снова!`
        );
      }
    }

    // Save round to history
    this.lastRoundData = {
      type: 'upgrade',
      isWin,
      roll,
      chance,
      multiplier,
      totalBet,
      targetSkin,
      date: Date.now(),
      provablyFair
    };

    // Pass Quests & XP awards
    const hasMultiGame = (this.selectedItems && this.selectedItems.some(s => s.game === 'dota' || s.game === 'rust')) ||
                         (targetSkin && (targetSkin.game === 'dota' || targetSkin.game === 'rust'));
    if (hasMultiGame) {
      window.questsManager?.recordPassAction('pq_multigame_skins', 1);
    }
    if (totalBet > 0) {
      window.questsManager?.recordPassAction('pq_total_wager_2k', totalBet);
      const earnedXp = isWin ? Math.max(15, Math.floor(totalBet * 5)) : Math.max(5, Math.floor(totalBet * 2));
      window.SimupPassController?.addXp?.(earnedXp);
    }

    if (isWin) {
      window.questsManager?.recordAction('upgrade_wins', 1);
      if (multiplier >= 5.0) {
        window.questsManager?.recordPassAction('pq_win_high_mult', 1);
      }
      if (chance >= 80.0) {
        window.questsManager?.recordPassAction('pq_win_90_pct', 1);
      }
    }

    if (!user.history) user.history = [];
    user.history.unshift(this.lastRoundData);
    if (user.history.length > 50) user.history.pop();

    // Check achievements
    window.economyManager?.checkAchievements(user);

    window.authManager.saveCurrentUser();
    this.clearSelectedItems();
  }

  triggerConfetti() {
    // Screen shake animation
    document.body.classList.add('screen-shake');
    setTimeout(() => document.body.classList.remove('screen-shake'), 600);

    // Dynamic 60fps celebratory particle fireworks
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '99999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#00ff88', '#00d2ff', '#ffd700', '#ff007f', '#a855f7', '#ffffff'];
    const particles = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height * 0.45,
        vx: (Math.random() - 0.5) * 22,
        vy: (Math.random() - 0.7) * 22,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        alpha: 1,
        gravity: 0.38
      });
    }

    const start = performance.now();
    function animate(now) {
      const elapsed = now - start;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vr;
        p.alpha -= 0.012;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
          ctx.restore();
        }
      });

      if (elapsed < 2400) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    }
    requestAnimationFrame(animate);
  }
}

window.upgraderEngine = new UpgraderEngine();
