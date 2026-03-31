import type { Metadata } from 'next';
import ThemeScript from '@/components/ThemeScript';

export const metadata: Metadata = {
  metadataBase: new URL('https://kystopplevelser.no'),
  applicationName: 'Kystopplevelser',
  title: {
    default: 'Kystopplevelser',
    template: '%s | Kystopplevelser',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb" data-theme="">
      <head>
        <ThemeScript />
      </head>
      <body>{children}</body>
    </html>
  );
}
