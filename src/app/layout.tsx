import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
