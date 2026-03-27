'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

interface GalleryItem {
  category: string;
  imageUrl: string;
  caption: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    category: 'rib',
    imageUrl: 'https://ucarecdn.com/f35d0529-b060-4496-a6de-164e4f6c4b33/hf_20260309_124501_de624687f2e640f2b3575ba107be2584.jpeg',
    caption: 'galleryCaption1',
  },
  {
    category: 'badstue',
    imageUrl: 'https://ucarecdn.com/a7263162-7dce-4b8e-a7e6-18e32aed0b33/DSC00021.jpg',
    caption: 'galleryCaption2',
  },
  {
    category: 'rib',
    imageUrl: 'https://ucarecdn.com/d0bddd2b-2f9a-41ff-891f-35ffa6ecb008/IMG_20250527_122846_714.jpg',
    caption: 'galleryCaption3',
  },
  {
    category: 'badstue',
    imageUrl: 'https://ucarecdn.com/c5fbdcec-bba4-4226-9750-00f0c7e92847/DSC00010.jpg',
    caption: 'galleryCaption4',
  },
  {
    category: 'rib',
    imageUrl: 'https://ucarecdn.com/b16c137c-32a2-4344-abce-1f9e5a33af51/IMG_20250527_122847_094.jpg',
    caption: 'galleryCaption5',
  },
  {
    category: 'badstue',
    imageUrl: 'https://ucarecdn.com/aba1287b-ceb9-46b2-9b33-65f5a48cd211/DSC00057.jpg',
    caption: 'galleryCaption6',
  },
  {
    category: 'baatutleie',
    imageUrl: 'https://ucarecdn.com/9219159c-e2f1-42e7-8495-19e909e408a2/ChatGPTImage9mars202614_38_38.png',
    caption: 'galleryCaption7',
  },
  {
    category: 'rib',
    imageUrl: 'https://ucarecdn.com/63a64994-bb1a-4015-9b41-7a705a6e84a4/hf_20260309_124325_5604bd3732d74ee89dc0be428cb316e7.jpeg',
    caption: 'galleryCaption8',
  },
  {
    category: 'badstue',
    imageUrl: 'https://ucarecdn.com/b6b3c3df-01f1-4767-9edf-88aacae2d79b/DSC00030.jpg',
    caption: 'galleryCaption9',
  },
  {
    category: 'rib',
    imageUrl: 'https://ucarecdn.com/00bbbd10-916f-42af-ad7d-3709e700ba54/hf_20260309_124306_644cf7b4f14a4eaa8178a9f050d8f4ed.jpeg',
    caption: 'galleryCaption10',
  },
  {
    category: 'badstue',
    imageUrl: 'https://ucarecdn.com/08c9002b-9971-4b0f-b5f7-65d2f6a45953/NR3A5909.jpg',
    caption: 'galleryCaption11',
  },
  {
    category: 'rib',
    imageUrl: 'https://ucarecdn.com/def5213b-65a1-49a4-8abc-ff15836e36c1/hf_20260309_124552_8092a5ca989b441c88b7afdede53c1a4.jpeg',
    caption: 'galleryCaption12',
  },
  {
    category: 'badstue',
    imageUrl: 'https://ucarecdn.com/a8b1cd60-6133-4c03-b6ef-c6d92fca79fa/DSC00039.jpg',
    caption: 'galleryCaption13',
  },
];

const ASPECT_RATIOS = [
  '4/3', '3/4', '16/9', '4/3', '3/4', '1/1',
  '4/3', '3/4', '16/9', '4/3', '3/4', '1/1', '4/3',
];

const FILTERS = ['alle', 'rib', 'baatutleie', 'badstue'] as const;

