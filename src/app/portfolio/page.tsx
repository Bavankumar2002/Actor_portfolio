"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Star, Film, ChevronRight, Award, Sparkles } from "lucide-react";
import { heroData as initialData } from "@/lib/portfolio-data";

export default function PortfolioPage() {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    async function fetchPortfolio() {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.success) {
          setData(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
      }
    }
    fetchPortfolio();
  }, []);

  const portfolio = data.portfolio || {
    title: "Stills & Portraits",
    description: "Capturing the essence of every character through compelling imagery. My portfolio showcases a range of emotions and personas, from intense dramatic headshots to cinematic action stills.",
    features: [
      { title: "Versatile Expressions", description: "Expertise in diverse character ranges." },
      { title: "Cinematic Quality", description: "Professional stills from award-winning sets." }
    ],
    images: ["/hero.png", "/headshot_dramatic.png", "/poster1.png", "/character_action.png", "/poster2.png"]
  };

  return (
    <div className="bg-black min-h-screen text-white overflow-hidden">
      {/* Hero Header Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-primary/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-[0.2em] animate-fade-in">
            <Camera size={14} /> The Visual Journey
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
            {portfolio.title.includes("&") ? (
              <>
                {portfolio.title.split('&')[0]} <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-yellow-600">&</span> {portfolio.title.split('&')[1]}
              </>
            ) : portfolio.title}
          </h1>
          <p className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl font-light leading-relaxed">
            {portfolio.description}
          </p>
        </div>
      </section>

      {/* Main Portfolio Content */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          
          {/* Feature Highlight Cards (Left Column on Desktop) */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            {portfolio.features.map((feature: any, i: number) => (
              <div 
                key={i} 
                className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                  {i === 0 ? <Star size={120} /> : <Film size={120} />}
                </div>
                
                <div className="relative z-10 flex flex-col gap-4">
                  <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500">
                    {i === 0 ? <Star size={24} /> : <Film size={24} />}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{feature.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 relative overflow-hidden group">
               <div className="relative z-10">
                 <h4 className="text-xl font-bold mb-2 flex items-center gap-2">
                   <Award size={20} className="text-primary" /> Recognition
                 </h4>
                 <p className="text-gray-400 text-sm mb-4">Featured in over 15+ international publications for character excellence.</p>
                 <button className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary group-hover:gap-4 transition-all">
                   View Accolades <ChevronRight size={14} />
                 </button>
               </div>
            </div>
          </div>

          {/* Cinematic Gallery Grid (Right Column on Desktop) */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-4 md:gap-6">
            {/* Main Featured Image */}
            <div className="col-span-2 aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 group relative">
              <Image 
                src={portfolio.images[0] || "/hero.png"} 
                alt="Main Spotlight" 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
              <div className="absolute bottom-8 left-8">
                <span className="px-3 py-1 bg-primary text-black text-[10px] font-bold uppercase tracking-widest rounded-full mb-2 inline-block">Featured Still</span>
                <h3 className="text-2xl font-bold">Dramatic Lead</h3>
              </div>
            </div>

            {/* Sub Images */}
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group relative">
              <Image 
                src={portfolio.images[1] || "/headshot_dramatic.png"} 
                alt="Portfolio 1" 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group relative md:translate-y-12">
              <Image 
                src={portfolio.images[2] || "/poster1.png"} 
                alt="Portfolio 2" 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group relative">
              <Image 
                src={portfolio.images[3] || "/character_action.png"} 
                alt="Portfolio 3" 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>

            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 group relative md:translate-y-12">
              <Image 
                src={portfolio.images[4] || "/poster2.png"} 
                alt="Portfolio 4" 
                fill 
                className="object-cover transition-transform duration-[1.5s] group-hover:scale-110" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
}
