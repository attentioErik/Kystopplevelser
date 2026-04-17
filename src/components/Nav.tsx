'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
          <Image
            src="https://ucarecdn.com/6f9e4d34-c1b4-4828-9612-58cbf854312b/kystopplevelserlogosidewhite.png"
            alt="Kystopplevelser"
            height={18}
            width={90}
            className="nav__logo-img nav__logo-img--white"
            priority
          />
          <Image
            src="https://ucarecdn.com/c49160b7-8a02-4603-900e-18d5c784a393/kystopplevelserlogoside.png"
            alt="Kystopplevelser"
            height={18}
            width={90}
            className="nav__logo-img nav__logo-img--color"
            priority
            aria-hidden
          />
        </Link>
        <div className="nav__links" role="list">
          <Link href="/rib-tur-bergen" className="nav__link" role="listitem">{t('rib')}</Link>
          <Link href="/baatutleie-bergen" className="nav__link" role="listitem">{t('boat')}</Link>
          <Link href="/sauna-badstue-bergen" className="nav__link" role="listitem">{t('sauna')}</Link>
          <Link href="/om-oss" className="nav__link" role="listitem">{t('about')}</Link>
        </div>
        <div className="nav__actions">
          <Link href="/" locale={otherLocale} className="lang-switch" hrefLang={otherLocale}>
            {otherLocale === 'nb' ? 'NO' : otherLocale.toUpperCase()}
          </Link>
          <ThemeToggle />
          <Link href="/bestilling" className="btn btn--primary btn--sm">{t('bookNow')}</Link>
          <NavDrawer />
        </div>
      </div>
    </nav>
  );
}
