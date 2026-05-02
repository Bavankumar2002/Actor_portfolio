import Image from "next/image";
import { Camera, Star, Film } from "lucide-react";

export default function PortfolioPage() {
  return (
    <div className="pt-20 bg-black min-h-screen">
      <section id="portfolio" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
          {/* Left Side: Images */}
          <div className="w-full lg:w-3/5 grid grid-cols-2 gap-4">
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden border border-white/10 group">
              <Image src="/hero.png" alt="Headshot 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden border border-white/10 group translate-y-8">
              <Image src="/poster1.png" alt="Still 1" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="relative h-[300px] md:h-[500px] rounded-lg overflow-hidden border border-white/10 group col-span-2 -translate-y-4">
              <Image src="/poster2.png" alt="Headshot 2" fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="w-full lg:w-2/5 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-primary border border-primary/20 text-sm font-semibold tracking-widest uppercase">
              <Camera size={16} /> Portfolio
            </div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight">Stills & <span className="text-primary">Portraits</span></h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Capturing the essence of every character through compelling imagery. My portfolio showcases a range of emotions and personas, from intense dramatic headshots to cinematic action stills.
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Star size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Versatile Expressions</h4>
                  <p className="text-sm text-gray-500">Expertise in diverse character ranges.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-300">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Film size={20} />
                </div>
                <div>
                  <h4 className="font-bold">Cinematic Quality</h4>
                  <p className="text-sm text-gray-500">Professional stills from award-winning sets.</p>
                </div>
              </div>
            </div>
            <button className="px-8 py-4 border border-white/30 hover:border-white font-bold uppercase tracking-widest rounded-sm transition-all hover:bg-white hover:text-black">
              Download Portfolio
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
