"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/portfolio";

export default function Skills() {
  const [visible, setVisible] = useState(false);
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          setTimeout(() => setAnimated(true), 300);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="skills"
      className="section"
      style={{ background: "rgba(255,255,255,0.01)", position: "relative" }}
    >
      <div
        className="blob"
        style={{
          width: 350,
          height: 350,
          background: "rgba(108,99,255,0.07)",
          bottom: 0,
          left: "-80px",
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
            What I work with
          </div>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            A curated set of tools and technologies I use to bring ideas to life
          </p>
        </div>

        {/* Skills grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 24,
          }}
          className="skills-grid"
        >
          {skills.map((group, gi) => (
            <div
              key={group.category}
              className="glass-card"
              style={{
                padding: 32,
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(40px)",
                transition: `all 0.7s ease ${gi * 0.1}s`,
              }}
            >
              {/* Category header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 4,
                    height: 28,
                    borderRadius: 2,
                    background: group.color,
                    boxShadow: `0 0 12px ${group.color}80`,
                  }}
                />
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: group.color,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: "0.05em",
                  }}
                >
                  {group.category}
                </h3>
              </div>

              {/* Skill bars */}
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {group.items.map((skill) => (
                  <div key={skill.name}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 14, fontWeight: 500, color: "#c7c4d8" }}>
                        {skill.name}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          fontFamily: "'JetBrains Mono', monospace",
                          color: group.color,
                          fontWeight: 600,
                        }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: animated ? `${skill.level}%` : "0%",
                          background: `linear-gradient(90deg, ${group.color}, ${group.color}aa)`,
                          transitionDelay: `${gi * 0.1 + 0.3}s`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Extra tools row */}
        <div
          style={{
            marginTop: 40,
            padding: "32px 40px",
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: 20,
            opacity: visible ? 1 : 0,
            transition: "all 0.7s ease 0.4s",
          }}
        >
          <p
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12,
              color: "#6C63FF",
              marginBottom: 20,
              letterSpacing: "0.12em",
            }}
          >
            // TOOLS & PLATFORMS
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
            {[
              "Git & GitHub",
              "VS Code",
              "Docker",
              "Postman",
              "Linux",
              "Figma",
              "Vercel",
              "Netlify",
              "Supabase",
              "Firebase",
              "Arduino IDE",
              "Mosquitto MQTT",
            ].map((tool) => (
              <span key={tool} className="chip chip-cyan">
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .skills-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
