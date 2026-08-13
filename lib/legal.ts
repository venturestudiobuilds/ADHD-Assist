// Business identity + legal config - the single place to fill in the real
// details. Anything in [square brackets] is a REQUIRED placeholder: UK law
// (E-Commerce Regulations 2002 / Consumer Contracts Regulations 2013)
// requires a trading name, geographic address and contact email to be
// displayed before you sell.

export const BUSINESS = {
  tradingName: 'ADHD Assist',
  /** Your legal name or registered company name (+ company number if Ltd). */
  legalName: '[YOUR LEGAL NAME OR COMPANY NAME]',
  /** A real geographic address - required for distance selling. */
  address: '[YOUR BUSINESS ADDRESS], United Kingdom',
  email: 'aiventurestudio@proton.me',
  site: 'https://adhd-assist.vercel.app',
};

export const LEGAL_DATES = {
  privacy: '13 August 2026',
  terms: '13 August 2026',
  refunds: '13 August 2026',
};

/** Shown at Stripe Checkout, next to the pay button - the express-consent
 *  notice that starts immediate delivery and waives the 14-day cooling-off
 *  right for digital content (Consumer Contracts Regulations 2013, reg 37). */
export const CHECKOUT_CONSENT_TEXT =
  'By completing this purchase you agree to the Terms of Sale and Refund Policy at ' +
  BUSINESS.site +
  '/terms, and you expressly consent to immediate delivery of this digital content - ' +
  'acknowledging that once the download is made available, you lose the statutory ' +
  '14-day right to cancel.';
