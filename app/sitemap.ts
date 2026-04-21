import { MetadataRoute } from 'next';
import { getAllCountries } from '@/lib/holidays';

const BASE_URL = 'https://holiday-calendar-hub.vercel.app';
const LOCALES = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
const YEARS = ['2024', '2025', '2026'];

export default function sitemap(): MetadataRoute.Sitemap {
  const countries = getAllCountries();
  const entries: MetadataRoute.Sitemap = [];

  // Home pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    });
  }

  // Countries list
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/countries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  // Country overview pages
  for (const locale of LOCALES) {
    for (const country of countries) {
      entries.push({
        url: `${BASE_URL}/${locale}/countries/${country.code}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Country + Year pages (main SEO pages)
  for (const locale of LOCALES) {
    for (const country of countries) {
      for (const year of YEARS) {
        entries.push({
          url: `${BASE_URL}/${locale}/countries/${country.code}/${year}`,
          lastModified: new Date(),
          changeFrequency: year === '2025' ? 'monthly' : 'yearly',
          priority: 0.9,
        });
      }
    }
  }

  // Content pages
  const contentPages = ['about', 'how-to-use', 'privacy', 'terms'];
  for (const locale of LOCALES) {
    for (const page of contentPages) {
      entries.push({
        url: `${BASE_URL}/${locale}/${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
      });
    }
  }

  // Long weekends pages
  for (const locale of LOCALES) {
    entries.push({
      url: `${BASE_URL}/${locale}/long-weekends`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    });
  }

  for (const locale of LOCALES) {
    for (const country of countries) {
      entries.push({
        url: `${BASE_URL}/${locale}/long-weekends/${country.code}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      });
    }
  }

  // Calendar pages
  for (const locale of LOCALES) {
    for (const year of YEARS) {
      entries.push({
        url: `${BASE_URL}/${locale}/calendar/${year}`,
        lastModified: new Date(),
        changeFrequency: year === '2025' ? 'monthly' : 'yearly',
        priority: 0.7,
      });

      for (let month = 1; month <= 12; month++) {
        entries.push({
          url: `${BASE_URL}/${locale}/calendar/${year}/${month}`,
          lastModified: new Date(),
          changeFrequency: 'yearly',
          priority: 0.6,
        });
      }
    }
  }

  return entries;
}
