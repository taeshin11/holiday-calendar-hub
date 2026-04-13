import type { Metadata } from 'next';
import Link from 'next/link';
import { getCountry, getHolidaysForCountry, getAllCountries } from '@/lib/holidays';
import HolidayList from '@/components/HolidayList';
import CalendarGrid from '@/components/CalendarGrid';
import { notFound } from 'next/navigation';
import { Calendar, Download, ArrowLeft, Clock } from 'lucide-react';

export async function generateStaticParams() {
  const countries = getAllCountries();
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const params = [];
  for (const locale of locales) {
    for (const country of countries) {
      params.push({ locale, country: country.code });
    }
  }
  return params;
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
    title: `Public Holidays in ${country.name.en} — Complete List & Calendar`,
    description: `All public holidays in ${country.name.en} for 2025. Dates, names, long weekends, and iCal download. Official ${country.name.en} holiday calendar.`,
  };
}

export default async function CountryPage({
  params,
}: {
  params: Promise<{ locale: string; country: string }>;
}) {
  const { locale, country: countryCode } = await params;
  const country = getCountry(countryCode);
  const holidayData = getHolidaysForCountry(countryCode);

  if (!country || !holidayData) {
    notFound();
  }

  const currentYear = 2025;
  const holidays = holidayData.holidays;
  const countryName = country.name[locale] || country.name.en;

  const years = [2024, 2025, 2026];

  const schemaOrg = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: `Public Holidays in ${country.name.en}`,
    description: `All public holidays in ${country.name.en} for 2025`,
    mainEntity: {
      '@type': 'ItemList',
      name: `Public Holidays ${country.name.en} 2025`,
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
        <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: '#6b7280' }}>
          <Link href={`/${locale}`} className="hover:text-purple-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href={`/${locale}/countries`} className="hover:text-purple-600 transition-colors">Countries</Link>
          <span>/</span>
          <span style={{ color: '#1a1235' }}>{countryName}</span>
        </nav>

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-5xl">{country.flag}</span>
              <div>
                <h1 className="text-3xl sm:text-4xl font-black" style={{ color: '#1a1235' }}>
                  {countryName}
                </h1>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {country.capital} · {country.region} · {country.currency}
                </p>
              </div>
            </div>
            <p className="text-sm mt-2" style={{ color: '#6b7280' }}>
              <span className="font-semibold" style={{ color: '#a855f7' }}>{holidays.length} public holidays</span> in {currentYear}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/api/ical/${country.code}/2025`}
              className="btn-primary inline-flex items-center gap-2"
            >
              <Download size={16} />
              Download iCal
            </Link>
            <Link
              href={`/${locale}/long-weekends/${country.code}`}
              className="btn-secondary inline-flex items-center gap-2"
            >
              <Clock size={16} />
              Long Weekends
            </Link>
          </div>
        </div>

        {/* Year selector */}
        <div className="flex gap-2 mb-8">
          {years.map(y => (
            <Link
              key={y}
              href={`/${locale}/countries/${country.code}/${y}`}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
              style={{
                background: y === currentYear ? '#a855f7' : '#f3e8ff',
                color: y === currentYear ? 'white' : '#6d28d9',
              }}
            >
              {y}
            </Link>
          ))}
        </div>

        {/* Working hours culture note */}
        <div className="card p-4 mb-8" style={{ borderLeft: '4px solid #a855f7' }}>
          <p className="text-sm" style={{ color: '#6b7280' }}>
            <span className="font-semibold" style={{ color: '#1a1235' }}>Work Culture:</span>{' '}
            {country.workingHoursCulture}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Holiday List */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1235' }}>
              Public Holidays {currentYear}
            </h2>
            <HolidayList holidays={holidays} showCountdown={true} />
          </div>

          {/* Sidebar */}
          <div>
            <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1235' }}>
              Calendar View
            </h2>
            <CalendarGrid year={currentYear} holidays={holidays} />

            {/* Related links */}
            <div className="card p-4 mt-4">
              <h3 className="font-semibold mb-3 text-sm" style={{ color: '#1a1235' }}>Other Years</h3>
              <div className="space-y-2">
                {[2024, 2025, 2026].map(y => (
                  <Link
                    key={y}
                    href={`/${locale}/countries/${country.code}/${y}`}
                    className="flex items-center justify-between text-sm py-1 px-2 rounded hover:bg-purple-50 transition-colors"
                    style={{ color: '#6b7280' }}
                  >
                    <span>{country.name.en} Holidays {y}</span>
                    <Calendar size={14} style={{ color: '#a855f7' }} />
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
