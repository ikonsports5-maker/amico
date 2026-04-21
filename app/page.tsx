'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { createClient } from '@sanity/client';
import Footer from './components/Footer';
import { urlFor } from '@/lib/imageUrl';
// Custom hook for intersection observer
import { PT_Sans } from 'next/font/google';
import { MainNav } from './components/MainNav';

const ptSans = PT_Sans({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});



const SurfacesSection = () => {
  const cards = [
    { id: 'badminton', slug: 'badminton-courts', name: 'BADMINTON', circleBg: '#EBF1FF', iconColor: '#3B82F6', lineColor: '#3B82F6', isHighlighted: false },
    { id: 'football', slug: 'football-turf', name: 'FOOTBALL', circleBg: 'transparent', iconColor: '#FFFFFF', lineColor: '#FFFFFF', isHighlighted: true },
    { id: 'tennis', slug: 'tennis-courts', name: 'TENNIS', circleBg: '#F3E8FF', iconColor: '#335495', lineColor: '#335495', isHighlighted: false },
    { id: 'pickleball', slug: 'pickleball-courts', name: 'PICKLEBALL', circleBg: '#E6F4EA', iconColor: '#335495', lineColor: '#84CC16', isHighlighted: false },
    { id: 'basketball', slug: 'basketball-courts', name: 'BASKETBALL', circleBg: '#FFEDD5', iconColor: '#335495', lineColor: '#F97316', isHighlighted: false },
    { id: 'squash', slug: 'squash-courts', name: 'SQUASH', circleBg: '#E0F2FE', iconColor: '#335495', lineColor: '#06B6D4', isHighlighted: false },
    { id: 'athletic-track', slug: 'athletic-tracks', name: 'ATHLETIC TRACK', circleBg: '#F3E8FF', iconColor: '#335495', lineColor: '#8B5CF6', isHighlighted: false },
    { id: 'cricket', slug: 'cricket-turf', name: 'CRICKET', circleBg: '#FEF3C7', iconColor: '#335495', lineColor: '#EAB308', isHighlighted: false },
  ];

  const getIcon = (id: string) => {
    switch (id) {
      case 'badminton':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="10" width="28" height="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="14" x2="34" y2="14" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="26" x2="34" y2="26" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="10" x2="12" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <line x1="28" y1="10" x2="28" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="20" x2="28" y2="20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'football':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="4" y="10" width="32" height="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="10" x2="20" y2="30" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
            <rect x="4" y="15" width="4" height="10" stroke="currentColor" strokeWidth="1.5" />
            <rect x="32" y="15" width="4" height="10" stroke="currentColor" strokeWidth="1.5" />
            <rect x="4" y="18" width="2" height="4" stroke="currentColor" strokeWidth="1.5" />
            <rect x="34" y="18" width="2" height="4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'tennis':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="10" y="4" width="20" height="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="4" x2="14" y2="36" stroke="currentColor" strokeWidth="1.5" />
            <line x1="26" y1="4" x2="26" y2="36" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="12" x2="26" y2="12" stroke="currentColor" strokeWidth="1.5" />
            <line x1="14" y1="28" x2="26" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'pickleball':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="6" y="12" width="28" height="16" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="12" x2="20" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="16" y1="12" x2="16" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="24" y1="12" x2="24" y2="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="6" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="24" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'basketball':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="10" y="4" width="20" height="32" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="4" stroke="currentColor" strokeWidth="1.5" />
            <rect x="16" y="4" width="8" height="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 4 C12 14, 28 14, 28 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
            <rect x="16" y="30" width="8" height="6" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 36 C12 26, 28 26, 28 36" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        );
      case 'squash':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="10" y="6" width="20" height="28" stroke="currentColor" strokeWidth="1.5" />
            <line x1="10" y1="20" x2="30" y2="20" stroke="currentColor" strokeWidth="1.5" />
            <line x1="20" y1="20" x2="20" y2="34" stroke="currentColor" strokeWidth="1.5" />
            <rect x="10" y="20" width="4" height="4" stroke="currentColor" strokeWidth="1.5" />
            <rect x="26" y="20" width="4" height="4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'athletic-track':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <rect x="8" y="6" width="24" height="28" rx="12" stroke="currentColor" strokeWidth="1.5" />
            <rect x="12" y="10" width="16" height="20" rx="8" stroke="currentColor" strokeWidth="1.5" />
            <rect x="16" y="14" width="8" height="12" rx="4" stroke="currentColor" strokeWidth="1.5" />
            <line x1="8" y1="20" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      case 'cricket':
        return (
          <svg width="54" height="54" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
            <rect x="18" y="12" width="4" height="16" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        );
      default: return null;
    }
  };

  return (
    <section className="py-16 md:py-24 relative bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[#EBF1FF] rounded-full blur-[80px] md:blur-[100px] opacity-70 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-[#F3E8FF] rounded-full blur-[80px] md:blur-[100px] opacity-70 translate-y-1/3 -translate-x-1/4"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 opacity-20" style={{ backgroundImage: 'radial-gradient(#9ca3af 2px, transparent 2px)', backgroundSize: '16px 16px' }}></div>

      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">

          {/* Left Text */}
          <div className="lg:w-[35%] text-left">
            <p className="text-[#F26E41] font-bold text-xs md:text-sm uppercase tracking-[0.2em] mb-4">Surfaces</p>
            <div className="w-12 h-[3px] bg-[#F26E41] mb-6"></div>
            <h2 className="text-4xl md:text-5xl lg:text-[52px] font-black text-[#1A1F2C] leading-[1.1] mb-6 tracking-tight">
              Deeper than<br />the Surface
            </h2>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-sm">
              Our team has the experience and know how to install varied sports surfaces to meet international standards.
            </p>
            {/* <a href="/surfaces" className="inline-flex items-center text-[#F26E41] font-bold text-xs uppercase tracking-widest hover:text-[#d35a2e] transition-colors group">
              Explore Surfaces
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </a> */}
          </div>

          {/* Right Grid */}
          <div className="lg:w-[65%]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {cards.map((card) => (
                <Link
                  href={`/sports/${card.slug}`}
                  key={card.id}
                  className={`relative flex flex-col items-center justify-center p-6 rounded-2xl transition-all duration-300 ${card.isHighlighted
                    ? 'bg-[#2563EB] text-white shadow-xl scale-[1.02] md:scale-105 z-10'
                    : 'bg-white text-[#1A1F2C] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1'
                    }`}
                >
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: card.circleBg, color: card.iconColor }}
                  >
                    {getIcon(card.id)}
                  </div>
                  <h3 className="text-[11px] md:text-xs font-bold uppercase tracking-widest text-center mb-3">
                    {card.name}
                  </h3>
                  <div
                    className="w-4 h-[3px] rounded-full"
                    style={{ backgroundColor: card.lineColor }}
                  ></div>

                  {card.isHighlighted && (
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-t-[12px] border-t-[#2563EB] border-r-[12px] border-r-transparent"></div>
                  )}
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
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

        <p className={`text-center text-gray-600 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed transition-all duration-700 delay-100 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
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
          <div className={`bg-[#232b7c] rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-300 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}>
            <div className="text-3xl md:text-4xl font-bold">{projectsCount}+</div>
            <div className="text-xs md:text-sm mt-2 font-medium tracking-wider">PROJECTS</div>
          </div>
          <div className={`bg-[#232b7c] rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-500 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
            }`}>
            <div className="text-3xl md:text-4xl font-bold">{clientsCount}+</div>
            <div className="text-xs md:text-sm mt-2 font-medium tracking-wider">CLIENTS</div>
          </div>
          <div className={`bg-[#232b7c] rounded-full w-36 h-36 md:w-40 md:h-40 flex flex-col items-center justify-center text-white shadow-xl hover:scale-110 transition-all duration-500 delay-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
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

  const clients = [
    { name: "Center for Sports Excellence", src: "/images/logo1.jpeg" },
    { name: "Rohan Bopanna", src: "/images/logo2.jpeg" },
    { name: "South United", src: "/images/logo3.png" },
    { name: "Hiranandani", src: "/images/logo4.png" },
    { name: "Mahindra", src: "/images/logo5.png" },
    { name: "L&T", src: "/images/logo6.jpeg" },
    { name: "Harrow School", src: "/images/logo7.png" },
    { name: "Google", src: "/images/logo8.png" },
    { name: "Indian Army", src: "/images/logo2.jpeg" },
  ];

  return (
    <section ref={ref} className="py-24 bg-[#FAFAFA] relative overflow-hidden font-sans">
      {/* Background wave decoration on bottom left */}
      <div className={`absolute bottom-0 left-0 w-full md:w-[60%] h-[300px] pointer-events-none opacity-[0.12] transition-opacity duration-1000 ${isInView ? 'opacity-[0.12]' : 'opacity-0'}`}>
        <svg viewBox="0 0 800 400" preserveAspectRatio="none" className="w-full h-full text-[#D45A25]">
          <path d="M0,400 C150,380 300,300 450,200 C600,100 700,50 800,0" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M0,400 C150,390 300,320 450,220 C600,120 700,70 800,20" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M0,400 C150,400 300,340 450,240 C600,140 700,90 800,40" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M0,400 C150,370 300,280 450,180 C600,80 700,30 800,-20" stroke="currentColor" strokeWidth="1" fill="none" />
          <path d="M0,400 C150,350 300,260 450,160 C600,60 700,10 800,-40" stroke="currentColor" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="max-w-[1150px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center">
        <div className="flex flex-col lg:flex-row w-full gap-16 lg:gap-24">

          {/* Left Column */}
          <div className={`lg:w-[45%] flex flex-col justify-center transition-all duration-700 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-4">
              <p className="text-[#D45A25] text-xs font-bold tracking-[0.2em] uppercase mb-3">
                CLIENTS, WORK & US
              </p>
              <div className="w-10 h-[2.5px] bg-[#D45A25]"></div>
            </div>

            <h2 className="text-[38px] md:text-[46px] lg:text-[48px] font-serif text-[#1C1F1D] leading-[1.1] mb-8">
              Big Things Beautiful &
              Small Things <span className="text-[#D45A25] italic font-medium">Brilliant</span>
            </h2>

            <p className="text-gray-600 text-[15.5px] leading-relaxed mb-12 max-w-[400px]">
              We are immensely proud of our family of diverse clients that have trusted us to support them. Be it a leading education institution or a multinational organisation, we have delivered world-class sports facilities.
            </p>

            {/* Arrow Line */}
            <div className="flex items-center mb-16 w-full max-w-[340px]">
              <div className="flex-1 h-[1px] bg-[#E2CDC2]"></div>
              <div className="w-8 h-8 rounded-full bg-[#D45A25] flex items-center justify-center text-white shrink-0 ml-[-1px] shadow-sm hover:scale-110 transition-transform cursor-pointer">
                <svg className="w-4 h-4 ml-[2px] mt-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 19L19 5M19 5v10M19 5H9" /></svg>
              </div>
            </div>

            {/* Industries Block */}
            <div className="flex items-start gap-6">
              {/* Bank Icon */}
              <div className="w-[72px] h-[72px] rounded-full bg-[#FCF0EB] flex items-center justify-center text-[#D45A25] shrink-0 border border-[#FBE3DA]">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 10h20L12 3z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 10v8M10 10v8M14 10v8M18 10v8" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 18h18M2 21h20" />
                </svg>
              </div>

              <div className="pt-1">
                <h4 className="text-[#1A1F1C] text-[13px] font-bold tracking-[0.16em] uppercase mb-4 leading-relaxed max-w-[200px]">
                  SOME INDUSTRIES WE'VE WORKED IN
                </h4>

                <div className="text-gray-600 text-[14px] leading-loose">
                  <span className="font-medium">Education</span>
                  <span className="text-[#D45A25] mx-3 opacity-60">|</span>
                  <span className="font-medium">IT</span>
                  <span className="text-[#D45A25] mx-3 opacity-60">|</span>
                  <span className="font-medium">Government</span>
                  <br />
                  <span className="font-medium">Real Estate</span>
                  <span className="text-[#D45A25] mx-3 opacity-60">|</span>
                  <span className="font-medium">Architects</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Grid */}
          <div className={`lg:w-[55%] flex flex-col mt-10 lg:mt-0 transition-all duration-1000 delay-300 ease-out ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>

            {/* 3x3 Grid Card */}
            <div className="bg-[#FDFCF6] rounded-[48px] border border-[#EBEBE2] relative shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] aspect-square max-w-[540px] w-full self-center lg:self-end">

              <div className="grid grid-cols-3 grid-rows-3 w-full h-full relative p-2 md:p-3">
                {clients.map((client, i) => (
                  <div key={i} className={`flex items-center justify-center p-5 relative ${i % 3 !== 2 ? 'border-r border-[#EBEBE2]' : ''} ${Math.floor(i / 3) !== 2 ? 'border-b border-[#EBEBE2]' : ''}`}>
                    <img src={client.src} alt={client.name} className="max-w-[80%] max-h-[80%] object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                  </div>
                ))}
              </div>

              {/* Intersection Decorative Crosses */}
              <div className="absolute top-1/3 left-1/3 w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#D45A25]">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C16 8.83656 23.1634 16 32 16C23.1634 16 16 23.1634 16 32C16 23.1634 8.83656 16 0 16C8.83656 16 16 8.83656 16 0Z" /></svg>
              </div>
              <div className="absolute top-1/3 left-2/3 w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#D45A25]">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C16 8.83656 23.1634 16 32 16C23.1634 16 16 23.1634 16 32C16 23.1634 8.83656 16 0 16C8.83656 16 16 8.83656 16 0Z" /></svg>
              </div>
              <div className="absolute top-2/3 left-1/3 w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#D45A25]">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C16 8.83656 23.1634 16 32 16C23.1634 16 16 23.1634 16 32C16 23.1634 8.83656 16 0 16C8.83656 16 16 8.83656 16 0Z" /></svg>
              </div>
              <div className="absolute top-2/3 left-2/3 w-5 h-5 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center text-[#D45A25]">
                <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor"><path d="M16 0C16 8.83656 23.1634 16 32 16C23.1634 16 16 23.1634 16 32C16 23.1634 8.83656 16 0 16C8.83656 16 16 8.83656 16 0Z" /></svg>
              </div>
            </div>

            {/* Bottom Quote inside the Right Column */}
            <div className="flex items-center gap-6 mt-12 max-w-[540px] w-full self-center lg:self-end pr-4 pl-4 md:pl-8">
              <div className="w-14 h-14 rounded-full bg-[#FCF0EB] flex items-center justify-center text-[#D45A25] shrink-0 border border-[#FBE3DA] shadow-sm">
                <span className="text-4xl font-serif leading-none mt-2">“</span>
              </div>
              <div className="text-[#363C38] text-[15px] pt-1 leading-[1.6]">
                Partnerships built on trust. <br />
                <span className="italic font-serif">Results that speak for themselves.</span>
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
          <div className={`flex items-center gap-4 mb-6 transition-all duration-700 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
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
          <h3 className={`text-white text-2xl md:text-3xl font-medium mb-6 leading-tight uppercase tracking-wide transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
            OFFICIAL SPORTS INFRASTRUCTURE DEVELOPMENT PARTNER FOR <span className="inline-block">ALL INDIA PICKLEBALL ASSOCIATION</span>
          </h3>

        </div>

        {/* Right Side - Parallelogram Image */}
        <div className={`relative transition-all duration-700 delay-200 ${isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
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

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      text: "What was most impressive about Amico and their team was the in-depth knowledge and experience they have in all sports surfaces and the different options they have on offer based on the requirements, usage patterns, and price points. A person who respects the needs of the sporting community will always ensure high-quality standards and reliable service.",
      name: "VIVEK KUMAR",
      title: "Founder, Padukone-Dravid Centre for Sports Excellence (CSE)",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600&auto=format&fit=crop",
      projectName: "Padukone-Dravid Centre for Sports Excellence"
    },
    {
      id: 2,
      text: "Working with Amico was a game-changer for our institution. They delivered a state-of-the-art sports complex on time and within budget. Highly professional team! The quality of construction and materials used is outstanding. Our athletes absolutely love the new facilities.",
      name: "PRIYA SHARMA",
      title: "Principal, International School of Sports",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      projectName: "ISS Multi-Sport Complex"
    },
    {
      id: 3,
      text: "From design to execution, Amico demonstrated exceptional expertise. Our tennis courts are beautiful and perfectly constructed. Best decision we made! Our athletes love the new facilities. Professional service from start to finish. We're looking forward to our next project.",
      name: "ANIL PATEL",
      title: "CEO, Urban Sports Club",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600&auto=format&fit=crop",
      projectName: "Urban Tennis Academy"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <section className="bg-[#FAFBF9] py-24 relative overflow-hidden font-sans flex flex-col items-center">
      {/* Background Decoratives */}
      <div className="absolute top-10 right-10 md:top-24 md:right-24 opacity-30">
        <div className="grid grid-cols-6 gap-3">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="w-[3px] h-[3px] rounded-full bg-gray-400"></div>
          ))}
        </div>
      </div>
      <div className="absolute top-32 right-10 w-80 h-80 bg-[#E8F0EA] rounded-full filter blur-[100px] opacity-60 pointer-events-none"></div>
      <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-[#E8F0EA] rounded-full filter blur-[120px] opacity-80 pointer-events-none"></div>

      {/* Wave Graphic */}
      <svg className="absolute bottom-0 left-0 w-full md:w-1/2 h-auto opacity-[0.25] text-[#86A690] pointer-events-none" viewBox="0 0 1440 320" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,112C672,128,768,192,864,208C960,224,1056,192,1152,192C1248,192,1344,224,1392,240L1440,256V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0,288L48,266.7C96,245,192,203,288,197.3C384,192,480,224,576,234.7C672,245,768,235,864,229.3C960,224,1056,224,1152,213.3C1248,203,1344,181,1392,170.7L1440,160V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z" fill="none" stroke="currentColor" strokeWidth="1" />
      </svg>

      <div className="max-w-[1100px] mx-auto px-4 relative z-10 w-full flex flex-col items-center">
        {/* Header section */}
        <div className="text-center mb-16 relative w-full flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-5">
            <span className="w-6 h-[1px] bg-[#61856B]"></span>
            <span className="text-[#557A5F] text-[10px] md:text-xs font-bold tracking-[0.25em] uppercase">
              Our Happy Customers
            </span>
            <span className="w-6 h-[1px] bg-[#61856B]"></span>
          </div>

          <h2 className="text-[44px] md:text-6xl font-serif tracking-tight text-[#16271D] mb-6 shadow-sm drop-shadow-sm">
            Testimonials
          </h2>

          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-[1px] bg-[#3B5A44]"></div>
            <div className="w-7 h-7 rounded-full bg-[#3B5A44] flex items-center justify-center text-white pb-0.5">
              <span className="text-sm">★</span>
            </div>
            <div className="w-16 h-[1px] bg-[#3B5A44]"></div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full relative flex items-center justify-center">

          {/* Previous Button - hidden mobile */}
          <button
            onClick={handlePrev}
            className="hidden lg:flex w-12 h-12 rounded-full border border-[#3B5A44] bg-[#3B5A44] text-white hover:bg-[#2A4232] transition-colors items-center justify-center absolute left-0 z-20 shadow-lg -translate-x-1/2"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5 ml-[-2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>

          {/* Slider masking wrapper */}
          <div className="w-full max-w-[940px] overflow-hidden rounded-[20px] shadow-[0_12px_40px_-10px_rgba(0,0,0,0.06)] bg-white mx-4 lg:mx-0 relative z-10">
            {/* Slider Track */}
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div key={t.id} className="w-full flex-shrink-0 flex flex-col md:flex-row items-stretch h-auto bg-white min-h-[440px]">

                  {/* Left Content Card */}
                  <div className="w-full md:w-[60%] p-8 md:p-12 lg:p-[60px] flex flex-col justify-between">
                    <div>
                      {/* Quote mark icon */}
                      <svg className="w-16 h-16 md:w-20 md:h-20 text-[#3B5A44] mb-8 shrink-0 relative -left-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      <p className="text-[#414E45] text-[15px] md:text-[16px] leading-[1.8] mb-12 font-medium">
                        {t.text}
                      </p>
                    </div>

                    <div>
                      <div className="w-10 h-[1.5px] bg-[#D4DDD7] mb-5"></div>
                      <h4 className="text-[#202F24] tracking-wide font-bold uppercase text-[15px] md:text-[16px] mb-2 flex items-center gap-2">
                        {t.name}
                      </h4>
                      <h5 className="text-[#6C8E75] font-medium text-[13px] md:text-sm">
                        {t.title}
                      </h5>
                    </div>
                  </div>

                  {/* Right Image + Context Card */}
                  <div className="w-full md:w-[40%] bg-[#364B3B] flex flex-col relative z-0">
                    {/* 60% Image area */}
                    <div className="basis-[60%] shrink-0 h-[280px] md:h-auto w-full relative">
                      <img src={t.image} alt={t.name} className="absolute inset-0 w-full h-full object-cover object-top" />
                    </div>
                    {/* 40% Text Context area */}
                    <div className="basis-[40%] shrink-0 p-8 md:p-10 flex flex-col justify-center bg-[#2B4031]">
                      <p className="text-[#9DB8A4] tracking-[0.2em] text-[10px] uppercase font-bold mb-3">Project</p>
                      <h3 className="text-[#F1F4F2] text-lg md:text-[20px] font-medium leading-snug mb-5">
                        {t.projectName}
                      </h3>
                      <div className="w-8 h-[2px] bg-[#9DB8A4]"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button - hidden mobile */}
          <button
            onClick={handleNext}
            className="hidden lg:flex w-12 h-12 rounded-full border border-gray-300 bg-white text-gray-500 hover:border-[#3B5A44] hover:bg-white hover:text-[#3B5A44] transition-colors items-center justify-center absolute right-0 z-20 shadow-md translate-x-1/2"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5 ml-[2px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Mobile Next/Prev buttons + Dots Container */}
        <div className="flex items-center justify-center gap-6 mt-12 w-full">
          <button onClick={handlePrev} className="lg:hidden p-2.5 rounded-full border border-[#3B5A44] bg-[#3B5A44] text-white">
            <svg className="w-5 h-5 -ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <div className="flex justify-center gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 rounded-full w-2.5 h-2.5 ${index === currentIndex
                  ? 'bg-[#3B5A44]'
                  : 'bg-[#CCD6D0] hover:bg-[#A9B8AF]'
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button onClick={handleNext} className="lg:hidden p-2.5 rounded-full border border-[#B0BEB5] text-[#718878] bg-white">
            <svg className="w-5 h-5 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>

      </div>
    </section>
  );
}

// SpacesDesignedSection Component
function SpacesDesignedSection() {
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
        `*[_type == "project" && featured == true] | order(_createdAt desc)[0...2]{
          _id,
          title,
          location,
          about,
          infrastructure,
          slug,
          heroImage
        }`
      )
      .then((data) => setProjects(data || []))
      .catch((err) => {
        console.error('Error fetching featured projects', err);
      });
  }, []);

  return (
    <section className="py-24 relative bg-white overflow-hidden font-sans">
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FFF5F0] rounded-full blur-[100px] opacity-70"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">

          {/* Left Text */}
          <div className="lg:w-[40%] xl:w-[35%] flex flex-col justify-start pt-4">
            <p className="text-[#F26E41] font-bold text-[11px] uppercase tracking-[0.25em] mb-5">
              Featured Projects
            </p>
            <h2 className="text-[40px] md:text-5xl lg:text-[44px] xl:text-[52px] font-black text-[#1A1F2C] leading-[1.1] mb-6">
              Spaces <br />
              Designed for <br />
              <span className="text-[#F26E41] font-serif italic tracking-wide font-medium">Performance</span>
            </h2>
            <div className="w-10 h-[3px] bg-[#F26E41] mb-8"></div>
            <p className="text-gray-600 text-[15px] leading-relaxed mb-12 max-w-[280px]">
              Thoughtfully designed sports environments that inspire excellence and community.
            </p>

            <div className="mb-12 w-24">
              <div className="grid grid-cols-5 gap-[6px] opacity-20">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-[5px] h-[5px] bg-gray-500 rounded-full"></div>
                ))}
              </div>
            </div>

            <div>
              <a href="/product" className="inline-flex items-center justify-center px-8 py-3.5 border-[1.5px] border-[#F26E41] text-[#F26E41] font-bold text-[11px] uppercase tracking-widest rounded-full hover:bg-[#F26E41] hover:text-white transition-all group shadow-[0_4px_14px_rgba(242,110,65,0.15)]">
                View All Projects
                <span className="ml-3 transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* Right Cards list */}
          <div className="lg:w-[60%] xl:w-[65%] flex flex-col gap-8 md:gap-10">
            {projects.map((project, idx) => (
              <div key={project._id} className="bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 flex flex-col md:flex-row overflow-hidden relative transition-transform hover:-translate-y-1">

                {/* Number Box */}
                <div className="absolute top-4 left-4 md:top-6 md:left-6 z-20 bg-[#F26E41] text-white w-12 h-10 flex items-center justify-center rounded-lg font-bold text-[15px] shadow-sm">
                  {(idx + 1).toString().padStart(2, '0')}
                </div>

                {/* Card Image */}
                <div className="md:w-[48%] h-60 md:h-auto relative">
                  {project.heroImage ? (
                    <img src={urlFor(project.heroImage).width(1200).height(900).url()} alt={project.title} className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="absolute inset-0 bg-gray-100 w-full h-full flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="md:w-[52%] p-6 md:p-8 lg:p-10 flex flex-col justify-center bg-white z-10">
                  <div className="flex items-center gap-2 mb-3 text-gray-500">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[10px] font-bold tracking-[0.25em] uppercase">{project.location || 'Location TBA'}</span>
                  </div>

                  <h3 className="text-[22px] md:text-2xl font-bold text-[#1A1F2C] mb-4 leading-tight">
                    {project.title}
                  </h3>

                  <div className="w-8 h-[2px] bg-[#F26E41] mb-5"></div>

                  <p className="text-gray-500 text-[13px] leading-relaxed mb-8 flex-1">
                    {project.about || 'A premium facility contributing to regional sporting excellence.'}
                  </p>

                  <div className="flex items-center justify-start gap-4 xl:gap-6 mt-2 flex-wrap">
                    {project.infrastructure && project.infrastructure.slice(0, 4).map((feature: string, fIdx: number) => (
                      <div key={fIdx} className="flex items-center gap-3">
                        <div className="text-[#F26E41]">
                          <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-semibold text-gray-800 leading-[1.3]">
                          {feature.split(' ').map((word, i) => <React.Fragment key={i}>{word}<br /></React.Fragment>)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
      <MainNav />

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

      {/* Spaces Designed Section */}
      <SpacesDesignedSection />

      {/* Featured Project */}
      {/* <FeaturedProjectSection /> */}

      {/* Testimonials */}
      <TestimonialsSection />

      <SurfacesSection />

      {/* Footer */}
      <Footer />

      {/* Floating Buttons */}
      <div className="fixed bottom-6 left-6 z-50">
        <a href="https://wa.me/918890777424" target="_blank" rel="noopener noreferrer" className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform flex items-center justify-center w-14 h-14">
          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
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