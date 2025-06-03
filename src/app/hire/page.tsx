'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Briefcase, DollarSign, Calendar, MapPin, Clock, Star, MessageCircle, CheckCircle, Send, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

// Mock contractor data (matches contractors page)
const mockContractors = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    title: "Senior Pipeline Welder",
    location: "Houston, TX",
    hourlyRate: "$95-120",
    rating: 4.9,
    reviewCount: 47,
    completedJobs: 156,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    specializations: ["Pipeline Welding", "GTAW/TIG", "API 1104"],
    certifications: ["API 1104", "OSHA 30", "H2S Alive", "TWIC Card"],
    experience: "12+ years",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Safety Inspector & Compliance Officer",
    location: "Midland, TX",
    hourlyRate: "$75-95",
    rating: 4.8,
    reviewCount: 32,
    completedJobs: 89,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
    specializations: ["Safety Inspection", "OSHA Compliance", "Risk Assessment"],
    certifications: ["OSHA 500", "First Aid/CPR", "H2S Safety", "Confined Space"],
    experience: "8+ years",
    verified: true
  },
  {
    id: 3,
    name: "Jake Thompson",
    title: "Drilling Operations Supervisor",
    location: "Odessa, TX",
    hourlyRate: "$85-110",
    rating: 4.7,
    reviewCount: 28,
    completedJobs: 73,
    isOnline: false,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    specializations: ["Drilling Operations", "Rig Management", "Team Leadership"],
    certifications: ["Well Control", "IADC Rig Pass", "OSHA 30", "First Aid"],
    experience: "15+ years",
    verified: true
  },
  {
    id: 4,
    name: "Maria Santos",
    title: "Process Engineer",
    location: "Port Arthur, TX",
    hourlyRate: "$90-125",
    rating: 4.9,
    reviewCount: 51,
    completedJobs: 124,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    specializations: ["Process Optimization", "Refinery Operations", "HAZOP Studies"],
    certifications: ["PE License", "Six Sigma", "Process Safety", "HAZOP Leader"],
    experience: "10+ years",
    verified: true
  },
  {
    id: 5,
    name: "David Kim",
    title: "Maintenance Technician",
    location: "Galveston, TX",
    hourlyRate: "$65-85",
    rating: 4.6,
    reviewCount: 19,
    completedJobs: 45,
    isOnline: false,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    specializations: ["Mechanical Maintenance", "Offshore Platforms", "Preventive Maintenance"],
    certifications: ["Millwright", "Crane Operator", "Rigging", "Medical Clearance"],
    experience: "6+ years",
    verified: false
  },
  {
    id: 6,
    name: "Rebecca Johnson",
    title: "NDT Inspector",
    location: "Texas City, TX",
    hourlyRate: "$80-105",
    rating: 4.8,
    reviewCount: 35,
    completedJobs: 98,
    isOnline: true,
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    specializations: ["NDT Testing", "Ultrasonic Testing", "Radiographic Testing"],
    certifications: ["ASNT Level III", "UT", "RT", "MT", "PT"],
    experience: "9+ years",
    verified: true
  }
];

