"use client";

import { Award, Trophy, Medal, Star, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function AwardsPage() {
  const awards = [
    { year: "2025", title: "Best Actor in a Leading Role", org: "International Film Festival", movie: "Neon Shadows", type: "Trophy", image: "/poster1.png" },
    { year: "2024", title: "Outstanding Performance", org: "Screen Actors Guild", movie: "The Whispering Woods", type: "Medal", image: "/poster2.png" },
    { year: "2023", title: "Critics Choice Award", org: "National Media Awards", movie: "Midnight Express", type: "Award", image: "/hero.png" },
    { year: "2022", title: "Rising Star Award", org: "British Academy Awards", movie: "Career Achievement", type: "Star", image: "/character_action.png" },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Elegant Header */}
      <section className="relative pt-40 pb-20 px-8 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[120px] -z-10" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black uppercase tracking-[0.3em] animate-fade-in">
            <Trophy size={14} /> Accolades & Honours
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] animate-fade-in">
            Celebrating <br /> <span className="text-primary italic">Excellence.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg font-light leading-relaxed animate-fade-in" style={{ animationDelay: '200ms' }}>
            A collection of recognition from the most prestigious institutions in the cinematic world, marking a decade of dedication to the craft.
          </p>
        </div>
      </section>

      {/* Awards List */}
      <section className="pb-40 px-8">
        <div className="max-w-5xl mx-auto space-y-6">
          {awards.map((award, i) => (
            <div 
              key={i} 
              className="group relative bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-700 overflow-hidden flex flex-col md:flex-row animate-fade-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              {/* Award Image / Poster */}
              <div className="relative w-full md:w-72 h-64 md:h-auto overflow-hidden flex-shrink-0">
                <Image 
                  src={award.image} 
                  alt={award.movie} 
                  fill 
                  className="object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/0 via-black/0 to-black/80 hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 to-black/80 md:hidden" />
                
                {/* Icon Overlay on Image */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-black/50 backdrop-blur-md border border-white/10 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  {award.type === "Trophy" && <Trophy size={20} />}
                  {award.type === "Medal" && <Medal size={20} />}
                  {award.type === "Award" && <Award size={20} />}
                  {award.type === "Star" && <Star size={20} />}
                </div>
              </div>

              {/* Award Content */}
              <div className="flex-1 p-8 md:p-12 flex flex-col justify-center space-y-4 relative">
                <div className="flex items-center gap-4">
                  <span className="text-primary font-black text-xs tracking-[0.3em] uppercase">{award.year}</span>
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                  <span className="text-gray-500 font-bold text-[10px] uppercase tracking-[0.2em]">{award.org}</span>
                </div>
                
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight group-hover:text-primary transition-colors duration-500">
                  {award.title}
                </h3>
                
                <div className="flex items-center gap-3">
                  <div className="h-[1px] w-8 bg-primary/30" />
                  <p className="text-gray-400 text-xl font-light italic leading-none">{award.movie}</p>
                </div>

                {/* Decorative Element */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:right-8 transition-all duration-700 hidden lg:block">
                  <ChevronRight size={48} className="text-primary/20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Decorative Footer Element */}
      <div className="h-[400px] relative overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full bg-gradient-to-t from-primary/5 via-transparent to-transparent opacity-50" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] border border-primary/10 rounded-full" />
      </div>
    </div>
  );
}
