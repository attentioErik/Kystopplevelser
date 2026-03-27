import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import BookingForm from '@/components/BookingForm';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'booking' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: 'https://kystopplevelser.no/bestilling',
      languages: {
        nb: 'https://kystopplevelser.no/bestilling',
        en: 'https://kystopplevelser.no/en/booking',
      },
    },
  };
}

export default function BestillingPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}
