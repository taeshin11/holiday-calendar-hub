import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllHolidays, getAllCountries } from '@/lib/holidays';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export async function generateStaticParams() {
  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const years = ['2024', '2025', '2026'];
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1));
  return locales.flatMap(locale =>
    years.flatMap(year =>
      months.map(month => ({ locale, year, month }))
    )
  );
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ year: string; month: string }>;
}): Promise<Metadata> {
  const { year, month } = await params;
  const monthName = MONTHS[parseInt(month) - 1];
  return {
    title: `Public Holidays ${monthName} ${year} — All Countries`,
    description: `All public holidays in ${monthName} ${year} across 20+ countries worldwide.`,
  };
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  const d = new Date(year, month - 1, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default async function CalendarMonthPage({
  params,
}: {
  params: Promise<{ locale: string; year: string; month: string }>;
}) {
  const { locale, year: yearStr, month: monthStr } = await params;
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const monthName = MONTHS[month - 1];

  const allHolidays = getAllHolidays();
  const countries = getAllCountries();

  const prefix = `${year}-${String(month).padStart(2, '0')}`;
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

  // Calendar grid
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const holidayByDate = new Map<string, typeof monthHolidays>();
  for (const h of monthHolidays) {
    if (!holidayByDate.has(h.date)) holidayByDate.set(h.date, []);
    holidayByDate.get(h.date)!.push(h);
  }

  const prevMonth = month === 1 ? `/${locale}/calendar/${year - 1}/12` : `/${locale}/calendar/${year}/${month - 1}`;
  const nextMonth = month === 12 ? `/${locale}/calendar/${year + 1}/1` : `/${locale}/calendar/${year}/${month + 1}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6 flex-wrap" style={{ color: '#6b7280' }}>
        <Link href={`/${locale}`} className="hover:text-purple-600">Home</Link>
        <span>/</span>
        <Link href={`/${locale}/calendar/${year}`} className="hover:text-purple-600">Calendar {year}</Link>
        <span>/</span>
        <span style={{ color: '#1a1235' }}>{monthName}</span>
      </nav>

      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl sm:text-3xl font-black" style={{ color: '#1a1235' }}>
          {monthName} {year} — Public Holidays
        </h1>
        <div className="flex items-center gap-2">
          <Link href={prevMonth} className="btn-secondary inline-flex items-center gap-1 text-sm">
            <ChevronLeft size={14} />
          </Link>
          <Link href={nextMonth} className="btn-secondary inline-flex items-center gap-1 text-sm">
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Calendar */}
        <div className="lg:col-span-2">
          <div className="card p-4">
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-2">
              {DAYS.map(d => (
                <div key={d} className="text-center text-xs font-semibold py-2" style={{ color: '#9ca3af' }}>{d}</div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, idx) => {
                if (!day) return <div key={idx} />;
                const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayHolidays = holidayByDate.get(dateStr) || [];
                const isToday = dateStr === todayStr;
                const isWeekend = idx % 7 >= 5;

                return (
                  <div
                    key={idx}
                    className="p-1 min-h-[70px] rounded-lg"
                    style={{
                      background: dayHolidays.length > 0
                        ? 'linear-gradient(135deg, #f3e8ff, #fce7f3)'
                        : isWeekend ? '#f9f9f9' : 'transparent',
                      border: isToday ? '2px solid #a855f7' : '1px solid #f3e8ff',
                    }}
                  >
                    <div className="text-xs font-bold mb-1" style={{ color: dayHolidays.length > 0 ? '#7e22ce' : '#1a1235' }}>
                      {day}
                    </div>
                    {dayHolidays.slice(0, 2).map((h, i) => (
                      <div key={i} className="text-center">
                        <span className="text-xs">{h.flag}</span>
                        <p className="text-xs leading-tight truncate" style={{ color: '#6d28d9', fontSize: '9px' }}>
                          {h.name}
                        </p>
                      </div>
                    ))}
                    {dayHolidays.length > 2 && (
                      <p className="text-xs" style={{ color: '#a855f7', fontSize: '9px' }}>+{dayHolidays.length - 2}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Holiday List */}
        <div>
          <h2 className="font-bold mb-4" style={{ color: '#1a1235' }}>
            {monthHolidays.length} Holidays This Month
          </h2>
          {monthHolidays.length === 0 ? (
            <div className="card p-6 text-center" style={{ color: '#9ca3af' }}>
              <p>No holidays this month across tracked countries.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {monthHolidays.map((h, idx) => (
                <div key={idx} className="card p-3 flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">{h.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate" style={{ color: '#1a1235' }}>{h.name}</div>
                    <div className="text-xs" style={{ color: '#9ca3af' }}>
                      {h.countryName} · {new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
