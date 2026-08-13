import { NextRequest, NextResponse } from 'next/server';

// POST /api/subscribe { email, product }
// Email-capture endpoint for the free pack. Currently just validates and
// logs - wire this to an email provider (Resend / Mailchimp / ConvertKit)
// to actually deliver the pack and build the list.
export async function POST(req: NextRequest) {
  let body: { email?: unknown; product?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const product = typeof body.product === 'string' ? body.product : '';

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address' }, { status: 400 });
  }

  // TODO: send to an email provider / store the subscriber.
  console.log(`📬 Free pack signup: ${email} (product=${product})`);

  return NextResponse.json({ ok: true });
}
