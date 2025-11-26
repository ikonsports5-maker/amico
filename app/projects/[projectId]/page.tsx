'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
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

// Project data (same as in projects page)
const projectsData: Record<string, any> = {
  'padukone-dravid-centre': {
    id: 'padukone-dravid-centre',
    title: 'Padukone-Dravid Centre for Sports Excellence',
    location: 'Bangalore, Karnataka',
    year: '2024',
    area: '15,000',
    sports: ['Tennis', 'Badminton', 'Swimming', 'Cricket', 'Football', 'Basketball', 'Squash', 'Fitness'],
    description: 'A state-of-the-art multi-sport facility designed to nurture sporting talent with world-class infrastructure and coaching.',
    longDescription: 'The Padukone-Dravid Centre for Sports Excellence stands as a testament to our commitment to creating world-class sports infrastructure. This comprehensive facility brings together the vision of two legendary Indian athletes - Prakash Padukone and Rahul Dravid - to create a nurturing environment for budding sports talent. The center features cutting-edge technology, professional-grade courts and fields, and a holistic training approach that combines physical excellence with mental conditioning. Every aspect of the facility has been meticulously designed to meet international standards while providing a uniquely Indian training experience.',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop'
    ],
    category: 'Multi-Sport Complex',
    client: 'Padukone-Dravid Sports Management',
    duration: '18 months',
    architect: 'Amico Design Team',
    features: [
      '8 International Standard Courts',
      'Olympic-Size Swimming Pool',
      'FIFA Approved Football Turf',
      'Advanced Training Equipment',
      'Sports Science Lab',
      'Residential Facilities',
      'Medical & Recovery Center',
      'Cafeteria & Nutrition Center'
    ],
    challenges: [
      'Meeting international standards for multiple sports disciplines',
      'Integrating diverse facilities within a compact footprint',
      'Ensuring optimal natural lighting and ventilation',
      'Creating flexible spaces for multi-purpose use'
    ],
    solutions: [
      'Collaborated with international sports federations for compliance',
      'Implemented innovative vertical design to maximize space',
      'Incorporated smart building systems for climate control',
      'Designed modular court systems for versatility'
    ],
    impact: [
      'Training 500+ athletes annually',
      'Hosted 15+ national level tournaments',
      'Achieved 100% athlete satisfaction rating',
      'Created employment for 80+ coaches and staff'
    ]
  },
  'national-sports-academy': {
    id: 'national-sports-academy',
    title: 'National Sports Academy Complex',
    location: 'Mumbai, Maharashtra',
    year: '2023',
    area: '22,000',
    sports: ['Cricket', 'Tennis', 'Athletics', 'Football', 'Basketball', 'Hockey', 'Volleyball', 'Badminton', 'Squash', 'Swimming', 'Gym', 'Yoga'],
    description: 'An expansive sports academy featuring comprehensive training facilities across multiple disciplines with cutting-edge technology.',
    longDescription: 'The National Sports Academy Complex represents a milestone in Indian sports infrastructure. Spanning over 22,000 square feet, this ambitious project encompasses 12 different sports disciplines under one roof. Designed with input from national sports authorities and international consultants, the academy features the latest in sports technology, from advanced analytics systems to recovery and rehabilitation centers. The complex includes residential facilities for athletes, dedicated coaching zones, and specialized training equipment for each sport. It serves as a hub for developing India\'s next generation of sporting champions.',
    image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200&h=800&fit=crop',
    gallery: [
      'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=1200&h=800&fit=crop'
    ],
    category: 'Sports Academy',
    client: 'National Sports Authority',
    duration: '24 months',
    architect: 'Amico Design Team',
    features: [
      '12 Sports Disciplines',
      'Residential Training Facility',
      'Professional Coaching Staff',
      'Medical & Recovery Center',
      'Sports Science & Analytics Lab',
      'High-Performance Gym',
      'Olympic Standard Pool',
      'Multi-purpose Indoor Arena'
    ],
    challenges: [
      'Coordinating requirements across 12 different sports',
      'Building on challenging urban terrain',
      'Managing large-scale project logistics',
      'Ensuring acoustic separation between facilities'
    ],
    solutions: [
      'Created specialized teams for each sports discipline',
      'Implemented advanced foundation engineering',
      'Used prefabricated components to accelerate construction',
      'Designed with advanced sound insulation systems'
    ],
    impact: [
      'Training 1000+ athletes annually',
      'Produced 25+ national champions',
      'Hosted international training camps',
      'Served as model for future academies'
    ]
  }
};

