import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ucarecdn.com',
      },
    ],
  },
  async redirects() {
    return [
      // Old RIB sub-pages
      { source: '/rib/taxi-transport', destination: '/rib-tur-bergen', permanent: true },
      { source: '/rib/blatur', destination: '/rib-tur-bergen', permanent: true },
      { source: '/rib/rib-safari', destination: '/rib-tur-bergen', permanent: true },
      { source: '/rib/havrafting', destination: '/rib-tur-bergen', permanent: true },
      { source: '/rib/vare-smitteverntiltak', destination: '/rib-tur-bergen', permanent: true },
      { source: '/rib/kapasitet', destination: '/rib-tur-bergen', permanent: true },
      // Old Norwegian site paths
      { source: '/no/forside', destination: '/', permanent: true },
      { source: '/no/om-oss', destination: '/om-oss', permanent: true },
      { source: '/no/bilder', destination: '/galleri', permanent: true },
      { source: '/no/kontakt', destination: '/bestilling', permanent: true },
      // Old Webflow paths (Google-indexed) — Norwegian
      { source: '/opplevelser/rib-tur', destination: '/rib-tur-bergen', permanent: true },
      { source: '/opplevelser/batutleie', destination: '/baatutleie-bergen', permanent: true },
      { source: '/opplevelser/badstu', destination: '/sauna-badstue-bergen', permanent: true },
      { source: '/betalingsbetingelser', destination: '/personvern', permanent: true },
      // Old Webflow paths (Google-indexed) — English
      { source: '/en/opplevelser/rib-tur', destination: '/en/rib-tour-bergen', permanent: true },
      { source: '/en/opplevelser/badstu', destination: '/en/sauna-bergen', permanent: true },
      { source: '/en/opplevelser/batutleie', destination: '/en/boat-rental-bergen', permanent: true },
      { source: '/en/betalingsbetingelser', destination: '/en/privacy', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
