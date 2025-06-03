'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { AlertCircle, Calendar, CreditCard, Settings, X, CheckCircle } from 'lucide-react';
import { formatPrice, type SubscriptionData } from '@/lib/stripe';

interface SubscriptionManagerProps {
  subscription?: SubscriptionData | null;
  onManageSubscription?: () => void;
  onCancelSubscription?: () => void;
}

export default function SubscriptionManager({
  subscription,
  onManageSubscription,
  onCancelSubscription,
}: SubscriptionManagerProps) {
  const [loading, setLoading] = useState(false);

  const handleManageBilling = async () => {
    try {
      setLoading(true);
      
      const response = await fetch('/api/stripe/customer-portal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          returnUrl: window.location.href,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error accessing customer portal:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800';
      case 'canceled':
        return 'bg-red-100 text-red-800';
      case 'incomplete':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'past_due':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'canceled':
        return <X className="w-4 h-4 text-red-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  if (!subscription) {
    return (
      <Card className="rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Subscription Management
          </CardTitle>
          <CardDescription>
            You don't have an active subscription
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 mb-4">
            Upgrade to a premium plan to unlock advanced features and get the most out of MyFieldLink.
          </p>
          <Button 
            onClick={() => window.location.href = '/pricing'}
            className="rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90"
          >
            View Plans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Current Subscription */}
      <Card className="rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Current Subscription
            </div>
            <Badge className={getStatusColor(subscription.status)}>
              <div className="flex items-center gap-1">
                {getStatusIcon(subscription.status)}
                {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
              </div>
            </Badge>
          </CardTitle>
          <CardDescription>
            Manage your subscription and billing information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-nexfield-slate mb-2">Plan Details</h4>
              <p className="text-sm text-gray-600">
                <strong>Plan:</strong> {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Type:</strong> {subscription.userType.charAt(0).toUpperCase() + subscription.userType.slice(1)}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-nexfield-slate mb-2">Billing Information</h4>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>
                  Next billing: {subscription.currentPeriodEnd.toLocaleDateString()}
                </span>
              </div>
              {subscription.cancelAtPeriodEnd && (
                <div className="flex items-center gap-2 text-sm text-red-600 mt-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>Will cancel on {subscription.currentPeriodEnd.toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleManageBilling}
              disabled={loading}
              className="flex items-center gap-2 rounded-2xl"
              variant="outline"
            >
              <CreditCard className="w-4 h-4" />
              {loading ? 'Loading...' : 'Manage Billing'}
            </Button>
            
            {subscription.status === 'active' && !subscription.cancelAtPeriodEnd && (
              <Button
                onClick={onCancelSubscription}
                variant="outline"
                className="flex items-center gap-2 rounded-2xl text-red-600 border-red-200 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
                Cancel Subscription
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Billing History */}
      <Card className="rounded-3xl shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Recent Billing History
          </CardTitle>
          <CardDescription>
            View your recent payments and invoices
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {/* Mock billing history - replace with real data */}
            <div className="flex items-center justify-between p-3 border rounded-xl">
              <div>
                <p className="font-medium text-sm">
                  {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                </p>
                <p className="text-xs text-gray-500">
                  {new Date().toLocaleDateString()} • Paid
                </p>
              </div>
              <div className="text-right">
                <p className="font-medium text-sm">
                  {subscription.plan === 'elite' ? '$29.00' : '$199.00'}
                </p>
                <Badge variant="outline" className="text-xs">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Paid
                </Badge>
              </div>
            </div>
            
            <div className="text-center py-4">
              <Button
                onClick={handleManageBilling}
                variant="outline"
                className="rounded-2xl"
                size="sm"
              >
                View All Invoices
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}