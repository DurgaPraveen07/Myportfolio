"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { personalInfo } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "./SocialIcons";
import Image from "next/image";

const floatingBadges = [
  { label: "React",     top: "8%",   left: "-30%", delay: 0 },
  { label: "Node.js",   top: "30%",  right: "-38%", delay: 0.5 },
  { label: "MQTT/IoT",  bottom: "22%", right: "-32%", delay: 1.5 },
  { label: "Python",    bottom: "8%", left: "-22%", delay: 1 },
];

const stats = [
  { value: "15+", label: "Projects Built" },
  { value: "2+",  label: "Years Experience" },
  { value: "10+", label: "Technologies" },
  { value: "5+",  label: "Happy Clients" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y      = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const filter  = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(20px)"]);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
    show:   { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-[130vh] w-full bg-[#0A0A0F] overflow-hidden"
    >
      <motion.div
        style={{ y, opacity, filter }}
        className="sticky top-0 h-screen w-full flex flex-col items-center justify-center"
      >
        {/* Background blobs */}
        <div className="absolute top-[-100px] left-[-150px] w-[500px] h-[500px] rounded-full pointer-events-none" style={{ background: "rgba(108,99,255,0.12)", filter: "blur(80px)" }} />
        <div className="absolute top-[200px] right-[-100px] w-[400px] h-[400px] rounded-full pointer-events-none" style={{ background: "rgba(0,212,255,0.08)", filter: "blur(80px)" }} />
        <div className="absolute bottom-[100px] left-[40%] w-[300px] h-[300px] rounded-full pointer-events-none" style={{ background: "rgba(255,107,107,0.06)", filter: "blur(80px)" }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col gap-10"
        >
          {/* Two-column: Text + Circular Photo */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* LEFT: Typography */}
            <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

              {/* Status badge */}
              <motion.div variants={item}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
                  style={{ background: "rgba(108,99,255,0.1)", border: "1px solid rgba(108,99,255,0.25)" }}>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-xs font-mono text-[#c4c0ff] tracking-widest">Open to Opportunities</span>
                </div>
              </motion.div>

              {/* Headline */}
              <motion.h1 variants={item} className="text-5xl md:text-7xl font-black leading-[1.05] tracking-tighter text-[#e4e1e9]">
                Hi, I'm<br />
                <span style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  Durga Praveen
                </span>
              </motion.h1>

              {/* Role */}
              <motion.p variants={item} className="text-lg md:text-xl text-[#a2e7ff] font-mono font-medium">
                Full Stack Developer &amp; IoT Enthusiast
              </motion.p>

              {/* Desc */}
              <motion.p variants={item} className="text-base text-[#918fa1] leading-relaxed max-w-md">
                I build seamless, high-performance digital experiences and real-time IoT systems. From smart home platforms to AI-powered tools — I design ecosystems that matter.
              </motion.p>

              {/* CTA buttons */}
              <motion.div variants={item} className="flex flex-wrap gap-4">
                <a href="#projects"
                  className="flex items-center gap-2 px-7 py-3.5 rounded-full text-white font-bold text-sm transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(108,99,255,0.5)] active:scale-95"
                  style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)", boxShadow: "0 0 20px rgba(108,99,255,0.3)" }}>
                  View My Work <span>→</span>
                </a>
                <a href="/Durga_Praveen_Resume.pdf" download
                  className="px-7 py-3.5 rounded-full border border-white/10 text-[#c7c4d8] font-medium text-sm hover:bg-white/5 hover:border-white/20 transition-all">
                  ⬇ Download CV
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={item} className="flex items-center gap-4">
                {[
                  { label: "GitHub", href: personalInfo.github, icon: GithubIcon },
                  { label: "LinkedIn", href: personalInfo.linkedin, icon: LinkedinIcon },
                  { label: "Instagram", href: personalInfo.instagram, icon: InstagramIcon },
                ].map((s, i) => (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-zinc-400 hover:text-white transition-all hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <s.icon size={18} />
                  </a>
                ))}
              </motion.div>
            </div>

            {/* RIGHT: Circular profile photo with spinning ring + floating badges */}
            <motion.div
              variants={item}
              className="flex justify-center items-center"
            >
              <div className="relative" style={{ width: 280, height: 280 }}>
                {/* Spinning gradient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-4px] rounded-full"
                  style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF, #6C63FF)" }}
                />
                {/* Spacer ring (black) */}
                <div className="absolute inset-[2px] rounded-full bg-[#0A0A0F] z-[1]" />
                {/* Photo */}
                <div className="absolute inset-[6px] rounded-full overflow-hidden z-[2] shadow-[0_0_60px_rgba(108,99,255,0.35)]">
                  <Image
                    src="/profile.jpg"
                    alt="Durga Praveen"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Floating tech badges */}
                {floatingBadges.map((badge, i) => (
                  <motion.div
                    key={badge.label}
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                    className="absolute z-[3] px-4 py-2 rounded-xl text-sm font-semibold text-white whitespace-nowrap"
                    style={{
                      top: badge.top,
                      bottom: (badge as any).bottom,
                      left: (badge as any).left,
                      right: (badge as any).right,
                      background: "rgba(10,10,20,0.85)",
                      border: "1px solid rgba(108,99,255,0.35)",
                      backdropFilter: "blur(16px)",
                      boxShadow: "0 4px 24px rgba(108,99,255,0.2)",
                      color: "#c4c0ff",
                    }}
                  >
                    {badge.label}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          <motion.div
            variants={item}
            className="grid grid-cols-2 md:grid-cols-4 gap-0 rounded-2xl overflow-hidden"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(20px)" }}
          >
            {stats.map((stat, i) => (
              <div key={stat.label}
                className="flex flex-col items-center justify-center py-5 px-4 text-center"
                style={{ borderRight: i < stats.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                <div className="text-3xl md:text-4xl font-black leading-none"
                  style={{ background: "linear-gradient(135deg, #6C63FF, #00D4FF)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                  {stat.value}
                </div>
                <div className="text-[#918fa1] text-xs mt-1.5 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Scroll hint */}
          <motion.div variants={item} className="flex justify-center">
            <a href="#about" className="flex flex-col items-center gap-2 text-[#918fa1] text-xs font-mono animate-bounce">
              <span>scroll down</span>
              <span className="text-lg">↓</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
