'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Clock, Users, Award, MessageCircle, Calendar, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

import type { Contractor } from '@/types/portfolio';

interface ContractorProfileClientProps {
  contractor: Contractor | undefined;
  contractorId: string;
}

export default function ContractorProfileClient({ contractor, contractorId }: ContractorProfileClientProps) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');

  if (!contractor) {
    return (
      <div className="min-h-screen bg-nexfield-ivory flex items-center justify-center">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Contractor Not Found</h1>
            <p className="text-gray-600 mb-6">The contractor you're looking for doesn't exist.</p>
            <Link href="/contractors">
              <Button>← Back to Contractors</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleContactContractor = () => {
    if (!isAuthenticated) {
      showToast({
        type: 'warning',
        title: 'Sign In Required',
        message: 'Please sign in to contact contractors.',
        duration: 4000
      });
      setTimeout(() => {
        window.location.href = '/signin';
      }, 1000);
      return;
    }

    showToast({
      type: 'success',
      title: 'Message Sent!',
      message: `Opening conversation with ${contractor.name}...`,
      duration: 3000
    });

    setTimeout(() => {
      window.location.href = `/messages?contractor=${contractor.id}`;
    }, 1500);
  };

  const handleHireContractor = () => {
    if (!isAuthenticated) {
      showToast({
        type: 'warning',
        title: 'Sign In Required',
        message: 'Please sign in to hire contractors.',
        duration: 4000
      });
      setTimeout(() => {
        window.location.href = '/signin';
      }, 1000);
      return;
    }

    showToast({
      type: 'success',
      title: 'Starting Hire Process',
      message: `Preparing hire workflow for ${contractor.name}...`,
      duration: 3000
    });

    setTimeout(() => {
      window.location.href = `/hire?contractor=${contractor.id}`;
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link href="/contractors" className="text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Contractors</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contractor Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-8">
              {/* Avatar and Status */}
              <div className="relative mb-6 lg:mb-0">
                <img
                  src={contractor.avatar}
                  alt={contractor.name}
                  className="w-32 h-32 rounded-full object-cover"
                  crossOrigin="anonymous"
                />
                {contractor.isOnline && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  </div>
                )}
              </div>

              {/* Contractor Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h1 className="text-3xl font-bold text-nexfield-slate">{contractor.name}</h1>
                      {contractor.verified && (
                        <CheckCircle className="w-6 h-6 text-blue-500" />
                      )}
                    </div>
                    <p className="text-xl text-gray-600 mb-2">{contractor.title}</p>
                    <div className="flex items-center space-x-4 text-gray-600 mb-4">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {contractor.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {contractor.isOnline ? (
                          <span className="text-green-600 font-medium">Online now</span>
                        ) : (
                          <span>{contractor.lastSeen}</span>
                        )}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {contractor.completedJobs} jobs completed
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-bold text-nexfield-slate mb-2">{contractor.hourlyRate}/hr</p>
                    <div className="flex items-center space-x-1 mb-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold">{contractor.rating}</span>
                      <span className="text-gray-500">({contractor.reviewCount} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-600">{contractor.experience} experience</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">{contractor.description}</p>

                {/* Action Buttons */}
                <div className="flex space-x-4">
                  <Button
                    onClick={handleContactContractor}
                    variant="outline"
                    size="lg"
                    className="flex items-center space-x-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Send Message</span>
                  </Button>
                  <Button
                    onClick={handleHireContractor}
                    size="lg"
                    className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white flex items-center space-x-2"
                  >
                    <Calendar className="w-5 h-5" />
                    <span>Hire Now</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Overview', icon: Users },
            { id: 'reviews', label: 'Reviews', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'reviews')}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-nexfield-emerald text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.id === 'reviews' && (
                  <span className="bg-white/20 text-xs px-1 rounded">{contractor.reviewCount}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specializations */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-nexfield-slate mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-nexfield-emerald" />
                  Specializations
                </h3>
                <div className="space-y-2">
                  {contractor.specializations.map((spec, index) => (
                    <Badge key={spec} variant="outline" className="mr-2 mb-2">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-nexfield-slate mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-nexfield-sky" />
                  Certifications
                </h3>
                <div className="space-y-2">
                  {contractor.certifications.map((cert, index) => (
                    <Badge key={cert} variant="secondary" className="mr-2 mb-2">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-nexfield-slate mb-4 flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-nexfield-emerald" />
                  Availability
                </h3>
                <p className="text-gray-700">{contractor.availability}</p>
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-green-800 text-sm font-medium">
                    ✓ Currently available for new projects
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}



        {activeTab === 'reviews' && (
          <div className="space-y-6">
            {contractor.reviews && contractor.reviews.length > 0 ? (
              contractor.reviews.map((review) => (
                <Card key={review.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-nexfield-slate">{review.client}</h4>
                        <p className="text-sm text-gray-600">{review.project}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={`star-${review.id}-${i}`}
                            className={`w-4 h-4 ${
                              i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">"{review.comment}"</p>
                    <p className="text-sm text-gray-500">{new Date(review.date).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">No reviews yet</h3>
                  <p className="text-gray-500">This contractor hasn't received any reviews yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
