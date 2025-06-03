'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { getStripe } from '@/lib/stripe';
import { Loader2 } from 'lucide-react';

interface CheckoutButtonProps {
  priceId: string;
  mode?: 'subscription' | 'payment';
  successUrl?: string;
  cancelUrl?: string;
  className?: string;
  children: React.ReactNode;
  metadata?: Record<string, string>;
}

export default function CheckoutButton({
  priceId,
  mode = 'subscription',
  successUrl,
  cancelUrl,
  className,
  children,
  metadata = {},
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl: successUrl || `${window.location.origin}/pricing?success=true`,
          cancelUrl: cancelUrl || `${window.location.origin}/pricing?canceled=true`,
          metadata,
        }),
      });

      const { sessionId, error } = await response.json();

      if (error) {
        console.error('Checkout error:', error);
        return;
      }

      const stripe = await getStripe();
      if (!stripe) {
        console.warn('Stripe not available - running in demo mode');
        alert('Demo mode: Stripe payment would be processed here. Redirecting to success page.');
        window.location.href = successUrl || `${window.location.origin}/pricing?demo=true`;
        return;
      }

      const { error: redirectError } = await stripe.redirectToCheckout({
        sessionId,
      });

      if (redirectError) {
        console.error('Redirect error:', redirectError);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
      size="lg"
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      ) : (
        children
      )}
    </Button>
  );
}
