"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Camera, Star, Film } from "lucide-react";
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
    <div className="pt-20 bg-black min-h-screen">
      <section id="portfolio" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Images */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-white/10 group">
              <Image src={portfolio.images[0] || "/hero.png"} alt="Portfolio 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-white/10 group md:translate-y-8">
              <Image src={portfolio.images[1] || "/headshot_dramatic.png"} alt="Portfolio 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-white/10 group">
              <Image src={portfolio.images[2] || "/poster1.png"} alt="Portfolio 3" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden border border-white/10 group md:translate-y-8">
              <Image src={portfolio.images[3] || "/character_action.png"} alt="Portfolio 4" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden border border-white/10 group sm:col-span-2 md:-translate-y-4">
              <Image src={portfolio.images[4] || "/poster2.png"} alt="Portfolio 5" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase">
              <Camera size={16} /> Portfolio
            </div>
            
            {/* Dynamic Title Parsing for Primary Color */}
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">
              {portfolio.title.includes("&") ? (
                <>
                  {portfolio.title.split('&')[0]} & <span className="text-primary">{portfolio.title.split('&')[1]}</span>
                </>
              ) : portfolio.title}
            </h2>

            <p className="text-gray-400 text-lg leading-relaxed">
              {portfolio.description}
            </p>

            <div className="space-y-4">
              {portfolio.features.map((feature: any, i: number) => (
                <div key={i} className="flex items-center gap-4 text-gray-300">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                    {i === 0 ? <Star size={20} /> : <Film size={20} />}
                  </div>
                  <div>
                    <h4 className="font-bold">{feature.title}</h4>
                    <p className="text-sm text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
