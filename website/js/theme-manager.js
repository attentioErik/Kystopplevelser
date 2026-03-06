/**
 * KYSTOPPLEVELSER — Theme Manager
 * Manages light / dark / system theme preference.
 *
 * Strategy:
 *  - On page load: read localStorage → if absent, respect system preference
 *  - Toggle button flips between 'light' and 'dark' and saves to localStorage
 *  - Updates data-theme attribute on <html>
 *  - Updates aria-label on button for accessibility
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'kyst-theme';
  const DARK = 'dark';
  const LIGHT = 'light';

  // ── Read stored preference or detect system preference ──────────────────
  function getInitialTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) {
      return stored;
    }
    // No stored preference: respect OS setting
    return null; // let CSS media query handle it
  }

  // ── Apply theme to <html> element ───────────────────────────────────────
  function applyTheme(theme) {
    const html = document.documentElement;
    if (theme === DARK) {
      html.setAttribute('data-theme', DARK);
    } else if (theme === LIGHT) {
      html.setAttribute('data-theme', LIGHT);
    } else {
      // System: remove explicit attribute so CSS media query wins
      html.removeAttribute('data-theme');
    }
  }

  // ── Determine the effective (visual) theme right now ───────────────────
  function getEffectiveTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  }

  // ── Update button aria-label to reflect current state ──────────────────
  function updateButtonLabel(button, effectiveTheme) {
    if (!button) return;
    if (effectiveTheme === DARK) {
      button.setAttribute('aria-label', 'Bytt til lyst tema');
      button.setAttribute('title', 'Bytt til lyst tema');
    } else {
      button.setAttribute('aria-label', 'Bytt til mørkt tema');
      button.setAttribute('title', 'Bytt til mørkt tema');
    }
  }

  // ── Toggle theme ────────────────────────────────────────────────────────
  function toggleTheme() {
    const current = getEffectiveTheme();
    const next = current === DARK ? LIGHT : DARK;
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
    updateButtonLabel(document.getElementById('themeToggle'), next);
  }

  // ── Initialise on DOM ready ─────────────────────────────────────────────
  function init() {
    const stored = getInitialTheme();
    applyTheme(stored); // null = system, otherwise explicit

    const button = document.getElementById('themeToggle');
    if (button) {
      button.addEventListener('click', toggleTheme);
      updateButtonLabel(button, getEffectiveTheme());
    }

    // Listen for OS-level changes while the page is open
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener('change', function () {
      // Only react if the user has NOT set an explicit preference
      if (!localStorage.getItem(STORAGE_KEY)) {
        // data-theme is absent → CSS handles it automatically
        // Just update the button label
        updateButtonLabel(button, getEffectiveTheme());
      }
    });
  }

  // Run immediately to avoid flash of wrong theme
  // (The <script> is loaded in <head> as early as possible for this.)
  (function earlyApply() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK) {
      document.documentElement.setAttribute('data-theme', DARK);
    } else if (stored === LIGHT) {
      document.documentElement.setAttribute('data-theme', LIGHT);
    }
  })();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
