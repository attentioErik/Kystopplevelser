import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import Hero from '@/components/Hero';
import ServiceHubCard from '@/components/ServiceHubCard';
import { uc } from '@/lib/uploadcare';
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
      <Hero
        variant="inner"
        eyebrow={t('heroEyebrow')}
        title={t('heroTitle')}
        subtitle={t('heroSubtitle')}
        bgStyle={{ background: '#0A141D' }}
        shaderColors={[
          'hsl(204, 50%, 21%)',
          'hsl(205, 45%, 52%)',
          'hsl(209, 52%, 36%)',
          'hsl(200, 35%, 75%)',
        ]}
      />

      {/* SERVICE HUB */}
      <section className="section">
        <div className="container">
          <div className="section__header reveal">
            <p className="section__eyebrow">{t('hubEyebrow')}</p>
            <h2 className="section__title">{t('hubTitle')}</h2>
            <p className="section__subtitle">{t('hubSubtitle')}</p>
          </div>
          <div className="services-hub-grid reveal-stagger">
            <ServiceHubCard
              href="/rib-tur-bergen"
              imageUrl={uc('https://ucarecdn.com/e1f06564-4b7f-47a9-b225-d4b38d40be95/creative_1_4x5.jpg', { width: 800 })}
              imageAlt={t('ribTitle')}
              eyebrow={t('ribEyebrow')}
              title={t('ribTitle')}
              desc={t('ribDesc')}
              linkText={t('ribLink')}
            />
            <ServiceHubCard
              href="/baatutleie-bergen"
              imageUrl={uc('https://ucarecdn.com/9219159c-e2f1-42e7-8495-19e909e408a2/ChatGPTImage9mars202614_38_38.png', { width: 800 })}
              imageAlt={t('boatTitle')}
              eyebrow={t('boatEyebrow')}
              title={t('boatTitle')}
              desc={t('boatDesc')}
              linkText={t('boatLink')}
            />
            <ServiceHubCard
              href="/sauna-badstue-bergen"
              imageUrl={uc('https://ucarecdn.com/2f6895d2-423a-4ac4-9193-6f21d0d75aad/NR3A5948.jpg', { width: 800 })}
              imageAlt={t('saunaTitle')}
              eyebrow={t('saunaEyebrow')}
              title={t('saunaTitle')}
              desc={t('saunaDesc')}
              linkText={t('saunaLink')}
            />
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
