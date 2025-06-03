'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ChevronDown, Phone, Menu, User, LogOut, Briefcase, MessageCircle, CreditCard } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'contractor' ? '/dashboard/contractor' : '/dashboard/company';
  };

  return (
    <header className="bg-white shadow-sm">
      {/* Top bar - Cleaner, more minimal */}
      <div className="bg-gradient-to-r from-nexfield-ivory via-white to-nexfield-ivory border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-2 text-xs">
            {/* Left side - Status indicator */}
            <div className="hidden md:flex items-center space-x-2 text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full pulse-dot"></div>
              <span>All systems operational</span>
            </div>

            {/* Right side - Minimal actions */}
            <nav className="flex items-center space-x-4">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 text-nexfield-slate hover:text-nexfield-emerald transition-all duration-300 rounded-full px-3 py-1 hover:bg-nexfield-emerald/5">
                    <div className="w-6 h-6 bg-gradient-to-r from-nexfield-emerald to-nexfield-sky rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="hidden sm:block text-sm font-medium">{user?.name || 'Account'}</span>
                    <ChevronDown className="w-3 h-3" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="futuristic-dropdown">
                    <div className="p-1">
                      <DropdownMenuItem className="dropdown-item">
                        <Link href={getDashboardLink()} className="dropdown-link">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-3" />
                            Dashboard
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="dropdown-item">
                        <Link href="/applications" className="dropdown-link">
                          <div className="flex items-center">
                            <Briefcase className="w-4 h-4 mr-3" />
                            Applications
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="dropdown-item">
                        <Link href="/messages" className="dropdown-link">
                          <div className="flex items-center">
                            <MessageCircle className="w-4 h-4 mr-3" />
                            Messages
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>
                      <DropdownMenuItem className="dropdown-item">
                        <Link href="/profile" className="dropdown-link">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-3" />
                            Settings
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="dropdown-item cursor-pointer text-red-600 hover:text-red-700"
                      >
                        <div className="flex items-center p-3">
                          <LogOut className="w-4 h-4 mr-3" />
                          Sign Out
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link href="/contact" className="text-gray-600 hover:text-nexfield-emerald transition-colors text-sm">
                    Help
                  </Link>
                  <Link href="/signin" className="text-nexfield-emerald hover:text-nexfield-emerald/80 transition-colors text-sm font-medium">
                    Sign In
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center py-4 sm:py-6">
          {/* Logo */}
          <div className="flex-shrink-0 min-w-0">
            <Link href="/" className="group">
              <div className="text-lg sm:text-2xl font-bold gradient-text hover:scale-105 transition-transform duration-300">
                MyFieldLink
              </div>
            </Link>
          </div>

          {/* Navigation - Cleaner, future-forward design */}
          <nav className="hidden lg:flex items-center space-x-1">
            {/* Find Contractors */}
            <Link href="/contractors" className="nav-link">
              Find Talent
            </Link>

            {/* Post Jobs */}
            <Link href="/jobs/post" className="nav-link">
              Post Jobs
            </Link>

            {/* Solutions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className="nav-link-dropdown">
                Solutions
                <ChevronDown className="w-3 h-3 ml-1 transition-transform group-data-[state=open]:rotate-180" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="futuristic-dropdown">
                <div className="p-1">
                  <h4 className="dropdown-section-title">For Contractors</h4>
                  <DropdownMenuItem className="dropdown-item">
                    <Link href="/signup" className="dropdown-link">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-emerald rounded-full mr-3 pulse-dot"></div>
                        <div>
                          <div className="font-medium">Create Profile</div>
                          <div className="text-xs text-gray-500">Get discovered by top companies</div>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dropdown-item">
                    <Link href="/jobs" className="dropdown-link">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-sky rounded-full mr-3 pulse-dot"></div>
                        <div>
                          <div className="font-medium">Browse Jobs</div>
                          <div className="text-xs text-gray-500">Find your next opportunity</div>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>

                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-2"></div>

                  <h4 className="dropdown-section-title">For Companies</h4>
                  <DropdownMenuItem className="dropdown-item">
                    <Link href="/hire" className="dropdown-link">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-emerald rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Hire Contractors</div>
                          <div className="text-xs text-gray-500">Access vetted professionals</div>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="dropdown-item">
                    <Link href="/contact" className="dropdown-link">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-sky rounded-full mr-3"></div>
                        <div>
                          <div className="font-medium">Enterprise</div>
                          <div className="text-xs text-gray-500">Custom solutions for scale</div>
                        </div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Pricing */}
            <Link href="/pricing" className="nav-link">
              Pricing
            </Link>

            {/* Support */}
            <Link href="/contact" className="nav-link">
              Support
            </Link>
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {isAuthenticated ? (
              <Link href={getDashboardLink()}>
                <Button className="btn-futuristic bg-gradient-to-r from-nexfield-emerald to-nexfield-sky text-white px-3 sm:px-6 py-2 rounded-xl shadow-lg text-sm">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href="/signup">
                <Button className="btn-futuristic bg-gradient-to-r from-nexfield-emerald to-nexfield-sky text-white px-3 sm:px-6 py-2 rounded-xl shadow-lg text-sm">
                  Get Started
                </Button>
              </Link>
            )}

            {/* Mobile Menu - Futuristic Design */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden relative group">
                  <div className="flex flex-col justify-center items-center w-5 h-5">
                    <span className="block w-5 h-0.5 bg-nexfield-slate transition-all duration-300 group-data-[state=open]:rotate-45 group-data-[state=open]:translate-y-1"></span>
                    <span className="block w-5 h-0.5 bg-nexfield-slate transition-all duration-300 mt-1 group-data-[state=open]:opacity-0"></span>
                    <span className="block w-5 h-0.5 bg-nexfield-slate transition-all duration-300 mt-1 group-data-[state=open]:-rotate-45 group-data-[state=open]:-translate-y-1"></span>
                  </div>
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px] glass-card border-l border-gray-200/50">
                <SheetHeader className="border-b border-gray-200/50 pb-4 mb-6">
                  <SheetTitle className="text-2xl font-bold gradient-text">
                    MyFieldLink
                  </SheetTitle>
                  <SheetDescription className="text-sm text-gray-600">
                    The future of energy workforce
                  </SheetDescription>
                </SheetHeader>

                <div className="space-y-1">
                  {/* Main Navigation */}
                  <div className="space-y-1">
                    <Link href="/contractors" className="mobile-nav-item">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-emerald rounded-full mr-3 pulse-dot"></div>
                        Find Talent
                      </div>
                    </Link>

                    <Link href="/jobs/post" className="mobile-nav-item">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-sky rounded-full mr-3 pulse-dot"></div>
                        Post Jobs
                      </div>
                    </Link>

                    <Link href="/jobs" className="mobile-nav-item">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-emerald rounded-full mr-3 pulse-dot"></div>
                        Browse Jobs
                      </div>
                    </Link>

                    <Link href="/pricing" className="mobile-nav-item">
                      <div className="flex items-center">
                        <div className="w-2 h-2 bg-nexfield-sky rounded-full mr-3 pulse-dot"></div>
                        Pricing
                      </div>
                    </Link>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"></div>

                  {/* Solutions Section */}
                  <div className="space-y-3">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Solutions</p>

                    <div className="space-y-1">
                      <p className="text-sm font-medium text-nexfield-slate px-3">For Contractors</p>
                      <Link href="/signup" className="mobile-nav-subitem">
                        Create Profile
                      </Link>
                      <Link href="/dashboard/contractor" className="mobile-nav-subitem">
                        Dashboard
                      </Link>
                    </div>

                    <div className="space-y-1 mt-4">
                      <p className="text-sm font-medium text-nexfield-slate px-3">For Companies</p>
                      <Link href="/hire" className="mobile-nav-subitem">
                        Hire Contractors
                      </Link>
                      <Link href="/dashboard/company" className="mobile-nav-subitem">
                        Company Dashboard
                      </Link>
                      <Link href="/contact" className="mobile-nav-subitem">
                        Enterprise
                      </Link>
                    </div>
                  </div>

                  {/* Support */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-6"></div>
                  <Link href="/contact" className="mobile-nav-item">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-nexfield-emerald rounded-full mr-3 pulse-dot"></div>
                      Support & Help
                    </div>
                  </Link>

                  {/* Actions */}
                  <div className="pt-6 space-y-3">
                    {isAuthenticated ? (
                      <div className="space-y-2">
                        <Link href={getDashboardLink()}>
                          <Button className="w-full btn-futuristic bg-gradient-to-r from-nexfield-emerald to-nexfield-sky text-white shadow-lg">
                            Dashboard
                          </Button>
                        </Link>
                        <Button
                          onClick={handleLogout}
                          variant="outline"
                          className="w-full border-red-200 text-red-600 hover:bg-red-50 transition-all duration-300"
                        >
                          Sign Out
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Link href="/signup">
                          <Button className="w-full btn-futuristic bg-gradient-to-r from-nexfield-emerald to-nexfield-sky text-white shadow-lg">
                            Get Started
                          </Button>
                        </Link>
                        <Link href="/signin">
                          <Button variant="outline" className="w-full border-nexfield-emerald text-nexfield-emerald hover:bg-nexfield-emerald hover:text-white transition-all duration-300">
                            Sign In
                          </Button>
                        </Link>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="flex items-center justify-center text-gray-500 text-sm pt-4">
                      <Phone className="w-3 h-3 mr-2" />
                      (936) 314-7030
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
