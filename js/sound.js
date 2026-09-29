/* ==========================================================================
   SIMUP - PROCEDURAL WEB AUDIO SFX & MOBILE HAPTICS ENGINE - BLOCK 8
   Synthesizes clicks, ticks, victory fanfares, defeat sounds, coinflips,
   bank chimes and mobile vibration haptics in real-time.
   100% offline, zero external mp3 files needed, zero latency.
   ========================================================================== */

class HapticsEngine {
  constructor() {
    this.enabled = localStorage.getItem('simup_haptics_enabled') !== 'false';
  }

  setEnabled(val) {
    this.enabled = Boolean(val);
    localStorage.setItem('simup_haptics_enabled', this.enabled ? 'true' : 'false');
  }

  vibrate(pattern) {
    if (!this.enabled) return;
    if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        // Ignored if browser blocks background vibration
      }
    }
  }

  // Quick light tap (buttons, tabs, chips)
  tap() {
    this.vibrate(12);
  }

  // Micro pulse for wheel ticks and reel deceleration
  tick() {
    this.vibrate(6);
  }

  // Double pulse for standard win
  win() {
    this.vibrate([35, 45, 60]);
  }

  // Celebratory rhythmic crescendo for jackpots / knives / coverts
  jackpot() {
    this.vibrate([50, 60, 50, 60, 100, 80, 150]);
  }

  // Low single thud on defeat
  defeat() {
    this.vibrate(120);
  }

  // Heavy double impact on mine explosion or crash
  explosion() {
    this.vibrate([160, 50, 80]);
  }

  // Double metallic pulse on coin toss
  coin() {
    this.vibrate([20, 30, 20]);
  }
}

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('simup_sound_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('simup_sound_volume') || '0.8');
    if (isNaN(this.volume) || this.volume < 0 || this.volume > 1) {
      this.volume = 0.8;
    }
    this.haptics = new HapticsEngine();
    this.activeHumNode = null;
    this.activeHumGain = null;
  }

  getAudioContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  unlockAudio() {
    const ctx = this.getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  setMuted(muted) {
    this.isMuted = !!muted;
    localStorage.setItem('simup_sound_muted', this.isMuted ? 'true' : 'false');
    if (this.isMuted) {
      this.stopCrashHum();
    }
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, parseFloat(volume) || 0));
    localStorage.setItem('simup_sound_volume', this.volume.toFixed(2));
    if (this.volume === 0) {
      this.setMuted(true);
    } else if (this.isMuted && this.volume > 0) {
      this.setMuted(false);
    }
  }

  getEffectiveVolume(baseVol) {
    if (this.isMuted) return 0;
    return Math.max(0.0001, baseVol * this.volume);
  }

  // Quick mechanical click for buttons
  playClick() {
    this.haptics.tap();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vol = this.getEffectiveVolume(0.08);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.04);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  // Tick sound when arrow passes needle or reel rotates
  playTick(frequency = 600, volume = 0.06) {
    this.haptics.tick();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vol = this.getEffectiveVolume(volume);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.035);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {}
  }

  // Victory fanfare with pleasant harmonic chords
  playWin() {
    this.haptics.win();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      const vol = this.getEffectiveVolume(0.12);
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + i * 0.09);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime + i * 0.09);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + i * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.09 + 0.45);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + i * 0.09);
        osc.stop(ctx.currentTime + i * 0.09 + 0.45);
      });
    } catch (e) {}
  }

  // High-tier jackpot win (knives, covert, huge multipliers)
  playJackpot() {
    this.haptics.jackpot();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const chords = [
        [523.25, 659.25, 783.99],
        [587.33, 739.99, 880.00],
        [659.25, 830.61, 987.77],
        [783.99, 987.77, 1174.66, 1567.98]
      ];
      const vol = this.getEffectiveVolume(0.09);

      chords.forEach((chord, step) => {
        chord.forEach(freq => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();

          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + step * 0.12);

          gain.gain.setValueAtTime(0.0001, ctx.currentTime + step * 0.12);
          gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + step * 0.12 + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + step * 0.12 + 0.6);

          osc.connect(gain);
          gain.connect(ctx.destination);

          osc.start(ctx.currentTime + step * 0.12);
          osc.stop(ctx.currentTime + step * 0.12 + 0.6);
        });
      });
    } catch (e) {}
  }

  // Defeat sound: descending minor pitch
  playDefeat() {
    this.haptics.defeat();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vol = this.getEffectiveVolume(0.07);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(320, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(140, ctx.currentTime + 0.35);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch (e) {}
  }

  // Crystal bell chime for uncovering diamonds in Mines
  playGem(step = 1) {
    this.haptics.tap();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const baseFreq = 587.33; // D5
      const noteFreq = baseFreq * Math.pow(1.059463, (step % 20) * 1.5);
      const vol = this.getEffectiveVolume(0.12);

      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(noteFreq, ctx.currentTime);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(noteFreq * 2, ctx.currentTime);

      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.45);

      osc.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 0.45);
      osc2.stop(ctx.currentTime + 0.45);
    } catch (e) {}
  }

  // Deep resonant explosion for hitting a bomb or crash
  playExplosion() {
    this.haptics.explosion();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vol = this.getEffectiveVolume(0.22);

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(26, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.65);
    } catch (e) {}
  }

  // High metallic chime for coin flip spinning & landing
  playCoinToss() {
    this.haptics.coin();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vol = this.getEffectiveVolume(0.1);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(2400, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
  }

  // Cash register / bank transaction chime
  playCash() {
    this.haptics.tap();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const notes = [1318.51, 1661.22]; // E6, G#6
      const vol = this.getEffectiveVolume(0.11);
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.07);

        gain.gain.setValueAtTime(0.0001, ctx.currentTime + idx * 0.07);
        gain.gain.linearRampToValueAtTime(vol, ctx.currentTime + idx * 0.07 + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime + idx * 0.07);
        osc.stop(ctx.currentTime + idx * 0.07 + 0.35);
      });
    } catch (e) {}
  }

  // Futuristic sweep for Upgrader spin start
  playLaserSweep() {
    this.haptics.tap();
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const vol = this.getEffectiveVolume(0.09);

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.25);

      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.28);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.28);
    } catch (e) {}
  }

  // Continuous ascending hum for Crash rocket multiplier
  startCrashHum(multiplier = 1.0) {
    if (this.isMuted || this.volume <= 0) return;
    const ctx = this.getAudioContext();
    if (!ctx) return;

    try {
      if (!this.activeHumNode) {
        this.activeHumNode = ctx.createOscillator();
        this.activeHumGain = ctx.createGain();
        this.activeHumNode.type = 'sawtooth';

        const vol = this.getEffectiveVolume(0.035);
        this.activeHumGain.gain.setValueAtTime(vol, ctx.currentTime);

        this.activeHumNode.connect(this.activeHumGain);
        this.activeHumGain.connect(ctx.destination);
        this.activeHumNode.start();
      }

      const freq = Math.min(880, 110 + (multiplier - 1) * 60);
      this.activeHumNode.frequency.setValueAtTime(freq, ctx.currentTime);
    } catch (e) {}
  }

  stopCrashHum() {
    if (this.activeHumNode) {
      try {
        this.activeHumGain?.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);
        setTimeout(() => {
          try {
            this.activeHumNode?.stop();
            this.activeHumNode?.disconnect();
          } catch (e) {}
          this.activeHumNode = null;
          this.activeHumGain = null;
        }, 60);
      } catch (e) {
        this.activeHumNode = null;
        this.activeHumGain = null;
      }
    }
  }

  play(type) {
    if (type === 'click') this.playClick();
    else if (type === 'tick') this.playTick();
    else if (type === 'win') this.playWin();
    else if (type === 'jackpot') this.playJackpot();
    else if (type === 'defeat') this.playDefeat();
    else if (type === 'gem') this.playGem();
    else if (type === 'explosion') this.playExplosion();
    else if (type === 'coin') this.playCoinToss();
    else if (type === 'cash') this.playCash();
    else if (type === 'laser') this.playLaserSweep();
    else if (type === 'success') this.playWin();
  }
}

// Global initialization
if (typeof window !== 'undefined') {
  window.SoundManager = new SoundEngine();
  window.haptics = window.SoundManager.haptics;

  // Auto-unlock AudioContext on first user gesture
  if (typeof window.addEventListener === 'function') {
    ['click', 'touchstart', 'keydown'].forEach(evt => {
      window.addEventListener(evt, () => {
        window.SoundManager?.unlockAudio();
      }, { once: true, passive: true });
    });
  }
}
