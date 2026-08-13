import type { Metadata } from 'next';
import Link from 'next/link';
import LegalPage from '@/components/LegalPage';
import { BUSINESS, LEGAL_DATES } from '@/lib/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy — ADHD Assist',
  description: 'How ADHD Assist collects, uses and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated={LEGAL_DATES.privacy}>
      <h2>Who we are</h2>
      <p>
        {BUSINESS.tradingName} ({BUSINESS.site}) is operated by {BUSINESS.legalName},{' '}
        {BUSINESS.address}. We are the data controller for the personal data described in this
        policy. Contact: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>.
      </p>

      <h2>What we collect, and why</h2>
      <p>We deliberately collect as little as possible:</p>
      <ul>
        <li>
          <strong>Email address</strong> — if you request the free pack. Used to deliver the pack
          and, only if the signup wording says so, to send occasional related emails. Lawful
          basis: consent, which you can withdraw at any time via the unsubscribe link in any
          email or by contacting us.
        </li>
        <li>
          <strong>Purchase information</strong> — when you buy a pack, our payment provider
          Stripe processes your payment details and shares with us your email address and order
          details (never your full card number). Lawful basis: performance of a contract, and
          legal obligation for tax and accounting records.
        </li>
        <li>
          <strong>Technical logs</strong> — our hosting provider (Vercel) records standard
          server logs (IP address, browser type, pages requested) for security and to keep the
          site working. Lawful basis: legitimate interests.
        </li>
      </ul>
      <p>
        We do not run analytics or advertising trackers, we do not sell or share personal data
        for marketing, and we never ask for health information. Anything you type into the
        downloaded tools (worksheets, the Admin System tracker) stays on your own device — it is
        never sent to us.
      </p>

      <h2>Who we share data with</h2>
      <ul>
        <li>
          <strong>Stripe</strong> (payments) — see{' '}
          <a href="https://stripe.com/gb/privacy" rel="noopener noreferrer" target="_blank">
            Stripe&rsquo;s privacy policy
          </a>
          . Stripe may set cookies on its checkout pages.
        </li>
        <li>
          <strong>Vercel</strong> (hosting) — see{' '}
          <a href="https://vercel.com/legal/privacy-policy" rel="noopener noreferrer" target="_blank">
            Vercel&rsquo;s privacy policy
          </a>
          .
        </li>
      </ul>
      <p>
        These providers may process data outside the UK. Where they do, transfers are protected
        by recognised safeguards such as the UK International Data Transfer Agreement or UK
        Addendum to the EU Standard Contractual Clauses.
      </p>

      <h2>Cookies and local storage</h2>
      <p>
        This site does not set advertising or analytics cookies. Stripe sets strictly necessary
        cookies during checkout on its own pages. The Admin System app (if you buy it) stores
        your entries in your own browser&rsquo;s local storage, on your device, under your
        control — clearing browser data removes it.
      </p>

      <h2>How long we keep data</h2>
      <ul>
        <li>Free-pack email addresses: until you unsubscribe or ask us to delete them.</li>
        <li>Order records: 6 years, as required for UK tax and accounting purposes.</li>
        <li>Server logs: retained briefly by our hosting provider, then deleted automatically.</li>
      </ul>

      <h2>Your rights</h2>
      <p>
        Under UK GDPR you can ask us to access, correct, delete, restrict, or export your
        personal data, and you can object to processing based on legitimate interests. Email{' '}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> and we&rsquo;ll respond within
        one month. You also have the right to complain to the Information Commissioner&rsquo;s
        Office (<a href="https://ico.org.uk" rel="noopener noreferrer" target="_blank">ico.org.uk</a>).
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes materially, we&rsquo;ll update the date at the top and, where we
        hold your email address, tell you directly.
      </p>

      <p>
        See also our <Link href="/terms">Terms of Sale</Link> and{' '}
        <Link href="/refunds">Refund Policy</Link>.
      </p>
    </LegalPage>
  );
}
