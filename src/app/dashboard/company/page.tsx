'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Search, Filter, Users, Briefcase, DollarSign, Clock, Star, MapPin, Calendar, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock company data
const companyData = {
  name: "Gulf Coast Energy",
  type: "Oil & Gas Operator",
  location: "Texas City, TX",
  activeJobs: 8,
  totalHires: 156,
  contractorPool: 45
};

// Mock posted jobs
const postedJobs = [
  {
    id: 1,
    title: "Pipeline Welder - Urgent",
    location: "Baytown, TX",
    rate: "$95/hr",
    duration: "2-3 weeks",
    posted: "2 hours ago",
    applications: 12,
    status: "Active",
    urgent: true,
    description: "Experienced pipeline welder needed for offshore pipeline repairs."
  },
  {
    id: 2,
    title: "Maintenance Supervisor",
    location: "Texas City, TX",
    rate: "$85/hr",
    duration: "3 months",
    posted: "1 day ago",
    applications: 8,
    status: "Active",
    urgent: false,
    description: "Lead maintenance team for refinery turnaround project."
  },
  {
    id: 3,
    title: "Safety Inspector",
    location: "Galveston, TX",
    rate: "$70/hr",
    duration: "6 weeks",
    posted: "3 days ago",
    applications: 15,
    status: "Active",
    urgent: false,
    description: "Conduct safety inspections and compliance audits."
  }
];

// Mock contractor applications
const applications = [
  {
    id: 1,
    jobTitle: "Pipeline Welder - Urgent",
    contractor: {
      name: "John Martinez",
      rating: 4.8,
      experience: "8 years",
      location: "Texas City, TX",
      hourlyRate: "$85-120",
      avatar: "/api/placeholder/40/40"
    },
    appliedDate: "2 hours ago",
    status: "New",
    match: 95
  },
  {
    id: 2,
    jobTitle: "Pipeline Welder - Urgent",
    contractor: {
      name: "Sarah Williams",
      rating: 4.9,
      experience: "12 years",
      location: "Houston, TX",
      hourlyRate: "$90-130",
      avatar: "/api/placeholder/40/40"
    },
    appliedDate: "4 hours ago",
    status: "Reviewed",
    match: 88
  },
  {
    id: 3,
    jobTitle: "Maintenance Supervisor",
    contractor: {
      name: "Mike Rodriguez",
      rating: 4.7,
      experience: "15 years",
      location: "Baytown, TX",
      hourlyRate: "$75-110",
      avatar: "/api/placeholder/40/40"
    },
    appliedDate: "1 day ago",
    status: "Shortlisted",
    match: 92
  }
];

// Mock active contractors
const activeContractors = [
  {
    id: 1,
    name: "David Chen",
    project: "Refinery Turnaround - Unit 3",
    startDate: "Nov 15, 2024",
    progress: 60,
    rating: 4.9,
    payment: "$15,600"
  },
  {
    id: 2,
    name: "Lisa Thompson",
    project: "Pipeline Integrity Check",
    startDate: "Dec 1, 2024",
    progress: 25,
    rating: 4.8,
    payment: "$8,400"
  }
];

