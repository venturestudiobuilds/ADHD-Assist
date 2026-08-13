import type { Metadata } from 'next';
import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import { getProduct } from '@/lib/products';

export const metadata: Metadata = {
  title: 'ADHD Assist - Thank you',
  robots: { index: false },
};

// Thank-you page for the FREE pack (email capture flow). Paid products land
// on /support/success after Stripe Checkout instead. The email itself never
// appears in this URL - it travels in the /api/subscribe POST body only.
export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ product?: string }>;
}) {
  const { product: slug } = await searchParams;
  const product = getProduct(slug ?? '');
  const isFree = product && product.price === 0;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto 40px', display: 'flex', justifyContent: 'center' }}>
        <div className="brand-pill">
          <div className="brand-dot" /> ADHD ASSIST
        </div>
      </div>

      <div className="success-card">
        {isFree ? (
          <>
            <div className="hero-eyebrow">✦ You&rsquo;re in</div>
            <h1 className="success-title">
              One useful step, <span style={{ color: 'var(--coral)' }}>sorted.</span>
            </h1>
            <p className="success-body">
              Thanks - <strong>{product.title}</strong> is on its way to your inbox. You can also
              grab it right now:
            </p>
            <a className="download-link" href={`/api/download?slug=${product.slug}`}>
              Download the free pack
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4 L12 16 M6 11 L12 17 L18 11 M5 20 L19 20" />
              </svg>
            </a>
            <p style={{ fontSize: 13, color: 'var(--ink)', opacity: 0.6, marginTop: 26 }}>
              When you&rsquo;re ready for the full system,{' '}
              <Link href="/starter-pack" style={{ color: 'var(--coral)', fontWeight: 700 }}>
                the Starter Pack (£9)
              </Link>{' '}
              picks up where this leaves off.
            </p>
          </>
        ) : (
          <>
            <div className="hero-eyebrow">✦ Hmm</div>
            <h1 className="success-title">Nothing to see here.</h1>
            <p className="success-body">
              This page confirms free pack signups. Looking for the packs themselves?
            </p>
            <Link className="download-link" href="/support#downloads">
              Back to the downloads
            </Link>
          </>
        )}
      </div>

      <SiteFooter />
    </div>
  );
}
