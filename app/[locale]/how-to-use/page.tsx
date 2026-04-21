import type { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'How to Use HolidayCalendarHub — FAQ & Guide',
  description:
    'Learn how to find public holidays by country, understand the difference between bank holidays and public holidays, add holidays to your calendar, and more.',
};

const faqs = [
  {
    q: 'How do I find holidays for a specific country?',
    a: 'Navigate to the Countries page and select the country you are interested in. You will see a full list of public holidays for the current and upcoming years. You can also browse by year or filter by holiday type. Alternatively, use the search bar on the home page to jump directly to any country.',
  },
  {
    q: 'Are these official public holidays?',
    a: 'Yes. Our data is sourced from official government publications, national legislative calendars, and authoritative international databases. We track statutory public holidays — days that are legally recognised by the government of each country. For countries with regional variations (such as the United States, Germany, or Australia), we note which holidays apply nationally versus only in specific states or provinces.',
  },
  {
    q: 'What is the difference between a bank holiday and a public holiday?',
    a: 'A public holiday is a day declared by the government on which workers are legally entitled to time off (often with pay). A bank holiday originally referred to days on which banks were required to close — a designation used primarily in the UK and Ireland. In practice the two terms are often used interchangeably in British English, and most bank holidays in the UK are also public holidays. In other countries, the distinction may be more significant, as banks can be closed on days that are not general public holidays.',
  },
  {
    q: 'Do all employees get public holidays off?',
    a: 'Not necessarily. Employment laws vary by country and industry. In many countries, employees who work on public holidays are entitled to additional pay (sometimes double or triple time) or a substitute day off. Some sectors — such as healthcare, hospitality, and emergency services — regularly work through public holidays. Always check your employment contract and local labour laws for the rules that apply to you.',
  },
  {
    q: 'Which country has the most public holidays?',
    a: 'It varies depending on how you count national, regional, and religious holidays. Countries often cited among those with the most public holidays include Cambodia (around 28 days), Sri Lanka (around 25 days), and India (around 21 central government holidays, plus many additional state-level holidays). In contrast, countries like Mexico and the United Kingdom have fewer statutory public holidays (around 7–9), though workers may receive additional contractual holidays on top of those.',
  },
  {
    q: 'Are holidays the same every year?',
    a: 'Many holidays fall on a fixed date each year (e.g. Christmas Day on 25 December, or Independence Day on 4 July in the USA). However, some holidays are based on lunar or religious calendars — such as Easter, Eid al-Fitr, Diwali, or Lunar New Year — and therefore fall on different dates each year. Additionally, when a fixed-date holiday falls on a weekend, many countries observe it on the nearest Monday or Friday instead. Governments can also declare new holidays or move existing ones at short notice.',
  },
  {
    q: 'How do I add holidays to my calendar?',
    a: 'On any country page, click the "Download iCal" button to download an .ics file containing all public holidays for that country and year. You can then import this file into Google Calendar, Apple Calendar, Microsoft Outlook, or any calendar application that supports the iCalendar format. The imported events will appear in your calendar alongside your existing appointments.',
  },
  {
    q: 'Which countries share the same holidays?',
    a: 'Many Commonwealth nations share some holidays in common — for example, New Year\'s Day (1 January), Good Friday, Easter Monday, and Christmas Day are public holidays across much of the English-speaking world. Countries that share a cultural or religious heritage often observe similar holidays: most Christian-majority countries observe Christmas; most Muslim-majority countries observe Eid al-Fitr and Eid al-Adha; and many East Asian countries observe Lunar New Year. However, the exact dates and names can differ, and not every country that observes a celebration grants it as a statutory day off.',
  },
  {
    q: 'What is a floating holiday?',
    a: 'A floating holiday is a paid day off that an employee can choose to take on any day of their choosing, rather than on a fixed date. Employers often offer floating holidays as a flexible alternative to prescribing specific religious or cultural observance days, allowing employees of different backgrounds to celebrate the occasions most meaningful to them. The number of floating holidays offered varies by employer and jurisdiction.',
  },
];

const schemaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default async function HowToUsePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
      />

      {/* Hero */}
      <section
        className="relative py-16 px-4"
        style={{ background: 'linear-gradient(135deg, #1a1235 0%, #2d1a5a 50%, #1a1235 100%)' }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 leading-tight">
            How to Use <span style={{ color: '#c084fc' }}>HolidayCalendarHub</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#c4b5fd' }}>
            Everything you need to know about finding, understanding, and using our
            global public holiday data.
          </p>
        </div>
      </section>

      {/* Quick Start */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="card p-8 mb-10">
          <h2 className="text-xl font-bold mb-4" style={{ color: '#1a1235' }}>Quick Start Guide</h2>
          <ol className="space-y-3 list-decimal list-inside text-sm leading-relaxed" style={{ color: '#374151' }}>
            <li>Go to the <Link href={`/${locale}/countries`} className="font-semibold underline" style={{ color: '#7e22ce' }}>Countries</Link> page and choose your country.</li>
            <li>Select the year you want to browse (2024, 2025, or 2026).</li>
            <li>Browse the full list of public holidays, including dates and descriptions.</li>
            <li>Click "Download iCal" to import holidays into your calendar app.</li>
            <li>Use the <Link href={`/${locale}/long-weekends`} className="font-semibold underline" style={{ color: '#7e22ce' }}>Long Weekends</Link> tool to find opportunities to extend your breaks with minimal leave days.</li>
          </ol>
        </div>

        {/* FAQ */}
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2" style={{ color: '#1a1235' }}>
          <HelpCircle size={24} style={{ color: '#a855f7' }} />
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="card p-6">
              <h3 className="font-semibold mb-3" style={{ color: '#1a1235' }}>
                {faq.q}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: '#6b7280' }}>
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 card p-8 text-center" style={{ background: '#f3e8ff' }}>
          <h3 className="text-lg font-bold mb-2" style={{ color: '#1a1235' }}>Ready to explore?</h3>
          <p className="text-sm mb-4" style={{ color: '#6b7280' }}>
            Browse public holidays for 50+ countries, download iCal files, and plan your perfect long weekend.
          </p>
          <Link
            href={`/${locale}/countries`}
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl"
          >
            Explore Countries
          </Link>
        </div>
      </section>
    </>
  );
}
