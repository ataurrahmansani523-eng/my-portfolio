import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "motion/react";
import { Download, Briefcase, Check, Sparkles, X } from "lucide-react";
import { playSoftClick } from "../utils/audio";
import Magnetic from "./Magnetic";
import MaskedHeading from "./ui/MaskedHeading";
import { SparkBadge } from "./ui/spark-badge";

interface HeroSectionProps {
  onScrollToExplore: () => void;
}

const ROLES = [
  {
    category: "SOFTWARE ENGINEERING",
    line1: "WEB",
    line2: "DEVELOPER",
    accentWord: "DEVELOPER",
    tag: "Full-Stack & Scalable Systems",
    accentColor: "#2563EB"
  },
  {
    category: "CREATIVE NARRATIVE",
    line1: "SCRIPT",
    line2: "WRITER",
    accentWord: "WRITER",
    tag: "High-Retention Storytelling",
    accentColor: "#38BDF8"
  },
  {
    category: "CONTENT CREATOR",
    line1: "YOUTUBE",
    line2: "CREATOR",
    accentWord: "CREATOR",
    tag: "Viral Production & Strategy",
    accentColor: "#F43F5E"
  },
  {
    category: "DIGITAL ARCHITECTURE",
    line1: "UI / UX",
    line2: "DESIGNER",
    accentWord: "DESIGNER",
    tag: "Cinematic Modern Interfaces",
    accentColor: "#60A5FA"
  }
];

