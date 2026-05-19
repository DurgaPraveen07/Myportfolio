export const personalInfo = {
  name: "Durga Praveen",
  title: "Full Stack Developer",
  subtitle: "IoT Enthusiast & Problem Solver",
  location: "Andhra Pradesh, India",
  email: "durgapraveenthekakarot@gmail.com",
  github: "https://github.com/DurgaPraveen07",
  linkedin: "https://www.linkedin.com/in/chennuboyina-durga-praveen/",
  instagram: "https://www.instagram.com/irisarc.studio/",
  bio: "I'm a passionate full-stack developer currently pursuing BTech at Dhanekula Institute of Engineering and Technology. I specialize in building high-performance web applications, real-time IoT platforms, and AI-powered tools. I don't just write scripts — I design digital ecosystems that empower users and businesses alike.",
  education: "Dhanekula Institute of Engineering & Technology",
  degree: "B.Tech in Computer Science & Engineering",
  year: "2024 – 2028",
  gpa: "8.8 / 10",
  taglines: [
    "I build scalable web apps",
    "I craft IoT solutions",
    "I create AI-powered tools",
    "I design stunning UIs",
  ],
  stats: [
    { value: "15+", label: "Projects Built" },
    { value: "2+", label: "Years Experience" },
    { value: "10+", label: "Technologies" },
    { value: "5+", label: "Happy Clients" },
  ],
};

export const skills = [
  {
    category: "Frontend",
    color: "#6C63FF",
    items: [
      { name: "React.js", level: 88 },
      { name: "Next.js", level: 82 },
      { name: "TypeScript", level: 78 },
      { name: "HTML5 / CSS3", level: 95 },
      { name: "JavaScript", level: 90 },
    ],
  },
  {
    category: "Backend",
    color: "#00D4FF",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 83 },
      { name: "Python", level: 80 },
      { name: "REST APIs", level: 88 },
      { name: "FastAPI", level: 70 },
    ],
  },
  {
    category: "Databases",
    color: "#FF6B6B",
    items: [
      { name: "MongoDB", level: 82 },
      { name: "PostgreSQL", level: 72 },
      { name: "Supabase", level: 78 },
      { name: "Firebase", level: 75 },
    ],
  },
  {
    category: "IoT & Embedded",
    color: "#22c55e",
    items: [
      { name: "MQTT Protocol", level: 80 },
      { name: "ESP32 / Arduino", level: 78 },
      { name: "Raspberry Pi", level: 70 },
      { name: "Sensor Integration", level: 75 },
    ],
  },
];

export const techStack = [
  { name: "React", icon: "⚛️" },
  { name: "Next.js", icon: "▲" },
  { name: "TypeScript", icon: "🔷" },
  { name: "Node.js", icon: "🟢" },
  { name: "Python", icon: "🐍" },
  { name: "MongoDB", icon: "🍃" },
  { name: "Supabase", icon: "⚡" },
  { name: "MQTT", icon: "📡" },
  { name: "Docker", icon: "🐳" },
  { name: "Git", icon: "🔀" },
  { name: "ESP32", icon: "🔌" },
  { name: "MediaPipe", icon: "👁️" },
];

