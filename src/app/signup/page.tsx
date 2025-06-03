'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

export default function SignUpPage() {
  const { isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [accountType, setAccountType] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      window.location.href = '/dashboard/contractor';
    }
  }, [isAuthenticated]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    location: '',
    experience: '',
    skills: '',
    certifications: '',
    bio: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!accountType) {
      showToast({
        type: 'warning',
        title: 'Account Type Required',
        message: 'Please select an account type.',
        duration: 4000
      });
      return;
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.location) {
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

    if (formData.password !== formData.confirmPassword) {
      showToast({
        type: 'error',
        title: 'Password Mismatch',
        message: 'Passwords do not match. Please try again.',
        duration: 4000
      });
      return;
    }

    if (formData.password.length < 6) {
      showToast({
        type: 'warning',
        title: 'Password Too Short',
        message: 'Password must be at least 6 characters long.',
        duration: 4000
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate account creation with delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Handle form submission here
      console.log('Form submitted:', { accountType, ...formData });

      showToast({
        type: 'success',
        title: 'Account Created Successfully!',
        message: 'Check your email for verification instructions. Redirecting...',
        duration: 4000
      });

      // Redirect to email verification page with the user's email after brief delay
      setTimeout(() => {
        window.location.href = `/verify-email?email=${encodeURIComponent(formData.email)}`;
      }, 2000);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Account Creation Failed',
        message: 'Please try again or contact support if the problem persists.',
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-nexfield-slate mb-4">
            Join the NexField Marketplace
          </h1>
          <p className="text-lg text-nexfield-slate/70">
            Connect with opportunities in the oil & energy industry
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Account Type Selection */}
          <Card className="overflow-visible signup-form-card">
            <CardHeader>
              <CardTitle>Account Type</CardTitle>
              <CardDescription>Choose the type of account that best describes you</CardDescription>
            </CardHeader>
            <CardContent className="overflow-visible card-content relative z-10">
              <Select value={accountType} onValueChange={setAccountType} required>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Select account type" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg z-[9999]" position="popper" sideOffset={4}>
                  <SelectItem value="contractor">Individual Contractor</SelectItem>
                  <SelectItem value="company">Energy Company</SelectItem>
                  <SelectItem value="subcontractor">Subcontracting Company</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card className="overflow-visible signup-form-card">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-visible card-content relative">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle>Account Security</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="password">Password *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          {accountType && (
            <Card className="overflow-visible signup-form-card">
              <CardHeader>
                <CardTitle>
                  {accountType === 'contractor' ? 'Contractor' : 'Company'} Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 overflow-visible card-content relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">
                      {accountType === 'contractor' ? 'Current/Previous Company' : 'Company Name *'}
                    </Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      required={accountType !== 'contractor'}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location (City, State) *</Label>
                    <Input
                      id="location"
                      name="location"
                      type="text"
                      value={formData.location}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      placeholder="e.g., Texas City, TX"
                    />
                  </div>
                </div>

                {accountType === 'contractor' && (
                  <>
                    <div>
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Select value={formData.experience} onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}>
                        <SelectTrigger className="mt-1 bg-white">
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border border-gray-200 shadow-lg z-[9999]" position="popper" sideOffset={4}>
                          <SelectItem value="0-2">0-2 years</SelectItem>
                          <SelectItem value="3-5">3-5 years</SelectItem>
                          <SelectItem value="6-10">6-10 years</SelectItem>
                          <SelectItem value="11-15">11-15 years</SelectItem>
                          <SelectItem value="16+">16+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="skills">Key Skills & Specializations</Label>
                      <Textarea
                        id="skills"
                        name="skills"
                        value={formData.skills}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g., Pipeline welding, H2S safety, confined space entry, crane operation..."
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="certifications">Certifications & Licenses</Label>
                      <Textarea
                        id="certifications"
                        name="certifications"
                        value={formData.certifications}
                        onChange={handleInputChange}
                        className="mt-1"
                        placeholder="e.g., OSHA 30, H2S Alive, TWIC Card, API certifications..."
                        rows={3}
                      />
                    </div>
                  </>
                )}

                <div>
                  <Label htmlFor="bio">
                    {accountType === 'contractor' ? 'Professional Summary' : 'Company Description'}
                  </Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="mt-1"
                    placeholder={
                      accountType === 'contractor'
                        ? "Brief description of your experience and what makes you a great contractor..."
                        : "Describe your company's services and what kind of contractors you're looking for..."
                    }
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white px-12 py-3 text-lg font-semibold hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!accountType || isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-nexfield-slate/70">
              Already have an account?{' '}
              <Link href="/signin" className="text-nexfield-emerald hover:text-nexfield-emerald/80 font-medium">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
