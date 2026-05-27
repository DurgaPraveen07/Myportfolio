"use client";

import { projects } from "@/data/portfolio";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "./SocialIcons";
import { useRef } from "react";

function StackedProjectCard({ project, index, total }: { project: typeof projects[0]; index: number; total: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track this card's scroll progress. 
  // It starts tracking when the card becomes sticky (top of screen)
  // It stops tracking when the NEXT card covers it (approx 100vh later)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10vh", "start -90vh"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 1,
  });

  // As the next card scrolls up to cover this one, we:
  // 1. Scale this card down slightly so it feels like it's sinking into the background
  // 2. Fade it slightly so the new card pops more
  // 3. Float it upwards slightly for a parallax depth effect
  const isLast = index === total - 1;
  const scale = useTransform(smoothProgress, [0, 1], [1, isLast ? 1 : 0.85]);
  const opacity = useTransform(smoothProgress, [0, 1], [1, isLast ? 1 : 0.3]);
  const y = useTransform(smoothProgress, [0, 1], [0, isLast ? 0 : -50]);

  // Alternate layout (left vs right)
  const isEven = index % 2 === 0;

  return (
    <div
      ref={containerRef}
      style={{
        position: "sticky",
        top: "10vh", // Stick near the top of the screen
        height: "100vh", // Full screen height per card
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <motion.div
        style={{
          scale,
          opacity,
          y,
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          transformOrigin: "top center", // Scales down from the top
        }}
      >
        {/* The Card Background/Container */}
        <div
          style={{
            display: "flex",
            flexDirection: isEven ? "row" : "row-reverse",
            gap: "clamp(40px, 8vw, 100px)",
            alignItems: "center",
            flexWrap: "wrap",
            padding: "40px",
            background: "#111116", // Solid dark background so it hides the card beneath it!
            borderRadius: 32,
            boxShadow: "0 -20px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* ── Visual Side ── */}
          <div
            style={{
              flex: "1 1 400px",
              height: "clamp(300px, 45vh, 500px)",
              borderRadius: 24,
              background: project.gradient,
              position: "relative",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            <div style={{
              position: "absolute", inset: 0, opacity: 0.15,
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }} />
            <span style={{ fontSize: "clamp(80px, 12vw, 160px)", position: "relative", zIndex: 1, filter: "drop-shadow(0 20px 30px rgba(0,0,0,0.3))" }}>
              {project.icon}
            </span>
          </div>

          {/* ── Content Side ── */}
          <div style={{ flex: "1 1 400px", display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
              <span style={{
                padding: "8px 16px", background: "rgba(108,99,255,0.1)",
                border: "1px solid rgba(108,99,255,0.2)", borderRadius: 9999,
                fontSize: 11, color: "#c4c0ff", fontFamily: "'JetBrains Mono', monospace",
                letterSpacing: "0.2em", textTransform: "uppercase"
              }}>
                {project.category}
              </span>
              {project.featured && (
                <span style={{
                  padding: "8px 16px", background: "rgba(255,215,0,0.05)",
                  border: "1px solid rgba(255,215,0,0.15)", borderRadius: 9999,
                  fontSize: 11, color: "#FFD700", fontFamily: "'JetBrains Mono', monospace",
                  fontWeight: 600, letterSpacing: "0.15em"
                }}>
                  ⭐ FEATURED
                </span>
              )}
              {/* GitHub Button moved to top row, pushed to right */}
              {project.github && project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 9999, color: "#fff", textDecoration: "none", fontSize: 12, fontWeight: 500,
                  marginLeft: "auto", transition: "background 0.2s"
                }}>
                  <GithubIcon size={14} /> Source Code
                </a>
              )}
            </div>

            <h3 style={{
              fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 900, color: "#fff",
              letterSpacing: "-0.03em", marginBottom: 12, lineHeight: 1.05
            }}>
              {project.title}
            </h3>
            <p style={{
              fontSize: "clamp(15px, 2vw, 18px)", fontFamily: "'JetBrains Mono', monospace",
              color: "#00D4FF", marginBottom: 24, letterSpacing: "0.05em"
            }}>
              {project.subtitle}
            </p>
            <p style={{
              fontSize: "clamp(15px, 2vw, 18px)", color: "#918fa1", lineHeight: 1.7,
              marginBottom: 36, maxWidth: 540, fontWeight: 300
            }}>
              {project.description}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 36 }}>
              {project.tags.map(tag => (
                <span key={tag} style={{
                  padding: "8px 16px", background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12,
                  fontSize: 12, color: "#a5a2b8", fontFamily: "'JetBrains Mono', monospace"
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 16 }}>
              {project.demo && project.demo !== "#" && (
                <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                  display: "flex", alignItems: "center", gap: 8, padding: "12px 24px",
                  background: "linear-gradient(135deg, #6C63FF, #00D4FF)",
                  borderRadius: 14, color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600,
                  boxShadow: "0 10px 20px rgba(0,212,255,0.2)"
                }}>
                  Live Demo <ExternalLink size={16} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" style={{ background: "#0A0A0F", position: "relative", paddingBottom: "20vh" }}>
      
      {/* Huge Transparent Background Watermark */}
      <div style={{
        position: "absolute",
        top: 200,
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "25vw",
        fontWeight: 900,
        color: "rgba(255,255,255,0.02)",
        whiteSpace: "nowrap",
        pointerEvents: "none",
        zIndex: 0,
        userSelect: "none",
      }}>
        PROJECTS
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "15vh 24px 5vh", textAlign: "center", position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <span style={{
            fontSize: 14, fontFamily: "'JetBrains Mono', monospace", color: "#6C63FF",
            letterSpacing: "0.25em", fontWeight: 600, display: "block", marginBottom: 20
          }}>
            PORTFOLIO
          </span>
          <h2 style={{
            fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 900, color: "#fff",
            letterSpacing: "-0.04em", margin: 0
          }}>
            Selected Works
          </h2>
        </motion.div>
      </div>

      {/* The Sticky "Book Pages" Container */}
      <div style={{ position: "relative", zIndex: 2, padding: "0 24px" }}>
        {projects.map((project, i) => (
          <StackedProjectCard key={project.id} project={project} index={i} total={projects.length} />
        ))}
      </div>
    </section>
  );
}
