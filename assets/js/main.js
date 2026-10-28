(() => {
  const root = document.documentElement;
  const THEME_KEY = 'theme';
  const TRANSITION_KEY = 'page-transition';
  const LEAVE_MS = 560; // matches the .is-leaving panel animations in main.css

  const darkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Theme ---------------------------------------------------------------

  const toggle = document.querySelector('[data-theme-toggle]');

  const storedTheme = () => {
    try { return localStorage.getItem(THEME_KEY); } catch { return null; }
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    if (toggle) {
      const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    }
  };

  applyTheme(root.dataset.theme || (darkScheme.matches ? 'dark' : 'light'));

  toggle?.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem(THEME_KEY, next); } catch { /* storage unavailable */ }
  });

  // Follow the OS setting until the visitor picks a theme themselves.
  darkScheme.addEventListener('change', (event) => {
    if (!storedTheme()) applyTheme(event.matches ? 'dark' : 'light');
  });

  // Mobile menu ---------------------------------------------------------

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.getElementById('site-nav');

  const setMenu = (open) => {
    if (!menuToggle || !nav) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    nav.classList.toggle('is-open', open);
  };

  menuToggle?.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && nav?.classList.contains('is-open')) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (nav?.classList.contains('is-open') && !event.target.closest('.site-header')) setMenu(false);
  });

  // Copy buttons --------------------------------------------------------

  if (navigator.clipboard) root.classList.add('can-copy');

  document.addEventListener('click', async (event) => {
    const button = event.target.closest('[data-copy]');
    const source = button?.closest('.prompt')?.querySelector('.prompt__text');
    if (!source) return;

    try {
      await navigator.clipboard.writeText(source.textContent);
    } catch {
      return;
    }

    const label = button.querySelector('.prompt__copy-label');
    button.dataset.copied = '';
    if (label) label.textContent = 'Copied';
    window.clearTimeout(button.copyTimer);
    button.copyTimer = window.setTimeout(() => {
      delete button.dataset.copied;
      if (label) label.textContent = 'Copy';
    }, 2000);
  });

  // Page transitions ----------------------------------------------------
  // Cover the screen before leaving; the next page starts covered (see the
  // inline script in head.html) and its CSS animation reveals it.

  let leaving = false;

  document.addEventListener('click', (event) => {
    if (leaving || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest('a[href]');
    if (!link || link.hasAttribute('download')) return;
    if (link.target && link.target !== '_self') return;

    const url = new URL(link.href, window.location.href);
    if (url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    if (reducedMotion.matches) return;

    event.preventDefault();
    leaving = true;
    try { sessionStorage.setItem(TRANSITION_KEY, '1'); } catch { /* storage unavailable */ }
    root.classList.remove('is-entering');
    root.classList.add('is-leaving');
    window.setTimeout(() => { window.location.href = url.href; }, LEAVE_MS);
  });

  // Restored from the back/forward cache: drop the cover so the page is usable.
  window.addEventListener('pageshow', (event) => {
    if (!event.persisted) return;
    leaving = false;
    root.classList.remove('is-leaving', 'is-entering');
    setMenu(false);
  });
})();
