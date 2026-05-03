"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Header() {
  const [name, setName] = useState("Alexander Pierce");

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

  // Split name for styling: first word is primary color, rest is white
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-widest text-primary uppercase">
          {firstName} <span className="text-white">{lastName}</span>
        </Link>
        <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-semibold">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link>
          <Link href="/movies" className="hover:text-primary transition-colors">Movies</Link>
          <Link href="/awards" className="hover:text-primary transition-colors">Awards</Link>
          <Link href="/#contact" className="hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  );
}