export default function HirePage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<number | null>(null);

  const [projectData, setProjectData] = useState({
    title: '',
    description: '',
    location: '',
    duration: '',
    startDate: '',
    budget: '',
    budgetType: 'hourly',
    urgency: 'normal',
    requirements: '',
    message: ''
  });

  useEffect(() => {
    // Check for contractor parameter in URL without useSearchParams
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const contractorParam = urlParams.get('contractor');
      if (contractorParam) {
        setSelectedContractor(Number.parseInt(contractorParam));
        setStep(2); // Skip contractor selection if coming from contractor page
      }
    }
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setProjectData(prev => ({ ...prev, [field]: value }));
  };

  const contractor = selectedContractor ?
    mockContractors.find(c => c.id === selectedContractor) : null;

  const handleSendHireRequest = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!projectData.title || !projectData.description || !projectData.location) {
        showToast({
          type: 'warning',
          title: 'Missing Information',
          message: 'Please fill in all required project details.',
          duration: 4000
        });
        setIsLoading(false);
        return;
      }

      // Simulate sending hire request
      await new Promise(resolve => setTimeout(resolve, 2000));

      showToast({
        type: 'success',
        title: 'Hire Request Sent!',
        message: `${contractor?.name} will receive your request and can respond through messages.`,
        duration: 5000
      });

      // Redirect to messages with this contractor after brief delay
      setTimeout(() => {
        window.location.href = `/messages?contractor=${selectedContractor}`;
      }, 2000);
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Request Failed',
        message: 'Failed to send hire request. Please try again.',
        duration: 4000
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Show loading spinner while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-nexfield-ivory flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-nexfield-emerald mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-nexfield-ivory flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to hire contractors.</p>
            <div className="space-x-4">
              <Link href="/signin">
                <Button>Sign In</Button>
              </Link>
              <Link href="/signup">
                <Button variant="outline">Create Account</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/contractors" className="inline-flex items-center text-nexfield-accent hover:text-nexfield-accent/80 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Contractors
          </Link>
          <h1 className="text-3xl font-bold text-nexfield-dark">Hire a Contractor</h1>
          <p className="text-gray-600 mt-2">Connect with skilled professionals for your energy projects</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${step >= 1 ? 'text-nexfield-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-nexfield-accent text-white' : 'bg-gray-200'}`}>
                1
              </div>
              <span className="ml-2 font-medium">Select Contractor</span>
            </div>
            <div className={`w-12 h-1 ${step >= 2 ? 'bg-nexfield-accent' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 2 ? 'text-nexfield-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-nexfield-accent text-white' : 'bg-gray-200'}`}>
                2
              </div>
              <span className="ml-2 font-medium">Project Details</span>
            </div>
            <div className={`w-12 h-1 ${step >= 3 ? 'bg-nexfield-accent' : 'bg-gray-200'}`} />
            <div className={`flex items-center ${step >= 3 ? 'text-nexfield-accent' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-nexfield-accent text-white' : 'bg-gray-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium">Send Request</span>
            </div>
          </div>
        </div>

        {/* Step 1: Contractor Selection */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Select a Contractor</CardTitle>
              <CardDescription>Choose from our verified professionals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {mockContractors.map((contractor) => (
                  <div
                    key={contractor.id}
                    className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedContractor === contractor.id
                        ? 'border-nexfield-accent bg-nexfield-accent/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedContractor(contractor.id)}
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={contractor.avatar}
                        alt={contractor.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{contractor.name}</h3>
                          {contractor.verified && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                          {contractor.isOnline && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Online
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{contractor.title}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {contractor.location}
                          </span>
                          <span className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {contractor.hourlyRate}/hr
                          </span>
                          <span className="flex items-center">
                            <Star className="w-4 h-4 mr-1 fill-current text-yellow-400" />
                            {contractor.rating} ({contractor.reviewCount} reviews)
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {contractor.specializations.slice(0, 3).map((spec) => (
                            <Badge key={spec} variant="outline">
                              {spec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedContractor}
                  className="bg-nexfield-accent hover:bg-nexfield-accent/90"
                >
                  Continue to Project Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Project Details */}
        {step === 2 && contractor && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>Provide information about your project</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="title">Project Title *</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Pipeline Welding at Offshore Platform"
                        value={projectData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Project Description *</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the work required, scope, and any specific requirements..."
                        rows={4}
                        value={projectData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="e.g., Houston, TX"
                          value={projectData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 2 weeks, 1 month"
                          value={projectData.duration}
                          onChange={(e) => handleInputChange('duration', e.target.value)}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Start Date</Label>
                        <Input
                          id="startDate"
                          type="date"
                          value={projectData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="urgency">Urgency</Label>
                        <Select
                          value={projectData.urgency}
                          onValueChange={(value) => handleInputChange('urgency', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low - Flexible timeline</SelectItem>
                            <SelectItem value="normal">Normal - Standard timeline</SelectItem>
                            <SelectItem value="high">High - Need to start soon</SelectItem>
                            <SelectItem value="urgent">Urgent - ASAP</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="budgetType">Budget Type</Label>
                        <Select
                          value={projectData.budgetType}
                          onValueChange={(value) => handleInputChange('budgetType', value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="hourly">Hourly Rate</SelectItem>
                            <SelectItem value="fixed">Fixed Price</SelectItem>
                            <SelectItem value="daily">Daily Rate</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                          id="budget"
                          placeholder="e.g., $5000 or $100/hr"
                          value={projectData.budget}
                          onChange={(e) => handleInputChange('budget', e.target.value)}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="requirements">Special Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="Certifications, equipment, safety requirements, etc."
                        rows={3}
                        value={projectData.requirements}
                        onChange={(e) => handleInputChange('requirements', e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message to Contractor</Label>
                      <Textarea
                        id="message"
                        placeholder="Additional information or questions for the contractor..."
                        rows={3}
                        value={projectData.message}
                        onChange={(e) => handleInputChange('message', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                    >
                      Back to Contractor Selection
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      className="bg-nexfield-accent hover:bg-nexfield-accent/90"
                    >
                      Review & Send Request
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Selected Contractor Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Selected Contractor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <img
                      src={contractor.avatar}
                      alt={contractor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="font-semibold">{contractor.name}</h3>
                      {contractor.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{contractor.title}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Rate:</span>
                        <span className="font-medium">{contractor.hourlyRate}/hr</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Rating:</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 fill-current text-yellow-400 mr-1" />
                          {contractor.rating}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Jobs:</span>
                        <span className="font-medium">{contractor.completedJobs}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Experience:</span>
                        <span className="font-medium">{contractor.experience}</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t">
                      <p className="text-xs text-gray-500 mb-2">Specializations:</p>
                      <div className="flex flex-wrap gap-1">
                        {contractor.specializations.map((spec) => (
                          <Badge key={spec} variant="outline" className="text-xs">
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 3: Review & Send */}
        {step === 3 && contractor && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Request</CardTitle>
                  <CardDescription>Double-check your project details before sending</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Project Title</h4>
                      <p>{projectData.title}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-sm text-gray-500 mb-1">Description</h4>
                      <p className="text-gray-700">{projectData.description}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Location</h4>
                        <p>{projectData.location}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Duration</h4>
                        <p>{projectData.duration || 'Not specified'}</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Start Date</h4>
                        <p>{projectData.startDate || 'Not specified'}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Budget</h4>
                        <p>{projectData.budget || 'To be discussed'} ({projectData.budgetType})</p>
                      </div>
                    </div>
                    {projectData.requirements && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Special Requirements</h4>
                        <p className="text-gray-700">{projectData.requirements}</p>
                      </div>
                    )}
                    {projectData.message && (
                      <div>
                        <h4 className="font-medium text-sm text-gray-500 mb-1">Message</h4>
                        <p className="text-gray-700">{projectData.message}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                    >
                      Back to Edit Details
                    </Button>
                    <Button
                      onClick={handleSendHireRequest}
                      disabled={isLoading}
                      className="bg-nexfield-accent hover:bg-nexfield-accent/90"
                    >
                      {isLoading ? (
                        <>
                          <Clock className="w-4 h-4 mr-2 animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 mr-2" />
                          Send Hire Request
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contractor Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Hiring: {contractor.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <img
                      src={contractor.avatar}
                      alt={contractor.name}
                      className="w-20 h-20 rounded-full object-cover mx-auto mb-4"
                    />
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <h3 className="font-semibold">{contractor.name}</h3>
                      {contractor.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{contractor.title}</p>

                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center text-green-700">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        <span className="text-sm font-medium">Ready to connect</span>
                      </div>
                      <p className="text-green-600 text-xs mt-1">
                        {contractor.name} will receive your request and can respond directly
                      </p>
                    </div>

                    <div className="text-left space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Response time:</span>
                        <span className="font-medium">Usually within 2-4 hours</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500">Success rate:</span>
                        <span className="font-medium">98% project completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
