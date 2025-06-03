'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Filter, MapPin, DollarSign, Clock, Briefcase, Plus, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

// Mock job data
const mockJobs = [
  {
    id: 1,
    title: "Pipeline Welder - Urgent",
    company: "Gulf Coast Energy",
    location: "Houston, TX",
    type: "Contract",
    salary: "$85-120/hr",
    posted: "2 days ago",
    description: "Seeking experienced pipeline welder for large infrastructure project. Must have API 1104 certification.",
    requirements: ["API 1104 Certification", "5+ years experience", "OSHA 30", "Valid TWIC Card"],
    tags: ["Welding", "Pipeline", "Urgent"]
  },
  {
    id: 2,
    title: "Safety Inspector",
    company: "Texas Energy Solutions",
    location: "Midland, TX",
    type: "Full-time",
    salary: "$75,000-90,000",
    posted: "1 week ago",
    description: "Lead safety inspector for drilling operations. Responsible for ensuring compliance with all safety regulations.",
    requirements: ["OSHA 500 Certification", "3+ years inspection experience", "H2S Alive", "First Aid/CPR"],
    tags: ["Safety", "Inspection", "Full-time"]
  },
  {
    id: 3,
    title: "Rig Operator",
    company: "Permian Basin Drilling",
    location: "Odessa, TX",
    type: "Contract",
    salary: "$65-80/hr",
    posted: "3 days ago",
    description: "Experienced rig operator needed for drilling operations in the Permian Basin.",
    requirements: ["5+ years rig experience", "Clean driving record", "Physical fitness", "Team player"],
    tags: ["Drilling", "Operations", "Experience Required"]
  },
  {
    id: 4,
    title: "Process Engineer",
    company: "Refinery Systems Inc",
    location: "Port Arthur, TX",
    type: "Full-time",
    salary: "$95,000-120,000",
    posted: "5 days ago",
    description: "Process engineer for refinery optimization and troubleshooting. Bachelor's degree in Chemical Engineering required.",
    requirements: ["BS Chemical Engineering", "3+ years refinery experience", "Process simulation software", "Problem solving skills"],
    tags: ["Engineering", "Process", "Refinery"]
  },
  {
    id: 5,
    title: "Maintenance Technician",
    company: "Offshore Energy Corp",
    location: "Galveston, TX",
    type: "Contract",
    salary: "$70-85/hr",
    posted: "1 day ago",
    description: "Maintenance technician for offshore platform. Must be willing to work rotational schedule.",
    requirements: ["Mechanical aptitude", "Offshore experience preferred", "Basic Safety Training", "Medical clearance"],
    tags: ["Maintenance", "Offshore", "Rotational"]
  }
];

