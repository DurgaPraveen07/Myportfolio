import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import CursorGlow from "@/components/CursorGlow";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Durga Praveen | Full Stack Developer & IoT Enthusiast",
  description:
    "Portfolio of Durga Praveen — Full Stack Developer specializing in React, Next.js, Node.js, IoT systems, and AI-powered applications. BTech student at DIET, Andhra Pradesh.",
  keywords: [
    "Durga Praveen",
    "Full Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "IoT",
    "Portfolio",
    "Node.js",
    "Python",
  ],
  authors: [{ name: "Durga Praveen" }],
  openGraph: {
    title: "Durga Praveen | Full Stack Developer",
    description:
      "Building scalable web apps, IoT platforms, and AI-powered tools.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className="bg-[#0A0A0F] text-[#e4e1e9] font-sans antialiased overflow-x-hidden selection:bg-[#6C63FF]/40 selection:text-white">
        <Loader />
        <CustomCursor />
        <CursorGlow />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
