// Instructions: Rewrite for contractor marketplace messaging

import { ArrowRight, CheckCircle, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GradientSection() {
  return (
    <section id="about" className="bg-gradient-hero py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <g fill="none" fillRule="evenodd">
              <g fill="#ffffff" fillOpacity="0.05">
                <circle cx="30" cy="30" r="1"/>
              </g>
            </g>
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
              <Zap className="w-4 h-4 text-white" />
              <span className="text-white font-medium text-sm">Revolutionary Platform</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8 leading-tight">
              The oil & energy marketplace{' '}
              <span className="text-nexfield-sky">built for professionals.</span>
            </h2>

            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Skip the middleman. <strong className="text-white">Connect directly</strong> with verified contractors and companies. Our platform streamlines hiring, manages compliance, and ensures quality matches for every project - from routine maintenance to emergency response.
            </p>

            {/* Feature List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-nexfield-emerald rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Direct contractor-company connections</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-nexfield-emerald rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Automated compliance and safety tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-nexfield-emerald rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Quality assurance for every project</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contractors">
                <Button
                  size="lg"
                  className="bg-white text-nexfield-emerald hover:bg-white/90 px-8 py-4 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-nexfield-emerald px-8 py-4 font-semibold bg-white/10 backdrop-blur-sm transition-all duration-300"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Content - Stats & Visual */}
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-nexfield-emerald/30 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">1,200+</p>
                    <p className="text-white/70 text-sm">Contractors</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:translate-y-[-4px] transition-transform duration-300">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-nexfield-sky/30 rounded-lg flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-white">98%</p>
                    <p className="text-white/70 text-sm">Success Rate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Large Feature Card */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-nexfield-emerald to-nexfield-sky rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Instant Matching Technology
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Our AI-powered system matches contractors with projects based on skills, certifications, location, and availability in real-time.
                </p>
              </div>
            </div>

            {/* Animated Elements */}
            <div className="relative">
              <div className="absolute top-4 right-4 w-3 h-3 bg-nexfield-sky/40 rounded-full animate-ping"></div>
              <div className="absolute bottom-4 left-4 w-2 h-2 bg-nexfield-emerald/40 rounded-full animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white/20 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-nexfield-emerald/10 rounded-full animate-bounce"></div>
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-nexfield-sky/10 rounded-full animate-pulse"></div>
    </section>
  );
}
