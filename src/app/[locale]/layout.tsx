import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Fraunces, DM_Serif_Display, Inter } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ScrollReveal from '@/components/ScrollReveal';

import '@/css/design-system.css';
import '@/css/layout.css';
import '@/css/components.css';
import '@/css/animations.css';
import '@/css/services.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-dm-serif',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'nb' | 'en')) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <div className={`${fraunces.variable} ${dmSerif.variable} ${inter.variable}`}>
      <NextIntlClientProvider messages={messages}>
        <a href="#main-content" className="skip-link">
          {locale === 'nb' ? 'Hopp til innhold' : 'Skip to content'}
        </a>
        <Nav />
        <main id="main-content">
          {children}
        </main>
        <Footer />
        <ScrollReveal />
      </NextIntlClientProvider>
    </div>
  );
}
