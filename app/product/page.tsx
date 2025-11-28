"use client";

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity.client';
import { urlFor } from '@/lib/imageUrl';
import { MainNav } from '../components/MainNav';

interface Project {
  _id: string;
  title: string;
  client: string;
  location: string;
  year: string;
  typeOfProject: string;
  slug: { current: string };
  heroImage?: any;
}

async function getProjects(): Promise<Project[]> {
  const query = `*[_type == "project"] | order(_createdAt desc){
    _id,
    title,
    client,
    location,
    year,
    typeOfProject,
    slug,
    heroImage
  }`;

  return sanityClient.fetch(query);
}

export default function ProductsIndexPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');

  useEffect(() => {
    getProjects().then(setProjects).catch(() => setProjects([]));
  }, []);

  const sportsOptions = useMemo(() => {
    const types = Array.from(
      new Set(projects.map((p) => p.typeOfProject).filter(Boolean))
    );
    return ['All', ...types];
  }, [projects]);

  const yearOptions = useMemo(() => {
    const years = Array.from(new Set(projects.map((p) => p.year).filter(Boolean))).sort(
      (a, b) => Number(b) - Number(a)
    );
    return ['All', ...years];
  }, [projects]);

  const filteredProjects = useMemo(
    () =>
      projects.filter((project) => {
        const sportMatch =
          selectedSport === 'All' || project.typeOfProject === selectedSport;
        const yearMatch = selectedYear === 'All' || project.year === selectedYear;
        return sportMatch && yearMatch;
      }),
    [projects, selectedSport, selectedYear]
  );

  return (
    <div className="min-h-screen bg-white pb-16">
      <MainNav />
      <section className="pt-28 pb-10 bg-[#F5F5F2] border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#a98946] mb-3">
            Projects
          </p>
          <h1 className="text-3xl md:text-4xl font-light text-[#1A2266] mb-3">
            All Sports Facilities
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm md:text-base">
            Explore every project built with Amico — multi-sport complexes,
            academies, and bespoke courts across India.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="max-w-6xl mx-auto px-4 pt-6 flex flex-wrap gap-4 items-center">
        <div className="text-xs uppercase tracking-[0.25em] text-gray-500">Filter by</div>
        <select
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
          className="border border-gray-300 text-sm px-3 py-2 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-[#232b7c]"
        >
          {sportsOptions.map((sport) => (
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="border border-gray-300 text-sm px-3 py-2 rounded-full bg-white focus:outline-none focus:ring-1 focus:ring-[#232b7c]"
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid gap-12 sm:grid-cols-1 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Link
              key={project._id}
              href={`/product/${project.slug?.current ?? project._id}`}
              className="group block bg-white"
            >
              {project.heroImage && (
                <div
                  className="relative w-full overflow-hidden mb-4 rounded-lg shadow-md"
                  style={{ aspectRatio: '5 / 4' }}
                >
                  <img
                    src={urlFor(project.heroImage).width(2000).height(1600).url()}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="text-[11px] tracking-[0.25em] uppercase text-gray-500 mb-2">
                {project.location}
              </div>

              <div className="text-sm md:text-base text-[#1A2266] group-hover:text-[#232b7c]">
                {project.title} <span className="inline-block ml-1">→</span>
              </div>
            </Link>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className="text-gray-500 text-sm">No projects found. Add some in the Studio.</p>
        )}
      </section>
    </div>
  );
}
