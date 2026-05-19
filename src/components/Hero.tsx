"use client";

import { useEffect, useState, useRef } from "react";
import { personalInfo } from "@/data/portfolio";

const GitHubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 0 0 0 0-2.881z" />
  </svg>
);

const TAGLINES = personalInfo.taglines;

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const current = TAGLINES[taglineIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayText.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length + 1));
      }, 60);
    } else if (!isDeleting && displayText.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(current.slice(0, displayText.length - 1));
      }, 30);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setTaglineIndex((i) => (i + 1) % TAGLINES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, taglineIndex]);

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        paddingTop: 80,
      }}
      className="bg-grid"
    >
      {/* Blobs */}
      <div
        className="blob"
        style={{
          width: 500,
          height: 500,
          background: "rgba(108,99,255,0.12)",
          top: "-100px",
          left: "-150px",
          animationDelay: "0s",
        }}
      />
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: "rgba(0,212,255,0.08)",
          top: "200px",
          right: "-100px",
          animationDelay: "3s",
        }}
      />
      <div
        className="blob"
        style={{
          width: 300,
          height: 300,
          background: "rgba(255,107,107,0.06)",
          bottom: "100px",
          left: "40%",
          animationDelay: "5s",
        }}
      />

      <div className="container" style={{ width: "100%" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left content */}
          <div style={{ animation: mounted ? "fadeInLeft 0.8s ease forwards" : "none" }}>
            {/* Badge */}
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 16px",
                background: "rgba(108,99,255,0.1)",
                border: "1px solid rgba(108,99,255,0.25)",
                borderRadius: 9999,
                marginBottom: 24,
              }}
            >
              <div className="status-dot" />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#c4c0ff",
                  fontWeight: 500,
                }}
              >
                Open to Opportunities
              </span>
            </div>

            {/* Name */}
            <h1
              style={{
                fontSize: "clamp(48px, 7vw, 80px)",
                fontWeight: 900,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}
            >
              <span style={{ color: "#e4e1e9" }}>Hi, I&apos;m</span>
              <br />
              <span className="gradient-text">Durga Praveen</span>
            </h1>

            {/* Title */}
            <p
              style={{
                fontSize: "clamp(16px, 2vw, 20px)",
                color: "#a2e7ff",
                fontWeight: 500,
                marginBottom: 16,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Full Stack Developer &amp; IoT Enthusiast
            </p>

            {/* Tagline typewriter */}
            <div
              style={{
                fontSize: "clamp(14px, 1.5vw, 17px)",
                color: "#918fa1",
                marginBottom: 40,
                minHeight: 26,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              <span>{displayText}</span>
              <span
                style={{
                  display: "inline-block",
                  width: 2,
                  height: "1.2em",
                  background: "#6C63FF",
                  animation: "blink 1s ease infinite",
                  verticalAlign: "middle",
                }}
              />
            </div>

            {/* CTAs */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 16,
                marginBottom: 48,
              }}
            >
              <a href="#projects" className="btn-primary">
                <span>View My Work</span>
                <span style={{ position: "relative", zIndex: 1 }}>→</span>
              </a>
              <a
                href="/Durga_Praveen_Resume.pdf"
                download="Durga_Praveen_Resume.pdf"
                className="btn-outline"
              >
                ⬇ Download CV
              </a>
            </div>

            {/* Socials */}
            <div style={{ display: "flex", gap: 12 }}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="GitHub"
              >
                <GitHubIcon />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={personalInfo.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                title="Instagram"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {/* Right — Avatar */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 32,
              animation: mounted ? "fadeInRight 0.8s ease 0.2s both" : "none",
            }}
          >
            <div style={{ position: "relative" }}>
              {/* Outer glow ring */}
              <div
                style={{
                  position: "absolute",
                  inset: -4,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  animation: "spin-slow 8s linear infinite",
                }}
              />
              {/* Inner bg */}
              <div
                style={{
                  position: "absolute",
                  inset: 2,
                  borderRadius: "50%",
                  background: "#0A0A0F",
                }}
              />
              {/* Avatar circle */}
              <div
                style={{
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #1f1f25, #2a292f)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  fontSize: 100,
                  boxShadow: "0 0 60px rgba(108,99,255,0.3)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/profile.jpg"
                  alt="Durga Praveen"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              {/* Floating tech badges */}
              {[
                { label: "React", top: "0%", left: "-30%", delay: "0s" },
                { label: "Node.js", top: "30%", right: "-40%", delay: "0.5s" },
                { label: "Python", bottom: "5%", left: "-25%", delay: "1s" },
                { label: "MQTT/IoT", bottom: "20%", right: "-35%", delay: "1.5s" },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="chip"
                  style={{
                    position: "absolute",
                    top: badge.top,
                    left: badge.left,
                    right: (badge as { right?: string }).right,
                    bottom: (badge as { bottom?: string }).bottom,
                    animation: `float 5s ease-in-out ${badge.delay} infinite`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 2,
            marginTop: 80,
            padding: "32px 40px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20,
            backdropFilter: "blur(20px)",
            animation: mounted ? "fadeInUp 1s ease 0.4s both" : "none",
          }}
          className="stats-bar"
        >
          {personalInfo.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                textAlign: "center",
                padding: "16px",
                borderRight:
                  i < personalInfo.stats.length - 1
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "none",
              }}
            >
              <div
                style={{
                  fontSize: "clamp(28px, 4vw, 42px)",
                  fontWeight: 800,
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
              <div style={{ color: "#918fa1", fontSize: 13, marginTop: 4 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 40,
          }}
        >
          <a
            href="#about"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              color: "#918fa1",
              textDecoration: "none",
              fontSize: 12,
              animation: "float 2s ease-in-out infinite",
              fontFamily: "'JetBrains Mono', monospace",
            }}
          >
            <span>scroll down</span>
            <span style={{ fontSize: 20 }}>↓</span>
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; text-align: center; }
          .hero-grid > div:last-child { display: none; }
          .stats-bar { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  );
}
