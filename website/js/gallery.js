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
  var lbImg         = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  var lbClose       = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  var lbPrev        = lightbox ? lightbox.querySelector('.lightbox__prev') : null;
  var lbNext        = lightbox ? lightbox.querySelector('.lightbox__next') : null;
  var lbCounter     = lightbox ? lightbox.querySelector('.lightbox__counter') : null;
  var lbCaption     = lightbox ? lightbox.querySelector('.lightbox__caption') : null;

  // ── Guard: only run on gallery page ─────────────────────────────────────
  if (!galleryItems.length) return;

  // ── Helper: extract image URL from a gallery item ───────────────────────
  function getItemImageUrl(item) {
    var placeholder = item.querySelector('.gallery-item__placeholder');
    if (!placeholder) return '';
    var bg = placeholder.style.backgroundImage || '';
    // Extract URL from url('...')
    var match = bg.match(/url\(['"]?(.*?)['"]?\)/);
    return match ? match[1] : '';
  }

  function getItemCaption(item) {
    var placeholder = item.querySelector('.gallery-item__placeholder');
    return placeholder ? (placeholder.getAttribute('aria-label') || '') : '';
  }

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
    if (!lbImg) return;
    var item = galleryItems[globalIdx];
    if (!item) return;

    var url     = getItemImageUrl(item);
    var caption = getItemCaption(item);

    lbImg.src = url;
    lbImg.alt = caption;

    // Update counter (position within filtered set)
    var posInFilter = filteredIndices.indexOf(globalIdx) + 1;
    var total       = filteredIndices.length;
    if (lbCounter) lbCounter.textContent = posInFilter + ' / ' + total;
    if (lbCaption) lbCaption.textContent = caption;
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
      var caption = getItemCaption(item);
      item.setAttribute('aria-label', caption ? 'Vis: ' + caption : 'Vis bilde');
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
