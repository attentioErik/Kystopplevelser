import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import WarpShaderBg from '@/components/WarpShaderBg';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'aboutPage' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/om-oss',
      languages: {
        nb: 'https://kystopplevelser.no/om-oss',
        en: 'https://kystopplevelser.no/en/about',
      },
    },
  };
}

export default function AboutPage() {
  const t = useTranslations('aboutPage');

  return (
    <>
      {/* HERO */}
      <section className="hero hero--inner-sm" aria-label={t('heroTitle')}>
        <div className="hero__bg" aria-hidden="true" style={{ background: '#0D1B26' }}>
          <WarpShaderBg />
        </div>
        <div className="hero__overlay" aria-hidden="true"></div>
        <div className="hero__content container">
          <p className="hero__eyebrow">{t('heroEyebrow')}</p>
          <h1 className="hero__title" style={{ fontSize: 'var(--text-4xl)' }}>{t('heroTitle')}</h1>
          <p className="hero__subtitle">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div className="container">
          <div className="story-section">
            <div className="section__header reveal">
              <p className="section__eyebrow">{t('storyEyebrow')}</p>
              <h2 className="section__title">{t('storyTitle')}</h2>
            </div>

            <div className="reveal">
              <p>{t('storyP1')}</p>
              <p>{t('storyP2')}</p>
              <p>{t('storyP3')}</p>
              <p>{t('storyP4')}</p>
            </div>

            <blockquote className="pull-quote reveal">
              <p>{t('storyQuote')}</p>
              <footer style={{ marginTop: 'var(--space-3)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
                {t('storyQuoteAuthor')}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('locationEyebrow')}</p>
            <h2 className="section__title">{t('locationTitle')}</h2>
            <p className="section__subtitle">{t('locationSubtitle')}</p>
          </div>
          <div className="location-card reveal" style={{ maxWidth: 900, marginInline: 'auto' }}>
            <div className="location-card__map" role="img" aria-label={t('locationMapAlt')}>
              <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none" style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} aria-hidden="true">
                <path d="M0,200 C100,160 200,220 300,180 C400,140 500,210 600,170 C700,130 750,190 800,160 L800,300 L0,300 Z" fill="#A8C5D8" />
                <path d="M0,240 C100,200 200,260 300,220 C400,180 500,250 600,210 C700,170 750,230 800,200 L800,300 L0,300 Z" fill="#2C5F8A" opacity="0.6" />
              </svg>
              <a href="https://maps.app.goo.gl/VKaw8pbq24QrQ8Ar9" target="_blank" rel="noopener" className="location-card__map-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {t('locationMapLink')}
              </a>
            </div>
            <div className="location-card__info">
              <div className="location-card__info-group">
                <h4>{t('locationAddressLabel')}</h4>
                <p dangerouslySetInnerHTML={{ __html: t.raw('locationAddress') }} />
              </div>
              <div className="location-card__info-group">
                <h4>{t('locationDirectionsLabel')}</h4>
                <p>{t('locationDirections')}</p>
              </div>
              <div className="location-card__info-group">
                <h4>{t('locationParkingLabel')}</h4>
                <p>{t('locationParking')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-block">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="reveal">
            <span className="cta-block__eyebrow">{t('ctaEyebrow')}</span>
            <h2 className="cta-block__title">{t('ctaTitle')}</h2>
            <p className="cta-block__body">{t('ctaBody')}</p>
            <Link href={'/bestilling' as '/'} className="btn btn--primary btn--lg">{t('ctaCta')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
