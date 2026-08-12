'use client';

// Purchase CTA for product pages — creates a Stripe Checkout Session and
// redirects to Stripe's hosted checkout.

import React from 'react';

export default function BuyButton({
  slug,
  children,
  ghost = false,
  style,
}: {
  slug: string;
  children: React.ReactNode;
  ghost?: boolean;
  style?: React.CSSProperties;
}) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onClick = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || 'Checkout failed');
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
      <button
        type="button"
        className={`cta-button ${ghost ? 'cta-button-ghost' : ''}`}
        style={style}
        onClick={onClick}
        disabled={loading}
      >
        {loading ? 'Opening checkout…' : children}
      </button>
      {error && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--coral-dark)' }}>{error}</span>}
    </span>
  );
}
