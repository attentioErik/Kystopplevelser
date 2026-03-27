import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['nb', 'en'],
  defaultLocale: 'nb',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/rib-tur-bergen': {
      nb: '/rib-tur-bergen',
      en: '/rib-tour-bergen',
    },
    '/baatutleie-bergen': {
      nb: '/baatutleie-bergen',
      en: '/boat-rental-bergen',
    },
    '/sauna-badstue-bergen': {
      nb: '/sauna-badstue-bergen',
      en: '/sauna-bergen',
    },
    '/bestilling': {
      nb: '/bestilling',
      en: '/booking',
    },
    '/om-oss': {
      nb: '/om-oss',
      en: '/about',
    },
    '/opplevelser': {
      nb: '/opplevelser',
      en: '/experiences',
    },
    '/galleri': {
      nb: '/galleri',
      en: '/gallery',
    },
    '/personvern': {
      nb: '/personvern',
      en: '/privacy',
    },
  },
});
