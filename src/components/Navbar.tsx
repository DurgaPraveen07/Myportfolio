"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((l) => l.href.slice(1));
      for (const section of sections.reverse()) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        transition: "all 0.3s ease",
        background: scrolled
          ? "rgba(10,10,15,0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 70,
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 15,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
              boxShadow: "0 0 20px rgba(108,99,255,0.4)",
            }}
          >
            DP
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 16,
              color: "#e4e1e9",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Durga Praveen
          </span>
        </Link>

        {/* Desktop nav */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{
                color:
                  activeSection === link.href.slice(1)
                    ? "#c4c0ff"
                    : "#c7c4d8",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                padding: "6px 14px",
                borderRadius: 8,
                transition: "all 0.3s ease",
                background:
                  activeSection === link.href.slice(1)
                    ? "rgba(108,99,255,0.12)"
                    : "transparent",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLAnchorElement).style.color = "#e4e1e9";
                (e.target as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.05)";
              }}
              onMouseLeave={(e) => {
                if (activeSection !== link.href.slice(1)) {
                  (e.target as HTMLAnchorElement).style.color = "#c7c4d8";
                  (e.target as HTMLAnchorElement).style.background =
                    "transparent";
                }
              }}
            >
              {link.label}
            </a>
          ))}

          <a
            href="#contact"
            style={{
              marginLeft: 8,
              padding: "8px 20px",
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              borderRadius: 9999,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s ease",
              boxShadow: "0 0 20px rgba(108,99,255,0.3)",
              fontFamily: "'Inter', sans-serif",
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLAnchorElement).style.boxShadow =
                "0 0 40px rgba(108,99,255,0.6)";
              (e.target as HTMLAnchorElement).style.transform =
                "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLAnchorElement).style.boxShadow =
                "0 0 20px rgba(108,99,255,0.3)";
              (e.target as HTMLAnchorElement).style.transform = "none";
            }}
          >
            Hire Me
          </a>
        </div>

        {/* Mobile menu btn */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            padding: "6px 10px",
            color: "#e4e1e9",
            cursor: "pointer",
            fontSize: 20,
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "rgba(19,19,24,0.98)",
            backdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            padding: "16px 24px 24px",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                color: "#c7c4d8",
                textDecoration: "none",
                fontSize: 16,
                fontWeight: 500,
                padding: "12px 0",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setMenuOpen(false)}
            style={{
              display: "block",
              marginTop: 16,
              padding: "12px",
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              color: "#fff",
              borderRadius: 9999,
              fontSize: 15,
              fontWeight: 600,
              textDecoration: "none",
              textAlign: "center",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
