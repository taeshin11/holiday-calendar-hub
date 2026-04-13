# HolidayCalendarHub — PRD
**Folder:** `holiday-calendar-hub`
**Tagline:** Public Holidays & Long Weekend Optimizer — Plan Your Time Off Globally

---

## 1. Overview

HolidayCalendarHub is a programmatic SEO powerhouse listing public holidays for 100+ countries and all years from 2020–2030. The unique feature is the **Long Weekend Optimizer**: given a country and year, it identifies every opportunity to extend a public holiday into a 3+ day break by taking 1–2 days of leave. The site targets high-volume global searches like "public holidays UK 2026", "long weekends Australia 2026", and "national holidays Japan".

**Target Users:**
- Global travelers and expats planning trips around local holidays
- HR managers needing country holiday calendars
- Employees optimizing annual leave for long weekends
- School/university administrators
- Remote workers with flexible PTO

---

## 2. Core Features

1. Country holiday calendar (full year view, list + grid)
2. Long weekend optimizer (identifies bridge opportunities)
3. Multi-year support (2020–2030)
4. Holiday type classification (national, religious, regional, observance)
5. iCal / .ics download per country/year
6. Next upcoming holiday countdown widget
7. Holiday search across all countries
8. Country-to-country holiday overlap finder
9. Visitor counter (today + total) in footer
10. Adsterra ad placements (3 types)
11. Google Sheets webhook on holiday page views and downloads
12. Full i18n: en, ko, ja, zh, es, fr, de, pt
13. hreflang + schema.org + auto sitemap

---

## 3. Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 14 (App Router, SSG) | Massive static generation — all pages pre-built |
| Styling | Tailwind CSS | Utility-first |
| Data | Nager.Date API + static JSON cache | Free, 100+ countries |
| i18n | next-intl | |
| SEO | next-sitemap | |
| Deployment | Vercel (free hobby) | `npx vercel --prod` |
| Version Control | GitHub via `gh` CLI | |

**No backend needed** — fully static, data fetched at build time from Nager.Date.

---

## 4. Free Data Sources

### Primary: Nager.Date API
- **Base URL:** `https://date.nager.at/api/v3`
- **Endpoints:**
  - `GET /PublicHolidays/{year}/{countryCode}` → Array of holiday objects
  - `GET /AvailableCountries` → List of supported country codes
  - `GET /LongWeekend/{year}/{countryCode}` → Pre-computed long weekends!
  - `GET /NextPublicHolidays/{countryCode}` → Upcoming holidays
- **Rate limit:** None stated; free public API
- **Supported countries:** 100+ (US, UK, DE, FR, JP, KR, AU, CA, IN, BR, CN, etc.)

### Secondary: Static JSON Cache
- At build time, fetch all `PublicHolidays` for years 2020–2030 for all countries
- Store in `data/holidays/{countryCode}/{year}.json`
- Fallback if API is down during build
- Script: `scripts/fetch-all-holidays.ts`

### Country Metadata
- File: `data/countries.json` — name (in all 8 languages), flag emoji, region, capital, currency, timezone

---

## 5. Page Structure

### `/` — Home
- Hero: "Explore Public Holidays Worldwide" with country search/picker
- Featured grid: 20 most-searched countries with current year holiday count
- "Long Weekend Opportunities" section: top picks for current year globally
- Upcoming holidays widget (next 7 days, multi-country)
- FAQ section (schema.org FAQPage)
- SEO: H1, rich meta description

### `/countries/[country]` — Country Overview Page (SSG)
- H1: "Public Holidays in [Country Name] — All Years"
- Year selector tabs: 2020–2030
- Current year full holiday calendar (list + monthly grid)
- Long weekend table for current year
- "Download iCal" button
- Related countries sidebar
- Breadcrumb: Home > Countries > [Country]

### `/years/[year]` — Year Overview (SSG)
- H1: "Public Holidays in [Year] — All Countries"
- Grid of all 100+ countries with holiday count for the year
- "Most holidays this year" ranking table
- Breadcrumb: Home > Years > [Year]

### `/countries/[country]/[year]` — Country + Year Page (SSG) ← MAIN SEO PAGE
- H1: "Public Holidays in [Country], [Year]"
- Full holiday list: date, day of week, holiday name, type badge
- Monthly calendar view (12-month grid)
- Long weekend optimizer table (bridge day opportunities)
- iCal download
- "How many public holidays in [Country] [Year]?" answer block
- Schema: Event, FAQPage, BreadcrumbList
- Next/prev year links

### `/long-weekends/[country]/[year]` — Long Weekend Optimizer (SSG)
- H1: "Long Weekends in [Country], [Year] — Plan Your Leave"
- Table: Holiday → Extended period → Leave days needed → Total days off
- Bridge day calendar visual
- Share button
- Schema: FAQPage

