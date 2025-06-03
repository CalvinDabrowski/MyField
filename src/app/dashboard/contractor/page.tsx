'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Calendar, DollarSign, Clock, User, Briefcase, Award, Settings, Bell, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data for the contractor
const contractorData = {
  name: "John Martinez",
  title: "Senior Pipeline Welder",
  rating: 4.8,
  totalJobs: 47,
  location: "Texas City, TX",
  hourlyRate: "$85-120",
  certifications: ["OSHA 30", "H2S Alive", "API 1104", "TWIC Card"],
  skills: ["Pipeline Welding", "Pressure Testing", "Non-Destructive Testing", "Safety Management"],
  profileCompletion: 85
};

// Mock job listings
const availableJobs = [
  {
    id: 1,
    title: "Pipeline Welder - Urgent",
    company: "Gulf Coast Energy",
    location: "Baytown, TX",
    rate: "$95/hr",
    duration: "2-3 weeks",
    posted: "2 hours ago",
    description: "Experienced pipeline welder needed for offshore pipeline repairs. Must have current H2S certification.",
    requirements: ["5+ years pipeline experience", "H2S Alive", "OSHA 30", "Own welding equipment"],
    urgent: true
  },
  {
    id: 2,
    title: "Maintenance Technician",
    company: "Refinery Services LLC",
    location: "Texas City, TX",
    rate: "$75/hr",
    duration: "1 month",
    posted: "1 day ago",
    description: "Routine maintenance and inspection work at refinery facility. Day shift position.",
    requirements: ["Mechanical experience", "Safety certifications", "Reliability"],
    urgent: false
  },
  {
    id: 3,
    title: "Lead Inspector",
    company: "Coastal Pipeline Corp",
    location: "Galveston, TX",
    rate: "$110/hr",
    duration: "6 weeks",
    posted: "3 days ago",
    description: "Lead inspection team for new pipeline installation project. Leadership experience required.",
    requirements: ["Inspection certification", "Leadership experience", "API knowledge"],
    urgent: false
  }
];

// Mock active projects
const activeProjects = [
  {
    id: 1,
    title: "Refinery Turnaround - Unit 5",
    company: "Coastal Refining",
    progress: 75,
    dueDate: "Dec 15, 2024",
    payment: "$12,500",
    status: "In Progress"
  },
  {
    id: 2,
    title: "Pipeline Integrity Assessment",
    company: "Energy Transport Inc",
    progress: 30,
    dueDate: "Jan 10, 2025",
    payment: "$8,200",
    status: "Active"
  }
];

export default function ContractorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');

  const filteredJobs = availableJobs.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <h1 className="text-2xl font-bold text-nexfield-slate">Contractor Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="jobs">Browse Jobs</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Profile Summary */}
            <div className="grid lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{contractorData.name}</CardTitle>
                      <CardDescription className="text-lg">{contractorData.title}</CardDescription>
                      <div className="flex items-center mt-2 space-x-4">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{contractorData.rating}</span>
                          <span className="text-gray-500">({contractorData.totalJobs} jobs)</span>
                        </div>
                        <div className="flex items-center text-gray-500">
                          <MapPin className="w-4 h-4 mr-1" />
                          {contractorData.location}
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-nexfield-emerald text-white">
                      {contractorData.hourlyRate}/hr
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Certifications</h4>
                      <div className="flex flex-wrap gap-2">
                        {contractorData.certifications.map((cert, index) => (
                          <Badge key={index} variant="outline">{cert}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Core Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {contractorData.skills.map((skill, index) => (
                          <Badge key={index} className="bg-nexfield-sky text-white">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Profile Completion</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Profile Strength</span>
                        <span>{contractorData.profileCompletion}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-nexfield-emerald h-2 rounded-full"
                          style={{ width: `${contractorData.profileCompletion}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>Complete your profile to get more job opportunities</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Complete Profile
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-5 h-5 text-nexfield-emerald" />
                    <div>
                      <p className="text-sm text-gray-600">Active Projects</p>
                      <p className="text-2xl font-bold">2</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-nexfield-sky" />
                    <div>
                      <p className="text-sm text-gray-600">This Month</p>
                      <p className="text-2xl font-bold">$8,500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-nexfield-slate" />
                    <div>
                      <p className="text-sm text-gray-600">Hours Logged</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm text-gray-600">Job Rating</p>
                      <p className="text-2xl font-bold">{contractorData.rating}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Project milestone completed</p>
                      <p className="text-sm text-gray-600">Refinery Turnaround - Unit 5 • 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">New job application</p>
                      <p className="text-sm text-gray-600">Applied to Pipeline Welder position • 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="font-medium">Certification renewal reminder</p>
                      <p className="text-sm text-gray-600">H2S Alive expires in 30 days • 3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Browse Jobs Tab */}
          <TabsContent value="jobs" className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search jobs, companies, or locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-semibold">{job.title}</h3>
                          {job.urgent && (
                            <Badge className="bg-red-500 text-white">Urgent</Badge>
                          )}
                        </div>
                        <p className="text-gray-600 mb-2">{job.company}</p>
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
                            {job.posted}
                          </div>
                        </div>
                        <p className="text-gray-700 mb-3">{job.description}</p>
                        <div>
                          <p className="text-sm font-medium mb-1">Requirements:</p>
                          <div className="flex flex-wrap gap-1">
                            {job.requirements.map((req, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button className="bg-nexfield-emerald hover:bg-nexfield-emerald/90">
                          Apply Now
                        </Button>
                        <Button variant="outline" size="sm">
                          Save Job
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Projects</h2>
              <Button variant="outline">View All Projects</Button>
            </div>

            <div className="space-y-4">
              {activeProjects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                        <p className="text-gray-600 mb-3">{project.company}</p>

                        <div className="flex items-center space-x-6 mb-4">
                          <div>
                            <p className="text-sm text-gray-500">Progress</p>
                            <div className="flex items-center space-x-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-nexfield-emerald h-2 rounded-full"
                                  style={{ width: `${project.progress}%` }}
                                ></div>
                              </div>
                              <span className="text-sm font-medium">{project.progress}%</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Due Date</p>
                            <p className="font-medium">{project.dueDate}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Payment</p>
                            <p className="font-medium text-nexfield-emerald">{project.payment}</p>
                          </div>
                        </div>

                        <Badge
                          className={project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                        >
                          {project.status}
                        </Badge>
                      </div>
                      <div className="ml-6 flex flex-col space-y-2">
                        <Button size="sm">View Details</Button>
                        <Button variant="outline" size="sm">Update Progress</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Management</CardTitle>
                <CardDescription>Update your professional information and portfolio</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <Button className="bg-nexfield-emerald hover:bg-nexfield-emerald/90">
                    <User className="w-4 h-4 mr-2" />
                    Edit Personal Info
                  </Button>
                  <Button variant="outline">
                    <Award className="w-4 h-4 mr-2" />
                    Add Certifications
                  </Button>
                  <Button variant="outline">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Update Portfolio
                  </Button>
                  <Button variant="outline">
                    <Star className="w-4 h-4 mr-2" />
                    View Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-nexfield-emerald">$145,750</p>
                  <p className="text-sm text-gray-600">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>This Month</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$8,500</p>
                  <p className="text-sm text-green-600">+15% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pending Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">$4,200</p>
                  <Button size="sm" className="mt-2">View Details</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
