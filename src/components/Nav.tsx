'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { useLocale, useTranslations } from 'next-intl';
import ThemeToggle from './ThemeToggle';
import NavDrawer from './NavDrawer';

interface NavProps {
  variant?: 'transparent' | 'scrolled';
}

export default function Nav({ variant = 'transparent' }: NavProps) {
  const [scrolled, setScrolled] = useState(variant === 'scrolled');
  const t = useTranslations('nav');
  const locale = useLocale();
  const otherLocale = locale === 'nb' ? 'en' : 'nb';

  useEffect(() => {
    const hero = document.querySelector('.hero');

    if (hero) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setScrolled(!entry.isIntersecting);
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(hero);
      return () => observer.disconnect();
    } else {
      setScrolled(true);
      const handleScroll = () => setScrolled(window.scrollY > 10);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <nav
      className={`nav ${scrolled ? 'nav--scrolled' : 'nav--transparent'}`}
      id="nav"
      role="navigation"
      aria-label={t('mainNav')}
    >
      <div className="nav__inner container">
        <Link href="/" className="nav__logo" aria-label={t('logoLabel')}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <path d="M4 20 Q8 12 16 16 Q24 20 28 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M4 24 Q8 16 16 20 Q24 24 28 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
          </svg>
          <span className="nav__logo-text">Kystopplevelser</span>
        </Link>
        <div className="nav__links" role="list">
          <Link href="/rib-tur-bergen" className="nav__link" role="listitem">{t('rib')}</Link>
          <Link href="/baatutleie-bergen" className="nav__link" role="listitem">{t('boat')}</Link>
          <Link href="/sauna-badstue-bergen" className="nav__link" role="listitem">{t('sauna')}</Link>
          <Link href="/om-oss" className="nav__link" role="listitem">{t('about')}</Link>
        </div>
        <div className="nav__actions">
          <Link href="/" locale={otherLocale} className="lang-switch" hrefLang={otherLocale}>
            {otherLocale.toUpperCase()}
          </Link>
          <ThemeToggle />
          <Link href="/bestilling" className="btn btn--primary btn--sm">{t('bookNow')}</Link>
          <NavDrawer />
        </div>
      </div>
    </nav>
  );
}
