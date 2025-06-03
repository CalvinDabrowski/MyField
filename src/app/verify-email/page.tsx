'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

export default function VerifyEmailPage() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [isVerified, setIsVerified] = useState(false);

  const skipVerificationDemo = () => {
    // For demo purposes - create a verified user account
    const userData = {
      id: Math.random().toString(36).substr(2, 9),
      email: 'demo@nexfield.com',
      name: 'Demo User',
      role: 'contractor' as const,
      verified: true
    };

    login(userData);
    showToast({
      type: 'success',
      title: 'Email Verified!',
      message: 'Demo mode: Email verification skipped! Redirecting to dashboard...',
      duration: 3000
    });
    setTimeout(() => {
      window.location.href = '/dashboard/contractor';
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Card>
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-nexfield-sky rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <CardTitle>Check Your Email</CardTitle>
              <CardDescription>
                We've sent a verification link to your email address
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2">What to do next:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>1. Check your email inbox</li>
                    <li>2. Look for an email from NexField</li>
                    <li>3. Click the verification link</li>
                    <li>4. Return here to complete setup</li>
                  </ul>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Can't find the email?</strong> Check your spam or junk folder.
                    The email may take a few minutes to arrive.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Demo Bypass Button */}
                <Button
                  onClick={skipVerificationDemo}
                  className="w-full bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Demo Mode - Skip Verification
                </Button>

                <Link href="/signin" className="block">
                  <Button variant="outline" className="w-full">
                    Already verified? Sign In
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
