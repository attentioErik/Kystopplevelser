import { getTranslations } from 'next-intl/server';
import Gallery from '@/components/Gallery';
import { buildAlternates } from '@/lib/seo';
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
    alternates: buildAlternates(locale, '/galleri', '/en/gallery'),
  };
}

export default function GalleriPage() {
  return <Gallery />;
}
