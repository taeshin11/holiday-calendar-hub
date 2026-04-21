import type { Metadata } from 'next';
import { Globe, Calendar, Users, Building2, Plane, BookOpen } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About HolidayCalendarHub — Comprehensive Holiday Database for 50+ Countries',
  description:
    'Learn about HolidayCalendarHub — your trusted source for public holidays, bank holidays, school holidays, and cultural observances across 50+ countries worldwide.',
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      {/* Hero */}
      <section
        className="relative py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #1a1235 0%, #2d1a5a 50%, #1a1235 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            About <span style={{ color: '#c084fc' }}>HolidayCalendarHub</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#c4b5fd' }}>
            Your comprehensive source for public holidays, bank holidays, and cultural
            observances across 50+ countries worldwide.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#1a1235' }}>Our Mission</h2>
          <p className="text-base leading-relaxed mb-4" style={{ color: '#374151' }}>
            HolidayCalendarHub was built to solve a universal problem: knowing when holidays fall
            around the world. Whether you are coordinating meetings across time zones, planning
            international travel, or managing a globally distributed team, having accurate and
            up-to-date holiday information is essential.
          </p>
          <p className="text-base leading-relaxed" style={{ color: '#374151' }}>
            We aggregate official public holiday data from government sources, central banks,
            and authoritative national calendars — then make it freely accessible to anyone
            who needs it, in 8 languages.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '50+', label: 'Countries Covered' },
            { value: '1,000+', label: 'Holidays Tracked' },
            { value: '8', label: 'Languages' },
            { value: '3', label: 'Years of Data' },
          ].map(stat => (
            <div key={stat.label} className="card p-5 text-center">
              <div className="text-3xl font-black mb-1" style={{ color: '#a855f7' }}>{stat.value}</div>
              <div className="text-sm" style={{ color: '#6b7280' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* What we cover */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#1a1235' }}>What We Cover</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
          {[
            {
              icon: <Globe size={22} style={{ color: '#a855f7' }} />,
              title: 'Public Holidays',
              desc: 'Nationally legislated days off recognised by governments, including New Year\'s Day, Independence Days, and religious observances declared public holidays by law.',
            },
            {
              icon: <Building2 size={22} style={{ color: '#a855f7' }} />,
              title: 'Bank Holidays',
              desc: 'Days on which banks and many financial institutions are closed. Particularly significant in the UK, Ireland, and other Commonwealth nations.',
            },
            {
              icon: <BookOpen size={22} style={{ color: '#a855f7' }} />,
              title: 'School Holidays',
              desc: 'Term breaks and school closure periods for major education systems, helping parents and educators plan ahead.',
            },
            {
              icon: <Calendar size={22} style={{ color: '#a855f7' }} />,
              title: 'Cultural Observances',
              desc: 'Widely observed cultural events such as Lunar New Year, Diwali, and Carnival — even where they are not statutory holidays in every region.',
            },
          ].map(item => (
            <div key={item.title} className="card p-6 flex gap-4">
              <div className="mt-1 flex-shrink-0">{item.icon}</div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: '#1a1235' }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Who uses it */}
        <h2 className="text-2xl font-bold mb-6" style={{ color: '#1a1235' }}>Who Uses HolidayCalendarHub</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {[
            {
              icon: <Users size={22} style={{ color: '#a855f7' }} />,
              title: 'HR & People Teams',
              desc: 'Manage leave entitlements, payroll calendars, and holiday allowances for employees in multiple countries.',
            },
            {
              icon: <Plane size={22} style={{ color: '#a855f7' }} />,
              title: 'Travellers',
              desc: 'Avoid booking trips on local holidays when attractions are closed, or plan around them to experience unique cultural celebrations.',
            },
            {
              icon: <Globe size={22} style={{ color: '#a855f7' }} />,
              title: 'International Businesses',
              desc: 'Schedule meetings, deadlines, and product launches that respect the holiday calendars of global partners and clients.',
            },
          ].map(item => (
            <div key={item.title} className="card p-6 flex flex-col gap-3">
              <div className="flex items-center gap-3">
                {item.icon}
                <h3 className="font-semibold" style={{ color: '#1a1235' }}>{item.title}</h3>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Data accuracy */}
        <div className="card p-8" style={{ background: '#f3e8ff' }}>
          <h2 className="text-xl font-bold mb-3" style={{ color: '#1a1235' }}>Data Accuracy & Sources</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            All holiday data is sourced from official government websites, national legislative
            calendars, and authoritative international databases. We review and update our data
            regularly to reflect government decrees, substitution days, and newly declared
            public holidays.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            While we strive for the highest accuracy, holiday dates can change at short notice
            by government decree. For legal or payroll purposes, always verify with the relevant
            official government source or a qualified legal professional.
          </p>
        </div>
      </section>
    </>
  );
}
