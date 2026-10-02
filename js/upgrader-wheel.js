/* ==========================================================================
   SIMUP 3.0 - AAA ESPORTS UPGRADER WHEEL CANVAS RENDERER
   Mechanical circular calibration, double metal rim, cherry win sector with microgrid,
   Retina/HiDPI crisp scaling, and 120 FPS hardware acceleration.
   ========================================================================== */

(function(window, document) {
  'use strict';

  class UpgraderWheelRenderer {
    constructor() {
      this.canvas = null;
      this.ctx = null;
      this.size = 290;
      this.dpr = 1;
      this.needleEl = null;
      this.chance = 50.0;
      this.currentAngle = 0;
      this.isSpinning = false;
    }

    init(canvasId = 'wheel-canvas', needleId = 'wheel-needle') {
      this.canvas = document.getElementById(canvasId);
      this.needleEl = document.getElementById(needleId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.setupDpr();
      this.render(this.chance);

      window.addEventListener('resize', () => {
        this.setupDpr();
        this.render(this.chance);
      });
    }

    setupDpr() {
      if (!this.canvas) return;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = this.canvas.getBoundingClientRect();
      const cssSize = Math.round(rect.width) || 290;
      this.size = cssSize;

      this.canvas.width = Math.round(cssSize * this.dpr);
      this.canvas.height = Math.round(cssSize * this.dpr);
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    }

    setNeedleAngle(deg) {
      this.currentAngle = deg;
      if (this.needleEl) {
        this.needleEl.style.transform = `rotate(${deg}deg)`;
      }
    }

    render(chance = 50.0, currentRoll = null) {
      if (!this.canvas || !this.ctx) return;
      this.chance = Math.max(0.1, Math.min(90.0, Number(chance) || 50.0));

      const ctx = this.ctx;
      const w = this.size;
      const h = this.size;
      const cx = w / 2;
      const cy = h / 2;
      const outerRadius = (w / 2) - 8;
      const trackRadius = outerRadius - 16;
      const trackThickness = 14;

      ctx.clearRect(0, 0, w, h);

      // --- 1. DEEP ONYX & GRAPHITE CASING BASE DISC ---
      ctx.save();
      const bgGrad = ctx.createRadialGradient(cx, cy, 10, cx, cy, outerRadius + 6);
      bgGrad.addColorStop(0, '#141722');
      bgGrad.addColorStop(0.55, '#0E1017');
      bgGrad.addColorStop(1, '#090A0F');

      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius + 6, 0, Math.PI * 2);
      ctx.fillStyle = bgGrad;
      ctx.fill();

      // Shadowed outer bevel
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#1F2433';
      ctx.stroke();
      ctx.restore();

      // --- 2. DOUBLE METALLIC RIM (Двойной металлический обод) ---
      ctx.save();
      // Outer Rim Specular Metal Band
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius + 4, 0, Math.PI * 2);
      ctx.lineWidth = 2.5;
      const rimGrad1 = ctx.createLinearGradient(0, 0, w, h);
      rimGrad1.addColorStop(0, 'rgba(255, 255, 255, 0.22)');
      rimGrad1.addColorStop(0.3, '#1F2433');
      rimGrad1.addColorStop(0.7, '#2A3145');
      rimGrad1.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
      ctx.strokeStyle = rimGrad1;
      ctx.stroke();

      // Inner Rim Chiseled Channel
      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius - 4, 0, Math.PI * 2);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = '#1F2433';
      ctx.stroke();

      // Fine Inner Metal Accent Line
      ctx.beginPath();
      ctx.arc(cx, cy, trackRadius - (trackThickness / 2) - 3, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.stroke();
      ctx.restore();

      // --- 3. CONCENTRIC TECHNICAL TELEMETRY RINGS ---
      ctx.save();
      // Tech Dashed Ring 1 (Cherry Accent)
      ctx.beginPath();
      ctx.setLineDash([4, 6]);
      ctx.arc(cx, cy, outerRadius - 1, 0, Math.PI * 2);
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(224, 30, 90, 0.45)';
      ctx.stroke();

      // Tech Dashed Ring 2 (Inner Gunmetal)
      ctx.beginPath();
      ctx.setLineDash([3, 5]);
      ctx.arc(cx, cy, trackRadius - 28, 0, Math.PI * 2);
      ctx.lineWidth = 1;
      ctx.strokeStyle = 'rgba(142, 149, 165, 0.25)';
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // --- 4. RADIAL PRECISION SPOKES (16 Механических спиц) ---
      ctx.save();
      for (let i = 0; i < 16; i++) {
        const ang = (i / 16) * Math.PI * 2;
        const rIn = trackRadius - 42;
        const rOut = trackRadius - 8;

        const x1 = cx + Math.cos(ang) * rIn;
        const y1 = cy + Math.sin(ang) * rIn;
        const x2 = cx + Math.cos(ang) * rOut;
        const y2 = cy + Math.sin(ang) * rOut;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = (i % 4 === 0) ? 2 : 1;
        ctx.strokeStyle = (i % 4 === 0) ? 'rgba(224, 30, 90, 0.6)' : 'rgba(142, 149, 165, 0.2)';
        ctx.stroke();

        // Mechanical dot marker at spoke root
        const dotR = trackRadius - 44;
        const dx = cx + Math.cos(ang) * dotR;
        const dy = cy + Math.sin(ang) * dotR;
        ctx.beginPath();
        ctx.arc(dx, dy, (i % 4 === 0) ? 2 : 1.2, 0, Math.PI * 2);
        ctx.fillStyle = (i % 4 === 0) ? '#E01E5A' : '#8E95A5';
        ctx.fill();
      }
      ctx.restore();

      // --- 5. BASE DARK OBSIDIAN CIRCULAR TRACK ---
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, trackRadius, 0, Math.PI * 2);
      ctx.lineWidth = trackThickness;
      ctx.strokeStyle = '#0E1017';
      ctx.stroke();

      // Track inner border line
      ctx.beginPath();
      ctx.arc(cx, cy, trackRadius, 0, Math.PI * 2);
      ctx.lineWidth = trackThickness - 4;
      ctx.strokeStyle = '#141722';
      ctx.stroke();
      ctx.restore();

      // --- 6. MECHANICAL CIRCULAR CALIBRATION (100 Рисок Процентов и Градусов) ---
      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = '600 8.5px "Outfit", sans-serif';

      for (let i = 0; i < 100; i++) {
        // Start from top (0% at 12 o'clock in calibration notation)
        const ang = (i / 100) * Math.PI * 2 - Math.PI / 2;
        const isMajor = (i % 10 === 0);
        const isMedium = (i % 5 === 0);

        const tickLen = isMajor ? 11 : (isMedium ? 7 : 4);
        const tIn = trackRadius - (trackThickness / 2) - 2;
        const tOut = tIn + tickLen;

        const x1 = cx + Math.cos(ang) * tIn;
        const y1 = cy + Math.sin(ang) * tIn;
        const x2 = cx + Math.cos(ang) * tOut;
        const y2 = cy + Math.sin(ang) * tOut;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineWidth = isMajor ? 1.8 : (isMedium ? 1.2 : 0.7);
        ctx.strokeStyle = isMajor ? '#F3F4F6' : (isMedium ? '#8E95A5' : 'rgba(90, 98, 117, 0.45)');
        ctx.stroke();

        // Print percentage numbers at key intervals
        if (isMajor && i !== 0 && i !== 100) {
          const textR = trackRadius + (trackThickness / 2) + 7;
          const tx = cx + Math.cos(ang) * textR;
          const ty = cy + Math.sin(ang) * textR;
          ctx.fillStyle = 'rgba(142, 149, 165, 0.75)';
          ctx.fillText(String(i), tx, ty);
        }
      }
      ctx.restore();

      // --- 7. WINNING SECTOR WITH INTERNAL MICROGRID & CHERRY GLOW (BOTTOM-CENTERED AT 180°) ---
      const angleSpanDeg = (this.chance / 100) * 360;
      const halfSpan = angleSpanDeg / 2;
      const winStartDeg = 180 - halfSpan;
      const winEndDeg = 180 + halfSpan;

      const startAngle = (winStartDeg - 90) * (Math.PI / 180);
      const endAngle = (winEndDeg - 90) * (Math.PI / 180);

      ctx.save();
      // 7a. Internal Microgrid & Soft Holographic Fill inside Win Wedge
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, trackRadius + (trackThickness / 2), startAngle, endAngle, false);
      ctx.closePath();
      const sectorGrad = ctx.createRadialGradient(cx, cy, trackRadius - 50, cx, cy, trackRadius + 15);
      sectorGrad.addColorStop(0, 'rgba(139, 0, 43, 0.02)');
      sectorGrad.addColorStop(0.6, 'rgba(224, 30, 90, 0.12)');
      sectorGrad.addColorStop(1, 'rgba(224, 30, 90, 0.26)');
      ctx.fillStyle = sectorGrad;
      ctx.fill();

      // Microgrid Radial Rays inside Win Wedge
      const rayStepDeg = Math.max(2, Math.min(6, angleSpanDeg / 20));
      for (let d = winStartDeg; d <= winEndDeg; d += rayStepDeg) {
        const rayAng = (d - 90) * (Math.PI / 180);
        const rx1 = cx + Math.cos(rayAng) * (trackRadius - 40);
        const ry1 = cy + Math.sin(rayAng) * (trackRadius - 40);
        const rx2 = cx + Math.cos(rayAng) * (trackRadius + (trackThickness / 2));
        const ry2 = cy + Math.sin(rayAng) * (trackRadius + (trackThickness / 2));

        ctx.beginPath();
        ctx.moveTo(rx1, ry1);
        ctx.lineTo(rx2, ry2);
        ctx.lineWidth = 0.6;
        ctx.strokeStyle = 'rgba(255, 43, 109, 0.22)';
        ctx.stroke();
      }

      // Microgrid Concentric Arc Tracks
      [trackRadius - 20, trackRadius - 10].forEach(r => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, startAngle, endAngle, false);
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = 'rgba(255, 43, 109, 0.28)';
        ctx.stroke();
      });

      // 7b. Primary Cherry Halo Glow Pass
      ctx.beginPath();
      ctx.arc(cx, cy, trackRadius, startAngle, endAngle, false);
      ctx.lineWidth = trackThickness + 6;
      ctx.lineCap = 'butt';
      ctx.strokeStyle = 'rgba(224, 30, 90, 0.45)';
      ctx.shadowColor = '#E01E5A';
      ctx.shadowBlur = 22;
      ctx.stroke();

      // 7c. Core Vibrant Cherry Solid Arc
      ctx.beginPath();
      ctx.arc(cx, cy, trackRadius, startAngle, endAngle, false);
      ctx.lineWidth = trackThickness;
      ctx.strokeStyle = '#E01E5A';
      ctx.shadowColor = '#FF2B6D';
      ctx.shadowBlur = 10;
      ctx.stroke();

      // 7d. Razor White Specular Arc Core Highlight
      ctx.beginPath();
      ctx.arc(cx, cy, trackRadius, startAngle, endAngle, false);
      ctx.lineWidth = 2.2;
      ctx.strokeStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();

      // --- 8. RAZOR LASER BOUNDARY PINS (Контрастные шпильки границ) ---
      ctx.save();
      const pinIn = trackRadius - (trackThickness / 2) - 4;
      const pinOut = trackRadius + (trackThickness / 2) + 4;

      [startAngle, endAngle].forEach(ang => {
        const px1 = cx + Math.cos(ang) * pinIn;
        const py1 = cy + Math.sin(ang) * pinIn;
        const px2 = cx + Math.cos(ang) * pinOut;
        const py2 = cy + Math.sin(ang) * pinOut;

        ctx.beginPath();
        ctx.moveTo(px1, py1);
        ctx.lineTo(px2, py2);
        ctx.lineWidth = 2.8;
        ctx.strokeStyle = '#FFFFFF';
        ctx.shadowColor = '#E01E5A';
        ctx.shadowBlur = 12;
        ctx.stroke();

        // Pin diamond tip
        const tipX = cx + Math.cos(ang) * (pinOut + 2);
        const tipY = cy + Math.sin(ang) * (pinOut + 2);
        ctx.beginPath();
        ctx.arc(tipX, tipY, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 6;
        ctx.fill();
      });
      ctx.restore();

      // --- 9. BOTTOM CENTER CALIBRATION TARGET (6 o'clock mark / 180°) ---
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(cx, cy + trackRadius - (trackThickness / 2) - 6);
      ctx.lineTo(cx, cy + trackRadius + (trackThickness / 2) + 6);
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = '#10B981';
      ctx.shadowColor = '#10B981';
      ctx.shadowBlur = 8;
      ctx.stroke();
      ctx.restore();
    }
  }

  window.UpgraderWheelRenderer = new UpgraderWheelRenderer();
})(window, document);
