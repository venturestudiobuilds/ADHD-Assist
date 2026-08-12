import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';

// POST /api/stripe/webhook — Stripe event receiver.
// Configure the endpoint in the Stripe Dashboard pointing at
//   https://<your-domain>/api/stripe/webhook
// subscribed to: checkout.session.completed
export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  const signature = req.headers.get('stripe-signature');
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  const payload = await req.text();

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(payload, signature, secret);
  } catch (e) {
    console.error('Webhook signature verification failed:', e);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object;
      const slug = session.metadata?.slug;
      const email = session.customer_details?.email;
      // Fulfillment hook: the success page already serves the download for a
      // paid session, so nothing is strictly required here. This is the place
      // to add email delivery (e.g. Resend/Postmark) or order logging.
      console.log(`✅ Order completed: pack=${slug} email=${email} session=${session.id}`);
      break;
    }
    default:
      // Ignore other events.
      break;
  }

  return NextResponse.json({ received: true });
}
