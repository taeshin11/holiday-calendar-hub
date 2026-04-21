import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use | HolidayCalendarHub',
  description:
    'Terms of Use for HolidayCalendarHub. Holiday information is provided for reference only — always verify with official government sources for legal and business purposes.',
};

const LAST_UPDATED = 'April 2025';

export default async function TermsPage({
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
          <h1 className="text-4xl font-black text-white mb-4">Terms of Use</h1>
          <p className="text-base" style={{ color: '#c4b5fd' }}>Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        {/* Important notice */}
        <div className="card p-6" style={{ background: '#fef9c3', borderLeft: '4px solid #eab308' }}>
          <p className="text-sm font-semibold leading-relaxed" style={{ color: '#713f12' }}>
            Important: Holiday information provided on HolidayCalendarHub is for general
            reference purposes only. Holidays may change based on government decree at short
            notice. Always verify with official government sources before making legal,
            payroll, contractual, or business decisions.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>1. Acceptance of Terms</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            By accessing or using HolidayCalendarHub ("the Service") at
            https://holiday-calendar-hub.vercel.app, you agree to be bound by these Terms of Use.
            If you do not agree to these terms, please do not use the Service. We reserve the
            right to modify these terms at any time, and your continued use of the Service
            constitutes acceptance of any modifications.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>2. Information for Reference Only</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            All public holiday dates, bank holiday listings, school holiday schedules, and
            cultural observance information provided on this Service are for general informational
            and reference purposes only. While we make every effort to ensure accuracy, we cannot
            guarantee that the information is complete, current, or free from error.
          </p>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            <strong>Holiday dates may change based on government decree.</strong> Governments
            may declare new public holidays, reschedule existing ones, or cancel announced
            holidays at short notice. Such changes may not be reflected on our Service
            immediately.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            <strong>For legal, contractual, payroll, or business-critical purposes</strong>,
            you must independently verify all holiday dates with the official government body
            or authoritative national source for the relevant country or jurisdiction.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>3. No Professional Advice</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            Nothing on this Service constitutes legal, employment, financial, accounting, or
            professional advice. The application of public holiday rules to individual employment
            situations depends on local laws, employment contracts, collective bargaining
            agreements, and other factors beyond the scope of this Service. If you require
            professional advice, please consult a qualified legal or employment professional
            in the relevant jurisdiction.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>4. Permitted Use</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            You may use this Service for personal, educational, and internal business reference
            purposes. You may not:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside" style={{ color: '#374151' }}>
            <li>Reproduce, republish, or redistribute our data for commercial purposes without prior written permission</li>
            <li>Use automated tools, scrapers, or bots to mass-extract data from the Service</li>
            <li>Modify, decompile, or reverse-engineer any part of the Service</li>
            <li>Use the Service in any manner that could disable, overburden, or impair its operation</li>
            <li>Use the Service for any unlawful purpose or in violation of any applicable regulation</li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>5. Disclaimer of Warranties</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            The Service is provided on an "AS IS" and "AS AVAILABLE" basis without any warranties
            of any kind, express or implied, including but not limited to warranties of
            merchantability, fitness for a particular purpose, or non-infringement. We do not
            warrant that the Service will be uninterrupted, error-free, or free of viruses or
            other harmful components.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>6. Limitation of Liability</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            To the fullest extent permitted by law, HolidayCalendarHub and its operators shall
            not be liable for any direct, indirect, incidental, special, consequential, or
            punitive damages arising from your use of — or inability to use — the Service or
            any information contained therein. This includes, without limitation, losses arising
            from reliance on inaccurate or outdated holiday information.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>7. Third-Party Content and Links</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            The Service may contain links to third-party websites or display third-party
            advertisements through the Google AdSense programme. We do not endorse and are
            not responsible for the content, privacy policies, or practices of any third-party
            sites. Links are provided for convenience only.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>8. Intellectual Property</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            All content on this Service, including but not limited to text, graphics, logos,
            and software, is the property of HolidayCalendarHub or its content suppliers and
            is protected by applicable intellectual property laws. Underlying holiday date data
            sourced from governments is in the public domain; our compilation, presentation,
            and commentary remain proprietary.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>9. Governing Law</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            These Terms shall be governed by and construed in accordance with applicable law.
            Any disputes arising from these Terms or your use of the Service shall be subject
            to the exclusive jurisdiction of the competent courts of the relevant jurisdiction.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>10. Changes to These Terms</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            We reserve the right to update these Terms at any time. Changes will be effective
            immediately upon posting to the Service with an updated "Last updated" date. Your
            continued use of the Service after any changes constitutes your acceptance of the
            new Terms.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>11. Contact</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            If you have questions about these Terms, please contact us at:{' '}
            <strong>legal@holiday-calendar-hub.vercel.app</strong>
          </p>
        </div>

      </section>
    </>
  );
}
