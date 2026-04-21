'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Footer from '../../components/Footer'; // Adjust path as needed
import { PT_Sans } from 'next/font/google';
import { MainNav } from '@/app/components/MainNav';

const ptSans = PT_Sans({
    weight: ['400', '700'],
    subsets: ['latin'],
    display: 'swap',
});

// Reuse the animation hooks for consistency
function useInView(options = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsInView(true);
        }, { threshold: 0.1, ...options });

        if (ref.current) observer.observe(ref.current);
        return () => { if (ref.current) observer.unobserve(ref.current); };
    }, []);

    return [ref, isInView] as const;
}

export default function GymSolutionsPage() {
    const [refExpertise, expertiseInView] = useInView();
    const [refServices, servicesInView] = useInView();

    return (
        <div className={`min-h-screen bg-white overflow-x-hidden ${ptSans.className}`}>
            <style jsx global>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up { animation: slideUp 0.8s ease-out forwards; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
            <MainNav />
            {/* --- HERO SECTION --- */}
            <section className="relative h-[80vh] md:h-[90vh] flex items-center overflow-hidden bg-[#1A1F2C]">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070"
                        className="w-full h-full object-cover opacity-50"
                        alt="Gym Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A1F2C] via-[#1A1F2C]/60 to-transparent"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl">
                        <p className="text-[#F26E41] font-bold text-sm uppercase tracking-[0.3em] mb-4 animate-slide-up">
                            Premium Fitness Environments
                        </p>
                        <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.1] mb-6 animate-slide-up delay-200">
                            Indoor & Outdoor <br />
                            <span className="text-[#F26E41] italic font-serif font-light">Gym Solutions</span>
                        </h1>
                        <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-xl animate-slide-up delay-400">
                            Engineered for Performance, Durability, and Long-Term Usage. Building the future of fitness across India.
                        </p>
                        <div className="flex flex-wrap gap-4 animate-slide-up delay-400">
                            <button className="bg-[#F26E41] text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#d35a2e] transition-all shadow-lg">
                                Get a Quote
                            </button>
                            <button className="border border-white text-white px-8 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-[#1A1F2C] transition-all">
                                Our Projects
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- EXPERTISE SECTION --- */}
            <section ref={refExpertise} className="py-24 bg-[#F8FAFC] relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EBF1FF] opacity-50 skew-x-[-12deg] translate-x-20"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className={`lg:w-1/2 transition-all duration-1000 ${expertiseInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                            <span className="text-[#F26E41] font-bold text-xs uppercase tracking-widest">Our Expertise</span>
                            <h2 className="text-4xl md:text-5xl font-bold text-[#232b7c] mt-4 mb-8">
                                Indoor & Outdoor Gym Setup India
                            </h2>
                            <div className="w-16 h-1 bg-[#F26E41] mb-8"></div>
                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                At Amico Sports, we deliver high-performance indoor and outdoor gym solutions designed for durability, safety, and user experience.
                            </p>
                            <p className="text-gray-600 mb-8">
                                Whether you're building a commercial indoor gym, a home fitness space, or a weather-resistant outdoor gym, our expert team ensures every project meets the highest quality standards.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#232b7c]">
                                    <h4 className="font-bold text-[#232b7c] mb-2">Indoor Precision</h4>
                                    <p className="text-sm text-gray-500">Controlled environments with advanced, ergonomic equipment.</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-[#F26E41]">
                                    <h4 className="font-bold text-[#F26E41] mb-2">Outdoor Durability</h4>
                                    <p className="text-sm text-gray-500">Weather-resistant, low-maintenance open-air fitness.</p>
                                </div>
                            </div>
                        </div>

                        <div className={`lg:w-1/2 relative transition-all duration-1000 delay-300 ${expertiseInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                            <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1000" alt="Gym Setup" />
                            </div>
                            {/* Decorative Floating Box */}
                            <div className="absolute -bottom-10 -left-10 bg-[#232b7c] text-white p-10 rounded-3xl hidden md:block shadow-xl">
                                <p className="text-4xl font-bold mb-1">100%</p>
                                <p className="text-xs uppercase tracking-widest opacity-70">Custom Layouts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- CTA STRIP --- */}
            <section className="py-12 bg-[#232b7c]">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
                    <h3 className="text-white text-2xl md:text-3xl font-light">
                        Ready to build a <span className="font-bold">modern fitness space?</span>
                    </h3>
                    <Link href="/contact" className="bg-[#F26E41] text-white px-10 py-4 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:scale-105 transition-transform">
                        Contact Us Now
                    </Link>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section ref={refServices} className="py-24 bg-white">
                <div className="container mx-auto px-6 text-center mb-16">
                    <span className="text-[#F26E41] font-bold text-xs uppercase tracking-widest">What We Do</span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1A1F2C] mt-4">Our Services</h2>
                </div>

                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        { title: "Design & Consultation", desc: "Custom layouts planned according to your space, usage, and goals.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                        { title: "Site Preparation", desc: "Ground preparation, flooring installation, and base work for gyms.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                        { title: "Equipment Installation", desc: "Professional installation ensuring safety, alignment, and performance.", icon: "M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 011-1h1a2 2 0 100-4H7a1 1 0 01-1-1V7a1 1 0 011-1h3a1 1 0 011-1V4z" },
                        { title: "Custom Solutions", desc: "Complete indoor/outdoor combinations for commercial projects.", icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" },
                        { title: "Post-Installation", desc: "Regular maintenance and support to ensure long-term performance.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.13-2.054-.382-3.016z" },
                        { title: "Space Optimization", desc: "Efficient utilization planning for small to large scale facilities.", icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" },
                    ].map((s, i) => (
                        <div
                            key={i}
                            className={`p-10 rounded-[32px] bg-[#F8FAFC] border border-gray-100 hover:shadow-xl transition-all duration-500 group ${servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                            style={{ transitionDelay: `${i * 100}ms` }}
                        >
                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-[#232b7c] shadow-sm mb-6 group-hover:bg-[#232b7c] group-hover:text-white transition-colors">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={s.icon} />
                                </svg>
                            </div>
                            <h4 className="text-xl font-bold text-[#1A1F2C] mb-4">{s.title}</h4>
                            <p className="text-gray-500 leading-relaxed text-sm">{s.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- PRODUCTS SECTION --- */}
            <section className="py-24 bg-[#1A1F2C] text-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-16 items-center">
                        <div className="lg:w-1/3">
                            <span className="text-[#F26E41] font-bold text-xs uppercase tracking-widest">Our Gear</span>
                            <h2 className="text-4xl font-bold mt-4 mb-6">Professional Gym Equipment & Setup</h2>
                            <p className="text-gray-400 mb-8">We provide high-quality equipment trusted by fitness centers, societies, and institutions across the country.</p>
                            <ul className="space-y-4">
                                {[
                                    "High-Performance Machines",
                                    "Heavy-Duty Durability",
                                    "Ergonomic Safety Design",
                                    "Low Maintenance Setup"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-[#F26E41] flex items-center justify-center text-[10px]">✓</div>
                                        <span className="text-sm font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="h-80 rounded-3xl overflow-hidden group relative">
                                <img src="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Cardio" />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                                    <h4 className="text-xl font-bold">Strength Training</h4>
                                </div>
                            </div>
                            <div className="h-80 rounded-3xl overflow-hidden group relative">
                                <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Outdoor" />
                                <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                                    <h4 className="text-xl font-bold">Outdoor Fitness</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FINAL CTA --- */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute inset-0 bg-[#F26E41]">
                    {/* Parallelogram decoration */}
                    <div className="absolute inset-0 bg-[#d35a2e] skew-y-[-3deg] origin-right translate-y-10"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <h2 className="text-white text-4xl md:text-6xl font-black mb-8">Ready to Build Your Gym Setup?</h2>
                    <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-light">
                        Get in touch with our team for a professional consultation and a customized quote tailored to your space.
                    </p>
                    <div className="flex justify-center gap-6">
                        <Link href="/contact" className="bg-white text-[#F26E41] px-12 py-5 rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#1A1F2C] hover:text-white transition-all shadow-xl">
                            Get A Quote
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}