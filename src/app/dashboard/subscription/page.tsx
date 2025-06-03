'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import SubscriptionManager from '@/components/subscription/SubscriptionManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, AlertCircle, CreditCard, Zap } from 'lucide-react';
import type { SubscriptionData } from '@/lib/stripe';

function SubscriptionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState<SubscriptionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for success/cancel parameters
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  useEffect(() => {
    // Simulate fetching user subscription data
    // In a real app, this would come from your backend/database
    const fetchSubscription = async () => {
      try {
        setLoading(true);
        
        // Mock subscription data - replace with real API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate different subscription states
        const mockSubscription: SubscriptionData = {
          id: 'sub_1234567890',
          status: 'active',
          plan: 'elite',
          userType: 'contractor',
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          cancelAtPeriodEnd: false,
        };
        
        setSubscription(mockSubscription);
      } catch (error) {
        console.error('Error fetching subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscription();
  }, []);

  const handleCancelSubscription = async () => {
    // This would typically show a confirmation dialog
    if (confirm('Are you sure you want to cancel your subscription? You will retain access until the end of your billing period.')) {
      try {
        // Make API call to cancel subscription
        const response = await fetch('/api/stripe/cancel-subscription', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subscriptionId: subscription?.id,
          }),
        });

        if (response.ok) {
          // Update local state
          setSubscription(prev => prev ? {
            ...prev,
            cancelAtPeriodEnd: true,
          } : null);
        }
      } catch (error) {
        console.error('Error canceling subscription:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-nexfield-ivory to-white">
        <div className="max-w-4xl mx-auto px-4 py-20">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-64 bg-gray-200 rounded-3xl"></div>
            <div className="h-48 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-nexfield-ivory to-white">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-nexfield-slate mb-4">
            Subscription Management
          </h1>
          <p className="text-xl text-gray-600">
            Manage your MyFieldLink subscription and billing preferences
          </p>
        </div>

        {/* Success/Cancel Messages */}
        {success && (
          <Card className="mb-6 border-green-200 bg-green-50 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Payment Successful!</h3>
                  <p className="text-green-700">Your subscription has been activated. Welcome to MyFieldLink!</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {canceled && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Payment Canceled</h3>
                  <p className="text-yellow-700">Your payment was canceled. You can try again anytime.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <SubscriptionManager
          subscription={subscription}
          onCancelSubscription={handleCancelSubscription}
        />

        {/* Upgrade Options */}
        {(!subscription || subscription.plan === 'basic' || subscription.plan === 'standard') && (
          <Card className="mt-6 rounded-3xl shadow-lg border-2 border-nexfield-emerald/20 bg-gradient-to-br from-white to-nexfield-emerald/5">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-nexfield-emerald">
                <Zap className="w-5 h-5" />
                Upgrade Your Plan
              </CardTitle>
              <CardDescription>
                Unlock premium features and boost your success on MyFieldLink
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Priority access to exclusive opportunities</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Advanced analytics and insights</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span>Priority customer support</span>
                </div>
              </div>
              <Button
                onClick={() => router.push('/pricing')}
                className="rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90"
                size="lg"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                View Upgrade Options
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-nexfield-ivory to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nexfield-emerald mx-auto mb-4"></div>
          <p className="text-gray-600">Loading subscription details...</p>
        </div>
      </div>
    }>
      <SubscriptionPageContent />
    </Suspense>
  );
}