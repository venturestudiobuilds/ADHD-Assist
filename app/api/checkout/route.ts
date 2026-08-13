import { NextRequest, NextResponse } from 'next/server';
import { getStripe, siteUrl } from '@/lib/stripe';
import { getProduct, CURRENCY } from '@/lib/products';
import { CHECKOUT_CONSENT_TEXT } from '@/lib/legal';

// POST /api/checkout { slug } → { url }
// Creates a Stripe Checkout Session for a paid pack using inline price_data,
// so no products need to be pre-configured in the Stripe Dashboard.
export async function POST(req: NextRequest) {
  let slug: unknown;
  try {
    ({ slug } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const product = typeof slug === 'string' ? getProduct(slug) : undefined;
  if (!product) {
    return NextResponse.json({ error: 'Unknown product' }, { status: 404 });
  }
  if (product.price === 0) {
    return NextResponse.json({ error: 'This pack is free — no checkout needed' }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const origin = siteUrl(req.nextUrl.origin);

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: CURRENCY,
            unit_amount: product.price,
            product_data: {
              name: product.title,
              description: product.desc,
            },
          },
        },
      ],
      metadata: { slug: product.slug },
      success_url: `${origin}/support/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/support#downloads`,
      // Collect email so the webhook can email the download link later.
      customer_creation: 'if_required',
      // Express consent to immediate digital delivery + 14-day waiver
      // (Consumer Contracts Regulations 2013). Shown next to the pay button.
      custom_text: {
        submit: { message: CHECKOUT_CONSENT_TEXT },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error('Checkout session creation failed:', e);
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again shortly.' },
      { status: 500 }
    );
  }
}
