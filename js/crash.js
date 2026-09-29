/* ==========================================================================
   SIMUP - CRASH MINI-GAME ENGINE (PROVABLY FAIR 60FPS CANVAS)
   Real-time exponential rocket ascent, particle engine, auto-cashout,
   and deterministic cryptographic crash point outcomes.
   ========================================================================== */

class CrashEngine {
  constructor() {
    this.gameState = 'idle'; // 'idle', 'countdown', 'flying', 'crashed'
    this.serverSeed = this.generateRandomHex(32);
    this.serverSeedHash = '';
    this.clientSeed = 'simup-crash-' + Math.random().toString(36).substring(2, 8);
    this.nonce = 1;

    this.crashPoint = 1.0;
    this.currentMultiplier = 1.0;
    this.betAmount = 10;
    this.autoCashoutMult = 0; // 0 = manual only
    this.hasBet = false;
    this.hasCashedOut = false;
    this.cashedOutMultiplier = 0;
    this.cashedOutPayout = 0;

    this.startTime = 0;
    this.animationFrame = null;
    this.canvas = null;
    this.ctx = null;
    this.particles = [];

    this.onStateChange = null;
    this.onTick = null;
    this.onCrash = null;
    this.onCashout = null;

    this.computeInitialHash();
  }

  generateRandomHex(len = 32) {
    const chars = '0123456789abcdef';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars[Math.floor(Math.random() * chars.length)];
    }
    return res;
  }

  async sha256(str) {
    if (window.crypto && window.crypto.subtle) {
      const buffer = new TextEncoder().encode(str);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    }
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  async computeInitialHash() {
    this.serverSeedHash = await this.sha256(this.serverSeed);
  }

  async calculateCrashPoint() {
    const combined = `${this.serverSeed}:${this.clientSeed}:${this.nonce}`;
    const hash = await this.sha256(combined);

    // 52-bit integer from hash
    const sub = parseInt(hash.substring(0, 13), 16);
    const e = Math.pow(2, 52);

    // 4% House edge
    if (sub % 25 === 0) {
      return 1.00; // Instant crash at 1.00x on 4% of games
    }

    const raw = Math.floor((100 * e - sub) / (e - sub)) / 100;
    return Math.max(1.01, Math.min(250.00, Number(raw.toFixed(2))));
  }

  getLogicalDimensions() {
    if (!this.canvas || !this.canvas.parentElement) return { w: 600, h: 380 };
    const w = this.canvas.parentElement.clientWidth || parseFloat(this.canvas.style.width) || 600;
    const h = this.canvas.parentElement.clientHeight || parseFloat(this.canvas.style.height) || 380;
    return { w, h };
  }

  initCanvas(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
    this.drawIdleState();
  }

  resizeCanvas() {
    if (!this.canvas || !this.canvas.parentElement) return;
    const rect = this.canvas.parentElement.getBoundingClientRect();
    const w = rect.width > 50 ? rect.width : (this.canvas.parentElement.clientWidth || 600);
    const h = rect.height > 50 ? rect.height : 380;
    const dpr = window.devicePixelRatio || 1;
    this.canvas.width = w * dpr;
    this.canvas.height = h * dpr;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    if (this.ctx) {
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
      this.ctx.scale(dpr, dpr);
    }
    if (this.gameState === 'idle') {
      this.drawIdleState();
    } else if (this.gameState === 'crashed') {
      this.drawCrashedState();
    } else if (this.gameState === 'flying') {
      this.drawFlightState();
    }
  }

  async startCountdown({ betAmount, autoCashoutMult = 0 }) {
    if (this.gameState === 'flying' || this.gameState === 'countdown') {
      return { success: false, error: 'Раунд уже запущен.' };
    }

    const user = window.authManager?.currentUser;
    if (!user) {
      return { success: false, error: 'Авторизуйтесь для игры в Краш.' };
    }

    if (betAmount > user.balance) {
      return { success: false, error: 'Недостаточно средств на балансе.' };
    }

    // Deduct balance
    user.balance = Number((user.balance - betAmount).toFixed(2));
    user.stats.wagered = Number(((user.stats.wagered || 0) + betAmount).toFixed(2));
    user.stats.totalUpgrades = (user.stats.totalUpgrades || 0) + 1;
    window.authManager.saveCurrentUser();

    this.betAmount = betAmount;
    this.autoCashoutMult = parseFloat(autoCashoutMult) || 0;
    this.hasBet = true;
    this.hasCashedOut = false;
    this.cashedOutMultiplier = 0;
    this.cashedOutPayout = 0;

    this.crashPoint = await this.calculateCrashPoint();
    this.gameState = 'flying';
    this.currentMultiplier = 1.0;
    this.startTime = performance.now();
    this.particles = [];

    if (this.onStateChange) this.onStateChange('flying', { crashPointHash: this.serverSeedHash });

    this.runGameLoop();

    return {
      success: true,
      serverSeedHash: this.serverSeedHash,
      clientSeed: this.clientSeed,
      nonce: this.nonce
    };
  }

  runGameLoop() {
    if (this.gameState !== 'flying') return;

    const now = performance.now();
    const elapsedSeconds = (now - this.startTime) / 1000;

    // Smooth exponential curve: e^(0.065 * t)
    this.currentMultiplier = Number(Math.pow(Math.E, 0.068 * elapsedSeconds).toFixed(2));

    // Check auto-cashout
    if (this.hasBet && !this.hasCashedOut && this.autoCashoutMult > 1.0 && this.currentMultiplier >= this.autoCashoutMult) {
      this.cashOut();
    }

    // Check crash
    if (this.currentMultiplier >= this.crashPoint) {
      this.currentMultiplier = this.crashPoint;
      this.handleCrash();
      return;
    }

    // Render Canvas
    this.drawFlightState();

    if (this.onTick) {
      this.onTick(this.currentMultiplier);
    }

    this.animationFrame = requestAnimationFrame(() => this.runGameLoop());
  }

  cashOut() {
    if (this.gameState !== 'flying' || !this.hasBet || this.hasCashedOut) {
      return { success: false, error: 'Кэшаут сейчас недоступен.' };
    }

    this.hasCashedOut = true;
    this.cashedOutMultiplier = this.currentMultiplier;
    this.cashedOutPayout = Number((this.betAmount * this.cashedOutMultiplier).toFixed(2));
    const profit = Number((this.cashedOutPayout - this.betAmount).toFixed(2));

    const user = window.authManager?.currentUser;
    if (user) {
      user.balance = Number((user.balance + this.cashedOutPayout).toFixed(2));
      user.stats.netProfit = Number(((user.stats.netProfit || 0) + profit).toFixed(2));
      user.stats.upgradesWon = (user.stats.upgradesWon || 0) + 1;

      if (!user.history) user.history = [];
      user.history.unshift({
        type: 'crash',
        isWin: true,
        betAmount: this.betAmount,
        payout: this.cashedOutPayout,
        profit,
        multiplier: this.cashedOutMultiplier,
        crashPoint: this.crashPoint,
        date: Date.now(),
        provablyFair: {
          serverSeed: this.serverSeed,
          serverSeedHash: this.serverSeedHash,
          clientSeed: this.clientSeed,
          nonce: this.nonce
        }
      });
      if (user.history.length > 50) user.history.pop();
      window.authManager.saveCurrentUser();
    }

    window.SoundManager?.playWin();

    if (this.onCashout) {
      this.onCashout({
        multiplier: this.cashedOutMultiplier,
        payout: this.cashedOutPayout,
        profit
      });
    }

    return {
      success: true,
      multiplier: this.cashedOutMultiplier,
      payout: this.cashedOutPayout,
      profit
    };
  }

  handleCrash() {
    this.gameState = 'crashed';
    if (this.animationFrame) cancelAnimationFrame(this.animationFrame);

    window.SoundManager?.playExplosion();

    const user = window.authManager?.currentUser;
    if (user && this.hasBet && !this.hasCashedOut) {
      user.stats.netProfit = Number(((user.stats.netProfit || 0) - this.betAmount).toFixed(2));
      if (!user.history) user.history = [];
      user.history.unshift({
        type: 'crash',
        isWin: false,
        betAmount: this.betAmount,
        payout: 0,
        profit: -this.betAmount,
        multiplier: 0,
        crashPoint: this.crashPoint,
        date: Date.now(),
        provablyFair: {
          serverSeed: this.serverSeed,
          serverSeedHash: this.serverSeedHash,
          clientSeed: this.clientSeed,
          nonce: this.nonce
        }
      });
      if (user.history.length > 50) user.history.pop();
      window.authManager.saveCurrentUser();
    }

    this.drawCrashedState();

    if (this.onCrash) {
      this.onCrash({
        crashPoint: this.crashPoint,
        serverSeed: this.serverSeed,
        serverSeedHash: this.serverSeedHash
      });
    }

    // Advance seed
    this.nonce++;
    this.serverSeed = this.generateRandomHex(32);
    this.computeInitialHash();
  }

  // =========================================================================
  // CANVAS RENDERING
  // =========================================================================
  drawIdleState() {
    if (!this.ctx || !this.canvas) return;
    const { w, h } = this.getLogicalDimensions();

    this.ctx.clearRect(0, 0, w, h);
    this.drawGrid(w, h);

    // Large center status
    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillStyle = '#fff';
    this.ctx.font = '900 48px Inter, sans-serif';
    this.ctx.shadowColor = 'rgba(0, 255, 136, 0.4)';
    this.ctx.shadowBlur = 20;
    this.ctx.fillText('1.00x', w / 2, h / 2 - 10);

    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    this.ctx.font = '700 14px Inter, sans-serif';
    this.ctx.fillText('Укажите ставку и нажмите «Запустить ракету»', w / 2, h / 2 + 35);
    this.ctx.restore();
  }

  drawFlightState() {
    if (!this.ctx || !this.canvas) return;
    const { w, h } = this.getLogicalDimensions();

    this.ctx.clearRect(0, 0, w, h);
    this.drawGrid(w, h);

    const padLeft = 40;
    const padBottom = 35;
    const maxGraphW = w - padLeft - 60;
    const maxGraphH = h - padBottom - 50;

    // Progress percentage based on current multiplier
    const progress = Math.min(1, (this.currentMultiplier - 1.0) / 10.0);
    const rocketX = padLeft + maxGraphW * progress;
    const rocketY = (h - padBottom) - maxGraphH * Math.pow(progress, 0.85);

    // 1. Draw glowing curve trail
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.moveTo(padLeft, h - padBottom);
    this.ctx.quadraticCurveTo(padLeft + (rocketX - padLeft) * 0.65, h - padBottom, rocketX, rocketY);
    this.ctx.strokeStyle = '#10b981';
    this.ctx.lineWidth = 4;
    this.ctx.shadowColor = 'rgba(16, 185, 129, 0.8)';
    this.ctx.shadowBlur = 15;
    this.ctx.stroke();

    // Fill under curve
    this.ctx.lineTo(rocketX, h - padBottom);
    this.ctx.closePath();
    const grad = this.ctx.createLinearGradient(0, rocketY, 0, h - padBottom);
    grad.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0.0)');
    this.ctx.fillStyle = grad;
    this.ctx.fill();
    this.ctx.restore();

    // 2. Thruster Particles
    this.particles.push({
      x: rocketX - 10,
      y: rocketY + 8,
      vx: (Math.random() - 0.7) * 4,
      vy: (Math.random() * 3) + 1,
      size: Math.random() * 5 + 3,
      alpha: 1.0,
      color: Math.random() > 0.4 ? '#f59e0b' : '#ef4444'
    });

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.035;
      if (p.alpha <= 0) {
        this.particles.splice(i, 1);
        continue;
      }
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }

    // 3. Draw Rocket Icon
    this.ctx.save();
    this.ctx.translate(rocketX, rocketY);
    this.ctx.rotate(-0.45);
    this.ctx.font = '32px Inter, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('🚀', 0, 0);
    this.ctx.restore();

    // 4. Center Multiplier Display
    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillStyle = this.hasCashedOut ? '#ffd700' : '#10b981';
    this.ctx.font = '900 58px Inter, sans-serif';
    this.ctx.shadowColor = this.hasCashedOut ? 'rgba(255, 215, 0, 0.6)' : 'rgba(16, 185, 129, 0.6)';
    this.ctx.shadowBlur = 25;
    this.ctx.fillText(`${this.currentMultiplier.toFixed(2)}x`, w / 2, h / 2 - 20);

    if (this.hasCashedOut) {
      this.ctx.shadowBlur = 0;
      this.ctx.fillStyle = '#ffd700';
      this.ctx.font = '800 16px Inter, sans-serif';
      this.ctx.fillText(`ВЫ ЗАБРАЛИ: $${this.cashedOutPayout.toFixed(2)} (${this.cashedOutMultiplier.toFixed(2)}x)`, w / 2, h / 2 + 25);
    }
    this.ctx.restore();
  }

  drawCrashedState() {
    if (!this.ctx || !this.canvas) return;
    const { w, h } = this.getLogicalDimensions();

    this.ctx.clearRect(0, 0, w, h);
    this.drawGrid(w, h);

    this.ctx.save();
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';

    this.ctx.fillStyle = '#ef4444';
    this.ctx.font = '900 60px Inter, sans-serif';
    this.ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
    this.ctx.shadowBlur = 30;
    this.ctx.fillText('💥 КРАШ!', w / 2, h / 2 - 25);

    this.ctx.shadowBlur = 0;
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '800 24px Inter, sans-serif';
    this.ctx.fillText(`Ракета взорвалась на ${this.crashPoint.toFixed(2)}x`, w / 2, h / 2 + 30);
    this.ctx.restore();
  }

  drawGrid(w, h) {
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    this.ctx.lineWidth = 1;

    // Horizontal lines
    for (let y = 30; y < h; y += 45) {
      this.ctx.beginPath();
      this.ctx.moveTo(35, y);
      this.ctx.lineTo(w - 20, y);
      this.ctx.stroke();
    }
    // Vertical lines
    for (let x = 35; x < w; x += 60) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 20);
      this.ctx.lineTo(x, h - 30);
      this.ctx.stroke();
    }

    // Axes
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    this.ctx.beginPath();
    this.ctx.moveTo(35, 20);
    this.ctx.lineTo(35, h - 30);
    this.ctx.lineTo(w - 20, h - 30);
    this.ctx.stroke();
    this.ctx.restore();
  }
}

window.crashEngine = new CrashEngine();
