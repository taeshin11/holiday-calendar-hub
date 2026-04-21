import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | HolidayCalendarHub',
  description:
    'Read the HolidayCalendarHub privacy policy — how we collect, use, and protect your information when you use our public holiday calendar service.',
};

const LAST_UPDATED = 'April 2025';

export default async function PrivacyPage({
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
          <h1 className="text-4xl font-black text-white mb-4">Privacy Policy</h1>
          <p className="text-base" style={{ color: '#c4b5fd' }}>Last updated: {LAST_UPDATED}</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>1. Introduction</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            HolidayCalendarHub ("we", "our", or "us") operates the website at
            https://holiday-calendar-hub.vercel.app (the "Service"). This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you visit our
            website. Please read this policy carefully. If you disagree with its terms, please
            discontinue use of the Service.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>2. Information We Collect</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            We collect information in the following ways:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside" style={{ color: '#374151' }}>
            <li><strong>Usage Data:</strong> When you visit the Service, we automatically collect certain information, including your browser type, operating system, referring URLs, pages viewed, and the date and time of your visit.</li>
            <li><strong>Cookies and Tracking Technologies:</strong> We use cookies and similar tracking technologies to track activity on our Service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
            <li><strong>Analytics:</strong> We use third-party analytics services (such as Google Analytics) to help us understand how visitors use our site. These services may collect information sent by your browser as part of a web page request.</li>
            <li><strong>Advertising:</strong> We participate in the Google AdSense programme. Google may use cookies to serve ads based on your prior visits to our site or other sites. You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#7e22ce' }}>Google Ads Settings</a>.</li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>3. How We Use Your Information</h2>
          <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside" style={{ color: '#374151' }}>
            <li>To operate and maintain the Service</li>
            <li>To monitor and analyse usage patterns and trends</li>
            <li>To improve the functionality and user experience of the Service</li>
            <li>To detect, prevent, and address technical issues</li>
            <li>To display relevant advertisements through the Google AdSense programme</li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>4. Sharing Your Information</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            We do not sell, trade, or otherwise transfer your personally identifiable information
            to third parties, except as described below:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside" style={{ color: '#374151' }}>
            <li><strong>Service Providers:</strong> We may share information with third-party vendors who assist us in operating our website (e.g. hosting, analytics, advertising).</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
          </ul>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>5. Data Retention</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            We retain usage data for internal analysis purposes for a limited period, typically
            no longer than 26 months, unless this data is used to strengthen the security or to
            improve the functionality of the Service, or we are legally obligated to retain it
            for longer.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>6. Cookies</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            We use the following categories of cookies:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside" style={{ color: '#374151' }}>
            <li><strong>Essential Cookies:</strong> Required for the website to function correctly.</li>
            <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
            <li><strong>Advertising Cookies:</strong> Used by Google AdSense to serve personalised advertisements.</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3" style={{ color: '#374151' }}>
            You can control cookies through your browser settings. Disabling cookies may affect
            some features of the Service.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>7. Third-Party Links</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            Our Service may contain links to third-party websites. We are not responsible for
            the privacy practices or content of those sites and encourage you to review their
            privacy policies before providing any personal information.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>8. Children's Privacy</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            Our Service is not directed to anyone under the age of 13. We do not knowingly
            collect personally identifiable information from children under 13. If you become
            aware that a child has provided us with personal information, please contact us
            and we will take steps to remove such information.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>9. Your Rights</h2>
          <p className="text-sm leading-relaxed mb-3" style={{ color: '#374151' }}>
            Depending on your location, you may have the following rights regarding your data:
          </p>
          <ul className="space-y-2 text-sm leading-relaxed list-disc list-inside" style={{ color: '#374151' }}>
            <li>The right to access information we hold about you</li>
            <li>The right to request correction of inaccurate data</li>
            <li>The right to request deletion of your data</li>
            <li>The right to object to or restrict processing of your data</li>
            <li>The right to data portability</li>
          </ul>
          <p className="text-sm leading-relaxed mt-3" style={{ color: '#374151' }}>
            To exercise any of these rights, please contact us via the information below.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>10. Changes to This Policy</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            We may update this Privacy Policy from time to time. We will notify you of any
            changes by posting the new policy on this page with an updated "Last updated" date.
            You are advised to review this policy periodically for any changes.
          </p>
        </div>

        <div className="card p-6">
          <h2 className="text-lg font-bold mb-3" style={{ color: '#1a1235' }}>11. Contact Us</h2>
          <p className="text-sm leading-relaxed" style={{ color: '#374151' }}>
            If you have any questions about this Privacy Policy, please contact us at:{' '}
            <strong>privacy@holiday-calendar-hub.vercel.app</strong>
          </p>
        </div>

      </section>
    </>
  );
}
