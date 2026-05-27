"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Simple scroll spy
      const sections = ["home", "about", "skills", "projects", "experience", "contact"];
      let current = "home";
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 200) {
            current = section;
          }
        }
      }
      
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projects", href: "#projects" },
    { name: "Experience", href: "#experience" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 flex justify-center transition-all duration-700 ${
        scrolled ? "py-4 bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/[0.05]" : "py-6 bg-transparent"
      }`}
    >
      <nav className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-[10px] bg-[#3B82F6] flex items-center justify-center font-bold text-white shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-transform group-hover:scale-105">
            DP
          </div>
          <span className="text-white font-semibold text-lg">Durga Praveen</span>
        </a>
        
        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-2">
          {navLinks.map((link) => {
            // Note: Since Home is the top section but 'About' is the first link, 
            // if we are at home, we leave them all inactive, or if they want 'About' highlighted:
            const isActive = activeSection === link.name.toLowerCase() || (activeSection === "home" && link.name === "About"); // Match image
            return (
              <a
                key={link.name}
                href={link.href}
                className={`relative px-5 py-2 text-[14px] font-medium rounded-full transition-all duration-300 ${
                  isActive 
                    ? "bg-white/[0.08] text-white" 
                    : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Desktop Hire Me */}
        <div className="hidden lg:block ml-4">
          <a
            href="#contact"
            className="flex items-center justify-center px-6 py-2.5 rounded-full text-[14px] font-bold text-white bg-gradient-to-r from-[#3B82F6] to-[#00D4FF] shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_25px_rgba(59,130,246,0.6)] hover:scale-105 transition-all"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-zinc-300 hover:text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </nav>

      {/* Mobile Dropdown Menu (Screen Independent) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-[#0A0A0F]/95 backdrop-blur-3xl border-b border-white/[0.05] p-6 flex flex-col gap-3 shadow-2xl lg:hidden"
          >
            {navLinks.map((link) => {
               const isActive = activeSection === link.name.toLowerCase() || (activeSection === "home" && link.name === "About");
               return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-[15px] font-medium px-4 py-3 rounded-xl transition-all ${
                    isActive ? "bg-white/[0.08] text-white" : "text-zinc-400 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  {link.name}
                </a>
               )
            })}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center justify-center px-6 py-4 rounded-xl font-bold text-white bg-gradient-to-r from-[#3B82F6] to-[#00D4FF] shadow-[0_0_20px_rgba(59,130,246,0.4)] text-center"
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
