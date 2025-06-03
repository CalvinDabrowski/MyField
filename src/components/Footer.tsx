import Link from 'next/link';
import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';


export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <div className="text-2xl font-bold text-white">
                MyFieldLink
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              The premier marketplace connecting oil & energy companies with verified contractors and skilled professionals.
            </p>
            <div className="text-gray-300 text-sm mb-4 space-y-1">
              <p>Texas City, TX</p>
              <p className="whitespace-nowrap">(936) 314-7030</p>
            </div>

            {/* Social media icons */}
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-nexfield-emerald transition-colors">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-nexfield-emerald transition-colors">
                <Instagram className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-nexfield-emerald transition-colors">
                <Linkedin className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-nexfield-emerald transition-colors">
                <Twitter className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* Navigation columns */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-white font-semibold mb-4">For Contractors</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/#contractors" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/#contractors" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/#verification" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Get Verified
                  </Link>
                </li>
                <li>
                  <Link href="/#insights" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Resources & Training
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">For Companies</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/#companies" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/#companies" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Hire Contractors
                  </Link>
                </li>
                <li>
                  <Link href="/#verification" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Enterprise Solutions
                  </Link>
                </li>
                <li>
                  <Link href="/#verification" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Compliance Tools
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/#about" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    About NexField
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/#verification" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Safety Resources
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-300 hover:text-nexfield-emerald transition-colors">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            ©2025 NexField. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/help" className="text-gray-400 hover:text-nexfield-emerald text-sm transition-colors">
              Help
            </Link>
            <Link href="/privacy" className="text-gray-400 hover:text-nexfield-emerald text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-nexfield-emerald text-sm transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
