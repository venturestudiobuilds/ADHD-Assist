// A single pack card in the Downloads grid. Each card links to the pack's
// dedicated sales page, where checkout (or the free email capture) lives.

import Link from 'next/link';
import { COPY } from '@/lib/content';
import { formatPrice, type Product } from '@/lib/products';

export default function ProductCard({ product, index }: { product: Product; index: number }) {
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
      <Link
        href={product.route}
        className={`product-cta ${product.highlight ? 'product-cta-primary' : ''}`}
        style={{ textDecoration: 'none' }}
      >
        {product.cta}
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 6 L15 12 L9 18" />
        </svg>
      </Link>
    </div>
  );
}
