'use client';

interface AdSlotProps {
  type: 'native' | 'display' | 'social-bar';
  className?: string;
}

export default function AdSlot({ type, className = '' }: AdSlotProps) {
  if (type === 'social-bar') {
    return (
      <div id="adsterra-social-bar" className={`fixed bottom-0 left-0 right-0 z-40 ${className}`}>
        {/* Adsterra Social Bar Script placeholder */}
      </div>
    );
  }

  if (type === 'native') {
    return (
      <div
        id="adsterra-native"
        className={`w-full my-6 min-h-[100px] rounded-xl flex items-center justify-center text-xs ${className}`}
        style={{ background: '#f3e8ff', color: '#c4b5fd' }}
      >
        {/* Native Banner Ad — Adsterra */}
        <span>Advertisement</span>
      </div>
    );
  }

  if (type === 'display') {
    return (
      <aside
        id="adsterra-display"
        className={`hidden lg:flex sticky top-24 items-center justify-center rounded-lg text-xs ${className}`}
        style={{
          minWidth: '300px',
          minHeight: '250px',
          background: '#f9fafb',
          color: '#d1d5db',
          border: '1px solid #e9d5ff',
        }}
      >
        {/* Display Ad 300x250 — Adsterra */}
        <span>Advertisement</span>
      </aside>
    );
  }

  return null;
}
