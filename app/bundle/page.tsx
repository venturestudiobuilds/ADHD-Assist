import type { Metadata } from 'next';
import ProductPageShell from '@/components/ProductPageShell';
import BuyButton from '@/components/BuyButton';

export const metadata: Metadata = {
  title: 'Full Pack + Admin System Bundle (£35) - ADHD Assist',
  description: 'The complete PDF system and the interactive tracker, together.',
};

const INCLUDED = [
  {
    price: '£24',
    tag: 'Full Pack',
    title: 'Full ADHD Diagnosis Prep & Survival Pack',
    items: ['15-section PDF', 'GP prep to titration notes', '20-prompt AI library', 'Provider comparison template', 'Assessment day prep', 'Medication tracker'],
  },
  {
    price: '£12',
    tag: 'Admin System',
    title: 'ADHD Admin System',
    items: ['Interactive browser tracker', 'Google Sheets / Excel file', 'Notion workspace build guide', '8 tabs covering your whole process', 'Data saves in your browser automatically'],
  },
];

export default function BundlePage() {
  return (
    <ProductPageShell>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 80px' }}>
        {/* Hero */}
        <div style={{ textAlign: 'center', padding: '40px 0 48px' }}>
          <div className="hero-eyebrow" style={{ margin: '0 auto 20px' }}>£35 · Save £1 vs separate</div>
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
            Full Pack + <span style={{ color: 'var(--coral)' }}>Admin System</span>
          </h1>
          <p style={{ fontSize: 'clamp(16px, 1.8vw, 20px)', color: 'var(--ink)', opacity: 0.8, fontWeight: 600, maxWidth: 500, margin: '0 auto 32px' }}>
            The complete PDF system and the interactive tracker, together.
          </p>
          <BuyButton slug="bundle">Get the bundle - £35 →</BuyButton>
          <p style={{ fontSize: 12, color: 'var(--ink)', opacity: 0.5, marginTop: 12 }}>
            Instant download · Full Pack PDF + Admin System (browser app, Sheets file, Notion guide)
          </p>
        </div>

        {/* What's included */}
        <div style={{ display: 'grid', gap: 16, marginBottom: 48 }}>
          {INCLUDED.map((p) => (
            <div
              key={p.tag}
              style={{
                background: 'white',
                border: '3px solid var(--ink)',
                borderRadius: 22,
                padding: '24px 28px',
                boxShadow: '0 8px 0 var(--ink)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <div>
                  <div className="tag tag-paid" style={{ marginBottom: 8 }}>{p.tag}</div>
                  <h3 style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 19, color: 'var(--ink)', margin: 0, letterSpacing: '-0.02em' }}>{p.title}</h3>
                </div>
                <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 22, color: 'var(--coral)', flexShrink: 0, marginLeft: 12 }}>{p.price}</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {p.items.map((it, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--ink)', fontWeight: 600 }}>
                    <span style={{ color: 'var(--coral)', fontWeight: 800 }}>✓</span>
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Saving callout */}
        <div
          style={{
            background: 'var(--stage)',
            border: '3px solid var(--ink)',
            borderRadius: 22,
            padding: '22px 28px',
            boxShadow: '0 8px 0 var(--ink)',
            marginBottom: 40,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 18, color: 'var(--ink)', marginBottom: 4 }}>Separate prices: £36</div>
            <div style={{ fontSize: 14, color: 'var(--ink)', opacity: 0.65 }}>Full Pack (£24) + Admin System (£12)</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 28, color: 'var(--coral)' }}>£35 together</div>
            <div style={{ fontSize: 13, color: 'var(--ink)', opacity: 0.65 }}>Save £1</div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <BuyButton slug="bundle">Get the bundle - £35 →</BuyButton>
        </div>
      </div>
    </ProductPageShell>
  );
}
