"use client";

import { techStack } from "@/data/portfolio";
import { motion } from "framer-motion";

// Colorful icon backgrounds for each tech — vibrant brand-accurate colors
const techColors: Record<string, { bg: string; glow: string }> = {
  "React":      { bg: "rgba(97,218,251,0.15)",   glow: "0 0 20px rgba(97,218,251,0.4)" },
  "Next.js":    { bg: "rgba(255,255,255,0.1)",    glow: "0 0 20px rgba(255,255,255,0.3)" },
  "TypeScript": { bg: "rgba(49,120,198,0.2)",     glow: "0 0 20px rgba(49,120,198,0.5)" },
  "Node.js":    { bg: "rgba(104,160,99,0.2)",     glow: "0 0 20px rgba(104,160,99,0.5)" },
  "Python":     { bg: "rgba(255,212,59,0.15)",    glow: "0 0 20px rgba(255,212,59,0.4)" },
  "MongoDB":    { bg: "rgba(71,162,72,0.2)",      glow: "0 0 20px rgba(71,162,72,0.5)" },
  "Supabase":   { bg: "rgba(62,207,142,0.15)",    glow: "0 0 20px rgba(62,207,142,0.4)" },
  "MQTT":       { bg: "rgba(108,99,255,0.2)",     glow: "0 0 20px rgba(108,99,255,0.5)" },
  "Docker":     { bg: "rgba(0,150,215,0.2)",      glow: "0 0 20px rgba(0,150,215,0.5)" },
  "Git":        { bg: "rgba(240,80,50,0.2)",      glow: "0 0 20px rgba(240,80,50,0.4)" },
  "ESP32":      { bg: "rgba(255,100,0,0.15)",     glow: "0 0 20px rgba(255,100,0,0.4)" },
  "MediaPipe":  { bg: "rgba(255,170,0,0.15)",     glow: "0 0 20px rgba(255,170,0,0.4)" },
};

export default function Skills() {
  return (
    <section id="skills" className="w-full py-40 md:py-56 bg-black overflow-hidden relative">

      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-transparent blur-[150px] rounded-full pointer-events-none" />

      <div className="flex flex-col gap-20 max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="flex flex-col gap-5 items-center text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] text-zinc-500 uppercase">Expertise</h2>
          <p className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-[1.1]">
            Tools of the{" "}
            <span className="text-zinc-600 italic font-light">trade.</span>
          </p>
          <p className="text-zinc-500 text-lg font-light max-w-xl">
            The technologies I use every day to build exceptional products.
          </p>
        </motion.div>

        {/* Colorful Skills Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-8 md:gap-10">
          {techStack.map((tech, i) => {
            const colors = techColors[tech.name] || { bg: "rgba(255,255,255,0.08)", glow: "0 0 15px rgba(255,255,255,0.2)" };
            return (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -8, scale: 1.08 }}
                className="group flex flex-col items-center justify-center gap-4 cursor-default"
              >
                {/* Icon bubble — colorful */}
                <motion.div
                  className="w-16 h-16 md:w-18 md:h-18 rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all duration-500"
                  style={{ background: colors.bg }}
                  whileHover={{ boxShadow: colors.glow }}
                >
                  {tech.icon}
                </motion.div>

                {/* Name */}
                <span className="text-[11px] font-mono font-semibold tracking-wider text-zinc-500 group-hover:text-zinc-200 transition-colors duration-400 text-center leading-tight">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
