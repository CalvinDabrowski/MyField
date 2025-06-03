// Instructions: Create Stripe checkout API endpoint

import { type NextRequest, NextResponse } from 'next/server';
import { createCheckoutSession } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, userEmail, plan, userType, mode } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Missing price ID' }, { status: 400 });
    }

    // Use demo data if user is not authenticated
    const demoUserId = userId || 'demo_user_' + Math.random().toString(36).substr(2, 9);
    const demoEmail = userEmail || 'demo@myfieldlink.com';

    const origin = request.headers.get('origin') || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const successUrl = `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}&plan=${plan}&userType=${userType}`;
    const cancelUrl = `${origin}/pricing?canceled=true`;

    const { sessionId, url } = await createCheckoutSession({
      priceId,
      userId: demoUserId,
      userEmail: demoEmail,
      successUrl,
      cancelUrl,
      mode: mode || 'subscription',
    });

    return NextResponse.json({ sessionId, url });
  } catch (error) {
    console.error('Checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
