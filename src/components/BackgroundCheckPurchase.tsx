'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Shield, Check, User, FileText, Clock } from 'lucide-react';
import CheckoutButton from '@/components/stripe/CheckoutButton';
import { BACKGROUND_CHECK } from '@/lib/stripe';

interface BackgroundCheckPurchaseProps {
  contractorId: string;
  contractorName: string;
  onPurchaseComplete?: (checkId: string) => void;
}

export default function BackgroundCheckPurchase({
  contractorId,
  contractorName,
  onPurchaseComplete,
}: BackgroundCheckPurchaseProps) {
  const [purchased, setPurchased] = useState(false);

  const backgroundCheckFeatures = [
    { icon: <FileText className="w-4 h-4" />, text: "Criminal history verification" },
    { icon: <Shield className="w-4 h-4" />, text: "Sex offender registry check" },
    { icon: <User className="w-4 h-4" />, text: "Identity verification" },
    { icon: <FileText className="w-4 h-4" />, text: "Professional license validation" },
    { icon: <Clock className="w-4 h-4" />, text: "7-year employment history" },
  ];

  if (purchased) {
    return (
      <Card className="rounded-3xl shadow-lg border-2 border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-full">
              <Check className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-green-800">Background Check Purchased</h3>
              <p className="text-green-700 text-sm">
                Background check for {contractorName} is being processed
              </p>
            </div>
          </div>
          <div className="text-sm text-green-600">
            <p>• Results typically available within 24-48 hours</p>
            <p>• You'll receive an email notification when complete</p>
            <p>• Check can be viewed in your hiring dashboard</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl shadow-lg border-2 border-dashed border-gray-300">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="p-3 bg-nexfield-emerald/10 rounded-full">
            <Shield className="w-8 h-8 text-nexfield-emerald" />
          </div>
        </div>
        <CardTitle className="text-xl font-bold text-nexfield-slate">
          Enhanced Background Check
        </CardTitle>
        <CardDescription className="text-base">
          Comprehensive verification for {contractorName}
        </CardDescription>
        <div className="mt-4">
          <Badge className="bg-nexfield-emerald text-white px-4 py-2 text-lg font-semibold">
            $10.00 per check
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 mb-6">
          {backgroundCheckFeatures.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 rounded-full bg-nexfield-emerald/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <span className="text-gray-700 text-sm">{feature.text}</span>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">Processing Time</span>
          </div>
          <p className="text-sm text-gray-600">
            Results typically delivered within 24-48 hours via email and dashboard notification.
          </p>
        </div>

        <CheckoutButton
          priceId={BACKGROUND_CHECK.priceId || 'demo_price_id'}
          mode="payment"
          className="w-full rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90"
          metadata={{
            type: 'background_check',
            contractorId,
            contractorName,
          }}
          successUrl={`${window.location.origin}/dashboard/hiring?background_check=success&contractor=${contractorId}`}
          cancelUrl={`${window.location.origin}/dashboard/hiring?background_check=canceled`}
        >
          <Shield className="w-4 h-4 mr-2" />
          Purchase Background Check - ${BACKGROUND_CHECK.price}.00
        </CheckoutButton>

        <p className="text-xs text-gray-500 text-center mt-3">
          Secure payment processed by Stripe. Background check conducted by certified third-party service.
        </p>
      </CardContent>
    </Card>
  );
}
