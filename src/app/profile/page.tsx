'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, User, Award, Briefcase, Mail, Phone, MapPin, Plus, X, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [newCertification, setNewCertification] = useState('');
  const [newSkill, setNewSkill] = useState('');

  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    company: '',
    title: '',
    bio: '',
    experience: '',
    hourlyRate: '',
    availability: 'available',
    certifications: ['OSHA 30', 'H2S Alive'],
    skills: ['Pipeline Welding', 'Safety Management'],
    profileImage: ''
  });

  useEffect(() => {
    if (user) {
      // Initialize with existing user data
      const nameParts = user.name?.split(' ') || ['', ''];
      setProfileData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts[1] || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setProfileData(prev => ({
        ...prev,
        certifications: [...prev.certifications, newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const saveProfile = async () => {
    setIsLoading(true);
    try {
      // Simulate save
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update user context with new name
      if (user) {
        const updatedUser = {
          ...user,
          name: `${profileData.firstName} ${profileData.lastName}`.trim() || user.name,
          email: profileData.email || user.email
        };
        login(updatedUser);
      }

      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-nexfield-ivory flex items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-center">Please sign in to access your profile.</p>
            <Link href="/signin" className="block mt-4">
              <Button className="w-full">Sign In</Button>
            </Link>
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
              <Link href="/" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <h1 className="text-2xl font-bold text-nexfield-slate">Profile Settings</h1>
            </div>
            <Button
              onClick={saveProfile}
              disabled={isLoading}
              className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="professional">Professional</TabsTrigger>
            <TabsTrigger value="certifications">Skills & Certs</TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    placeholder="City, State"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    placeholder="Tell us about yourself and your experience..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2" />
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Update your work experience and availability
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => handleInputChange('company', e.target.value)}
                      placeholder="Current or previous company"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      value={profileData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="e.g., Senior Pipeline Welder"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select value={profileData.experience} onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years</SelectItem>
                        <SelectItem value="2-5">2-5 years</SelectItem>
                        <SelectItem value="6-10">6-10 years</SelectItem>
                        <SelectItem value="11-15">11-15 years</SelectItem>
                        <SelectItem value="16+">16+ years</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="availability">Availability</Label>
                    <Select value={profileData.availability} onValueChange={(value) => handleInputChange('availability', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="busy">Currently Busy</SelectItem>
                        <SelectItem value="part-time">Part-time Only</SelectItem>
                        <SelectItem value="not-looking">Not Looking</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {user.role === 'contractor' && (
                  <div>
                    <Label htmlFor="hourlyRate">Hourly Rate (Optional)</Label>
                    <Input
                      id="hourlyRate"
                      value={profileData.hourlyRate}
                      onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      placeholder="e.g., $85-120"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills & Certifications Tab */}
          <TabsContent value="certifications" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Certifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Certifications
                  </CardTitle>
                  <CardDescription>
                    Add your professional certifications
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newCertification}
                      onChange={(e) => setNewCertification(e.target.value)}
                      placeholder="e.g., OSHA 30, API 1104"
                      onKeyPress={(e) => e.key === 'Enter' && addCertification()}
                    />
                    <Button onClick={addCertification} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.certifications.map((cert, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center space-x-1">
                        <span>{cert}</span>
                        <button
                          onClick={() => removeCertification(index)}
                          className="ml-1 hover:text-red-600"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2" />
                    Skills
                  </CardTitle>
                  <CardDescription>
                    Add your technical skills and expertise
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., Pipeline Welding, NDT"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