### `/search` — Holiday Search (Client-side)
- Search across all holiday names, countries, dates
- Pre-indexed JSON for client-side Fuse.js search

---

## 6. UI/UX Design

### Color Palette (soft pastels)
- Background: `#f8f6ff` (very light lavender)
- Card background: `#ffffff`
- Primary accent: `#a78bfa` (soft purple)
- National holiday badge: `#dbeafe` (pastel blue)
- Religious holiday badge: `#fef3c7` (pastel yellow)
- Regional badge: `#d1fae5` (pastel green)
- Observance badge: `#fce7f3` (pastel pink)
- Text: `#1e293b`

### Calendar Grid
- Monthly grid: 7 columns (Mon–Sun)
- Holiday days: colored background matching type
- Today: subtle ring border
- Long weekend cells: highlighted with diagonal stripe pattern
- Mobile: list view replaces grid below md breakpoint

### Long Weekend Table
- Columns: Date Range | Holiday Name | Days Off | Leave Days Needed | Worth It?
- "Worth It?" column: Star rating based on ratio (5 days off for 1 leave day = ⭐⭐⭐⭐⭐)
- Color-coded rows: green (3 days), teal (4 days), gold (5+ days)

### Country Picker
- Flag emoji + country name
- Search/filter input
- Grouped by region (Europe, Asia, Americas, etc.)

---

## 7. SEO Architecture

### Programmatic Page Count
- 100 countries × 11 years = 1,100 `/countries/[country]/[year]` pages
- 100 countries × 11 years = 1,100 `/long-weekends/[country]/[year]` pages
- 100 `/countries/[country]` overview pages
- 11 `/years/[year]` pages
- **Total: ~2,300+ pages**

### Meta Tags Template
```
# Country/Year page:
title: "Public Holidays in {CountryName} {Year} — Complete List | HolidayCalendarHub"
description: "All {count} public holidays in {CountryName} for {Year}. Dates, names, long weekends, and iCal download. Updated {Year} holiday calendar."

# Long Weekends page:
title: "Long Weekends {CountryName} {Year} — Bridge Days & Leave Optimizer | HolidayCalendarHub"
description: "Find every long weekend opportunity in {CountryName} for {Year}. Discover bridge days and maximize your time off with minimal leave."
```

### hreflang
- All pages have hreflang for 8 languages
- Country/year pages: URLs like `/en/countries/gb/2026`, `/ko/countries/gb/2026`

### Schema.org (Country/Year page)
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Public Holidays in {Country} {Year}",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "item": { "@type": "Event", "name": "New Year's Day", "startDate": "{year}-01-01" } }
    ]
  }
}
```

### Sitemap
- next-sitemap with `sitemapSize: 5000`
- Priority: home=1.0, country/year=0.9, country overview=0.8, year overview=0.7, long-weekends=0.8
- `changefreq: yearly` for past years, `monthly` for current/future

---

## 8. i18n

**Supported languages:** en, ko, ja, zh, es, fr, de, pt

**Key translation keys:**
```json
{
  "home.hero.title": "Public Holidays Worldwide",
  "home.hero.subtitle": "Find holidays and optimize your long weekends",
  "country.holidays.title": "Public Holidays in {country}, {year}",
  "holiday.type.national": "National Holiday",
  "holiday.type.religious": "Religious Holiday",
  "holiday.type.regional": "Regional Holiday",
  "holiday.type.observance": "Observance",
  "longweekend.title": "Long Weekends in {country}, {year}",
  "longweekend.leave_needed": "Leave days needed",
  "longweekend.total_days": "Total days off",
  "calendar.download_ical": "Download iCal (.ics)",
  "footer.visitors.today": "Today: {count} visitors",
  "footer.visitors.total": "Total: {count} visitors",
  "search.placeholder": "Search country or holiday...",
  "nav.countries": "Countries",
  "nav.years": "Years",
  "nav.long_weekends": "Long Weekends"
}
```

---

## 9. Ads (Adsterra)

**Placement 1 — Social Bar**
```html
<div id="adsterra-social-bar" class="fixed bottom-0 left-0 right-0 z-40">
  <!-- Adsterra Social Bar Script -->
</div>
```

**Placement 2 — Native Banner (between holiday list and long weekend table)**
```html
<div id="adsterra-native" class="w-full my-6 min-h-[100px] bg-purple-50 rounded-xl flex items-center justify-center text-gray-300 text-xs">
  <!-- Native Banner Ad -->
</div>
```

**Placement 3 — Display 300×250 (sidebar on desktop, below fold on mobile)**
```html
<aside id="adsterra-display" class="hidden lg:block sticky top-24 min-w-[300px] min-h-[250px] bg-gray-50 rounded-lg">
  <!-- Display Ad 300x250 -->
