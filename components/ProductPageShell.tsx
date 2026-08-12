// Shared shell for the product sales pages: brand bar, back link,
// disclaimer and footer. Content pages render inside it.

import Link from 'next/link';
import { COPY } from '@/lib/content';

export default function ProductPageShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 60 }}>
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 24px 24px',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="brand-pill">
            <div className="brand-dot" /> {COPY.brand}
          </div>
        </Link>
        <Link href="/support#downloads" className="back-btn" style={{ textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L9 12 L15 18" />
          </svg>
          All downloads
        </Link>
      </div>

      <div className="fade-in">{children}</div>

      {/* Disclaimer */}
      <div style={{ maxWidth: 820, margin: '24px auto 0', padding: '0 24px' }}>
        <div className="disclaimer" style={{ textAlign: 'left' }}>
          <strong style={{ color: 'var(--ink)', fontSize: 14, letterSpacing: '0.02em' }}>{COPY.disclaimerStrong}</strong>
          {COPY.disclaimerBody}
        </div>
      </div>

      <div
        style={{
          textAlign: 'center',
          marginTop: 40,
          opacity: 0.55,
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--ink)',
          letterSpacing: '0.08em',
        }}
      >
        {COPY.footer}
      </div>
    </div>
  );
}
