'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';

export default function NavDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const t = useTranslations('nav');
  const locale = useLocale();
  const otherLocale = locale === 'nb' ? 'en' : 'nb';

  const openDrawer = useCallback(() => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.classList.add('drawer-open');
  }, []);

  const closeDrawer = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = '';
    document.body.classList.remove('drawer-open');
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDrawer();
        return;
      }
      if (e.key === 'Tab' && drawerRef.current) {
        const focusable = Array.from(
          drawerRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((el) => el.offsetParent !== null);

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeydown);
    // Focus first element
    requestAnimationFrame(() => {
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])'
      );
      if (focusable?.length) focusable[0].focus();
    });

    return () => document.removeEventListener('keydown', handleKeydown);
  }, [isOpen, closeDrawer]);

  return (
    <>
      <button
        ref={triggerRef}
        className="nav__hamburger"
        id="navHamburger"
        aria-label={t('openMenu')}
        aria-expanded={isOpen}
        aria-controls="navDrawer"
        onClick={openDrawer}
      >
        <div className="nav__hamburger-lines">
          <span></span><span></span><span></span>
        </div>
      </button>

      <div
        ref={drawerRef}
        className={`nav-drawer${isOpen ? ' nav-drawer--open' : ''}`}
        id="navDrawer"
        aria-hidden={!isOpen}
        role="dialog"
        aria-modal="true"
        aria-label={t('menuLabel')}
      >
        <div className="nav-drawer__overlay" onClick={closeDrawer}></div>
        <div className="nav-drawer__panel">
          <div className="nav-drawer__header">
            <span className="nav__logo-text">Kystopplevelser</span>
            <button className="nav-drawer__close" onClick={closeDrawer} aria-label={t('closeMenu')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <nav className="nav-drawer__links">
            <Link href="/rib-tur-bergen" className="nav-drawer__link" onClick={closeDrawer}>{t('rib')}</Link>
            <Link href="/baatutleie-bergen" className="nav-drawer__link" onClick={closeDrawer}>{t('boat')}</Link>
            <Link href="/sauna-badstue-bergen" className="nav-drawer__link" onClick={closeDrawer}>{t('sauna')}</Link>
            <Link href="/om-oss" className="nav-drawer__link" onClick={closeDrawer}>{t('about')}</Link>
            <Link href="/bestilling" className="nav-drawer__link" onClick={closeDrawer}>{t('booking')}</Link>
          </nav>
          <div className="nav-drawer__lang">
            <span className="nav-drawer__lang-label">{t('language')}</span>
            <Link href="/" locale={otherLocale} className="nav-drawer__lang-link">
              {otherLocale === 'en' ? 'English' : 'Norsk'}
            </Link>
          </div>
          <Link href="/bestilling" className="btn btn--primary" style={{ margin: '1.5rem' }} onClick={closeDrawer}>
            {t('bookNow')} →
          </Link>
        </div>
      </div>
    </>
  );
}
