/* ==========================================================================
   SIMUP - LUCKY WHEEL OF FORTUNE (DAILY BONUS ENGINE)
   Interactive 60fps canvas wheel with 8 sectors, realistic deceleration,
   tick sounds, balance payouts, rare skin drops, and 24h cooldown timer.
   ========================================================================== */

class LuckyWheelManager {
  constructor() {
    this.sectors = [
      { id: 1, label: '$10.00', sub: 'Баланс', type: 'balance', value: 10, weight: 30, color: '#10b981', textColor: '#042f2e' },
      { id: 2, label: '$25.00', sub: 'Баланс', type: 'balance', value: 25, weight: 24, color: '#06b6d4', textColor: '#083344' },
      { id: 3, label: '$50.00', sub: 'Баланс', type: 'balance', value: 50, weight: 18, color: '#8b5cf6', textColor: '#ffffff' },
      { id: 4, label: '$100.00', sub: 'Баланс', type: 'balance', value: 100, weight: 12, color: '#ec4899', textColor: '#ffffff' },
      { id: 5, label: '🗡️ CS2 Скин', sub: 'Тайное', type: 'skin', game: 'cs2', weight: 8, color: '#f59e0b', textColor: '#451a03' },
      { id: 6, label: '$250.00', sub: 'Баланс', type: 'balance', value: 250, weight: 4, color: '#f97316', textColor: '#ffffff' },
      { id: 7, label: '🛡️ Dota Скин', sub: 'Immortal', type: 'skin', game: 'dota2', weight: 3, color: '#3b82f6', textColor: '#ffffff' },
      { id: 8, label: '👑 $500 ДЖЕКПОТ', sub: 'СУПЕРПРИЗ', type: 'balance', value: 500, weight: 1, color: '#ef4444', textColor: '#ffffff' }
    ];

    this.numSectors = this.sectors.length;
    this.arc = (2 * Math.PI) / this.numSectors;
    this.currentRotation = 0;
    this.isSpinning = false;
    this.canvas = null;
    this.ctx = null;
    this.cooldownMs = 24 * 60 * 60 * 1000; // 24 hours
  }

  init(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.drawWheel();
  }

  getCooldownRemaining() {
    const user = window.authManager?.currentUser;
    if (!user) return { canSpin: false, remainingMs: 0, text: 'Требуется вход' };
    
    const lastSpin = user.lastLuckyWheelSpin || 0;
    const now = Date.now();
    const diff = now - lastSpin;

    if (diff >= this.cooldownMs) {
      return { canSpin: true, remainingMs: 0, text: 'Бесплатный спин доступен!' };
    }

    const remaining = this.cooldownMs - diff;
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const mins = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((remaining % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, '0');
    return {
      canSpin: false,
      remainingMs: remaining,
      text: `След. спин через: ${pad(hours)}:${pad(mins)}:${pad(secs)}`
    };
  }

  drawWheel(rotation = this.currentRotation) {
    if (!this.ctx || !this.canvas) return;
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const radius = width / 2 - 14;
    const cx = width / 2;
    const cy = height / 2;

    ctx.clearRect(0, 0, width, height);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    // Outer Glow Ring
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, 0, 2 * Math.PI);
    ctx.fillStyle = '#0f172a';
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
    ctx.stroke();

    // Draw Sectors
    for (let i = 0; i < this.numSectors; i++) {
      const angle = i * this.arc;
      const sec = this.sectors[i];

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, angle, angle + this.arc);
      ctx.closePath();

      ctx.fillStyle = sec.color;
      ctx.fill();

      ctx.lineWidth = 1.5;
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.35)';
      ctx.stroke();

      // Sector Content
      ctx.save();
      ctx.rotate(angle + this.arc / 2);
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      // Sector Title
      ctx.font = 'bold 13.5px "Inter", sans-serif';
      ctx.fillStyle = sec.textColor;
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4;
      ctx.fillText(sec.label, radius - 20, 0);

      // Sector Subtitle
      ctx.font = '600 9.5px "Inter", sans-serif';
      ctx.fillStyle = sec.textColor;
      ctx.shadowBlur = 0;
      ctx.fillText(sec.sub, radius - 20, 14);

