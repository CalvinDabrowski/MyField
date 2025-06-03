import Stripe from 'stripe';
import { loadStripe, type Stripe as StripeJS } from '@stripe/stripe-js';

// Initialize Stripe (conditional for demo mode)
export const stripe: Stripe | null = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-05-28.basil',
    })
  : null;

// Load Stripe.js for client-side
let stripePromise: Promise<StripeJS | null> | null = null;

export const getStripe = () => {
  if (!stripePromise) {
    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!publishableKey) {
      console.warn('Stripe publishable key not found. Using demo mode.');
      return null;
    }

    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

// Subscription Plans Configuration
export const SUBSCRIPTION_PLANS = {
  contractor: {
    basic: {
      name: 'Basic',
      price: 0,
      priceId: null, // Free plan
      features: [
        'Apply to unlimited jobs',
        'Listed in search',
        'Receive ratings',
        'In-app messaging with clients',
        'Upload certs (limited)',
        'View job stats (basic)',
      ],
    },
    elite: {
      name: 'Elite',
      price: 29,
      priceId: process.env.STRIPE_CONTRACTOR_ELITE_PRICE_ID,
      features: [
        'Apply + early access to exclusive listings',
        'Top search result + verified badge + priority in local searches',
        'Highlighted reviews + endorsement display + ability to respond to ratings',
        'Priority + instant connect with clients',
        'Priority badge for certified professionals',
        'Full analytics + competitor benchmarking',
        'Job stat trends, views, profile clicks',
      ],
    },
  },
  client: {
    standard: {
      name: 'Standard',
      price: 0,
      priceId: null, // Free plan
      features: [
        'Unlimited job postings',
        'Manual candidate search',
        'In-app messaging',
        'View basic contractor profile (no name or contact info)',
        'No booking calendar',
        'Community + email support',
      ],
    },
    premium: {
      name: 'Premium',
      price: 199,
      priceId: process.env.STRIPE_CLIENT_PREMIUM_PRICE_ID,
      features: [
        'Unlimited job postings',
        'AI-powered candidate matching',
        'Priority contact queue',
        'Access to certifications, endorsements, name & contact info',
        'Smart scheduling + auto-reminders',
        'Dedicated account manager',
      ],
    },
  },
};

// Background check pricing
export const BACKGROUND_CHECK = {
  name: 'Background Check',
  price: 10,
  priceId: process.env.STRIPE_BACKGROUND_CHECK_PRICE_ID,
};

// Create checkout session for subscriptions
export async function createCheckoutSession({
  priceId,
  userId,
  userEmail,
  successUrl,
  cancelUrl,
  mode = 'subscription',
}: {
  priceId: string;
  userId: string;
  userEmail: string;
  successUrl: string;
  cancelUrl: string;
  mode?: 'subscription' | 'payment';
}) {
  if (!stripe) {
    throw new Error('Stripe not configured - running in demo mode');
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: userEmail,
      metadata: {
        userId,
      },
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      ...(mode === 'subscription' && {
        subscription_data: {
          metadata: {
            userId,
          },
        },
      }),
    });

    return { sessionId: session.id, url: session.url };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
}

// Create customer portal session
export async function createCustomerPortalSession({
  customerId,
  returnUrl,
}: {
  customerId: string;
  returnUrl: string;
}) {
  if (!stripe) {
    throw new Error('Stripe not configured - running in demo mode. Customer portal is not available.');
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating customer portal session:', error);
    throw error;
  }
}

// Get subscription by customer ID
export async function getSubscription(customerId: string) {
  if (!stripe) {
    throw new Error('Stripe not configured - running in demo mode. Cannot fetch subscription data.');
  }

  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: 'active',
      limit: 1,
    });

    return subscriptions.data[0] || null;
  } catch (error) {
    console.error('Error fetching subscription:', error);
    return null;
  }
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  if (!stripe) {
    throw new Error('Stripe not configured - running in demo mode. Cannot cancel subscription.');
  }

  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId);
    return subscription;
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
}

// Webhook signature verification
export function verifyWebhookSignature(payload: string, signature: string) {
  if (!stripe) {
    throw new Error('Stripe not configured - running in demo mode. Webhook verification is not available.');
  }

  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  try {
    return stripe.webhooks.constructEvent(payload, signature, endpointSecret);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    throw error;
  }
}

// Helper function to format currency
export const formatPrice = (price: number, currency = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price);
};

// Subscription plan types
export type SubscriptionPlan = 'basic' | 'elite' | 'standard' | 'premium';
export type UserType = 'contractor' | 'client';

export interface SubscriptionData {
  id: string;
  status: string;
  plan: SubscriptionPlan;
  userType: UserType;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}
