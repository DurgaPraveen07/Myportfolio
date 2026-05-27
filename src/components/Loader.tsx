"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// The bar height
const BAR_H = 8;

// Ultra-premium neon holographic runner (Pure CSS)
const NEON_RUNNER_CSS = `
  @keyframes nr-torso {
    0%, 100% { transform: translateY(0) rotate(10deg); }
    50%      { transform: translateY(-3px) rotate(12deg); }
  }
  @keyframes nr-thigh-r {
    0%, 100% { transform: rotate(50deg); }
    50%      { transform: rotate(-50deg); }
  }
  @keyframes nr-calf-r {
    0%   { transform: rotate(5deg); }
    25%  { transform: rotate(90deg); }
    50%  { transform: rotate(10deg); }
    75%  { transform: rotate(90deg); }
    100% { transform: rotate(5deg); }
  }
  @keyframes nr-thigh-l {
    0%, 100% { transform: rotate(-50deg); }
    50%      { transform: rotate(50deg); }
  }
  @keyframes nr-calf-l {
    0%   { transform: rotate(10deg); }
    25%  { transform: rotate(90deg); }
    50%  { transform: rotate(5deg); }
    75%  { transform: rotate(90deg); }
    100% { transform: rotate(10deg); }
  }
  @keyframes nr-arm-r {
    0%, 100% { transform: rotate(-50deg); }
    50%      { transform: rotate(50deg); }
  }
  @keyframes nr-forearm-r {
    0%, 100% { transform: rotate(-90deg); }
    50%      { transform: rotate(-20deg); }
  }
  @keyframes nr-arm-l {
    0%, 100% { transform: rotate(50deg); }
    50%      { transform: rotate(-50deg); }
  }
  @keyframes nr-forearm-l {
    0%, 100% { transform: rotate(-20deg); }
    50%      { transform: rotate(-90deg); }
  }
  @keyframes speed-line {
    0%   { transform: translateX(100vw); opacity: 0; }
    10%  { opacity: 0.5; }
    90%  { opacity: 0.5; }
    100% { transform: translateX(-100vw); opacity: 0; }
  }
  @keyframes spark-fly {
    0%   { transform: translate(0, 0) scale(1); opacity: 1; }
    100% { transform: translate(-80px, 15px) scale(0); opacity: 0; }
  }

  .nr-t { animation: nr-torso 0.5s ease-in-out infinite; transform-origin: 0px 18px; }
  
  .nr-tr { animation: nr-thigh-r 0.5s ease-in-out infinite; transform-origin: 0px 18px; }
  .nr-cr { animation: nr-calf-r 0.5s ease-in-out infinite; transform-origin: 0px 32px; }
  
  .nr-tl { animation: nr-thigh-l 0.5s ease-in-out infinite; transform-origin: 0px 18px; }
  .nr-cl { animation: nr-calf-l 0.5s ease-in-out infinite; transform-origin: 0px 32px; }
  
  .nr-ar { animation: nr-arm-r 0.5s ease-in-out infinite; transform-origin: 0px 2px; }
  .nr-fr { animation: nr-forearm-r 0.5s ease-in-out infinite; transform-origin: 0px 14px; }
  
  .nr-al { animation: nr-arm-l 0.5s ease-in-out infinite; transform-origin: 0px 2px; }
  .nr-fl { animation: nr-forearm-l 0.5s ease-in-out infinite; transform-origin: 0px 14px; }
`;

