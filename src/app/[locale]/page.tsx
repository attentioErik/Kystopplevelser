import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/Hero';
import ServiceHubCard from '@/components/ServiceHubCard';
import FeatureSplit from '@/components/FeatureSplit';
import CtaBlock from '@/components/CtaBlock';
import HeroVideo from '@/components/HeroVideo';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/',
      languages: {
        nb: 'https://kystopplevelser.no/',
        en: 'https://kystopplevelser.no/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: 'https://kystopplevelser.no',
      images: ['https://ucarecdn.com/f35d0529-b060-4496-a6de-164e4f6c4b33/hf_20260309_124501_de624687f2e640f2b3575ba107be2584.jpeg'],
    },
  };
}

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <>
      <Hero
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        videoUrl="https://player.vimeo.com/video/1170952103?badge=0&autopause=0&player_id=0&app_id=58479&background=1&autoplay=1&loop=1&muted=1"
        ctas={[
          { href: '/opplevelser', label: t('heroCta1'), variant: 'primary' },
          { href: '/bestilling', label: t('heroCta2'), variant: 'ghost' },
        ]}
      />
      <HeroVideo />

      {/* SERVICE CARDS */}
      <section className="section" aria-labelledby="services-heading">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('servicesEyebrow')}</p>
            <h2 id="services-heading" className="section__title">{t('servicesTitle')}</h2>
            <p className="section__subtitle">{t('servicesSubtitle')}</p>
          </div>
          <div className="services-hub-grid reveal-stagger">
            <ServiceHubCard
              href="/rib-tur-bergen"
              imageUrl="https://ucarecdn.com/e1f06564-4b7f-47a9-b225-d4b38d40be95/creative_1_4x5.jpg"
              imageAlt={t('ribTitle')}
              eyebrow={t('ribEyebrow')}
              title={t('ribTitle')}
              desc={t('ribDesc')}
              linkText={t('ribLink')}
            />
            <ServiceHubCard
              href="/baatutleie-bergen"
              imageUrl="https://ucarecdn.com/9219159c-e2f1-42e7-8495-19e909e408a2/ChatGPTImage9mars202614_38_38.png"
              imageAlt={t('boatTitle')}
              eyebrow={t('boatEyebrow')}
              title={t('boatTitle')}
              desc={t('boatDesc')}
              linkText={t('boatLink')}
            />
            <ServiceHubCard
              href="/sauna-badstue-bergen"
              imageUrl="https://ucarecdn.com/2f6895d2-423a-4ac4-9193-6f21d0d75aad/NR3A5948.jpg"
              imageAlt={t('saunaTitle')}
              eyebrow={t('saunaEyebrow')}
              title={t('saunaTitle')}
              desc={t('saunaDesc')}
              linkText={t('saunaLink')}
            />
          </div>
        </div>
      </section>

      {/* AUDIENCE QUALIFIER */}
      <section className="section section--secondary" aria-labelledby="audience-heading">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('audienceEyebrow')}</p>
            <h2 id="audience-heading" className="section__title">{t('audienceTitle')}</h2>
          </div>
          <div className="audience-grid reveal-stagger">
            <div className="audience-card reveal">
              <div className="audience-card__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
                </svg>
              </div>
              <h3 className="audience-card__title">{t('touristTitle')}</h3>
              <p className="audience-card__body">{t('touristBody')}</p>
            </div>
            <div className="audience-card reveal">
              <div className="audience-card__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
              </div>
              <h3 className="audience-card__title">{t('corporateTitle')}</h3>
              <p className="audience-card__body">{t('corporateBody')}</p>
            </div>
            <div className="audience-card reveal">
              <div className="audience-card__icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="audience-card__title">{t('groupTitle')}</h3>
              <p className="audience-card__body">{t('groupBody')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURE SPLIT — RIB */}
      <section className="section section--secondary" aria-labelledby="feature-rib-heading">
        <div className="container">
          <FeatureSplit
            eyebrow={t('featureRibEyebrow')}
            title={t('featureRibTitle')}
            body={t('featureRibBody')}
            bullets={[t('featureRibBullet1'), t('featureRibBullet2'), t('featureRibBullet3')]}
            ctaText={t('featureRibCta')}
            ctaHref="/rib-tur-bergen"
            imageUrl="https://ucarecdn.com/63a64994-bb1a-4015-9b41-7a705a6e84a4/hf_20260309_124325_5604bd3732d74ee89dc0be428cb316e7.jpeg"
            imageAlt={t('featureRibTitle')}
            useImgTag
          />
        </div>
      </section>

      {/* FEATURE SPLIT — SAUNA */}
      <section className="section" aria-labelledby="feature-badstue-heading">
        <div className="container">
          <FeatureSplit
            eyebrow={t('featureSaunaEyebrow')}
            title={t('featureSaunaTitle')}
            body={t('featureSaunaBody')}
            bullets={[t('featureSaunaBullet1'), t('featureSaunaBullet2'), t('featureSaunaBullet3')]}
            ctaText={t('featureSaunaCta')}
            ctaHref="/sauna-badstue-bergen"
            imageUrl="https://ucarecdn.com/f9dfa111-1715-4fae-8c30-9d95c72895ef/DSC00039.jpg"
            imageAlt={t('featureSaunaTitle')}
            reversed
          />
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section section--secondary" aria-labelledby="testimonials-heading">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('testimonialsEyebrow')}</p>
            <h2 id="testimonials-heading" className="section__title">{t('testimonialsTitle')}</h2>
          </div>
          <div className="testimonials">
            <div className="testimonial-card testimonial-card--large reveal">
              <span className="testimonial-card__quote-mark" aria-hidden="true">&ldquo;</span>
              <p className="testimonial-card__text">{t('testimonial1Text')}</p>
              <div className="testimonial-card__stars" aria-label="5 av 5 stjerner">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
              <p className="testimonial-card__reviewer">{t('testimonial1Name')}</p>
              <p className="testimonial-card__descriptor">{t('testimonial1Desc')}</p>
            </div>
            <div className="testimonial-stack">
              <div className="testimonial-card reveal">
                <div className="testimonial-card__stars" aria-label="5 av 5 stjerner" style={{ marginBottom: 'var(--space-2)' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-card__text testimonial-card__text--sm">{t('testimonial2Text')}</p>
                <p className="testimonial-card__reviewer">{t('testimonial2Name')}</p>
                <p className="testimonial-card__descriptor">{t('testimonial2Desc')}</p>
              </div>
              <div className="testimonial-card reveal">
                <div className="testimonial-card__stars" aria-label="5 av 5 stjerner" style={{ marginBottom: 'var(--space-2)' }}>
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-card__text testimonial-card__text--sm">{t('testimonial3Text')}</p>
                <p className="testimonial-card__reviewer">{t('testimonial3Name')}</p>
                <p className="testimonial-card__descriptor">{t('testimonial3Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY TEASER */}
      <section className="section" aria-labelledby="gallery-teaser-heading">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('galleryEyebrow')}</p>
            <h2 id="gallery-teaser-heading" className="section__title">{t('galleryTitle')}</h2>
          </div>
          <div className="gallery-teaser reveal">
            {[
              'https://ucarecdn.com/0be2f591-b48c-4af5-9bae-a6c96d2ac848/DSC00030.jpg',
              'https://ucarecdn.com/f35d0529-b060-4496-a6de-164e4f6c4b33/hf_20260309_124501_de624687f2e640f2b3575ba107be2584.jpeg',
              'https://ucarecdn.com/00bbbd10-916f-42af-ad7d-3709e700ba54/hf_20260309_124306_644cf7b4f14a4eaa8178a9f050d8f4ed.jpeg',
            ].map((url, i) => (
              <div key={i} className="gallery-teaser__item">
                <div
                  className="gallery-teaser__placeholder"
                  role="img"
                  aria-label={t('galleryTitle')}
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('${url}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }} className="reveal">
            <a href="/galleri" className="btn btn--outline btn--lg">{t('galleryLink')}</a>
          </div>
        </div>
      </section>

      {/* CTA BLOCK */}
      <CtaBlock
        eyebrow={t('ctaEyebrow')}
        title={t('ctaTitle')}
        body={t('ctaBody')}
        ctas={[{ href: '/bestilling', label: t('ctaCta'), variant: 'primary' }]}
      />
    </>
  );
}
