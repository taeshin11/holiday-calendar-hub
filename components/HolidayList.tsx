'use client';

import { Holiday, getDaysUntil } from '@/lib/holidays';
import { Calendar, Star } from 'lucide-react';
import CountdownBadge from './CountdownBadge';

interface HolidayListProps {
  holidays: Holiday[];
  showCountdown?: boolean;
}

function getHolidayType(holiday: Holiday): string {
  if (holiday.isOptional) return 'optional';
  if (!holiday.isNational) return 'regional';
  const lower = holiday.description.toLowerCase();
  if (lower.includes('christ') || lower.includes('easter') || lower.includes('religious') || lower.includes('eid') || lower.includes('diwali') || lower.includes('vesak') || lower.includes('holi')) return 'religious';
  return 'national';
}

function getTypeBadge(type: string) {
  const labels: Record<string, string> = {
    national: 'National',
    religious: 'Religious',
    regional: 'Regional',
    observance: 'Observance',
    optional: 'Optional',
  };
  const classes: Record<string, string> = {
    national: 'holiday-national',
    religious: 'holiday-religious',
    regional: 'holiday-regional',
    observance: 'holiday-observance',
    optional: 'holiday-optional',
  };
  return { label: labels[type] || 'Holiday', cls: classes[type] || 'holiday-national' };
}

function getDayName(dateStr: string): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[new Date(dateStr).getDay()];
}

function formatShortDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function HolidayList({ holidays, showCountdown = false }: HolidayListProps) {
  if (!holidays || holidays.length === 0) {
    return (
      <div className="text-center py-12" style={{ color: '#6b7280' }}>
        <Calendar size={48} className="mx-auto mb-4 opacity-30" />
        <p>No holidays found for this period.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {holidays.map((holiday, idx) => {
        const type = getHolidayType(holiday);
        const { label, cls } = getTypeBadge(type);
        const daysUntil = getDaysUntil(holiday.date);

        return (
          <div
            key={`${holiday.date}-${idx}`}
            className="card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="flex items-start gap-4">
              {/* Date block */}
              <div className="flex-shrink-0 w-16 text-center">
                <div className="text-xs font-medium" style={{ color: '#a855f7' }}>
                  {formatShortDate(holiday.date)}
                </div>
                <div className="text-xs" style={{ color: '#9ca3af' }}>
                  {getDayName(holiday.date).slice(0, 3)}
                </div>
              </div>

              {/* Holiday info */}
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-sm" style={{ color: '#1a1235' }}>
                    {holiday.name}
                  </h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cls}`}>
                    {label}
                  </span>
                </div>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
                  {holiday.description}
                </p>
              </div>
            </div>

            {/* Countdown */}
            {showCountdown && daysUntil >= 0 && (
              <div className="flex-shrink-0">
                <CountdownBadge daysUntil={daysUntil} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