export const projects = [
  {
    id: 1,
    title: "AutomateHome",
    subtitle: "Smart Home IoT Platform",
    description:
      "A production-grade smart home platform with real-time device control, MQTT communication layer, multi-relay firmware support, and a secure role-based admin dashboard.",
    tags: ["IoT", "Node.js", "MQTT", "React", "MongoDB"],
    category: "IoT",
    featured: true,
    gradient: "linear-gradient(135deg, #6C63FF, #00D4FF)",
    github: "https://github.com/DurgaPraveen07/skmart-home",
    demo: "#",
    icon: "🏠",
  },
  {
    id: 2,
    title: "GestureSlide",
    subtitle: "AI Gesture PPT Controller",
    description:
      "Hands-free PowerPoint controller using MediaPipe gesture recognition with index-finger next-slide and peace-sign previous-slide controls. Includes voice command support.",
    tags: ["Python", "MediaPipe", "OpenCV", "WebSockets"],
    category: "AI",
    featured: false,
    gradient: "linear-gradient(135deg, #FF6B6B, #FF8E53)",
    github: "https://github.com/DurgaPraveen07/handgesture_ppt_controller",
    demo: null,
    icon: "🤖",
  },
  {
    id: 3,
    title: "DevPortfolio",
    subtitle: "This Portfolio — Next.js + TypeScript",
    description:
      "This very portfolio — built with Next.js 15, TypeScript, and a custom Lumina Noir design system. Glassmorphism UI, smooth animations, and full Stitch-to-code workflow.",
    tags: ["Next.js", "TypeScript", "React", "CSS"],
    category: "Web",
    featured: false,
    gradient: "linear-gradient(135deg, #8B5CF6, #EC4899)",
    github: "https://github.com/DurgaPraveen07/Myportfolio.git",
    demo: "#",
    icon: "🎨",
  },
  {
    id: 4,
    title: "IoT SaaS Dashboard",
    subtitle: "Enterprise Device Management",
    description:
      "Multi-tenant IoT SaaS platform with role-based auth (admin/user), real-time WebSocket dashboards, secure device provisioning, and MQTT-based command routing.",
    tags: ["Next.js", "Supabase", "TypeScript", "MQTT"],
    category: "IoT",
    featured: true,
    gradient: "linear-gradient(135deg, #00D4FF, #22c55e)",
    github: "https://github.com/DurgaPraveen07/skmart-home",
    demo: null,
    icon: "📊",
  },
  {
    id: 5,
    title: "AI Study Guide",
    subtitle: "PDF Generation Tool",
    description:
      "Generates structured, professionally formatted study guides from curriculum text using AI. Exports detailed PDFs with section headers, examples, and pros/cons tables.",
    tags: ["Python", "LangChain", "ReportLab", "GPT-4"],
    category: "AI",
    featured: false,
    gradient: "linear-gradient(135deg, #F59E0B, #EF4444)",
    github: "https://github.com/DurgaPraveen07/Ragassignment",
    demo: null,
    icon: "📚",
  },
  {
    id: 6,
    title: "SecureAPI",
    subtitle: "Production Backend Toolkit",
    description:
      "Hardened Express.js backend boilerplate with Helmet security headers, rate limiting, JWT authentication, environment config management, and structured logging.",
    tags: ["Node.js", "Express", "JWT", "Helmet"],
    category: "Web",
    featured: false,
    gradient: "linear-gradient(135deg, #10B981, #3B82F6)",
    github: "https://github.com/DurgaPraveen07",
    demo: null,
    icon: "🔒",
  },
];

export const experience = [
  {
    type: "work",
    title: "Full Stack Developer",
    company: "Freelance / Open Source",
    period: "2024 – Present",
    description:
      "Building production-grade IoT platforms, web applications, and AI-powered tools for clients. Specializing in real-time systems and secure backend architecture.",
    tech: ["React", "Node.js", "MQTT", "Python", "Supabase"],
    current: true,
  },
  {
    type: "work",
    title: "IoT Systems Developer",
    company: "Personal Projects",
    period: "2023 – 2024",
    description:
      "Designed and implemented smart home automation systems with real-time dashboards, secure MQTT device communication, and multi-relay firmware for ESP32.",
    tech: ["ESP32", "MQTT", "MongoDB", "Express.js", "React"],
    current: false,
  },
  {
    type: "education",
    title: "B.Tech in Computer Science & Engineering",
    company: "Dhanekula Institute of Engineering & Technology",
    period: "2024 – 2028",
    description:
      "Specializing in software engineering, networks, and embedded systems. Active in coding clubs and IoT projects. Maintaining 8.8 GPA.",
    tech: ["DSA", "Networks", "OS", "DBMS", "Embedded Systems"],
    current: true,
  },
  {
    type: "education",
    title: "Higher Secondary Education (PCM + CS)",
    company: "Andhra Pradesh Board",
    period: "2022 – 2024",
    description:
      "Strong foundation in mathematics, physics, and computer science fundamentals. Developed first web projects during this period.",
    tech: ["C++", "HTML", "Python", "Mathematics"],
    current: false,
  },
];