</aside>
```

---

## 10. Google Sheets Webhook

**Triggers:**
1. Page view on any `/countries/[country]/[year]` or `/long-weekends/[country]/[year]` page
2. iCal download button click

**Payload:**
```json
{
  "event": "holiday_page_view",
  "country": "GB",
  "year": 2026,
  "page_type": "country_year",
  "timestamp": "2026-04-13T10:00:00Z",
  "locale": "en"
}
```

**iCal download payload:**
```json
{
  "event": "ical_download",
  "country": "US",
  "year": 2026,
  "timestamp": "2026-04-13T10:00:00Z"
}
```

**Implementation:** `lib/webhook.ts` with `fire-and-forget` POST, called from client-side `useEffect` on page mount and download click.

---

## 11. iCal Generation

**Endpoint:** `app/api/ical/[country]/[year]/route.ts`

**Format:** Standard RFC 5545 .ics file
```
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//HolidayCalendarHub//EN
X-WR-CALNAME:Public Holidays {Country} {Year}
BEGIN:VEVENT
DTSTART;VALUE=DATE:20260101
SUMMARY:New Year's Day
DESCRIPTION:National Holiday
END:VEVENT
...
END:VCALENDAR
```

**Response headers:** `Content-Type: text/calendar`, `Content-Disposition: attachment; filename="holidays-{country}-{year}.ics"`

---

## 12. Visitor Counter

**Storage:** Vercel KV (free) with key `visitors:total` and `visitors:today:{YYYY-MM-DD}`

**API routes:**
- `GET /api/visitors` → `{ today: number, total: number }`
- `POST /api/visitors/increment` → increments both counters

**Footer display:**
```html
<span class="text-xs text-gray-400">
  Today: {today} | All-time: {total} visitors
</span>
```

---

## 13. Milestones

### Milestone 1 — Scaffold + Data Fetch
- [ ] Run `init.sh`
- [ ] Fetch all holidays via `scripts/fetch-all-holidays.ts` (builds `data/holidays/` cache)
- [ ] Create `data/countries.json` with metadata for all 100+ countries
- [ ] Initialize git + create GitHub repo: `gh repo create taeshin11/holiday-calendar-hub --public --source=. --push`
- [ ] Log to `research_history/milestone-1.md`

### Milestone 2 — Core Page Components
- [ ] Build `CalendarGrid.tsx` (monthly grid component)
- [ ] Build `HolidayList.tsx` (sortable list with type badges)
- [ ] Build `LongWeekendTable.tsx`
- [ ] Build `ICalDownloadButton.tsx`
- [ ] Build `CountryPicker.tsx`
- [ ] `git commit -m "feat: core UI components"` + push

### Milestone 3 — All Page Routes
- [ ] Build `/` home page
- [ ] Build `/countries/[country]` overview
- [ ] Build `/years/[year]` overview
- [ ] Build `/countries/[country]/[year]` main page
- [ ] Build `/long-weekends/[country]/[year]` page
- [ ] Build `/search` client page with Fuse.js
- [ ] `git commit -m "feat: all routes complete"` + push

### Milestone 4 — SEO + i18n
- [ ] Add 8 language message files
- [ ] Configure next-intl routing
- [ ] Add hreflang, canonical, schema.org to all page types
- [ ] Generate sitemap with next-sitemap
- [ ] `git commit -m "feat: SEO and i18n"` + push

### Milestone 5 — Ads, Webhook, iCal API, Visitor Counter
- [ ] Add Adsterra placeholders
- [ ] Implement Google Sheets webhook (page view + download events)
- [ ] Build `/api/ical/[country]/[year]` route
- [ ] Implement visitor counter
- [ ] `git commit -m "feat: monetization and counter"` + push

### Milestone 6 — Deploy
- [ ] Final responsive QA
- [ ] Lighthouse audit
- [ ] `npx vercel --prod`
- [ ] `git commit -m "chore: production deploy"` + push

---

## 14. File Structure

```
holiday-calendar-hub/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx                               # Home
│   │   ├── countries/
│   │   │   ├── [country]/
│   │   │   │   ├── page.tsx                       # Country overview
│   │   │   │   └── [year]/page.tsx                # Country + Year (main SEO)
│   │   ├── years/[year]/page.tsx                  # Year overview
│   │   ├── long-weekends/[country]/[year]/page.tsx
│   │   └── search/page.tsx
│   └── api/
│       ├── visitors/route.ts
│       ├── visitors/increment/route.ts
│       └── ical/[country]/[year]/route.ts
├── components/
│   ├── CalendarGrid.tsx
│   ├── HolidayList.tsx
│   ├── LongWeekendTable.tsx
│   ├── ICalDownloadButton.tsx
│   ├── CountryPicker.tsx
│   ├── YearSelector.tsx
│   ├── AdSlot.tsx
│   ├── VisitorCounter.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── LanguageSwitcher.tsx
├── data/
│   ├── countries.json
│   └── holidays/
│       ├── US/
│       │   ├── 2020.json ... 2030.json
│       ├── GB/
│       └── ...
├── lib/
│   ├── nager.ts
│   ├── ical-generator.ts
│   ├── long-weekend-optimizer.ts
│   └── webhook.ts
├── messages/
│   ├── en.json ... pt.json
├── scripts/
│   └── fetch-all-holidays.ts
├── public/
├── research_history/
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── next.config.ts
├── next-sitemap.config.js
├── tailwind.config.ts
├── vercel.json
└── package.json
```

---

## 15. Harness Spec

### `feature_list.json`
```json
{
  "project": "holiday-calendar-hub",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "Country Holiday Calendar", "status": "pending", "milestone": 3 },
    { "id": "F02", "name": "Long Weekend Optimizer", "status": "pending", "milestone": 3 },
    { "id": "F03", "name": "iCal Download", "status": "pending", "milestone": 5 },
    { "id": "F04", "name": "Multi-year Support (2020-2030)", "status": "pending", "milestone": 2 },
    { "id": "F05", "name": "Holiday Search", "status": "pending", "milestone": 3 },
    { "id": "F06", "name": "i18n (8 languages)", "status": "pending", "milestone": 4 },
    { "id": "F07", "name": "SEO + Schema.org", "status": "pending", "milestone": 4 },
    { "id": "F08", "name": "Sitemap (2300+ URLs)", "status": "pending", "milestone": 4 },
    { "id": "F09", "name": "Adsterra Ads", "status": "pending", "milestone": 5 },
    { "id": "F10", "name": "Google Sheets Webhook", "status": "pending", "milestone": 5 },
    { "id": "F11", "name": "Visitor Counter", "status": "pending", "milestone": 5 },
    { "id": "F12", "name": "Vercel Deploy", "status": "pending", "milestone": 6 }
  ]
}
```

### `init.sh`
```bash
#!/bin/bash
set -e
echo "=== Initializing HolidayCalendarHub ==="

npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --yes

npm install next-intl next-sitemap fuse.js @vercel/kv

mkdir -p app/api/visitors/increment
mkdir -p "app/api/ical/[country]/[year]"
mkdir -p components data/holidays lib messages scripts public research_history

echo "Project: HolidayCalendarHub" > claude-progress.txt
echo "Started: $(date)" >> claude-progress.txt
echo "Current Milestone: 1" >> claude-progress.txt

git init
git add .
git commit -m "chore: initial scaffold"
gh repo create taeshin11/holiday-calendar-hub --public --source=. --push

echo "=== Running holiday data fetch script ==="
npx ts-node scripts/fetch-all-holidays.ts

echo "=== Init complete ==="
```

### `claude-progress.txt`
```
Project: HolidayCalendarHub
Started: [DATE]
Current Milestone: 1
Last Completed Step: Scaffold initialized
Next Step: Fetch all holiday data for 100 countries × 11 years
Notes:
- Nager.Date API is free, no key needed
- LongWeekend endpoint returns pre-computed data, use it directly
- Cache all data in data/holidays/{CC}/{year}.json at build time
- generateStaticParams must be used for all country/year combinations
```

---

## 16. Key Implementation Notes

1. **generateStaticParams** for `/countries/[country]/[year]`: read from `data/countries.json` (country codes) × years array `[2020..2030]` → ~1,100 params
2. **Long Weekend Optimizer logic** (if Nager API `/LongWeekend` fails): identify holidays on Tue/Wed/Thu → recommend Mon/Fri leave to create 4-5 day break; holidays on Mon/Fri → already a 3-day weekend
3. **iCal generation** in API route: pure string generation, no external library needed; or use `ical-generator` npm package
4. **Fuse.js** for client-side search: pre-build search index JSON at build time containing all holiday names + country names
5. **Build time warning:** Fetching 100 countries × 11 years = 1,100 API calls — add 100ms delay between calls in `fetch-all-holidays.ts` to be polite to Nager.Date
6. **Static data freshness:** Holiday data rarely changes; rebuild quarterly is sufficient
7. **Vercel build limit:** Free tier allows 45-min builds; with cached data the build should complete in ~10 min
8. **Country name translations** in `data/countries.json`:
   ```json
   { "code": "US", "name": { "en": "United States", "ko": "미국", "ja": "アメリカ合衆国", "zh": "美国", "es": "Estados Unidos", "fr": "États-Unis", "de": "Vereinigte Staaten", "pt": "Estados Unidos" } }
   ```