export default function Gallery() {
  const t = useTranslations('gallery');
  const [activeFilter, setActiveFilter] = useState<string>('alle');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lightboxRef = useRef<HTMLDivElement>(null);

  // Filtered items (indices into GALLERY_ITEMS)
  const filteredIndices = GALLERY_ITEMS
    .map((item, idx) => ({ item, idx }))
    .filter(({ item }) => activeFilter === 'alle' || item.category === activeFilter)
    .map(({ idx }) => idx);

  const openLightbox = useCallback((globalIdx: number) => {
    previouslyFocused.current = document.activeElement as HTMLElement;
    setCurrentIndex(globalIdx);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    document.body.style.overflow = '';
    if (previouslyFocused.current) {
      previouslyFocused.current.focus();
      previouslyFocused.current = null;
    }
  }, []);

  const showPrev = useCallback(() => {
    const posInFilter = filteredIndices.indexOf(currentIndex);
    const newPos = posInFilter <= 0 ? filteredIndices.length - 1 : posInFilter - 1;
    setCurrentIndex(filteredIndices[newPos]);
  }, [filteredIndices, currentIndex]);

  const showNext = useCallback(() => {
    const posInFilter = filteredIndices.indexOf(currentIndex);
    const newPos = posInFilter >= filteredIndices.length - 1 ? 0 : posInFilter + 1;
    setCurrentIndex(filteredIndices[newPos]);
  }, [filteredIndices, currentIndex]);

  // Focus close button when lightbox opens
  useEffect(() => {
    if (lightboxOpen && closeButtonRef.current) {
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    }
  }, [lightboxOpen]);

  // Keyboard handling
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          showPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          showNext();
          break;
        case 'Tab': {
          // Focus trap
          if (!lightboxRef.current) return;
          const focusable = Array.from(
            lightboxRef.current.querySelectorAll<HTMLElement>(
              'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
          ).filter((el) => el.offsetParent !== null);
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (!first) return;
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [lightboxOpen, closeLightbox, showPrev, showNext]);

  // Touch swipe handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const diff = touchStartX.current - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          showNext();
        } else {
          showPrev();
        }
      }
    },
    [showNext, showPrev]
  );

  const currentItem = GALLERY_ITEMS[currentIndex];
  const posInFilter = filteredIndices.indexOf(currentIndex) + 1;

  const filterLabelKey: Record<string, string> = {
    alle: 'filterAll',
    rib: 'filterRib',
    baatutleie: 'filterBoat',
    badstue: 'filterSauna',
  };

  return (
    <>
      {/* HEADER */}
      <section
        className="section section--sm"
        aria-labelledby="gallery-page-heading"
        style={{ paddingTop: 'calc(var(--section-padding) + 72px)' }}
      >
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('eyebrow')}</p>
            <h1 id="gallery-page-heading" className="section__title">
              {t('heading')}
            </h1>
            <p className="section__subtitle">{t('subtitle')}</p>
          </div>

          {/* Filter tabs */}
          <div className="gallery-filter reveal" role="group" aria-label={t('filterAriaLabel')}>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`gallery-filter__btn${activeFilter === filter ? ' active' : ''}`}
                data-filter={filter}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {t(filterLabelKey[filter])}
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div className="gallery-grid" role="list" aria-label={t('gridAriaLabel')}>
            {GALLERY_ITEMS.map((item, idx) => {
              const isVisible = activeFilter === 'alle' || item.category === activeFilter;
              const caption = t(item.caption);
              return (
                <div
                  key={idx}
                  className={`gallery-item reveal${!isVisible ? ' hidden' : ''}`}
                  data-category={item.category}
                  role="listitem"
                  tabIndex={isVisible ? 0 : -1}
                  aria-label={`${t('showLabel')}: ${caption}`}
                  onClick={() => {
                    if (isVisible) openLightbox(idx);
                  }}
                  onKeyDown={(e) => {
                    if ((e.key === 'Enter' || e.key === ' ') && isVisible) {
                      e.preventDefault();
                      openLightbox(idx);
                    }
                  }}
                >
                  <div
                    className="gallery-item__placeholder"
                    role="img"
                    aria-label={caption}
                    style={{
                      backgroundImage: `url('${item.imageUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      aspectRatio: ASPECT_RATIOS[idx] || '4/3',
                    }}
                  ></div>
                  <div className="gallery-item__overlay" aria-hidden="true">
                    <div className="gallery-item__expand">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* VIDEO SECTION */}
          <div className="video-section reveal">
            <div className="text-center" style={{ marginBottom: 'var(--space-5)' }}>
              <p className="section__eyebrow">{t('videoEyebrow')}</p>
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {t('videoTitle')}
              </h3>
              <p
                style={{
                  color: 'var(--text-secondary)',
                  maxWidth: '50ch',
                  marginInline: 'auto',
                  lineHeight: 'var(--leading-relaxed)',
                }}
              >
                {t('videoSubtitle')}
              </p>
            </div>
            <div
              style={{
                padding: '56.25% 0 0 0',
                position: 'relative',
                maxWidth: '800px',
                marginInline: 'auto',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
              }}
            >
              <iframe
                src="https://player.vimeo.com/video/1170952103?badge=0&autopause=0&player_id=0&app_id=58479"
                frameBorder="0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                title="Kystopplevelser Promo"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-block" aria-labelledby="gallery-cta-heading">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <span className="cta-block__eyebrow">{t('ctaEyebrow')}</span>
            <h2 id="gallery-cta-heading" className="cta-block__title">
              {t('ctaTitle')}
            </h2>
            <p className="cta-block__body">{t('ctaBody')}</p>
            <Link href="/bestilling" className="btn btn--primary btn--lg">
              {t('ctaButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      <div
        ref={lightboxRef}
        className={`lightbox${lightboxOpen ? ' open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={t('lightboxAriaLabel')}
        aria-hidden={!lightboxOpen}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lightbox__inner">
          <div className="lightbox__display">
            {lightboxOpen && currentItem && (
              <img
                className="lightbox__img"
                src={currentItem.imageUrl}
                alt={t(currentItem.caption)}
              />
            )}
          </div>
        </div>

        <button
          ref={closeButtonRef}
          className="lightbox__close"
          aria-label={t('lightboxClose')}
          onClick={closeLightbox}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <button className="lightbox__prev" aria-label={t('lightboxPrev')} onClick={showPrev}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <button className="lightbox__next" aria-label={t('lightboxNext')} onClick={showNext}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div className="lightbox__counter" aria-live="polite" aria-atomic="true">
          {lightboxOpen ? `${posInFilter} / ${filteredIndices.length}` : ''}
        </div>
        <div className="lightbox__caption" aria-live="polite">
          {lightboxOpen && currentItem ? t(currentItem.caption) : ''}
        </div>
      </div>
    </>
  );
}
