'use client';

import { useState } from 'react';

const sportsPages = [
  { name: 'Cricket Turf', slug: 'cricket-turf' },
  { name: 'Tennis Courts', slug: 'tennis-courts' },
  { name: 'Football Turf', slug: 'football-turf' },
  { name: 'Basketball Courts', slug: 'basketball-courts' },
  { name: 'Badminton Courts', slug: 'badminton-courts' },
  { name: 'Pickleball Courts', slug: 'pickleball-courts' },
  { name: 'Padel Courts', slug: 'padel-courts' },
  { name: 'Squash Courts', slug: 'squash-courts' },
  { name: 'Athletic Tracks', slug: 'athletic-tracks' },
  { name: 'Swimming Pools', slug: 'swimming-pools' },
];

export function MainNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Layout - Logo Left, Hamburger Right */}
          <div className="flex lg:hidden items-center w-full justify-between">
            <a href="/">
              <img
                src="/logo.png"
                alt="Amico Logo"
                className="w-12 h-12 object-contain hover:scale-105 transition-transform cursor-pointer"
              />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-[#232b7c] hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Layout - Three Column (Left Links, Center Logo, Right Links) */}
          <div className="hidden lg:flex items-center space-x-8">
            <a
              href="/"
              className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group"
            >
              HOME
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="/product"
              className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group"
            >
              PROJECTS
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300" />
            </a>
            <div
              className="relative group"
              onMouseEnter={() => setSportsDropdownOpen(true)}
              onMouseLeave={() => setSportsDropdownOpen(false)}
            >
              <button className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative flex items-center gap-1 pb-0">
                SERVICES
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sportsDropdownOpen && (
                <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                  {sportsPages.map((sport) => (
                    <a
                      key={sport.slug}
                      href={`/sports/${sport.slug}`}
                      className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#F5F5F2] hover:text-[#232b7c] transition-colors"
                    >
                      {sport.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden lg:flex items-center hover:scale-105 transition-transform cursor-pointer">
            <a href="/">
              <img src="/logo.png" alt="Amico Logo" className="w-12 h-12 object-contain" />
            </a>
          </div>

          <div className="hidden lg:flex items-center space-x-8">
            <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
              ABOUT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="/blogs" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
              BLOG
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300" />
            </a>
            <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
              CONTACT
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-4 space-y-2">
            <a
              href="/"
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              HOME
            </a>
            <a
              href="/product"
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              PROJECTS
            </a>

            <div>
              <button
                onClick={() => setSportsDropdownOpen(!sportsDropdownOpen)}
                className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
              >
                SPORTS
                <svg
                  className={`w-4 h-4 transition-transform ${sportsDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {sportsDropdownOpen && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                  {sportsPages.map((sport) => (
                    <a
                      key={sport.slug}
                      href={`/sports/${sport.slug}`}
                      className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setSportsDropdownOpen(false);
                      }}
                    >
                      {sport.name}
                    </a>
                  ))}
                </div>
              )}
            </div>

            <a
              href="#"
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              ABOUT
            </a>
            <a
              href="/blogs"
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              BLOG
            </a>
            <a
              href="#"
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              CONTACT
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
