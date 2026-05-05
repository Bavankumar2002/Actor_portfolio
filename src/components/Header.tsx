"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";

export default function Header() {
  const [name, setName] = useState("Alexander Pierce");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    async function fetchName() {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.success) setName(json.data.name);
      } catch (e) {
        console.error("Failed to fetch name for header", e);
      }
    }
    fetchName();

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Movies", href: "/movies" },
    { name: "Awards", href: "/awards" },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
        scrolled ? "py-4 bg-black/60 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-2xl font-black tracking-tighter text-primary uppercase group"
          >
            {firstName}<span className="text-white group-hover:text-primary transition-colors">{lastName}</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            <div className="flex gap-10 text-[11px] font-bold uppercase tracking-[0.2em]">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="relative group py-2"
                >
                  <span className="group-hover:text-primary transition-colors">{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>
            
            <Link 
              href="/#contact" 
              className="px-6 py-2.5 bg-white text-black text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-primary transition-colors flex items-center gap-2"
            >
              Get in Touch <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden text-white p-2 bg-white/5 rounded-full border border-white/10"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-[200] flex items-center justify-center transition-all duration-700 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/95 backdrop-blur-3xl" onClick={closeMenu} />
        
        <button 
          className="absolute top-8 right-8 text-white p-3 bg-white/5 rounded-full border border-white/10 z-[201]"
          onClick={closeMenu}
        >
          <X size={28} />
        </button>

        <div className={`relative z-[201] flex flex-col items-center gap-10 transition-all duration-700 transform ${
          isMenuOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10"
        }`}>
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={closeMenu}
              className="text-4xl font-black uppercase tracking-[0.2em] hover:text-primary transition-colors"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/#contact" 
            onClick={closeMenu}
            className="mt-8 px-10 py-5 bg-primary text-black text-sm font-black uppercase tracking-widest rounded-full flex items-center gap-2"
          >
            Contact Now <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </>
  );
}

