"use client";

import React from "react";
// Integrating the generic internal layout components the user has started building
import { MainNav } from "../components/MainNav"
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 selection:bg-[#a98946] selection:text-white">

      {/* Navigation */}
      <MainNav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-48 md:pb-24 bg-[#FAFAFA] border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <p className="text-[#a98946] font-semibold tracking-[0.2em] text-xs md:text-sm uppercase mb-4">
            AMICO SPORTS PRIVATE LIMITED
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-5xl font-light text-[#111] mb-8 leading-[1.3] tracking-tight text-center">
            Building World-Class <br className="hidden md:block" />
            <span className="font-semibold text-[#232b7c]">Sports Infrastructure</span> Across India
          </h1>
          <div className="w-16 h-[2px] bg-[#a98946] mx-auto mb-10"></div>

          <div className="space-y-6 text-gray-600 md:text-lg leading-relaxed text-center px-4 md:px-10">
            <p>
              <strong className="text-gray-900 font-semibold">AMICO SPORTS PRIVATE LIMITED</strong> is a leading name in India’s sports infrastructure industry, specializing in the design, development, and installation of high-performance synthetic sports courts and flooring systems.
            </p>
            <p>
              With a strong commitment to quality, innovation, and durability, we deliver international-standard sports surfaces tailored for academies, schools, clubs, residential projects, and professional sports facilities.
            </p>
            <div className="mt-12 p-8 border-l-4 border-[#a98946] bg-white text-left italic rounded-r-xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] uppercase tracking-wide">
              <p className="text-[17px] text-[#232b7c] font-medium leading-relaxed font-sans text-center">
                "Our goal is simple — to create world-class playing environments that enhance performance, safety, and longevity."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-light text-[#232b7c] mb-4">Who We Are</h2>
            <div className="w-12 h-[2px] bg-[#a98946] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 text-gray-600 leading-relaxed text-lg">
              <p>
                At AMICO SPORTS, we combine technical expertise, premium materials, and modern construction techniques to build sports infrastructure that meets global standards.
              </p>
              <p>
                From concept to completion, our team ensures every project is executed with precision, delivering surfaces that offer superior performance and reliability.
              </p>
              <p className="text-2xl font-light text-[#232b7c] italic pt-6 mt-6 border-t border-gray-100">
                "We don’t just build courts — we build experiences where athletes perform at their best."
              </p>
            </div>

            <div className="bg-[#FAFAFA] rounded-2xl p-10 border border-gray-100 shadow-sm">
              <h3 className="text-xs font-bold text-gray-900 mb-8 uppercase tracking-widest border-b border-gray-200 pb-4">Key Priorities</h3>
              <ul className="space-y-6">
                {[
                  "Superior grip & shock absorption",
                  "Long-lasting durability",
                  "Weather resistance",
                  "Low maintenance"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100">
                      <span className="w-2 h-2 bg-[#a98946] rounded-full"></span>
                    </div>
                    <span className="text-gray-700 font-medium text-[15px]">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expertise */}
      <section className="py-20 md:py-28 bg-[#FAFAFA] border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-light text-[#232b7c] mb-4">Our Expertise</h2>
            <div className="w-12 h-[2px] bg-[#a98946] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
              We specialize in a wide range of indoor and outdoor sports infrastructure solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Court Construction */}
            <div className="bg-white rounded-2xl p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 transition-shadow">
              <h3 className="text-lg font-semibold text-[#232b7c] mb-8 uppercase tracking-widest border-b border-gray-100 pb-4">
                Court Construction & Installation
              </h3>
              <ul className="space-y-5">
                {[
                  "Badminton Courts", "Pickleball Courts", "Tennis & Lawn Tennis Courts",
                  "Basketball Courts", "Squash Courts", "Volleyball Courts",
                  "Cricket Practice Pitches", "Multipurpose Sports Courts"
                ].map((court, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-600">
                    <span className="text-[#a98946]">✔</span>
                    <span className="text-[15px] font-medium">{court}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-[14px] text-gray-500 leading-relaxed italic">
                  Each court is designed with precision markings, accurate dimensions, and professional-grade finishes to ensure top-level gameplay.
                </p>
              </div>
            </div>

            {/* Flooring Solutions */}
            <div className="bg-white rounded-2xl p-10 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)] border border-gray-100 transition-shadow">
              <h3 className="text-lg font-semibold text-[#232b7c] mb-8 uppercase tracking-widest border-b border-gray-100 pb-4">
                Flooring Solutions
              </h3>
              <ul className="space-y-5">
                {[
                  "Synthetic Acrylic Flooring", "EPDM Rubber Flooring",
                  "PP Interlocking Tile Flooring", "Gym & Fitness Flooring",
                  "Athletic Track Surfaces", "Wooden Flooring (Teak & Maple Courts)"
                ].map((floor, i) => (
                  <li key={i} className="flex items-center gap-4 text-gray-600">
                    <span className="text-[#a98946]">✔</span>
                    <span className="text-[15px] font-medium">{floor}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-gray-100">
                <p className="text-[14px] text-gray-500 leading-relaxed italic">
                  Our flooring solutions are engineered for performance, safety, and long-term reliability, suitable for both indoor and outdoor environments.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AMICO SPORTS & Industries */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* Why Choose Us */}
            <div className="pr-4 md:pr-10">
              <h2 className="text-3xl md:text-4xl font-light text-[#232b7c] mb-4">Why Choose AMICO SPORTS</h2>
              <div className="w-12 h-[2px] bg-[#a98946] mb-12"></div>

              <div className="grid gap-8">
                {[
                  { title: "Premium Quality Materials", desc: "We use only industry-approved materials to ensure durability and performance." },
                  { title: "End-to-End Solutions", desc: "From design and planning to installation and finishing — everything under one roof." },
                  { title: "Custom Design Approach", desc: "Every project is tailored based on space, usage, and client requirements." },
                  { title: "Skilled Execution Team", desc: "Our experienced professionals ensure flawless delivery and timely completion." },
                  { title: "Nationwide Service", desc: "We proudly serve clients across India with consistent quality and support." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5">
                    <div className="mt-1">
                      <div className="w-10 h-10 rounded-full bg-[#FAFAFA] flex items-center justify-center text-[#a98946] font-bold shadow-sm border border-gray-100">
                        {i + 1}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[17px] font-semibold text-[#232b7c] mb-2">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-[15px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Industries We Serve */}
            <div className="bg-[#232b7c] rounded-3xl p-10 md:p-16 text-white shadow-xl flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#a98946] opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div>

              <div className="relative z-10">
                <h3 className="text-xs font-bold tracking-[0.2em] uppercase text-[#a98946] mb-4">Focus Areas</h3>
                <h2 className="text-3xl md:text-4xl font-light mb-12">Industries We Serve</h2>

                <ul className="space-y-6">
                  {[
                    "Schools & Educational Institutions",
                    "Sports Academies & Clubs",
                    "Residential & Commercial Projects",
                    "Government & Private Sports Facilities",
                    "Fitness Centers & Gyms"
                  ].map((industry, i) => (
                    <li key={i} className="flex items-center gap-4 py-4 border-b border-white/10 last:border-0 hover:border-white/30 transition-colors duration-300">
                      <span className="text-[#a98946] text-xl">◇</span>
                      <span className="text-lg md:text-xl font-light text-gray-100">{industry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & CTA */}
      <section className="py-24 md:py-32 bg-[#FAFAFA] border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center">

          <h2 className="text-[#a98946] text-xs font-bold tracking-[0.2em] uppercase mb-6">Our Vision</h2>
          <p className="text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-relaxed mb-16 max-w-3xl mx-auto">
            To become India’s most trusted brand in sports infrastructure by delivering innovative, high-quality, and sustainable sports solutions that inspire athletes and promote active lifestyles.
          </p>

          <div className="w-24 h-[1px] bg-gray-300 mx-auto my-16"></div>

          <div>
            <h2 className="text-3xl md:text-4xl font-light text-[#232b7c] mb-6">Let’s Build Your Sports Facility</h2>
            <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
              Whether you're planning a professional sports complex or a small training court, <strong className="text-gray-900 font-semibold tracking-wide">AMICO SPORTS PRIVATE LIMITED</strong> is your trusted partner.
            </p>
            <a href="/contact" className="inline-block px-10 py-4 bg-[#a98946] text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:bg-[#8e733b] hover:-translate-y-1 transition-all duration-300">
              Get in touch today
            </a>
          </div>
        </div>
      </section>

      {/* Application Footer */}
      <Footer />
    </div>
  );
}
