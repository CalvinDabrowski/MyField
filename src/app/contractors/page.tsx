'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, DollarSign, Star, MessageCircle, Phone, Mail, Award, Clock, Users, CheckCircle, Map, Grid, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';
import PortfolioGallery from '@/components/PortfolioGallery';
import MapView from '@/components/MapView';

// Enhanced contractor data with portfolios and coordinates
const mockContractors = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    title: "Senior Pipeline Welder",
    location: "Houston, TX",
    lat: 29.7604,
    lng: -95.3698,
    hourlyRate: "$95-120",
    rating: 4.9,
    reviewCount: 47,
    completedJobs: 156,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&crop=face",
    specializations: ["Pipeline Welding", "GTAW/TIG", "API 1104"],
    certifications: ["API 1104", "OSHA 30", "H2S Alive", "TWIC Card"],
    experience: "12+ years",
    description: "Highly experienced pipeline welder with expertise in critical infrastructure projects. Certified in multiple welding processes with an excellent safety record.",
    availability: "Available immediately",
    verified: true,
    portfolio: [
      {
        id: "p1",
        title: "Gulf Coast Pipeline Extension Project",
        client: "Energy Transfer Partners",
        location: "Houston, TX",
        date: "2024",
        duration: "6 months",
        description: "Led welding operations for a critical 50-mile pipeline extension project, ensuring zero safety incidents and 100% weld quality compliance.",
        technologies: ["API 1104", "GTAW", "Pipeline Welding", "X-Ray Testing"],
        certifications: ["API 1104", "OSHA 30", "H2S Alive"],
        featured: true,
        photos: [
          {
            id: "ph1",
            url: "https://cdn.shopify.com/s/files/1/0024/3249/9821/files/Untitled_1620_x_911_px_810_x_456_px_8_600x600.png?v=1641296361",
            title: "Pipeline Welding in Progress",
            description: "Professional TIG welding on 36-inch diameter pipeline with proper safety equipment",
            category: "during"
          },
          {
            id: "ph2",
            url: "https://cdn.shopify.com/s/files/1/0024/3249/9821/files/pipeline_nation_245305337_2667381626888716_5020313872523303915_n_600x600.jpg?v=1641287520",
            title: "Underground Pipeline Installation",
            description: "Completed pipeline joint installation with certified welding techniques",
            category: "after"
          },
          {
            id: "ph3",
            url: "https://sydneywelders.com.au/wp-content/uploads/2023/05/Depositphotos_222526724_S-min-min.jpg",
            title: "Pipeline Welding Precision Work",
            description: "Professional welder demonstrating API 1104 compliant welding on natural gas pipeline",
            category: "equipment"
          },
          {
            id: "ph4",
            url: "https://energy-oil-gas.com/wp-content/uploads/sites/3/2016/05/Pipeline-Technique-March-07-b.jpg",
            title: "Automatic Pipeline Welding",
            description: "State-of-the-art automated welding equipment for large diameter pipeline construction",
            category: "equipment"
          }
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Sarah Chen",
    title: "Safety Inspector & Compliance Officer",
    location: "Midland, TX",
    lat: 31.9973,
    lng: -102.0779,
    hourlyRate: "$75-95",
    rating: 4.8,
    reviewCount: 32,
    completedJobs: 89,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
    specializations: ["Safety Inspection", "OSHA Compliance", "Risk Assessment"],
    certifications: ["OSHA 500", "First Aid/CPR", "H2S Safety", "Confined Space"],
    experience: "8+ years",
    description: "Dedicated safety professional with extensive experience in oil & gas operations. Expert in regulatory compliance and risk management.",
    availability: "Available this week",
    verified: true,
    portfolio: [
      {
        id: "p2",
        title: "Refinery Safety Audit & Compliance",
        client: "Marathon Petroleum",
        location: "Midland, TX",
        date: "2024",
        duration: "3 months",
        description: "Comprehensive safety audit resulting in 100% OSHA compliance and implementation of enhanced safety protocols.",
        technologies: ["OSHA Compliance", "Risk Assessment", "Safety Training"],
        certifications: ["OSHA 500", "First Aid/CPR", "H2S Safety"],
        featured: true,
        photos: [
          {
            id: "ph4",
            url: "https://www.trccompanies.com/wp-content/uploads/2024/10/747edb5a-group-of-industrial-workers-in-a-refinery-1039705312-1440x962-1.webp",
            title: "Refinery Safety Inspection Team",
            description: "Professional safety inspection team conducting comprehensive OSHA compliance audit",
            category: "during"
          },
          {
            id: "ph5",
            url: "https://internalsafety.tractel.com/safetygate/wp-content/uploads/2021/10/oil-gas-refinery-osha-fall-protection.jpg",
            title: "OSHA Fall Protection Implementation",
            description: "Installing and verifying fall protection systems in refinery environment",
            category: "equipment"
          },
          {
            id: "ph6",
            url: "https://www.candk.com/wp-content/uploads/2019/07/Osha1910-119.jpg",
            title: "OSHA Process Safety Management",
            description: "Conducting process safety management training and compliance verification",
            category: "certification"
          }
        ]
      }
    ]
  },
  {
    id: 3,
    name: "Jake Thompson",
    title: "Drilling Operations Supervisor",
    location: "Odessa, TX",
    lat: 31.8457,
    lng: -102.3676,
    hourlyRate: "$85-110",
    rating: 4.7,
    reviewCount: 28,
    completedJobs: 73,
    isOnline: false,
    lastSeen: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&h=150&crop=face",
    specializations: ["Drilling Operations", "Rig Management", "Team Leadership"],
    certifications: ["Well Control", "IADC Rig Pass", "OSHA 30", "First Aid"],
    experience: "15+ years",
    description: "Experienced drilling supervisor with a proven track record of safe and efficient operations. Strong leadership and technical skills.",
    availability: "Available next week",
    verified: true,
    portfolio: []
  },
  {
    id: 4,
    name: "Maria Santos",
    title: "Process Engineer",
    location: "Port Arthur, TX",
    lat: 29.8850,
    lng: -93.9400,
    hourlyRate: "$90-125",
    rating: 4.9,
    reviewCount: 51,
    completedJobs: 124,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
    specializations: ["Process Optimization", "Refinery Operations", "HAZOP Studies"],
    certifications: ["PE License", "Six Sigma", "Process Safety", "HAZOP Leader"],
    experience: "10+ years",
    description: "Chemical engineer specializing in refinery processes and optimization. Expert in process safety and continuous improvement methodologies.",
    availability: "Available for projects",
    verified: true,
    portfolio: []
  },
  {
    id: 5,
    name: "David Kim",
    title: "Maintenance Technician",
    location: "Galveston, TX",
    lat: 29.2694,
    lng: -94.7847,
    hourlyRate: "$65-85",
    rating: 4.6,
    reviewCount: 19,
    completedJobs: 45,
    isOnline: false,
    lastSeen: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    specializations: ["Mechanical Maintenance", "Offshore Platforms", "Preventive Maintenance"],
    certifications: ["Millwright", "Crane Operator", "Rigging", "Medical Clearance"],
    experience: "6+ years",
    description: "Skilled maintenance technician with offshore experience. Proficient in mechanical systems and equipment troubleshooting.",
    availability: "Available for rotational work",
    verified: false,
    portfolio: []
  },
  {
    id: 6,
    name: "Rebecca Johnson",
    title: "NDT Inspector",
    location: "Texas City, TX",
    lat: 29.3838,
    lng: -94.9027,
    hourlyRate: "$80-105",
    rating: 4.8,
    reviewCount: 35,
    completedJobs: 98,
    isOnline: true,
    lastSeen: "Active now",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    specializations: ["NDT Testing", "Ultrasonic Testing", "Radiographic Testing"],
    certifications: ["ASNT Level III", "UT", "RT", "MT", "PT"],
    experience: "9+ years",
    description: "Certified NDT inspector with Level III qualifications. Extensive experience in pipeline and structural inspections.",
    availability: "Available immediately",
    verified: true,
    portfolio: []
  }
];

export default function ContractorsPage() {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [rateMin, setRateMin] = useState('');
  const [rateMax, setRateMax] = useState('');
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [filteredContractors, setFilteredContractors] = useState(mockContractors);
  const [viewMode, setViewMode] = useState<'grid' | 'map' | 'portfolio'>('grid');
  const [selectedContractor, setSelectedContractor] = useState<typeof mockContractors[0] | null>(null);

  const handleSearch = useCallback(() => {
    let filtered = mockContractors;

    if (searchTerm) {
      filtered = filtered.filter(contractor =>
        contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contractor.specializations.some(spec =>
          spec.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        contractor.certifications.some(cert =>
          cert.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        contractor.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter && locationFilter !== 'all') {
      filtered = filtered.filter(contractor =>
        contractor.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (specialtyFilter && specialtyFilter !== 'all') {
      filtered = filtered.filter(contractor =>
        contractor.specializations.some(spec =>
          spec.toLowerCase().includes(specialtyFilter.toLowerCase())
        )
      );
    }

    if (availabilityFilter && availabilityFilter !== 'all') {
      filtered = filtered.filter(contractor =>
        contractor.availability.toLowerCase().includes(availabilityFilter.toLowerCase())
      );
    }

    if (showOnlineOnly) {
      filtered = filtered.filter(contractor => contractor.isOnline);
    }

    if (rateMin) {
      filtered = filtered.filter(contractor => {
        const contractorRate = extractRateNumber(contractor.hourlyRate);
        return contractorRate >= Number.parseInt(rateMin);
      });
    }

    if (rateMax) {
      filtered = filtered.filter(contractor => {
        const contractorRate = extractRateNumber(contractor.hourlyRate);
        return contractorRate <= Number.parseInt(rateMax);
      });
    }

    setFilteredContractors(filtered);
  }, [searchTerm, locationFilter, specialtyFilter, availabilityFilter, rateMin, rateMax, showOnlineOnly]);

  // Real-time search effect
  useEffect(() => {
    handleSearch();
  }, [handleSearch]);

  const extractRateNumber = (rateString: string) => {
    const match = rateString.match(/\$(\d+)/);
    return match ? Number.parseInt(match[1]) : 0;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocationFilter('all');
    setSpecialtyFilter('all');
    setAvailabilityFilter('all');
    setRateMin('');
    setRateMax('');
    setShowOnlineOnly(false);
    setFilteredContractors(mockContractors);
  };

  const handleContactContractor = (contractorId: number) => {
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

    const contractor = mockContractors.find(c => c.id === contractorId);
    showToast({
      type: 'success',
      title: 'Message Sent!',
      message: `Opening conversation with ${contractor?.name || 'contractor'}...`,
      duration: 3000
    });

    setTimeout(() => {
      window.location.href = `/messages?contractor=${contractorId}`;
    }, 1500);
  };

  const handleHireContractor = (contractorId: number) => {
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

    const contractor = mockContractors.find(c => c.id === contractorId);
    showToast({
      type: 'success',
      title: 'Starting Hire Process',
      message: `Preparing hire workflow for ${contractor?.name || 'contractor'}...`,
      duration: 3000
    });

    setTimeout(() => {
      window.location.href = `/hire?contractor=${contractorId}`;
    }, 1500);
  };

  const handleContractorSelect = (contractor: typeof mockContractors[0]) => {
    setSelectedContractor(contractor);
    if (viewMode === 'map') {
      // Optionally switch to grid view to show contractor details
      setViewMode('grid');
    }
  };

  // Get contractors with portfolios for portfolio view
  const contractorsWithPortfolios = mockContractors.filter(c => c.portfolio && c.portfolio.length > 0);

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                ← Back to Home
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <h1 className="text-2xl font-bold text-nexfield-slate">Find Contractors</h1>
            </div>
            <div className="flex items-center space-x-4">
              {/* View Mode Toggle */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    viewMode === 'grid' ? 'bg-white text-nexfield-emerald shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                  <span>Grid</span>
                </button>
                <button
                  onClick={() => setViewMode('map')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    viewMode === 'map' ? 'bg-white text-nexfield-emerald shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Map className="w-4 h-4" />
                  <span>Map</span>
                </button>
                <button
                  onClick={() => setViewMode('portfolio')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-2 ${
                    viewMode === 'portfolio' ? 'bg-white text-nexfield-emerald shadow-sm' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Camera className="w-4 h-4" />
                  <span>Portfolio</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-sm text-gray-600">
                  {mockContractors.filter(c => c.isOnline).length} contractors online
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Render different views based on mode */}
      {viewMode === 'map' ? (
        <MapView
          contractors={filteredContractors}
          onContractorSelect={handleContractorSelect}
        />
      ) : viewMode === 'portfolio' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedContractor && selectedContractor.portfolio && selectedContractor.portfolio.length > 0 ? (
            <div className="space-y-8">
              {/* Back to Grid Button */}
              <div className="flex items-center space-x-4">
                <Button
                  onClick={() => setViewMode('grid')}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  ← Back to Contractors
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-nexfield-slate">
                    {selectedContractor.name}'s Portfolio
                  </h1>
                  <p className="text-gray-600">{selectedContractor.title}</p>
                </div>
              </div>

              {/* Portfolio Gallery */}
              <PortfolioGallery
                projects={selectedContractor.portfolio}
                contractorName={selectedContractor.name}
              />
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No portfolio selected</h3>
                <p className="text-gray-500 mb-4">Select a contractor from the grid view to see their portfolio</p>
                <Button onClick={() => setViewMode('grid')} variant="outline">
                  View All Contractors
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      ) : (
        <>
          {/* Modern Search and Filters for Grid View */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Hero Search Bar */}
            <div className="bg-gradient-to-r from-nexfield-emerald via-nexfield-sky to-nexfield-emerald bg-[length:200%_100%] animate-gradient-x rounded-2xl p-8 mb-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">Find Your Perfect Contractor</h2>
                <p className="text-white/90">Search through verified energy professionals ready to work</p>
              </div>

              {/* Main Search */}
              <div className="relative max-w-2xl mx-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  placeholder="Search contractors, skills, certifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg rounded-xl border-0 shadow-lg bg-white/95 backdrop-blur-sm focus:bg-white focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>

            {/* Compact Filter Section */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-md border border-gray-200/50">
              {/* Quick Filter Pills - Compact Layout */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-xs font-medium text-gray-600 mr-2">Filters:</span>

                {/* Location Pills - Smaller */}
                {['Houston', 'Midland', 'Odessa', 'Port Arthur'].map((location) => (
                  <button
                    key={location}
                    onClick={() => setLocationFilter(location === locationFilter ? 'all' : location)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      locationFilter === location
                        ? 'bg-nexfield-emerald text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📍 {location}
                  </button>
                ))}

                {/* Specialty Pills - Smaller */}
                {['Welding', 'Safety', 'Drilling', 'Engineering'].map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSpecialtyFilter(specialty === specialtyFilter ? 'all' : specialty)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      specialtyFilter === specialty
                        ? 'bg-nexfield-sky text-white shadow-sm'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🔧 {specialty}
                  </button>
                ))}

                {/* Online Only Toggle - Smaller */}
                <button
                  onClick={() => setShowOnlineOnly(!showOnlineOnly)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center space-x-1 ${
                    showOnlineOnly
                      ? 'bg-green-500 text-white shadow-sm'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className={`w-1.5 h-1.5 rounded-full ${showOnlineOnly ? 'bg-white' : 'bg-green-500'} animate-pulse`} />
                  <span>Online</span>
                </button>

                {/* Clear All - If any filters active */}
                {(searchTerm || locationFilter !== 'all' || specialtyFilter !== 'all' || availabilityFilter !== 'all' || rateMin || rateMax || showOnlineOnly) && (
                  <button
                    onClick={clearAllFilters}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-all ml-2"
                  >
                    ✕ Clear All
                  </button>
                )}
              </div>

              {/* Advanced Filters - Collapsible but more compact */}
              <details className="group">
                <summary className="cursor-pointer text-nexfield-emerald font-medium hover:text-nexfield-emerald/80 transition-colors list-none flex items-center space-x-1 text-sm">
                  <Filter className="w-3 h-3" />
                  <span>More Filters</span>
                  <span className="group-open:rotate-180 transition-transform text-xs">▼</span>
                </summary>

                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Rate Range - Compact */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">Rate Range</label>
                      <div className="flex space-x-1">
                        <Input
                          type="number"
                          placeholder="Min"
                          value={rateMin}
                          onChange={(e) => setRateMin(e.target.value)}
                          className="text-xs py-1 px-2 h-8 rounded border-gray-300"
                        />
                        <span className="flex items-center text-gray-400 text-xs">—</span>
                        <Input
                          type="number"
                          placeholder="Max"
                          value={rateMax}
                          onChange={(e) => setRateMax(e.target.value)}
                          className="text-xs py-1 px-2 h-8 rounded border-gray-300"
                        />
                      </div>
                    </div>

                    {/* Availability - Compact */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">Availability</label>
                      <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                        <SelectTrigger className="h-8 text-xs rounded border-gray-300">
                          <SelectValue placeholder="Any" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any Availability</SelectItem>
                          <SelectItem value="immediately">🚀 Available Now</SelectItem>
                          <SelectItem value="week">📅 This Week</SelectItem>
                          <SelectItem value="projects">💼 For Projects</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Location Select - Compact */}
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-gray-600">All Locations</label>
                      <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="h-8 text-xs rounded border-gray-300">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Locations</SelectItem>
                          <SelectItem value="Houston">📍 Houston, TX</SelectItem>
                          <SelectItem value="Midland">📍 Midland, TX</SelectItem>
                          <SelectItem value="Odessa">📍 Odessa, TX</SelectItem>
                          <SelectItem value="Port Arthur">📍 Port Arthur, TX</SelectItem>
                          <SelectItem value="Galveston">📍 Galveston, TX</SelectItem>
                          <SelectItem value="Texas City">📍 Texas City, TX</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </details>

              {/* Active Filter Count - Compact */}
              {(searchTerm || locationFilter !== 'all' || specialtyFilter !== 'all' || availabilityFilter !== 'all' || rateMin || rateMax || showOnlineOnly) && (
                <div className="mt-2 text-xs text-gray-600">
                  <span className="bg-nexfield-emerald/10 text-nexfield-emerald px-2 py-1 rounded-full">
                    {[searchTerm, locationFilter !== 'all' ? locationFilter : null, specialtyFilter !== 'all' ? specialtyFilter : null, availabilityFilter !== 'all' ? 'availability' : null, rateMin || rateMax ? 'rate' : null, showOnlineOnly ? 'online' : null].filter(Boolean).length} active filters
                  </span>
                </div>
              )}
            </div>

            {/* Grid View Results */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-nexfield-slate">
                  {filteredContractors.length} Contractor{filteredContractors.length !== 1 ? 's' : ''} Found
                </h2>
                <div className="text-sm text-gray-600">
                  Showing {filteredContractors.length} of {mockContractors.length} contractors
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredContractors.map((contractor) => (
                  <Card key={contractor.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        {/* Avatar and Online Status */}
                        <div className="relative">
                          <img
                            src={contractor.avatar}
                            alt={contractor.name}
                            className="w-16 h-16 rounded-full object-cover"
                            crossOrigin="anonymous"
                          />
                          {contractor.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>

                        {/* Contractor Info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-1">
                                <h3 className="text-lg font-semibold text-nexfield-slate">{contractor.name}</h3>
                                {contractor.verified && (
                                  <CheckCircle className="w-4 h-4 text-blue-500" />
                                )}
                                {contractor.portfolio && contractor.portfolio.length > 0 && (
                                  <div className="flex items-center space-x-1">
                                    <Camera className="w-4 h-4 text-nexfield-sky" title="Has portfolio" />
                                    <span className="text-xs text-nexfield-sky font-medium">{contractor.portfolio.length}</span>
                                  </div>
                                )}
                              </div>
                              <p className="text-gray-600">{contractor.title}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-nexfield-slate">{contractor.hourlyRate}/hr</p>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{contractor.rating}</span>
                                <span className="text-sm text-gray-500">({contractor.reviewCount})</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {contractor.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-4 h-4 mr-1" />
                              {contractor.completedJobs} jobs
                            </div>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {contractor.isOnline ? (
                                <span className="text-green-600 font-medium">Online now</span>
                              ) : (
                                <span>{contractor.lastSeen}</span>
                              )}
                            </div>
                          </div>

                          <p className="text-gray-700 text-sm mb-3 line-clamp-2">{contractor.description}</p>

                          {/* Specializations */}
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {contractor.specializations.slice(0, 3).map((spec, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {spec}
                                </Badge>
                              ))}
                              {contractor.specializations.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{contractor.specializations.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Certifications */}
                          <div className="mb-4">
                            <div className="flex items-center space-x-1 mb-1">
                              <Award className="w-3 h-3 text-nexfield-emerald" />
                              <span className="text-xs font-medium text-gray-700">Key Certifications:</span>
                            </div>
                            <div className="flex flex-wrap gap-1">
                              {contractor.certifications.slice(0, 3).map((cert, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {cert}
                                </Badge>
                              ))}
                              {contractor.certifications.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{contractor.certifications.length - 3} more
                                </Badge>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-3 gap-2">
                            <Link href={`/contractors/${contractor.id}`} className="col-span-3">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full hover:bg-nexfield-emerald/10 hover:text-nexfield-emerald hover:border-nexfield-emerald/30 transition-colors"
                              >
                                View Full Profile
                              </Button>
                            </Link>
                            <Button
                              onClick={() => handleContactContractor(contractor.id)}
                              variant="outline"
                              size="sm"
                              className="flex items-center justify-center space-x-1"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span className="hidden sm:inline">Message</span>
                            </Button>
                            <Button
                              onClick={() => handleHireContractor(contractor.id)}
                              size="sm"
                              className="col-span-2 bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
                            >
                              Hire Now
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredContractors.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">No contractors found</h3>
                    <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {!isAuthenticated && (
              <Card className="mt-8 bg-gradient-to-r from-nexfield-emerald to-nexfield-sky text-white">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-4">Ready to Hire Top Contractors?</h3>
                  <p className="text-xl mb-6">Join NexField to connect with verified energy professionals</p>
                  <div className="space-x-4">
                    <Link href="/signup">
                      <Button size="lg" className="bg-white text-nexfield-emerald hover:bg-gray-100">
                        Get Started
                      </Button>
                    </Link>
                    <Link href="/signin">
                      <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-nexfield-emerald">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}
    </div>
  );
}
