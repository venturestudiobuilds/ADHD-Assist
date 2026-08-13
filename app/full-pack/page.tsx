import type { Metadata } from 'next';
import Link from 'next/link';
import ProductPageShell from '@/components/ProductPageShell';
import BuyButton from '@/components/BuyButton';

export const metadata: Metadata = {
  title: 'Full ADHD Diagnosis Prep & Survival Pack (£24) - ADHD Assist',
  description:
    'The complete system for getting from "I think I have ADHD" to answers - 15 sections, from first GP appointment to medication titration. UK edition.',
};

const STAGES = [
  {
    label: 'Before you see your GP',
    sections: [
      { n: 1, title: 'Understanding Your Routes', desc: 'A full plain-English guide - NHS, Right to Choose (England), and Private - with comparison table and decision framework.' },
      { n: 2, title: 'Full GP Appointment Prep Template', desc: 'Parts A–H: history, struggles, opening statement, questions. Everything from the Starter Pack.' },
      { n: 3, title: 'Full Symptom Evidence Builder', desc: '8 categories with example tables and pattern summaries.' },
      { n: 4, title: 'Childhood & Adult Examples Worksheet', desc: 'Primary school through early adulthood. The "always" list. Who could confirm your childhood.' },
      { n: 5, title: 'Phone Scripts: Every Scenario', desc: '10 scripts - includes Right to Choose-specific script not in Starter Pack.' },
    ],
  },
  {
    label: 'Choosing & tracking your referral',
    sections: [
      { n: 6, title: 'Provider Comparison Template', desc: '22-criteria, 3-provider side-by-side. Cost, format, GMC registration, shared care policy.' },
      { n: 7, title: 'Referral Status Tracker', desc: 'A running log of every contact, confirmation, and communication. Milestone dates. Key contacts.' },
      { n: 8, title: 'Admin Tracker', desc: 'Full task checklist across all stages - pre-GP through treatment. Your whole process in one list.' },
    ],
  },
  {
    label: 'The wait',
    sections: [
      { n: 9, title: 'Weekly Survival Planner', desc: 'For the wait between referral and assessment. Minimal viable week structure. Monthly check-in.' },
    ],
  },
  {
    label: 'Assessment day & after',
    sections: [
      { n: 10, title: 'Assessment Day Prep Worksheet', desc: 'What to expect, logistics, key points to communicate. Questions to ask. Notes after.' },
      { n: 11, title: 'Appointment Follow-Up Checklist', desc: 'Immediate, 48-hour, and 2-week checklists for every appointment.' },
      { n: 12, title: 'What to Ask After Assessment', desc: 'Diagnosed and not-diagnosed scenarios. How to read the report. Next steps either way.' },
    ],
  },
  {
    label: 'Diagnosis & medication',
    sections: [
      { n: 13, title: 'Shared Care Question Sheet', desc: 'Questions to ask both your GP and private provider about NHS prescribing.' },
      { n: 14, title: 'Medication & Titration Notes', desc: '4-week daily log - focus, mood, energy, appetite, sleep, side effects. Questions tracker.' },
    ],
  },
  {
    label: 'Use at any stage',
    sections: [
      { n: 15, title: 'Full AI Prompt Library', desc: '20 prompts across 6 stages: getting started, evidence, navigating the system, waiting, assessment, after diagnosis.' },
    ],
  },
];

const ONLY_IN_FULL = [
  'Complete route explainer with comparison table',
  'Provider comparison template (22 rows, 3 providers)',
  'Referral status tracker with full contact log',
  'Admin tracker across all stages',
  'Weekly survival planner for the wait',
  'Assessment day prep worksheet',
  'Post-assessment guidance (diagnosed and not-diagnosed)',
  'Shared care question sheet',
  'Medication & titration notes',
  '20-prompt AI library (Starter = 9 prompts)',
];

export default function FullPack() {
  return (
    <ProductPageShell>
      <div style={{ maxWidth: 880, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 0 48px' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 20px' }}>£24 · Most popular · Instant download</div>
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
            The Full ADHD Diagnosis
            <br />
            <span style={{ color: 'var(--coral)' }}>Prep &amp; Survival Pack</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--ink)', opacity: 0.8, fontWeight: 600, maxWidth: 600, margin: '0 auto 10px' }}>
            The complete system for getting from &ldquo;I think I have ADHD&rdquo; to answers - without holding the whole process in your head.
          </p>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.6, maxWidth: 540, margin: '0 auto 32px' }}>
            15 sections. From first GP appointment to medication titration. UK edition.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <BuyButton slug="full-pack">Get the Full Pack - £24 →</BuyButton>
            <Link className="cta-button cta-button-ghost" style={{ textDecoration: 'none' }} href="/bundle">
              Bundle with Admin System - £35
            </Link>
          </div>
          <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.5, marginTop: 12 }}>
            Instant PDF download · Secure payment via Stripe
          </p>
        </div>

        {/* Sections grid, grouped by stage of the journey - matches the subhead above
            instead of dropping all 15 as one flat, equally-weighted wall. */}
        <h2 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 'clamp(24px,3vw,36px)', letterSpacing: '-0.03em', color: 'var(--ink)', margin: '0 0 24px' }}>
          All 15 sections
        </h2>
        {STAGES.map((stage) => (
          <div key={stage.label} style={{ marginBottom: 32 }}>
            <h3
              style={{
                fontFamily: "'Archivo Black', sans-serif",
                fontSize: 15,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: 'var(--coral)',
                margin: '0 0 14px',
              }}
            >
              {stage.label}
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: 14 }}>
              {stage.sections.map((s) => (
                <li
                  key={s.n}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '40px 1fr',
                    gap: 14,
                    alignItems: 'flex-start',
                    background: 'white',
                    border: '2.5px solid var(--ink)',
                    borderRadius: 16,
                    padding: '16px 18px',
                    boxShadow: '0 5px 0 var(--ink)',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: 'var(--coral)',
                      border: '2.5px solid var(--ink)',
                      color: 'white',
                      fontFamily: "'Archivo Black', sans-serif",
                      fontSize: 15,
                      display: 'grid',
                      placeItems: 'center',
                      boxShadow: '0 3px 0 var(--ink)',
                      flexShrink: 0,
                    }}
                  >
                    {s.n}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 15, color: 'var(--ink)', marginBottom: 3 }}>{s.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--ink)', opacity: 0.7, lineHeight: 1.45 }}>{s.desc}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Only in Full */}
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
          <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 20, color: 'var(--ink)', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            Includes everything in the Starter Pack, plus:
          </h3>
          <p style={{ fontSize: 13, color: 'var(--ink)', opacity: 0.65, margin: '0 0 16px' }}>
            These sections are only in the Full Pack.
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 8 }}>
            {ONLY_IN_FULL.map((e, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: 'var(--ink)', fontWeight: 600 }}>
                <span style={{ color: 'var(--coral)', fontWeight: 800 }}>✓</span>
                {e}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
          <BuyButton slug="full-pack">Get the Full Pack - £24 →</BuyButton>
          <p style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.65, margin: 0 }}>
            Want a tracking tool too?{' '}
            <Link href="/bundle" style={{ color: 'var(--coral)', fontWeight: 700, textDecoration: 'underline' }}>
              Bundle with the Admin System for £35.
            </Link>
          </p>
        </div>
      </div>
    </ProductPageShell>
  );
}
