import type { MetadataRoute } from 'next';
import { ROUTES, SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route.nb}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    alternates: {
      languages: {
        nb: `${SITE_URL}${route.nb}`,
        en: `${SITE_URL}${route.en}`,
      },
    },
  }));
}
