import Link from 'next/link';
import type { Metadata } from 'next';
import SiteFooter from '@/components/SiteFooter';
import { getStripe } from '@/lib/stripe';
import { getProduct } from '@/lib/products';

export const metadata: Metadata = {
  title: 'ADHD Assist - Thank you',
  robots: { index: false },
};

export const dynamic = 'force-dynamic';

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id: sessionId } = await searchParams;

  let state: 'ok' | 'unpaid' | 'invalid' = 'invalid';
  let packTitle = '';
  let downloadHref = '';

  if (sessionId) {
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      const slug = session.metadata?.slug ?? '';
      const product = getProduct(slug);
      if (session.payment_status === 'paid' && product) {
        state = 'ok';
        packTitle = product.title;
        downloadHref = `/api/download?slug=${product.slug}&session_id=${sessionId}`;
      } else {
        state = 'unpaid';
      }
    } catch {
      state = 'invalid';
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto 40px', display: 'flex', justifyContent: 'center' }}>
        <div className="brand-pill">
          <div className="brand-dot" /> ADHD ASSIST
        </div>
      </div>

      <div className="success-card">
        {state === 'ok' ? (
          <>
            <div className="hero-eyebrow">✦ Order complete</div>
            <h1 className="success-title">
              One useful step, <span style={{ color: 'var(--coral)' }}>sorted.</span>
            </h1>
            <p className="success-body">
              Thanks - your <strong>{packTitle}</strong> is ready. Download it below (a receipt is on
              its way to your email). This link stays valid, so you can come back to it.
            </p>
            <a className="download-link" href={downloadHref}>
              Download your pack
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 4 L12 16 M6 11 L12 17 L18 11 M5 20 L19 20" />
              </svg>
            </a>
          </>
        ) : (
          <>
            <div className="hero-eyebrow">✦ Hmm</div>
            <h1 className="success-title">We couldn&rsquo;t verify that order.</h1>
            <p className="success-body">
              {state === 'unpaid'
                ? "It looks like the payment hasn't gone through yet. If you were charged, give it a minute and refresh this page."
                : 'This link is missing or expired. If you completed a purchase, check your email for the receipt, or head back to the downloads.'}
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
