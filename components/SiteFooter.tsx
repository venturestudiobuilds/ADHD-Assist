// Site-wide footer: signature line, legal links, and the business identity
// block required by the E-Commerce Regulations.

import Link from 'next/link';
import { BUSINESS } from '@/lib/legal';

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-tagline">
        MADE WITH PATIENCE · FOR PEOPLE WHO LOST THEIRS
      </div>
      <nav className="site-footer-links" aria-label="Legal">
        <Link href="/privacy">Privacy</Link>
        <span aria-hidden="true">·</span>
        <Link href="/terms">Terms of Sale</Link>
        <span aria-hidden="true">·</span>
        <Link href="/refunds">Refunds</Link>
        <span aria-hidden="true">·</span>
        <a href={`mailto:${BUSINESS.email}`}>Contact</a>
      </nav>
      <div className="site-footer-identity">
        {BUSINESS.tradingName} is operated by {BUSINESS.legalName}, {BUSINESS.address} ·{' '}
        {BUSINESS.email}
      </div>
    </footer>
  );
}
