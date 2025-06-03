'use client';

// Instructions: Complete rewrite for oil & energy contractor marketplace platform

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, CheckCircle, MapPin, Clock } from 'lucide-react';

export default function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const phrases = useMemo(() => [
    'qualified contractors',
    'certified welders',
    'safety inspectors',
    'drilling supervisors',
    'NDT technicians',
    'process engineers'
  ], []);

  useEffect(() => {
    const currentPhrase = phrases[currentIndex];
    if (typedText.length < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setTypedText(currentPhrase.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTypedText('');
        setCurrentIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentIndex, phrases]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
          alt="Team of oil and gas workers with hard hats collaborating at industrial energy facility"
          className="w-full h-full object-cover transform scale-105"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nexfield-slate/70 via-nexfield-slate/50 to-nexfield-slate/70" />

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-nexfield-sky/30 rounded-full animate-bounce"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/40 rounded-full animate-pulse [animation-duration:4s]"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-nexfield-emerald/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-nexfield-sky/20 rounded-full animate-pulse [animation-duration:3.5s]"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
          {/* Main Hero Content */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="max-w-4xl mx-auto lg:mx-0">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 lg:mb-8 leading-tight">
                Connect with{' '}
                <br className="hidden sm:block" />
                <span className="text-nexfield-sky inline-block min-w-[280px] sm:min-w-[300px] text-center lg:text-left">
                  {typedText}
                  <span className="animate-pulse [animation-duration:1.5s]">|</span>
                </span>
                <br />
                <span className="text-nexfield-sky">on-demand.</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/90 mb-6 lg:mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0">
                MyFieldLink is the premier marketplace for field techs, rig workers, engineers, inspectors, and energy professionals. Find verified contractors instantly or showcase your expertise to top companies.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6 lg:mb-8 px-4 sm:px-0">
                <Link href="/contractors" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="bg-nexfield-emerald hover:bg-nexfield-emerald/90 text-white px-6 sm:px-8 py-4 text-lg font-semibold hover:translate-y-[-2px] w-full sm:w-auto shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Hire Contractors
                  </Button>
                </Link>
                <Link href="/jobs" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-white text-white hover:bg-white hover:text-nexfield-slate px-6 sm:px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm hover:translate-y-[-2px] w-full sm:w-auto transition-all duration-300"
                  >
                    Find Work
                  </Button>
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-white/80 px-4 sm:px-0">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-nexfield-emerald" />
                  <span className="text-sm font-medium">100% Verified Contractors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-nexfield-sky" />
                  <span className="text-sm font-medium">500+ Active Professionals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats Cards - Hidden on mobile, shown on larger screens */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-6 hidden lg:block">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 hover:translate-y-[-4px] transition-transform duration-300 shadow-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-nexfield-emerald/20 rounded-lg flex items-center justify-center">
                  <Users className="w-4 lg:w-5 h-4 lg:h-5 text-nexfield-emerald" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-white">1,200+</p>
                  <p className="text-white/70 text-sm">Active Contractors</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-nexfield-emerald h-2 rounded-full w-3/4 animate-pulse [animation-duration:3s]"></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 hover:translate-y-[-4px] transition-transform duration-300 shadow-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-nexfield-sky/20 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-4 lg:w-5 h-4 lg:h-5 text-nexfield-sky" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-white">98%</p>
                  <p className="text-white/70 text-sm">Success Rate</p>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div className="bg-nexfield-sky h-2 rounded-full w-[98%] animate-pulse [animation-duration:2.8s]"></div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 lg:p-6 border border-white/20 hover:translate-y-[-4px] transition-transform duration-300 shadow-xl">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-8 lg:w-10 h-8 lg:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Clock className="w-4 lg:w-5 h-4 lg:h-5 text-white" />
                </div>
                <div>
                  <p className="text-xl lg:text-2xl font-bold text-white">Fast</p>
                  <p className="text-white/70 text-sm">Response Times</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse [animation-duration:3s]"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce [animation-duration:2.5s]"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-ping [animation-duration:4s]"></div>
              </div>
            </div>
          </div>

          {/* Mobile Stats Summary - Visible only on mobile */}
          <div className="lg:hidden col-span-1 grid grid-cols-2 gap-4 mt-8 px-4">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold text-white">1,200+</p>
              <p className="text-white/70 text-xs">Contractors</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 text-center">
              <p className="text-2xl font-bold text-white">98%</p>
              <p className="text-white/70 text-xs">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
