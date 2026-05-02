import Image from "next/image";
import Link from "next/link";
import { Film, MessageCircle, Globe, Mail, PlayCircle, Star, ArrowRight, Award, Camera } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* 1. Header (Navigation) */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-widest text-primary uppercase">
            Alexander <span className="text-white">Pierce</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-semibold">
            <a href="#banner" className="hover:text-primary transition-colors">Home</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#movie-cards" className="hover:text-primary transition-colors">Movies</a>
            <a href="#awards" className="hover:text-primary transition-colors">Awards</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <Link href="/admin" className="hover:text-primary transition-colors text-white/50">Admin</Link>
          </div>
        </div>
      </nav>

      {/* 2. Banner (Hero Section) */}
      <section id="banner" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero.png"
            alt="Alexander Pierce - Actor"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter mb-6 drop-shadow-2xl">
            Bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Stories</span> <br />to Life.
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
            Award-winning actor with over a decade of experience in film, television, and theater.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#movie-cards" className="group relative px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:scale-105">
              <span className="relative z-10 flex items-center gap-2">
                View Reel <PlayCircle size={20} />
              </span>
            </a>
            <a href="#contact" className="px-8 py-4 border border-white/30 hover:border-white font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-white hover:text-black">
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* 3. Portfolio (Gallery/Stills) */}
      <section id="portfolio" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase mb-6">
              <Camera size={16} /> Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">Stills & <span className="text-primary">Portraits</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative h-[500px] rounded-lg overflow-hidden border border-white/10 group">
              <Image src="/hero.png" alt="Headshot 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden border border-white/10 group md:translate-y-12">
              <Image src="/poster1.png" alt="Still 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[500px] rounded-lg overflow-hidden border border-white/10 group">
              <Image src="/poster2.png" alt="Headshot 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. Movie Cards (Filmography) */}
      <section id="movie-cards" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase mb-6">
                <Film size={16} /> Movie Cards
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">Featured <span className="text-primary">Projects</span></h2>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
              Full IMDB Profile <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Movie 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[3/4] cursor-pointer border border-white/5">
              <Image
                src="/poster1.png"
                alt="Neon Shadows"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">Lead • 2025</p>
                <h3 className="text-3xl font-black mb-4">Neon Shadows</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  A gripping sci-fi thriller exploring the boundaries of human consciousness.
                </p>
              </div>
            </div>

            {/* Movie 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[3/4] cursor-pointer border border-white/5">
              <Image
                src="/poster2.png"
                alt="The Whispering Woods"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">Supporting • 2024</p>
                <h3 className="text-3xl font-black mb-4">The Whispering Woods</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  An emotional drama following a father's journey through grief.
                </p>
              </div>
            </div>

            {/* Movie 3 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[3/4] cursor-pointer border border-white/5">
              <Image
                src="/hero.png"
                alt="The Final Curtain"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary text-xs font-bold tracking-widest uppercase mb-2">Lead • 2023</p>
                <h3 className="text-3xl font-black mb-4">The Final Curtain</h3>
                <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  A classical theater adaptation brought to the big screen.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Awards & Honours */}
      <section id="awards" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase mb-6">
              <Award size={16} /> Recognition
            </div>
            <h2 className="text-4xl md:text-6xl font-bold">Awards & <span className="text-primary">Honours</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { year: "2025", title: "Best Actor in a Leading Role", org: "International Film Festival", movie: "Neon Shadows" },
              { year: "2024", title: "Outstanding Performance", org: "Screen Actors Guild", movie: "The Whispering Woods" },
              { year: "2023", title: "Critics Choice Award", org: "National Media Awards", movie: "Midnight Express" },
              { year: "2022", title: "Rising Star Award", org: "British Academy Awards", movie: "Career Achievement" },
            ].map((award, i) => (
              <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-xl flex items-start gap-6 hover:bg-white/10 transition-colors group">
                <div className="p-4 bg-primary/20 rounded-lg text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                  <Award size={24} />
                </div>
                <div>
                  <span className="text-primary font-bold text-sm tracking-widest">{award.year}</span>
                  <h4 className="text-xl font-bold mt-1 mb-2">{award.title}</h4>
                  <p className="text-gray-400 text-sm">{award.org} • <span className="text-gray-300">{award.movie}</span></p>
                </div>
              </div>
            ))}
          </div>
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
            <a href="mailto:hello@alexanderpierce.com" className="flex items-center justify-center gap-3 px-8 py-5 bg-white text-black font-bold uppercase tracking-widest rounded-sm hover:bg-primary transition-colors">
              <Mail size={20} /> Email Representation
            </a>
          </div>

          <div className="flex justify-center gap-8 border-t border-white/10 pt-16">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110">
              <MessageCircle size={32} />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110">
              <Globe size={32} />
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors transform hover:scale-110">
              <Film size={32} />
            </a>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="py-12 text-center text-gray-600 text-sm border-t border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="text-xl font-bold tracking-widest text-primary uppercase mb-4 block">
            Alexander <span className="text-white">Pierce</span>
          </Link>
          <p className="mb-6">Professional Actor • Stunt Performer • Voice Artist</p>
          <div className="flex justify-center space-x-6 mb-8 text-gray-400">
            <a href="#banner" className="hover:text-white">Home</a>
            <a href="#portfolio" className="hover:text-white">Portfolio</a>
            <a href="#movie-cards" className="hover:text-white">Movies</a>
            <a href="#awards" className="hover:text-white">Awards</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
          <p className="opacity-50">© {new Date().getFullYear()} Alexander Pierce. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