export default function CompanyDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 border-l border-gray-300"></div>
              <h1 className="text-2xl font-bold text-nexfield-slate">Company Dashboard</h1>
            </div>
            <Button className="bg-nexfield-emerald hover:bg-nexfield-emerald/90">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">My Jobs</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="contractors">Active Contractors</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Company Summary */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{companyData.name}</CardTitle>
                    <CardDescription className="text-lg">{companyData.type}</CardDescription>
                    <div className="flex items-center mt-2">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                      <span className="text-gray-600">{companyData.location}</span>
                    </div>
                  </div>
                  <Badge className="bg-nexfield-emerald text-white">Verified Company</Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-nexfield-emerald" />
                    <div>
                      <p className="text-sm text-gray-600">Active Jobs</p>
                      <p className="text-2xl font-bold">{companyData.activeJobs}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-nexfield-sky" />
                    <div>
                      <p className="text-sm text-gray-600">Total Hires</p>
                      <p className="text-2xl font-bold">{companyData.totalHires}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600">Contractor Pool</p>
                      <p className="text-2xl font-bold">{companyData.contractorPool}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-nexfield-slate" />
                    <div>
                      <p className="text-sm text-gray-600">Monthly Spend</p>
                      <p className="text-2xl font-bold">$85k</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{app.contractor.name}</p>
                          <p className="text-sm text-gray-600">{app.jobTitle}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={app.status === 'New' ? 'destructive' : 'secondary'}>
                            {app.status}
                          </Badge>
                          <p className="text-xs text-gray-500 mt-1">{app.appliedDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Applications
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Job Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {postedJobs.slice(0, 3).map((job) => (
                      <div key={job.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{job.title}</p>
                          <p className="text-sm text-gray-600">{job.applications} applications</p>
                        </div>
                        <div className="text-right">
                          <Badge className={job.urgent ? 'bg-red-500' : 'bg-green-500'}>
                            {job.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View All Jobs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* My Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Posted Jobs</h2>
              <Button className="bg-nexfield-emerald hover:bg-nexfield-emerald/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </div>

            <div className="space-y-4">
              {postedJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          {job.urgent && (
                            <Badge className="bg-red-500 text-white">Urgent</Badge>
                          )}
                          <Badge variant="outline">{job.status}</Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {job.location}
                          </div>
                          <div className="flex items-center">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {job.rate}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {job.duration}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            Posted {job.posted}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{job.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm font-medium">{job.applications} applications</span>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Applications
                          </Button>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button size="sm">Edit Job</Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message Applicants
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search applications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex space-x-4">
                        <div className="w-12 h-12 bg-nexfield-emerald rounded-full flex items-center justify-center text-white font-semibold">
                          {app.contractor.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-semibold">{app.contractor.name}</h3>
                            <div className="flex items-center">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-sm font-medium ml-1">{app.contractor.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-2">Applied for: {app.jobTitle}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                            <span>{app.contractor.experience} experience</span>
                            <span>{app.contractor.location}</span>
                            <span>{app.contractor.hourlyRate}/hr</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge variant={
                              app.status === 'New' ? 'destructive' :
                              app.status === 'Reviewed' ? 'secondary' : 'default'
                            }>
                              {app.status}
                            </Badge>
                            <span className="text-sm text-gray-500">Applied {app.appliedDate}</span>
                            <div className="flex items-center space-x-1">
                              <span className="text-sm font-medium">Match: {app.match}%</span>
                              <div className="w-16 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-nexfield-emerald h-2 rounded-full"
                                  style={{ width: `${app.match}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button size="sm" className="bg-nexfield-emerald hover:bg-nexfield-emerald/90">
                          View Profile
                        </Button>
                        <Button variant="outline" size="sm">
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          Shortlist
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Active Contractors Tab */}
          <TabsContent value="contractors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Contractors</h2>
              <Button variant="outline">View All Contractors</Button>
            </div>

            <div className="space-y-4">
              {activeContractors.map((contractor) => (
                <Card key={contractor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold">{contractor.name}</h3>
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium ml-1">{contractor.rating}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-3">{contractor.project}</p>

                        <div className="flex items-center space-x-6 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Start Date</p>
                            <p className="font-medium">{contractor.startDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Progress</p>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-nexfield-emerald h-2 rounded-full"
                                  style={{ width: `${contractor.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{contractor.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Total Payment</p>
                            <p className="font-medium text-nexfield-emerald">{contractor.payment}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button size="sm">View Details</Button>
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button variant="outline" size="sm">
                          Update Project
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Time to Hire</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">3.2 days</p>
                  <p className="text-sm text-green-600">-15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Application Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">12.5</p>
                  <p className="text-sm text-gray-600">avg applications per job</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">78%</p>
                  <p className="text-sm text-green-600">project completion rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Cost Savings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">25%</p>
                  <p className="text-sm text-green-600">vs traditional hiring</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Hiring Insights</CardTitle>
                <CardDescription>Key metrics for your hiring performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Most In-Demand Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {["Pipeline Welding", "H2S Safety", "OSHA 30", "Confined Space"].map((skill) => (
                        <Badge key={skill} className="bg-nexfield-sky text-white">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Top Performing Contractors</h4>
                    <p className="text-sm text-gray-600">Based on ratings and project completion</p>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Recommended Actions</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Consider increasing rates for urgent positions</li>
                      <li>• Add more detailed job descriptions to attract quality candidates</li>
                      <li>• Expand search radius for specialized roles</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
