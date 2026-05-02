import Link from "next/link";

export default function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-widest text-primary uppercase">
          Alexander <span className="text-white">Pierce</span>
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
