import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import BookingForm from '@/components/BookingForm';
import { buildAlternates } from '@/lib/seo';
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
    alternates: buildAlternates(locale, '/bestilling', '/en/booking'),
  };
}

export default function BestillingPage() {
  return (
    <Suspense>
      <BookingForm />
    </Suspense>
  );
}
