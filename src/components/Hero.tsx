"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let i = 0;
    let timer: NodeJS.Timeout;

    const startTyping = () => {
      timer = setInterval(() => {
        setDisplayedText(text.substring(0, i));
        i++;
        if (i > text.length) {
          clearInterval(timer);
        }
      }, 50); // Typing speed
    };

    const startDelay = setTimeout(startTyping, delay);

    // Cursor blink
    const cursorTimer = setInterval(() => setShowCursor((prev) => !prev), 500);

    return () => {
      clearTimeout(startDelay);
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, [text, delay]);

  return (
    <span className="text-[#a5a2b8] text-[15px] md:text-[17px] font-mono tracking-wide">
      {displayedText}
      <span style={{ opacity: showCursor ? 1 : 0, color: "#6C63FF", marginLeft: 2 }}>|</span>
    </span>
  );
}

const floatingBadges = [
  { label: "React",     top: "20%",  left: "-15%", delay: 0 },
  { label: "Node.js",   top: "40%",  right: "-20%", delay: 0.5 },
  { label: "MQTT/IoT",  bottom: "15%", right: "-10%", delay: 1.5 },
  { label: "Python",    bottom: "15%", left: "-10%", delay: 1 },
];

export default function Hero() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show:   { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen w-full bg-[#0A0A0F] overflow-hidden flex items-center justify-center pt-24 pb-16"
    >
      {/* Subtle Grid Background (Matches reference image) */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ 
          backgroundImage: "linear-gradient(to right, #ffffff08 1px, transparent 1px), linear-gradient(to bottom, #ffffff08 1px, transparent 1px)",
          backgroundSize: "60px 60px"
        }} 
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-[1280px] mx-auto px-6 lg:px-12 flex flex-col gap-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center">

          {/* ── LEFT: Typography & Buttons ── */}
          <div className="flex flex-col gap-6 lg:gap-8 text-center lg:text-left items-center lg:items-start order-2 lg:order-1">

            {/* Status badge */}
            <motion.div variants={item}>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-[13px] font-mono text-[#c4c0ff] tracking-wider">Open to Opportunities</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} className="flex flex-col gap-1">
              <h2 className="text-5xl md:text-7xl lg:text-[80px] font-black tracking-tight text-white m-0 leading-none">
                Hi, I'm
              </h2>
              <h1 className="text-6xl md:text-8xl lg:text-[96px] font-black tracking-tighter m-0 leading-[1.05]">
                <span className="text-[#3B82F6] block">Durga</span>
                <span className="text-[#00D4FF] block">Praveen</span>
              </h1>
            </motion.div>

            {/* Subtitle */}
            <motion.div variants={item} className="flex flex-col gap-4">
              <p className="text-lg md:text-[22px] text-[#00D4FF] font-mono tracking-wide">
                Full Stack Developer &amp; IoT Enthusiast
              </p>
              
              {/* Typewriter Effect */}
              <Typewriter 
                text="I build scalable web applications and real-time IoT ecosystems." 
                delay={1000} 
              />
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={item} className="flex flex-wrap justify-center lg:justify-start gap-4 mt-2">
              <a href="#projects"
                className="flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-bold text-[15px] transition-all hover:scale-105"
                style={{ background: "linear-gradient(90deg, #3B82F6, #00D4FF)", boxShadow: "0 10px 30px -10px rgba(0,212,255,0.5)" }}>
                View My Work <span>→</span>
              </a>
              <a href="/Durga_Praveen_Resume.pdf" download
                className="flex items-center gap-2 px-8 py-3.5 rounded-full border border-white/10 bg-transparent text-[#e4e1e9] font-medium text-[15px] hover:bg-white/5 transition-all">
                <span>↓</span> Download CV
              </a>
            </motion.div>
          </div>

          {/* ── RIGHT: Circular profile photo with orbiting tech ── */}
          <motion.div
            variants={item}
            className="flex justify-center items-center order-1 lg:order-2 w-full mt-10 lg:mt-0"
          >
            <div className="relative w-[280px] h-[280px] md:w-[380px] md:h-[380px] lg:w-[440px] lg:h-[440px] flex-shrink-0">
              
              {/* Spinning gradient glowing border */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-[-4px] rounded-full"
                style={{ background: "linear-gradient(135deg, #3B82F6, #00D4FF, #0A0A0F, #0A0A0F)" }}
              />
              
              {/* Inner dark circle to hide gradient core */}
              <div className="absolute inset-[3px] rounded-full bg-[#0A0A0F] z-[1]" />
              
              {/* Photo Mask */}
              <div className="absolute inset-[6px] rounded-full overflow-hidden z-[2]">
                <Image
                  src="/profile.jpg"
                  alt="Durga Praveen"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Floating tech badges matching the image exactly */}
              {floatingBadges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                  className="absolute z-[3] px-5 py-2.5 rounded-full text-[13px] md:text-[14px] font-mono text-[#c4c0ff] whitespace-nowrap hidden sm:block"
                  style={{
                    top: badge.top,
                    bottom: (badge as any).bottom,
                    left: (badge as any).left,
                    right: (badge as any).right,
                    background: "rgba(25,25,35,0.8)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {badge.label}
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
