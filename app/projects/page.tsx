'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

// Custom hook for intersection observer
function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold: 0.1, ...options });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isInView] as const;
}

// Project data
const projects = [
  {
    id: 'padukone-dravid-centre',
    title: 'Padukone-Dravid Centre for Sports Excellence',
    location: 'Bangalore, Karnataka',
    year: '2024',
    area: '15,000',
    sports: ['Tennis', 'Badminton', 'Swimming', 'Cricket', 'Football', 'Basketball', 'Squash', 'Fitness'],
    description: 'A state-of-the-art multi-sport facility designed to nurture sporting talent with world-class infrastructure and coaching.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
    category: 'Multi-Sport Complex',
    client: 'Padukone-Dravid Sports Management',
    features: [
      '8 International Standard Courts',
      'Olympic-Size Swimming Pool',
      'FIFA Approved Football Turf',
      'Advanced Training Equipment'
    ]
  },
  {
    id: 'national-sports-academy',
    title: 'National Sports Academy Complex',
    location: 'Mumbai, Maharashtra',
    year: '2023',
    area: '22,000',
    sports: ['Cricket', 'Tennis', 'Athletics', 'Football', 'Basketball', 'Hockey', 'Volleyball', 'Badminton', 'Squash', 'Swimming', 'Gym', 'Yoga'],
    description: 'An expansive sports academy featuring comprehensive training facilities across multiple disciplines with cutting-edge technology.',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200&h=800&fit=crop',
    category: 'Sports Academy',
    client: 'National Sports Authority',
    features: [
      '12 Sports Disciplines',
      'Residential Training Facility',
      'Professional Coaching Staff',
      'Medical & Recovery Center'
    ]
  }
];

