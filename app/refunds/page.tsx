import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { BUSINESS, LEGAL_DATES } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Refund Policy - ADHD Assist',
  description: 'When and how ADHD Assist refunds digital pack purchases.',
};

export default function RefundsPage() {
  return (
    <LegalPage title="Refund Policy" updated={LEGAL_DATES.refunds}>
      <h2>The short version</h2>
      <p>
        If a pack is broken, not as described, or genuinely isn&rsquo;t what you needed, email
        us within 14 days of purchase at{' '}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> and we&rsquo;ll make it right -
        usually with a replacement file or a refund. We&rsquo;d rather refund a pack than have
        someone at a hard moment feel ripped off.
      </p>

      <h2>Your statutory rights</h2>
      <ul>
        <li>
          <strong>Faulty or misdescribed content</strong> (Consumer Rights Act 2015): if a file
          is corrupted, incomplete, or doesn&rsquo;t match its product page, you&rsquo;re
          entitled to a repair, replacement, or refund. No time pressure, no quibbling.
        </li>
        <li>
          <strong>The 14-day cancellation right</strong> (Consumer Contracts Regulations 2013):
          for digital content this ends when delivery begins with your express consent - which
          you give at checkout. So once your download is made available, the automatic
          cancellation right no longer applies. Our goodwill policy below goes further than
          this legal position.
        </li>
      </ul>

      <h2>Our goodwill policy</h2>
      <p>
        Beyond your statutory rights: if you bought a pack in the last 14 days and it
        isn&rsquo;t useful to you, tell us briefly why and we&rsquo;ll refund it. We ask only
        that you delete your copies. We may decline goodwill refunds where the pattern suggests
        abuse (for example, repeat purchase-refund cycles).
      </p>

      <h2>How refunds are paid</h2>
      <p>
        Refunds go back to the original payment method via Stripe, normally within 5–10 working
        days of approval. We&rsquo;ll confirm by email when it&rsquo;s issued.
      </p>

      <h2>How to ask</h2>
      <p>
        Email <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> with the email address
        you used at checkout and (if you have it) your Stripe receipt number. We respond within
        a few working days.
      </p>

      <p>
        See also our <Link href="/terms">Terms of Sale</Link> and{' '}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
