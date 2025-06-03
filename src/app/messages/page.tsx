'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, MapPin, Clock, Users, CheckCircle, MessageCircle, Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, Check, CheckCheck, Archive, Pin, Trash2, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/toast';

// Enhanced message interface with status
interface Message {
  id: number;
  text: string;
  timestamp: string;
  sender: 'me' | 'them';
  isRead: boolean;
  isDelivered: boolean;
  reaction?: string;
  attachment?: {
    type: 'image' | 'document' | 'link';
    url: string;
    name: string;
  };
}

interface Participant {
  name: string;
  title: string;
  avatar: string;
  isOnline: boolean;
  lastSeen: string;
  isTyping?: boolean;
  location?: string;
  rating?: number;
}

interface Conversation {
  id: number;
  participant: Participant;
  lastMessage: Message;
  messages: Message[];
  isPinned?: boolean;
  isArchived?: boolean;
  unreadCount?: number;
}

// Enhanced mock conversation data with all contractors
const mockConversations: Conversation[] = [
  {
    id: 1,
    participant: {
      name: "Marcus Rodriguez",
      title: "Senior Pipeline Welder",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      lastSeen: "Active now",
      location: "Houston, TX",
      rating: 4.9,
      isTyping: false
    },
    isPinned: true,
    unreadCount: 1,
    lastMessage: {
      id: 6,
      text: "I'm available to start next Monday. Let me know the project details.",
      timestamp: "2025-01-29T14:30:00Z",
      isRead: false,
      isDelivered: true,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        text: "Hi Marcus! I saw your profile and I'm interested in hiring you for a pipeline welding project.",
        timestamp: "2025-01-29T10:15:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 2,
        text: "Hello! Thank you for reaching out. I'd be happy to discuss the project with you. What's the scope and timeline?",
        timestamp: "2025-01-29T10:45:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      },
      {
        id: 3,
        text: "We need welding work on a new natural gas pipeline, approximately 20 miles. Timeline is 6-8 weeks starting February.",
        timestamp: "2025-01-29T11:20:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 4,
        text: "That sounds like a great project. I have extensive experience with natural gas pipelines and API 1104 certification. What's the location?",
        timestamp: "2025-01-29T12:10:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true,
        reaction: "👍"
      },
      {
        id: 5,
        text: "The project is located in East Texas, about 30 miles from Tyler. We can provide housing allowance for out-of-town contractors.",
        timestamp: "2025-01-29T13:45:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 6,
        text: "I'm available to start next Monday. Let me know the project details.",
        timestamp: "2025-01-29T14:30:00Z",
        sender: "them",
        isRead: false,
        isDelivered: true
      }
    ]
  },
  {
    id: 2,
    participant: {
      name: "Sarah Chen",
      title: "Safety Inspector",
      avatar: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastSeen: "3 hours ago",
      location: "Midland, TX",
      rating: 4.8,
      isTyping: false
    },
    unreadCount: 0,
    lastMessage: {
      id: 6,
      text: "Thank you for considering my application. I look forward to hearing from you.",
      timestamp: "2025-01-29T11:20:00Z",
      isRead: true,
      isDelivered: true,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        text: "Hi Sarah, I reviewed your application for the Safety Inspector position. Very impressive background!",
        timestamp: "2025-01-29T09:30:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 2,
        text: "Thank you! I'm very interested in the position. Could you tell me more about the specific safety protocols you follow?",
        timestamp: "2025-01-29T10:15:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      },
      {
        id: 3,
        text: "We follow strict OSHA guidelines and have additional company-specific safety measures. The role involves daily inspections and compliance reporting.",
        timestamp: "2025-01-29T10:45:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 4,
        text: "That aligns perfectly with my experience. I have OSHA 500 certification and 8 years of inspection experience.",
        timestamp: "2025-01-29T11:00:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      },
      {
        id: 5,
        text: "Excellent! We'd like to schedule a phone interview. Are you available this Friday afternoon?",
        timestamp: "2025-01-29T11:10:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 6,
        text: "Thank you for considering my application. I look forward to hearing from you.",
        timestamp: "2025-01-29T11:20:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      }
    ]
  },
  {
    id: 3,
    participant: {
      name: "Jake Thompson",
      title: "Drilling Operations Supervisor",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      lastSeen: "Active now",
      location: "Odessa, TX",
      rating: 4.7,
      isTyping: false
    },
    unreadCount: 0,
    lastMessage: {
      id: 6,
      text: "Sounds good! I'll send over my portfolio and references today.",
      timestamp: "2025-01-28T16:45:00Z",
      isRead: true,
      isDelivered: true,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        text: "Hi Jake, we have an urgent drilling supervisor position available. Are you interested?",
        timestamp: "2025-01-28T14:20:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 2,
        text: "Hello! Yes, I'm very interested. What's the timeline and location?",
        timestamp: "2025-01-28T14:35:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      },
      {
        id: 3,
        text: "It's in the Permian Basin, starting next week. 3-month contract with possibility to extend.",
        timestamp: "2025-01-28T15:10:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 4,
        text: "Perfect timing! I just finished a project and I'm available. Can you send more details about the rig specifications?",
        timestamp: "2025-01-28T15:30:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      },
      {
        id: 5,
        text: "I'll email you the technical specifications. Can you also send your recent work portfolio?",
        timestamp: "2025-01-28T16:15:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 6,
        text: "Sounds good! I'll send over my portfolio and references today.",
        timestamp: "2025-01-28T16:45:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      }
    ]
  },
  {
    id: 4,
    participant: {
      name: "Maria Santos",
      title: "Process Engineer",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      lastSeen: "Active now",
      location: "Port Arthur, TX",
      rating: 4.9,
      isTyping: false
    },
    unreadCount: 0,
    lastMessage: {
      id: 2,
      text: "I'd be happy to help with your process optimization project.",
      timestamp: "2025-01-29T09:15:00Z",
      isRead: true,
      isDelivered: true,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        text: "Hi Maria, we're looking for a process engineer for a refinery optimization project.",
        timestamp: "2025-01-29T08:30:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 2,
        text: "I'd be happy to help with your process optimization project.",
        timestamp: "2025-01-29T09:15:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      }
    ]
  },
  {
    id: 5,
    participant: {
      name: "David Kim",
      title: "Maintenance Technician",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
      isOnline: false,
      lastSeen: "1 day ago",
      location: "Galveston, TX",
      rating: 4.6,
      isTyping: false
    },
    unreadCount: 0,
    lastMessage: {
      id: 2,
      text: "I have experience with offshore platform maintenance.",
      timestamp: "2025-01-28T12:00:00Z",
      isRead: true,
      isDelivered: true,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        text: "David, we have maintenance work available on offshore platforms.",
        timestamp: "2025-01-28T11:30:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 2,
        text: "I have experience with offshore platform maintenance.",
        timestamp: "2025-01-28T12:00:00Z",
        sender: "them",
        isRead: true,
        isDelivered: true
      }
    ]
  },
  {
    id: 6,
    participant: {
      name: "Rebecca Johnson",
      title: "NDT Inspector",
      avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
      isOnline: true,
      lastSeen: "Active now",
      location: "Texas City, TX",
      rating: 4.8,
      isTyping: false
    },
    unreadCount: 2,
    lastMessage: {
      id: 2,
      text: "I can start the NDT inspection next week.",
      timestamp: "2025-01-29T16:00:00Z",
      isRead: false,
      isDelivered: true,
      sender: "them"
    },
    messages: [
      {
        id: 1,
        text: "Rebecca, we need NDT inspection services for our pipeline project.",
        timestamp: "2025-01-29T15:00:00Z",
        sender: "me",
        isRead: true,
        isDelivered: true
      },
      {
        id: 2,
        text: "I can start the NDT inspection next week.",
        timestamp: "2025-01-29T16:00:00Z",
        sender: "them",
        isRead: false,
        isDelivered: true
      }
    ]
  }
];

export default function MessagesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [isTyping, setIsTyping] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversations, selectedConversation]);

  useEffect(() => {
    // Check for contractor parameter in URL
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const contractorParam = urlParams.get('contractor');
      if (contractorParam) {
        const contractorId = Number.parseInt(contractorParam);
        setSelectedConversation(contractorId);
      } else if (conversations.length > 0) {
        // Otherwise select first non-archived conversation
        const firstActive = conversations.find(c => !c.isArchived);
        if (firstActive) {
          setSelectedConversation(firstActive.id);
        }
      }
    }
  }, [conversations]);

  const simulateResponse = useCallback((conversationId: number) => {
    const responses = [
      "Thanks for the message! I'll get back to you soon.",
      "That sounds great. Let me review the details.",
      "I'm interested. Can we schedule a call to discuss?",
      "Perfect! I'll send over the documents you requested.",
      "I'm available for this project. When can we start?",
      "Let me check my schedule and get back to you.",
      "I have some questions about the project scope.",
      "That timeline works well for me.",
      "I can provide references from similar projects."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        const newMsg: Message = {
          id: conv.messages.length + 1,
          text: randomResponse,
          timestamp: new Date().toISOString(),
          sender: "them",
          isRead: false,
          isDelivered: true
        };
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMsg,
          participant: {
            ...conv.participant,
            isTyping: false
          },
          unreadCount: (conv.unreadCount || 0) + 1
        };
      }
      return conv;
    }));

    setIsTyping(false);
  }, []);

  const simulateTyping = useCallback((conversationId: number) => {
    // Set typing indicator for the participant
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          participant: {
            ...conv.participant,
            isTyping: true
          }
        };
      }
      return conv;
    }));

    // Remove typing indicator and send response after delay
    setTimeout(() => {
      simulateResponse(conversationId);
    }, 2000 + Math.random() * 3000);
  }, [simulateResponse]);

  const sendMessage = useCallback(() => {
    if (!newMessage.trim() || !selectedConversation) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation) {
        const newMsg: Message = {
          id: conv.messages.length + 1,
          text: newMessage.trim(),
          timestamp: new Date().toISOString(),
          sender: "me",
          isRead: true,
          isDelivered: true
        };
        return {
          ...conv,
          messages: [...conv.messages, newMsg],
          lastMessage: newMsg,
          unreadCount: 0
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setNewMessage('');

    // Show typing indicator briefly
    setTimeout(() => {
      setIsTyping(true);
      simulateTyping(selectedConversation);
    }, 1000 + Math.random() * 2000);
  }, [newMessage, selectedConversation, conversations, simulateTyping]);

  const markAsRead = useCallback((conversationId: number) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          unreadCount: 0,
          messages: conv.messages.map(msg =>
            msg.sender === 'them' ? { ...msg, isRead: true } : msg
          )
        };
      }
      return conv;
    }));
  }, []);

  const togglePin = useCallback((conversationId: number) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, isPinned: !conv.isPinned };
      }
      return conv;
    }));

    showToast({
      type: 'success',
      title: 'Conversation Updated',
      message: 'Conversation pinned status changed',
      duration: 2000
    });
  }, [showToast]);

  const archiveConversation = useCallback((conversationId: number) => {
    setConversations(prev => prev.map(conv => {
      if (conv.id === conversationId) {
        return { ...conv, isArchived: !conv.isArchived };
      }
      return conv;
    }));

    if (selectedConversation === conversationId) {
      const firstActiveConv = conversations.find(c => c.id !== conversationId && !c.isArchived);
      setSelectedConversation(firstActiveConv?.id || null);
    }

    showToast({
      type: 'info',
      title: 'Conversation Archived',
      message: 'You can find it in the archived section',
      duration: 3000
    });
  }, [selectedConversation, conversations, showToast]);

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = conv.participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         conv.participant.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesArchive = showArchived ? conv.isArchived : !conv.isArchived;
    return matchesSearch && matchesArchive;
  }).sort((a, b) => {
    // Sort: pinned first, then by last message timestamp
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.lastMessage.timestamp).getTime() - new Date(a.lastMessage.timestamp).getTime();
  });

  const selectedConv = selectedConversation ?
    conversations.find(conv => conv.id === selectedConversation) : null;

  const formatTime = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = (now.getTime() - date.getTime()) / (1000 * 60);
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`;
    } else if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  }, []);

  const formatMessageTime = useCallback((timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, []);

  const totalUnreadCount = conversations.reduce((total, conv) => total + (conv.unreadCount || 0), 0);

  // Mark conversation as read when selected
  useEffect(() => {
    if (selectedConversation) {
      markAsRead(selectedConversation);
    }
  }, [selectedConversation, markAsRead]);

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
            <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">You need to be signed in to access messages.</p>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/contractors" className="inline-flex items-center text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Contractors
              </Link>
              <div className="h-6 border-l border-gray-300" />
              <h1 className="text-2xl font-bold text-nexfield-slate">Messages</h1>
            </div>
            <div className="flex items-center space-x-4">
              {totalUnreadCount > 0 && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-nexfield-emerald rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">
                    {totalUnreadCount} unread message{totalUnreadCount !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowArchived(!showArchived)}
                className={showArchived ? 'bg-gray-100' : ''}
              >
                <Archive className="w-4 h-4 mr-2" />
                {showArchived ? 'Show Active' : 'Show Archived'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {showArchived ? 'Archived' : 'Conversations'}
                    {totalUnreadCount > 0 && !showArchived && (
                      <Badge variant="secondary" className="ml-2">{totalUnreadCount}</Badge>
                    )}
                  </CardTitle>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0 overflow-y-auto">
                <div className="space-y-1">
                  {filteredConversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation.id)}
                      className={`relative p-4 cursor-pointer transition-colors hover:bg-gray-50 border-b group ${
                        selectedConversation === conversation.id ? 'bg-nexfield-emerald/5 border-l-4 border-l-nexfield-emerald' : ''
                      }`}
                    >
                      {/* Pin indicator */}
                      {conversation.isPinned && (
                        <Pin className="absolute top-2 right-2 w-3 h-3 text-nexfield-emerald" />
                      )}

                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <img
                            src={conversation.participant.avatar}
                            alt={conversation.participant.name}
                            className="w-10 h-10 rounded-full object-cover"
                            crossOrigin="anonymous"
                          />
                          {conversation.participant.isOnline && (
                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm text-nexfield-slate truncate">
                              {conversation.participant.name}
                              {conversation.participant.rating && (
                                <span className="ml-2 text-xs text-yellow-500">
                                  ★ {conversation.participant.rating}
                                </span>
                              )}
                            </h4>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">
                                {formatTime(conversation.lastMessage.timestamp)}
                              </span>
                              {(conversation.unreadCount || 0) > 0 && (
                                <div className="w-2 h-2 bg-nexfield-emerald rounded-full" />
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-gray-600 mb-1 truncate">
                            {conversation.participant.title}
                            {conversation.participant.location && (
                              <span className="text-gray-400"> • {conversation.participant.location}</span>
                            )}
                          </p>
                          <div className="flex items-center justify-between">
                            <p className={`text-xs truncate flex-1 ${
                              (conversation.unreadCount || 0) > 0 && conversation.lastMessage.sender === 'them'
                                ? 'font-medium text-nexfield-slate'
                                : 'text-gray-500'
                            }`}>
                              {conversation.participant.isTyping ? (
                                <span className="text-nexfield-emerald italic">typing...</span>
                              ) : (
                                <>
                                  {conversation.lastMessage.sender === 'me' ? 'You: ' : ''}
                                  {conversation.lastMessage.text}
                                </>
                              )}
                            </p>
                            {(conversation.unreadCount || 0) > 0 && (
                              <Badge variant="secondary" className="ml-2 text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Quick actions on hover */}
                      <div className="absolute top-2 right-8 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            togglePin(conversation.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-xs"
                        >
                          <Pin className="w-3 h-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            archiveConversation(conversation.id);
                          }}
                          className="p-1 hover:bg-gray-200 rounded text-xs"
                        >
                          <Archive className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredConversations.length === 0 && (
                  <div className="p-8 text-center">
                    <MessageCircle className="w-8 h-8 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 text-sm">
                      {showArchived ? 'No archived conversations' : 'No conversations found'}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            {selectedConv ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <CardHeader className="border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="relative">
                        <img
                          src={selectedConv.participant.avatar}
                          alt={selectedConv.participant.name}
                          className="w-10 h-10 rounded-full object-cover"
                          crossOrigin="anonymous"
                        />
                        {selectedConv.participant.isOnline && (
                          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-nexfield-slate">{selectedConv.participant.name}</h3>
                          {selectedConv.participant.rating && (
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span className="text-xs text-gray-600">{selectedConv.participant.rating}</span>
                            </div>
                          )}
                          {selectedConv.isPinned && (
                            <Pin className="w-3 h-3 text-nexfield-emerald" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{selectedConv.participant.title}</p>
                        <div className="flex items-center space-x-3 text-xs text-gray-500">
                          {selectedConv.participant.location && (
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{selectedConv.participant.location}</span>
                            </div>
                          )}
                          <span>
                            {selectedConv.participant.isTyping ? (
                              <span className="text-nexfield-emerald">typing...</span>
                            ) : selectedConv.participant.isOnline ? (
                              'Online now'
                            ) : (
                              selectedConv.participant.lastSeen
                            )}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Info className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                  {selectedConv.messages.map((message, index) => {
                    const showTimestamp = index === 0 ||
                      new Date(message.timestamp).getTime() - new Date(selectedConv.messages[index - 1].timestamp).getTime() > 300000; // 5 minutes

                    return (
                      <div key={message.id}>
                        {showTimestamp && (
                          <div className="text-center text-xs text-gray-500 my-4">
                            {formatTime(message.timestamp)}
                          </div>
                        )}
                        <div className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg relative group ${
                            message.sender === 'me'
                              ? 'bg-nexfield-emerald text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.text}</p>
                            {message.reaction && (
                              <div className="absolute -bottom-2 -right-1 bg-white rounded-full border border-gray-200 w-5 h-5 flex items-center justify-center text-xs">
                                {message.reaction}
                              </div>
                            )}
                            <div className={`flex items-center space-x-1 mt-1 ${
                              message.sender === 'me' ? 'text-white/70' : 'text-gray-500'
                            } text-xs`}>
                              <span>{formatMessageTime(message.timestamp)}</span>
                              {message.sender === 'me' && (
                                <div className="flex items-center space-x-1">
                                  {message.isDelivered ? (
                                    message.isRead ? (
                                      <CheckCheck className="w-3 h-3" />
                                    ) : (
                                      <Check className="w-3 h-3" />
                                    )
                                  ) : (
                                    <Clock className="w-3 h-3" />
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Typing indicator */}
                  {selectedConv.participant.isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 px-4 py-2 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Message Input */}
                <div className="border-t p-4">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="min-h-[80px] pr-20 resize-none"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            sendMessage();
                          }
                        }}
                      />
                      <div className="absolute bottom-2 right-2 flex space-x-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Smile className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={!newMessage.trim()}
                      className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 self-end"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              </Card>
            ) : (
              <Card className="h-full">
                <CardContent className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Select a Conversation</h3>
                    <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                    {!showArchived && filteredConversations.length === 0 && (
                      <div className="mt-4">
                        <Link href="/contractors">
                          <Button variant="outline">Browse Contractors</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
