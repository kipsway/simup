/* ==========================================================================
   SIMUP - PROCEDURAL WEB AUDIO SFX ENGINE
   Synthesizes clicks, ticks, victory fanfares, defeat sounds and coinflips in real-time.
   100% offline, zero external mp3 files needed, zero latency.
   ========================================================================== */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('simup_sound_muted') === 'true';
    this.volume = parseFloat(localStorage.getItem('simup_sound_volume') || '0.8');
    if (isNaN(this.volume) || this.volume < 0 || this.volume > 1) {
      this.volume = 0.8;
    }
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

  setMuted(muted) {
    this.isMuted = !!muted;
    localStorage.setItem('simup_sound_muted', this.isMuted ? 'true' : 'false');
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
    } catch (e) {
      // AudioContext policy
    }
  }

  // Tick sound when arrow passes needle or wheel rotates
  playTick(frequency = 600, volume = 0.06) {
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

  // Deep resonant explosion for hitting a bomb
  playExplosion() {
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

  play(type) {
    if (type === 'click') this.playClick();
    else if (type === 'tick') this.playTick();
    else if (type === 'win') this.playWin();
    else if (type === 'jackpot') this.playJackpot();
    else if (type === 'defeat') this.playDefeat();
    else if (type === 'gem') this.playGem();
    else if (type === 'explosion') this.playExplosion();
    else if (type === 'coin') this.playCoinToss();
    else if (type === 'success') this.playWin();
  }
}

window.SoundManager = new SoundEngine();
