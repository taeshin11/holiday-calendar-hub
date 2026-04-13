import holidaysData from '@/data/holidays-fallback.json';
import countriesData from '@/data/countries-fallback.json';

export interface Holiday {
  date: string;
  name: string;
  description: string;
  isNational: boolean;
  isOptional: boolean;
}

export interface CountryHolidays {
  countryCode: string;
  countryName: string;
  holidays: Holiday[];
}

export interface Country {
  code: string;
  name: { [locale: string]: string };
  flag: string;
  region: string;
  capital: string;
  currency: string;
  timezone: string;
  totalHolidaysPerYear: number;
  workingHoursCulture: string;
}

export function getAllCountries(): Country[] {
  return countriesData as Country[];
}

export function getCountry(code: string): Country | undefined {
  return (countriesData as Country[]).find(c => c.code.toLowerCase() === code.toLowerCase());
}

export function getHolidaysForCountry(countryCode: string): CountryHolidays | undefined {
  return (holidaysData as CountryHolidays[]).find(
    c => c.countryCode.toLowerCase() === countryCode.toLowerCase()
  );
}

export function getAllHolidays(): CountryHolidays[] {
  return holidaysData as CountryHolidays[];
}

export function getUpcomingHolidays(daysAhead: number = 30): Array<Holiday & { countryCode: string; countryName: string }> {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const futureDate = new Date(today);
  futureDate.setDate(futureDate.getDate() + daysAhead);

  const upcoming: Array<Holiday & { countryCode: string; countryName: string }> = [];

  for (const country of holidaysData as CountryHolidays[]) {
    for (const holiday of country.holidays) {
      const hDate = new Date(holiday.date);
      if (hDate >= today && hDate <= futureDate) {
        upcoming.push({
          ...holiday,
          countryCode: country.countryCode,
          countryName: country.countryName,
        });
      }
    }
  }

  return upcoming.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export function getDaysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  target.setHours(0, 0, 0, 0);
  const diff = target.getTime() - today.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export function formatDate(dateStr: string, locale: string = 'en'): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale === 'en' ? 'en-US' : locale, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getDayOfWeek(dateStr: string): number {
  // 0 = Sunday, 1 = Monday, ...
  return new Date(dateStr).getDay();
}

export function isWeekend(dateStr: string): boolean {
  const day = getDayOfWeek(dateStr);
  return day === 0 || day === 6;
}

export interface LongWeekend {
  holiday: Holiday;
  startDate: string;
  endDate: string;
  totalDays: number;
  leaveDaysNeeded: number;
  bridgeDays: string[];
  worthItScore: number; // 1-5 stars
}

export function computeLongWeekends(countryCode: string): LongWeekend[] {
  const data = getHolidaysForCountry(countryCode);
  if (!data) return [];

  const results: LongWeekend[] = [];
  const today = new Date();

  for (const holiday of data.holidays) {
    const hDate = new Date(holiday.date);
    const dayOfWeek = hDate.getDay(); // 0=Sun, 6=Sat

    // Already a 3-day weekend
    if (dayOfWeek === 1) {
      // Monday holiday -> Sat+Sun+Mon = 3 days
      const sat = new Date(hDate);
      sat.setDate(sat.getDate() - 2);
      results.push({
        holiday,
        startDate: sat.toISOString().split('T')[0],
        endDate: holiday.date,
        totalDays: 3,
        leaveDaysNeeded: 0,
        bridgeDays: [],
        worthItScore: 5,
      });
    } else if (dayOfWeek === 5) {
      // Friday holiday -> Fri+Sat+Sun = 3 days
      const sun = new Date(hDate);
      sun.setDate(sun.getDate() + 2);
      results.push({
        holiday,
        startDate: holiday.date,
        endDate: sun.toISOString().split('T')[0],
        totalDays: 3,
        leaveDaysNeeded: 0,
        bridgeDays: [],
        worthItScore: 5,
      });
    } else if (dayOfWeek === 2) {
      // Tuesday -> take Monday off -> Mon+Tue+Sat+Sun = 4 days
      const mon = new Date(hDate);
      mon.setDate(mon.getDate() - 1);
      const sat = new Date(hDate);
      sat.setDate(sat.getDate() - 3);
      results.push({
        holiday,
        startDate: sat.toISOString().split('T')[0],
        endDate: holiday.date,
        totalDays: 4,
        leaveDaysNeeded: 1,
        bridgeDays: [mon.toISOString().split('T')[0]],
        worthItScore: 4,
      });
    } else if (dayOfWeek === 4) {
      // Thursday -> take Friday off -> Thu+Fri+Sat+Sun = 4 days
      const fri = new Date(hDate);
      fri.setDate(fri.getDate() + 1);
      const sun = new Date(hDate);
      sun.setDate(sun.getDate() + 3);
      results.push({
        holiday,
        startDate: holiday.date,
        endDate: sun.toISOString().split('T')[0],
        totalDays: 4,
        leaveDaysNeeded: 1,
        bridgeDays: [fri.toISOString().split('T')[0]],
        worthItScore: 4,
      });
    } else if (dayOfWeek === 3) {
      // Wednesday -> take Mon+Tue or Thu+Fri = 5 days
      const mon = new Date(hDate);
      mon.setDate(mon.getDate() - 2);
      const sat = new Date(hDate);
      sat.setDate(sat.getDate() + 3);
      results.push({
        holiday,
        startDate: mon.toISOString().split('T')[0],
        endDate: sat.toISOString().split('T')[0],
        totalDays: 5,
        leaveDaysNeeded: 2,
        bridgeDays: [
          new Date(hDate.getTime() - 2 * 86400000).toISOString().split('T')[0],
          new Date(hDate.getTime() - 1 * 86400000).toISOString().split('T')[0],
        ],
        worthItScore: 5,
      });
    }
  }

  // Filter out past dates and sort by date
  return results
    .filter(lw => new Date(lw.startDate) >= today)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
}

export function generateICalContent(countryCode: string, countryName: string, year: number, holidays: Holiday[]): string {
  const lines: string[] = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:-//HolidayCalendarHub//EN`,
    `X-WR-CALNAME:Public Holidays ${countryName} ${year}`,
    'X-WR-TIMEZONE:UTC',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  for (const holiday of holidays) {
    const dateStr = holiday.date.replace(/-/g, '');
    const nextDay = new Date(holiday.date);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDateStr = nextDay.toISOString().split('T')[0].replace(/-/g, '');
    const uid = `${holiday.date}-${holiday.name.toLowerCase().replace(/\s+/g, '-')}-${countryCode.toLowerCase()}@holidaycalendarhub.com`;

    lines.push('BEGIN:VEVENT');
    lines.push(`DTSTART;VALUE=DATE:${dateStr}`);
    lines.push(`DTEND;VALUE=DATE:${nextDateStr}`);
    lines.push(`SUMMARY:${holiday.name}`);
    lines.push(`DESCRIPTION:${holiday.description}`);
    lines.push(`UID:${uid}`);
    lines.push('END:VEVENT');
  }

  lines.push('END:VCALENDAR');
  return lines.join('\r\n');
}
