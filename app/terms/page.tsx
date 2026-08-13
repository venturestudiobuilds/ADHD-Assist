import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { BUSINESS, LEGAL_DATES } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Terms of Sale — ADHD Assist',
  description: 'The terms that apply when you buy digital packs from ADHD Assist.',
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Sale" updated={LEGAL_DATES.terms}>
      <h2>1. Who you&rsquo;re buying from</h2>
      <p>
        {BUSINESS.tradingName} ({BUSINESS.site}) is operated by {BUSINESS.legalName},{' '}
        {BUSINESS.address}. Contact:{' '}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>. These terms apply whenever you
        buy a digital product from this site. Buying free content or reading the site&rsquo;s
        guidance doesn&rsquo;t create a contract — these terms are about purchases.
      </p>

      <h2>2. What you&rsquo;re buying</h2>
      <p>
        Our products are digital downloads: PDF workbooks, spreadsheet files, an offline browser
        app, and related guides. Each product page describes exactly what its pack contains, and
        the price shown at checkout (in GBP) is the total price. Products are delivered as a
        download link immediately after successful payment — nothing is posted.
      </p>

      <h2>3. Important: what these products are not</h2>
      <p>
        Everything we sell is educational and organisational material to help you prepare for
        appointments and track your own process. It is <strong>not medical advice</strong>, not
        a diagnostic tool, and not a substitute for assessment or care from a qualified
        healthcare professional. ADHD can only be diagnosed by an appropriately qualified
        clinician.
      </p>

      <h2>4. Payment</h2>
      <p>
        Payments are processed by Stripe. We never see or store your full card details. Your
        contract with us forms when Stripe confirms successful payment and we make the download
        available.
      </p>

      <h2>5. Delivery and access</h2>
      <p>
        After payment you are redirected to a page with your download link, and the link remains
        tied to your verified purchase so you can return to it. If a download fails or you lose
        the link, email us at <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> with
        your receipt and we&rsquo;ll sort it out.
      </p>

      <h2>6. Cancellation rights and the digital content waiver</h2>
      <p>
        Under the Consumer Contracts Regulations 2013 you normally have 14 days to cancel an
        online purchase. For digital content, that right ends early once delivery begins with
        your agreement. At checkout you expressly consent to immediate delivery and acknowledge
        that <strong>once the download is made available, you lose the statutory 14-day right to
        cancel</strong>. This doesn&rsquo;t affect your other statutory rights — see our{' '}
        <Link href="/refunds">Refund Policy</Link>, which is more generous than the legal
        minimum for faulty or misdescribed content.
      </p>

      <h2>7. Your licence to use the packs</h2>
      <p>
        Your purchase gives you a personal, non-transferable licence to use the pack for your
        own (or your household&rsquo;s) personal use: download it, print it, fill it in, keep
        backups. It doesn&rsquo;t permit resale, redistribution, uploading for public access, or
        use of the materials in a commercial product or service. All intellectual property stays
        with us.
      </p>

      <h2>8. Faulty or misdescribed content</h2>
      <p>
        Under the Consumer Rights Act 2015, digital content must be of satisfactory quality, fit
        for purpose, and as described. If a pack is faulty (for example, a corrupted file) or
        doesn&rsquo;t match its description, contact us — you&rsquo;re entitled to a repair,
        replacement, or refund.
      </p>

      <h2>9. Liability</h2>
      <p>
        Nothing in these terms limits liability that cannot legally be limited. Beyond that, our
        total liability for any purchase is capped at the price you paid for it, and we
        aren&rsquo;t liable for losses arising from decisions made based on the educational
        content — health decisions belong with qualified professionals (see section 3).
      </p>

      <h2>10. General</h2>
      <p>
        These terms are governed by the law of England and Wales, and disputes belong to the
        courts of England and Wales (if you live in Scotland or Northern Ireland, you may also
        use your local courts). If any part of these terms is found unenforceable, the rest
        still applies. These terms were last updated on the date shown above; the version in
        force when you buy is the one that applies to that purchase.
      </p>

      <p>
        See also our <Link href="/privacy">Privacy Policy</Link> and{' '}
        <Link href="/refunds">Refund Policy</Link>.
      </p>
    </LegalPage>
  );
}
