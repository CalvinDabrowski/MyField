'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Shield, 
  User, 
  MapPin, 
  Star, 
  CheckCircle, 
  AlertCircle,
  Calendar
} from 'lucide-react';
import BackgroundCheckPurchase from '@/components/BackgroundCheckPurchase';

interface Contractor {
  id: string;
  name: string;
  location: string;
  rating: number;
  specialties: string[];
  verified: boolean;
  backgroundCheck?: {
    status: 'pending' | 'completed' | 'failed';
    purchasedAt: Date;
    completedAt?: Date;
  };
}

const mockContractors: Contractor[] = [
  {
    id: '1',
    name: 'John Smith',
    location: 'Houston, TX',
    rating: 4.8,
    specialties: ['Pipeline Installation', 'Welding', 'Safety Compliance'],
    verified: true,
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    location: 'Dallas, TX',
    rating: 4.9,
    specialties: ['Drilling Operations', 'Equipment Maintenance'],
    verified: true,
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    location: 'Austin, TX',
    rating: 4.7,
    specialties: ['Electrical Systems', 'Instrumentation'],
    verified: false,
  },
];

function HiringDashboardContent() {
  const searchParams = useSearchParams();
  const [contractors, setContractors] = useState<Contractor[]>(mockContractors);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);

  // Check for background check status from URL params
  const backgroundCheckStatus = searchParams.get('background_check');
  const contractorId = searchParams.get('contractor');

  useEffect(() => {
    if (backgroundCheckStatus === 'success' && contractorId) {
      // Mark background check as purchased for the contractor
      setContractors(prev => prev.map(contractor => 
        contractor.id === contractorId 
          ? {
              ...contractor,
              backgroundCheck: {
                status: 'pending',
                purchasedAt: new Date(),
              }
            }
          : contractor
      ));
    }
  }, [backgroundCheckStatus, contractorId]);

  const filteredContractors = contractors.filter(contractor =>
    contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contractor.specialties.some(specialty => 
      specialty.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-nexfield-ivory to-white">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-nexfield-slate mb-4">
            Contractor Hiring Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Find, verify, and hire qualified contractors for your projects
          </p>
        </div>

        {/* Success/Status Messages */}
        {backgroundCheckStatus === 'success' && (
          <Card className="mb-6 border-green-200 bg-green-50 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="font-semibold text-green-800">Background Check Ordered</h3>
                  <p className="text-green-700">Background verification is being processed. Results will be available within 24-48 hours.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {backgroundCheckStatus === 'canceled' && (
          <Card className="mb-6 border-yellow-200 bg-yellow-50 rounded-3xl">
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-semibold text-yellow-800">Background Check Canceled</h3>
                  <p className="text-yellow-700">The background check purchase was canceled. You can try again anytime.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search */}
        <Card className="mb-6 rounded-3xl shadow-lg">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search contractors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 rounded-2xl border-gray-200 focus:border-nexfield-emerald"
              />
            </div>
          </CardContent>
        </Card>

        {/* Contractors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredContractors.map((contractor) => (
            <Card key={contractor.id} className="rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {contractor.name}
                      {contractor.verified && (
                        <Badge className="bg-nexfield-emerald text-white">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {contractor.location}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium">{contractor.rating}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-700 mb-2">Specialties</h4>
                    <div className="flex flex-wrap gap-1">
                      {contractor.specialties.map((specialty, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Background Check Status */}
                  {contractor.backgroundCheck ? (
                    <div className="p-3 bg-blue-50 rounded-2xl">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-800">
                          Background Check {contractor.backgroundCheck.status === 'pending' ? 'Processing' : 'Complete'}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        {contractor.backgroundCheck.status === 'pending' 
                          ? `Ordered ${contractor.backgroundCheck.purchasedAt.toLocaleDateString()}`
                          : `Completed ${contractor.backgroundCheck.completedAt?.toLocaleDateString()}`
                        }
                      </p>
                    </div>
                  ) : (
                    <Button
                      onClick={() => setSelectedContractor(contractor.id)}
                      variant="outline"
                      className="w-full rounded-2xl border-dashed"
                      size="sm"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Order Background Check
                    </Button>
                  )}

                  <div className="flex gap-2">
                    <Button className="flex-1 rounded-2xl bg-nexfield-emerald hover:bg-nexfield-emerald/90" size="sm">
                      View Profile
                    </Button>
                    <Button variant="outline" className="flex-1 rounded-2xl" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Background Check Purchase Modal/Card */}
        {selectedContractor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="max-w-md w-full">
              <BackgroundCheckPurchase
                contractorId={selectedContractor}
                contractorName={contractors.find(c => c.id === selectedContractor)?.name || 'Contractor'}
                onPurchaseComplete={() => setSelectedContractor(null)}
              />
              <Button
                onClick={() => setSelectedContractor(null)}
                variant="outline"
                className="w-full mt-4 rounded-2xl bg-white"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function HiringDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-nexfield-ivory to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-nexfield-emerald mx-auto mb-4"></div>
          <p className="text-gray-600">Loading contractor dashboard...</p>
        </div>
      </div>
    }>
      <HiringDashboardContent />
    </Suspense>
  );
}