"use client";

import { useEffect, useRef, useState } from "react";
import { personalInfo, techStack } from "@/data/portfolio";

export default function About() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="about"
      className="section"
      style={{ position: "relative", overflow: "hidden" }}
    >
      {/* Blob */}
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: "rgba(0,212,255,0.06)",
          top: 0,
          right: "-100px",
        }}
      />

      <div className="container">
        {/* Header */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 80,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="section-label" style={{ justifyContent: "center" }}>
            Get to know me
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Me</span>
          </h2>
        </div>

        {/* Content grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.2fr",
            gap: 60,
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Left — Visual card */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "all 0.7s ease 0.1s",
            }}
          >
            <div
              className="glass-card"
              style={{
                padding: 40,
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  overflow: "hidden",
                  margin: "0 auto 20px",
                  boxShadow: "0 0 40px rgba(108,99,255,0.4)",
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
                    borderRadius: "50%",
                  }}
                />
              </div>

              <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
                {personalInfo.name}
              </h3>
              <p
                style={{
                  color: "#a2e7ff",
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  marginBottom: 20,
                }}
              >
                {personalInfo.title}
              </p>

              {/* Info rows */}
              {[
                { icon: "📍", label: personalInfo.location },
                { icon: "🎓", label: "DIET, Andhra Pradesh" },
                { icon: "📅", label: personalInfo.year },
                { icon: "⭐", label: `GPA: ${personalInfo.gpa}` },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                    fontSize: 14,
                    color: "#c7c4d8",
                  }}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              ))}

              {/* Status */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 20,
                  padding: "8px 16px",
                  background: "rgba(34,197,94,0.1)",
                  border: "1px solid rgba(34,197,94,0.25)",
                  borderRadius: 9999,
                  fontSize: 13,
                  color: "#4ade80",
                }}
              >
                <div className="status-dot" />
                Available for Opportunities
              </div>

              {/* Decorative gradient */}
              <div
                style={{
                  position: "absolute",
                  bottom: -60,
                  right: -60,
                  width: 180,
                  height: 180,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(108,99,255,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Right — Bio & Tech */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "all 0.7s ease 0.2s",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(24px, 3vw, 32px)",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Digital Architect &{" "}
              <span className="gradient-text">Student Developer</span>
            </h3>
            <p
              style={{
                color: "#c7c4d8",
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              Currently pursuing BTech at{" "}
              <strong style={{ color: "#a2e7ff" }}>
                Dhanekula Institute of Engineering and Technology
              </strong>
              , I specialize in building high-performance web applications that
              merge technical precision with intuitive user experiences.
            </p>
            <p
              style={{
                color: "#c7c4d8",
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              My journey is fueled by a passion for solving complex problems
              through clean, maintainable code. I don&apos;t just write scripts; I
              design digital ecosystems that empower users and businesses alike.
              From real-time IoT dashboards to AI-powered gesture controllers —
              I love building things that matter.
            </p>

            {/* Interests */}
            <div style={{ marginBottom: 36 }}>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#6C63FF",
                  marginBottom: 12,
                  letterSpacing: "0.1em",
                }}
              >
                // INTERESTS
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {[
                  "🌐 Web Development",
                  "📡 IoT Systems",
                  "🤖 Machine Learning",
                  "🎨 UI/UX Design",
                  "🔓 Open Source",
                ].map((i) => (
                  <span key={i} className="chip">
                    {i}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech stack grid */}
            <div>
              <p
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "#00D4FF",
                  marginBottom: 16,
                  letterSpacing: "0.1em",
                }}
              >
                // TECH STACK
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                }}
              >
                {techStack.map((tech) => (
                  <div
                    key={tech.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 10,
                      fontSize: 13,
                      color: "#c7c4d8",
                      transition: "all 0.3s ease",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(108,99,255,0.4)";
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(108,99,255,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLDivElement).style.background =
                        "rgba(255,255,255,0.03)";
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{tech.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 500 }}>
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: 36 }}>
              <a href="#contact" className="btn-primary" style={{ display: "inline-flex" }}>
                <span>Let&apos;s Work Together</span>
                <span style={{ position: "relative", zIndex: 1 }}>→</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
