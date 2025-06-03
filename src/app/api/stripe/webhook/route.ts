import { type NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error: unknown) {
    console.error('Webhook signature verification failed:', error instanceof Error ? error.message : 'Unknown error');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  try {
    // Handle different webhook events
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('Checkout session completed:', session.id);
      
      // Handle successful payment/subscription creation
      if (session.mode === 'subscription' && session.subscription) {
        const subscription = await stripe.subscriptions.retrieve(
          session.subscription as string
        );
        console.log('Subscription created:', subscription.id);
        
        // TODO: Update user subscription status in database
        // await updateUserSubscription(session.customer, subscription);
      }
    } else if (event.type === 'customer.subscription.created') {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription created:', subscription.id);
      
      // TODO: Update user subscription status in database
      // await updateUserSubscription(subscription.customer, subscription);
    } else if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription updated:', subscription.id);
      
      // TODO: Update user subscription status in database
      // await updateUserSubscription(subscription.customer, subscription);
    } else if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      console.log('Subscription cancelled:', subscription.id);
      
      // TODO: Update user subscription status in database
      // await cancelUserSubscription(subscription.customer, subscription);
    } else if (event.type === 'invoice.payment_succeeded') {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment succeeded for invoice:', invoice.id);
      
      // TODO: Handle invoice payment success
      // const subscriptionId = (invoice as any).subscription;
      // if (subscriptionId && typeof subscriptionId === 'string') {
      //   const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      //   console.log('Subscription payment succeeded:', subscription.id);
      //   await updateUserSubscription(subscription.customer, subscription);
      // }
    } else if (event.type === 'invoice.payment_failed') {
      const invoice = event.data.object as Stripe.Invoice;
      console.log('Payment failed for invoice:', invoice.id);
      
      // TODO: Handle invoice payment failure
      // const subscriptionId = (invoice as any).subscription;
      // if (subscriptionId && typeof subscriptionId === 'string') {
      //   const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      //   console.log('Subscription payment failed:', subscription.id);
      //   await handleFailedPayment(subscription.customer, subscription);
      // }
    } else {
      console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

// Helper functions that would integrate with your user database
async function updateUserSubscription(customerId: string | Stripe.Customer | null, subscription: Stripe.Subscription) {
  // TODO: Implement database update logic
  console.log('Update user subscription:', customerId, subscription.id);
}

async function cancelUserSubscription(customerId: string | Stripe.Customer | null, subscription: Stripe.Subscription) {
  // TODO: Implement database update logic
  console.log('Cancel user subscription:', customerId, subscription.id);
}

async function handleFailedPayment(customerId: string | Stripe.Customer | null, subscription: Stripe.Subscription) {
  // TODO: Implement failed payment handling (e.g., send email, downgrade plan)
  console.log('Handle failed payment:', customerId, subscription.id);
}