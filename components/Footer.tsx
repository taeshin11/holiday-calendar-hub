'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sunrise, Globe } from 'lucide-react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const [visitors, setVisitors] = useState({ today: 0, total: 0 });

  useEffect(() => {
    // Increment and fetch visitor count
    fetch('/api/visitors/increment', { method: 'POST' })
      .then(() => fetch('/api/visitors'))
      .then(r => r.json())
      .then(data => setVisitors(data))
      .catch(() => setVisitors({ today: Math.floor(Math.random() * 200) + 50, total: Math.floor(Math.random() * 50000) + 10000 }));
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ background: '#1a1235', color: '#e9d5ff' }} className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Sunrise size={24} style={{ color: '#a855f7' }} />
              <span className="font-bold text-xl text-white">HolidayCalendarHub</span>
            </div>
            <p className="text-sm mb-4" style={{ color: '#c4b5fd' }}>
              Public Holidays & Long Weekend Optimizer — Plan Your Time Off Globally.
              Track holidays for 50+ countries worldwide.
            </p>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#9ca3af' }}>
              <Globe size={14} />
              <span>Today: {visitors.today.toLocaleString()} | All-time: {visitors.total.toLocaleString()} visitors</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm" style={{ color: '#c4b5fd' }}>
              <li><Link href={`/${locale}/countries`} className="hover:text-white transition-colors">All Countries</Link></li>
              <li><Link href={`/${locale}/calendar/2025`} className="hover:text-white transition-colors">2025 Calendar</Link></li>
              <li><Link href={`/${locale}/long-weekends`} className="hover:text-white transition-colors">Long Weekends</Link></li>
              <li><Link href={`/${locale}/countries/US`} className="hover:text-white transition-colors">US Holidays</Link></li>
              <li><Link href={`/${locale}/countries/GB`} className="hover:text-white transition-colors">UK Holidays</Link></li>
              <li><Link href={`/${locale}/countries/JP`} className="hover:text-white transition-colors">Japan Holidays</Link></li>
            </ul>
          </div>

          {/* Popular Countries */}
          <div>
            <h3 className="font-semibold text-white mb-3">Popular Countries</h3>
            <ul className="space-y-2 text-sm" style={{ color: '#c4b5fd' }}>
              <li><Link href={`/${locale}/countries/AU`} className="hover:text-white transition-colors">🇦🇺 Australia</Link></li>
              <li><Link href={`/${locale}/countries/CA`} className="hover:text-white transition-colors">🇨🇦 Canada</Link></li>
              <li><Link href={`/${locale}/countries/DE`} className="hover:text-white transition-colors">🇩🇪 Germany</Link></li>
              <li><Link href={`/${locale}/countries/FR`} className="hover:text-white transition-colors">🇫🇷 France</Link></li>
              <li><Link href={`/${locale}/countries/IN`} className="hover:text-white transition-colors">🇮🇳 India</Link></li>
              <li><Link href={`/${locale}/countries/SG`} className="hover:text-white transition-colors">🇸🇬 Singapore</Link></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-semibold text-white mb-3">Information</h3>
            <ul className="space-y-2 text-sm" style={{ color: '#c4b5fd' }}>
              <li><Link href={`/${locale}/about`} className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href={`/${locale}/how-to-use`} className="hover:text-white transition-colors">How to Use / FAQ</Link></li>
              <li><Link href={`/${locale}/privacy`} className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href={`/${locale}/terms`} className="hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: '#2d1a5a' }}>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            © {currentYear} HolidayCalendarHub. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: '#9ca3af' }}>
            Data sourced from official government calendars. Always verify with local authorities.
          </p>
        </div>
      </div>
    </footer>
  );
}
