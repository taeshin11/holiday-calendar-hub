import { LongWeekend } from '@/lib/holidays';
import { Star } from 'lucide-react';

interface LongWeekendCardProps {
  lw: LongWeekend;
  compact?: boolean;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function getDayName(dateStr: string): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(dateStr).getDay()];
}

function getWorthItColor(score: number): string {
  if (score >= 5) return '#059669';
  if (score >= 4) return '#0891b2';
  if (score >= 3) return '#d97706';
  return '#6b7280';
}

function getTotalDaysColor(total: number): string {
  if (total >= 5) return '#fef08a';
  if (total >= 4) return '#99f6e4';
  return '#dcfce7';
}

export default function LongWeekendCard({ lw, compact = false }: LongWeekendCardProps) {
  const worthItColor = getWorthItColor(lw.worthItScore);
  const bgColor = getTotalDaysColor(lw.totalDays);

  if (compact) {
    return (
      <div className="card p-4 flex items-center justify-between gap-3">
        <div>
          <div className="font-semibold text-sm" style={{ color: '#1a1235' }}>{lw.holiday.name}</div>
          <div className="text-xs mt-0.5" style={{ color: '#6b7280' }}>
            {formatDate(lw.startDate)} — {formatDate(lw.endDate)}
          </div>
          {lw.leaveDaysNeeded > 0 && (
            <div className="text-xs mt-0.5" style={{ color: '#a855f7' }}>
              Take {lw.leaveDaysNeeded} day{lw.leaveDaysNeeded > 1 ? 's' : ''} off
            </div>
          )}
          {lw.leaveDaysNeeded === 0 && (
            <div className="text-xs mt-0.5" style={{ color: '#059669' }}>
              No leave needed!
            </div>
          )}
        </div>
        <div
          className="flex-shrink-0 text-center px-3 py-2 rounded-lg font-bold"
          style={{ background: bgColor, color: '#1a1235' }}
        >
          <div className="text-xl">{lw.totalDays}</div>
          <div className="text-xs">days</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="card p-5"
      style={{ borderLeft: `4px solid ${lw.totalDays >= 5 ? '#f59e0b' : lw.totalDays >= 4 ? '#06b6d4' : '#22c55e'}` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-base mb-1" style={{ color: '#1a1235' }}>
            {lw.holiday.name}
          </h3>
          <p className="text-xs mb-3" style={{ color: '#6b7280' }}>
            {lw.holiday.description}
          </p>

          <div className="flex flex-wrap gap-4 text-sm mb-3">
            <div>
              <span className="text-xs font-medium" style={{ color: '#9ca3af' }}>Date Range</span>
              <div style={{ color: '#1a1235' }}>
                {getDayName(lw.startDate)} {formatDate(lw.startDate)} — {getDayName(lw.endDate)} {formatDate(lw.endDate)}
              </div>
            </div>
            {lw.bridgeDays.length > 0 && (
              <div>
                <span className="text-xs font-medium" style={{ color: '#9ca3af' }}>Bridge Day{lw.bridgeDays.length > 1 ? 's' : ''}</span>
                <div style={{ color: '#a855f7' }}>
                  {lw.bridgeDays.map(d => `${getDayName(d)} ${formatDate(d)}`).join(', ')}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {lw.leaveDaysNeeded === 0 ? (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: '#dcfce7', color: '#065f46' }}>
                No leave needed!
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full" style={{ background: '#ede9fe', color: '#6d28d9' }}>
                Take {lw.leaveDaysNeeded} day{lw.leaveDaysNeeded > 1 ? 's' : ''} off
              </span>
            )}

            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  style={{ color: i < lw.worthItScore ? '#f59e0b' : '#e5e7eb' }}
                  fill={i < lw.worthItScore ? '#f59e0b' : 'none'}
                />
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex-shrink-0 text-center px-4 py-3 rounded-xl font-bold min-w-[70px]"
          style={{ background: bgColor }}
        >
          <div className="text-3xl font-black" style={{ color: '#1a1235' }}>{lw.totalDays}</div>
          <div className="text-xs" style={{ color: '#4b5563' }}>days off</div>
        </div>
      </div>
    </div>
  );
}
