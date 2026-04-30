import Image from "next/image";
import Link from "next/link";
import { Film, MessageCircle, Globe, Mail, PlayCircle, Star, ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-widest text-primary uppercase">
            Alexander <span className="text-white">Pierce</span>
          </Link>
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-wider font-semibold">
            <a href="#about" className="hover:text-primary transition-colors">About</a>
            <a href="#portfolio" className="hover:text-primary transition-colors">Portfolio</a>
            <a href="#contact" className="hover:text-primary transition-colors">Contact</a>
            <Link href="/admin" className="hover:text-primary transition-colors text-white/50">Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
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
            Bringing <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-200">Stories</span> <br/>to Life.
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-2xl mx-auto">
            Award-winning actor with over a decade of experience in film, television, and theater.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a href="#portfolio" className="group relative px-8 py-4 bg-primary text-black font-bold uppercase tracking-widest overflow-hidden rounded-sm transition-all hover:scale-105">
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

      {/* About Section */}
      <section id="about" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
          <div className="w-full md:w-1/2 relative h-[600px] rounded-lg overflow-hidden border border-white/10 group">
            <Image 
              src="/hero.png" 
              alt="About Alexander" 
              fill 
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-primary/10 mix-blend-overlay" />
          </div>
          <div className="w-full md:w-1/2 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase">
              <Star size={16} /> Biography
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">The Man Behind the <span className="text-primary">Characters</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Born with a passion for storytelling, Alexander Pierce has dedicated his life to the craft of acting. Trained at the prestigious Royal Academy of Dramatic Art, he brings depth, nuance, and unwavering authenticity to every role.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              From gritty independent films to blockbuster franchises, his versatility has earned him critical acclaim and a devoted global following.
            </p>
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">15+</h4>
                <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">Years Experience</p>
              </div>
              <div>
                <h4 className="text-4xl font-black text-primary mb-2">40+</h4>
                <p className="text-gray-400 text-sm uppercase tracking-wider font-bold">Projects Completed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase mb-6">
                <Film size={16} /> Featured Work
              </div>
              <h2 className="text-4xl md:text-6xl font-bold">Selected <span className="text-primary">Filmography</span></h2>
            </div>
            <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-sm">
              Full IMDB Profile <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Project 1 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[3/4] cursor-pointer">
              <Image 
                src="/poster1.png" 
                alt="Neon Shadows" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Lead Role • 2025</p>
                <h3 className="text-4xl font-black mb-4">Neon Shadows</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  A gripping sci-fi thriller exploring the boundaries of human consciousness in a dystopian metropolis.
                </p>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group relative overflow-hidden rounded-xl bg-white/5 aspect-[3/4] cursor-pointer">
              <Image 
                src="/poster2.png" 
                alt="The Whispering Woods" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="absolute bottom-0 left-0 p-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-primary text-sm font-bold tracking-widest uppercase mb-2">Supporting Role • 2024</p>
                <h3 className="text-4xl font-black mb-4">The Whispering Woods</h3>
                <p className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  An emotional drama following a father's journey through grief in the remote wilderness.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black mb-8">Ready to <span className="text-primary">Collaborate?</span></h2>
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

      <footer className="py-8 text-center text-gray-600 text-sm border-t border-white/5">
        <p>© {new Date().getFullYear()} Alexander Pierce. All rights reserved.</p>
      </footer>
    </div>
  );
}
