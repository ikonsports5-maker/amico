import { sanityClient } from '@/lib/sanity.client';
import { urlFor } from '@/lib/imageUrl';
import { MainNav } from '../../components/MainNav';
// import Image from 'next/image'; // Switched to regular img to avoid next.config.js domain requirements

interface ProjectPageProps {
  params: Promise<{ productId: string }>;
}

async function getProject(slug: string) {
  const query = `*[_type == "project" && slug.current == $slug][0]{
    _id,
    title,
    client,
    location,
    year,
    typeOfProject,
    about,
    infrastructure,
    heroImage,
    gallery,
    youtubeUrls
  }`;

  return sanityClient.fetch(query, { slug });
}

export default async function ProductPage(props: ProjectPageProps) {
  const params = await props.params;
  const project = await getProject(params.productId);

  console.log('Fetched project:', project);

  if (!project) {
    return <div className="max-w-5xl mx-auto py-20">Project not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <MainNav />
      {/* Hero */}
      <section className="grid md:grid-cols-2 min-h-[400px]">
        <div className="relative h-72 md:h-full">
          {project.heroImage && (
            <img
              src={urlFor(project.heroImage).width(1600).height(900).url()}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>
        <div className="bg-white flex flex-col justify-center px-8 py-10">
          <h1 className="text-3xl md:text-4xl font-medium text-gray-900 mb-2">
            {project.title}
          </h1>
          <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-8">
            {project.location}
          </p>
        </div>
      </section>

      {/* Blue info bar */}
      <section className="bg-[#232b7c] px-6 text-white py-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-xs md:text-sm">
          <div>
            <p className="uppercase opacity-75 mb-1">Client</p>
            <p>{project.client}</p>
          </div>
          <div>
            <p className="uppercase opacity-75 mb-1">Location</p>
            <p>{project.location}</p>
          </div>
          <div>
            <p className="uppercase opacity-75 mb-1">Year</p>
            <p>{project.year}</p>
          </div>
          <div>
            <p className="uppercase opacity-75 mb-1">Type of Project</p>
            <p>{project.typeOfProject}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-4 py-12 text-sm md:text-base leading-relaxed">
        {/* About */}
        <div className="mb-10">
          <h2 className="text-xs tracking-[0.25em] text-red-500 uppercase mb-3">About</h2>
          <p className="text-gray-700">{project.about}</p>
        </div>

        {/* Infrastructure */}
        {project.infrastructure && project.infrastructure.length > 0 && (
          <div className="mb-10">
            <h2 className="text-xs tracking-[0.25em] text-red-500 uppercase mb-3">Infrastructure</h2>
            <ul className="flex flex-wrap gap-6 text-gray-700">
              {project.infrastructure.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xs tracking-[0.25em] text-red-500 uppercase mb-3">Gallery</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {project.gallery.map((img: any) => (
                <div key={img._key} className="relative h-64">
                  <img
                    src={urlFor(img).width(1000).height(600).url()}
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos */}
        {project.youtubeUrls && project.youtubeUrls.length > 0 && (
          <div className="mb-16">
            <h2 className="text-xs tracking-[0.25em] text-red-500 uppercase mb-3">Videos</h2>
            <div className="space-y-8">
              {project.youtubeUrls.map((url: string) => {
                const videoIdMatch = url.match(/v=([\w-]+)/) || url.match(/youtu.be\/(.[^?]+)/);
                const videoId = videoIdMatch ? videoIdMatch[1] : null;

                if (!videoId) return null;

                return (
                  <div key={url} className="aspect-video w-full">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}