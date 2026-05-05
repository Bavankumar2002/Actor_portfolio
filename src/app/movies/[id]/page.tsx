import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Star, Clock, User, Film, Calendar, PlayCircle } from "lucide-react";
import { movies } from "@/lib/movies";

type Props = {
  params: Promise<{ id: string }>;
};

import fs from "fs/promises";
import path from "path";

function getEmbedUrl(url: string) {
  if (!url) return "";
  
  // Already an embed URL
  if (url.includes("/embed/")) return url;
  
  let videoId = "";
  if (url.includes("youtu.be/")) {
    // Handle youtu.be/VIDEO_ID
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("watch?v=")) {
    // Handle youtube.com/watch?v=VIDEO_ID
    videoId = url.split("watch?v=")[1].split("&")[0];
  }
  
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
}

export default async function MovieDetailsPage({ params }: Props) {
  const { id } = await params;
  
  let movie = null;
  try {
    const filePath = path.join(process.cwd(), "src/lib/movies.json");
    const content = await fs.readFile(filePath, "utf-8");
    const moviesData = JSON.parse(content);
    movie = moviesData.find((m: any) => m.id === id);
  } catch (error) {
    console.error("Failed to read movie data:", error);
  }

  if (!movie) {
    notFound();
  }

  return (
    <div className="pt-20 bg-black min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-end">
        <div className="absolute inset-0 z-0">
          <Image 
            src={movie.image} 
            alt={movie.title} 
            fill 
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <Link href="/movies" className="inline-flex items-center gap-2 text-primary hover:text-white transition-colors mb-8 font-bold uppercase tracking-widest text-sm">
            <ArrowLeft size={16} /> Back to Movies
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <p className="text-primary font-bold tracking-widest uppercase mb-4">{movie.genre}</p>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter drop-shadow-2xl">{movie.title}</h1>
            </div>
            <div className="flex gap-8">
              <div className="text-center">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Rating</p>
                <p className="text-2xl font-bold flex items-center justify-center gap-2 text-primary">
                  <Star size={20} fill="currentColor" /> {movie.rating}
                </p>
              </div>
              <div className="text-center border-l border-white/10 pl-8">
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Year</p>
                <p className="text-2xl font-bold">{movie.year}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            {movie.trailerUrl && (
              <div className="mb-16">
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <PlayCircle className="text-primary" /> Watch Video                
                </h2>
                <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                  <iframe 
                    src={getEmbedUrl(movie.trailerUrl)}
                    title={`${movie.title} Trailer`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Film className="text-primary" /> Synopsis
              </h2>
              <p className="text-gray-300 text-xl leading-relaxed font-light">
                {movie.description}
              </p>
            </div>
            
          </div>

          <div className="space-y-8">
            <div className="p-8 border border-white/10 rounded-xl bg-[#0a0a0a]">
              <h3 className="text-xl font-bold mb-6">Production Credits</h3>
              <div className="space-y-6">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Director</p>
                  <p className="text-lg font-semibold">{movie.director}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Language</p>
                  <p className="text-lg font-semibold">{movie.language}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Music</p>
                  <p className="text-lg font-semibold">{movie.music}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Duration</p>
                  <p className="text-lg font-semibold">{movie.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Production</p>
                  <p className="text-lg font-semibold">{movie.production}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Role</p>
                  <p className="text-lg font-semibold">{movie.role}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Release Date</p>
                  <p className="text-lg font-semibold">{movie.year}</p>
                </div>
              </div>
              {movie.watchTrailerUrl && (
                <a 
                  href={movie.watchTrailerUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full mt-10 py-4 bg-primary text-black font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-sm flex items-center justify-center"
                >
                  Watch Trailer
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
