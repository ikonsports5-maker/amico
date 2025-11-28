"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { sanityClient } from '@/lib/sanity.client';
import { urlFor } from '@/lib/imageUrl';
import { MainNav } from '../components/MainNav';

interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: any;
  publishedAt?: string;
}

async function getBlogs(): Promise<BlogPost[]> {
  const query = `*[_type == "blog"] | order(publishedAt desc){
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt
  }`;

  return sanityClient.fetch(query);
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    getBlogs().then(setBlogs).catch(() => setBlogs([]));
  }, []);

  return (
    <div className="min-h-screen bg-white pb-16">
      <MainNav />
      <section className="pt-28 pb-10 bg-[#F5F5F2] border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4">
          <p className="text-[11px] tracking-[0.25em] uppercase text-[#a98946] mb-3">Blog</p>
          <h1 className="text-3xl md:text-4xl font-light text-[#1A2266] mb-3">Insights & Stories</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Articles about sports infrastructure, project highlights, and expert guidance from the Amico team.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 pt-10 space-y-8">
        {blogs.map((post) => (
          <Link
            key={post._id}
            href={`/blogs/${post.slug?.current ?? post._id}`}
            className="flex flex-col md:flex-row gap-5 border-b border-gray-200 pb-6 group"
          >
            {post.mainImage && (
              <div className="relative w-full md:w-64 h-40 md:h-36 overflow-hidden rounded-md flex-shrink-0">
                <img
                  src={urlFor(post.mainImage).width(800).height(600).url()}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-gray-400 mb-1">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
              </div>
              <h2 className="text-lg md:text-xl text-[#1A2266] group-hover:text-[#232b7c] mb-2">
                {post.title}
              </h2>
              {post.excerpt && (
                <p className="text-sm text-gray-600 line-clamp-2">{post.excerpt}</p>
              )}
            </div>
          </Link>
        ))}

        {blogs.length === 0 && (
          <p className="text-gray-500 text-sm">No blog posts yet. Create some in the Studio.</p>
        )}
      </section>
    </div>
  );
}
