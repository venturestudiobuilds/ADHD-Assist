import type { Metadata } from 'next';
import Link from 'next/link';
import ProductPageShell from '@/components/ProductPageShell';
import FreePackForm from '@/components/FreePackForm';

export const metadata: Metadata = {
  title: 'Free ADHD Appointment Panic Pack — ADHD Assist',
  description:
    'A calm little starter kit for preparing for your first GP conversation. 6 sections. Free. No catch.',
};

const SECTIONS = [
  { icon: '🗺️', title: 'The Routes: A Simple Explainer', desc: 'NHS, Right to Choose (England), and private — a plain-English overview of each.' },
  { icon: '📋', title: 'GP Appointment Prep Sheet', desc: "A fill-in worksheet so your brain doesn't go blank in the appointment." },
  { icon: '📞', title: 'Brain-Freeze Phone Script', desc: 'Word-for-word scripts for booking the appointment and handling every possible response.' },
  { icon: '🗒️', title: 'Tiny Symptom Evidence Starter', desc: 'Six categories, minimal tables. Just enough to start the conversation.' },
  { icon: '🤖', title: 'One AI Prompt for Overwhelm', desc: "Copy-paste into ChatGPT or Claude when you don't know where to start." },
  { icon: '⚠️', title: 'Full Disclaimer', desc: 'Medical safety copy, kept intact and prominently placed.' },
];

export default function FreePack() {
  return (
    <ProductPageShell>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 0 48px' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 20px' }}>Free download</div>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(36px, 6vw, 64px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--ink)',
              margin: '0 0 12px',
            }}
          >
            I Think I Might Have ADHD
          </h1>
          <p style={{ fontSize: 'clamp(18px, 2vw, 22px)', color: 'var(--ink)', opacity: 0.75, fontWeight: 600, margin: '0 0 8px' }}>
            The ADHD Appointment Panic Pack
          </p>
          <p style={{ fontSize: 15, color: 'var(--ink)', opacity: 0.6, maxWidth: 520, margin: '0 auto 36px' }}>
            A calm little starter kit for preparing for your first GP conversation. 6 sections. Free. No catch.
          </p>

          <FreePackForm />
        </div>

        {/* What's in it */}
        <h2
          style={{
            fontFamily: "'Archivo Black', sans-serif",
            fontSize: 'clamp(24px,3vw,36px)',
            letterSpacing: '-0.03em',
            color: 'var(--ink)',
            margin: '0 0 24px',
            textAlign: 'center',
          }}
        >
          What&rsquo;s inside
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14, marginBottom: 48 }}>
          {SECTIONS.map((s, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                gap: 16,
                alignItems: 'flex-start',
                background: 'white',
                border: '3px solid var(--ink)',
                borderRadius: 18,
                padding: '18px 22px',
                boxShadow: '0 6px 0 var(--ink)',
              }}
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>{s.icon}</span>
              <div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: 'var(--ink)', marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.7, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* Upsell */}
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
          <p style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: 'var(--ink)', margin: '0 0 8px' }}>
            Want the full system?
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.75, margin: '0 0 20px' }}>
            The Starter Pack has 7 full sections — 2× the phone scripts, 8-category symptom builder, childhood worksheet, and 9 AI prompts.
          </p>
          <Link className="cta-button" style={{ fontSize: 16, padding: '14px 28px', textDecoration: 'none', display: 'inline-block' }} href="/starter-pack">
            See the Starter Pack — £9 →
          </Link>
        </div>
      </div>
    </ProductPageShell>
  );
}
