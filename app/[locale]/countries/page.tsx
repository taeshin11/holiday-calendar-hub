import type { Metadata } from 'next';
import { getAllCountries } from '@/lib/holidays';
import CountryCard from '@/components/CountryCard';

export const metadata: Metadata = {
  title: 'All Countries — Public Holidays Worldwide',
  description: 'Browse public holidays for 20+ countries including the US, UK, Canada, Australia, Japan, and more. Find holidays for 2025 and beyond.',
};

export default async function CountriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const countries = getAllCountries();

  const byRegion: Record<string, typeof countries> = {};
  for (const c of countries) {
    if (!byRegion[c.region]) byRegion[c.region] = [];
    byRegion[c.region].push(c);
  }

  const regionOrder = ['Europe', 'Americas', 'Asia', 'Oceania'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-black mb-3" style={{ color: '#1a1235' }}>
          Public Holidays by Country
        </h1>
        <p className="text-lg" style={{ color: '#6b7280' }}>
          Browse public holidays for {countries.length} countries worldwide. Find official holiday calendars, long weekend opportunities, and downloadable iCal files.
        </p>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { value: countries.length, label: 'Countries' },
          { value: '200+', label: 'Holidays Tracked' },
          { value: '4', label: 'Regions' },
          { value: '8', label: 'Languages' },
        ].map(stat => (
          <div key={stat.label} className="card p-4 text-center">
            <div className="text-2xl font-black" style={{ color: '#a855f7' }}>{stat.value}</div>
            <div className="text-xs mt-1" style={{ color: '#6b7280' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Countries by region */}
      {regionOrder.map(region => {
        if (!byRegion[region]) return null;
        return (
          <section key={region} className="mb-12">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#1a1235' }}>
              <span className="w-1 h-6 rounded-full inline-block" style={{ background: '#a855f7' }} />
              {region}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {byRegion[region].map(country => (
                <CountryCard key={country.code} country={country} locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
