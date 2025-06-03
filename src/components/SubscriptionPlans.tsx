'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check, Star, Shield, Zap, Users, BarChart3, Clock, MessageCircle, Search, Award } from 'lucide-react';
import CheckoutButton from '@/components/stripe/CheckoutButton';
import { SUBSCRIPTION_PLANS, formatPrice } from '@/lib/stripe';

interface PlanFeature {
  icon: React.ReactNode;
  text: string;
  premium?: boolean;
}

const contractorBasicFeatures: PlanFeature[] = [
  { icon: <Search className="w-4 h-4" />, text: "Apply to unlimited jobs" },
  { icon: <Users className="w-4 h-4" />, text: "Listed in search" },
  { icon: <Star className="w-4 h-4" />, text: "Receive ratings" },
  { icon: <MessageCircle className="w-4 h-4" />, text: "In-app messaging with clients" },
  { icon: <Award className="w-4 h-4" />, text: "Upload certs (limited)" },
  { icon: <BarChart3 className="w-4 h-4" />, text: "View job stats (basic)" },
];

const contractorEliteFeatures: PlanFeature[] = [
  { icon: <Zap className="w-4 h-4" />, text: "Apply + early access to exclusive listings", premium: true },
  { icon: <Star className="w-4 h-4" />, text: "Top search result + verified badge + priority in local searches", premium: true },
  { icon: <Shield className="w-4 h-4" />, text: "Highlighted reviews + endorsement display + ability to respond to ratings", premium: true },
  { icon: <MessageCircle className="w-4 h-4" />, text: "Priority + instant connect with clients", premium: true },
  { icon: <Award className="w-4 h-4" />, text: "Priority badge for certified professionals", premium: true },
  { icon: <BarChart3 className="w-4 h-4" />, text: "Full analytics + competitor benchmarking", premium: true },
  { icon: <Clock className="w-4 h-4" />, text: "Job stat trends, views, profile clicks", premium: true },
];

const clientStandardFeatures: PlanFeature[] = [
  { icon: <Search className="w-4 h-4" />, text: "Unlimited job postings" },
  { icon: <Users className="w-4 h-4" />, text: "Manual candidate search" },
  { icon: <MessageCircle className="w-4 h-4" />, text: "In-app messaging" },
  { icon: <Shield className="w-4 h-4" />, text: "View basic contractor profile (no name or contact info)" },
  { icon: <Clock className="w-4 h-4" />, text: "No booking calendar" },
  { icon: <MessageCircle className="w-4 h-4" />, text: "Community + email support" },
];

const clientPremiumFeatures: PlanFeature[] = [
  { icon: <Search className="w-4 h-4" />, text: "Unlimited job postings" },
  { icon: <Zap className="w-4 h-4" />, text: "AI-powered candidate matching", premium: true },
  { icon: <Star className="w-4 h-4" />, text: "Priority contact queue", premium: true },
  { icon: <Shield className="w-4 h-4" />, text: "Access to certifications, endorsements, name & contact info", premium: true },
  { icon: <Clock className="w-4 h-4" />, text: "Smart scheduling + auto-reminders", premium: true },
  { icon: <Users className="w-4 h-4" />, text: "Dedicated account manager", premium: true },
];

