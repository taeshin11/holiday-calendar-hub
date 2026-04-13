interface CountdownBadgeProps {
  daysUntil: number;
}

export default function CountdownBadge({ daysUntil }: CountdownBadgeProps) {
  let text = '';
  let bgColor = '';
  let textColor = '';

  if (daysUntil === 0) {
    text = 'TODAY!';
    bgColor = '#a855f7';
    textColor = 'white';
  } else if (daysUntil === 1) {
    text = 'Tomorrow';
    bgColor = '#c084fc';
    textColor = 'white';
  } else if (daysUntil <= 7) {
    text = `${daysUntil} days`;
    bgColor = '#f3e8ff';
    textColor = '#7e22ce';
  } else if (daysUntil <= 30) {
    text = `${daysUntil} days`;
    bgColor = '#ede9fe';
    textColor = '#6d28d9';
  } else {
    text = `${daysUntil} days`;
    bgColor = '#f5f3ff';
    textColor = '#8b5cf6';
  }

  return (
    <span
      className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap"
      style={{ background: bgColor, color: textColor }}
    >
      {text}
    </span>
  );
}
