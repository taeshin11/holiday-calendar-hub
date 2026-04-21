import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Script from 'next/script';
import { FeedbackButton } from '@/components/FeedbackButton';
import { AdSocialBar } from '@/components/ads/AdSocialBar';

const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];

export async function generateStaticParams() {
  return locales.map(locale => ({ locale }));
}

export const metadata: Metadata = {
  verification: {
    google: "WddgcbVJsL2BGHNAje5m6DK56IcR0Mw5UOqozI2Xtrc",
  },
  title: {
    default: 'Public Holiday Calendar by Country 2025-2026 | HolidayCalendarHub',
    template: '%s | HolidayCalendarHub',
  },
  description:
    'Find public holidays, bank holidays, and cultural observances for 50+ countries. Plan travel and work schedules with our comprehensive holiday calendar.',
  keywords: [
    'public holidays',
    'holiday calendar',
    'bank holidays',
    'national holidays',
    'holidays by country',
    '2025 holidays',
    '2026 holidays',
    'international holidays',
  ],
  metadataBase: new URL('https://holiday-calendar-hub.vercel.app'),
  alternates: {
    canonical: 'https://holiday-calendar-hub.vercel.app',
    languages: {
      en: 'https://holiday-calendar-hub.vercel.app/en',
      ko: 'https://holiday-calendar-hub.vercel.app/ko',
      ja: 'https://holiday-calendar-hub.vercel.app/ja',
      zh: 'https://holiday-calendar-hub.vercel.app/zh',
      es: 'https://holiday-calendar-hub.vercel.app/es',
      fr: 'https://holiday-calendar-hub.vercel.app/fr',
      de: 'https://holiday-calendar-hub.vercel.app/de',
      pt: 'https://holiday-calendar-hub.vercel.app/pt',
    },
  },
  openGraph: {
    siteName: 'HolidayCalendarHub',
    type: 'website',
    title: 'Public Holiday Calendar by Country 2025-2026 | HolidayCalendarHub',
    description:
      'Find public holidays, bank holidays, and cultural observances for 50+ countries. Plan travel and work schedules with our comprehensive holiday calendar.',
    url: 'https://holiday-calendar-hub.vercel.app',
    images: [
      {
        url: 'https://holiday-calendar-hub.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HolidayCalendarHub — Public Holiday Calendar Worldwide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Public Holiday Calendar by Country 2025-2026 | HolidayCalendarHub',
    description:
      'Find public holidays, bank holidays, and cultural observances for 50+ countries. Plan travel and work schedules with our comprehensive holiday calendar.',
    images: ['https://holiday-calendar-hub.vercel.app/og-image.png'],
  },
  other: {
    'google-adsense-account': 'ca-pub-7098271335538021',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navbar locale={locale} />
      <main className="flex-1">
        {children}
      </main>
      <AdSocialBar />
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7098271335538021" crossOrigin="anonymous" strategy="afterInteractive" />
      <FeedbackButton siteName="HolidayCalendarHub" />
      <Footer locale={locale} />
    </NextIntlClientProvider>
  );
}
