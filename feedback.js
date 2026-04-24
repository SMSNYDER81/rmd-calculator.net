/**
 * feedback.js
 * Universal feedback toast + exit intent modal
 * Drop into any utility site repo and add:
 *   <script src="/feedback.js" data-repo="OWNER/REPO-NAME"></script>
 * Replace OWNER/REPO-NAME with the actual GitHub repo path.
 */

(function () {
  const REPO = document.currentScript?.getAttribute('data-repo') || '';
  const ISSUES_URL = `https://github.com/${REPO}/issues/new?labels=feedback&title=Feedback+%2F+Suggestion&body=**What+would+you+like+to+share%3F**%0A%0A`;

  const TOAST_KEY  = 'fb_toast_seen';
  const EXIT_KEY   = 'fb_exit_seen';

  const STYLES = `
    #fb-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(100px);
      background: #1a2a40;
      border: 1px solid rgba(201,168,76,0.35);
      border-radius: 10px;
      padding: 14px 20px;
      display: flex;
      align-items: center;
      gap: 14px;
      font-family: sans-serif;
      font-size: 14px;
      color: #c8d8ec;
      box-shadow: 0 8px 32px rgba(0,0,0,0.45);
      z-index: 9999;
      max-width: 480px;
      width: calc(100% - 48px);
      transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
      opacity: 0;
    }
    #fb-toast.show {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    #fb-toast-icon { font-size: 20px; flex-shrink: 0; }
    #fb-toast-text { flex: 1; line-height: 1.45; }
    #fb-toast-text a {
      color: #c9a84c;
      text-decoration: none;
      font-weight: 600;
      border-bottom: 1px solid rgba(201,168,76,0.4);
    }
    #fb-toast-text a:hover { border-color: #c9a84c; }
    #fb-toast-close {
      background: none;
      border: none;
      color: #5c7a9e;
      font-size: 18px;
      cursor: pointer;
      padding: 0 0 0 8px;
      line-height: 1;
      flex-shrink: 0;
    }
    #fb-toast-close:hover { color: #c8d8ec; }

    #fb-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.6);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.25s ease;
      pointer-events: none;
    }
    #fb-overlay.show {
      opacity: 1;
      pointer-events: all;
    }
    #fb-modal {
      background: #0f1c2e;
      border: 1px solid rgba(201,168,76,0.3);
      border-radius: 12px;
      padding: 32px 28px;
      max-width: 420px;
      width: calc(100% - 48px);
      font-family: sans-serif;
      color: #c8d8ec;
      transform: scale(0.92);
      transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    #fb-overlay.show #fb-modal { transform: scale(1); }
    #fb-modal-icon { font-size: 32px; margin-bottom: 12px; }
    #fb-modal h2 {
      font-size: 20px;
      font-weight: 700;
      color: #e8edf4;
      margin: 0 0 10px;
    }
    #fb-modal p {
      font-size: 14px;
      color: #9aadc4;
      line-height: 1.6;
      margin: 0 0 22px;
    }
    #fb-modal-btns { display: flex; gap: 10px; }
    #fb-modal-btns a {
      flex: 1;
      text-align: center;
      padding: 11px 0;
      border-radius: 7px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.15s;
    }
    #fb-modal-btns a:hover { opacity: 0.85; }
    #fb-modal-yes {
      background: #c9a84c;
      color: #0f1c2e;
    }
    #fb-modal-no {
      background: transparent;
      border: 1px solid rgba(255,255,255,0.12);
      color: #9aadc4;
    }
  `;

  function injectStyles() {
    const el = document.createElement('style');
    el.textContent = STYLES;
    document.head.appendChild(el);
  }

  // ── TOAST ──────────────────────────────────────────────
  function showToast() {
    if (localStorage.getItem(TOAST_KEY)) return;

    const toast = document.createElement('div');
    toast.id = 'fb-toast';
    toast.innerHTML = `
      <span id="fb-toast-icon">🛠️</span>
      <span id="fb-toast-text">
        This tool is always improving —
        <a href="${ISSUES_URL}" target="_blank" rel="noopener">share your feedback or suggestions</a>
        and help make it better.
      </span>
      <button id="fb-toast-close" aria-label="Dismiss">✕</button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 50);

    document.getElementById('fb-toast-close').addEventListener('click', () => {
      dismissToast(toast);
    });

    document.getElementById('fb-toast').querySelector('a').addEventListener('click', () => {
      dismissToast(toast);
    });
  }

  function dismissToast(toast) {
    toast.classList.remove('show');
    localStorage.setItem(TOAST_KEY, '1');
    setTimeout(() => toast.remove(), 400);
  }

  // ── EXIT INTENT ─────────────────────────────────────────
  function setupExitIntent() {
    if (localStorage.getItem(EXIT_KEY)) return;

    let triggered = false;

    document.addEventListener('mouseleave', function (e) {
      if (triggered) return;
      if (e.clientY > 20) return; // only trigger near top of viewport
      triggered = true;
      showExitModal();
    });
  }

  function showExitModal() {
    if (localStorage.getItem(EXIT_KEY)) return;

    const overlay = document.createElement('div');
    overlay.id = 'fb-overlay';
    overlay.innerHTML = `
      <div id="fb-modal">
        <div id="fb-modal-icon">💬</div>
        <h2>Before you go — got feedback?</h2>
        <p>This tool is always in development. If something didn't work, could be improved, or you have a suggestion, we'd genuinely love to hear it.</p>
        <div id="fb-modal-btns">
          <a id="fb-modal-yes" href="${ISSUES_URL}" target="_blank" rel="noopener">Share Feedback</a>
          <a id="fb-modal-no" href="#">No thanks</a>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    setTimeout(() => overlay.classList.add('show'), 50);

    document.getElementById('fb-modal-no').addEventListener('click', (e) => {
      e.preventDefault();
      dismissModal(overlay);
    });

    document.getElementById('fb-modal-yes').addEventListener('click', () => {
      dismissModal(overlay);
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) dismissModal(overlay);
    });
  }

  function dismissModal(overlay) {
    overlay.classList.remove('show');
    localStorage.setItem(EXIT_KEY, '1');
    setTimeout(() => overlay.remove(), 300);
  }

  // ── INIT ────────────────────────────────────────────────
  function init() {
    injectStyles();

    // Toast: show after 4 seconds
    if (!localStorage.getItem(TOAST_KEY)) {
      setTimeout(showToast, 4000);
    }

    // Exit intent
    setupExitIntent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
