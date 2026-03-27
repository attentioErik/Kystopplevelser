import { getTranslations } from 'next-intl/server';
import Gallery from '@/components/Gallery';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'gallery' });
  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical: 'https://kystopplevelser.no/galleri',
      languages: {
        nb: 'https://kystopplevelser.no/galleri',
      },
    },
  };
}

export default function GalleriPage() {
  return <Gallery />;
}