export default function ProjectDetailPage() {
  const params = useParams();
  const projectId = params.projectId as string;
  const project = projectsData[projectId];
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [heroRef, heroInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [challengesRef, challengesInView] = useInView();
  const [impactRef, impactInView] = useInView();

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

  // If project not found
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F5F2]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1A2266] mb-4">Project Not Found</h1>
          <Link href="/projects" className="text-[#232b7c] hover:text-[#a98946] font-semibold">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white ${ptSans.className}`}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Layout */}
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

            {/* Desktop Layout */}
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

        {/* Mobile Menu */}
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

      {/* Back Button */}
      <div className="pt-24 pb-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/projects" className="inline-flex items-center text-[#232b7c] hover:text-[#a98946] font-semibold transition-colors">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="pb-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Info */}
            <div className={`transition-all duration-700 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <span className="inline-block bg-[#232b7c] text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
                {project.category}
              </span>
              <h1 className="text-4xl md:text-5xl font-light text-[#1A2266] mb-6 leading-tight">
                {project.title}
              </h1>
              <div className="flex items-center text-gray-600 mb-6">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {project.location}
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center bg-[#F5F5F2] p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#232b7c] mb-1">{project.area}</div>
                  <div className="text-xs text-gray-600 uppercase">Sq Ft</div>
                </div>
                <div className="text-center bg-[#F5F5F2] p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#a98946] mb-1">{project.sports.length}</div>
                  <div className="text-xs text-gray-600 uppercase">Sports</div>
                </div>
                <div className="text-center bg-[#F5F5F2] p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#232b7c] mb-1">{project.year}</div>
                  <div className="text-xs text-gray-600 uppercase">Year</div>
                </div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <div className="border-l-4 border-[#a98946] pl-4">
                  <div className="text-sm font-semibold text-gray-500 mb-1">CLIENT</div>
                  <div className="text-gray-800">{project.client}</div>
                </div>
                <div className="border-l-4 border-[#a98946] pl-4">
                  <div className="text-sm font-semibold text-gray-500 mb-1">DURATION</div>
                  <div className="text-gray-800">{project.duration}</div>
                </div>
                <div className="border-l-4 border-[#a98946] pl-4">
                  <div className="text-sm font-semibold text-gray-500 mb-1">ARCHITECT</div>
                  <div className="text-gray-800">{project.architect}</div>
                </div>
              </div>
            </div>

            {/* Right - Image */}
            <div className={`transition-all duration-700 delay-200 ${heroInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={project.gallery[selectedImage]} 
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                {project.gallery.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative h-20 rounded-lg overflow-hidden transition-all ${
                      selectedImage === idx ? 'ring-4 ring-[#a98946] scale-105' : 'hover:scale-105'
                    }`}
                  >
                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 bg-[#F5F5F2]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-[#1A2266] mb-6">About This Project</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {project.longDescription}
          </p>
          
          {/* Sports Tags */}
          <div className="mb-4">
            <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Sports Facilities</h3>
            <div className="flex flex-wrap gap-2">
              {project.sports.map((sport: string, idx: number) => (
                <span 
                  key={idx}
                  className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                >
                  {sport}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light text-[#1A2266] mb-10 text-center">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {project.features.map((feature: string, idx: number) => (
              <div
                key={idx}
                className={`bg-[#F5F5F2] p-6 rounded-xl transition-all duration-700 hover:shadow-lg hover:scale-105 ${
                  featuresInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-12 h-12 bg-[#232b7c] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section ref={challengesRef} className="py-16 bg-[#e8e6c8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Challenges */}
            <div className={`transition-all duration-700 ${challengesInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="text-3xl font-light text-[#1A2266] mb-6">Challenges</h2>
              <div className="space-y-4">
                {project.challenges.map((challenge: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Solutions */}
            <div className={`transition-all duration-700 delay-200 ${challengesInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <h2 className="text-3xl font-light text-[#1A2266] mb-6">Solutions</h2>
              <div className="space-y-4">
                {project.solutions.map((solution: string, idx: number) => (
                  <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-700">{solution}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section ref={impactRef} className="py-16 bg-[#232b7c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light mb-10 text-center">Project Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {project.impact.map((item: string, idx: number) => (
              <div
                key={idx}
                className={`text-center transition-all duration-700 ${
                  impactInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="w-16 h-16 bg-[#a98946] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <p className="text-lg font-medium">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-light text-[#1A2266] mb-6">
            Interested in a Similar Project?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Let's discuss how we can create something extraordinary for you.
          </p>
          <button className="bg-[#232b7c] text-white px-10 py-4 rounded-full text-base font-bold uppercase tracking-wider hover:bg-[#a98946] transition-all shadow-xl hover:shadow-2xl hover:scale-105">
            Contact Us Today
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#232b7c] text-white relative overflow-hidden">
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

        <div className="border-t border-white/20"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <h2 className="text-4xl font-black tracking-tighter uppercase">
                  AM<span className="text-[#a98946]">I</span>CO
                </h2>
              </div>
            </div>

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

