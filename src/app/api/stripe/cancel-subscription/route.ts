import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  console.warn("⚠️ STRIPE_SECRET_KEY is missing. Stripe cancel-subscription endpoint is disabled.");
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
    const { subscriptionId, cancelImmediately = false } = await req.json();

    if (!subscriptionId) {
      return NextResponse.json({ error: 'Subscription ID is required' }, { status: 400 });
    }

    let subscription;

    if (cancelImmediately) {
      subscription = await stripe.subscriptions.cancel(subscriptionId);
    } else {
      subscription = await stripe.subscriptions.update(subscriptionId, {
        cancel_at_period_end: true,
      });
    }

    return NextResponse.json({
      subscription: {
        id: subscription.id,
        status: subscription.status,
        cancelAtPeriodEnd: subscription.cancel_at_period_end,
      },
    });
  } catch (error: unknown) {
    console.error('Cancel subscription error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}