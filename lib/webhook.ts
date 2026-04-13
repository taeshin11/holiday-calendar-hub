'use client';

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL || '';

export async function trackPageView(country: string, year: number, pageType: string, locale: string) {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'holiday_page_view',
        country,
        year,
        page_type: pageType,
        timestamp: new Date().toISOString(),
        locale,
      }),
    });
  } catch {
    // fire-and-forget, ignore errors
  }
}

export async function trackICalDownload(country: string, year: number) {
  if (!WEBHOOK_URL) return;
  try {
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'ical_download',
        country,
        year,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // fire-and-forget, ignore errors
  }
}
