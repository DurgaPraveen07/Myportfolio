"use client";

import { experience } from "@/data/portfolio";
import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section id="experience" className="w-full py-48 md:py-64 bg-black">
      <div className="flex flex-col gap-24 md:gap-32 max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="flex flex-col gap-6 items-center text-center max-w-3xl mx-auto"
        >
          <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase">Experience</h2>
          <p className="text-5xl md:text-7xl font-semibold tracking-tighter text-white leading-tight">
            The path of <span className="text-zinc-600 italic font-light">progression.</span>
          </p>
        </motion.div>

        {/* Minimalist Timeline */}
        <div className="flex flex-col w-full relative">
          
          {/* Subtle Center Line for Desktop */}
          <div className="hidden md:block absolute left-[30%] top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {experience.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex flex-col md:flex-row md:items-start gap-8 md:gap-16 pb-24 last:pb-0 group"
            >
              
              {/* Left Column: Period & Company */}
              <div className="md:w-[30%] flex flex-col gap-2 md:text-right md:pr-8 md:pt-1 z-10">
                <span className="text-sm font-mono text-zinc-500 tracking-wider uppercase">{exp.period}</span>
                <h4 className="text-xl font-semibold text-white tracking-tight group-hover:text-zinc-300 transition-colors duration-500">{exp.company}</h4>
              </div>

              {/* Right Column: Role & Details */}
              <div className="md:w-[70%] flex flex-col gap-6 z-10 md:pl-8 relative">
                {/* Timeline Node */}
                <div className="hidden md:block absolute left-0 top-3 w-1.5 h-1.5 -translate-x-1/2 rounded-full bg-zinc-800 border border-zinc-600 group-hover:bg-white transition-colors duration-500 shadow-[0_0_10px_rgba(255,255,255,0)] group-hover:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                
                <h3 className="text-3xl md:text-4xl font-semibold text-zinc-200 tracking-tight">{exp.title}</h3>
                <p className="text-zinc-400 font-light leading-relaxed text-lg max-w-2xl">
                  {exp.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {exp.tech.map((t) => (
                    <span key={t} className="px-4 py-2 rounded-full bg-white/[0.02] border border-white/5 text-xs font-medium text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