export default function SubscriptionPlans() {
  const [selectedTab, setSelectedTab] = useState("contractors");

  return (
    <section className="py-20 bg-gradient-to-br from-nexfield-ivory to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-nexfield-slate mb-4">
            Choose Your MyFieldLink Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you're a contractor looking for work or a client seeking talent,
            we have the perfect plan to accelerate your success.
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-white rounded-2xl border shadow-sm">
            <TabsTrigger value="contractors" className="rounded-xl data-[state=active]:bg-nexfield-emerald data-[state=active]:text-white">
              For Contractors
            </TabsTrigger>
            <TabsTrigger value="clients" className="rounded-xl data-[state=active]:bg-nexfield-emerald data-[state=active]:text-white">
              For Clients
            </TabsTrigger>
          </TabsList>

          <TabsContent value="contractors">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Basic Plan */}
              <Card className="relative rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2">
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-nexfield-slate">Basic</CardTitle>
                  <CardDescription className="text-lg text-gray-600">Perfect for getting started</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-nexfield-emerald">Free</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="space-y-4">
                    {contractorBasicFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-nexfield-emerald/10 flex items-center justify-center mt-0.5">
                          {feature.icon}
                        </div>
                        <span className="text-gray-700 flex-1">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-8 rounded-2xl bg-gray-100 text-gray-900 hover:bg-gray-200" size="lg">
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>

              {/* Elite Plan */}
              <Card className="relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-nexfield-emerald bg-gradient-to-br from-white to-nexfield-emerald/5">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-nexfield-emerald text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="text-center pb-8 pt-12">
                  <CardTitle className="text-2xl font-bold text-nexfield-slate">Elite</CardTitle>
                  <CardDescription className="text-lg text-gray-600">For serious professionals</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-nexfield-emerald">$29</span>
                    <span className="text-xl text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="space-y-4">
                    {contractorEliteFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.premium ? 'bg-nexfield-emerald text-white' : 'bg-nexfield-emerald/10'
                        }`}>
                          {feature.premium ? <Check className="w-3 h-3" /> : feature.icon}
                        </div>
                        <span className="text-gray-700 flex-1">{feature.text}</span>
                        {feature.premium && (
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  {SUBSCRIPTION_PLANS.contractor.elite.priceId ? (
                    <CheckoutButton
                      priceId={SUBSCRIPTION_PLANS.contractor.elite.priceId}
                      mode="payment"
                      className="w-full mt-8 rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90"
                      metadata={{ plan: 'elite', userType: 'contractor' }}
                    >
                      Start Elite Trial - {formatPrice(SUBSCRIPTION_PLANS.contractor.elite.price)}/month
                    </CheckoutButton>
                  ) : (
                    <Button className="w-full mt-8 rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90" size="lg">
                      Start Elite Trial
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Standard Plan */}
              <Card className="relative rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 border-2">
                <CardHeader className="text-center pb-8 pt-8">
                  <CardTitle className="text-2xl font-bold text-nexfield-slate">Standard</CardTitle>
                  <CardDescription className="text-lg text-gray-600">Essential hiring tools</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-nexfield-emerald">Free</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="space-y-4">
                    {clientStandardFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-nexfield-emerald/10 flex items-center justify-center mt-0.5">
                          {feature.icon}
                        </div>
                        <span className="text-gray-700 flex-1">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full mt-8 rounded-2xl bg-gray-100 text-gray-900 hover:bg-gray-200" size="lg">
                    Get Started Free
                  </Button>
                </CardContent>
              </Card>

              {/* Premium Plan */}
              <Card className="relative rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-nexfield-emerald bg-gradient-to-br from-white to-nexfield-emerald/5">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-nexfield-emerald text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Recommended
                  </Badge>
                </div>
                <CardHeader className="text-center pb-8 pt-12">
                  <CardTitle className="text-2xl font-bold text-nexfield-slate">Premium</CardTitle>
                  <CardDescription className="text-lg text-gray-600">Advanced hiring platform</CardDescription>
                  <div className="mt-4">
                    <span className="text-5xl font-bold text-nexfield-emerald">$199</span>
                    <span className="text-xl text-gray-600">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-8">
                  <div className="space-y-4">
                    {clientPremiumFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5 ${
                          feature.premium ? 'bg-nexfield-emerald text-white' : 'bg-nexfield-emerald/10'
                        }`}>
                          {feature.premium ? <Check className="w-3 h-3" /> : feature.icon}
                        </div>
                        <span className="text-gray-700 flex-1">{feature.text}</span>
                        {feature.premium && (
                          <Badge variant="secondary" className="text-xs">Premium</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                  {SUBSCRIPTION_PLANS.client.premium.priceId ? (
                    <CheckoutButton
                      priceId={SUBSCRIPTION_PLANS.client.premium.priceId}
                      mode="payment"
                      className="w-full mt-8 rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90"
                      metadata={{ plan: 'premium', userType: 'client' }}
                    >
                      Start Premium Trial - {formatPrice(SUBSCRIPTION_PLANS.client.premium.price)}/month
                    </CheckoutButton>
                  ) : (
                    <Button className="w-full mt-8 rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90" size="lg">
                      Start Premium Trial
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Add-on Section */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto rounded-3xl shadow-lg border-2 border-dashed border-gray-300 bg-gray-50/50">
            <CardContent className="p-8">
              <div className="flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-nexfield-emerald mr-3" />
                <h3 className="text-2xl font-bold text-nexfield-slate">Optional Add-On</h3>
              </div>
              <p className="text-lg text-gray-600 mb-4">
                Background Checks: $10 per contractor (client-initiated)
              </p>
              <p className="text-sm text-gray-500">
                Get comprehensive background verification for enhanced security and peace of mind.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
