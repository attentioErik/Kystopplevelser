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
  const t = await getTranslations({ locale, namespace: 'rib' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/rib-tur-bergen',
      languages: {
        nb: 'https://kystopplevelser.no/rib-tur-bergen',
        en: 'https://kystopplevelser.no/en/rib-tour-bergen',
      },
    },
  };
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

function PricingCard({
  featured = false,
  badge,
  title,
  location,
  duration,
  capacity,
  price,
  tax,
  note,
  ctaText,
  ctaHref,
}: {
  featured?: boolean;
  badge?: string;
  title: string;
  location: string;
  duration: string;
  capacity: string;
  price: string;
  tax: string;
  note: string;
  ctaText: string;
  ctaHref: string;
}) {
  return (
    <div className={`pricing-card${featured ? ' pricing-card--featured' : ''} reveal`}>
      {badge && <span className="pricing-badge">{badge}</span>}
      <h3 className="pricing-card__title">{title}</h3>
      <div className="pricing-card__location">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
        {location}
      </div>
      <div className="pricing-card__meta">
        <div className="pricing-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
          </svg>
          {duration}
        </div>
        <div className="pricing-card__meta-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          {capacity}
        </div>
      </div>
      <hr className="pricing-card__divider" />
      <div className="pricing-card__price-block">
        <div className="pricing-card__price-meta">
          <span className="pricing-card__price">{price}</span>
        </div>
        <span className="pricing-card__tax">{tax}</span>
      </div>
      <div className="pricing-card__note" dangerouslySetInnerHTML={{ __html: note }} />
      <div className="pricing-card__cta">
        <Link href={ctaHref as '/'} className={`btn btn--${featured ? 'primary' : 'outline'} btn--lg`}>
          {ctaText}
        </Link>
      </div>
    </div>
  );
}

export default function RibTurPage() {
  const t = useTranslations('rib');

  return (
    <>
      <Hero
        variant="inner"
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        bgStyle={{ background: '#0A141D' }}
        shaderColors={[
          'hsl(204, 50%, 21%)',   /* Fjord */
          'hsl(205, 45%, 52%)',   /* Seafoam lighter */
          'hsl(209, 52%, 36%)',   /* Ocean */
          'hsl(200, 35%, 75%)',   /* Seafoam */
        ]}
        ctas={[
          { href: '#priser', label: t('heroCta1'), variant: 'primary' },
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

      {/* BENEFITS */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('benefitsEyebrow')}</p>
            <h2 className="section__title">{t('benefitsTitle')}</h2>
          </div>
          <div className="benefits-grid reveal-stagger">
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>}
              title={t('benefit1Title')}
              body={t('benefit1Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
              title={t('benefit2Title')}
              body={t('benefit2Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
              title={t('benefit3Title')}
              body={t('benefit3Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>}
              title={t('benefit4Title')}
              body={t('benefit4Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}
              title={t('benefit5Title')}
              body={t('benefit5Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
              title={t('benefit6Title')}
              body={t('benefit6Body')}
            />
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="priser" className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('pricingEyebrow')}</p>
            <h2 className="section__title">{t('pricingTitle')}</h2>
            <p className="section__subtitle">{t('pricingSubtitle')}</p>
          </div>
          <div className="pricing-grid reveal-stagger">
            <PricingCard
              featured
              badge={t('pricingBadge')}
              title={t('pricing1Title')}
              location={t('pricing1Location')}
              duration={t('pricing1Duration')}
              capacity={t('pricing1Capacity')}
              price={t('pricing1Price')}
              tax={t('pricing1Tax')}
              note={t.raw('pricing1Note')}
              ctaText={t('pricing1Cta')}
              ctaHref="/bestilling"
            />
            <PricingCard
              title={t('pricing2Title')}
              location={t('pricing2Location')}
              duration={t('pricing2Duration')}
              capacity={t('pricing2Capacity')}
              price={t('pricing2Price')}
              tax={t('pricing2Tax')}
              note={t.raw('pricing2Note')}
              ctaText={t('pricing2Cta')}
              ctaHref="/bestilling"
            />
          </div>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-4)', fontSize: 'var(--text-sm)', color: 'var(--text-muted)' }}>
            {t('pricingFootnote')}
          </p>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('includedEyebrow')}</p>
            <h2 className="section__title">{t('includedTitle')}</h2>
            <p className="section__subtitle">{t('includedSubtitle')}</p>
          </div>
          <ul className="included-list included-list--2col reveal" style={{ maxWidth: 680, marginInline: 'auto' }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
          { href: 'tel:+4793624642' as '/', label: t('ctaCta2'), variant: 'ghost' },
        ]}
      />
    </>
  );
}