export default function ProjectsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [ref, isInView] = useInView();

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

  const categories = ['All', 'Multi-Sport Complex', 'Sports Academy', 'Educational', 'Commercial'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className={`min-h-screen bg-white ${ptSans.className}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Layout - Logo Left, Hamburger Right */}
            <div className="flex lg:hidden items-center w-full justify-between">
              <Link href="/">
                <img 
                  src="/logo.png" 
                  alt="Amico Logo" 
                  className="w-12 h-12 object-contain hover:scale-105 transition-transform cursor-pointer"
                />
              </Link>
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
              <Link href="/" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link href="/projects" className="text-xs font-medium text-[#232b7c] transition-colors relative group">
                PROJECTS
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#232b7c] transition-all duration-300"></span>
              </Link>
              <div 
                className="relative group"
                onMouseEnter={() => setSportsDropdownOpen(true)}
                onMouseLeave={() => setSportsDropdownOpen(false)}
              >
                <button className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative flex items-center gap-1 pb-0">
                  SPORTS
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {sportsDropdownOpen && (
                  <div className="absolute top-full left-0 w-56 bg-white rounded-lg shadow-xl py-2 z-50 border border-gray-100">
                    {sportsPages.map((sport) => (
                      <Link
                        key={sport.slug}
                        href={`/sports/${sport.slug}`}
                        className="block px-4 py-2 text-xs font-medium text-gray-700 hover:bg-[#F5F5F2] hover:text-[#232b7c] transition-colors"
                      >
                        {sport.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="hidden lg:flex items-center hover:scale-105 transition-transform cursor-pointer">
              <Link href="/">
                <img 
                  src="/logo.png" 
                  alt="Amico Logo" 
                  className="w-12 h-12 object-contain"
                />
              </Link>
            </div>
            
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                ABOUT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                BLOG
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                CONTACT
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-2">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link
                href="/projects"
                className="block px-4 py-3 text-base font-medium text-[#232b7c] bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                PROJECTS
              </Link>
              
              {/* Sports Dropdown in Mobile */}
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
                      <Link
                        key={sport.slug}
                        href={`/sports/${sport.slug}`}
                        className="block px-4 py-2 text-sm font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
                        onClick={() => {
                          setMobileMenuOpen(false);
                          setSportsDropdownOpen(false);
                        }}
                      >
                        {sport.name}
                      </Link>
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
                href="#"
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

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-[#F5F5F2] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="text-[#a98946] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
              Our Portfolio
            </span>
            <h1 className="text-5xl md:text-6xl font-light text-[#1A2266] mb-6">
              Our Projects
            </h1>
            <div className="w-20 h-1 bg-[#a98946] mx-auto rounded-full mb-8"></div>
            <p className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed">
              Explore our portfolio of world-class sports facilities that have transformed communities and inspired athletes across India.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-[#232b7c] text-white shadow-lg'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section ref={ref} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProjects.map((project, idx) => (
              <Link key={project.id} href={`/product/${project.id}`}>
                <div className={`group cursor-pointer transition-all duration-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`} style={{ transitionDelay: `${idx * 200}ms` }}>
                  {/* Image Container */}
                  <div className="relative h-[400px] rounded-2xl overflow-hidden mb-6 shadow-xl">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="bg-white/90 backdrop-blur-sm text-[#232b7c] text-xs font-bold px-4 py-2 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* Stats Overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="flex items-center gap-4 text-white mb-4">
                        <div>
                          <div className="text-2xl font-bold">{project.area}</div>
                          <div className="text-xs uppercase">Sq Ft</div>
                        </div>
                        <div className="w-px h-8 bg-white/40"></div>
                        <div>
                          <div className="text-2xl font-bold">{project.sports.length}</div>
                          <div className="text-xs uppercase">Sports</div>
                        </div>
                        <div className="w-px h-8 bg-white/40"></div>
                        <div>
                          <div className="text-2xl font-bold">{project.year}</div>
                          <div className="text-xs uppercase">Year</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-[#1A2266] group-hover:text-[#232b7c] transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      {project.location}
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* View Details Button */}
                    <div className="pt-4">
                      <div className="inline-flex items-center text-[#232b7c] font-semibold text-sm group-hover:text-[#a98946] transition-colors">
                        VIEW PROJECT DETAILS
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#232b7c] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light mb-6">
            Ready to Build Your Dream Sports Facility?
          </h2>
          <p className="text-lg mb-8 text-gray-200">
            Let's discuss how we can bring your vision to life with world-class infrastructure and expert craftsmanship.
          </p>
          <button className="bg-white text-[#232b7c] px-10 py-4 rounded-full text-base font-bold uppercase tracking-wider hover:bg-[#a98946] hover:text-white transition-all shadow-xl hover:shadow-2xl hover:scale-105">
            Get in Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232b7c] text-white relative overflow-hidden">
        {/* Top CTA Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-light mb-1">Step into a field of</h3>
              <h3 className="text-2xl md:text-3xl font-bold">possibilites, Get in touch!</h3>
            </div>
            <button className="bg-white text-[#232b7c] px-8 py-3 text-sm font-bold tracking-widest hover:bg-[#a98946] hover:text-white transition-all uppercase rounded shadow-lg">
              Contact Us
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20"></div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-4xl font-black tracking-tighter uppercase">
                  AM<span className="text-[#a98946]">I</span>CO
                </h2>
              </div>
            </div>

            {/* Connect With Us */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Connect With Us</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Second Floor, 657,<br />
                    100 feet Road,<br />
                    Binnamangala I Stage,<br />
                    Indira Nagar, Bengaluru 560038.
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91-8951980194</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:infra@amicosports.com" className="hover:text-gray-200">infra@amicosports.com</a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gray-200 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Contact Us</a></li>
                <li><Link href="/projects" className="hover:text-gray-200 transition-colors">Projects</Link></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Download Brochure</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Careers</a></li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Follow Us Online</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-200 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center md:text-left">
            <p className="text-xs text-gray-300">© 2025 Amico Sports | All rights reserved</p>
          </div>
        </div>
      </footer>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-14 h-14">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-[#1e3a8a] text-white p-3 rounded-md shadow-lg hover:bg-[#232b7c] transition-colors w-10 h-10 flex items-center justify-center border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </div>
  );
}