export default function JobsPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [salaryMin, setSalaryMin] = useState('');
  const [salaryMax, setSalaryMax] = useState('');
  const [requiredCertifications, setRequiredCertifications] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);

  const handleSearch = () => {
    let filtered = mockJobs;

    if (searchTerm) {
      filtered = filtered.filter(job =>
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (locationFilter) {
      filtered = filtered.filter(job =>
        job.location.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    if (typeFilter) {
      filtered = filtered.filter(job => job.type === typeFilter);
    }

    // Advanced filters
    if (salaryMin) {
      filtered = filtered.filter(job => {
        const jobSalary = extractSalaryNumber(job.salary);
        return jobSalary >= Number.parseInt(salaryMin);
      });
    }

    if (salaryMax) {
      filtered = filtered.filter(job => {
        const jobSalary = extractSalaryNumber(job.salary);
        return jobSalary <= Number.parseInt(salaryMax);
      });
    }

    if (requiredCertifications) {
      filtered = filtered.filter(job =>
        job.requirements.some(req =>
          req.toLowerCase().includes(requiredCertifications.toLowerCase())
        )
      );
    }

    if (experienceLevel) {
      filtered = filtered.filter(job =>
        job.requirements.some(req =>
          req.toLowerCase().includes(experienceLevel.toLowerCase())
        )
      );
    }

    setFilteredJobs(filtered);
  };

  const extractSalaryNumber = (salaryString: string) => {
    // Extract numeric value from salary string (e.g., "$85-120/hr" -> 85)
    const match = salaryString.match(/\$(\d+)/);
    return match ? Number.parseInt(match[1]) : 0;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setLocationFilter('');
    setTypeFilter('');
    setSalaryMin('');
    setSalaryMax('');
    setRequiredCertifications('');
    setExperienceLevel('');
    setFilteredJobs(mockJobs);
  };

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'Full-time': return 'bg-green-100 text-green-800';
      case 'Contract': return 'bg-blue-100 text-blue-800';
      case 'Part-time': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleJobApplication = (jobId: number) => {
    if (!isAuthenticated) {
      alert('Please sign in to apply for jobs.');
      window.location.href = '/signin';
      return;
    }

    // Simulate application process
    alert('Application submitted successfully! You can track your application status in the Applications page.');

    // In a real app, this would create an application record
    console.log(`Applied to job ${jobId}`);
  };

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
              <h1 className="text-2xl font-bold text-nexfield-slate">Job Board</h1>
            </div>
            {isAuthenticated && (
              <Link href="/jobs/post">
                <Button className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Post a Job
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            {/* Basic Filters */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search jobs, companies, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div>
                <Select value={locationFilter} onValueChange={setLocationFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="Houston">Houston, TX</SelectItem>
                    <SelectItem value="Midland">Midland, TX</SelectItem>
                    <SelectItem value="Odessa">Odessa, TX</SelectItem>
                    <SelectItem value="Port Arthur">Port Arthur, TX</SelectItem>
                    <SelectItem value="Galveston">Galveston, TX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Advanced Filters Toggle */}
            <div className="mt-4 flex items-center justify-center">
              <Button
                variant="outline"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                className="mr-4"
              >
                <Filter className="w-4 h-4 mr-2" />
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
              </Button>
              <Button onClick={handleSearch} className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white mr-2">
                <Search className="w-4 h-4 mr-2" />
                Search Jobs
              </Button>
              <Button variant="outline" onClick={clearAllFilters}>
                Clear All
              </Button>
            </div>

            {/* Advanced Filters */}
            {showAdvancedFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Advanced Filters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Salary ($/hr)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 50"
                      value={salaryMin}
                      onChange={(e) => setSalaryMin(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Salary ($/hr)</label>
                    <Input
                      type="number"
                      placeholder="e.g., 150"
                      value={salaryMax}
                      onChange={(e) => setSalaryMax(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Required Certifications</label>
                    <Input
                      placeholder="e.g., OSHA, H2S, API"
                      value={requiredCertifications}
                      onChange={(e) => setRequiredCertifications(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
                    <Select value={experienceLevel} onValueChange={setExperienceLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Any Experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Experience</SelectItem>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="senior">Senior Level (5+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Quick Certification Filters:</h4>
                  <div className="flex flex-wrap gap-2">
                    {['OSHA 30', 'H2S Alive', 'API 1104', 'TWIC Card', 'First Aid/CPR'].map((cert) => (
                      <Button
                        key={cert}
                        variant="outline"
                        size="sm"
                        onClick={() => setRequiredCertifications(cert)}
                        className={requiredCertifications === cert ? 'bg-nexfield-emerald text-white' : ''}
                      >
                        {cert}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Job Listings */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-nexfield-slate">
              {filteredJobs.length} Jobs Found
            </h2>
            <div className="text-sm text-gray-600">
              Showing {filteredJobs.length} of {mockJobs.length} jobs
            </div>
          </div>

          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-semibold text-nexfield-slate">{job.title}</h3>
                        <Badge className={`${getJobTypeColor(job.type)} border-none`}>
                          {job.type}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4 text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-1" />
                          {job.company}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {job.salary}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        Save
                      </Button>
                      <Button
                        onClick={() => handleJobApplication(job.id)}
                        size="sm"
                        className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{job.description}</p>

                  <div className="mb-4">
                    <h4 className="font-semibold text-sm text-nexfield-slate mb-2">Requirements:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                      {job.requirements.map((req, index) => (
                        <div key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-nexfield-emerald rounded-full mr-2" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No jobs found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search criteria or filters</p>
                <Button onClick={() => {
                  setSearchTerm('');
                  setLocationFilter('');
                  setTypeFilter('');
                  setFilteredJobs(mockJobs);
                }} variant="outline">
                  Clear Filters
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Call to Action for Non-Authenticated Users */}
        {!isAuthenticated && (
          <Card className="mt-8 bg-gradient-to-r from-nexfield-emerald to-nexfield-sky text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Find Your Next Opportunity?</h3>
              <p className="text-xl mb-6">Join thousands of energy professionals on NexField</p>
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
    </div>
  );
}
