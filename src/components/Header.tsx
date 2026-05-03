"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [name, setName] = useState("Alexander Pierce");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
  }, []);

  // Close menu when clicking a link
  const closeMenu = () => setIsMenuOpen(false);

  // Split name for styling: first word is primary color, rest is white
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Movies", href: "/movies" },
    { name: "Awards", href: "/awards" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo/Name */}
          <Link 
            href="/" 
            className="text-xl md:text-2xl font-bold tracking-widest text-primary uppercase"
          >
            {firstName} <span className="text-white">{lastName}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-semibold">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-primary transition-colors">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay - Modal Pop in Central */}
      <div 
        className={`fixed inset-0 z-[100] flex items-center justify-center transition-all duration-500 md:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          onClick={closeMenu}
        />

        {/* Close Button in Overlay */}
        <button 
          className="absolute top-6 right-6 text-white p-2 z-[101]"
          onClick={closeMenu}
          aria-label="Close Menu"
        >
          <X size={32} />
        </button>

        {/* Modal Content */}
        <div className={`relative z-[101] flex flex-col items-center space-y-8 transition-all duration-500 transform ${
          isMenuOpen ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}>
          {navLinks.map((link, index) => (
            <Link 
              key={link.name} 
              href={link.href} 
              onClick={closeMenu}
              className={`text-3xl font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-primary ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

