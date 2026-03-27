import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'privacy' });
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: 'https://kystopplevelser.no/personvern',
      languages: {
        nb: 'https://kystopplevelser.no/personvern',
        en: 'https://kystopplevelser.no/en/privacy',
      },
    },
  };
}

export default function PrivacyPage() {
  const t = useTranslations('privacy');

  return (
    <>
      <section className="section section--secondary" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))' }}>
        <div className="container" style={{ maxWidth: 800 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', color: 'var(--text-primary)', marginBottom: 'var(--space-2)' }}>
            {t('pageTitle')}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 'var(--leading-relaxed)', marginBottom: 'var(--space-8)' }}>
            {t('orgInfo')}
          </p>

          <div style={{ color: 'var(--text-primary)', lineHeight: 'var(--leading-relaxed)', fontSize: 'var(--text-base)' }}>

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', marginTop: 'var(--space-8)', marginBottom: 'var(--space-3)' }}>
              {t('paymentTitle')}
            </h2>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section1Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              {t('section1Text')}
            </p>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section2Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              {t('section2Text')}
            </p>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section3Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              {t('section3Text')}
            </p>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section4Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
              {t('section4Text')}
            </p>
            <ul style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)', paddingLeft: 'var(--space-5)' }}>
              <li>{t('section4Item1')}</li>
              <li>{t('section4Item2')}</li>
              <li>{t('section4Item3')}</li>
              <li>{t('section4Item4')}</li>
            </ul>
            <p style={{ marginBottom: 'var(--space-3)', color: 'var(--text-secondary)' }}>
              {t('section4Text2')}
            </p>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.raw('section4Vipps') }} />

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section5Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              {t('section5Text')}
            </p>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section6Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.raw('section6Text1') }} />
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.raw('section6Text2') }} />

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('section7Title')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }}>
              {t('section7Text')}
            </p>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-xl)', color: 'var(--text-primary)', marginTop: 'var(--space-6)', marginBottom: 'var(--space-2)' }}>
              {t('disputeTitle')}
            </h3>
            <p style={{ marginBottom: 'var(--space-4)', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.raw('disputeText') }} />

            <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: 'var(--space-8) 0' }} />

            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', color: 'var(--text-primary)', marginBottom: 'var(--space-4)' }}>
              {t('contactTitle')}
            </h2>
            <p style={{ marginBottom: 'var(--space-2)', color: 'var(--text-secondary)' }}>
              {t('contactText')}
            </p>
            <p style={{ marginBottom: 'var(--space-1)', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.raw('contactPhone') }} />
            <p style={{ marginBottom: 'var(--space-8)', color: 'var(--text-secondary)' }} dangerouslySetInnerHTML={{ __html: t.raw('contactEmail') }} />

          </div>
        </div>
      </section>
    </>
  );
}
