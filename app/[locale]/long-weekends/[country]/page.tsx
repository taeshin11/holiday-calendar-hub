import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry, getAllCountries, computeLongWeekends } from '@/lib/holidays';
import LongWeekendCard from '@/components/LongWeekendCard';
import AdSlot from '@/components/AdSlot';
import { notFound } from 'next/navigation';
import { Download, ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const countries = getAllCountries();
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  return locales.flatMap(locale =>
    countries.map(country => ({ locale, country: country.code }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}): Promise<Metadata> {
  const { country: countryCode } = await params;
  const country = getCountry(countryCode);
  if (!country) return {};

  return {
    title: `Long Weekends ${country.name.en} 2025 — Bridge Days & Leave Optimizer | HolidayCalendarHub`,
    description: `Find every long weekend opportunity in ${country.name.en} for 2025. Discover bridge days and maximize your time off with minimal leave.`,
  };
}

const faqSchema = (countryName: string) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: `How many long weekends are there in ${countryName} in 2025?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `${countryName} has several opportunities for long weekends in 2025. Use our Long Weekend Optimizer to find every bridge day opportunity.`,
      },
    },
    {
      '@type': 'Question',
      name: `What is a bridge day in ${countryName}?`,
      acceptedAnswer: {
        '@type': 'Answer',
        text: `A bridge day is a working day between a public holiday and a weekend. By taking a single day of leave on the bridge day, you can create a 4 or 5-day weekend.`,
      },
    },
  ],
});

export default async function CountryLongWeekendsPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: countryCode } = await params;
  const country = getCountry(countryCode);

  if (!country) notFound();

  const countryName = country.name[locale] || country.name.en;
  const longWeekends = computeLongWeekends(countryCode);
  const noLeave = longWeekends.filter(lw => lw.leaveDaysNeeded === 0);
  const oneDay = longWeekends.filter(lw => lw.leaveDaysNeeded === 1);
  const twoDays = longWeekends.filter(lw => lw.leaveDaysNeeded === 2);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(country.name.en)) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={{ color: '#6b7280' }}>
          <Link href={`/${locale}`} className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/long-weekends`} className="hover:text-purple-600">Long Weekends</Link>
          <span>/</span>
          <span style={{ color: '#1a1235' }}>{countryName}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{country.flag}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black" style={{ color: '#1a1235' }}>
                  Long Weekends in {countryName}
                </h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {longWeekends.length} opportunities in 2025 · Maximize your time off
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/api/ical/${country.code}/2025`}
            className="btn-primary inline-flex items-center gap-2 flex-shrink-0"
          >
            <Download size={16} />
            Download iCal
          </Link>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="card p-4 text-center">
            <div className="text-2xl font-black" style={{ color: '#059669' }}>{noLeave.length}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>Free long weekends</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-black" style={{ color: '#0891b2' }}>{oneDay.length}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>Take 1 day off</div>
          </div>
          <div className="card p-4 text-center">
            <div className="text-2xl font-black" style={{ color: '#d97706' }}>{twoDays.length}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>Take 2 days off</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* No leave needed */}
            {noLeave.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4" style={{ color: '#059669' }}>
                  ✓ Free Long Weekends
                </h2>
                <div className="space-y-4">
                  {noLeave.map((lw, idx) => <LongWeekendCard key={idx} lw={lw} />)}
                </div>
              </section>
            )}

            <AdSlot type="native" />

            {/* 1 day off */}
            {oneDay.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4" style={{ color: '#0891b2' }}>
                  📅 4-Day Breaks (1 Day Leave)
                </h2>
                <div className="space-y-4">
                  {oneDay.map((lw, idx) => <LongWeekendCard key={idx} lw={lw} />)}
                </div>
              </section>
            )}

            {/* 2 days off */}
            {twoDays.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-4" style={{ color: '#d97706' }}>
                  ⭐ 5-Day Breaks (2 Days Leave)
                </h2>
                <div className="space-y-4">
                  {twoDays.map((lw, idx) => <LongWeekendCard key={idx} lw={lw} />)}
                </div>
              </section>
            )}

            {longWeekends.length === 0 && (
              <div className="card p-8 text-center" style={{ color: '#6b7280' }}>
                <p>No upcoming long weekend opportunities found. All 2025 long weekends may have passed.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <AdSlot type="display" />

            <div className="card p-4 mt-4">
              <h3 className="font-semibold mb-3" style={{ color: '#1a1235' }}>View Country Holidays</h3>
              <Link
                href={`/${locale}/countries/${country.code}`}
                className="btn-primary block text-center text-sm"
              >
                {countryName} Holidays 2025
              </Link>
            </div>

            {/* FAQ */}
            <div className="card p-4 mt-4">
              <h3 className="font-semibold mb-3" style={{ color: '#1a1235' }}>About Bridge Days</h3>
              <p className="text-xs" style={{ color: '#6b7280' }}>
                A bridge day is a working day between a public holiday and a weekend.
                By taking a single day of leave, you can create a 4 or 5-day break.
              </p>
              <p className="text-xs mt-2" style={{ color: '#6b7280' }}>
                <strong>Rating System:</strong>
                <br />⭐⭐⭐⭐⭐ = 5+ days for 0-1 leave
                <br />⭐⭐⭐⭐ = 4 days for 1 leave
                <br />⭐⭐⭐ = 3 days for 2 leave
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
