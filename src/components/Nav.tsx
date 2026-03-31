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
          <img
            src="https://ucarecdn.com/c49160b7-8a02-4603-900e-18d5c784a393/kystopplevelserlogoside.png"
            alt=""
            className="nav__logo-img"
            width={32}
            height={32}
          />
          <span className="nav__logo-text">Kystopplevelser</span>
        </Link>
        <div className="nav__links" role="list">
          <Link href="/rib-tur-bergen" className="nav__link" role="listitem">{t('rib')}</Link>
          <Link href="/baatutleie-bergen" className="nav__link" role="listitem">{t('boat')}</Link>
          <Link href="/sauna-badstue-bergen" className="nav__link" role="listitem">{t('sauna')}</Link>
          <Link href="/om-oss" className="nav__link" role="listitem">{t('about')}</Link>
        </div>
        <div className="nav__actions">
          <a
            href="https://www.instagram.com/kyst.opplevelser/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="nav__social-link"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
            </svg>
          </a>
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
