# ADHD Assist

Calm, practical ADHD support. A two-page site: an interactive maze landing
("WHICH WAY NOW?") and a support hub with guidance, a situation picker, a
4-stage support map, and downloadable prep packs sold through Stripe.

Built with **Next.js (App Router) + TypeScript**, deployed on **Vercel**.

## Local development

```bash
npm install
cp .env.example .env.local   # fill in your Stripe keys
npm run dev
```

The site runs without Stripe keys - everything works except paid checkout.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `STRIPE_SECRET_KEY` | for payments | Server-side Stripe API key (`sk_test_...` / `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | for webhook | Signing secret for `/api/stripe/webhook` |
| `NEXT_PUBLIC_SITE_URL` | optional | Canonical origin for checkout redirect URLs (falls back to the request origin) |

## Payments / packs

- The product catalogue lives in [`lib/products.ts`](lib/products.ts) - titles, copy, **prices (GBP pence)** and pack file names. Prices are placeholders; edit them there.
- Checkout uses **Stripe Checkout** with inline `price_data`, so nothing needs to be pre-configured in the Stripe Dashboard.
- Flow: pack card → `POST /api/checkout` → Stripe-hosted checkout → `/support/success?session_id=...` → the success page verifies the session is **paid** and serves the pack via `/api/download` (which re-verifies against Stripe).
- The free Mini Starter Pack downloads directly with no checkout.
- `/api/stripe/webhook` receives `checkout.session.completed` - the place to add email delivery / order logging. Configure the endpoint in the Stripe Dashboard and set `STRIPE_WEBHOOK_SECRET`.

### Replacing the placeholder packs

The files in `content/packs/*.zip` are placeholders. Replace each zip with the
real pack contents (keep the same filenames, or update `file` in
`lib/products.ts`).

## Content editing

All prose and structured content is isolated from layout:

- [`lib/content.ts`](lib/content.ts) - landing copy, support-hub copy (`COPY`), situations, journey stages, worries, nudge messages. **The disclaimer is medical-safety copy - keep it verbatim.**
- [`lib/products.ts`](lib/products.ts) - the packs grid + pricing.

## Deploying to Vercel

1. Import the GitHub repo in Vercel (framework auto-detected as Next.js).
2. Add `STRIPE_SECRET_KEY` (and `STRIPE_WEBHOOK_SECRET` once the webhook endpoint is created) in Project → Settings → Environment Variables.
3. After the first deploy, create the Stripe webhook endpoint pointing at `https://<domain>/api/stripe/webhook` (event: `checkout.session.completed`) and set its signing secret.

## Design reference

The original design handoff (prototype JSX/CSS + full spec) is preserved in
[`design_handoff_adhd_assist/`](design_handoff_adhd_assist/README.md).
