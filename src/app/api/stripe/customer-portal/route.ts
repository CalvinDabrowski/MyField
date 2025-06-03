import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  console.warn("⚠️ STRIPE_SECRET_KEY is missing. Stripe customer portal endpoint is disabled.");
}

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2025-05-28.basil',
    })
  : null;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe is not configured' }, { status: 500 });
  }

  try {
    const { customerId, returnUrl } = await req.json();

    if (!returnUrl) {
      return NextResponse.json({ error: 'Return URL is required' }, { status: 400 });
    }

    let customer = customerId;
    if (!customer) {
      const testCustomer = await stripe.customers.create({
        email: 'test@example.com',
        name: 'Test User',
      });
      customer = testCustomer.id;
    }

    const session = await stripe.billingPortal.sessions.create({
      customer,
      return_url: returnUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (error: unknown) {
    console.error('Customer portal error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}