"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Film, MessageCircle, Globe, Mail, PlayCircle, Star, ArrowRight, Award, Camera, Phone, MapPin } from "lucide-react";
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
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* 2. Banner (Hero Section) */}
      <section id="banner" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={hero.backgroundImage}
            alt={`${hero.name} - Actor`}
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 drop-shadow-2xl">
            {hero.title.includes("Stories") ? (
              <>
                {hero.title.split('Stories')[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Stories</span>
                {hero.title.split('Stories')[1]}
              </>
            ) : hero.title}
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
            {hero.description}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/movies" className="group relative px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                Explore Work <ArrowRight size={20} />
              </span>
            </Link>
            <Link href="/portfolio" className="px-8 py-4 border border-white/30 hover:border-white font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-white hover:text-black">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Sections */}
      <section className="py-24 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
          <Link href="/portfolio" className="group p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 transition-all text-center">
            <Camera size={48} className="mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Portfolio</h3>
            <p className="text-gray-400 mb-6 text-sm">Professional headshots, stills, and character portraits.</p>
            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
              View Gallery <ArrowRight size={14} />
            </span>
          </Link>
          <Link href="/movies" className="group p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 transition-all text-center">
            <Film size={48} className="mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Movies</h3>
            <p className="text-gray-400 mb-6 text-sm">Full filmography and featured projects across all genres.</p>
            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
              View Projects <ArrowRight size={14} />
            </span>
          </Link>
          <Link href="/awards" className="group p-10 bg-white/5 border border-white/10 rounded-xl hover:bg-primary/10 transition-all text-center">
            <Award size={48} className="mx-auto mb-6 text-primary" />
            <h3 className="text-2xl font-bold mb-4">Awards</h3>
            <p className="text-gray-400 mb-6 text-sm">Recognition, honors, and critical acclaim from the industry.</p>
            <span className="text-primary font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 group-hover:gap-4 transition-all">
              See Honors <ArrowRight size={14} />
            </span>
          </Link>
        </div>
      </section>

      {/* 6. Get in Touch (Contact Section) */}
      <section id="contact" className="py-32 px-6 bg-black relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase mb-6">
            <MessageCircle size={16} /> Contact
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8">Get in <span className="text-primary">Touch</span></h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Currently accepting scripts for late 2026. For booking inquiries, press, and representation.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <a href={`mailto:${hero.contactEmail}`} className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors">
              <Mail size={20} /> Email Representation
            </a>
            {hero.phone && (
              <a href={`tel:${hero.phone}`} className="flex items-center justify-center gap-3 px-8 py-5 border border-white/30 text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all">
                <Phone size={20} /> {hero.phone}
              </a>
            )}
          </div>

          {hero.address && (
            <div className="flex items-center justify-center gap-3 text-gray-400 mb-12">
              <MapPin size={18} className="text-primary" />
              <span className="text-lg">{hero.address}</span>
            </div>
          )}

          <div className="flex justify-center gap-8 border-t border-white/10 pt-16">
            {hero.socials?.instagram && (
              <a href={`https://instagram.com/${hero.socials.instagram}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-500 hover:text-primary transition-all transform hover:scale-110 group">
                <div className="p-4 bg-white/5 rounded-full group-hover:bg-primary/10">
                  <Globe size={32} />
                </div>
                <span className="text-xs font-medium uppercase tracking-tighter">@{hero.socials.instagram}</span>
              </a>
            )}
            {hero.socials?.whatsapp && (
              <a href={`https://wa.me/${hero.socials.whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-500 hover:text-green-500 transition-all transform hover:scale-110 group">
                <div className="p-4 bg-white/5 rounded-full group-hover:bg-green-500/10">
                  <MessageCircle size={32} />
                </div>
                <span className="text-xs font-medium uppercase tracking-tighter">WhatsApp</span>
              </a>
            )}
            {hero.socials?.facebook && (
              <a href={`https://facebook.com/${hero.socials.facebook}`} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 text-gray-500 hover:text-blue-500 transition-all transform hover:scale-110 group">
                <div className="p-4 bg-white/5 rounded-full group-hover:bg-blue-500/10">
                  <Globe size={32} />
                </div>
                <span className="text-xs font-medium uppercase tracking-tighter">Facebook</span>
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
