"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [name, setName] = useState("Alexander Pierce");

  useEffect(() => {
    async function fetchName() {
      try {
        const res = await fetch("/api/portfolio");
        const json = await res.json();
        if (json.success) setName(json.data.name);
      } catch (e) {
        console.error("Failed to fetch name for footer", e);
      }
    }
    fetchName();
  }, []);

  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <Link href="/" className="inline-flex flex-col items-center gap-4 group mb-6">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-white/5 group-hover:border-primary/30 transition-all duration-700 bg-white/5">
            <Image 
              src="/portfolio_logo.png" 
              alt="Logo" 
              fill 
              className="object-contain p-2"
            />
          </div>
          <span className="text-xl font-bold tracking-widest text-primary uppercase">
            {firstName} <span className="text-white">{lastName}</span>
          </span>
        </Link>
        <p className="mb-6">Professional Actor • Stunt Performer • Voice Artist</p>
        <div className="flex justify-center space-x-6 mb-8 text-gray-400">
          <Link href="/" className="hover:text-white">Home</Link>
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link href="/movies" className="hover:text-white">Movies</Link>
          <Link href="/awards" className="hover:text-white">Awards</Link>
          <Link href="/#contact" className="hover:text-white">Contact</Link>
        </div>
        <p className="opacity-50" suppressHydrationWarning>© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  );
}

