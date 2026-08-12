import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getStripe } from '@/lib/stripe';
import { getProduct } from '@/lib/products';

// GET /api/download?slug=<slug>[&session_id=<cs_...>]
// Serves a pack file from content/packs/.
//  - Free packs: served directly.
//  - Paid packs: require a session_id for a PAID Stripe Checkout Session whose
//    metadata.slug matches the requested pack.
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get('slug') ?? '';
  const sessionId = req.nextUrl.searchParams.get('session_id');

  const product = getProduct(slug);
  if (!product) {
    return NextResponse.json({ error: 'Unknown product' }, { status: 404 });
  }

  if (product.price > 0) {
    if (!sessionId) {
      return NextResponse.json({ error: 'Purchase required' }, { status: 402 });
    }
    try {
      const session = await getStripe().checkout.sessions.retrieve(sessionId);
      const paid = session.payment_status === 'paid';
      const matches = session.metadata?.slug === product.slug;
      if (!paid || !matches) {
        return NextResponse.json({ error: 'Purchase could not be verified' }, { status: 403 });
      }
    } catch {
      return NextResponse.json({ error: 'Purchase could not be verified' }, { status: 403 });
    }
  }

  const filePath = path.join(process.cwd(), 'content', 'packs', product.file);
  try {
    const data = await fs.readFile(filePath);
    return new NextResponse(new Uint8Array(data), {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': `attachment; filename="${product.file}"`,
        'Content-Length': String(data.length),
        'Cache-Control': 'no-store',
      },
    });
  } catch {
    return NextResponse.json(
      {
        error:
          'This pack file has not been uploaded yet. Add it at content/packs/' + product.file,
      },
      { status: 404 }
    );
  }
}