function HologramRunner() {
  return (
    <svg width="70" height="70" viewBox="-30 -10 60 70" style={{ overflow: "visible", filter: "drop-shadow(0 0 8px #00ffff)" }}>
      <g className="nr-t">
        {/* Head */}
        <circle cx="2" cy="-6" r="3.5" fill="none" stroke="#00ffff" strokeWidth="2.5" />
        {/* Spine */}
        <line x1="0" y1="-2" x2="0" y2="18" stroke="#00ffff" strokeWidth="3" strokeLinecap="round" />
        
        {/* Back Leg (Darker Blue) */}
        <g className="nr-tl">
          <line x1="0" y1="18" x2="0" y2="32" stroke="#0055ff" strokeWidth="3" strokeLinecap="round" />
          <g className="nr-cl">
            <line x1="0" y1="32" x2="0" y2="48" stroke="#0055ff" strokeWidth="2.5" strokeLinecap="round" />
            <line x1="0" y1="48" x2="5" y2="48" stroke="#0055ff" strokeWidth="2.5" strokeLinecap="round" /> {/* Foot */}
          </g>
        </g>
        
        {/* Back Arm (Darker Blue) */}
        <g className="nr-al">
          <line x1="0" y1="2" x2="0" y2="14" stroke="#0055ff" strokeWidth="2.5" strokeLinecap="round" />
          <g className="nr-fl">
            <line x1="0" y1="14" x2="0" y2="26" stroke="#0055ff" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </g>

        {/* Front Leg (Bright Cyan) */}
        <g className="nr-tr">
          <line x1="0" y1="18" x2="0" y2="32" stroke="#00ffff" strokeWidth="3.5" strokeLinecap="round" />
          <g className="nr-cr">
            <line x1="0" y1="32" x2="0" y2="48" stroke="#00ffff" strokeWidth="3" strokeLinecap="round" />
            <line x1="0" y1="48" x2="6" y2="48" stroke="#00ffff" strokeWidth="3" strokeLinecap="round" /> {/* Foot */}
          </g>
        </g>

        {/* Front Arm (Bright Cyan) */}
        <g className="nr-ar">
          <line x1="0" y1="2" x2="0" y2="14" stroke="#00ffff" strokeWidth="3" strokeLinecap="round" />
          <g className="nr-fr">
            <line x1="0" y1="14" x2="0" y2="26" stroke="#00ffff" strokeWidth="3" strokeLinecap="round" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3400;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    const timer = setTimeout(() => setLoading(false), duration + 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#05050A", // Deep navy/black
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <style>{NEON_RUNNER_CSS}</style>

          {/* Ambient Cyberpunk Glows */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 70% 55% at 50% 65%, rgba(0,120,255,0.15) 0%, transparent 70%)",
          }} />

          {/* Speed Lines */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4 }}>
            {[...Array(6)].map((_, i) => (
              <div key={i} style={{
                position: "absolute",
                top: `${30 + Math.random() * 40}%`,
                left: 0, width: "15vw", height: 1,
                background: "linear-gradient(90deg, transparent, rgba(0,255,255,0.8), transparent)",
                animation: `speed-line ${0.5 + Math.random()}s linear infinite`,
                animationDelay: `${Math.random()}s`,
              }} />
            ))}
          </div>

          {/* ── TITLE ── */}
          <motion.div
            initial={{ opacity: 0, y: -24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: "center", userSelect: "none", marginBottom: 48, zIndex: 10 }}
          >
            <h1 style={{
              fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em",
              fontSize: "clamp(60px, 11vw, 130px)", margin: 0,
            }}>
              <span style={{ color: "#ffffff", filter: "drop-shadow(0 0 20px rgba(255,255,255,0.2))" }}>Durga </span>
              <span style={{
                background: "linear-gradient(90deg, #0055ff 0%, #00ffff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 0 30px rgba(0,255,255,0.4))",
              }}>
                Praveen
              </span>
            </h1>
            <p style={{
              marginTop: 12, color: "#8a8ea8", letterSpacing: "0.42em",
              fontSize: "clamp(9px, 1.1vw, 12px)", fontFamily: "'JetBrains Mono', monospace",
              textTransform: "uppercase",
            }}>
              Full Stack Developer &nbsp;•&nbsp; IoT Engineer
            </p>
          </motion.div>

          {/* ── BAR + RUNNER wrapper ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{ width: "min(540px, 82vw)", position: "relative", paddingTop: 80, zIndex: 10 }}
          >
            {/* Holographic Wireframe Runner */}
            <div
              style={{
                position: "absolute", bottom: BAR_H - 1,
                left: `${Math.min(progress, 95)}%`,
                transform: "translateX(-40%)",
                pointerEvents: "none", zIndex: 20,
              }}
            >
              <HologramRunner />

              {/* Trailing Particle Sparks */}
              {[...Array(5)].map((_, i) => (
                <div key={i} style={{
                  position: "absolute", bottom: 4, left: 10, width: 3, height: 3,
                  background: "#00ffff", borderRadius: "50%",
                  boxShadow: "0 0 8px #00ffff",
                  animation: `spark-fly 0.5s ease-out infinite`,
                  animationDelay: `${i * 0.1}s`,
                }} />
              ))}
            </div>

            {/* Glowing Ground Reflection */}
            <div style={{
              position: "absolute", bottom: BAR_H + 2,
              left: `${Math.min(progress, 95)}%`,
              transform: "translateX(-50%)",
              width: 80, height: 12, borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(0,255,255,0.6) 0%, transparent 75%)",
              pointerEvents: "none", zIndex: 10,
            }} />

            {/* ── THE GLASSMORPHISM BAR ── */}
            <div style={{
              position: "relative", width: "100%", height: BAR_H, borderRadius: 9999,
              background: "rgba(255,255,255,0.03)", backdropFilter: "blur(10px)",
              overflow: "visible", border: "1px solid rgba(255,255,255,0.05)",
              boxShadow: "inset 0 1px 4px rgba(0,0,0,0.8), 0 10px 30px rgba(0,0,0,0.5)",
            }}>
              {/* Energy Flowing inside */}
              <div style={{
                position: "absolute", inset: 0, right: `${100 - progress}%`,
                background: "linear-gradient(90deg, #0011ff 0%, #00e5ff 100%)",
                borderRadius: 9999,
                boxShadow: "0 0 20px rgba(0,230,255,0.8), 0 0 40px rgba(0,100,255,0.4)",
              }} />

              {/* Glowing tip */}
              <div style={{
                position: "absolute", top: "50%", left: `${progress}%`,
                transform: "translate(-50%, -50%)", width: 14, height: 14, borderRadius: "50%",
                background: "#ffffff", boxShadow: "0 0 20px 8px rgba(0,255,255,0.9)",
                pointerEvents: "none",
              }} />
            </div>

            {/* Floor Reflection (AAA Game Style) */}
            <div style={{
              width: `${progress}%`, height: 20, marginTop: 4,
              background: "linear-gradient(180deg, rgba(0,200,255,0.3) 0%, transparent 100%)",
              filter: "blur(8px)",
              transform: "perspective(100px) rotateX(60deg)",
              transformOrigin: "top center",
            }} />

            {/* Labels */}
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 14,
            }}>
              <span style={{
                fontSize: 10, letterSpacing: "0.4em", textTransform: "uppercase",
                color: "#6b7280", fontFamily: "'JetBrains Mono', monospace",
              }}>
                Initializing Experience
              </span>
              <span style={{
                fontSize: 15, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace",
                background: "linear-gradient(90deg, #0055ff, #00ffff)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
                {Math.floor(progress)}%
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
