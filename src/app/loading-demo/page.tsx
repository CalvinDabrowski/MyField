'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import PipelineLoader from '@/components/PipelineLoader';

export default function LoadingDemoPage() {
  const [showLoader, setShowLoader] = useState(false);
  const [loaderText, setLoaderText] = useState('Loading your dashboard...');

  const loaderExamples = [
    'Loading your dashboard...',
    'Connecting contractors...',
    'Matching your skills...',
    'Processing payment...',
    'Verifying certifications...',
    'Syncing project data...'
  ];

  const startDemo = (text: string) => {
    setLoaderText(text);
    setShowLoader(true);
    setTimeout(() => setShowLoader(false), 4000);
  };

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-nexfield-slate mb-4">
            Pipeline Loading Animation Demo
          </h1>
          <p className="text-lg text-nexfield-slate/70">
            Custom loading animation using NexField brand colors and pipeline theme
          </p>
        </div>

        {/* Loading Animation Demo */}
        {showLoader && (
          <div className="fixed inset-0 bg-white/95 flex items-center justify-center z-50">
            <PipelineLoader text={loaderText} />
          </div>
        )}

        <div className="space-y-8">
          {/* Current Animation */}
          <Card>
            <CardHeader>
              <CardTitle>Current Pipeline Animation</CardTitle>
              <CardDescription>
                Live preview of the loading animation in use
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-6">
              <div className="bg-gray-50 p-8 rounded-lg">
                <PipelineLoader text="Loading NexField platform..." />
              </div>
              <p className="text-gray-600 text-center max-w-md">
                This animation uses a pipeline filling with liquid effect, incorporating
                NexField's emerald green and sky blue colors with slate gray accents.
              </p>
            </CardContent>
          </Card>

          {/* Demo Controls */}
          <Card>
            <CardHeader>
              <CardTitle>Try Different Loading Messages</CardTitle>
              <CardDescription>
                Click any button to see the loading animation in full-screen overlay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {loaderExamples.map((text, index) => (
                  <Button
                    key={index}
                    onClick={() => startDemo(text)}
                    variant="outline"
                    className="flex items-center justify-between p-4 h-auto"
                  >
                    <span>{text}</span>
                    <Play className="w-4 h-4 ml-2" />
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Technical Details */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Animation Features:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Custom CSS keyframes for smooth pipeline filling</li>
                    <li>NexField brand colors (Emerald Green #2E8B57, Sky Blue #87CEEB)</li>
                    <li>Pipeline structure with realistic supports and end caps</li>
                    <li>Bouncing dots animation for additional visual interest</li>
                    <li>Responsive design that works on all screen sizes</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Usage in App:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>Dashboard loading screens</li>
                    <li>Form submission processing</li>
                    <li>Data synchronization</li>
                    <li>Payment processing</li>
                    <li>File uploads and downloads</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Technical Stack:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    <li>React/Next.js component</li>
                    <li>Tailwind CSS animations</li>
                    <li>CSS gradients and transforms</li>
                    <li>Configurable text and timing</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* iOS App Development Info */}
          <Card>
            <CardHeader>
              <CardTitle>iOS App Development Guide</CardTitle>
              <CardDescription>
                How to create an iOS app version of NexField
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">Option 1: React Native (Recommended)</h4>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      Convert your existing React components to React Native for maximum code reuse:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                      <li>Use React Native CLI or Expo</li>
                      <li>Keep business logic and API calls</li>
                      <li>Replace web components with React Native equivalents</li>
                      <li>Implement native navigation and animations</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Option 2: Progressive Web App (PWA)</h4>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      Make your current web app installable on iOS:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                      <li>Add service worker for offline functionality</li>
                      <li>Create app manifest with iOS meta tags</li>
                      <li>Optimize for mobile touch interactions</li>
                      <li>Users can "Add to Home Screen" from Safari</li>
                    </ul>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Option 3: Native iOS (Swift/SwiftUI)</h4>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <p className="text-gray-700 mb-3">
                      Build a fully native iOS app from scratch:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-600 text-sm">
                      <li>Use SwiftUI for modern iOS development</li>
                      <li>Integrate with your existing API endpoints</li>
                      <li>Implement native iOS features (push notifications, Face ID, etc.)</li>
                      <li>Best performance and iOS-specific UX</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-semibold mb-2">💡 Recommendation:</h4>
                  <p className="text-gray-700">
                    Start with a PWA to quickly get on mobile devices, then consider React Native
                    for a more app-like experience if needed. This allows you to test market demand
                    before investing in full native development.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
