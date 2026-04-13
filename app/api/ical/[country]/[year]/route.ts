import { NextResponse } from 'next/server';
import { getCountry, getHolidaysForCountry, generateICalContent } from '@/lib/holidays';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ country: string; year: string }> }
) {
  const { country: countryCode, year: yearStr } = await params;
  const year = parseInt(yearStr, 10);

  const country = getCountry(countryCode);
  const holidayData = getHolidaysForCountry(countryCode);

  if (!country || !holidayData || isNaN(year)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const holidays = holidayData.holidays.filter(h => h.date.startsWith(yearStr));
  const icalContent = generateICalContent(country.code, country.name.en, year, holidays);

  return new NextResponse(icalContent, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': `attachment; filename="holidays-${country.code.toLowerCase()}-${year}.ics"`,
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
