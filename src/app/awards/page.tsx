"use client";

import { Award, Trophy, Medal, Star, ChevronRight } from "lucide-react";

export default function AwardsPage() {
  const awards = [
    { year: "2025", title: "Best Actor in a Leading Role", org: "International Film Festival", movie: "Neon Shadows", type: "Trophy" },
    { year: "2024", title: "Outstanding Performance", org: "Screen Actors Guild", movie: "The Whispering Woods", type: "Medal" },
    { year: "2023", title: "Critics Choice Award", org: "National Media Awards", movie: "Midnight Express", type: "Award" },
    { year: "2022", title: "Rising Star Award", org: "British Academy Awards", movie: "Career Achievement", type: "Star" },
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
              className="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500 flex flex-col md:flex-row items-center gap-10 animate-fade-in"
              style={{ animationDelay: `${i * 150}ms` }}
            >
              <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 flex-shrink-0">
                {award.type === "Trophy" && <Trophy size={32} />}
                {award.type === "Medal" && <Medal size={32} />}
                {award.type === "Award" && <Award size={32} />}
                {award.type === "Star" && <Star size={32} />}
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                  <span className="text-primary font-black text-xs tracking-[0.2em] uppercase">{award.year}</span>
                  <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-white/20" />
                  <span className="text-gray-500 font-bold text-xs uppercase tracking-widest">{award.org}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold group-hover:text-primary transition-colors">{award.title}</h3>
                <p className="text-gray-400 text-lg font-light italic">"{award.movie}"</p>
              </div>

              <div className="flex-shrink-0">
                 <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-primary group-hover:text-primary transition-all">
                   <ChevronRight size={20} />
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
