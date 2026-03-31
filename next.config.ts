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
      // Old RIB sub-pages → RIB tour page
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
      // Old target paths from CSV
      { source: '/opplevelser/rib-tur', destination: '/rib-tur-bergen', permanent: true },
    ];
  },
};

export default withNextIntl(nextConfig);
