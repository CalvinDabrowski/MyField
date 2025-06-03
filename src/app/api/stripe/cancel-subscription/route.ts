import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { subscriptionId, cancelImmediately = false } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    let subscription;
    
    if (cancelImmediately) {
      // Cancel immediately
      subscription = await stripe.subscriptions.cancel(subscriptionId);
    } else {
      // Cancel at period end (recommended)
      subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    }

    return NextResponse.json({ 
      subscription: {
        id: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      }
    });
  } catch (error: unknown) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}