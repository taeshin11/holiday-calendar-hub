import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllHolidays, getAllCountries } from '@/lib/holidays';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const years = ['2024', '2025', '2026'];
  return locales.flatMap(locale => years.map(year => ({ locale, year })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string }>;
}): Promise<Metadata> {
  const { year } = await params;
  return {
    title: `Public Holidays ${year} — All Countries Calendar | HolidayCalendarHub`,
    description: `Complete calendar of public holidays for ${year} across all countries. View holidays by month and country.`,
  };
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export default async function CalendarYearPage({
  params,
}: {
  params: Promise<{ locale: string; year: string }>;
}) {
  const { locale, year: yearStr } = await params;
  const year = parseInt(yearStr, 10);
  const allHolidays = getAllHolidays();
  const countries = getAllCountries();

  // Build monthly buckets
  const months = MONTHS.map((monthName, monthIdx) => {
    const monthStr = String(monthIdx + 1).padStart(2, '0');
    const prefix = `${year}-${monthStr}`;

    const monthHolidays: Array<{
      date: string;
      name: string;
      countryCode: string;
      countryName: string;
      flag: string;
    }> = [];

    for (const ch of allHolidays) {
      const country = countries.find(c => c.code === ch.countryCode);
      for (const h of ch.holidays) {
        if (h.date.startsWith(prefix)) {
          monthHolidays.push({
            date: h.date,
            name: h.name,
            countryCode: ch.countryCode,
            countryName: ch.countryName,
            flag: country?.flag || '🌍',
          });
        }
      }
    }

    monthHolidays.sort((a, b) => a.date.localeCompare(b.date));
    return { monthName, monthIdx, monthHolidays };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" style={{ color: '#6b7280' }}>
        <Link href={`/${locale}`} className="hover:text-purple-600">Home</Link>
        <span>/</span>
        <span style={{ color: '#1a1235' }}>Calendar {year}</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-black" style={{ color: '#1a1235' }}>
          Public Holidays Calendar {year}
        </h1>
        <div className="flex items-center gap-2">
          {year > 2024 && (
            <Link href={`/${locale}/calendar/${year - 1}`} className="btn-secondary inline-flex items-center gap-1 text-sm">
              <ChevronLeft size={14} /> {year - 1}
            </Link>
          )}
          {year < 2026 && (
            <Link href={`/${locale}/calendar/${year + 1}`} className="btn-secondary inline-flex items-center gap-1 text-sm">
              {year + 1} <ChevronRight size={14} />
            </Link>
          )}
        </div>
      </div>

      {/* Month links */}
      <div className="flex flex-wrap gap-2 mb-8">
        {MONTHS.map((m, idx) => (
          <Link
            key={m}
            href={`/${locale}/calendar/${year}/${idx + 1}`}
            className="text-sm px-3 py-1 rounded-lg font-medium transition-colors"
            style={{ background: '#f3e8ff', color: '#7e22ce' }}
          >
            {m.slice(0, 3)}
          </Link>
        ))}
      </div>

      {/* Monthly sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {months.map(({ monthName, monthIdx, monthHolidays }) => (
          <div key={monthName} className="card p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold" style={{ color: '#1a1235' }}>{monthName} {year}</h2>
              <Link
                href={`/${locale}/calendar/${year}/${monthIdx + 1}`}
                className="text-xs font-medium"
                style={{ color: '#a855f7' }}
              >
                View month
              </Link>
            </div>

            {monthHolidays.length === 0 ? (
              <p className="text-xs" style={{ color: '#9ca3af' }}>No holidays this month</p>
            ) : (
              <div className="space-y-2">
                {monthHolidays.slice(0, 5).map((h, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-lg">{h.flag}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium truncate" style={{ color: '#1a1235' }}>{h.name}</div>
                      <div className="text-xs" style={{ color: '#9ca3af' }}>
                        {new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {h.countryName}
                      </div>
                    </div>
                  </div>
                ))}
                {monthHolidays.length > 5 && (
                  <p className="text-xs" style={{ color: '#a855f7' }}>+{monthHolidays.length - 5} more</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
