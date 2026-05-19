"use client";

import { personalInfo } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Gradient line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "20%",
          right: "20%",
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(108,99,255,0.5), transparent)",
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          textAlign: "center",
        }}
      >
        {/* Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9,
              background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 14,
              color: "#fff",
              fontFamily: "'Inter', sans-serif",
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
        </div>

        {/* Nav links */}
        <nav style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          {["About", "Skills", "Projects", "Experience", "Contact"].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              style={{
                color: "#918fa1",
                textDecoration: "none",
                fontSize: 14,
                transition: "color 0.3s",
                fontFamily: "'Inter', sans-serif",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#c4c0ff")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLAnchorElement).style.color = "#918fa1")
              }
            >
              {link}
            </a>
          ))}
        </nav>

        {/* Socials */}
        <div style={{ display: "flex", gap: 12 }}>
          {[
            { label: "GitHub", href: personalInfo.github, icon: "🐙" },
            { label: "LinkedIn", href: personalInfo.linkedin, icon: "💼" },
            { label: "Instagram", href: personalInfo.instagram, icon: "📸" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              title={s.label}
              style={{ fontSize: 16 }}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center" }}>
          <p style={{ color: "#464555", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            Built with ❤️ using Next.js, TypeScript &amp; Lumina Noir Design System
          </p>
          <p style={{ color: "#464555", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            © {year} Durga Praveen. All rights reserved.
          </p>
        </div>

        {/* Back to top */}
        <a
          href="#home"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 20px",
            background: "rgba(108,99,255,0.1)",
            border: "1px solid rgba(108,99,255,0.25)",
            borderRadius: 9999,
            color: "#c4c0ff",
            textDecoration: "none",
            fontSize: 13,
            fontFamily: "'JetBrains Mono', monospace",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.2)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(108,99,255,0.3)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.1)";
            (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
          }}
        >
          ↑ Back to top
        </a>
      </div>
    </footer>
  );
}
