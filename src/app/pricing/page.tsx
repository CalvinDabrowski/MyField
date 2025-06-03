'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-nexfield-ivory">
      <Header />

      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <h1 className="text-2xl font-bold text-nexfield-slate">Pricing Plans</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Plans Component */}
      <SubscriptionPlans />

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-nexfield-slate mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-nexfield-slate mb-3">
                Can I switch between plans at any time?
              </h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately,
                and we'll prorate your billing accordingly.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-nexfield-slate mb-3">
                What happens if I exceed my plan limits?
              </h3>
              <p className="text-gray-600">
                We'll notify you when you're approaching your limits. For contractors, basic features remain
                available, but premium features may be temporarily restricted until you upgrade.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-nexfield-slate mb-3">
                How do background checks work?
              </h3>
              <p className="text-gray-600">
                Background checks are available as an optional add-on for clients. Each check costs $10
                and includes criminal history, employment verification, and professional certifications.
              </p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-nexfield-slate mb-3">
                Is there a free trial for premium plans?
              </h3>
              <p className="text-gray-600">
                Yes! Both Elite (contractors) and Premium (clients) plans come with a 14-day free trial.
                No credit card required to start your trial.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
