import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecret || !webhookSecret) {
  console.warn("⚠️ Missing STRIPE_SECRET_KEY or STRIPE_WEBHOOK_SECRET. Stripe webhook disabled.");
}

const stripe = stripeSecret
  ? new Stripe(stripeSecret, {
      apiVersion: '2025-05-28.basil',
    })
  : null;

export async function POST(req: NextRequest) {
  if (!stripe || !webhookSecret) {
    return NextResponse.json({ error: 'Stripe webhook not configured' }, { status: 500 });
  }

  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    console.error('Webhook signature verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;
        console.log('Checkout session completed:', session.id);

        if (session.mode === 'subscription' && session.subscription) {
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          console.log('Subscription created:', subscription.id);
          await updateUserSubscription(session.customer, subscription);
        }
        break;

      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        const subCreatedOrUpdated = event.data.object as Stripe.Subscription;
        console.log(`Subscription ${event.type}:`, subCreatedOrUpdated.id);
        await updateUserSubscription(subCreatedOrUpdated.customer, subCreatedOrUpdated);
        break;

      case 'customer.subscription.deleted':
        const subDeleted = event.data.object as Stripe.Subscription;
        console.log('Subscription cancelled:', subDeleted.id);
        await cancelUserSubscription(subDeleted.customer, subDeleted);
        break;

      case 'invoice.payment_succeeded':
        const invoicePaid = event.data.object as Stripe.Invoice;
        console.log('Payment succeeded for invoice:', invoicePaid.id);
        break;

      case 'invoice.payment_failed':
        const invoiceFailed = event.data.object as Stripe.Invoice;
        console.log('Payment failed for invoice:', invoiceFailed.id);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}

// Placeholder helper functions
async function updateUserSubscription(customerId: string | Stripe.Customer | null, subscription: Stripe.Subscription) {
  console.log('Update user subscription:', customerId, subscription.id);
}

async function cancelUserSubscription(customerId: string | Stripe.Customer | null, subscription: Stripe.Subscription) {
  console.log('Cancel user subscription:', customerId, subscription.id);
}
