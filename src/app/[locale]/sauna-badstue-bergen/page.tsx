import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import CtaBlock from '@/components/CtaBlock';
import CheckIcon from '@/components/CheckIcon';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sauna' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/sauna-badstue-bergen',
      languages: {
        nb: 'https://kystopplevelser.no/sauna-badstue-bergen',
        en: 'https://kystopplevelser.no/en/sauna-bergen',
      },
    },
  };
}

function ActivityCard({
  imageUrl,
  imageAlt,
  priceBadge,
  title,
  desc,
  duration,
  capacity,
  heat,
  ctaText,
  ctaHref,
  ctaVariant = 'primary',
}: {
  imageUrl: string;
  imageAlt: string;
  priceBadge: string;
  title: string;
  desc: string;
  duration: string;
  capacity: string;
  heat: string;
  ctaText: string;
  ctaHref: string;
  ctaVariant?: 'primary' | 'outline';
}) {
  return (
    <div className="activity-card reveal">
      <div className="activity-card__image">
        <div
          className="activity-card__image-bg"
          role="img"
          aria-label={imageAlt}
          style={{ backgroundImage: `url('${imageUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <span className="activity-card__price-badge">{priceBadge}</span>
      </div>
      <div className="activity-card__body">
        <h3 className="activity-card__title">{title}</h3>
        <p className="activity-card__desc">{desc}</p>
        <div className="activity-card__meta">
          <div className="activity-card__meta-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
            {duration}
          </div>
          <div className="activity-card__meta-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
            {capacity}
          </div>
          <div className="activity-card__meta-row">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" /></svg>
            {heat}
          </div>
        </div>
      </div>
      <div className="activity-card__cta">
        {ctaHref.startsWith('http') ? (
          <a href={ctaHref} target="_blank" rel="noopener" className={`btn btn--${ctaVariant}`}>{ctaText}</a>
        ) : (
          <Link href={ctaHref as '/'} className={`btn btn--${ctaVariant}`}>{ctaText}</Link>
        )}
      </div>
    </div>
  );
}

function BenefitCard({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="benefit-card reveal">
      <div className="benefit-card__icon" aria-hidden="true">{icon}</div>
      <h3 className="benefit-card__title">{title}</h3>
      <p className="benefit-card__body">{body}</p>
    </div>
  );
}

export default function SaunaPage() {
  const t = useTranslations('sauna');

  return (
    <>
      <Hero
        variant="inner"
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        bgStyle={{ background: '#0A0F14' }}
        shaderColors={[
          'hsl(204, 50%, 15%)',   /* Dark Fjord */
          'hsl(30, 65%, 47%)',    /* Ember #C97B2A */
          'hsl(25, 70%, 35%)',    /* Ember darker */
          'hsl(35, 75%, 58%)',    /* Ember warm glow */
        ]}
        ctas={[
          { href: '#tilbud', label: t('heroCta1'), variant: 'primary' },
          { href: '/bestilling', label: t('heroCta2'), variant: 'ghost' },
        ]}
      />

      {/* BREADCRUMB */}
      <div className="container">
        <nav className="breadcrumb" aria-label="Brødsmule">
          <Link href="/">{t('breadcrumbHome')}</Link>
          <span className="breadcrumb__sep" aria-hidden="true">/</span>
          <span aria-current="page">{t('breadcrumbCurrent')}</span>
        </nav>
      </div>

      {/* INTRO */}
      <section className="section section--sm">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('introEyebrow')}</p>
            <h2 className="section__title">{t('introTitle')}</h2>
          </div>
          <div className="service-intro reveal">
            <p>{t('introP1')}</p>
            <p>{t('introP2')}</p>
            <p>{t('introP3')}</p>
          </div>
        </div>
      </section>

      {/* ACTIVITY CARDS */}
      <section id="tilbud" className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('offersEyebrow')}</p>
            <h2 className="section__title">{t('offersTitle')}</h2>
            <p className="section__subtitle">{t('offersSubtitle')}</p>
          </div>
          <div className="activity-grid reveal-stagger">
            <ActivityCard
              imageUrl="https://cdn.prod.website-files.com/66cdaa32049dd5d43a1497db/66d8210b4627604940fcbdf8_NR3A5948.avif"
              imageAlt={t('card1Title')}
              priceBadge={t('card1Price')}
              title={t('card1Title')}
              desc={t('card1Desc')}
              duration={t('card1Duration')}
              capacity={t('card1Capacity')}
              heat={t('card1Heat')}
              ctaText={t('card1Cta')}
              ctaHref="https://minside.periode.no/bookinggroups/XXmQQb6626w6NAq7OrKm/afhIIXBvWsjDF9kbTIuG/2026-03-31"
            />
            <ActivityCard
              imageUrl="https://cdn.prod.website-files.com/66cdaa32049dd5d43a1497db/66d5b794214f399c4feb6c48_DSC00037.avif"
              imageAlt={t('card2Title')}
              priceBadge={t('card2Price')}
              title={t('card2Title')}
              desc={t('card2Desc')}
              duration={t('card2Duration')}
              capacity={t('card2Capacity')}
              heat={t('card2Heat')}
              ctaText={t('card2Cta')}
              ctaHref="https://minside.periode.no/bookinggroups/XXmQQb6626w6NAq7OrKm/afhIIXBvWsjDF9kbTIuG/2026-03-31"
            />
            <ActivityCard
              imageUrl="https://cdn.prod.website-files.com/66cdaa32049dd5d43a1497db/66d82315c4e5401855538b46_NR3A6028.avif"
              imageAlt={t('card3Title')}
              priceBadge={t('card3Price')}
              title={t('card3Title')}
              desc={t('card3Desc')}
              duration={t('card3Duration')}
              capacity={t('card3Capacity')}
              heat={t('card3Heat')}
              ctaText={t('card3Cta')}
              ctaHref="https://minside.periode.no/bookinggroups/XXmQQb6626w6NAq7OrKm/afhIIXBvWsjDF9kbTIuG/2026-03-31"
              ctaVariant="outline"
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            {t('offersFootnote')}
          </p>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('benefitsEyebrow')}</p>
            <h2 className="section__title">{t('benefitsTitle')}</h2>
          </div>
          <div className="benefits-grid reveal-stagger">
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18" /></svg>}
              title={t('benefit1Title')}
              body={t('benefit1Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}
              title={t('benefit2Title')}
              body={t('benefit2Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8C8 10 5.9 16.17 3.82 19H6a2 2 0 0 1 2 2H5a2 2 0 0 1-2-2 10 10 0 0 1 .83-4A10 10 0 0 1 17 8z" /><path d="M19 3c-5.5 5.5-5 10-3 14a2 2 0 0 0 3-3c2-4 2-9 0-11z" /></svg>}
              title={t('benefit3Title')}
              body={t('benefit3Body')}
            />
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('includedEyebrow')}</p>
            <h2 className="section__title">{t('includedTitle')}</h2>
          </div>
          <ul className="included-list included-list--2col reveal" style={{ maxWidth: 680, marginInline: 'auto' }}>
            {[1, 2].map((i) => (
              <li key={i}>
                <CheckIcon />
                {t(`included${i}`)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <CtaBlock
        eyebrow={t('ctaEyebrow')}
        title={t('ctaTitle')}
        body={t('ctaBody')}
        topWaveFill="var(--bg-secondary)"
        ctas={[
          { href: '/bestilling', label: t('ctaCta1'), variant: 'primary' },
          { href: 'tel:+4746949333' as '/', label: t('ctaCta2'), variant: 'ghost' },
        ]}
      />
    </>
  );
}
