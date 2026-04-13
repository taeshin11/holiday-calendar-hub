'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Globe, Menu, X, Sunrise } from 'lucide-react';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: `/${locale}`, label: 'Home' },
    { href: `/${locale}/countries`, label: 'Countries' },
    { href: `/${locale}/calendar/2025`, label: 'Calendar' },
    { href: `/${locale}/long-weekends`, label: 'Long Weekends' },
  ];

  const locales = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const localeNames: Record<string, string> = {
    en: 'EN', ko: '한', ja: '日', zh: '中', es: 'ES', fr: 'FR', de: 'DE', pt: 'PT'
  };

  return (
    <nav style={{ background: '#fff', borderBottom: '1px solid #e9d5ff' }} className="sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold text-xl" style={{ color: '#a855f7' }}>
            <Sunrise size={24} />
            <span className="hidden sm:block">HolidayCalendarHub</span>
            <span className="sm:hidden">HCHub</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                style={{
                  color: pathname === item.href ? '#a855f7' : '#1a1235',
                  background: pathname === item.href ? '#f3e8ff' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Locale switcher + mobile menu */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-1">
              {locales.map(l => (
                <Link
                  key={l}
                  href={pathname.replace(`/${locale}`, `/${l}`)}
                  className="text-xs px-2 py-1 rounded font-medium transition-colors"
                  style={{
                    color: l === locale ? '#a855f7' : '#6b7280',
                    fontWeight: l === locale ? '700' : '400',
                    background: l === locale ? '#f3e8ff' : 'transparent',
                  }}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg"
              style={{ color: '#1a1235' }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden py-3 pb-4 border-t" style={{ borderColor: '#e9d5ff' }}>
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-sm font-medium rounded-lg mb-1"
                style={{
                  color: pathname === item.href ? '#a855f7' : '#1a1235',
                  background: pathname === item.href ? '#f3e8ff' : 'transparent',
                }}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-wrap gap-1 px-4 pt-2 mt-2 border-t" style={{ borderColor: '#e9d5ff' }}>
              {locales.map(l => (
                <Link
                  key={l}
                  href={pathname.replace(`/${locale}`, `/${l}`)}
                  onClick={() => setIsOpen(false)}
                  className="text-xs px-2 py-1 rounded font-medium"
                  style={{
                    color: l === locale ? '#a855f7' : '#6b7280',
                    fontWeight: l === locale ? '700' : '400',
                    background: l === locale ? '#f3e8ff' : 'transparent',
                  }}
                >
                  {localeNames[l]}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
