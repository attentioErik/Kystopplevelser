/**
 * KYSTOPPLEVELSER — Gallery
 *
 * Responsibilities:
 *  1. Filter tabs: filter .gallery-item elements by data-category
 *  2. Lightbox: open on item click, prev/next, keyboard nav, touch swipe,
 *     focus trap, return focus on close
 *  3. Graceful no-op if gallery elements are absent (other pages)
 */

(function () {
  'use strict';

  // ── Gallery data (matches placeholder divs in HTML) ──────────────────────
  // Each entry corresponds to a .gallery-item in the HTML.
  // gradient: CSS gradient string used for lightbox display
  // caption: descriptive label shown in lightbox
  var galleryData = [
    { category: 'rib',          caption: 'RIB-tur på Byfjorden',              gradient: 'linear-gradient(160deg,#0D1B26 0%,#1B3A52 35%,#2C5F8A 65%,#A8C5D8 100%)' },
    { category: 'krabbefiske',  caption: 'Krabbefiske — autentisk kystliv',   gradient: 'linear-gradient(160deg,#3D6B4F 0%,#2C5F8A 50%,#A8C5D8 100%)' },
    { category: 'badstue',      caption: 'Badstue ved sjøen ved solnedgang',  gradient: 'linear-gradient(160deg,#C97B2A 0%,#1B3A52 60%,#0D1B26 100%)' },
    { category: 'vannscooter',  caption: 'Vannscooter — fart og frihet',      gradient: 'linear-gradient(160deg,#2C5F8A 0%,#A8C5D8 50%,#DDE4EC 100%)' },
    { category: 'natur',        caption: 'Solnedgang over Byfjorden',         gradient: 'linear-gradient(160deg,#C97B2A 20%,#1B3A52 70%,#0D1B26 100%)' },
    { category: 'rib',          caption: 'Guidet RIB-tur i høy fart',         gradient: 'linear-gradient(160deg,#1B3A52 0%,#2C5F8A 50%,#0D1B26 100%)' },
    { category: 'natur',        caption: 'Kystlinje mot vest',                gradient: 'linear-gradient(160deg,#3D6B4F 0%,#A8C5D8 60%,#DDE4EC 100%)' },
    { category: 'badstue',      caption: 'Kaldvann og badstuevarme',          gradient: 'linear-gradient(160deg,#0D1B26 0%,#C97B2A 50%,#1B3A52 100%)' },
    { category: 'krabbefiske',  caption: 'Krabbetiner klar for havet',        gradient: 'linear-gradient(160deg,#2C5F8A 0%,#3D6B4F 50%,#1B3A52 100%)' },
    { category: 'vannscooter',  caption: 'Bølger og frihet på fjorden',       gradient: 'linear-gradient(160deg,#A8C5D8 0%,#2C5F8A 50%,#1B3A52 100%)' },
    { category: 'natur',        caption: 'Bergen fra sjøen',                  gradient: 'linear-gradient(160deg,#1B3A52 0%,#3D6B4F 40%,#A8C5D8 100%)' },
    { category: 'rib',          caption: 'Solnedgangstur langs kysten',       gradient: 'linear-gradient(160deg,#C97B2A 0%,#2C5F8A 50%,#1B3A52 100%)' }
  ];

  // ── State ────────────────────────────────────────────────────────────────
  var currentIndex      = 0;
  var lightboxOpen      = false;
  var touchStartX       = 0;
  var previouslyFocused = null;
  var filteredIndices   = []; // indices of currently visible items

  // ── DOM references ───────────────────────────────────────────────────────
  var filterBtns    = document.querySelectorAll('.gallery-filter__btn');
  var galleryItems  = document.querySelectorAll('.gallery-item');
  var lightbox      = document.getElementById('lightbox');
  var lbDisplay     = lightbox ? lightbox.querySelector('.lightbox__display') : null;
  var lbPlaceholder = lightbox ? lightbox.querySelector('.lightbox__placeholder') : null;
  var lbClose       = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  var lbPrev        = lightbox ? lightbox.querySelector('.lightbox__prev') : null;
  var lbNext        = lightbox ? lightbox.querySelector('.lightbox__next') : null;
  var lbCounter     = lightbox ? lightbox.querySelector('.lightbox__counter') : null;
  var lbCaption     = lightbox ? lightbox.querySelector('.lightbox__caption') : null;

  // ── Guard: only run on gallery page ─────────────────────────────────────
  if (!galleryItems.length) return;

  // ── 1. Filter logic ──────────────────────────────────────────────────────
  function buildFilteredIndices() {
    filteredIndices = [];
    galleryItems.forEach(function (item, idx) {
      if (!item.classList.contains('hidden')) {
        filteredIndices.push(idx);
      }
    });
  }

  function applyFilter(category) {
    galleryItems.forEach(function (item) {
      var cat = item.getAttribute('data-category');
      if (category === 'alle' || cat === category) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
    buildFilteredIndices();
  }

  function initFilters() {
    if (!filterBtns.length) return;

    // Build initial filtered indices (all visible)
    buildFilteredIndices();

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyFilter(btn.getAttribute('data-filter') || 'alle');
      });
    });
  }

  // ── 2. Lightbox ──────────────────────────────────────────────────────────
  function updateLightboxDisplay(globalIdx) {
    if (!lbPlaceholder) return;
    var data = galleryData[globalIdx];
    if (!data) return;

    lbPlaceholder.style.background = data.gradient;

    // Update counter (position within filtered set)
    var posInFilter = filteredIndices.indexOf(globalIdx) + 1;
    var total       = filteredIndices.length;
    if (lbCounter) lbCounter.textContent = posInFilter + ' / ' + total;
    if (lbCaption) lbCaption.textContent = data.caption || '';
  }

  function openLightbox(globalIdx) {
    if (!lightbox) return;
    previouslyFocused = document.activeElement;
    currentIndex      = globalIdx;

    updateLightboxDisplay(currentIndex);
    lightbox.classList.add('open');
    lightboxOpen = true;
    document.body.style.overflow = 'hidden';

    // Announce to screen readers
    lightbox.removeAttribute('aria-hidden');

    // Focus close button
    requestAnimationFrame(function () {
      if (lbClose) lbClose.focus();
    });

    document.addEventListener('keydown', handleLightboxKeydown);
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightboxOpen = false;
    document.body.style.overflow = '';
    lightbox.setAttribute('aria-hidden', 'true');
    document.removeEventListener('keydown', handleLightboxKeydown);

    if (previouslyFocused) {
      previouslyFocused.focus();
      previouslyFocused = null;
    }
  }

  function showPrev() {
    var posInFilter = filteredIndices.indexOf(currentIndex);
    if (posInFilter <= 0) {
      posInFilter = filteredIndices.length - 1;
    } else {
      posInFilter -= 1;
    }
    currentIndex = filteredIndices[posInFilter];
    updateLightboxDisplay(currentIndex);
  }

  function showNext() {
    var posInFilter = filteredIndices.indexOf(currentIndex);
    if (posInFilter >= filteredIndices.length - 1) {
      posInFilter = 0;
    } else {
      posInFilter += 1;
    }
    currentIndex = filteredIndices[posInFilter];
    updateLightboxDisplay(currentIndex);
  }

  // ── Keyboard handling ─────────────────────────────────────────────────
  function handleLightboxKeydown(event) {
    switch (event.key) {
      case 'Escape':
        closeLightbox();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        showPrev();
        break;
      case 'ArrowRight':
        event.preventDefault();
        showNext();
        break;
      case 'Tab':
        trapFocusInLightbox(event);
        break;
    }
  }

  // ── Focus trap ────────────────────────────────────────────────────────
  function trapFocusInLightbox(event) {
    if (!lightbox) return;
    var focusable = Array.from(
      lightbox.querySelectorAll(
        'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ).filter(function (el) { return el.offsetParent !== null; });

    var first = focusable[0];
    var last  = focusable[focusable.length - 1];

    if (!first) return;

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  // ── Touch swipe ───────────────────────────────────────────────────────
  function initTouchSwipe() {
    if (!lightbox) return;

    lightbox.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener('touchend', function (e) {
      var diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          showNext(); // swiped left → next
        } else {
          showPrev(); // swiped right → prev
        }
      }
    }, { passive: true });
  }

  function initLightbox() {
    if (!lightbox) return;

    lightbox.setAttribute('aria-hidden', 'true');

    // Attach gallery item click handlers
    galleryItems.forEach(function (item, idx) {
      item.addEventListener('click', function () {
        if (item.classList.contains('hidden')) return;
        buildFilteredIndices();
        openLightbox(idx);
      });
      // Keyboard: Enter / Space
      item.setAttribute('tabindex', '0');
      item.setAttribute('role', 'button');
      var data = galleryData[idx];
      item.setAttribute('aria-label', data ? 'Vis: ' + data.caption : 'Vis bilde');
      item.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          if (!item.classList.contains('hidden')) {
            buildFilteredIndices();
            openLightbox(idx);
          }
        }
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);
    if (lbPrev)  lbPrev.addEventListener('click',  showPrev);
    if (lbNext)  lbNext.addEventListener('click',  showNext);

    // Click outside (on the dark overlay) to close
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });

    initTouchSwipe();
  }

  // ── Init ─────────────────────────────────────────────────────────────────
  function init() {
    initFilters();
    initLightbox();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
