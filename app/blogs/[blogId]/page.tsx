import { sanityClient } from '@/lib/sanity.client';
import { urlFor } from '@/lib/imageUrl';
import { MainNav } from '../../components/MainNav';
import { PortableText } from '@portabletext/react';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react'; // Suggested icons

interface BlogPageProps {
    params: Promise<{ blogId: string }>;
}

async function getBlog(slug: string) {
    const query = `*[_type == "blog" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    body,
    publishedAt
  }`;
    return sanityClient.fetch(query, { slug });
}

export default async function BlogDetailPage(props: BlogPageProps) {
    const params = await props.params;
    const post = await getBlog(params.blogId);

    if (!post) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-semibold text-gray-500">Post not found</h1>
                <a href="/blogs" className="mt-4 text-blue-600 hover:underline">Return to blog list</a>
            </div>
        );
    }

    // Simple reading time calculation (avg 200 words per minute)
    const wordCount = post.body ? JSON.stringify(post.body).split(/\s+/g).length : 0;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));

    return (
        <div className="min-h-screen bg-[#F8FAFC] pb-24 selection:bg-indigo-100">
            <MainNav />

            {/* Hero Background Decor */}
            <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-indigo-50/50 to-transparent -z-10" />

            <article className="max-w-4xl mx-auto px-4 pt-32">
                {/* Navigation & Actions */}
                <div className="flex items-center justify-between mb-12">
                    <a
                        href="/blogs"
                        className="group inline-flex items-center text-sm font-medium text-[#1A2266] transition-colors"
                    >
                        <ArrowLeft className="mr-2 w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        Back to Articles
                    </a>

                </div>

                {/* Header Content */}
                <header className="text-center mb-12">
                    <div className="flex items-center justify-center gap-4 text-[11px] font-bold tracking-[0.2em] uppercase text-indigo-500 mb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent'}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {readingTime} min read
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-6xl font-serif text-[#1A2266] leading-tight mb-8">
                        {post.title}
                    </h1>

                    {post.excerpt && (
                        <p className="max-w-2xl mx-auto text-lg text-gray-500 leading-relaxed font-light">
                            {post.excerpt}
                        </p>
                    )}
                </header>

                {/* Featured Image */}
                {post.mainImage && (
                    <div className="relative group mb-16">
                        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-[2rem] blur opacity-10 group-hover:opacity-20 transition duration-1000" />
                        <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-indigo-100">
                            <img
                                src={urlFor(post.mainImage).width(1600).height(900).url()}
                                alt={post.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                        </div>
                    </div>
                )}

                {/* Body Content */}
                <div className="relative bg-white rounded-[2rem] p-8 md:p-16 shadow-sm border border-gray-100">
                    <div className="prose prose-lg max-w-none 
            prose-headings:text-[#1A2266] prose-headings:font-serif
            prose-p:text-gray-600 prose-p:leading-relaxed
            prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900
            prose-blockquote:border-l-indigo-500 prose-blockquote:bg-indigo-50/50 prose-blockquote:py-1 prose-blockquote:rounded-r-lg">
                        <PortableText
                            value={post.body}
                            components={{
                                types: {
                                    image: ({ value }) => (
                                        <img
                                            src={urlFor(value).url()}
                                            alt="Blog visual"
                                            className="rounded-xl my-8 shadow-md"
                                        />
                                    ),
                                },
                            }}
                        />
                    </div>

                    {/* Footer of the blog card */}
                    <div className="mt-16 pt-8 border-t border-gray-100 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
                                A
                            </div>
                            <div>
                                <p className="text-sm font-bold text-gray-900">Amico Team</p>
                                <p className="text-xs text-gray-400">Sports Infrastructure Experts</p>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}