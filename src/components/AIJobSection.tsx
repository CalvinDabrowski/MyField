'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Search,
  Shield,
  MessageSquare,
  Users,
  Clock,
  Award,
  MapPin,
  Star,
  ChevronRight,
  Zap,
  Globe,
  Database
} from 'lucide-react';

export default function ContractorMatchingSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const features = [
    {
      icon: Search,
      title: "Smart Contractor Matching",
      description: "Our intelligent matching system connects you with pre-verified contractors based on skills, location, availability, and certifications.",
      color: "bg-nexfield-emerald",
      delay: "0s"
    },
    {
      icon: Shield,
      title: "100% Verified Professionals",
      description: "Every contractor meets industry standards for certifications, insurance, and safety protocols. Build your reputation through verified completed projects.",
      color: "bg-nexfield-sky",
      delay: "0.1s"
    },
    {
      icon: MessageSquare,
      title: "Direct Communication",
      description: "Skip the middleman. Connect directly with contractors and companies through our integrated messaging and video call system.",
      color: "bg-nexfield-emerald",
      delay: "0.2s"
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "See live contractor availability and location tracking. Get matched with professionals who can start immediately or on your timeline.",
      color: "bg-nexfield-sky",
      delay: "0.3s"
    },
    {
      icon: Award,
      title: "Compliance Management",
      description: "Integrated compliance tracking ensures all safety protocols, certifications, and licensing requirements are met automatically.",
      color: "bg-nexfield-emerald",
      delay: "0.4s"
    },
    {
      icon: Database,
      title: "Project Portfolio",
      description: "Showcase your work with photo documentation, client reviews, and detailed project histories to build credibility.",
      color: "bg-nexfield-sky",
      delay: "0.5s"
    }
  ];

  const stats = [
    { number: "1,200+", label: "Active Contractors", icon: Users },
    { number: "98%", label: "Success Rate", icon: Star },
    { number: "Fast", label: "Response Times", icon: Clock },
    { number: "50+", label: "Cities Covered", icon: MapPin }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-nexfield-ivory via-white to-nexfield-sky/5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-nexfield-emerald/10 px-4 py-2 rounded-full mb-6">
            <Zap className="w-4 h-4 text-nexfield-emerald" />
            <span className="text-nexfield-emerald font-medium text-sm">Platform Features</span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-nexfield-slate mb-6">
            Find the right contractor
            <br />
            <span className="text-nexfield-emerald">in minutes, not weeks.</span>
          </h2>

          <p className="text-xl text-nexfield-slate/70 max-w-3xl mx-auto leading-relaxed">
            Our intelligent matching system connects you with pre-verified contractors based on skills, location, availability, and certifications.
            Browse detailed profiles, check reviews, and hire with confidence for any oil & energy project.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card
                key={index}
                className="group cursor-pointer border-0 shadow-sm hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm"
                style={{
                  animationDelay: feature.delay,
                  transform: hoveredCard === index ? 'translateY(-8px)' : 'translateY(0)'
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <CardContent className="p-8">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-xl font-semibold text-nexfield-slate mb-4 group-hover:text-nexfield-emerald transition-colors">
                    {feature.title}
                  </h3>

                  <p className="text-nexfield-slate/70 leading-relaxed mb-4">
                    {feature.description}
                  </p>

                  <div className="flex items-center text-nexfield-emerald font-medium group-hover:translate-x-2 transition-transform duration-300">
                    <span className="text-sm">Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-nexfield-emerald via-nexfield-sky to-nexfield-emerald bg-[length:200%_100%] animate-gradient-x rounded-3xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Trusted by energy professionals nationwide
            </h3>
            <p className="text-white/90 text-lg">
              Join thousands of contractors and companies using MyFieldLink
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-xl mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-white/80 font-medium">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <h3 className="text-2xl font-bold text-nexfield-slate mb-4">
              Ready to get started?
            </h3>
            <p className="text-nexfield-slate/70 mb-6 max-w-2xl mx-auto">
              Whether you're looking to hire qualified contractors or showcase your expertise,
              MyFieldLink makes it easy to connect with the right opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contractors">
                <Button
                  size="lg"
                  className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white px-8 py-3 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Browse Contractors
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-nexfield-emerald text-nexfield-emerald hover:bg-nexfield-emerald hover:text-white px-8 py-3 font-semibold transition-all duration-300"
                >
                  Join as Contractor
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-nexfield-sky/10 rounded-full animate-float-slow"></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 bg-nexfield-emerald/10 rounded-full animate-float"></div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
