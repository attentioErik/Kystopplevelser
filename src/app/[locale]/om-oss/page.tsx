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
            <p className="section__eyebrow text-center reveal">{t('storyEyebrow')}</p>
            <h2 className="section__title text-center reveal" style={{ marginBottom: 'var(--space-8)' }}>{t('storyTitle')}</h2>

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

      {/* VALUES */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('valuesEyebrow')}</p>
            <h2 className="section__title">{t('valuesTitle')}</h2>
            <p className="section__subtitle">{t('valuesSubtitle')}</p>
          </div>
          <div className="values-grid reveal-stagger">
            <div className="values-card reveal">
              <div className="values-card__icon values-card__icon--ember" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="values-card__title">{t('value1Title')}</h3>
              <p className="values-card__body">{t('value1Body')}</p>
            </div>
            <div className="values-card reveal">
              <div className="values-card__icon values-card__icon--ocean" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <h3 className="values-card__title">{t('value2Title')}</h3>
              <p className="values-card__body">{t('value2Body')}</p>
            </div>
            <div className="values-card reveal">
              <div className="values-card__icon values-card__icon--moss" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 8C8 10 5.9 16.17 3.82 19H6a2 2 0 0 1 2 2H5a2 2 0 0 1-2-2 10 10 0 0 1 .83-4A10 10 0 0 1 17 8z" />
                  <path d="M19 3c-5.5 5.5-5 10-3 14a2 2 0 0 0 3-3c2-4 2-9 0-11z" />
                </svg>
              </div>
              <h3 className="values-card__title">{t('value3Title')}</h3>
              <p className="values-card__body">{t('value3Body')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('teamEyebrow')}</p>
            <h2 className="section__title">{t('teamTitle')}</h2>
            <p className="section__subtitle">{t('teamSubtitle')}</p>
          </div>
          <div className="team-grid reveal-stagger" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
            <div className="team-card reveal">
              <div className="team-card__avatar">
                <div className="team-card__avatar-placeholder" role="img" aria-label="Henrik Johannesen" style={{ background: 'linear-gradient(135deg, #1B3A52, #2C5F8A)' }} />
              </div>
              <h3 className="team-card__name">{t('team1Name')}</h3>
              <p className="team-card__role">{t('team1Role')}</p>
              <p className="team-card__tagline">{t('team1Tagline')}</p>
            </div>
            <div className="team-card reveal">
              <div className="team-card__avatar">
                <div className="team-card__avatar-placeholder" role="img" aria-label="Lars Erik Skutle" style={{ background: 'linear-gradient(135deg, #3D6B4F, #2C5F8A)' }} />
              </div>
              <h3 className="team-card__name">{t('team2Name')}</h3>
              <p className="team-card__role">{t('team2Role')}</p>
              <p className="team-card__tagline">{t('team2Tagline')}</p>
            </div>
            <div className="team-card reveal">
              <div className="team-card__avatar">
                <div className="team-card__avatar-placeholder" role="img" aria-label="Hanne Bernhardsen" style={{ background: 'linear-gradient(135deg, #C97B2A, #1B3A52)' }} />
              </div>
              <h3 className="team-card__name">{t('team3Name')}</h3>
              <p className="team-card__role">{t('team3Role')}</p>
              <p className="team-card__tagline">{t('team3Tagline')}</p>
            </div>
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
              <svg width="100%" height="100%" viewBox="0 0 800 300" fill="none" style={{ position: 'absolute', inset: 0, opacity: 0.15 }} aria-hidden="true">
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

      {/* SAFETY */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('safetyEyebrow')}</p>
            <h2 className="section__title">{t('safetyTitle')}</h2>
          </div>
          <div className="safety-strip reveal">
            <div className="safety-strip__badges" role="list">
              <div className="safety-badge" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                {t('safetyBadge1')}
              </div>
              <div className="safety-badge" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                {t('safetyBadge2')}
              </div>
              <div className="safety-badge" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                {t('safetyBadge3')}
              </div>
              <div className="safety-badge" role="listitem">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
                {t('safetyBadge4')}
              </div>
            </div>
            <p className="safety-strip__text">{t('safetyText')}</p>
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
