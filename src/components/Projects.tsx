"use client";

import { useState, useEffect, useRef } from "react";
import { projects, personalInfo } from "@/data/portfolio";

const categories = ["All", "IoT", "Web", "AI"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
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

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section
      ref={ref}
      id="projects"
      className="section"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div
        className="blob"
        style={{
          width: 450,
          height: 450,
          background: "rgba(108,99,255,0.08)",
          top: "-50px",
          right: "-100px",
        }}
      />

      <div className="container">
        {/* Header */}
        <div
          style={{
            marginBottom: 60,
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.7s ease",
          }}
        >
          <div className="section-label">Featured work</div>
          <h2 className="section-title">
            My <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-desc">
            A curated selection of high-impact digital solutions, bridging the
            gap between hardware precision and intelligent software architecture.
          </p>
        </div>

        {/* Filter tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 48,
            flexWrap: "wrap",
            opacity: visible ? 1 : 0,
            transition: "all 0.7s ease 0.1s",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: "8px 22px",
                borderRadius: 9999,
                border: "1px solid",
                borderColor:
                  filter === cat
                    ? "rgba(108,99,255,0.6)"
                    : "rgba(255,255,255,0.1)",
                background:
                  filter === cat
                    ? "rgba(108,99,255,0.15)"
                    : "transparent",
                color: filter === cat ? "#c4c0ff" : "#c7c4d8",
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontFamily: "'Inter', sans-serif",
                boxShadow:
                  filter === cat
                    ? "0 0 20px rgba(108,99,255,0.2)"
                    : "none",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
          className="projects-grid"
        >
          {filtered.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              visible={visible}
              delay={i * 0.08}
            />
          ))}
        </div>

        {/* GitHub CTA */}
        <div
          style={{
            textAlign: "center",
            marginTop: 60,
            opacity: visible ? 1 : 0,
            transition: "all 0.7s ease 0.5s",
          }}
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline"
            style={{ display: "inline-flex" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            View All on GitHub
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .projects-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .projects-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  visible: boolean;
  delay: number;
}

function ProjectCard({ project, visible, delay }: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hovered ? "rgba(108,99,255,0.4)" : "rgba(255,255,255,0.07)"}`,
        borderRadius: 20,
        overflow: "hidden",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered ? "0 0 40px rgba(108,99,255,0.2)" : "none",
        opacity: visible ? 1 : 0,
        animation: visible ? `fadeInUp 0.6s ease ${delay}s both` : "none",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      {/* Image / Preview area */}
      <div
        style={{
          height: 160,
          background: project.gradient,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 56,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.icon}
        {/* shimmer effect */}
        {hovered && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 50%, transparent 60%)",
              animation: "shimmer 0.8s ease",
            }}
          />
        )}

        {/* Featured badge */}
        {project.featured && (
          <div
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              padding: "4px 12px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 9999,
              fontSize: 11,
              fontFamily: "'JetBrains Mono', monospace",
              color: "#FFD700",
              fontWeight: 600,
              letterSpacing: "0.05em",
            }}
          >
            ⭐ FEATURED
          </div>
        )}

        {/* Category badge */}
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            padding: "4px 12px",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 9999,
            fontSize: 10,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#e4e1e9",
            letterSpacing: "0.1em",
          }}
        >
          {project.category.toUpperCase()}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px 24px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {project.title}
        </h3>
        <p
          style={{
            fontSize: 12,
            fontFamily: "'JetBrains Mono', monospace",
            color: "#00D4FF",
            marginBottom: 12,
          }}
        >
          {project.subtitle}
        </p>
        <p
          style={{
            fontSize: 14,
            color: "#918fa1",
            lineHeight: 1.6,
            marginBottom: 20,
            flex: 1,
          }}
        >
          {project.description}
        </p>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>
          {project.tags.map((tag) => (
            <span key={tag} className="chip" style={{ fontSize: 11 }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Links */}
        <div style={{ display: "flex", gap: 10 }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              padding: "9px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              color: "#c7c4d8",
              textDecoration: "none",
              fontSize: 13,
              fontWeight: 500,
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(108,99,255,0.12)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(108,99,255,0.4)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#c4c0ff";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(255,255,255,0.05)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.08)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#c7c4d8";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </a>
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "9px",
                background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                borderRadius: 10,
                color: "#fff",
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 20px rgba(108,99,255,0.5)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
              }}
            >
              ↗ Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
