"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Star, Film, ChevronRight, Award, Sparkles, Globe, Calendar, Layers } from "lucide-react";
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
    stats: {
      films: "25+",
      awards: "12",
      languages: "Tamil",
      yearsActive: "10+ Years"
    },
    features: [
      { title: "Versatile Expressions", description: "Expertise in diverse character ranges." },
      { title: "Cinematic Quality", description: "Professional stills from award-winning sets." }
    ],
    images: ["/hero.png", "/headshot_dramatic.png", "/poster1.png", "/character_action.png", "/poster2.png"]
  };

  return (
    <div className="bg-black min-h-screen text-white relative">
      {/* Dynamic Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-600/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-32 pb-32">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Content (Sticky) */}
          <div className="lg:col-span-5 space-y-12 lg:sticky lg:top-32">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-[0.3em] backdrop-blur-md">
                <Camera size={14} /> The Visual Identity
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">
                {portfolio.title.includes("&") ? (
                  <>
                    <span className="block">{portfolio.title.split('&')[0]}</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-yellow-700">&</span>
                    <span className="block">{portfolio.title.split('&')[1]}</span>
                  </>
                ) : portfolio.title}
              </h1>

              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed tracking-wide">
                {portfolio.description}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: <Film size={18} />, label: "Films", value: portfolio.stats?.films || "25+" },
                { icon: <Award size={18} />, label: "Awards", value: portfolio.stats?.awards || "12" },
                { icon: <Globe size={18} />, label: "Languages", value: portfolio.stats?.languages || "English, Hindi, Tamil" },
                { icon: <Calendar size={18} />, label: "Experience", value: portfolio.stats?.yearsActive || "10+ Years" }
              ].map((stat, i) => (
                <div key={i} className={`p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-xl flex flex-col gap-3 hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500 group ${i >= 2 ? 'col-span-2' : ''}`}>
                  <div className="text-primary group-hover:scale-110 transition-transform">{stat.icon}</div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{stat.label}</span>
                  <p className="text-xl font-bold tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Images (Scrollable Gallery) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Main Image */}
            <div className="aspect-[4/5] md:aspect-[3/4] group relative rounded-3xl overflow-hidden border border-white/10">
              <Image 
                src={portfolio.images[0] || "/hero.png"} 
                alt="Main Spotlight" 
                fill 
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Secondary Images */}
              <div className="aspect-[3/4] group relative rounded-3xl overflow-hidden border border-white/10">
                <Image 
                  src={portfolio.images[1] || "/headshot_dramatic.png"} 
                  alt="Gallery 1" 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <div className="aspect-[3/4] group relative rounded-3xl overflow-hidden border border-white/10 translate-y-12">
                <Image 
                  src={portfolio.images[2] || "/poster1.png"} 
                  alt="Gallery 2" 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <div className="aspect-[3/4] group relative rounded-3xl overflow-hidden border border-white/10">
                <Image 
                  src={portfolio.images[3] || "/character_action.png"} 
                  alt="Gallery 3" 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
              <div className="aspect-[3/4] group relative rounded-3xl overflow-hidden border border-white/10 translate-y-12">
                <Image 
                  src={portfolio.images[4] || "/poster2.png"} 
                  alt="Gallery 4" 
                  fill 
                  className="object-cover transition-transform duration-[2s] group-hover:scale-110"
                />
              </div>
            </div>

            {/* Extra Large Finale Image */}
            <div className="aspect-[16/9] group relative rounded-3xl overflow-hidden border border-white/10 mt-20">
              <Image 
                src={portfolio.images[0] || "/hero.png"} 
                alt="Finale" 
                fill 
                className="object-cover transition-transform duration-[2s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-xs font-bold uppercase tracking-[0.5em] text-primary opacity-50 group-hover:opacity-100 transition-opacity">The Art of Storytelling</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
