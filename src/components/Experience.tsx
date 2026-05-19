"use client";

import { useEffect, useRef, useState } from "react";
import { experience } from "@/data/portfolio";

export default function Experience() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="experience"
      className="section"
      style={{ background: "rgba(255,255,255,0.01)", position: "relative" }}
    >
      <div
        className="blob"
        style={{
          width: 400,
          height: 400,
          background: "rgba(0,212,255,0.06)",
          top: "20%",
          right: "-80px",
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
            My journey
          </div>
          <h2 className="section-title">
            Experience &amp;{" "}
            <span className="gradient-text">Education</span>
          </h2>
          <p className="section-desc" style={{ margin: "0 auto" }}>
            My professional evolution and academic background
          </p>
        </div>

        {/* Two columns: Work & Education */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
          }}
          className="exp-grid"
        >
          {/* Work */}
          <div>
            <h3
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#6C63FF",
                letterSpacing: "0.1em",
                marginBottom: 32,
              }}
            >
              // WORK EXPERIENCE
            </h3>
            <Timeline
              items={experience.filter((e) => e.type === "work")}
              visible={visible}
              color="var(--primary)"
            />
          </div>

          {/* Education */}
          <div>
            <h3
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13,
                color: "#00D4FF",
                letterSpacing: "0.1em",
                marginBottom: 32,
              }}
            >
              // EDUCATION
            </h3>
            <Timeline
              items={experience.filter((e) => e.type === "education")}
              visible={visible}
              color="var(--secondary)"
              delay={0.2}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}

interface TimelineProps {
  items: typeof experience;
  visible: boolean;
  color: string;
  delay?: number;
}

function Timeline({ items, visible, color, delay = 0 }: TimelineProps) {
  return (
    <div style={{ position: "relative" }}>
      {/* Vertical line */}
      <div
        style={{
          position: "absolute",
          left: 20,
          top: 6,
          bottom: 0,
          width: 2,
          background: `linear-gradient(to bottom, ${color === "var(--primary)" ? "#6C63FF" : "#00D4FF"}, transparent)`,
          opacity: 0.4,
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        {items.map((item, i) => (
          <div
            key={item.title}
            style={{
              display: "flex",
              gap: 20,
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(30px)",
              transition: `all 0.7s ease ${delay + i * 0.15}s`,
            }}
          >
            {/* Dot */}
            <div style={{ flexShrink: 0, paddingTop: 4 }}>
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  background:
                    color === "var(--primary)"
                      ? "rgba(108,99,255,0.15)"
                      : "rgba(0,212,255,0.15)",
                  border: `2px solid ${color === "var(--primary)" ? "rgba(108,99,255,0.5)" : "rgba(0,212,255,0.5)"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  boxShadow:
                    color === "var(--primary)"
                      ? "0 0 16px rgba(108,99,255,0.3)"
                      : "0 0 16px rgba(0,212,255,0.3)",
                }}
              >
                {item.type === "work" ? "💼" : "🎓"}
              </div>
            </div>

            {/* Card */}
            <div
              style={{
                flex: 1,
                padding: "24px",
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 16,
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  color === "var(--primary)"
                    ? "rgba(108,99,255,0.35)"
                    : "rgba(0,212,255,0.35)";
                (e.currentTarget as HTMLDivElement).style.background =
                  color === "var(--primary)"
                    ? "rgba(108,99,255,0.05)"
                    : "rgba(0,212,255,0.05)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor =
                  "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLDivElement).style.background =
                  "rgba(255,255,255,0.02)";
              }}
            >
              {/* Period badge */}
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 10px",
                  background:
                    color === "var(--primary)"
                      ? "rgba(108,99,255,0.12)"
                      : "rgba(0,212,255,0.1)",
                  border: `1px solid ${color === "var(--primary)" ? "rgba(108,99,255,0.25)" : "rgba(0,212,255,0.25)"}`,
                  borderRadius: 9999,
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  color:
                    color === "var(--primary)" ? "#c4c0ff" : "#33DCFF",
                  marginBottom: 10,
                }}
              >
                📅 {item.period}
                {item.current && (
                  <span
                    style={{
                      marginLeft: 8,
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#22c55e",
                      display: "inline-block",
                      animation: "pulse-dot 2s infinite",
                    }}
                  />
                )}
              </div>

              <h4 style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: 13,
                  fontFamily: "'JetBrains Mono', monospace",
                  color:
                    color === "var(--primary)" ? "#c4c0ff" : "#33DCFF",
                  marginBottom: 12,
                }}
              >
                {item.company}
              </p>
              <p style={{ fontSize: 13, color: "#918fa1", lineHeight: 1.7, marginBottom: 16 }}>
                {item.description}
              </p>

              {/* Tech chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {item.tech.map((t) => (
                  <span
                    key={t}
                    className={
                      color === "var(--primary)" ? "chip" : "chip chip-cyan"
                    }
                    style={{ fontSize: 11 }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
