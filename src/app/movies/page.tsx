"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Film, Play, Star } from "lucide-react";

export default function MoviesPage() {
  const [movieList, setMovieList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("/api/movies");
        const json = await res.json();
        if (json.success) {
          setMovieList(json.data);
        } else {
          setError(json.error || "Failed to load movies");
        }
      } catch (err) {
        setError("Could not connect to the server");
        console.error("Failed to fetch movies:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Cinematic Header */}
      <section className="relative pt-40 pb-24 px-8 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-primary/10 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
                <Film size={14} /> Filmography
              </div>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9]">
                Featured <br /> <span className="text-primary italic">Productions.</span>
              </h1>
            </div>
            <p className="max-w-sm text-gray-400 text-lg font-light leading-relaxed">
              A decade of storytelling across global cinema, independent films, and television series.
            </p>
          </div>
        </div>
      </section>

      {/* Movie Grid */}
      <section className="pb-40 px-8">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 text-xl mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm hover:bg-white/10 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {movieList.map((movie, i) => (
                <Link 
                  key={movie.id} 
                  href={`/movies/${movie.id}`}
                  className="group relative block animate-fade-in"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/10 bg-[#111]">
                    <Image
                      src={movie.image}
                      alt={movie.title}
                      fill
                      className="object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    />
                    
                    {/* Glassmorphism Badge */}
                    <div className="absolute top-6 right-6 px-4 py-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full flex items-center gap-2">
                      <Star size={12} className="text-primary fill-primary" />
                      <span className="text-[10px] font-bold tracking-widest">{movie.rating ? `${movie.rating}/10` : "9.0/10"}</span>
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-40 transition-opacity duration-700" />
                    
                    {/* Content */}
                    <div className="absolute inset-0 p-10 flex flex-col justify-end">
                      <p className="text-primary text-[10px] font-black tracking-[0.3em] uppercase mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {movie.role} • {movie.year}
                      </p>
                      <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        {movie.title}
                      </h3>
                      
                      <div className="flex items-center gap-4 transform translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black">
                          <Play size={16} fill="currentColor" />
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest">View Project</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
