"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Film, MessageCircle, Globe, Mail, PlayCircle, Star, ArrowRight, Award, Camera, Phone, MapPin, Sparkles, ChevronRight, MessageSquare, Share2, Link2 } from "lucide-react";
import { heroData as initialHeroData } from "@/lib/portfolio-data";

export default function Home() {
  const [hero, setHero] = useState(initialHeroData);

  useEffect(() => {
    async function refreshData() {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.success) setHero(json.data);
      } catch (e) {
        console.error("Failed to refresh portfolio data", e);
      }
    }
    refreshData();
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-primary/30 selection:text-black">
      {/* 2. Banner (Hero Section) */}
      <section id="banner" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.backgroundImage}
            alt={`${hero.name} - Actor`}
            fill
            className="object-cover opacity-50 scale-105 animate-pulse-slow"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#050505]/60 to-[#050505]" />
          {/* Ambient Light Blobs */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
          <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold uppercase tracking-[0.3em] mb-8 animate-fade-in">
             <Sparkles size={14} /> Screen & Stage Actor
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black uppercase tracking-tighter mb-8 leading-[0.85] drop-shadow-2xl">
            {hero.title.includes("Stories") ? (
              <>
                {hero.title.split('Stories')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-b from-primary to-yellow-600">Stories</span>
                {hero.title.split('Stories')[1]}
              </>
            ) : hero.title}
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-400 font-light mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <Link href="/movies" className="group relative px-10 py-5 bg-primary text-black font-black uppercase tracking-widest overflow-hidden rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(201,162,39,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Explore Work <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/portfolio" className="px-10 py-5 border border-white/20 hover:border-white/50 font-black uppercase tracking-widest rounded-full transition-all hover:bg-white/5 backdrop-blur-sm">
              View Portfolio
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Scroll</span>
        </div>
      </section>

      {/* Quick Access Sections - Redesigned as Premium Cards */}
      <section className="py-32 px-6 relative bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Essential <span className="text-primary">Chapters</span></h2>
              <p className="text-gray-400 text-lg max-w-md font-light">Navigating through the milestones of a dedicated cinematic career.</p>
            </div>
            <div className="h-[2px] flex-1 bg-white/5 mx-8 mb-4 hidden md:block" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { href: "/portfolio", icon: Camera, title: "Portfolio", desc: "Professional headshots, stills, and character portraits.", accent: "from-blue-500/20" },
              { href: "/movies", icon: Film, title: "Filmography", desc: "Full featured projects and theater work across all genres.", accent: "from-primary/20" },
              { href: "/awards", icon: Award, title: "Recognition", desc: "Industry recognition, critical acclaim, and honors.", accent: "from-purple-500/20" }
            ].map((card, i) => (
              <Link key={i} href={card.href} className="group relative p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-primary/30 transition-all duration-500 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${card.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-black border border-white/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                    <card.icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">{card.title}</h3>
                  <p className="text-gray-400 mb-8 font-light leading-relaxed">{card.desc}</p>
                  <span className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs group-hover:gap-4 transition-all">
                    Dive Deeper <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Contact Section - Cinematic Redesign */}
      <section id="contact" className="py-40 px-6 bg-black relative overflow-hidden">
        {/* Cinematic Spotlight Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-0 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">
            
            {/* Left Column: Messaging */}
            <div className="lg:w-1/2 space-y-12">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 rounded-sm border border-white/10 text-[10px] font-black tracking-[0.3em] uppercase text-primary">
                  <Sparkles size={12} /> Available for Projects
                </div>
                <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] text-white">
                  Get In <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-white to-primary/50">Touch.</span>
                </h2>
                <p className="text-xl text-gray-400 font-light max-w-md leading-relaxed border-l-2 border-primary/30 pl-6 py-2">
                  Exploring new creative territories. Reach out for collaborations, bookings, or just a professional hello.
                </p>
              </div>

              {/* Direct Contact Info */}
              <div className="grid sm:grid-cols-2 gap-8 pt-4">
                <a href={`mailto:${hero.contactEmail}`} className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                  <Mail className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                  <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Email</p>
                  <p className="text-white font-medium truncate">{hero.contactEmail}</p>
                </a>
                
                {hero.phone && (
                  <a href={`tel:${hero.phone}`} className="group p-8 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500">
                    <Phone className="text-primary mb-4 group-hover:scale-110 transition-transform" size={24} />
                    <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-white font-medium">{hero.phone}</p>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Representation & Socials */}
            <div className="lg:w-1/2">
              <div className="h-full flex flex-col justify-between p-12 bg-white/[0.02] border border-white/5 rounded-[3rem] backdrop-blur-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-[3rem]" />
                
                <div className="relative">
                  <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic text-white">Representation</h3>
                  <p className="text-gray-400 mb-12 font-light">Connect through official channels or social platforms for the quickest response.</p>
                  
                  <div className="grid grid-cols-4 gap-4 mb-16">
                    {hero.socials?.instagram && (
                      <a href={hero.socials.instagram} target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 hover:bg-primary hover:text-black transition-all transform hover:-translate-y-2">
                        <Globe size={28} />
                      </a>
                    )}
                    {hero.socials?.whatsapp && (
                      <a href={hero.socials.whatsapp} target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 hover:bg-green-500 hover:text-white transition-all transform hover:-translate-y-2">
                        <MessageSquare size={28} />
                      </a>
                    )}
                    {hero.socials?.facebook && (
                      <a href={hero.socials.facebook} target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-2">
                        <Globe size={28} />
                      </a>
                    )}
                    {hero.socials?.twitter && (
                      <a href={hero.socials.twitter} target="_blank" rel="noopener noreferrer" className="aspect-square flex items-center justify-center bg-white/5 rounded-2xl border border-white/10 hover:bg-sky-400 hover:text-white transition-all transform hover:-translate-y-2">
                        <Share2 size={28} />
                      </a>
                    )}
                  </div>
                </div>

                <div className="relative mt-auto">
                  <Link href="/contact" className="w-full py-6 bg-primary text-black font-black uppercase tracking-[0.2em] text-sm rounded-xl flex items-center justify-center gap-3 hover:bg-white transition-all duration-500 group shadow-[0_0_50px_rgba(212,175,55,0.2)]">
                    Start a Project <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
