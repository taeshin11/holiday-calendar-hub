import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCountries, computeLongWeekends } from '@/lib/holidays';
import LongWeekendCard from '@/components/LongWeekendCard';

export const metadata: Metadata = {
  title: 'Long Weekends 2025 — Global Bridge Day Optimizer | HolidayCalendarHub',
  description: 'Find every long weekend opportunity in 2025 across 20+ countries. Discover bridge days and maximize your time off with minimal leave.',
};

export default async function LongWeekendsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const countries = getAllCountries();

  // Gather top long weekends from all countries
  const allLongWeekends: Array<{
    lw: ReturnType<typeof computeLongWeekends>[0];
    countryCode: string;
    countryName: string;
    flag: string;
  }> = [];

  for (const country of countries) {
    const lws = computeLongWeekends(country.code);
    for (const lw of lws.slice(0, 3)) {
      allLongWeekends.push({
        lw,
        countryCode: country.code,
        countryName: country.name.en,
        flag: country.flag,
      });
    }
  }

  allLongWeekends.sort((a, b) =>
    new Date(a.lw.startDate).getTime() - new Date(b.lw.startDate).getTime()
  );

  const noLeaveNeeded = allLongWeekends.filter(x => x.lw.leaveDaysNeeded === 0);
  const oneDay = allLongWeekends.filter(x => x.lw.leaveDaysNeeded === 1);
  const twoDays = allLongWeekends.filter(x => x.lw.leaveDaysNeeded === 2);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#1a1235' }}>
          Long Weekend Optimizer 2025
        </h1>
        <p className="text-lg" style={{ color: '#6b7280' }}>
          Find every opportunity to extend public holidays into 3-5 day breaks across 20+ countries.
        </p>
      </div>

      {/* Country selector */}
      <div className="card p-5 mb-8">
        <h2 className="font-bold mb-4" style={{ color: '#1a1235' }}>Browse by Country</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
          {countries.map(country => (
            <Link
              key={country.code}
              href={`/${locale}/long-weekends/${country.code}`}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-purple-50"
              style={{ color: '#1a1235', border: '1px solid #e9d5ff' }}
            >
              <span>{country.flag}</span>
              <span className="truncate">{country.name.en}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* No leave needed */}
      {noLeaveNeeded.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#1a1235' }}>
            <span className="text-green-500">✓</span>
            Free Long Weekends (No Leave Needed)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {noLeaveNeeded.slice(0, 6).map((item, idx) => (
              <div key={idx} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.flag}</span>
                  <Link href={`/${locale}/long-weekends/${item.countryCode}`} className="text-sm font-semibold hover:text-purple-600" style={{ color: '#1a1235' }}>
                    {item.countryName}
                  </Link>
                </div>
                <LongWeekendCard lw={item.lw} compact />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 1 leave day */}
      {oneDay.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#1a1235' }}>
            <span>📅</span>
            4-Day Weekends (Take 1 Day Off)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {oneDay.slice(0, 6).map((item, idx) => (
              <div key={idx} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.flag}</span>
                  <Link href={`/${locale}/long-weekends/${item.countryCode}`} className="text-sm font-semibold hover:text-purple-600" style={{ color: '#1a1235' }}>
                    {item.countryName}
                  </Link>
                </div>
                <LongWeekendCard lw={item.lw} compact />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 2 leave days */}
      {twoDays.length > 0 && (
        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#1a1235' }}>
            <span>⭐</span>
            5-Day Breaks (Take 2 Days Off)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {twoDays.slice(0, 6).map((item, idx) => (
              <div key={idx} className="card p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">{item.flag}</span>
                  <Link href={`/${locale}/long-weekends/${item.countryCode}`} className="text-sm font-semibold hover:text-purple-600" style={{ color: '#1a1235' }}>
                    {item.countryName}
                  </Link>
                </div>
                <LongWeekendCard lw={item.lw} compact />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
