'use client';

// A single pack card in the Downloads grid. Free packs download directly;
// paid packs go through Stripe Checkout via /api/checkout.

import React from 'react';
import { COPY } from '@/lib/content';
import { formatPrice, type Product } from '@/lib/products';

export default function ProductCard({ product, index }: { product: Product; index: number }) {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const onBuy = async () => {
    if (product.price === 0) {
      // Free pack — direct download, no checkout.
      window.location.href = `/api/download?slug=${product.slug}`;
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: product.slug }),
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
    <div
      className={`product-card ${product.highlight ? 'product-card-featured' : ''}`}
      style={{ '--ci': index } as React.CSSProperties}
    >
      {product.highlight && <div className="product-flag">{COPY.productFlag}</div>}
      <div className={`tag ${product.label.toLowerCase().includes('free') ? 'tag-free' : 'tag-paid'}`}>
        {product.label}
      </div>
      <h3 className="product-title">{product.title}</h3>
      <p className="product-desc">{product.desc}</p>
      <ul className="product-list">
        {product.items.map((it) => (
          <li key={it}>
            <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 8 L7 12 L13 4" />
            </svg>
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <div className="product-price">
        {product.price === 0 ? <span className="product-price-free">Free</span> : formatPrice(product.price)}
      </div>
      <button
        className={`product-cta ${product.highlight ? 'product-cta-primary' : ''}`}
        onClick={onBuy}
        disabled={loading}
      >
        {loading ? 'Opening checkout…' : product.cta}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6 L15 12 L9 18" />
        </svg>
      </button>
      {error && (
        <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--coral-dark)' }}>{error}</div>
      )}
    </div>
  );
}
