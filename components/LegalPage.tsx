// Shared layout for the legal pages (/privacy, /terms, /refunds).

import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { COPY } from '@/lib/content';

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 40 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: 1200,
          margin: '0 auto',
          padding: '24px 24px',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <div className="brand-pill">
            <div className="brand-dot" /> {COPY.brand}
          </div>
        </Link>
        <Link href="/support" className="back-btn" style={{ textDecoration: 'none' }}>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6 L9 12 L15 18" />
          </svg>
          Support hub
        </Link>
      </div>

      <div className="legal-shell fade-in">
        <h1 className="legal-title">{title}</h1>
        <p className="legal-updated">Last updated: {updated}</p>
        <div className="legal-prose">{children}</div>
      </div>

      <SiteFooter />
    </div>
  );
}
