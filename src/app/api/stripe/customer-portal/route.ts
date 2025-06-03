import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { customerId, returnUrl } = await req.json();

    if (!returnUrl) {
      return NextResponse.json({ error: 'Return URL is required' }, { status: 400 });
    }

    // For now, create a test customer if none provided
    let customer = customerId;
    if (!customer) {
      // In a real app, you'd get this from the authenticated user's data
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