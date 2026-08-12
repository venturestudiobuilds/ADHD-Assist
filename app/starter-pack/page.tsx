import type { Metadata } from 'next';
import Link from 'next/link';
import ProductPageShell from '@/components/ProductPageShell';
import BuyButton from '@/components/BuyButton';

export const metadata: Metadata = {
  title: 'Diagnosis Prep Starter Pack (£9) — ADHD Assist',
  description:
    'Your step-by-step system for getting from "I think I have ADHD" to a GP referral — without losing your mind in the process.',
};

const SECTIONS = [
  { n: 1, title: 'Full GP Appointment Prep Template', desc: 'Parts A–H — history, current struggles, opening statement, questions, things to bring. 2× longer than the free version.' },
  { n: 2, title: 'Full Symptom Evidence Builder', desc: '8 categories with example tables — focus, hyperfocus, time management, organisation, memory, emotional regulation, impulsivity, restlessness.' },
  { n: 3, title: 'Childhood & Adult Examples Worksheet', desc: 'Structured by age bracket. Helps you find the examples assessors actually ask for.' },
  { n: 4, title: 'Phone Scripts: Every Scenario', desc: '9 scripts — booking, double appointments, mind going blank, online forms, chasing referrals, calling private providers, dismissive GP responses.' },
  { n: 5, title: 'Appointment Follow-Up Checklist', desc: "What to do in the same hour, within 48 hours, within 2 weeks, and what to do if it didn't go the way you hoped." },
  { n: 6, title: 'AI Prompt Pack — Appointment & Admin Edition', desc: '9 copy-paste prompts for ChatGPT, Claude, or Gemini. For every pre-appointment scenario.' },
  { n: 7, title: 'Referral Document Checklist', desc: 'Everything to gather, what to ask your GP for, a contact tracker, and a provider information record.' },
];

const EXTRAS_VS_FREE = [
  'GP prep template is 2× longer with history section and personalised opening statement',
  'Symptom evidence covers 8 categories (free = 6), adds hyperfocus',
  '9 phone scripts (free = 5) including chasing referrals and private provider calls',
  'Childhood worksheet is entirely new — not in free pack',
  '9 AI prompts (free = 1) covering all pre-appointment scenarios',
  'Referral document checklist and contact tracker',
];

export default function StarterPack() {
  return (
    <ProductPageShell>
      <div style={{ maxWidth: 840, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 0 48px' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 20px' }}>£9 · Instant download</div>
          <h1
            style={{
              fontFamily: "'Archivo Black', sans-serif",
              fontSize: 'clamp(32px, 5.5vw, 60px)',
              letterSpacing: '-0.04em',
              lineHeight: 0.95,
              color: 'var(--ink)',
              margin: '0 0 16px',
            }}
          >
            Diagnosis Prep
            <br />
            <span style={{ color: 'var(--coral)' }}>Starter Pack</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--ink)', opacity: 0.8, fontWeight: 600, maxWidth: 560, margin: '0 auto 32px' }}>
            Your step-by-step system for getting from &ldquo;I think I have ADHD&rdquo; to a GP referral — without losing your mind in the process.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BuyButton slug="starter-pack">Get the Starter Pack — £9 →</BuyButton>
            <Link className="cta-button cta-button-ghost" style={{ textDecoration: 'none' }} href="/free">
              Try the free pack first
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.5, marginTop: 12 }}>
            Instant PDF download · Secure payment via Stripe
          </p>
        </div>

        {/* What's in it */}
        <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '-0.03em', color: 'var(--ink)', margin: '0 0 24px' }}>
          What&rsquo;s in the pack
        </h2>
        <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: 14, marginBottom: 48 }}>
          {SECTIONS.map((s) => (
            <li
              key={s.n}
              style={{
                display: 'grid',
                gridTemplateColumns: '44px 1fr',
                gap: 16,
                alignItems: 'flex-start',
                background: 'white',
                border: '3px solid var(--ink)',
                borderRadius: 18,
                padding: '18px 22px',
                boxShadow: '0 6px 0 var(--ink)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--coral)',
                  border: '2.5px solid var(--ink)',
                  color: 'white',
                  fontFamily: "'Archivo Black', sans-serif",
                  fontSize: 18,
                  display: 'grid',
                  placeItems: 'center',
                  boxShadow: '0 3px 0 var(--ink)',
                  flexShrink: 0,
                }}
              >
                {s.n}
              </div>
              <div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 16, color: 'var(--ink)', marginBottom: 4 }}>{s.title}</div>
                <div style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.7, lineHeight: 1.5 }}>{s.desc}</div>
              </div>
            </li>
          ))}
        </ul>

        {/* What's extra vs free */}
        <div
          style={{
            background: 'var(--stage)',
            border: '3px solid var(--ink)',
            borderRadius: 22,
            padding: '24px 28px',
            boxShadow: '0 8px 0 var(--ink)',
            marginBottom: 40,
          }}
        >
          <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: 'var(--ink)', margin: '0 0 16px', letterSpacing: '-0.02em' }}>
            What&rsquo;s extra vs the free pack
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {EXTRAS_VS_FREE.map((e, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 14, color: 'var(--ink)', fontWeight: 600 }}>
                <span style={{ color: 'var(--coral)', fontWeight: 800 }}>✓</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA + upsell */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <BuyButton slug="starter-pack">Get the Starter Pack — £9 →</BuyButton>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.65, margin: 0 }}>
            Or step up to the{' '}
            <Link href="/full-pack" style={{ color: 'var(--coral)', fontWeight: 700, textDecoration: 'underline' }}>
              Full Pack (£24)
            </Link>{' '}
            — everything from referral to titration.
          </p>
        </div>
      </div>
    </ProductPageShell>
  );
}
