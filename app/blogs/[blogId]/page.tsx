import { sanityClient } from '@/lib/sanity.client';
import { urlFor } from '@/lib/imageUrl';
import { MainNav } from '../../components/MainNav';
import { PortableText } from '@portabletext/react';

// 1. Update interface: params is now a Promise
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
    // 2. Await the params before accessing them
    const params = await props.params;
    const post = await getBlog(params.blogId);

    if (!post) {
        return <div className="max-w-3xl mx-auto py-20">Blog post not found.</div>;
    }

    return (
        <div className="min-h-screen bg-white pb-16">
            <MainNav />
            <article className="max-w-3xl mx-auto px-4 pt-28">
                <a
                    href="/blogs"
                    className="inline-flex items-center text-sm text-[#232b7c] hover:underline mb-6"
                    aria-label="Back to all posts"
                >
                    ← Back to all posts
                </a>

                <p className="text-[11px] tracking-[0.25em] uppercase text-gray-400 mb-2">
                    {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : ''}
                </p>
                <h1 className="text-3xl md:text-4xl font-light text-[#1A2266] mb-6">
                    {post.title}
                </h1>
                {post.excerpt && (
                    <p className="text-gray-600 text-sm md:text-base mb-6">{post.excerpt}</p>
                )}
                {post.mainImage && (
                    <div className="relative w-full overflow-hidden mb-8 rounded-lg" style={{ aspectRatio: '16 / 9' }}>
                        <img
                            src={urlFor(post.mainImage).width(1600).height(900).url()}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <div className="prose max-w-none prose-p:text-gray-700 prose-h2:text-[#1A2266] prose-a:text-[#232b7c]">
                    <PortableText value={post.body} />
                </div>
            </article>
        </div>
    );
}