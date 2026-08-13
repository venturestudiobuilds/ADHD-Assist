import type { Metadata } from 'next';
import Link from 'next/link';
import ProductPageShell from '@/components/ProductPageShell';
import BuyButton from '@/components/BuyButton';

export const metadata: Metadata = {
  title: 'ADHD Admin System (£12) - ADHD Assist',
  description:
    'Your whole diagnosis process tracked in one place. Interactive browser tracker, Google Sheets file, and Notion build guide.',
};

const TABS_DESC = [
  { icon: '📊', label: 'Dashboard', desc: 'Milestone tracker with live progress bar. "What to do next" guide for when you\'re stuck.' },
  { icon: '✅', label: 'Admin Tracker', desc: '23 pre-loaded tasks across all stages. Add your own. Status dropdowns that show green when done.' },
  { icon: '📅', label: 'Referral Log', desc: 'Referral details block + running contact log. Every call, letter, and email - dated.' },
  { icon: '🏥', label: 'Provider Compare', desc: '22-row criteria, 3 providers side by side. Includes Right to Choose warning.' },
  { icon: '📁', label: 'Documents', desc: 'All required documents pre-listed across 3 stages. Priority-coded. Status dropdowns.' },
  { icon: '📝', label: 'Appointment Log', desc: 'Add a row for every appointment. Type dropdown, 6 columns including "how it felt".' },
  { icon: '💊', label: 'Medication', desc: 'Medication details + 14-day daily log with rating dropdowns for Focus, Mood, Energy, Appetite, Sleep.' },
  { icon: '📖', label: 'How to Use', desc: 'Quick reference for every tab. Data saves automatically in your browser.' },
];

export default function AdminSystemPage() {
  return (
    <ProductPageShell>
      <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 0 40px' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 20px' }}>£12 standalone · £35 with Full Pack</div>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(30px, 5vw, 58px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--ink)',
              margin: '0 0 16px',
            }}
          >
            ADHD Admin System
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--ink)', opacity: 0.8, fontWeight: 600, maxWidth: 560, margin: '0 auto 10px' }}>
            Your whole process tracked, in one place.
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.6, maxWidth: 520, margin: '0 auto 28px' }}>
            An interactive tracker that saves to your browser. No account needed. Works on desktop and mobile.
            Also available as a Google Sheets file and Notion workspace.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 8 }}>
            <BuyButton slug="admin-system">Get the Admin System - £12 →</BuyButton>
            <Link className="cta-button cta-button-ghost" style={{ textDecoration: 'none' }} href="/bundle">
              Bundle with Full Pack - £35
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.5 }}>
            Includes: browser app · Google Sheets file · Notion build guide
          </p>
        </div>

        {/* What's in each tab */}
        <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(22px,2.6vw,32px)', letterSpacing: '-0.03em', color: 'var(--ink)', margin: '0 0 20px' }}>
          8 tabs - one for every stage
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 12, marginBottom: 48 }}>
          {TABS_DESC.map((t) => (
            <li
              key={t.label}
              style={{
                background: 'white',
                border: '2.5px solid var(--ink)',
                borderRadius: 16,
                padding: '16px 18px',
                boxShadow: '0 5px 0 var(--ink)',
              }}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{t.icon}</div>
              <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 14, color: 'var(--ink)', marginBottom: 4 }}>{t.label}</div>
              <div style={{ fontSize: 13, color: 'var(--ink)', opacity: 0.7, lineHeight: 1.45 }}>{t.desc}</div>
            </li>
          ))}
        </ul>

        {/* Demo placeholder.
            The original design embedded the full <AdminSystem /> app here as a live demo,
            with an open TODO about it being ungated (the entire paid product, free, with
            autosave). That component hasn't been ported to this codebase yet - when it is,
            embed a GATED version here (limited tabs / no export / demo watermark). */}
        <div style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(22px,2.6vw,32px)', letterSpacing: '-0.03em', color: 'var(--ink)', margin: '0 0 8px' }}>
            See it in action
          </h2>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.65, margin: '0 0 20px' }}>
            A live, try-before-you-buy demo is coming soon.
          </p>
          <div
            style={{
              border: '3px dashed var(--ink)',
              borderRadius: 22,
              padding: '48px 24px',
              textAlign: 'center',
              background: 'rgba(255,255,255,0.5)',
            }}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>📊</div>
            <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: 'var(--ink)', margin: '0 0 6px' }}>
              Interactive demo coming soon
            </p>
            <p style={{ fontSize: 13, color: 'var(--ink)', opacity: 0.65, margin: 0, maxWidth: 420, marginInline: 'auto' }}>
              The full tracker ships with your download today - the in-page preview is on its way.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            background: 'var(--stage)',
            border: '3px solid var(--ink)',
            borderRadius: 22,
            padding: '28px 28px',
            boxShadow: '0 8px 0 var(--ink)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: 'var(--ink)', margin: '0 0 8px' }}>
            Like what you see?
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.75, margin: '0 0 20px' }}>
            The download includes the browser app, a Google Sheets / Excel file, and a Notion build guide - so you can use whichever format suits you.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BuyButton slug="admin-system">Get the Admin System - £12 →</BuyButton>
            <Link className="cta-button cta-button-ghost" style={{ textDecoration: 'none' }} href="/bundle">
              Bundle with Full Pack - £35
            </Link>
          </div>
        </div>
      </div>
    </ProductPageShell>
  );
}
