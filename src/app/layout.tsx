import type { Metadata } from 'next';
import Script from 'next/script';
import { getLocale } from 'next-intl/server';
import ThemeScript from '@/components/ThemeScript';

const OG_IMAGE = 'https://ucarecdn.com/f35d0529-b060-4496-a6de-164e4f6c4b33/hf_20260309_124501_de624687f2e640f2b3575ba107be2584.jpeg/-/format/jpeg/-/quality/smart/-/resize/1200x630/';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.kyst-opplevelser.no'),
  applicationName: 'Kystopplevelser',
  title: {
    default: 'Kystopplevelser — Autentiske kystopplevelser fra Bergen',
    template: '%s | Kystopplevelser',
  },
  description: 'Kystopplevelser tilbyr RIB-turer, båtutleie og badstue ved sjøen i Bergen. Opplev den norske kysten med sertifiserte skippere. Book din opplevelse i dag.',
  keywords: ['RIB-tur Bergen', 'båtutleie Bergen', 'badstue Bergen', 'sauna Bergen', 'kystopplevelser', 'fjordopplevelser', 'aktiviteter Bergen', 'teambuilding Bergen'],
  authors: [{ name: 'Kystopplevelser AS' }],
  creator: 'Kystopplevelser AS',
  publisher: 'Kystopplevelser AS',
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  openGraph: {
    type: 'website',
    siteName: 'Kystopplevelser',
    locale: 'nb_NO',
    alternateLocale: 'en_US',
    title: 'Kystopplevelser — Autentiske kystopplevelser fra Bergen',
    description: 'RIB-turer, båtutleie og badstue ved sjøen i Bergen. Opplev den norske kysten med sertifiserte skippere.',
    url: 'https://www.kyst-opplevelser.no',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Kystopplevelser — RIB-tur på fjorden i Bergen',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kystopplevelser — Autentiske kystopplevelser fra Bergen',
    description: 'RIB-turer, båtutleie og badstue ved sjøen i Bergen.',
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32', type: 'image/png' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: '/apple-icon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: ['/favicon.ico'],
  },
  manifest: '/site.webmanifest',
  category: 'travel',
};

// Site-wide JSON-LD (company + website). Service, FAQ and breadcrumb data live on each page.
function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': 'https://www.kyst-opplevelser.no/#organization',
        name: 'Kystopplevelser',
        legalName: 'Kystopplevelser AS',
        url: 'https://www.kyst-opplevelser.no',
        logo: 'https://www.kyst-opplevelser.no/icon.png',
        image: OG_IMAGE,
        description: 'Kystopplevelser arrangerer guidede RIB-turer i skjærgården utenfor Bergen med sertifiserte skippere, med base på Sotra. Sammen med samarbeidspartnere formidler vi også båtutleie hos Panorama Hotell og Resort og badstue hos Havblikk Fjordsauna i Øygarden.',
        telephone: '+4746949333',
        email: 'post@kyst-opplevelser.no',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Austefjordsvegen 165',
          addressLocality: 'Steinsland',
          addressRegion: 'Vestland',
          postalCode: '5379',
          addressCountry: 'NO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 60.3506,
          longitude: 5.0821,
        },
        areaServed: [
          {
            '@type': 'City',
            name: 'Bergen',
            '@id': 'https://www.wikidata.org/wiki/Q26793',
          },
          {
            '@type': 'AdministrativeArea',
            name: 'Øygarden',
          },
        ],
        priceRange: 'NOK 9900–13900',
        currenciesAccepted: 'NOK',
        sameAs: [
          'https://www.instagram.com/kyst.opplevelser/',
          'https://www.facebook.com/kystopplevelser',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://www.kyst-opplevelser.no/#website',
        url: 'https://www.kyst-opplevelser.no',
        name: 'Kystopplevelser',
        publisher: { '@id': 'https://www.kyst-opplevelser.no/#organization' },
        inLanguage: ['nb', 'en'],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  return (
    <html lang={locale} data-theme="">
      <head>
        <ThemeScript />
        <JsonLd />
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-M8KCC74Q');`}
        </Script>
        {/* End Google Tag Manager */}
        {/* BusinessBooster Agent: Kystopplevelser */}
        <Script id="bb-config" strategy="beforeInteractive">
          {`window.bbConfig = { clientId: "06477a32-f05b-4f14-b198-c871fe7d5324", agentId: "807d0d3e-4b82-4e34-a3d5-032a085adf7f" };`}
        </Script>
        <Script src="https://booster-engine.vercel.app/api/widget" strategy="afterInteractive" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M8KCC74Q"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
      </body>
    </html>
  );
}
