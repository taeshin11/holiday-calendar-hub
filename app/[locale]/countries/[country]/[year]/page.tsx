import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry, getHolidaysForCountry, getAllCountries, computeLongWeekends } from '@/lib/holidays';
import HolidayList from '@/components/HolidayList';
import CalendarGrid from '@/components/CalendarGrid';
import LongWeekendCard from '@/components/LongWeekendCard';
import AdSlot from '@/components/AdSlot';
import { notFound } from 'next/navigation';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  const countries = getAllCountries();
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const years = ['2024', '2025', '2026'];
  const params = [];
  for (const locale of locales) {
    for (const country of countries) {
      for (const year of years) {
        params.push({ locale, country: country.code, year });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; country: string; year: string }>;
}): Promise<Metadata> {
  const { country: countryCode, year } = await params;
  const country = getCountry(countryCode);
  if (!country) return {};

  return {
    title: `Public Holidays in ${country.name.en} ${year} — Complete List | HolidayCalendarHub`,
    description: `All public holidays in ${country.name.en} for ${year}. Dates, names, long weekends, and iCal download. Updated ${year} holiday calendar.`,
  };
}

export default async function CountryYearPage({
  params,
}: {
  params: Promise<{ locale: string; country: string; year: string }>;
}) {
  const { locale, country: countryCode, year: yearStr } = await params;
  const year = parseInt(yearStr, 10);
  const country = getCountry(countryCode);
  const holidayData = getHolidaysForCountry(countryCode);

  if (!country || !holidayData || isNaN(year)) {
    notFound();
  }

  const countryName = country.name[locale] || country.name.en;
  const holidays = holidayData.holidays.filter(h => h.date.startsWith(yearStr));
  const longWeekends = computeLongWeekends(countryCode).slice(0, 6);

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Public Holidays in ${country.name.en} ${year}`,
    description: `All public holidays in ${country.name.en} for ${year}`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Public Holidays ${country.name.en} ${year}`,
      numberOfItems: holidays.length,
      itemListElement: holidays.map((h, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Event',
          name: h.name,
          startDate: h.date,
          description: h.description,
          location: { '@type': 'Country', name: country.name.en },
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={{ color: '#6b7280' }}>
          <Link href={`/${locale}`} className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/countries`} className="hover:text-purple-600">Countries</Link>
          <span>/</span>
          <Link href={`/${locale}/countries/${country.code}`} className="hover:text-purple-600">{countryName}</Link>
          <span>/</span>
          <span style={{ color: '#1a1235' }}>{year}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{country.flag}</span>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black" style={{ color: '#1a1235' }}>
                  Public Holidays in {countryName}, {year}
                </h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {holidays.length} official public holidays
                </p>
              </div>
            </div>
          </div>

          <Link
            href={`/api/ical/${country.code}/${year}`}
            className="btn-primary inline-flex items-center gap-2 flex-shrink-0"
          >
            <Download size={16} />
            Download iCal
          </Link>
        </div>

        {/* Year nav */}
        <div className="flex items-center gap-2 mb-8">
          {year > 2024 && (
            <Link href={`/${locale}/countries/${country.code}/${year - 1}`} className="btn-secondary inline-flex items-center gap-1 text-sm">
              <ChevronLeft size={14} />
              {year - 1}
            </Link>
          )}
          <span className="px-4 py-2 rounded-lg text-sm font-bold" style={{ background: '#a855f7', color: 'white' }}>
            {year}
          </span>
          {year < 2026 && (
            <Link href={`/${locale}/countries/${country.code}/${year + 1}`} className="btn-secondary inline-flex items-center gap-1 text-sm">
              {year + 1}
              <ChevronRight size={14} />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Answer block */}
            <div className="card p-5" style={{ borderLeft: '4px solid #a855f7' }}>
              <h2 className="font-bold mb-2" style={{ color: '#1a1235' }}>
                How many public holidays in {country.name.en} {year}?
              </h2>
              <p className="text-sm" style={{ color: '#6b7280' }}>
                {country.name.en} has <strong>{holidays.length} public holidays</strong> in {year}.
                The country's work culture: {country.workingHoursCulture}.
              </p>
            </div>

            {/* Holiday list */}
            <div>
              <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1235' }}>
                All Public Holidays {year}
              </h2>
              {holidays.length > 0 ? (
                <HolidayList holidays={holidays} showCountdown={year === 2025} />
              ) : (
                <div className="card p-8 text-center" style={{ color: '#6b7280' }}>
                  <p>Holiday data for {year} will be available soon.</p>
                  <Link href={`/${locale}/countries/${country.code}/2025`} className="btn-primary mt-4 inline-block">
                    View 2025 Holidays
                  </Link>
                </div>
              )}
            </div>

            {/* Ad slot */}
            <AdSlot type="native" />

            {/* Long Weekends */}
            {longWeekends.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold" style={{ color: '#1a1235' }}>
                    Long Weekend Opportunities
                  </h2>
                  <Link href={`/${locale}/long-weekends/${country.code}`} className="btn-secondary text-sm">
                    View All
                  </Link>
                </div>
                <div className="space-y-4">
                  {longWeekends.slice(0, 4).map((lw, idx) => (
                    <LongWeekendCard key={idx} lw={lw} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AdSlot type="display" />

            <div>
              <h3 className="font-bold mb-3" style={{ color: '#1a1235' }}>Calendar View</h3>
              <CalendarGrid year={year} holidays={holidays} />
            </div>

            {/* Year selector */}
            <div className="card p-4">
              <h3 className="font-semibold mb-3 text-sm" style={{ color: '#1a1235' }}>Other Years</h3>
              <div className="space-y-1">
                {[2024, 2025, 2026].map(y => (
                  <Link
                    key={y}
                    href={`/${locale}/countries/${country.code}/${y}`}
                    className="flex items-center justify-between text-sm py-2 px-3 rounded-lg transition-colors"
                    style={{
                      background: y === year ? '#f3e8ff' : 'transparent',
                      color: y === year ? '#7e22ce' : '#6b7280',
                    }}
                  >
                    <span>{country.name.en} {y}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
