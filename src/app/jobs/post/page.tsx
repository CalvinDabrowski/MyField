'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Briefcase, Plus, X, Save, MapPin, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

export default function PostJobPage() {
  const { user, isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newRequirement, setNewRequirement] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    location: '',
    type: '',
    category: '',
    salaryType: 'hourly',
    salaryMin: '',
    salaryMax: '',
    description: '',
    responsibilities: '',
    requirements: [''],
    skills: [''],
    benefits: '',
    duration: '',
    startDate: '',
    urgency: 'normal',
    contactEmail: user?.email || '',
    contactPhone: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setJobData(prev => ({ ...prev, [field]: value }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setJobData(prev => ({
        ...prev,
        requirements: [...prev.requirements.filter(r => r.trim()), newRequirement.trim()]
      }));
      setNewRequirement('');
    }
  };

  const removeRequirement = (index: number) => {
    setJobData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setJobData(prev => ({
        ...prev,
        skills: [...prev.skills.filter(s => s.trim()), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setJobData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const submitJob = async () => {
    setIsLoading(true);
    try {
      // Validate required fields
      if (!jobData.title || !jobData.company || !jobData.location || !jobData.description) {
        alert('Please fill in all required fields');
        return;
      }

      // Simulate job posting
      await new Promise(resolve => setTimeout(resolve, 2000));

      alert('Job posted successfully! It will be reviewed and published shortly.');

      // Reset form or redirect
      window.location.href = '/jobs';
    } catch (error) {
      alert('Failed to post job. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-nexfield-ivory flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to post a job.</p>
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
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/jobs" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <h1 className="text-2xl font-bold text-nexfield-slate">Post a Job</h1>
            </div>
            <Button
              onClick={submitJob}
              disabled={isLoading}
              className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Post Job
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Basic Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Briefcase className="w-5 h-5 mr-2" />
              Job Details
            </CardTitle>
            <CardDescription>
              Provide the basic information about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="title">Job Title *</Label>
                <Input
                  id="title"
                  value={jobData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="e.g., Senior Pipeline Welder"
                />
              </div>
              <div>
                <Label htmlFor="company">Company Name *</Label>
                <Input
                  id="company"
                  value={jobData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  placeholder="Your company name"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="location">Location *</Label>
                <Input
                  id="location"
                  value={jobData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, State"
                />
              </div>
              <div>
                <Label htmlFor="type">Employment Type</Label>
                <Select value={jobData.type} onValueChange={(value) => handleInputChange('type', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-time">Full-time</SelectItem>
                    <SelectItem value="Contract">Contract</SelectItem>
                    <SelectItem value="Part-time">Part-time</SelectItem>
                    <SelectItem value="Temporary">Temporary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={jobData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="welding">Welding</SelectItem>
                    <SelectItem value="drilling">Drilling</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="engineering">Engineering</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="inspection">Inspection</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Job Description *</Label>
              <Textarea
                id="description"
                value={jobData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Describe the position, responsibilities, and what you're looking for..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        {/* Compensation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Compensation
            </CardTitle>
            <CardDescription>
              Set the salary or hourly rate for this position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label htmlFor="salaryType">Pay Type</Label>
                <Select value={jobData.salaryType} onValueChange={(value) => handleInputChange('salaryType', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="annual">Annual Salary</SelectItem>
                    <SelectItem value="project">Project Rate</SelectItem>
                    <SelectItem value="negotiable">Negotiable</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="salaryMin">Minimum Rate</Label>
                <Input
                  id="salaryMin"
                  value={jobData.salaryMin}
                  onChange={(e) => handleInputChange('salaryMin', e.target.value)}
                  placeholder={jobData.salaryType === 'hourly' ? '$25' : '$50,000'}
                />
              </div>
              <div>
                <Label htmlFor="salaryMax">Maximum Rate</Label>
                <Input
                  id="salaryMax"
                  value={jobData.salaryMax}
                  onChange={(e) => handleInputChange('salaryMax', e.target.value)}
                  placeholder={jobData.salaryType === 'hourly' ? '$45' : '$75,000'}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Requirements & Skills */}
        <Card>
          <CardHeader>
            <CardTitle>Requirements & Skills</CardTitle>
            <CardDescription>
              List the required qualifications and desired skills
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label>Job Requirements</Label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="e.g., OSHA 30 Certification, 5+ years experience"
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                  />
                  <Button onClick={addRequirement} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobData.requirements.filter(req => req.trim()).map((req, index) => (
                    <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                      <span>{req}</span>
                      <button
                        onClick={() => removeRequirement(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <Label>Preferred Skills</Label>
              <div className="space-y-3">
                <div className="flex space-x-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g., Pipeline Welding, Safety Management"
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {jobData.skills.filter(skill => skill.trim()).map((skill, index) => (
                    <Badge key={index} variant="outline" className="flex items-center space-x-1">
                      <span>{skill}</span>
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <Card>
          <CardHeader>
            <CardTitle>Additional Information</CardTitle>
            <CardDescription>
              Provide additional details about the position
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="duration">Contract Duration</Label>
                <Input
                  id="duration"
                  value={jobData.duration}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="e.g., 6 months, 1 year, Permanent"
                />
              </div>
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={jobData.startDate}
                  onChange={(e) => handleInputChange('startDate', e.target.value)}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="benefits">Benefits & Perks</Label>
              <Textarea
                id="benefits"
                value={jobData.benefits}
                onChange={(e) => handleInputChange('benefits', e.target.value)}
                placeholder="Health insurance, 401k, paid time off, etc."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={jobData.contactEmail}
                  onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                  placeholder="hr@company.com"
                />
              </div>
              <div>
                <Label htmlFor="urgency">Priority Level</Label>
                <Select value={jobData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="asap">ASAP</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Job Preview</CardTitle>
            <CardDescription>
              This is how your job posting will appear to candidates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg p-6 bg-white">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-nexfield-slate mb-2">{jobData.title || 'Job Title'}</h3>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <span>{jobData.company || 'Company Name'}</span>
                    <span>•</span>
                    <span>{jobData.location || 'Location'}</span>
                    {jobData.salaryMin && jobData.salaryMax && (
                      <>
                        <span>•</span>
                        <span>${jobData.salaryMin}-${jobData.salaryMax}{jobData.salaryType === 'hourly' ? '/hr' : ''}</span>
                      </>
                    )}
                  </div>
                </div>
                {jobData.urgency === 'urgent' && (
                  <Badge className="bg-orange-100 text-orange-800">Urgent</Badge>
                )}
                {jobData.urgency === 'asap' && (
                  <Badge className="bg-red-100 text-red-800">ASAP</Badge>
                )}
              </div>
              <p className="text-gray-700 mb-4">{jobData.description || 'Job description will appear here...'}</p>
              {jobData.requirements.filter(req => req.trim()).length > 0 && (
                <div className="mb-4">
                  <h4 className="font-semibold text-sm mb-2">Requirements:</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {jobData.requirements.filter(req => req.trim()).map((req, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-1.5 h-1.5 bg-nexfield-emerald rounded-full mr-2" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
