import type { Metadata } from 'next';

export const SITE_URL = 'https://kyst-opplevelser.no';

export type RouteDef = {
  /** Norwegian (default) path, e.g. '/rib-tur-bergen' */
  nb: string;
  /** English path including the /en prefix, e.g. '/en/rib-tour-bergen' */
  en: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
};

/**
 * Single source of truth for the public, indexable routes of the site.
 * Used by both the sitemap (src/app/sitemap.ts) and per-page hreflang/canonical.
 * Keep slugs in sync with src/i18n/routing.ts.
 */
export const ROUTES: RouteDef[] = [
  { nb: '/', en: '/en', priority: 1.0, changeFrequency: 'weekly' },
  { nb: '/rib-tur-bergen', en: '/en/rib-tour-bergen', priority: 0.9, changeFrequency: 'monthly' },
  { nb: '/baatutleie-bergen', en: '/en/boat-rental-bergen', priority: 0.9, changeFrequency: 'monthly' },
  { nb: '/sauna-badstue-bergen', en: '/en/sauna-bergen', priority: 0.9, changeFrequency: 'monthly' },
  { nb: '/opplevelser', en: '/en/experiences', priority: 0.8, changeFrequency: 'monthly' },
  { nb: '/bestilling', en: '/en/booking', priority: 0.8, changeFrequency: 'monthly' },
  { nb: '/om-oss', en: '/en/about', priority: 0.6, changeFrequency: 'yearly' },
  { nb: '/galleri', en: '/en/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { nb: '/personvern', en: '/en/privacy', priority: 0.3, changeFrequency: 'yearly' },
];

/**
 * Builds locale-aware canonical + hreflang alternates for a page.
 * Each locale self-canonicalizes (the English page points to itself, not to
 * the Norwegian one) so both versions can be indexed independently, while the
 * `languages` map ties them together as an hreflang cluster.
 */
export function buildAlternates(
  locale: string,
  nbPath: string,
  enPath: string,
): Metadata['alternates'] {
  const nb = `${SITE_URL}${nbPath}`;
  const en = `${SITE_URL}${enPath}`;
  return {
    canonical: locale === 'en' ? en : nb,
    languages: {
      nb,
      en,
      'x-default': nb,
    },
  };
}
