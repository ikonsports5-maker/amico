'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@sanity/client';
import { urlFor } from '@/lib/imageUrl';
// Custom hook for intersection observer
import { PT_Sans } from 'next/font/google';

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});
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

// Typing animation hook
function useTypingAnimation(words: string[], typingSpeed: number = 150, deletingSpeed: number = 100, pauseDuration: number = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Finished typing, pause then start deleting
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          // Finished deleting, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, words, typingSpeed, deletingSpeed, pauseDuration]);

  return displayText;
}

// What We Do Section Component
function WhatWeDoSection() {
  const [ref, isInView] = useInView();
  const projectsCount = useCountUp(400, 2000, isInView);
  const clientsCount = useCountUp(100, 2000, isInView);
  const citiesCount = useCountUp(20, 2000, isInView);

  return (
    <section ref={ref} className="bg-[#F5F5F2] py-24 relative overflow-hidden">
      {/* Background Images - Left */}
      <div className="absolute left-0 top-0 h-full w-1/4 opacity-[0.2] pointer-events-none">
        <img 
          src="/bgimg.png" 
          alt="" 
          className="h-full w-auto object-contain object-left"
        />
      </div>
      
      {/* Background Images - Right */}
      <div className="absolute right-0 top-0 h-full w-1/4 opacity-[0.2] pointer-events-none">
        <img 
          src="/bgimg.png" 
          alt="" 
          className="h-full w-auto object-contain object-right transform scale-x-[-1]"
        />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#a98946] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Our Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-normal text-[#1A2266] mb-6">
            What We Do
          </h2>
          <div className="w-20 h-1 bg-[#a98946] mx-auto rounded-full"></div>
        </div>
        
        <p className={`text-center text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-100 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          Amico brings together a team of highly experienced professionals in sports infrastructure, delivering technically sound and commercially viable facilities across India.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto text-gray-600 text-center mb-16">
           <p className="leading-relaxed">
             We specialize in <strong>Football Turf</strong>, <strong>Tennis Courts</strong>, <strong>Cricket Turf</strong>, and <strong>Badminton Courts</strong>.
           </p>
           <p className="leading-relaxed">
             Our expertise extends to <strong>Pickleball Courts</strong>, <strong>Basketball Courts</strong>, and professional <strong>Athletic Tracks</strong>.
           </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-16">
          <div className={`bg-[#232b7c] rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-300 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="text-3xl md:text-4xl font-bold">{projectsCount}+</div>
            <div className="text-xs md:text-sm mt-2 font-medium tracking-wider">PROJECTS</div>
          </div>
          <div className={`bg-[#232b7c] rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-500 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="text-3xl md:text-4xl font-bold">{clientsCount}+</div>
            <div className="text-xs md:text-sm mt-2 font-medium tracking-wider">CLIENTS</div>
          </div>
          <div className={`bg-[#232b7c] rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-700 ${
            isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
          }`}>
            <div className="text-3xl md:text-4xl font-bold">{citiesCount}+</div>
            <div className="text-xs md:text-sm mt-2 font-medium tracking-wider">CITIES</div>
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
    <section ref={ref} className="py-20 bg-white  ${ptSans.className}">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Text Content */}
          <div className={`transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <p className="text-[#a98946] text-sm font-semibold tracking-wider mb-4">CLIENTS - WORK & US</p>
            <h2 className="text-3xl font-medium text-gray-900 mb-6 leading-tight">
              Big Things Beautiful
              & Small Things
              <span className="text-[#a98946]"> Brilliant</span>
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
              <h3 className={`text-2xl font-semibold text-[#232b7c] mb-8 text-center transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}>
                Trusted By Leading Organizations
              </h3>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                {[1, 2, 3, 4].map((item, idx) => (
                  <div 
                    key={item}
                    className={`bg-white p-6 rounded-lg shadow-md grayscale hover:grayscale-0 transition-all duration-500 hover:scale-105 flex items-center justify-center ${
                      isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                    style={{ transitionDelay: `${300 + idx * 100}ms` }}
                  >
                    <img 
                      src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=150&h=80&fit=crop" 
                      alt={`Client ${item}`} 
                      className="h-16 w-full object-contain"
                    />
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-6 text-center">
                <div className={`bg-white/70 p-4 rounded-lg transition-all duration-500 delay-700 ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
                  <div className="text-3xl font-bold text-[#232b7c] mb-1">150+</div>
                  <div className="text-sm text-gray-600 font-medium">Happy Clients</div>
                </div>
                <div className={`bg-white/70 p-4 rounded-lg transition-all duration-500 delay-[800ms] ${
                  isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                }`}>
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
    <section ref={ref} className="bg-[#232b7c] relative overflow-hidden ${ptSans.className}"  >
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch min-h-[280px]">
        {/* Left Side - Text Content */}
        <div className="flex flex-col justify-center px-6 sm:px-8 lg:px-12 py-8">
          <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            <img 
              src="/logo.png" 
              alt="Amico Logo" 
              className="w-12 h-12 object-contain"
            />
            <div className="text-white">
              <div className="text-lg font-bold uppercase tracking-wide">Amico</div>
              <div className="text-xs uppercase tracking-wider">Sports Infra</div>
            </div>
          </div>
          <h3 className={`text-white text-2xl md:text-3xl font-medium mb-6 leading-tight uppercase tracking-wide transition-all duration-700 delay-200 ${
            isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
          }`}>
            OFFICIAL SPORTS INFRASTRUCTURE DEVELOPMENT PARTNER FOR <span className="inline-block">ALL INDIA PICKLEBALL ASSOCIATION</span>
          </h3>
         
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
    <section ref={ref} className="bg-[#F5F5F2] py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-[#a98946] text-xs font-bold tracking-[0.2em] uppercase block mb-3">
            Client Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-light text-[#1A2266] mb-6">
            What Our Clients Say
          </h2>
          <div className="w-20 h-1 bg-[#a98946] mx-auto rounded-full"></div>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, idx) => (
              <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                    {/* Left Side - Text Content */}
                    <div className="p-8 md:p-12 flex flex-col justify-center order-2 md:order-1">
                      {/* Quote Icon */}
                      <div className={`text-[#a98946] mb-6 transition-all duration-500 ${
                        currentIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
                      }`}>
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 32 32">
                          <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                        </svg>
                      </div>

                      {/* Testimonial Text */}
                      <p className={`text-gray-700 text-lg md:text-xl leading-relaxed mb-8 transition-all duration-700 delay-200 ${
                        currentIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        "{testimonial.text}"
                      </p>

                      {/* Author Info */}
                      <div className={`border-t border-gray-200 pt-6 transition-all duration-700 delay-400 ${
                        currentIndex === idx ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <h4 className="text-[#1A2266] font-semibold text-xl mb-1">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm">{testimonial.title}</p>
                      </div>
                    </div>

                    {/* Right Side - Photo */}
                    <div className={`relative h-64 md:h-auto order-1 md:order-2 transition-all duration-700 ${
                      currentIndex === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                    }`}>
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-transparent to-black/10"></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-10">
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
  const [ref] = useInView();
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const client = createClient({
      projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
      apiVersion: '2025-01-01',
      useCdn: true,
    });

    client
      .fetch(
        `*[_type == "project" && featured == true] | order(_createdAt desc)[0...3]{
          _id,
          title,
          location,
          year,
          slug,
          heroImage
        }`,
      )
      .then((data) => setProjects(data || []))
      .catch((err) => {
        console.error('Error fetching featured projects', err);
      });
  }, []);

  return (
    <section ref={ref} className="bg-[#e8e6c8] py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-center text-[#a98946] text-sm font-semibold tracking-wider mb-16">
          FEATURED PROJECTS
        </h3>

        {/* Projects Container: Horizontal Carousel on Mobile, Overlapping card on Desktop */}
        <div className="flex md:flex-col overflow-x-auto md:overflow-visible snap-x snap-mandatory gap-6 md:gap-24 pb-8 md:pb-0">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={
                project.slug?.current
                  ? `/product/${project.slug.current}`
                  : '/product'
              }
              className="relative max-w-5xl mx-auto min-w-[85vw] md:min-w-full snap-center flex flex-col group"
            >
              {/* Image */}
              <div className="relative z-10">
                <div className="w-full md:w-full h-[380px] sm:h-[460px] md:h-[520px] overflow-hidden rounded-2xl shadow-2xl mx-auto">
                  {project.heroImage && (
                    <img
                      src={urlFor(project.heroImage).width(2000).height(1400).url()}
                      alt={project.title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>
              </div>

              {/* Text Box overlapping image on the right (desktop), below on mobile */}
              {/* FIX: Added 'z-20' here to ensure overlap works */}
              <div className="mt-6 md:mt-0 md:absolute md:inset-y-1/4 md:right-10 lg:right-16 flex md:items-center z-20">
                <div className="bg-white px-8 py-7 md:py-10 rounded-xl md:rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] border border-gray-100 max-w-md md:max-w-lg w-full md:w-auto md:min-w-[360px]">
                  {project.location && (
                    <p className="text-[11px] tracking-[0.35em] text-gray-500 uppercase mb-3 flex items-center gap-1">
                      <span>●</span>
                      {project.location}
                    </p>
                  )}
                  <h4 className="text-2xl md:text-3xl font-light text-gray-900 leading-snug mb-6">
                    {project.title}
                  </h4>
                  <div className="flex items-center justify-end">
                    <span className="text-[11px] tracking-[0.3em] uppercase text-gray-500 mr-3">
                      View details
                    </span>
                    <span className="text-sm">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
export default function AmicoHomepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsDropdownOpen, setSportsDropdownOpen] = useState(false);

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

  // Sports names for typing animation
  const sportsNames = sportsPages.map(sport => sport.name);
  const animatedText = useTypingAnimation(sportsNames, 100, 50, 1500);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
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
              <a href="/" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                HOME
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/product" className="text-xs font-medium text-gray-600 hover:text-[#232b7c] transition-colors relative group">
                PROJECTS
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span>
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
                  {/* <span className="absolute bottom-6 left-0 w-0 h-0.5 bg-[#232b7c] group-hover:w-full transition-all duration-300"></span> */}
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
          {/* Top Video */}
          <div className="h-[350px] relative animate-fade-in overflow-hidden">
            <video 
              src="/amico-vid-1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/30"></div>
          </div>
          
          {/* Center Content */}
          <div className="bg-white py-12 px-4 flex flex-col items-center justify-center animate-fade-in">
            <h1 className="text-4xl text-black font-thin mb-4 animate-slide-up text-center">We Build</h1>
            <h2 className="text-4xl font-thin animate-slide-up-delay text-center">
              <span className="text-[#a98946]">{animatedText}<span className="animate-pulse">|</span></span>
            </h2>
          </div>
          
         
        </div>

        {/* Desktop View - Three Column Layout */}
        <div className="hidden md:grid grid-cols-3 min-h-[600px]">
          {/* Left Video */}
          <div className="h-[600px] relative animate-fade-in-left overflow-hidden">
            <video 
              src="/amico-vid-1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#e8e6c8]/50"></div>
          </div>
          
          {/* Center Content */}
          <div className="h-[600px] bg-white flex flex-col items-center justify-center animate-fade-in px-4">
          <h1 className="text-4xl text-black font-thin mb-4 animate-slide-up text-center">We Build</h1>
            <h2 className="text-4xl font-thin animate-slide-up-delay text-center">
              <span className="text-[#a98946]">{animatedText}<span className="animate-pulse">|</span></span>
            </h2>
          </div>
          
          {/* Right Video */}
          <div className="h-[600px] relative animate-fade-in-right overflow-hidden">
            <video 
              src="/amico-vid-1.mp4" 
              autoPlay 
              loop 
              muted 
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#e8e6c8]/50"></div>
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
                  Address: 14/122,<br /> Shipra Path, Mansarovar Sector 1,<br /> Mansarovar, Jaipur, Rajasthan 302020 <br />
                    <a href="#" className="underline decoration-1 underline-offset-2 hover:text-gray-200">View on Google Maps</a>
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span>+91-8209730974</span>
                </li>
                <li className="flex items-center gap-3">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <a href="mailto:info@amicosports.com" className="hover:text-gray-200">info@amicosports.com</a>
                </li>
              </ul>
            </div>

            {/* Explore */}
            <div>
              <h4 className="text-sm font-bold tracking-widest mb-6 uppercase">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="hover:text-gray-200 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-gray-200 transition-colors">Contact Us</a></li>
                <li><a href="/projects" className="hover:text-gray-200 transition-colors">Projects</a></li>
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

        {/* Decorative Shuttlecock (Visual Approximation) */}
        <div className="absolute bottom-20 right-0 opacity-20 pointer-events-none hidden lg:block">
            {/* We can't use an image we don't have, but we can put a subtle svg pattern or just leave it clean. 
                I'll leave it clean for now to avoid broken images, or I could reuse the logo if desired.
                The user asked for "like this" referring to the layout mainly. 
            */}
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