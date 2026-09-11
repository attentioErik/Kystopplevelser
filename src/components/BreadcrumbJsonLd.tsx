import { useLocale, useTranslations } from 'next-intl';
import JsonLd from './JsonLd';
import { breadcrumbList, pageUrl } from '@/lib/schema';

type CrumbKey = 'crumbExperiences' | 'crumbAbout' | 'crumbBooking' | 'crumbGallery' | 'crumbPrivacy';

// BreadcrumbList for simple one-level pages (Home › Page).
export default function BreadcrumbJsonLd({ nameKey, nbPath, enPath }: { nameKey: CrumbKey; nbPath: string; enPath: string }) {
  const t = useTranslations('common');
  const locale = useLocale();
  return (
    <JsonLd
      nodes={[
        breadcrumbList([
          { name: t('crumbHome'), url: pageUrl(locale, '/', '/en') },
          { name: t(nameKey), url: pageUrl(locale, nbPath, enPath) },
        ]),
      ]}
    />
  );
}
