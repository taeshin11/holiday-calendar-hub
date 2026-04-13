import Link from 'next/link';
import { Country } from '@/lib/holidays';
import { ArrowRight } from 'lucide-react';

interface CountryCardProps {
  country: Country;
  locale: string;
  holidayCount?: number;
}

export default function CountryCard({ country, locale, holidayCount }: CountryCardProps) {
  const name = country.name[locale] || country.name.en;
  const count = holidayCount ?? country.totalHolidaysPerYear;

  return (
    <Link href={`/${locale}/countries/${country.code}`}>
      <div className="card p-4 h-full flex flex-col cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div className="text-3xl">{country.flag}</div>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full"
            style={{ background: '#f3e8ff', color: '#7e22ce' }}
          >
            {count} holidays
          </span>
        </div>

        <h3 className="font-bold text-sm mb-1 group-hover:text-purple-600 transition-colors" style={{ color: '#1a1235' }}>
          {name}
        </h3>
        <p className="text-xs mb-2" style={{ color: '#9ca3af' }}>{country.region}</p>

        <div className="mt-auto flex items-center justify-between pt-2 border-t" style={{ borderColor: '#f3e8ff' }}>
          <span className="text-xs" style={{ color: '#6b7280' }}>{country.capital}</span>
          <ArrowRight size={14} style={{ color: '#a855f7' }} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
