'use client';

import { Holiday } from '@/lib/holidays';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CalendarGridProps {
  year: number;
  holidays: Holiday[];
  initialMonth?: number; // 0-indexed
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number): number {
  // Returns 0=Mon, 6=Sun
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default function CalendarGrid({ year, holidays, initialMonth = new Date().getMonth() }: CalendarGridProps) {
  const [month, setMonth] = useState(initialMonth);

  // Build a set of holiday dates for quick lookup
  const holidayMap = new Map<string, Holiday[]>();
  for (const h of holidays) {
    const key = h.date;
    if (!holidayMap.has(key)) holidayMap.set(key, []);
    holidayMap.get(key)!.push(h);
  }

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  // Pad to complete last week
  while (cells.length % 7 !== 0) cells.push(null);

  const prevMonth = () => setMonth(m => m === 0 ? 11 : m - 1);
  const nextMonth = () => setMonth(m => m === 11 ? 0 : m + 1);

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
          style={{ color: '#a855f7' }}
        >
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-semibold text-lg" style={{ color: '#1a1235' }}>
          {MONTHS[month]} {year}
        </h3>
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-purple-50 transition-colors"
          style={{ color: '#a855f7' }}
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs font-semibold py-1" style={{ color: '#9ca3af' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((day, idx) => {
          if (!day) return <div key={idx} />;

          const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          const dayHolidays = holidayMap.get(dateStr) || [];
          const isToday = dateStr === todayStr;
          const isWeekend = (idx % 7) >= 5;
          const hasHoliday = dayHolidays.length > 0;

          return (
            <div
              key={idx}
              className="relative p-1 min-h-[48px] rounded-md text-sm"
              style={{
                background: hasHoliday
                  ? 'linear-gradient(135deg, #f3e8ff 0%, #fce7f3 100%)'
                  : isWeekend
                    ? '#fafafa'
                    : 'transparent',
                border: isToday ? '2px solid #a855f7' : '1px solid transparent',
              }}
              title={dayHolidays.map(h => h.name).join(', ')}
            >
              <span
                className="font-medium text-xs"
                style={{
                  color: hasHoliday ? '#7e22ce' : isWeekend ? '#9ca3af' : '#1a1235',
                }}
              >
                {day}
              </span>
              {hasHoliday && (
                <div className="mt-0.5">
                  {dayHolidays.slice(0, 1).map((h, i) => (
                    <p key={i} className="text-xs leading-tight truncate" style={{ color: '#6d28d9', fontSize: '9px' }}>
                      {h.name}
                    </p>
                  ))}
                  {dayHolidays.length > 1 && (
                    <span className="text-xs" style={{ color: '#a855f7', fontSize: '9px' }}>+{dayHolidays.length - 1} more</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-3 border-t text-xs" style={{ borderColor: '#e9d5ff' }}>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: 'linear-gradient(135deg, #f3e8ff, #fce7f3)' }} />
          <span style={{ color: '#6b7280' }}>Holiday</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded border-2" style={{ borderColor: '#a855f7' }} />
          <span style={{ color: '#6b7280' }}>Today</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded" style={{ background: '#fafafa', border: '1px solid #e5e7eb' }} />
          <span style={{ color: '#6b7280' }}>Weekend</span>
        </div>
      </div>
    </div>
  );
}
