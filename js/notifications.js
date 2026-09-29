/* ==========================================================================
   SIMUP - NOTIFICATION TOAST SYSTEM
   Premium cyberpunk notification alerts with icons, progress bars & animations.
   ========================================================================== */

class NotificationManager {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    if (!document.getElementById('simup-toasts')) {
      this.container = document.createElement('div');
      this.container.id = 'simup-toasts';
      this.container.className = 'simup-toasts-container';
      document.body.appendChild(this.container);
    } else {
      this.container = document.getElementById('simup-toasts');
    }
  }

  show({ title, message, type = 'info', duration = 3800, icon = null }) {
    // Notifications disabled
    return;

    const icons = {
      success: '✓',
      error: '✕',
      warning: '⚠',
      info: 'ℹ',
      win: '★',
      knife: '🗡'
    };

    const toast = document.createElement('div');
    toast.className = `simup-toast simup-toast-${type}`;

    const iconSymbol = icon || icons[type] || 'ℹ';

    toast.innerHTML = `
      <div class="toast-icon-wrap">
        <span class="toast-icon">${iconSymbol}</span>
      </div>
      <div class="toast-content">
        ${title ? `<div class="toast-title">${title}</div>` : ''}
        <div class="toast-msg">${message}</div>
      </div>
      <button class="toast-close" aria-label="Закрыть">&times;</button>
      <div class="toast-progress" style="animation-duration: ${duration}ms;"></div>
    `;

    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => this.dismiss(toast));

    this.container.prepend(toast);

    // Audio cue if sound is on
    if (window.SoundManager && window.SoundManager.play) {
      if (type === 'success' || type === 'win') {
        window.SoundManager.play('success');
      } else if (type === 'error') {
        window.SoundManager.play('defeat');
      }
    }

    const timer = setTimeout(() => {
      this.dismiss(toast);
    }, duration);

    toast.dataset.timer = timer;
  }

  dismiss(toast) {
    if (!toast || toast.classList.contains('dismissing')) return;
    toast.classList.add('dismissing');
    clearTimeout(toast.dataset.timer);
    setTimeout(() => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    }, 320);
  }

  success(title, message) {
    this.show({ title, message, type: 'success' });
  }

  error(title, message) {
    this.show({ title, message, type: 'error' });
  }

  warning(title, message) {
    this.show({ title, message, type: 'warning' });
  }

  info(title, message) {
    this.show({ title, message, type: 'info' });
  }

  bigWin(title, message) {
    this.show({ title, message, type: 'win', duration: 6000, icon: '★' });
  }
}

window.notify = new NotificationManager();
