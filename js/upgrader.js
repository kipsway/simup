/* ==========================================================================
   SIMUP - UPGRADER ENGINE & PROVABLY FAIR SYSTEM (BLOCK 3)
   Exact 1-to-1 casino mathematics, 60fps physics wheel, multi-upgrade,
   real-time deceleration sound ticks & cryptographic SHA-256 verification.
   ========================================================================== */

class UpgraderEngine {
  constructor() {
    this.houseEdge = 0.08; // 8% realistic edge (toggleable to 0.00)
    this.direction = 'under'; // 'under' or 'over'
    this.sectorOffset = 0; // rotation angle of sector
    this.isSpinning = false;
    this.isTurbo = false;

    // Bet configuration
    this.balanceBet = 10.00;
    this.selectedItems = []; // items from inventory sacrificed for multi-upgrade
    this.targetSkin = null; // target skin to win

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
    const arr = new Uint8Array(length);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  }

  async sha256(str) {
    const enc = new TextEncoder();
    const data = enc.encode(str);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash), b => b.toString(16).padStart(2, '0')).join('');
  }

  setHouseEdge(edge) {
    this.houseEdge = Math.max(0, Math.min(0.25, edge));
  }

  setDirection(dir) {
    this.direction = dir === 'over' ? 'over' : 'under';
  }

  setBalanceBet(val) {
    this.balanceBet = Math.max(0, Number(val) || 0);
  }

  toggleItemSelection(item) {
    const idx = this.selectedItems.findIndex(it => it.instanceId === item.instanceId);
    if (idx !== -1) {
      this.selectedItems.splice(idx, 1);
    } else {
      this.selectedItems.push(item);
    }
  }

  clearSelectedItems() {
    this.selectedItems = [];
  }

  setTargetSkin(skin) {
    this.targetSkin = skin;
  }

  getTotalBetAmount() {
    const itemsVal = this.selectedItems.reduce((s, it) => s + (it.price || 0), 0);
    return Number((this.balanceBet + itemsVal).toFixed(2));
  }

  // Exact 1-to-1 Mathematical Chance calculation
  calculateChance() {
    const totalBet = this.getTotalBetAmount();
    if (!this.targetSkin || this.targetSkin.price <= 0 || totalBet <= 0) {
      return 0;
    }

    const rawChance = (totalBet / this.targetSkin.price) * (1 - this.houseEdge) * 100;
    const clamped = Math.min(90.00, Math.max(0.05, rawChance));
    return Number(clamped.toFixed(2));
  }

  calculateMultiplier() {
    const totalBet = this.getTotalBetAmount();
    if (!this.targetSkin || totalBet <= 0) return 0;
    return Number((this.targetSkin.price / totalBet).toFixed(2));
  }

  // Quick Multiplier adjustment
  setQuickMultiplier(multiplier) {
    const totalBet = this.getTotalBetAmount();
    if (totalBet <= 0) return false;

    const desiredPrice = totalBet * multiplier;
    // Find closest skin in catalog
    const allSkins = window.catalogController?.skins || [];
    if (allSkins.length === 0) return false;

    let closest = allSkins[0];
    let minDiff = Math.abs(closest.price - desiredPrice);

    for (let i = 1; i < allSkins.length; i++) {
      const diff = Math.abs(allSkins[i].price - desiredPrice);
      if (diff < minDiff) {
        minDiff = diff;
        closest = allSkins[i];
      }
    }

    this.setTargetSkin(closest);
    return closest;
  }

  // Generate roll using Provably Fair logic
  async generateRollNumber() {
    const combo = `${this.serverSeed}:${this.clientSeed}:${this.nonce}`;
    const hash = await this.sha256(combo);

    // Convert first 8 characters of hex hash into an integer
    const sub = hash.substring(0, 8);
    const intVal = parseInt(sub, 16);
    // Range 0.00 to 100.00
    const roll = (intVal % 10000) / 100;
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

    const totalBet = this.getTotalBetAmount();
    if (totalBet <= 0) {
      window.notify.warning('Сделайте ставку', 'Укажите сумму ставки с баланса или выберите скин из инвентаря.');
      return;
    }

    if (!this.targetSkin) {
      window.notify.warning('Выберите скин', 'Выберите целевой скин в каталоге ниже.');
      return;
    }

    if (this.balanceBet > user.balance) {
      window.notify.error('Недостаточно средств', `Ваш баланс $${user.balance.toFixed(2)}, ставка $${this.balanceBet.toFixed(2)}.`);
      return;
    }

    // Verify sacrificed items are still in user inventory
    for (const it of this.selectedItems) {
      const exists = user.inventory.some(invItem => invItem.instanceId === it.instanceId);
      if (!exists) {
        window.notify.error('Ошибка предметов', `Предмет ${it.name} отсутствует в инвентаре.`);
        return;
      }
    }

    this.isSpinning = true;

    // 1. Deduct wager immediately
    if (this.balanceBet > 0) {
      user.balance = Number((user.balance - this.balanceBet).toFixed(2));
    }
    // Remove sacrificed items from inventory
    if (this.selectedItems.length > 0) {
      const sacrificedIds = this.selectedItems.map(it => it.instanceId);
      user.inventory = user.inventory.filter(it => !sacrificedIds.includes(it.instanceId));
    }

    user.stats.totalUpgrades = (user.stats.totalUpgrades || 0) + 1;
    user.stats.totalWagered = Number(((user.stats.totalWagered || 0) + totalBet).toFixed(2));
    user.stats.maxSingleBet = Math.max(user.stats.maxSingleBet || 0, totalBet);

    window.authManager.saveCurrentUser();

    // 2. Compute winning conditions & Roll
    const chance = this.calculateChance();
    const multiplier = this.calculateMultiplier();
    const { roll, hash } = await this.generateRollNumber();

    // Determine win:
    // If direction is UNDER: roll <= chance is WIN
    // If direction is OVER: roll >= (100 - chance) is WIN
    let isWin = false;
    if (this.direction === 'under') {
      isWin = roll <= chance;
    } else {
      isWin = roll >= (100 - chance);
    }

    const currentServerSeed = this.serverSeed;
    const currentServerSeedHash = this.serverSeedHash;
    const currentClientSeed = this.clientSeed;
    const currentNonce = this.nonce;

    // Setup for NEXT round seeds
    this.nonce += 1;
    this.serverSeed = this.generateRandomHex(32);
    this.serverSeedHash = await this.sha256(this.serverSeed);

    if (onStart) {
      onStart({ chance, roll, isWin });
    }

    // Physical wheel spin calculation:
    // 0.00 to 100.00 maps to 0 to 360 degrees
    const rollDegree = (roll / 100) * 360;
    const fullSpins = this.isTurbo ? (2 + Math.floor(Math.random() * 2)) : (5 + Math.floor(Math.random() * 3));
    const totalRotationDeg = fullSpins * 360 + rollDegree;
    const durationMs = this.isTurbo ? 1250 : 4600; // Turbo: 1.25s vs Normal: 4.6s

    // Animate with deceleration ticks
    const startTime = performance.now();
    let lastTickAngle = 0;

    const tickInterval = () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);

      // Custom cubic-bezier deceleration easing
      const eased = this.easeOutCubic(progress);
      const currentDeg = eased * totalRotationDeg;

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

      window.notify.bigWin(
        'ПОБЕДА В АПГРЕЙДЕ! 🗡️★',
        `Вы выиграли ${targetSkin.name} ($${targetSkin.price.toFixed(2)}) с шансом ${chance}% (Roll: ${roll})!`
      );
    } else {
      user.stats.lostUpgrades = (user.stats.lostUpgrades || 0) + 1;
      user.stats.netProfit = Number(((user.stats.netProfit || 0) - totalBet).toFixed(2));
      window.SoundManager?.playDefeat();

      window.notify.error(
        'Апгрейд не удался',
        `Стрелка выпала на ${roll} (Шанс был ${chance}%). Попробуйте снова!`
      );
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
