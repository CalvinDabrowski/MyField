'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageCircle, Clock, CheckCircle, XCircle, Eye, Calendar, Briefcase, MapPin, DollarSign, Send, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

// Mock application data
const mockApplications = [
  {
    id: 1,
    jobTitle: "Pipeline Welder - Urgent",
    company: "Gulf Coast Energy",
    location: "Houston, TX",
    salary: "$85-120/hr",
    appliedDate: "2025-01-15",
    status: "under_review",
    lastUpdate: "2025-01-18",
    messages: [
      {
        id: 1,
        sender: "company",
        senderName: "Sarah Johnson - HR Manager",
        message: "Thank you for your application! We're reviewing your qualifications and will get back to you within 3-5 business days.",
        timestamp: "2025-01-16T10:30:00Z",
        read: true
      },
      {
        id: 2,
        sender: "user",
        senderName: "You",
        message: "Thank you for the quick response. I'm very interested in this position and available for an interview at your convenience.",
        timestamp: "2025-01-16T14:20:00Z",
        read: true
      },
      {
        id: 3,
        sender: "company",
        senderName: "Sarah Johnson - HR Manager",
        message: "Great! We'd like to schedule a phone interview for this Friday at 2 PM. Please confirm if this works for you.",
        timestamp: "2025-01-18T09:15:00Z",
        read: false
      }
    ]
  },
  {
    id: 2,
    jobTitle: "Safety Inspector",
    company: "Texas Energy Solutions",
    location: "Midland, TX",
    salary: "$75,000-90,000",
    appliedDate: "2025-01-10",
    status: "accepted",
    lastUpdate: "2025-01-17",
    messages: [
      {
        id: 1,
        sender: "company",
        senderName: "Mike Rodriguez - Operations Manager",
        message: "Congratulations! We're pleased to offer you the Safety Inspector position. Please review the attached offer letter and let us know if you have any questions.",
        timestamp: "2025-01-17T11:00:00Z",
        read: true
      }
    ]
  },
  {
    id: 3,
    jobTitle: "Rig Operator",
    company: "Permian Basin Drilling",
    location: "Odessa, TX",
    salary: "$65-80/hr",
    appliedDate: "2025-01-12",
    status: "rejected",
    lastUpdate: "2025-01-16",
    messages: [
      {
        id: 1,
        sender: "company",
        senderName: "Jennifer Smith - Recruitment",
        message: "Thank you for your interest in our Rig Operator position. Unfortunately, we've decided to move forward with other candidates. We encourage you to apply for future openings.",
        timestamp: "2025-01-16T16:45:00Z",
        read: true
      }
    ]
  }
];

export default function ApplicationsPage() {
  const { user, isAuthenticated } = useAuth();
  const [selectedApplication, setSelectedApplication] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [applications, setApplications] = useState(mockApplications);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'accepted':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Eye className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'under_review':
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">Under Review</Badge>;
      case 'accepted':
        return <Badge className="bg-green-100 text-green-800 border-green-300">Accepted</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-800 border-red-300">Rejected</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300">Applied</Badge>;
    }
  };

  const sendMessage = (applicationId: number) => {
    if (!newMessage.trim()) return;

    const updatedApplications = applications.map(app => {
      if (app.id === applicationId) {
        const newMsg = {
          id: app.messages.length + 1,
          sender: "user" as const,
          senderName: "You",
          message: newMessage.trim(),
          timestamp: new Date().toISOString(),
          read: true
        };
        return {
          ...app,
          messages: [...app.messages, newMsg],
          lastUpdate: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    });

    setApplications(updatedApplications);
    setNewMessage('');
  };

  const getUnreadCount = (messages: Array<{read: boolean; sender: string}>) => {
    return messages.filter(msg => !msg.read && msg.sender === 'company').length;
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-nexfield-ivory flex items-center justify-center">
        <Card>
          <CardContent className="p-8 text-center">
            <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to view your applications.</p>
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

  const selectedApp = selectedApplication ? applications.find(app => app.id === selectedApplication) : null;

  return (
    <div className="min-h-screen bg-nexfield-ivory">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/jobs" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Jobs
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <h1 className="text-2xl font-bold text-nexfield-slate">My Applications</h1>
            </div>
            <div className="text-sm text-gray-600">
              {applications.length} Application{applications.length !== 1 ? 's' : ''}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Your Applications</CardTitle>
                <CardDescription>
                  Track the status of your job applications
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applications.map((application) => {
                  const unreadCount = getUnreadCount(application.messages);
                  return (
                    <div
                      key={application.id}
                      onClick={() => setSelectedApplication(application.id)}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 ${
                        selectedApplication === application.id ? 'border-nexfield-emerald bg-nexfield-emerald/5' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-nexfield-slate truncate">{application.jobTitle}</h3>
                          <p className="text-sm text-gray-600">{application.company}</p>
                        </div>
                        <div className="flex items-center space-x-2 ml-2">
                          {unreadCount > 0 && (
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 text-nexfield-emerald mr-1" />
                              <span className="text-xs font-medium text-nexfield-emerald">{unreadCount}</span>
                            </div>
                          )}
                          {getStatusIcon(application.status)}
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{application.location}</span>
                        <span>•</span>
                        <DollarSign className="w-3 h-3" />
                        <span>{application.salary}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        {getStatusBadge(application.status)}
                        <span className="text-xs text-gray-500">
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  );
                })}

                {applications.length === 0 && (
                  <div className="text-center py-8">
                    <Briefcase className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-4">No applications yet</p>
                    <Link href="/jobs">
                      <Button size="sm">Browse Jobs</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Application Details & Messages */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <div className="space-y-6">
                {/* Application Details */}
                <Card>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle>{selectedApp.jobTitle}</CardTitle>
                        <CardDescription>{selectedApp.company}</CardDescription>
                      </div>
                      {getStatusBadge(selectedApp.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{selectedApp.location}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                        <span>{selectedApp.salary}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                        <span>Applied {new Date(selectedApp.appliedDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Messages */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Communication
                    </CardTitle>
                    <CardDescription>
                      Chat with the hiring team about this position
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4 max-h-96 overflow-y-auto mb-4">
                      {selectedApp.messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              message.sender === 'user'
                                ? 'bg-nexfield-emerald text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            <div className="text-sm font-medium mb-1">{message.senderName}</div>
                            <div className="text-sm">{message.message}</div>
                            <div className={`text-xs mt-1 ${
                              message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                            }`}>
                              {new Date(message.timestamp).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="border-t pt-4">
                      <div className="flex space-x-2">
                        <Textarea
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type your message..."
                          className="flex-1 min-h-[80px]"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              sendMessage(selectedApp.id);
                            }
                          }}
                        />
                        <div className="flex flex-col space-y-2">
                          <Button
                            onClick={() => sendMessage(selectedApp.id)}
                            disabled={!newMessage.trim()}
                            size="sm"
                            className="bg-nexfield-emerald hover:bg-nexfield-emerald/90"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Press Enter to send, Shift+Enter for new line
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Select an Application</h3>
                  <p className="text-gray-500">Choose an application from the list to view details and communicate with employers</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
