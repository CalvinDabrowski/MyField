'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

export default function SignInPage() {
  const { login, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard/contractor';
    }
  }, [isAuthenticated]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.password) {
      showToast({
        type: 'warning',
        title: 'Missing Information',
        message: 'Please fill in all required fields.',
        duration: 4000
      });
      return;
    }

    if (!formData.email.includes('@')) {
      showToast({
        type: 'warning',
        title: 'Invalid Email',
        message: 'Please enter a valid email address.',
        duration: 4000
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate sign-in process with delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      console.log('Sign in attempt:', formData);

      // Simulate checking if email is verified
      const isEmailVerified = Math.random() > 0.3; // 70% chance of being verified

      if (!isEmailVerified) {
        showToast({
          type: 'warning',
          title: 'Email Verification Required',
          message: 'Please verify your email before signing in. Redirecting to verification page...',
          duration: 4000
        });
        setTimeout(() => {
          window.location.href = `/verify-email?email=${encodeURIComponent(formData.email)}`;
        }, 2000);
        return;
      }

      // Create user object and log them in
      const userData = {
        id: Math.random().toString(36).substr(2, 9),
        email: formData.email,
        name: formData.email.split('@')[0], // Use email prefix as name for demo
        role: 'contractor' as const, // Default to contractor for demo
        verified: true
      };

      // Use the auth context to log in
      login(userData);

      // Show success message
      showToast({
        type: 'success',
        title: 'Sign In Successful!',
        message: 'Welcome back to MyFieldLink. Redirecting to your dashboard...',
        duration: 3000
      });

      // Reset form
      setFormData({
        email: '',
        password: ''
      });

      // Redirect to appropriate dashboard after brief delay
      setTimeout(() => {
        window.location.href = '/dashboard/contractor';
      }, 1500);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Sign In Failed',
        message: 'Please check your credentials and try again.',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-nexfield-slate mb-2">
              Welcome Back
            </h1>
            <p className="text-nexfield-slate/70">
              Sign in to your NexField account
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>Enter your credentials to access your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                    placeholder="Enter your password"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-nexfield-emerald focus:ring-nexfield-emerald border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-nexfield-slate/70">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/forgot-password" className="text-nexfield-emerald hover:text-nexfield-emerald/80">
                      Forgot your password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white py-3 font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-nexfield-slate/70">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-nexfield-emerald hover:text-nexfield-emerald/80 font-medium">
                    Create one here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
