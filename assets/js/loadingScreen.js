// ...existing code...
(function () {
  const SPLASH_DURATION = 1200; // ms
  const SPIDER_SRC = 'assets/images/spiderGif.gif'; // update if your GIF path differs

  let overlay = null;
  let hideTimer = null;
  let active = false;
  let scrollY = 0;

  function createSplash() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.id = 'splash-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    // base classes are controlled by your CSS; inline fallbacks keep it visible if CSS not loaded
    overlay.style.position = 'fixed';
    overlay.style.inset = '0';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.background = '#252734';
    overlay.style.zIndex = '99999';
    overlay.style.pointerEvents = 'none';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 180ms ease';

    const img = document.createElement('img');
    img.className = 'splash-img';
    img.src = SPIDER_SRC;
    img.alt = 'loading';
    img.style.width = '50vw';
    img.style.height = '50vh';
    img.style.objectFit = 'contain';

    overlay.appendChild(img);
    document.body.appendChild(overlay);
    return overlay;
  }

  function lockScroll() {
    scrollY = window.scrollY || window.pageYOffset || 0;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
  }

  function unlockScroll() {
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    window.scrollTo(0, scrollY);
  }

  function showSplash(duration = SPLASH_DURATION) {
    if (active) return Promise.resolve(); // avoid overlapping shows
    active = true;
    const ov = createSplash();
    ov.style.pointerEvents = 'auto';
    // force reflow then show
    void ov.offsetWidth;
    ov.style.opacity = '1';
    lockScroll();

    return new Promise((resolve) => {
      hideTimer = setTimeout(() => {
        ov.style.opacity = '0';
        ov.style.pointerEvents = 'none';
        unlockScroll();
        active = false;
        hideTimer = null;
        resolve();
      }, duration);
    });
  }

  function hideSplashNow() {
    if (!overlay) return;
    if (hideTimer) clearTimeout(hideTimer);
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    unlockScroll();
    active = false;
    hideTimer = null;
  }

  // show on DOMContentLoaded (every refresh)
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      showSplash();
    }, 80);
  });

  // handle pageshow (bfcache back navigation)
  window.addEventListener('pageshow', (ev) => {
    if (ev.persisted) setTimeout(() => showSplash(), 80);
  });

  // intercept clicks on the main logo/header to show splash before navigation
  document.addEventListener('click', function (e) {
    // only left-click without modifiers
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    const target = e.target;
    const logoEl = target.closest('.main-logo, .edris-logo, .title-logo, .header-sticky');
    if (!logoEl) return;

    const anchor = target.closest('a');
    if (anchor && anchor.href) {
      const href = anchor.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;
      // don't intercept links opening in new tabs
      if (anchor.target && anchor.target !== '' && anchor.target !== '_self') return;
      e.preventDefault();
      showSplash().then(() => { window.location.href = anchor.href; });
      return;
    }

    // not a link: just show splash
    showSplash();
  }, { passive: false });

  // expose small API for manual control
  window.loadingScreen = { show: showSplash, hide: hideSplashNow };

})();
/* ...existing code... */

