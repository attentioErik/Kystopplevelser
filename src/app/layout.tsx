import type { Metadata } from 'next';
import ThemeScript from '@/components/ThemeScript';

const OG_IMAGE = 'https://ucarecdn.com/f35d0529-b060-4496-a6de-164e4f6c4b33/hf_20260309_124501_de624687f2e640f2b3575ba107be2584.jpeg';

export const metadata: Metadata = {
  metadataBase: new URL('https://kystopplevelser.no'),
  applicationName: 'Kystopplevelser',
  title: {
    default: 'Kystopplevelser — Autentiske kystopplevelser fra Bergen',
    template: '%s | Kystopplevelser',
  },
  description: 'Kystopplevelser tilbyr RIB-turer, båtutleie og badstue ved sjøen i Bergen. Opplev den norske kysten med erfarne guider — book din opplevelse i dag.',
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
    description: 'RIB-turer, båtutleie og badstue ved sjøen i Bergen. Opplev den norske kysten med erfarne guider.',
    url: 'https://kystopplevelser.no',
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

// JSON-LD structured data for search engines and AI models
function JsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TouristAttraction',
        '@id': 'https://kystopplevelser.no/#organization',
        name: 'Kystopplevelser',
        alternateName: 'Kystopplevelser AS',
        url: 'https://kystopplevelser.no',
        logo: 'https://kystopplevelser.no/icon.png',
        image: OG_IMAGE,
        description: 'Kystopplevelser tilbyr autentiske kystopplevelser fra Bergen — RIB-turer på fjorden, båtutleie og flytende badstue ved sjøen. Opplev den norske kysten med erfarne, sertifiserte guider.',
        telephone: '+4793624642',
        email: 'post@kyst-opplevelser.no',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Austefjordsvegen 165',
          addressLocality: 'Steinsland',
          postalCode: '5379',
          addressCountry: 'NO',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 60.2414,
          longitude: 5.1052,
        },
        areaServed: {
          '@type': 'City',
          name: 'Bergen',
          '@id': 'https://www.wikidata.org/wiki/Q26793',
        },
        priceRange: 'NOK 319–13900',
        currenciesAccepted: 'NOK',
        paymentAccepted: 'Vipps, Credit Card',
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '08:00',
          closes: '20:00',
        },
        sameAs: [
          'https://www.instagram.com/kyst.opplevelser/',
          'https://www.facebook.com/kystopplevelser',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://kystopplevelser.no/#website',
        url: 'https://kystopplevelser.no',
        name: 'Kystopplevelser',
        publisher: { '@id': 'https://kystopplevelser.no/#organization' },
        inLanguage: ['nb', 'en'],
      },
      {
        '@type': 'TouristTrip',
        name: 'RIB-tur Bergen',
        description: 'Guidet RIB-tur på Byfjorden med erfarne guider. Avgang fra Bergen sentrum eller Sotra. Opptil 12 personer.',
        touristType: ['Adventure tourism', 'Water sports'],
        provider: { '@id': 'https://kystopplevelser.no/#organization' },
        offers: [
          {
            '@type': 'Offer',
            name: 'RIB-tur fra Bergen Sentrum',
            price: '13900',
            priceCurrency: 'NOK',
            priceSpecification: {
              '@type': 'PriceSpecification',
              valueAddedTaxIncluded: false,
            },
            url: 'https://kystopplevelser.no/rib-tur-bergen',
          },
          {
            '@type': 'Offer',
            name: 'RIB-tur fra Sotra (Sund)',
            price: '9900',
            priceCurrency: 'NOK',
            priceSpecification: {
              '@type': 'PriceSpecification',
              valueAddedTaxIncluded: false,
            },
            url: 'https://kystopplevelser.no/rib-tur-bergen',
          },
        ],
      },
      {
        '@type': 'Product',
        name: 'Båtutleie Bergen',
        description: 'Lei motorbåt og utforsk skjærgården rundt Bergen i eget tempo. Opptil 8 personer, ingen erfaring nødvendig.',
        provider: { '@id': 'https://kystopplevelser.no/#organization' },
        url: 'https://kystopplevelser.no/baatutleie-bergen',
      },
      {
        '@type': 'TouristTrip',
        name: 'Badstue Bergen',
        description: 'Flytende badstue med panoramautsikt over Byfjorden. Privat sauna, badstuecruise og drop-in. Tilgjengelig hele året.',
        touristType: ['Wellness tourism'],
        provider: { '@id': 'https://kystopplevelser.no/#organization' },
        offers: [
          {
            '@type': 'Offer',
            name: 'Privat sauna',
            price: '5150',
            priceCurrency: 'NOK',
            url: 'https://kystopplevelser.no/sauna-badstue-bergen',
          },
          {
            '@type': 'Offer',
            name: 'Badstuecruise',
            price: '9900',
            priceCurrency: 'NOK',
            url: 'https://kystopplevelser.no/sauna-badstue-bergen',
          },
          {
            '@type': 'Offer',
            name: 'Drop-in sauna',
            price: '319',
            priceCurrency: 'NOK',
            url: 'https://kystopplevelser.no/sauna-badstue-bergen',
          },
        ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" data-theme="">
      <head>
        <ThemeScript />
        <JsonLd />
      </head>
      <body>{children}</body>
    </html>
  );
}
