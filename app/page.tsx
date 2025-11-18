'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
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

// Number counter animation hook
function useCountUp(end: number, duration: number = 2000, isInView: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const easeOutQuad = (t: number) => t * (2 - t);
      const currentCount = Math.floor(startValue + (end - startValue) * easeOutQuad(progress));

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [end, duration, isInView]);

  return count;
}

// What We Do Section Component
function WhatWeDoSection() {
  const [ref, isInView] = useInView();
  const projectsCount = useCountUp(400, 2000, isInView);
  const clientsCount = useCountUp(100, 2000, isInView);
  const citiesCount = useCountUp(20, 2000, isInView);

  return (
    <section ref={ref} className="bg-[#e8e6c8] py-20 relative overflow-hidden">
      {/* Background Images - Left */}
      <div className="absolute left-0 top-0 h-full w-1/4 opacity-10 pointer-events-none">
        <img 
          src="/bgimg.png" 
          alt="" 
          className="h-full w-auto object-contain object-left"
        />
      </div>
      
      {/* Background Images - Right */}
      <div className="absolute right-0 top-0 h-full w-1/4 opacity-10 pointer-events-none">
        <img 
          src="/bgimg.png" 
          alt="" 
          className="h-full w-auto object-contain object-right transform scale-x-[-1]"
        />
      </div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h3 className={`text-center text-[#a98946] text-sm font-semibold tracking-wider mb-6 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          WHAT WE DO
        </h3>
        
        <p className={`text-center text-gray-800 text-lg mb-8 leading-relaxed transition-all duration-700 delay-100 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Amico brings together a team of highly experienced and dedicated professionals in sports infrastructure and construction, committed to delivering technically sound, commercially viable, and beautifully designed sporting facilities across India.
        </p>
        
        {/* <p className={`text-center text-gray-800 text-lg leading-relaxed transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          We specialize in all aspects of sports construction, including football turf construction, tennis court construction, cricket turf construction, badminton court construction, pickleball court construction, basketball court construction, and athletic track construction ensuring comprehensive coverage for all sports flooring and infrastructure projects, from design to execution.
        </p>
         */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 mt-16">
          <div className={`bg-[#232b7c] rounded-full w-40 h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-300 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="text-4xl font-bold">{projectsCount}+</div>
            <div className="text-sm mt-2">PROJECTS</div>
          </div>
          <div className={`bg-[#232b7c] rounded-full w-40 h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-500 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="text-4xl font-bold">{clientsCount}+</div>
            <div className="text-sm mt-2">CLIENTS</div>
          </div>
          <div className={`bg-[#232b7c] rounded-full w-40 h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-700 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="text-4xl font-bold">{citiesCount}+</div>
            <div className="text-sm mt-2">CITIES</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Clients Section Component
function ClientsSection() {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className={`transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <p className="text-[#a98946] text-sm font-semibold tracking-wider mb-4">CLIENTS - WORK & US</p>
            <h2 className="text-5xl font-thin text-gray-900 mb-6 leading-tight">
              Big Things Beautiful<br/>
              & Small Things<br/>
              <span className="text-[#a98946]">Brilliant</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              We are immensely proud of our family of diverse clients that have trusted us to support them. Be it a leading education institution or a multinational organisation, we have delivered world-class sports facilities.
            </p>
            
            <div className="border-l-4 border-[#a98946] pl-6 mb-8">
              <p className="text-gray-700 italic text-lg">
                "Excellence in every project, from concept to completion."
              </p>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider">
                Industries We've Worked In
              </p>
              <div className="flex flex-wrap gap-3">
                {['Education', 'IT', 'Government', 'Real Estate', 'Architects'].map((industry, idx) => (
                  <span 
                    key={idx}
                    className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-gray-200 hover:border-[#a98946] hover:text-[#a98946] transition-all"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Client Logos & Stats */}
          <div className={`transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="bg-[#e8e6c8] p-10 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-semibold text-[#232b7c] mb-8 text-center">
                Trusted By Leading Organizations
              </h3>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=80&fit=crop" 
                    alt="Client 1" 
                    className="h-16 w-full object-contain"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=80&fit=crop" 
                    alt="Client 2" 
                    className="h-16 w-full object-contain"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=80&fit=crop" 
                    alt="Client 3" 
                    className="h-16 w-full object-contain"
                  />
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=80&fit=crop" 
                    alt="Client 4" 
                    className="h-16 w-full object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 text-center">
                <div className="bg-white/70 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#232b7c] mb-1">150+</div>
                  <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
                </div>
                <div className="bg-white/70 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-[#a98946] mb-1">98%</div>
                  <div className="text-sm text-gray-600 font-medium">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Partnership Banner Component
function PartnershipBanner() {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="bg-[#232b7c] relative overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[280px]">
        {/* Left Side - Text Content */}
        <div className={`flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <img 
              src="/logo.png" 
              alt="Amico Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-white">
              <div className="text-lg font-bold uppercase tracking-wide">Amico</div>
              <div className="text-xs uppercase tracking-wider">Sports Infra</div>
            </div>
            {/* <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center ml-2">
              <div className="text-[#FF5C3D] font-bold text-[9px] text-center leading-tight">
                WORLD<br/>PICKLEBALL<br/>LEAGUE
              </div>
            </div> */}
          </div>
          <h3 className="text-white text-2xl md:text-3xl font-medium mb-6 leading-tight uppercase tracking-wide">
            OFFICIAL SPORTS INFRASTRUCTURE DEVELOPMENT PARTNER FOR <span className="inline-block">ALL INDIA PICKLEBALL ASSOCIATION</span>
          </h3>
          <button className="bg-white text-[#FF5C3D] px-8 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-gray-100 hover:scale-105 transition-all w-fit">
            READ MORE
          </button>
        </div>

        {/* Right Side - Parallelogram Image */}
        <div className={`relative transition-all duration-700 delay-200 ${
          isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          {/* Parallelogram wrapper - stretches full height */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ 
              transform: 'skewX(-10deg)',
              transformOrigin: 'center',
              left: '-5%',
              width: '110%'
            }}
          >
            <img 
              src="https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1200&h=600&fit=crop" 
              alt="Pickleball Court" 
              className="w-full h-full object-cover"
              style={{ 
                transform: 'skewX(10deg) scale(1.15)',
                transformOrigin: 'center'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

// Testimonials Component
function TestimonialsSection() {
  const [ref, isInView] = useInView();
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "Amico transformed our sports facility beyond expectations. Their attention to detail and commitment to quality is unmatched. The padel courts they built are world-class!",
      name: "Rajesh Kumar",
      title: "Sports Director, Elite Sports Academy",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      id: 2,
      text: "Working with Amico was a game-changer for our institution. They delivered a state-of-the-art sports complex on time and within budget. Highly professional team!",
      name: "Priya Sharma",
      title: "Principal, International School of Sports",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      id: 3,
      text: "From design to execution, Amico demonstrated exceptional expertise. Our tennis courts are beautiful and perfectly constructed. Best decision we made!",
      name: "Anil Patel",
      title: "CEO, Urban Sports Club",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop"
    },
    {
      id: 4,
      text: "The quality of construction and materials used by Amico is outstanding. Our athletes love the new facilities. Professional service from start to finish!",
      name: "Meera Singh",
      title: "Head Coach, National Sports Institute",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop"
    }
  ];

  // Auto-scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section ref={ref} className="bg-white py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className={`text-center text-[#a98946] text-sm font-semibold tracking-wider mb-4 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          TESTIMONIALS
        </h3>
        <h2 className={`text-center text-4xl font-thin text-gray-900 mb-16 transition-all duration-700 delay-100 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          What Our Clients Say
        </h2>

        {/* Testimonial Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-[#232b7c] p-10 md:p-12 rounded-2xl shadow-xl">
                  {/* Quote Icon */}
                  <div className="text-[#c7ab5d] mb-6">
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 32 32">
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 text-white text-lg md:text-xl leading-relaxed mb-8 italic">
                    "{testimonial.text}"
                  </p>

                  {/* Author Info */}
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h4 className="text-[#232b7c] font-semibold text-lg text-white">{testimonial.name}</h4>
                      <p className="text-gray-600 text-sm text-white">{testimonial.title}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 bg-[#a98946]'
                    : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Featured Project Component
function FeaturedProjectSection() {
  const [ref, isInView] = useInView();

  return (
    <section ref={ref} className="bg-[#e8e6c8] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className={`text-center text-[#a98946] text-sm font-semibold tracking-wider mb-16 transition-all duration-700 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}>
          FEATURED PROJECTS
        </h3>
        
        {/* Container for overlapping elements */}
        <div className="relative max-w-5xl mx-auto">
          {/* Image - slides in from left */}
          <div className={`relative z-10 transition-all duration-1000 ease-out ${
            isInView ? 'translate-x-0' : '-translate-x-32'
          }`}>
            <img 
              src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1000&h=600&fit=crop" 
              alt="Sports Complex" 
              className="w-full md:w-4/5 h-[500px] object-cover rounded-2xl shadow-2xl"
            />
          </div>

          {/* Text Box - slides in from right and overlaps the image */}
          <div className={`absolute bottom-8 right-0 md:right-16 z-20 w-full md:w-[380px] transition-all duration-1000 ease-out ${
            isInView ? 'translate-x-0 opacity-100' : 'translate-x-32 opacity-0'
          }`}>
            <div className="bg-white p-8 rounded-xl shadow-2xl border-l-4 border-[#a98946] hover:shadow-3xl transition-shadow duration-300">
              <div className="mb-4">
                <span className="inline-block bg-[#232b7c] text-white text-xs font-semibold px-3 py-1 rounded-full mb-3">
                  FEATURED PROJECT
                </span>
                <h4 className="text-2xl font-thin text-gray-900 mb-3 leading-tight">
                  Padukone-Dravid Centre for Sports Excellence
                </h4>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div>
                  <div className="text-xl font-bold text-[#232b7c]">15,000</div>
                  <div className="text-xs text-gray-500 uppercase">Sq Ft</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div>
                  <div className="text-xl font-bold text-[#a98946]">8</div>
                  <div className="text-xs text-gray-500 uppercase">Sports</div>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div>
                  <div className="text-xl font-bold text-[#232b7c]">2024</div>
                  <div className="text-xs text-gray-500 uppercase">Year</div>
                </div>
              </div>

              <button className="bg-[#232b7c] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#a98946] transition-all flex items-center group shadow-lg hover:shadow-xl w-full justify-center">
                VIEW DETAILS 
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function AmicoHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" style={{fontFamily: 'Helvetica'}} >
      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-left {
          animation: fadeInLeft 1s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 1s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slideUp 0.8s ease-out 0.3s forwards;
          opacity: 0;
        }
        
        .animate-slide-up-delay {
          animation: slideUp 0.8s ease-out 0.6s forwards;
          opacity: 0;
        }
      `}</style>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Mobile Layout - Logo Left, Hamburger Right */}
            <div className="flex lg:hidden items-center w-full justify-between">
              <img 
                src="/logo.png" 
                alt="Amico Logo" 
                className="w-12 h-12 object-contain hover:scale-105 transition-transform cursor-pointer"
              />
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
              <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                PROJECTS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                SPORTS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
            
            <div className="hidden lg:flex items-center hover:scale-105 transition-transform cursor-pointer">
              <img 
                src="/logo.png" 
                alt="Amico Logo" 
                className="w-12 h-12 object-contain"
              />
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
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            <div className="px-4 py-4 space-y-3">
              <a
                href="#"
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                HOME
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                PROJECTS
              </a>
              <a
                href="#"
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-[#232b7c] hover:bg-gray-50 rounded-md transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                SPORTS
              </a>
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
      <section className="pt-20">
        {/* Mobile View - Stacked Layout */}
        <div className="md:hidden">
          {/* Top Image */}
          <div className="h-48 bg-cover bg-center animate-fade-in relative" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800")'}}>
            <div className="h-full bg-gradient-to-b from-transparent to-white/30"></div>
          </div>
          
          {/* Center Content */}
          <div className="bg-white py-12 px-4 flex flex-col items-center justify-center animate-fade-in">
            <h1  className="text-4xl text-black font-thin mb-4 animate-slide-up text-center">We Build</h1>
            <h2 className="text-4xl font-thin animate-slide-up-delay text-center">
              <span className="text-[#a98946]">Padel Courts</span>
              
            </h2>
          </div>
          
          {/* Bottom Image */}
          <div className="h-48 bg-cover bg-center animate-fade-in relative" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800")'}}>
            <div className="h-full bg-gradient-to-t from-transparent to-white/30"></div>
          </div>
        </div>

        {/* Desktop View - Three Column Layout */}
        <div className="hidden md:grid grid-cols-3 min-h-[600px]">
          {/* Left Image */}
          <div className="h-[600px] bg-cover bg-center animate-fade-in-left" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800")'}}>
            <div className="h-full bg-gradient-to-r from-transparent to-[#e8e6c8]/50"></div>
          </div>
          
          {/* Center Content */}
          <div className="h-[600px] bg-white flex flex-col items-center justify-center animate-fade-in px-4">
          <h1 style={{fontFamily: 'Helvetica'}} className="text-4xl text-black font-thin mb-4 animate-slide-up text-center">We Build</h1>
            <h2 className="text-4xl font-thin animate-slide-up-delay text-center">
              <span className="text-[#a98946]">Padel Courts</span>
        
            </h2>
          </div>
          
          {/* Right Image */}
          <div className="h-[600px] bg-cover bg-center animate-fade-in-right" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1622163642998-1ea32b0bbc67?w=800")'}}>
            <div className="h-full bg-gradient-to-l from-transparent to-[#e8e6c8]/50"></div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <WhatWeDoSection />

      {/* Clients Section */}
      <ClientsSection />

      {/* Pickleball Partnership Banner */}
      <PartnershipBanner />

      {/* Featured Project */}
      <FeaturedProjectSection />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Footer */}
      <footer className="bg-[#232b7c] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">© 2024 Amico Sports Infrastructure. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}