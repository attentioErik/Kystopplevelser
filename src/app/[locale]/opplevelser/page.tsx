import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'experiences' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/opplevelser',
      languages: {
        nb: 'https://kystopplevelser.no/opplevelser',
        en: 'https://kystopplevelser.no/en/experiences',
      },
    },
  };
}

export default function ExperiencesPage() {
  const t = useTranslations('experiences');

  return (
    <>
      {/* HERO */}
      <section className="hero hero--inner" aria-label={t('heroTitle')}>
        <div
          className="hero__bg"
          aria-hidden="true"
          style={{ background: 'linear-gradient(160deg, #0D1B26 0%, #1B3A52 40%, #2C5F8A 70%, #A8C5D8 100%)' }}
        />
        <div className="hero__overlay" aria-hidden="true"></div>
        <div className="hero__content container">
          <p className="hero__eyebrow">{t('heroEyebrow')}</p>
          <h1 className="hero__title" style={{ fontSize: 'var(--text-4xl)' }}>{t('heroTitle')}</h1>
          <p className="hero__subtitle">{t('heroSubtitle')}</p>
        </div>
      </section>

      {/* SERVICE HUB */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('hubEyebrow')}</p>
            <h2 className="section__title">{t('hubTitle')}</h2>
            <p className="section__subtitle">{t('hubSubtitle')}</p>
          </div>
          <div className="services-hub-grid reveal-stagger">

            <Link href={'/rib-tur-bergen' as '/'} className="service-hub-card reveal">
              <div className="service-hub-card__image">
                <div
                  className="service-hub-card__image-bg"
                  role="img"
                  aria-label={t('ribTitle')}
                  style={{ background: 'linear-gradient(160deg, #1B3A52 0%, #2C5F8A 50%, #A8C5D8 100%)' }}
                />
              </div>
              <div className="service-hub-card__body">
                <p className="service-hub-card__eyebrow">{t('ribEyebrow')}</p>
                <h2 className="service-hub-card__title">{t('ribTitle')}</h2>
                <p className="service-hub-card__desc">{t('ribDesc')}</p>
                <span className="service-hub-card__link">
                  {t('ribLink')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </div>
            </Link>

            <Link href={'/baatutleie-bergen' as '/'} className="service-hub-card reveal">
              <div className="service-hub-card__image">
                <div
                  className="service-hub-card__image-bg"
                  role="img"
                  aria-label={t('boatTitle')}
                  style={{ background: 'linear-gradient(160deg, #1B3A52 0%, #2C5F8A 45%, #3D6B4F 100%)' }}
                />
              </div>
              <div className="service-hub-card__body">
                <p className="service-hub-card__eyebrow">{t('boatEyebrow')}</p>
                <h2 className="service-hub-card__title">{t('boatTitle')}</h2>
                <p className="service-hub-card__desc">{t('boatDesc')}</p>
                <span className="service-hub-card__link">
                  {t('boatLink')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </div>
            </Link>

            <Link href={'/sauna-badstue-bergen' as '/'} className="service-hub-card reveal">
              <div className="service-hub-card__image">
                <div
                  className="service-hub-card__image-bg"
                  role="img"
                  aria-label={t('saunaTitle')}
                  style={{ background: 'linear-gradient(160deg, #C97B2A 0%, #1B3A52 55%, #0D1B26 100%)' }}
                />
              </div>
              <div className="service-hub-card__body">
                <p className="service-hub-card__eyebrow">{t('saunaEyebrow')}</p>
                <h2 className="service-hub-card__title">{t('saunaTitle')}</h2>
                <p className="service-hub-card__desc">{t('saunaDesc')}</p>
                <span className="service-hub-card__link">
                  {t('saunaLink')}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </div>
            </Link>

          </div>
        </div>
      </section>

      {/* TEAMBUILDING CALLOUT */}
      <section className="section section--secondary">
        <div className="container">
          <div className="teambuilding-card reveal">
            <h2 className="teambuilding-card__title">{t('teambuildingTitle')}</h2>
            <p className="teambuilding-card__body">{t('teambuildingBody')}</p>
            <Link href={'/bestilling' as '/'} className="btn btn--ghost btn--lg" style={{ position: 'relative' }}>{t('teambuildingCta')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
