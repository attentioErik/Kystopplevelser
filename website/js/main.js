/**
 * KYSTOPPLEVELSER — Main
 *
 * Responsibilities:
 *  1. Scroll reveal — IntersectionObserver on .reveal elements
 *  2. Booking form — client-side validation, success state, date min
 *  3. URL param pre-selection (?opplevelse=rib pre-checks checkboxes)
 *  4. Anchor nav active state (opplevelser page)
 */

(function () {
  'use strict';

  // ══════════════════════════════════════════════════════════════════════
  // 1. SCROLL REVEAL
  // ══════════════════════════════════════════════════════════════════════
  function initScrollReveal() {
    var elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Respect reduced motion preference
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      elements.forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // only animate once
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    elements.forEach(function (el) {
      observer.observe(el);
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 2. BOOKING FORM VALIDATION
  // ══════════════════════════════════════════════════════════════════════
  function initBookingForm() {
    var form    = document.getElementById('bookingForm');
    var success = document.getElementById('formSuccess');
    if (!form) return;

    // Set minimum date to today
    var dateInput = document.getElementById('dato');
    if (dateInput) {
      var today = new Date();
      var yyyy  = today.getFullYear();
      var mm    = String(today.getMonth() + 1).padStart(2, '0');
      var dd    = String(today.getDate()).padStart(2, '0');
      dateInput.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    }

    // ── Helper: show / clear error ────────────────────────────────────
    function showError(fieldId, message) {
      var el = document.getElementById(fieldId + '-error');
      if (el) {
        el.textContent = message;
      }
    }

    function clearError(fieldId) {
      var el = document.getElementById(fieldId + '-error');
      if (el) {
        el.textContent = '';
      }
    }

    function setInputState(input, valid) {
      if (!input) return;
      if (valid) {
        input.style.borderColor = '';
      } else {
        input.style.borderColor = '#D93025';
      }
    }

    // ── Clear errors on input ─────────────────────────────────────────
    var inputs = form.querySelectorAll('.form-input');
    inputs.forEach(function (input) {
      input.addEventListener('input', function () {
        // Re-validate on change to clear error
        input.style.borderColor = '';
      });
    });

    // ── Validate email ────────────────────────────────────────────────
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // ── Main validation ───────────────────────────────────────────────
    function validate() {
      var errors = 0;

      // Fornavn
      var fornavn = document.getElementById('fornavn');
      if (!fornavn || !fornavn.value.trim()) {
        showError('fornavn', 'Fornavn er påkrevd.');
        setInputState(fornavn, false);
        errors++;
      } else {
        clearError('fornavn');
        setInputState(fornavn, true);
      }

      // Etternavn
      var etternavn = document.getElementById('etternavn');
      if (!etternavn || !etternavn.value.trim()) {
        showError('etternavn', 'Etternavn er påkrevd.');
        setInputState(etternavn, false);
        errors++;
      } else {
        clearError('etternavn');
        setInputState(etternavn, true);
      }

      // E-post
      var epost = document.getElementById('epost');
      if (!epost || !epost.value.trim()) {
        showError('epost', 'E-post er påkrevd.');
        setInputState(epost, false);
        errors++;
      } else if (!isValidEmail(epost.value.trim())) {
        showError('epost', 'Vennligst skriv inn en gyldig e-postadresse.');
        setInputState(epost, false);
        errors++;
      } else {
        clearError('epost');
        setInputState(epost, true);
      }

      // Opplevelse checkboxes — at least one must be selected
      var checkboxes = form.querySelectorAll('input[name="opplevelse"]:checked');
      if (!checkboxes.length) {
        showError('opplevelse', 'Velg minst én opplevelse.');
        errors++;
      } else {
        clearError('opplevelse');
      }

      // Dato
      var dato = document.getElementById('dato');
      if (!dato || !dato.value) {
        showError('dato', 'Velg en dato.');
        setInputState(dato, false);
        errors++;
      } else {
        clearError('dato');
        setInputState(dato, true);
      }

      // Antall
      var antall = document.getElementById('antall');
      if (!antall || !antall.value || parseInt(antall.value, 10) < 1) {
        showError('antall', 'Oppgi antall personer (minimum 1).');
        setInputState(antall, false);
        errors++;
      } else {
        clearError('antall');
        setInputState(antall, true);
      }

      // GDPR
      var gdpr = document.getElementById('gdpr');
      if (!gdpr || !gdpr.checked) {
        showError('gdpr', 'Du må godta personvernreglene for å sende forespørselen.');
        errors++;
      } else {
        clearError('gdpr');
      }

      return errors === 0;
    }

    // ── Submit handler ────────────────────────────────────────────────
    form.addEventListener('submit', function (event) {
      event.preventDefault();

      if (validate()) {
        // Hide form, show success message
        form.style.display = 'none';
        if (success) {
          success.removeAttribute('hidden');
          success.focus();
        }
      } else {
        // Scroll to first error
        var firstError = form.querySelector('.form-error:not(:empty)');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 3. URL PARAM PRE-SELECTION
  // ══════════════════════════════════════════════════════════════════════
  function initUrlParams() {
    var form = document.getElementById('bookingForm');
    if (!form) return;

    var params = new URLSearchParams(window.location.search);
    var opplevelseParam = params.get('opplevelse');

    if (opplevelseParam) {
      var values = opplevelseParam.split(',').map(function (v) { return v.trim().toLowerCase(); });
      values.forEach(function (val) {
        var checkbox = form.querySelector('input[name="opplevelse"][value="' + val + '"]');
        if (checkbox) {
          checkbox.checked = true;
        }
      });
    }
  }

  // ══════════════════════════════════════════════════════════════════════
  // 4. ANCHOR NAV ACTIVE STATE (opplevelser page)
  // ══════════════════════════════════════════════════════════════════════
  function initAnchorNav() {
    var anchorLinks = document.querySelectorAll('.anchor-nav__link');
    if (!anchorLinks.length) return;

    // Highlight based on scroll position
    var sections = [];
    anchorLinks.forEach(function (link) {
      var href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        var section = document.querySelector(href);
        if (section) sections.push({ link: link, section: section });
      }
    });

    if (!sections.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            // Remove active from all
            anchorLinks.forEach(function (l) { l.classList.remove('active'); });
            // Find and activate the matching link
            sections.forEach(function (item) {
              if (item.section === entry.target) {
                item.link.classList.add('active');
              }
            });
          }
        });
      },
      {
        rootMargin: '-120px 0px -60% 0px',
        threshold: 0
      }
    );

    sections.forEach(function (item) {
      observer.observe(item.section);
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // 5. SMOOTH SCROLL for anchor links (polyfill for older Safari)
  // ══════════════════════════════════════════════════════════════════════
  function initSmoothAnchor() {
    var anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var navHeight = 72;
          var targetTop = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 16;
          window.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      });
    });
  }

  // ══════════════════════════════════════════════════════════════════════
  // INIT
  // ══════════════════════════════════════════════════════════════════════
  function init() {
    initScrollReveal();
    initBookingForm();
    initUrlParams();
    initAnchorNav();
    initSmoothAnchor();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
