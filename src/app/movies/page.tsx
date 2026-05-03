import Image from "next/image";
import Link from "next/link";
import { Film, ArrowRight } from "lucide-react";
import { movies } from "@/lib/movies";

export default function MoviesPage() {
  return (
    <div className="pt-20 bg-black min-h-screen">
      <section id="movie-cards" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase mb-6">
                <Film size={16} /> Movie Cards
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">Featured <span className="text-primary">Projects</span></h2>
            </div>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {movies.map((movie) => (
              <Link 
                key={movie.id} 
                href={`/movies/${movie.id}`}
                className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[3/4] cursor-pointer border border-white/5 block"
              >
                <Image
                  src={movie.image}
                  alt={movie.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">{movie.role} • {movie.year}</p>
                  <h3 className="text-3xl font-black mb-4">{movie.title}</h3>
                  <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {movie.genre}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
