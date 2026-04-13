import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCountries, getUpcomingHolidays, getAllHolidays, computeLongWeekends } from '@/lib/holidays';
import CountryCard from '@/components/CountryCard';
import HolidayList from '@/components/HolidayList';
import LongWeekendCard from '@/components/LongWeekendCard';
import { Search, Calendar, Globe, TrendingUp } from 'lucide-react';

export const metadata: Metadata = {
  title: 'HolidayCalendarHub — Public Holidays & Long Weekend Optimizer Worldwide',
  description: 'Find public holidays and optimize long weekends across 20+ countries. Track upcoming holidays, download iCal files, and plan your time off globally.',
};

const schemaOrg = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'HolidayCalendarHub',
  url: 'https://holiday-calendar-hub.vercel.app',
  description: 'Public Holidays & Long Weekend Optimizer for 20+ countries',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://holiday-calendar-hub.vercel.app/en/countries?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a public holiday?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A public holiday is a day off granted by law or custom, where most businesses and schools are closed. They vary by country, region, and religion.',
      },
    },
    {
      '@type': 'Question',
      name: 'How does the Long Weekend Optimizer work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our optimizer identifies public holidays that fall near weekends, then calculates how many leave days you need to create 3, 4, or 5-day weekends.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which countries are covered?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We currently cover 20 countries including the US, UK, Canada, Australia, Japan, South Korea, Germany, France, Spain, Brazil, India, China, Mexico, Italy, Netherlands, Singapore, New Zealand, Sweden, Norway, and Denmark.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I download the holiday calendar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes! Every country page has an iCal download button that lets you import holidays into Google Calendar, Apple Calendar, or Outlook.',
      },
    },
  ],
};

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const countries = getAllCountries();
  const upcomingHolidays = getUpcomingHolidays(30);

  // Get some long weekends for the featured section
  const usLongWeekends = computeLongWeekends('US').slice(0, 2);
  const gbLongWeekends = computeLongWeekends('GB').slice(0, 2);
  const featuredLongWeekends = [...usLongWeekends, ...gbLongWeekends]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaOrg) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section
        className="relative py-20 px-4"
        style={{ background: 'linear-gradient(135deg, #1a1235 0%, #2d1a5a 50%, #1a1235 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
            Public Holidays{' '}
            <span style={{ color: '#c084fc' }}>Worldwide</span>
          </h1>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto" style={{ color: '#c4b5fd' }}>
            Find holidays and optimize your long weekends across 20+ countries.
            Never miss a public holiday again.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/countries`} className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl">
              <Globe size={20} />
              Explore Countries
            </Link>
            <Link href={`/${locale}/long-weekends`} className="inline-flex items-center gap-2 px-6 py-3 text-base font-semibold rounded-xl transition-colors"
              style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.2)' }}>
              <Calendar size={20} />
              Long Weekends
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[
              { value: '20+', label: 'Countries' },
              { value: '200+', label: 'Holidays Tracked' },
              { value: '8', label: 'Languages' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black" style={{ color: '#c084fc' }}>{stat.value}</div>
                <div className="text-sm" style={{ color: '#a78bfa' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Holidays */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#1a1235' }}>Upcoming Holidays</h2>
            <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Next 30 days across all countries</p>
          </div>
          <Link href={`/${locale}/calendar/2025`} className="btn-secondary text-sm">
            View Calendar
          </Link>
        </div>

        {upcomingHolidays.length > 0 ? (
          <div className="grid gap-3">
            {upcomingHolidays.slice(0, 8).map((holiday, idx) => (
              <div key={idx} className="card p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">
                    {getAllCountries().find(c => c.code === holiday.countryCode)?.flag || '🌍'}
                  </div>
                  <div>
                    <div className="font-semibold text-sm" style={{ color: '#1a1235' }}>{holiday.name}</div>
                    <div className="text-xs" style={{ color: '#6b7280' }}>
                      {holiday.countryName} · {new Date(holiday.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div>
                  {(() => {
                    const days = Math.ceil((new Date(holiday.date).getTime() - new Date().setHours(0,0,0,0)) / 86400000);
                    if (days === 0) return <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#a855f7', color: 'white' }}>Today!</span>;
                    if (days === 1) return <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: '#c084fc', color: 'white' }}>Tomorrow</span>;
                    return <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: '#f3e8ff', color: '#7e22ce' }}>{days} days</span>;
                  })()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="card p-8 text-center" style={{ color: '#6b7280' }}>
            <p>No upcoming holidays in the next 30 days. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Long Weekends */}
      {featuredLongWeekends.length > 0 && (
        <section className="py-12" style={{ background: '#f3e8ff' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold" style={{ color: '#1a1235' }}>Long Weekend Opportunities</h2>
                <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Maximize your time off with strategic leave planning</p>
              </div>
              <Link href={`/${locale}/long-weekends`} className="btn-primary text-sm">
                View All
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {featuredLongWeekends.map((lw, idx) => (
                <LongWeekendCard key={idx} lw={lw} compact />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Countries Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: '#1a1235' }}>Featured Countries</h2>
            <p className="text-sm mt-1" style={{ color: '#6b7280' }}>Browse public holidays by country</p>
          </div>
          <Link href={`/${locale}/countries`} className="btn-secondary text-sm">
            View All Countries
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {countries.slice(0, 10).map(country => (
            <CountryCard key={country.code} country={country} locale={locale} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12" style={{ background: 'white' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-8" style={{ color: '#1a1235' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqSchema.mainEntity.map((faq, idx) => (
              <div key={idx} className="card p-5">
                <h3 className="font-semibold mb-2" style={{ color: '#1a1235' }}>
                  {faq.name}
                </h3>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {faq.acceptedAnswer.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
