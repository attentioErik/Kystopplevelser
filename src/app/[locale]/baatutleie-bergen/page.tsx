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
  const t = await getTranslations({ locale, namespace: 'boat' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/baatutleie-bergen',
      languages: {
        nb: 'https://kystopplevelser.no/baatutleie-bergen',
        en: 'https://kystopplevelser.no/en/boat-rental-bergen',
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

export default function BoatRentalPage() {
  const t = useTranslations('boat');

  return (
    <>
      <Hero
        variant="inner"
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        bgStyle={{ background: '#0D1B26' }}
        shaderColors={[
          'hsl(204, 50%, 21%)',   /* Fjord */
          'hsl(152, 29%, 33%)',   /* Moss #3D6B4F */
          'hsl(209, 52%, 36%)',   /* Ocean */
          'hsl(155, 30%, 55%)',   /* Moss lighter */
        ]}
        ctas={[
          { href: '#kontakt', label: t('heroCta1'), variant: 'primary' },
          { href: '#hva-passer-det-for', label: t('heroCta2'), variant: 'ghost' },
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

      {/* WHO IS IT FOR */}
      <section id="hva-passer-det-for" className="section section--secondary">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('audienceEyebrow')}</p>
            <h2 className="section__title">{t('audienceTitle')}</h2>
            <p className="section__subtitle">{t('audienceSubtitle')}</p>
          </div>
          <div className="benefits-grid reveal-stagger">
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>}
              title={t('benefit1Title')}
              body={t('benefit1Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
              title={t('benefit2Title')}
              body={t('benefit2Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" /></svg>}
              title={t('benefit3Title')}
              body={t('benefit3Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>}
              title={t('benefit4Title')}
              body={t('benefit4Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>}
              title={t('benefit5Title')}
              body={t('benefit5Body')}
            />
            <BenefitCard
              icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>}
              title={t('benefit6Title')}
              body={t('benefit6Body')}
            />
          </div>
        </div>
      </section>

      {/* INCLUDED */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('includedEyebrow')}</p>
            <h2 className="section__title">{t('includedTitle')}</h2>
          </div>
          <ul className="included-list included-list--2col reveal" style={{ maxWidth: 680, marginInline: 'auto' }}>
            {[1, 2, 3, 4].map((i) => (
              <li key={i}>
                <CheckIcon />
                {t(`included${i}`)}
              </li>
            ))}
          </ul>
          <p style={{ textAlign: 'center', marginTop: 'var(--space-4)', color: 'var(--text-secondary)', fontSize: 'var(--text-sm)' }}>{t('includedFootnote')}</p>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="kontakt" className="section section--secondary">
        <div className="container">
          <div className="contact-cta-card reveal">
            <span className="contact-cta-card__eyebrow">{t('contactEyebrow')}</span>
            <h2 className="contact-cta-card__title">{t('contactTitle')}</h2>
            <p className="contact-cta-card__body">{t('contactBody')}</p>
            <div className="contact-cta-card__actions">
              <Link href={'/bestilling' as '/'} className="btn btn--primary btn--lg">{t('contactCta1')}</Link>
              <a href="tel:+4746949333" className="btn btn--outline btn--lg">{t('contactCta2')}</a>
            </div>
          </div>
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
          { href: 'mailto:post@kyst-opplevelser.no' as '/', label: t('ctaCta2'), variant: 'ghost' },
        ]}
      />
    </>
  );
}
