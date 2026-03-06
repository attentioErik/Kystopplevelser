/**
 * KYSTOPPLEVELSER — Nav Scroll & Mobile Drawer
 *
 * Responsibilities:
 *  1. Add .nav--scrolled when hero leaves viewport (IntersectionObserver)
 *     — falls back to scroll event if no hero on page
 *  2. Mobile drawer: open/close with hamburger, overlay, close button, Escape
 *  3. Focus trap inside drawer when open
 *  4. Body scroll lock when drawer is open
 *  5. Active nav link: mark current page with aria-current="page"
 */

(function () {
  'use strict';

  // ── Elements ────────────────────────────────────────────────────────────
  const nav         = document.getElementById('nav');
  const hamburger   = document.getElementById('navHamburger');
  const drawer      = document.getElementById('navDrawer');
  const overlay     = document.getElementById('navOverlay');
  const closeBtn    = document.getElementById('navClose');

  // ── 1. Nav scrolled state ───────────────────────────────────────────────
  function setNavScrolled(scrolled) {
    if (!nav) return;
    if (scrolled) {
      nav.classList.add('nav--scrolled');
      nav.classList.remove('nav--transparent');
    } else {
      nav.classList.remove('nav--scrolled');
      nav.classList.add('nav--transparent');
    }
  }

  function initScrollBehaviour() {
    if (!nav) return;

    const hero = document.querySelector('.hero');

    if (hero) {
      // Use IntersectionObserver: nav becomes scrolled when hero is out of view
      const observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            // Hero is intersecting → we are at the top → transparent nav
            setNavScrolled(!entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(hero);
    } else {
      // No hero — nav starts scrolled (opaque)
      setNavScrolled(true);

      // Still listen for scroll in case user scrolls back to very top
      window.addEventListener('scroll', function () {
        setNavScrolled(window.scrollY > 10);
      }, { passive: true });
    }
  }

  // ── 2. Focus Trap ───────────────────────────────────────────────────────
  function getFocusableElements(container) {
    return Array.from(
      container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), ' +
        'select:not([disabled]), textarea:not([disabled]), ' +
        '[tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) {
      return el.offsetParent !== null; // visible only
    });
  }

  function trapFocus(event) {
    if (!drawer || !drawer.classList.contains('nav-drawer--open')) return;

    const focusable  = getFocusableElements(drawer);
    const firstEl    = focusable[0];
    const lastEl     = focusable[focusable.length - 1];

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstEl) {
          event.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          event.preventDefault();
          firstEl.focus();
        }
      }
    }
  }

  // ── 3. Drawer open / close ──────────────────────────────────────────────
  var previouslyFocused = null;

  function openDrawer() {
    if (!drawer || !hamburger) return;
    previouslyFocused = document.activeElement;

    drawer.classList.add('nav-drawer--open');
    drawer.removeAttribute('aria-hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeydown);

    // Focus first focusable element in panel
    requestAnimationFrame(function () {
      var focusable = getFocusableElements(drawer);
      if (focusable.length) focusable[0].focus();
    });
  }

  function closeDrawer() {
    if (!drawer || !hamburger) return;

    drawer.classList.remove('nav-drawer--open');
    drawer.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleKeydown);

    // Return focus to trigger
    if (previouslyFocused) {
      previouslyFocused.focus();
      previouslyFocused = null;
    }
  }

  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeDrawer();
    }
    trapFocus(event);
  }

  function initDrawer() {
    if (!hamburger || !drawer) return;

    hamburger.addEventListener('click', openDrawer);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeDrawer);
    }

    if (overlay) {
      overlay.addEventListener('click', closeDrawer);
    }

    // Close drawer when a drawer link is clicked
    var drawerLinks = drawer.querySelectorAll('.nav-drawer__link, .btn');
    drawerLinks.forEach(function (link) {
      link.addEventListener('click', closeDrawer);
    });
  }

  // ── 4. Mark active nav link ─────────────────────────────────────────────
  function markActiveLink() {
    var currentPath = window.location.pathname;
    var filename    = currentPath.split('/').pop() || 'index.html';

    // If the path ends with '/' treat it as index
    if (filename === '') filename = 'index.html';

    var allLinks = document.querySelectorAll('.nav__link, .nav-drawer__link');

    allLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var hrefFile = href.split('/').pop() || 'index.html';

      // Normalise: empty href or '/' → index.html
      if (href === '' || href === '/') hrefFile = 'index.html';

      // Strip hash fragments for comparison
      hrefFile = hrefFile.split('#')[0] || 'index.html';
      var fileNoHash = filename.split('#')[0] || 'index.html';

      if (hrefFile === fileNoHash) {
        link.setAttribute('aria-current', 'page');
      }
    });
  }

  // ── Init ────────────────────────────────────────────────────────────────
  function init() {
    initScrollBehaviour();
    initDrawer();
    markActiveLink();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
