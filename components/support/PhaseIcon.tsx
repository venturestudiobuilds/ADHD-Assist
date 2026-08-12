// Inline SVG icons for the situation cards.

export default function PhaseIcon({ kind }: { kind: string }) {
  const stroke = 'var(--ink)';
  const fill = 'var(--coral)';
  const sw = 2.2;
  switch (kind) {
    case 'compass':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9 L12 14 L9 15 L12 10 Z" fill={fill} stroke="none" />
          <circle cx="12" cy="12" r="1.2" fill={stroke} stroke="none" />
        </svg>
      );
    case 'clipboard':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="4" width="14" height="17" rx="2" />
          <rect x="9" y="2" width="6" height="4" rx="1" fill={fill} />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="13" y2="15" />
        </svg>
      );
    case 'refresh':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12 a9 9 0 0 1 15 -6.7 L21 7" />
          <path d="M21 4 v3 h-3" />
          <path d="M21 12 a9 9 0 0 1 -15 6.7 L3 17" />
          <path d="M3 20 v-3 h3" />
        </svg>
      );
    case 'table':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <line x1="3" y1="14" x2="21" y2="14" />
          <line x1="9" y1="5" x2="9" y2="19" />
          <line x1="15" y1="5" x2="15" y2="19" />
          <rect x="9.5" y="10.5" width="5" height="3" fill={fill} stroke="none" />
        </svg>
      );
    case 'pill':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <g transform="rotate(-30 12 12)">
            <rect x="2" y="9" width="20" height="6" rx="3" />
            <rect x="2" y="9" width="10" height="6" rx="3" fill={fill} fillOpacity="0.4" stroke="none" />
            <line x1="12" y1="9" x2="12" y2="15" />
          </g>
        </svg>
      );
    case 'lightbulb':
      return (
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18 h6 M10 21 h4" />
          <path d="M12 3 a6 6 0 0 0 -4 10 c1 1 1.5 2 1.5 3 v1 h5 v-1 c0 -1 0.5 -2 1.5 -3 a6 6 0 0 0 -4 -10 z" fill={fill} fillOpacity="0.3" />
        </svg>
      );
    default:
      return null;
  }
}
