"use client";

import { useState, useRef, FormEvent, useCallback } from "react";
import { personalInfo } from "@/data/portfolio";
import { motion } from "framer-motion";
import { Mail, MapPin, RefreshCw, ExternalLink } from "lucide-react";
import { LinkedinIcon, InstagramIcon, GithubIcon } from "./SocialIcons";

/* ─── Shared styles matching the Vercel reference ─────────────────────────── */
const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(255,255,255,0.03)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  padding: "12px 16px",
  color: "#e4e1e9",
  fontSize: "14px",
  outline: "none",
  transition: "border-color 0.3s, background 0.3s",
  fontFamily: "Inter, sans-serif",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11px",
  fontFamily: "'JetBrains Mono', monospace",
  color: "#6C63FF",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  display: "block",
  marginBottom: "8px",
};

/* ─── Info card with cursor-tracked glow ──────────────────────────────────── */
function InfoCard({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string | null;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glow, setGlow] = useState({ x: 50, y: 50, on: false });

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setGlow({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  }, []);
  const onLeave = () => setGlow((g) => ({ ...g, on: false }));

  const inner = (
    <div className="relative flex items-center gap-4 p-5" ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}>
      {/* cursor glow */}
      <div
        className="absolute pointer-events-none rounded-full transition-opacity duration-300"
        style={{
          width: 200, height: 200,
          left: `${glow.x}%`, top: `${glow.y}%`,
          transform: "translate(-50%,-50%)",
          background: "radial-gradient(circle, rgba(108,99,255,0.12) 0%, transparent 70%)",
          opacity: glow.on ? 1 : 0,
        }}
      />
      {/* Icon circle */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-white relative z-10"
        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        {icon}
      </div>
      <div className="flex-1 min-w-0 relative z-10">
        <p style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#6C63FF", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 4 }}>
          {label}
        </p>
        <p style={{ fontSize: "14px", color: "#c7c4d8", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value}
        </p>
      </div>
      {href && (
        <ExternalLink size={13} className="text-zinc-700 group-hover:text-white transition-colors flex-shrink-0 relative z-10" />
      )}
    </div>
  );

  const cardStyle: React.CSSProperties = {
    borderRadius: 16,
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.06)",
    overflow: "hidden",
    transition: "border-color 0.3s",
  };

  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
      className="group block hover:border-[rgba(108,99,255,0.3)]" style={cardStyle}>
      {inner}
    </a>
  ) : (
    <div style={cardStyle}>{inner}</div>
  );
}

