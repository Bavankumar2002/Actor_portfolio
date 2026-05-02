import { Award } from "lucide-react";

export default function AwardsPage() {
  return (
    <div className="pt-20 bg-black min-h-screen">
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
    </div>
  );
}
