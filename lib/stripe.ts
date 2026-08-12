import Stripe from 'stripe';

// Lazily construct the client so builds succeed without env vars present.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not set. Add it to .env.local (see .env.example).');
  }
  if (!client) client = new Stripe(key);
  return client;
}

/** Canonical site origin for redirect URLs. */
export function siteUrl(requestOrigin?: string): string {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    requestOrigin ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  );
}