      ctx.restore();
    }

    // Outer Decorative Studs / Lights
    for (let i = 0; i < this.numSectors * 2; i++) {
      const dotAngle = (i * Math.PI) / this.numSectors;
      const dx = (radius + 4) * Math.cos(dotAngle);
      const dy = (radius + 4) * Math.sin(dotAngle);

      ctx.beginPath();
      ctx.arc(dx, dy, 2.5, 0, 2 * Math.PI);
      ctx.fillStyle = i % 2 === 0 ? '#ffd700' : '#ffffff';
      ctx.fill();
    }

    // Center Hub
    ctx.beginPath();
    ctx.arc(0, 0, 32, 0, 2 * Math.PI);
    const hubGrad = ctx.createRadialGradient(0, 0, 5, 0, 0, 32);
    hubGrad.addColorStop(0, '#ffd700');
    hubGrad.addColorStop(0.7, '#d97706');
    hubGrad.addColorStop(1, '#78350f');
    ctx.fillStyle = hubGrad;
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Center Emoji/Icon
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('⚡', 0, 1);

    ctx.restore();
  }

  spin() {
    if (this.isSpinning) return;
    const user = window.authManager?.currentUser;
    if (!user) {
      window.notify.warning('Вход', 'Авторизуйтесь, чтобы крутить Колесо Фортуны.');
      return;
    }

    const cd = this.getCooldownRemaining();
    if (!cd.canSpin) {
      window.notify.info('Колесо Фортуны', cd.text);
      return;
    }

    this.isSpinning = true;
    window.SoundManager?.playClick();

    // 1. Pick winner with weighted luck
    const totalWeight = this.sectors.reduce((s, it) => s + it.weight, 0);
    let rand = Math.random() * totalWeight;
    let winningIndex = 0;

    for (let i = 0; i < this.sectors.length; i++) {
      if (rand < this.sectors[i].weight) {
        winningIndex = i;
        break;
      }
      rand -= this.sectors[i].weight;
    }

    const winningSector = this.sectors[winningIndex];

    // Pointer is at TOP: 270 degrees = 1.5 * Math.PI
    // Angle of sector i center is i * arc + arc/2
    // We want: (rotation + sectorAngle) % (2*PI) = 1.5 * Math.PI
    const pointerAngle = 1.5 * Math.PI;
    const sectorCenter = winningIndex * this.arc + this.arc / 2;
    
    // Add small random jitter inside sector (-30% to +30% of arc)
    const jitter = (Math.random() - 0.5) * (this.arc * 0.6);
    let targetAngle = pointerAngle - sectorCenter + jitter;

    // Normalize target angle
    while (targetAngle < 0) targetAngle += 2 * Math.PI;

    // Add 5 to 7 full revolutions
    const fullSpins = 6 * (2 * Math.PI);
    const startRotation = this.currentRotation % (2 * Math.PI);
    const totalDelta = fullSpins + (targetAngle - startRotation + (2 * Math.PI)) % (2 * Math.PI);

    const duration = 4800; // 4.8 seconds
    const startTime = performance.now();
    let lastSectorPassed = -1;

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth ease-out cubic deceleration
      const easeOut = 1 - Math.pow(1 - progress, 3.5);
      const currentAngle = startRotation + totalDelta * easeOut;
      this.currentRotation = currentAngle;
      this.drawWheel(currentAngle);

      // Play click sounds on sector boundaries
      const normalizedAngle = (pointerAngle - (currentAngle % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
      const currentSectorIdx = Math.floor(normalizedAngle / this.arc);
      if (currentSectorIdx !== lastSectorPassed) {
        lastSectorPassed = currentSectorIdx;
        window.SoundManager?.playTick();
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.isSpinning = false;
        this.currentRotation = startRotation + totalDelta;
        this.drawWheel(this.currentRotation);
        this.handleSpinWin(winningSector);
      }
    };

    requestAnimationFrame(animate);
  }

  handleSpinWin(sector) {
    const user = window.authManager?.currentUser;
    if (!user) return;

    user.lastLuckyWheelSpin = Date.now();

    if (sector.type === 'balance') {
      user.balance = Number((user.balance + sector.value).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + sector.value).toFixed(2));

      if (sector.value >= 250) {
        window.SoundManager?.playJackpot();
        window.upgraderEngine?.triggerConfetti();
        window.notify.bigWin('🎉 ДЖЕКПОТ КОЛЕСА ФОРТУНЫ!', `Вы выиграли невероятные $${sector.value.toFixed(2)} на баланс!`);
      } else {
        window.SoundManager?.playWin();
        window.notify.success('Колесо Фортуны', `Вы выиграли $${sector.value.toFixed(2)} на баланс!`);
      }

      if (!user.history) user.history = [];
      user.history.unshift({
        type: 'lucky_wheel',
        reward: `$${sector.value.toFixed(2)}`,
        profit: sector.value,
        date: Date.now()
      });
    } else if (sector.type === 'skin') {
      const allSkins = window.catalogController?.skins || [];
      const gameSkins = allSkins.filter(s => s.game === sector.game && s.price >= 20 && s.price <= 250);
      const candidates = gameSkins.length > 0 ? gameSkins : allSkins;
      const skin = candidates[Math.floor(Math.random() * candidates.length)];

      const wonItem = {
        instanceId: 'wheel_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        skinId: skin.id,
        name: skin.name,
        nameEn: skin.nameEn,
        wear: skin.wear,
        wearName: skin.wearName,
        game: skin.game,
        rarity: skin.rarity,
        rarityColor: skin.rarityColor,
        price: skin.price,
        image: skin.image,
        category: skin.category,
        acquiredAt: Date.now()
      };

      user.inventory.unshift(wonItem);
      window.SoundManager?.playJackpot();
      window.upgraderEngine?.triggerConfetti();
      window.notify.bigWin('🎁 ВЫИГРЫШ СКИНА В КОЛЕСЕ!', `Вы получили ${wonItem.name} стоимостью $${wonItem.price.toFixed(2)}!`);

      if (!user.history) user.history = [];
      user.history.unshift({
        type: 'lucky_wheel',
        reward: wonItem.name,
        winner: wonItem,
        profit: wonItem.price,
        date: Date.now()
      });

      // Open inspector modal for this skin
      window.openSkinInspectModal?.(wonItem, { username: user.username, type: 'lucky_wheel' });
    }

    if (user.history.length > 50) user.history.pop();
    window.authManager?.saveCurrentUser();
    window.questsManager?.recordAction('spin_wheel', 1);
    if (window.updateQuestsBadge) window.updateQuestsBadge();

    // Update UI
    this.updateModalState();
  }

  updateModalState() {
    const cd = this.getCooldownRemaining();
    const btnSpin = document.getElementById('btn-spin-lucky-wheel');
    const timerText = document.getElementById('lucky-wheel-timer-text');

    if (timerText) {
      timerText.textContent = cd.text;
      timerText.style.color = cd.canSpin ? '#10b981' : '#f59e0b';
    }

    if (btnSpin) {
      btnSpin.disabled = !cd.canSpin || this.isSpinning;
      btnSpin.textContent = this.isSpinning ? '🎡 Вращение...' : (cd.canSpin ? 'Крутить колесо (Бесплатно)' : 'Ожидание таймера');
    }
  }
}

window.luckyWheelManager = new LuckyWheelManager();
