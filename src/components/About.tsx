"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const paragraph =
  "I'm a full-stack developer at Dhanekula Institute of Engineering and Technology, building high-performance web apps and hardware integrations. Passionate about clean code, real-time IoT dashboards, and AI-powered controllers.";

const Word = ({
  children,
  progress,
  range,
}: {
  children: string;
  progress: any;
  range: number[];
}) => {
  const opacity = useTransform(progress, range, [0.08, 1]);
  const filter = useTransform(progress, range, ["blur(4px)", "blur(0px)"]);
  return (
    <span className="relative inline-block mr-[0.25em] mt-[0.2em]">
      <motion.span style={{ opacity, filter }} className="text-white">
        {children}
      </motion.span>
    </span>
  );
};

export default function About() {
  const container = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.8", "end 0.5"],
  });

  const words = paragraph.split(" ");

  const competencies = [
    { title: "Web Architecture", desc: "Scalable, dynamic frontend systems." },
    { title: "IoT Systems", desc: "Hardware connected to real-time dashboards." },
    { title: "AI Integration", desc: "Machine learning for intelligent control." },
    { title: "UI / UX Design", desc: "Beautiful, frictionless interfaces." },
  ];

  return (
    <section
      id="about"
      ref={container}
      className="relative w-full py-40 md:py-56 bg-black"
    >
      <div className="max-w-6xl mx-auto px-6 flex flex-col gap-28">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2 }}
          className="flex flex-col gap-4 text-center"
        >
          <h2 className="text-sm font-semibold tracking-[0.3em] text-zinc-500 uppercase">
            The Architect
          </h2>
          <p className="text-4xl md:text-6xl font-semibold tracking-tighter text-white/40 leading-[1.2] max-w-3xl mx-auto">
            Merging technical precision with intuitive human experiences.
          </p>
        </motion.div>

        {/* Two-column: Photo + Text Reveal */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: Colorful Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -40, filter: "blur(20px)" }}
            whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative group flex justify-center"
          >
            {/* Glowing border */}
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-[2.5rem] overflow-hidden">
              <motion.div
                animate={{ opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-[2px] rounded-[2.5rem] bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 z-0"
              />
              <div className="absolute inset-[2px] rounded-[2.5rem] overflow-hidden z-10">
                <Image
                  src="/profile.jpg"
                  alt="Durga Praveen"
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Color overlay removed — full color photo */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>
              {/* Name label */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center z-20">
                <div className="px-6 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white font-medium text-sm">
                  Durga Praveen · Andhra Pradesh
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Apple scroll text reveal */}
          <div className="flex flex-col gap-12">
            <div className="text-2xl md:text-3xl font-medium leading-relaxed text-left">
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + 1 / words.length;
                return (
                  <Word key={i} progress={scrollYProgress} range={[start, end]}>
                    {word}
                  </Word>
                );
              })}
            </div>

            {/* Core Competencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, delay: 0.3 }}
              className="grid grid-cols-2 gap-6"
            >
              {competencies.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="flex flex-col gap-2 border-t border-white/[0.08] pt-4"
                >
                  <h4 className="text-white font-semibold text-base">{item.title}</h4>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