export default function HeroSection({ onScrollToExplore }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const ambientY1 = useTransform(scrollYProgress, [0, 1], [-40, 60]);
  const ambientY2 = useTransform(scrollYProgress, [0, 1], [30, -50]);
  const ambientY3 = useTransform(scrollYProgress, [0, 1], [-20, 40]);

  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  const activeRole = ROLES[currentRoleIndex];

  const handleDownloadResume = () => {
    playSoftClick();
    setDownloadSuccess(true);

    // Generate and trigger download of Ataur Rahman Sani's complete professional resume document
    const resumeContent = `================================================================================
ATAUR RAHMAN SANI
YouTuber • Script Writer • Full-Stack Developer • UI/UX Designer
CEO of Sani Studio
================================================================================

Contact: ataurrahmansani523@gmail.com
Location: Dhaka, Bangladesh / Global Remote
Portfolio: https://sani-studio.vercel.app

--------------------------------------------------------------------------------
EXECUTIVE SUMMARY
--------------------------------------------------------------------------------
Passionate Software Engineer, AI Creator, and Digital Architect blending structured 
engineering with visual storytelling to build immersive, high-performance web experiences. 
Specializing in React, TypeScript, Tailwind CSS, Next.js, Node.js, AI/ML integration, 
and minimalist UI/UX design.

--------------------------------------------------------------------------------
CORE COMPETENCIES & TECHNICAL SKILLS
--------------------------------------------------------------------------------
• Frontend Architecture: React 19, TypeScript, Next.js, Tailwind CSS, Motion/GSAP
• Backend & Systems: Node.js, Express, RESTful APIs, PostgreSQL, Firebase/Firestore
• Creative & Design: Minimalist UI/UX, Design Systems, Figma, Visual Storytelling
• AI & Machine Learning: Prompt Engineering, Google GenAI SDK, Vector Search, LLMs
• Performance & SEO: Technical SEO Domination, Web Vitals, SSR/SSG, Optimization

--------------------------------------------------------------------------------
EXPERIENCE & LEADERSHIP
--------------------------------------------------------------------------------
1. CEO & Founder — Sani Studio (2023 - Present)
   - Architected bespoke digital products, brand identities, and high-impact web apps.
   - Built custom cinematic design systems delivering top-tier conversion & engagement.

2. Lead Full-Stack & UI/UX Developer (2021 - Present)
   - Developed ultra-fast web platforms with sub-second load times and fluid 60fps animations.
   - Implemented enterprise-grade SEO strategies ranking top keywords on search engines.

--------------------------------------------------------------------------------
EDUCATION & CERTIFICATIONS
--------------------------------------------------------------------------------
• B.Sc. in Computer Science & Engineering
• Certified Advanced Frontend Architecture & Modern UI/UX Engineering
================================================================================`;

    const blob = new Blob([resumeContent], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Ataur_Rahman_Sani_Resume.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadSuccess(false);
    }, 4000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#07080c] overflow-hidden select-none"
    >
      {/* ================= BACKGROUND ENVIRONMENT ================= */}
      {/* Deep cinematic vignette & studio background lights with subtle parallax depth */}
      <div className="absolute inset-0 bg-[#06070a] z-0" />
      <motion.div
        style={{ y: ambientY1 }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[550px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        style={{ y: ambientY2 }}
        className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#C8A24A]/5 rounded-full blur-[140px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        style={{ y: ambientY3 }}
        className="absolute top-1/3 right-1/4 w-[450px] h-[450px] bg-blue-500/5 rounded-full blur-[150px] pointer-events-none mix-blend-screen"
      />

      {/* Giant Stylized PORTFOLIO Watermark Typography */}
      <div
        aria-hidden="true"
        className="absolute top-[32%] sm:top-[34%] lg:top-[36%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1] w-full text-center pointer-events-none select-none overflow-hidden"
      >
        <span className="font-sans font-black text-[15vw] md:text-[18vw] lg:text-[19vw] leading-none tracking-tighter text-white/[0.045] uppercase block whitespace-nowrap">
          PORTFOLIO
        </span>
      </div>

      {/* Subtle fine dotted background texture */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60 z-0" />

      {/* ================= MAIN CONTENT LAYER ================= */}
      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 pt-28 sm:pt-32 pb-8 flex-1 flex flex-col lg:grid lg:grid-cols-12 items-center justify-center relative z-10 gap-8 lg:gap-2">
        
        {/* LEFT COLUMN: Name, Bio & Action Buttons */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex flex-col justify-center items-start text-left z-20 w-full"
        >
          {/* Greeting */}
          <span className="text-lg sm:text-xl md:text-2xl font-sans font-bold text-white tracking-tight block mb-2 opacity-90">
            Hi I'm
          </span>

          {/* Dynamic Masked Heading for Name */}
          <div className="w-full max-w-lg mb-2">
            <MaskedHeading
              text="Ataur Rahman Sani"
              tag="h1"
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80"
              fillScale={1.35}
              parallax={32}
              drift={18}
              brightness={1.25}
              saturation={1.35}
              reveal="rise"
              trigger="view"
              align="left"
              weight={900}
              tracking={-0.03}
              lineHeight={0.94}
              textScale={0.145}
              className="font-sans font-black uppercase tracking-tight drop-shadow-[0_4px_30px_rgba(37,99,235,0.45)]"
            />
          </div>

          {/* Holographic Spark Credential Badge */}
          <div className="w-full max-w-[360px] sm:max-w-[400px] h-[210px] sm:h-[230px] my-2 relative">
            <SparkBadge />
          </div>

          {/* Bio / Value proposition */}
          <p className="text-xs sm:text-sm md:text-[15px] text-zinc-400 font-sans font-light leading-relaxed max-w-sm sm:max-w-md my-6 sm:my-8 select-text">
            I blend structured engineering with visual storytelling to build immersive, responsive web experiences. Specializing in AI/ML integration and minimalist UI/UX design.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 select-none">
            <Magnetic range={25} strength={0.2}>
              <button
                id="hero-download-resume-btn"
                onClick={handleDownloadResume}
                className="relative overflow-hidden group px-5 sm:px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] backdrop-blur-3xl border border-white/25 hover:border-blue-400/80 text-white flex items-center gap-2.5 transition-all duration-300 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.4),inset_0_-1px_1px_0_rgba(0,0,0,0.3),0_10px_32px_-4px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.6),0_0_30px_rgba(37,99,235,0.45)] cursor-pointer"
              >
                {/* Top specular glass reflection edge */}
                <span className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                {/* Bottom glass reflection edge */}
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Subtle glass reflection overlay */}
                <span className="absolute inset-0 bg-gradient-to-tr from-white/[0.08] via-transparent to-white/[0.03] opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 animate-bounce relative z-10" />
                    <span className="text-emerald-300 font-bold uppercase tracking-[0.14em] text-[11px] sm:text-xs relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                      Resume Downloaded!
                    </span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-zinc-300 group-hover:text-[#38BDF8] group-hover:-translate-y-0.5 transition-all relative z-10" />
                    <span className="relative z-10 font-bold uppercase tracking-[0.14em] text-[11px] sm:text-xs text-white group-hover:text-cyan-100 transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      Download Resume
                    </span>
                  </>
                )}
              </button>
            </Magnetic>

            <Magnetic range={25} strength={0.2}>
              <button
                id="hero-view-projects-btn"
                onClick={() => {
                  playSoftClick();
                  onScrollToExplore();
                }}
                className="relative overflow-hidden group px-5 sm:px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.13] backdrop-blur-3xl border border-white/20 hover:border-white/50 text-white flex items-center gap-2.5 transition-all duration-300 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.35),inset_0_-1px_1px_0_rgba(0,0,0,0.3),0_10px_32px_-4px_rgba(0,0,0,0.7)] hover:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.5),0_0_28px_rgba(255,255,255,0.2)] cursor-pointer"
              >
                {/* Top specular glass reflection edge */}
                <span className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/45 to-transparent pointer-events-none" />
                {/* Bottom glass reflection edge */}
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Subtle glass reflection overlay */}
                <span className="absolute inset-0 bg-gradient-to-tr from-white/[0.06] via-transparent to-white/[0.02] opacity-60 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <Briefcase className="w-4 h-4 text-zinc-300 group-hover:text-white transition-colors relative z-10" />
                <span className="relative z-10 font-bold uppercase tracking-[0.14em] text-[11px] sm:text-xs text-zinc-100 group-hover:text-white transition-colors drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                  View Projects
                </span>
              </button>
            </Magnetic>
          </div>

          {/* Social Presence Glass Screen Badges (GitHub, Instagram, Discord, X) */}
          <div className="mt-5 sm:mt-6 flex flex-wrap items-center gap-2.5 sm:gap-3 select-none">
            {/* GitHub Glass Screen */}
            <Magnetic range={20} strength={0.25}>
              <a
                id="hero-social-github"
                href="https://github.com/ataurrahmansani523"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSoftClick()}
                aria-label="GitHub Profile"
                className="relative overflow-hidden group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-3xl border border-white/20 hover:border-white/60 text-zinc-200 hover:text-white transition-all duration-300 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.65),0_0_24px_rgba(255,255,255,0.25)] cursor-pointer"
              >
                {/* Glass top reflection line */}
                <span className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                {/* Glass bottom reflection line */}
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Glass sheen overlay */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.02] opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />
                
                <svg className="w-3.5 h-3.5 fill-current text-zinc-200 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span className="tracking-[0.16em] uppercase text-[10.5px] sm:text-[11px] relative z-10 font-bold text-zinc-200 group-hover:text-white transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  GitHub
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-500/60 group-hover:bg-white group-hover:shadow-[0_0_8px_#ffffff] transition-all relative z-10" />
              </a>
            </Magnetic>

            {/* Instagram Glass Screen */}
            <Magnetic range={20} strength={0.25}>
              <a
                id="hero-social-instagram"
                href="https://www.instagram.com/ataurrahmansani523/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSoftClick()}
                aria-label="Instagram Profile"
                className="relative overflow-hidden group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-3xl border border-white/20 hover:border-pink-400/80 text-zinc-200 hover:text-white transition-all duration-300 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.65),0_0_24px_rgba(236,72,153,0.35)] cursor-pointer"
              >
                {/* Glass top reflection line */}
                <span className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                {/* Glass bottom reflection line */}
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Glass sheen overlay */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.02] opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <svg className="w-3.5 h-3.5 stroke-current text-zinc-200 group-hover:text-pink-400 group-hover:scale-110 transition-all duration-300 relative z-10" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="tracking-[0.16em] uppercase text-[10.5px] sm:text-[11px] relative z-10 font-bold text-zinc-200 group-hover:text-pink-100 transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Instagram
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500/60 group-hover:bg-pink-400 group-hover:shadow-[0_0_8px_#f43f5e] transition-all relative z-10" />
              </a>
            </Magnetic>

            {/* Discord Glass Screen */}
            <Magnetic range={20} strength={0.25}>
              <a
                id="hero-social-discord"
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSoftClick()}
                aria-label="Discord Server"
                className="relative overflow-hidden group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-3xl border border-white/20 hover:border-indigo-400/80 text-zinc-200 hover:text-white transition-all duration-300 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.65),0_0_24px_rgba(99,102,241,0.35)] cursor-pointer"
              >
                {/* Glass top reflection line */}
                <span className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                {/* Glass bottom reflection line */}
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Glass sheen overlay */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.02] opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <svg className="w-3.5 h-3.5 fill-current text-zinc-200 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300 relative z-10" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.929 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.893.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <span className="tracking-[0.16em] uppercase text-[10.5px] sm:text-[11px] relative z-10 font-bold text-zinc-200 group-hover:text-indigo-100 transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Discord
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/60 group-hover:bg-indigo-400 group-hover:shadow-[0_0_8px_#6366f1] transition-all relative z-10" />
              </a>
            </Magnetic>

            {/* X (Twitter) Glass Screen */}
            <Magnetic range={20} strength={0.25}>
              <a
                id="hero-social-x"
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSoftClick()}
                aria-label="X Profile"
                className="relative overflow-hidden group flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-white/[0.08] hover:bg-white/[0.16] backdrop-blur-3xl border border-white/20 hover:border-sky-300/80 text-zinc-200 hover:text-white transition-all duration-300 shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.35),0_8px_24px_-4px_rgba(0,0,0,0.6)] hover:shadow-[inset_0_1px_3px_0_rgba(255,255,255,0.65),0_0_24px_rgba(56,189,248,0.3)] cursor-pointer"
              >
                {/* Glass top reflection line */}
                <span className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
                {/* Glass bottom reflection line */}
                <span className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
                {/* Glass sheen overlay */}
                <span className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-white/[0.02] opacity-80 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <svg className="w-3.5 h-3.5 fill-current text-zinc-200 group-hover:text-white group-hover:scale-110 transition-all duration-300 relative z-10" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                <span className="tracking-[0.16em] uppercase text-[10.5px] sm:text-[11px] relative z-10 font-bold text-zinc-200 group-hover:text-sky-100 transition-colors duration-300 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  X
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400/60 group-hover:bg-sky-300 group-hover:shadow-[0_0_8px_#38bdf8] transition-all relative z-10" />
              </a>
            </Magnetic>
          </div>
        </motion.div>

        {/* CENTER COLUMN: Developer Portrait with Vignette Blend */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-4 flex items-end justify-center relative z-10 w-full my-4 lg:my-0 px-2"
        >
          <div className="relative w-full max-w-[270px] sm:max-w-[310px] md:max-w-[340px] lg:max-w-[360px] xl:max-w-[380px] flex items-end justify-center">
            {/* Soft Ambient Rim Light Glow Behind Head & Shoulders */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[85%] h-[80%] bg-[#2563EB]/15 rounded-full blur-3xl -z-10" />
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-48 h-48 bg-white/5 rounded-full blur-2xl -z-10" />

            {/* High-fidelity Portrait Asset with Seamless Gradient Bottom Fade */}
            <div className="relative w-full overflow-hidden rounded-2xl">
              <img
                src="https://i.imgur.com/y14eU2k.jpeg"
                alt="Ataur Rahman Sani - YouTuber, Script Writer & Creative Director"
                className="w-full h-auto max-h-[440px] sm:max-h-[500px] lg:max-h-[520px] object-cover object-top rounded-2xl [mask-image:linear-gradient(to_bottom,black_78%,transparent_100%)] drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] contrast-[1.06] brightness-95"
              />
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Profession Subhead & Giant Dynamic Changing Headline */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-3 flex flex-col justify-center items-start lg:items-end text-left lg:text-right z-20 w-full min-h-[160px] sm:min-h-[180px] lg:min-h-[200px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start lg:items-end w-full"
            >
              {/* Eyebrow Category Label */}
              <span
                style={{ color: activeRole.accentColor }}
                className="text-xs sm:text-sm md:text-base font-sans font-black tracking-[0.2em] uppercase mb-1.5 md:mb-2 block transition-colors duration-300"
              >
                {activeRole.category}
              </span>

              {/* Dynamic Stacked Profession Headline */}
              <div className="text-3xl sm:text-4xl md:text-5xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-sans font-black uppercase leading-[0.92] tracking-tight text-left lg:text-right">
                <span className="block text-white">{activeRole.line1}</span>
                <span
                  style={{ color: activeRole.accentColor }}
                  className="block transition-colors duration-300 drop-shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  {activeRole.line2}
                </span>
              </div>

              {/* Sub-tag description */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400">
                  {activeRole.tag}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Role Index Dots / Interactive Indicator */}
          <div className="mt-4 flex items-center gap-1.5">
            {ROLES.map((_, idx) => (
              <button
                key={idx}
                id={`role-dot-${idx}`}
                onClick={() => {
                  playSoftClick();
                  setCurrentRoleIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentRoleIndex
                    ? "w-6 bg-[#2563EB]"
                    : "w-2 bg-zinc-700 hover:bg-zinc-500"
                }`}
                aria-label={`Switch to role ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= BOTTOM SCROLL DOWN MOUSE INDICATOR ================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        onClick={() => {
          playSoftClick();
          onScrollToExplore();
        }}
        className="relative z-20 flex flex-col items-center gap-2 cursor-pointer pb-6 sm:pb-8 group hover:opacity-85 transition-opacity select-none"
      >
        {/* Mouse outline */}
        <div className="relative overflow-hidden w-5 h-8 rounded-full border border-white/20 group-hover:border-blue-400/80 bg-white/[0.04] backdrop-blur-md flex justify-center pt-1.5 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.25),0_0_14px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_18px_rgba(37,99,235,0.3)] transition-all">
          <motion.div
            animate={{ y: [0, 8, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-1.5 bg-white group-hover:bg-[#38BDF8] rounded-full transition-colors"
          />
        </div>
        <span className="text-[9px] font-mono tracking-[0.35em] text-zinc-400 group-hover:text-zinc-200 font-bold uppercase transition-colors">
          SCROLL DOWN
        </span>
      </motion.div>
    </section>
  );
}

