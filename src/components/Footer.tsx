"use client";

import { personalInfo } from "@/data/portfolio";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 text-zinc-500 font-medium">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-sm text-center md:text-left">
        <span>&copy; {year} {personalInfo.name}. All rights reserved.</span>
        <span className="hidden md:inline">&middot;</span>
        <span>Built with React & Next.js</span>
      </div>

      <button
        onClick={scrollToTop}
        className="group flex items-center gap-2 hover:text-white transition-colors"
      >
        <span className="text-sm">Back to top</span>
        <div className="w-8 h-8 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center group-hover:bg-white/[0.08] group-hover:border-white/10 transition-colors">
          <ArrowUp size={14} />
        </div>
      </button>
    </footer>
  );
}
