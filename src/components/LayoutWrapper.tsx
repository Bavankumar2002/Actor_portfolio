"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Hide global Header and Footer on Admin and Login pages
  const isExcluded = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  return (
    <>
      {!isExcluded && <Header />}
      <main className="flex-grow">{children}</main>
      {!isExcluded && <Footer />}
    </>
  );
}