/* ─── Main Contact section ─────────────────────────────────────────────────── */
export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const [captcha, setCaptcha] = useState({ num1: 4, num2: 8, answer: "" });

  const refreshCaptcha = () =>
    setCaptcha({ num1: Math.floor(Math.random() * 10) + 1, num2: Math.floor(Math.random() * 10) + 1, answer: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;
    if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
      alert("Incorrect answer. Please try again.");
      refreshCaptcha();
      return;
    }
    setStatus("sending");
    const data = new FormData(formRef.current);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(data)),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) { setStatus("sent"); formRef.current.reset(); refreshCaptcha(); setTimeout(() => setStatus("idle"), 5000); }
      else { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
    } catch { setStatus("error"); setTimeout(() => setStatus("idle"), 3000); }
  };

  /* Focus-input glow */
  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(108,99,255,0.5)";
    e.target.style.background = "rgba(108,99,255,0.05)";
    e.target.style.boxShadow = "0 0 0 3px rgba(108,99,255,0.08)";
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = "rgba(255,255,255,0.08)";
    e.target.style.background = "rgba(255,255,255,0.03)";
    e.target.style.boxShadow = "none";
  };

  return (
    <section
      id="contact"
      className="relative w-full"
      style={{ background: "#0A0A0F", paddingTop: "100px", paddingBottom: "100px", overflow: "hidden" }}
    >
      {/* Blobs */}
      <div style={{ position: "absolute", top: "20%", left: 0, width: "40%", height: "60%", background: "rgba(108,99,255,0.07)", filter: "blur(120px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: "10%", right: 0, width: "35%", height: "50%", background: "rgba(0,212,255,0.05)", filter: "blur(100px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
        {/* Section header — exactly like reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: 60 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
            <span style={{ width: 32, height: 3, borderRadius: 2, background: "linear-gradient(90deg,#6C63FF,#00D4FF)", display: "inline-block" }} />
            <span style={{ fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: "#6C63FF", letterSpacing: "0.15em", textTransform: "uppercase" }}>Get in touch</span>
          </div>
          <h2 style={{ fontSize: "clamp(40px,6vw,64px)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "#e4e1e9", marginBottom: 16 }}>
            Let&apos;s <span style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Connect</span>
          </h2>
          <p style={{ fontSize: 16, color: "#918fa1", lineHeight: 1.7, maxWidth: 500 }}>
            Open to exciting new opportunities and collaborations.<br />
            Let&apos;s build something amazing together!
          </p>
        </motion.div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.35fr", gap: 24, alignItems: "start" }}>

          {/* LEFT: Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{ display: "flex", flexDirection: "column", gap: 12 }}
          >
            {/* Available badge */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 20px", borderRadius: 16, background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)" }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 8px rgba(34,197,94,0.7)", animation: "pulse 2s infinite" }} />
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#e4e1e9" }}>Available for Projects</p>
                <p style={{ fontSize: 13, color: "#4ade80", marginTop: 2 }}>Open to exciting new opportunities</p>
              </div>
            </div>

            <InfoCard icon={<Mail size={16} />} label="Email" value={personalInfo.email} href={`mailto:${personalInfo.email}`} />
            <InfoCard icon={<LinkedinIcon size={16} />} label="LinkedIn" value="linkedin.com/in/chennuboyina-durga-praveen" href={personalInfo.linkedin} />
            <InfoCard icon={<InstagramIcon size={16} />} label="Instagram" value="instagram.com/irisarc.studio" href={personalInfo.instagram} />
            <InfoCard icon={<MapPin size={16} />} label="Location" value={personalInfo.location} />
          </motion.div>

          {/* RIGHT: Form — glass card matching reference */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            style={{
              borderRadius: 20,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(108,99,255,0.15)",
              padding: "40px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 60px rgba(108,99,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#e4e1e9", marginBottom: 32 }}>Send Message</h3>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input type="text" name="name" required style={inputStyle} placeholder="John Doe"
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input type="email" name="email" required style={inputStyle} placeholder="john@example.com"
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label style={labelStyle}>Phone Number (optional)</label>
                  <input type="tel" name="phone" style={inputStyle} placeholder="+1 (555) 000-0000"
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Subject *</label>
                  <div style={{ position: "relative" }}>
                    <select name="subject" required defaultValue="Project Inquiry"
                      style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                      onFocus={focusStyle} onBlur={blurStyle}>
                      <option value="Project Inquiry">Project Inquiry</option>
                      <option value="Freelance Work">Freelance Work</option>
                      <option value="Collaboration">Collaboration</option>
                      <option value="Just Saying Hi">Just Saying Hi</option>
                    </select>
                    <div style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#6C63FF" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 9 6 6 6-6" /></svg>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label style={labelStyle}>Message *</label>
                <textarea name="message" required rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                  placeholder="Tell me about your project, timing, and requirements..."
                  onFocus={focusStyle} onBlur={blurStyle} />
              </div>

              {/* Captcha — matching reference screenshot exactly */}
              <div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                  <label style={{ ...labelStyle, marginBottom: 0 }}>Spam Protection: Solve this equation *</label>
                  <button type="button" onClick={refreshCaptcha}
                    style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#6C63FF", cursor: "pointer", background: "none", border: "none", letterSpacing: "0.1em" }}>
                    <RefreshCw size={11} /> Refresh
                  </button>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 12, background: "rgba(108,99,255,0.08)", border: "1px solid rgba(108,99,255,0.2)", fontFamily: "'JetBrains Mono', monospace", fontSize: 18, fontWeight: 700, color: "#a2e7ff", whiteSpace: "nowrap", minWidth: 140, justifyContent: "center" }}>
                    <span>{captcha.num1}</span>
                    <span style={{ color: "#6C63FF" }}>+</span>
                    <span>{captcha.num2}</span>
                    <span style={{ color: "#6C63FF" }}>=</span>
                    <span style={{ color: "#918fa1" }}>?</span>
                  </div>
                  <input type="number" value={captcha.answer}
                    onChange={(e) => setCaptcha({ ...captcha, answer: e.target.value })}
                    required style={{ ...inputStyle, flex: 1 }} placeholder="Your answer"
                    onFocus={focusStyle} onBlur={blurStyle} />
                </div>
              </div>

              {/* Submit button — exactly like reference: wide gradient pill */}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 12,
                  background: "linear-gradient(135deg, #6C63FF 0%, #00D4FF 100%)",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  border: "none",
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 10,
                  opacity: status === "sending" ? 0.7 : 1,
                  transition: "all 0.3s ease",
                  boxShadow: "0 0 30px rgba(108,99,255,0.35)",
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.9"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(108,99,255,0.55)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(108,99,255,0.35)"; }}
              >
                {status === "idle" && <><span>SEND MESSAGE</span><span style={{ fontSize: 18 }}>→</span></>}
                {status === "sending" && <><RefreshCw size={16} className="animate-spin" /> SENDING...</>}
                {status === "sent" && "✓ MESSAGE SENT SUCCESSFULLY!"}
                {status === "error" && "✕ ERROR — PLEASE TRY AGAIN"}
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #contact > div > div:last-child { grid-template-columns: 1fr !important; }
        }
        @keyframes pulse { 0%, 100% { opacity: 1; transform: scale(1); } 50% { opacity: 0.6; transform: scale(0.85); } }
      `}</style>
    </section>
  );
}
