import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, CheckCircle2, Sparkles, ExternalLink, X, Code2, Cpu, Video, Layers } from "lucide-react";
import { playSoftClick } from "../utils/audio";
import Magnetic from "./Magnetic";

// TODO: replace with real project screenshot assets as required
export interface ProjectItem {
  id: string;
  title: string;
  categoryKey: "web" | "ai" | "studio";
  categoryLabel: string;
  role: string;
  year: string;
  image: string;
  // TODO: replace with real project screenshot
  problem: string;
  solution: string;
  result: string;
  tags: string[];
  liveUrl?: string;
  metrics?: { label: string; value: string }[];
}

const PROJECTS_DATA: ProjectItem[] = [
  // 1. Software Engineering / Web Development (Project 1)
  {
    id: "aura-luxe-commerce",
    title: "Aura Luxe Commerce Engine",
    categoryKey: "web",
    categoryLabel: "Software Engineering / Web Development",
    role: "Lead Full-Stack Architect",
    year: "2025",
    // TODO: replace with real project screenshot
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    problem: "High-end luxury brands faced severe conversion drop-off due to sluggish 4+ second load times and fragmented checkout flows.",
    solution: "Architected a headless Next.js & TypeScript platform leveraging edge CDN caching, fluid WebGL micro-interactions, and instant checkout pipelines.",
    result: "Achieved a 99+ Google Lighthouse score, reduced bounce rates by 48%, and lifted checkout conversions by 42% in the first quarter.",
    tags: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
    metrics: [
      { label: "Lighthouse Score", value: "99/100" },
      { label: "Conversion Lift", value: "+42%" },
    ],
  },

  // 2. Software Engineering / Web Development (Project 2)
  {
    id: "nexus-realtime-protocol",
    title: "Nexus High-Frequency Telemetry",
    categoryKey: "web",
    categoryLabel: "Software Engineering / Web Development",
    role: "System & Frontend Engineer",
    year: "2025",
    // TODO: replace with real project screenshot
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?auto=format&fit=crop&w=1200&q=80",
    problem: "Institutional trading desks required ultra-dense multi-asset monitoring with zero UI frame drops during extreme volatility spikes.",
    solution: "Engineered a low-latency React dashboard utilizing WebSockets, ring buffers, virtualized canvas graphs, and worker thread computation.",
    result: "Streamlined 30,000+ data ticks per second with zero UI stutter, sustaining a consistent 60 FPS under peak market loads.",
    tags: ["TypeScript", "React", "WebSockets", "Canvas API", "Tailwind CSS"],
    metrics: [
      { label: "Throughput", value: "30k/sec" },
      { label: "Rendering", value: "60 FPS" },
    ],
  },

  // 3. AI Integration / AI Tools (Project 3)
  {
    id: "cognitive-intelligence-pipeline",
    title: "Cognitive Synthesizer Suite",
    categoryKey: "ai",
    categoryLabel: "AI Integration / AI Tools",
    role: "AI & Full-Stack Engineer",
    year: "2025",
    // TODO: replace with real project screenshot
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    problem: "Research teams expended 15+ hours weekly manually ingesting, distilling, and cross-referencing multi-source industry dossiers.",
    solution: "Developed an autonomous agentic pipeline combining Google Gemini 2.0 Flash, vector semantic search, and custom prompt workflows.",
    result: "Reduced briefing generation time by 78% while boosting factual source grounding and multi-modal citation accuracy.",
    tags: ["Google GenAI SDK", "Gemini 2.0", "TypeScript", "Vector DB", "FastAPI"],
    metrics: [
      { label: "Time Saved", value: "78%" },
      { label: "Source Grounding", value: "99.4%" },
    ],
  },

  // 4. AI Integration / AI Tools (Project 4)
  {
    id: "neural-narrative-copilot",
    title: "Neural Script & Pacing Copilot",
    categoryKey: "ai",
    categoryLabel: "AI Integration / AI Tools",
    role: "Creator & AI Engineer",
    year: "2024",
    // TODO: replace with real project screenshot
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80",
    problem: "Content creators struggled with narrative pacing drop-offs and inconsistent engagement hooks across long-form video scripts.",
    solution: "Trained and deployed a real-time narrative copilot with speech rhythm analysis, automated retention heatmaps, and hook generators.",
    result: "Enabled 3x faster script turnaround and improved audience completion rates by 35% across partnered creator channels.",
    tags: ["LLMs", "TypeScript", "Web Audio API", "Node.js", "Tailwind CSS"],
    metrics: [
      { label: "Turnaround Speed", value: "3x Faster" },
      { label: "Retention Boost", value: "+35%" },
    ],
  },

  // 5. Sani Studio (Content & Brand Work) (Project 5)
  {
    id: "billionaire-mindset-series",
    title: "The Sovereign Mindset Docuseries",
    categoryKey: "studio",
    categoryLabel: "Sani Studio (Content / Brand / YouTube)",
    role: "Creative Director & Scriptwriter",
    year: "2024",
    // TODO: replace with real project screenshot
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80",
    problem: "Educational YouTube content in the mindset niche was saturated with low-effort tropes, lacking cinematic depth and authority.",
    solution: "Produced an episodic, docuseries featuring bespoke orchestral scores, magnetic psychological hooks, and master-level color grading.",
    result: "Generated 1.2M+ organic views within 30 days of release and established Sani Studio as a benchmark for high-retention storytelling.",
    tags: ["Script Writing", "Storyboarding", "DaVinci Resolve", "Sound Design", "Directing"],
    metrics: [
      { label: "Organic Views", value: "1.2M+" },
      { label: "Audience Sentiment", value: "98%" },
    ],
  },

  // 6. Sani Studio (Content & Brand Work) (Project 6)
  {
    id: "apex-sovereign-identity",
    title: "Apex Sovereign Brand Identity",
    categoryKey: "studio",
    categoryLabel: "Sani Studio (Content / Brand / YouTube)",
    role: "Brand Architect & Visual Director",
    year: "2024",
    // TODO: replace with real project screenshot
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    problem: "An exclusive venture syndicate lacked a digital presence that matched the prestige and discretion of their physical portfolio.",
    solution: "Created a comprehensive brand architecture with bespoke typography, dark-room editorial art direction, and a luxury web ecosystem.",
    result: "Increased qualified inbound partner inquiries by 210% and unified their global portfolio under one cohesive visual signature.",
    tags: ["Brand Strategy", "Figma", "Design Systems", "Art Direction", "Motion"],
    metrics: [
      { label: "Inbound Inquiries", value: "+210%" },
      { label: "Brand Cohesion", value: "100%" },
    ],
  },
];

interface CategoryOption {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const CATEGORIES: CategoryOption[] = [
  { key: "all", label: "All Works", icon: Layers },
  { key: "web", label: "Software Engineering", icon: Code2 },
  { key: "ai", label: "AI Integration", icon: Cpu },
  { key: "studio", label: "Sani Studio", icon: Video },
];

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalProject, setActiveModalProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === "all"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.categoryKey === selectedCategory);

  const handleCategoryChange = (key: string) => {
    playSoftClick();
    setSelectedCategory(key);
  };

  const handleOpenProject = (project: ProjectItem) => {
    playSoftClick();
    setActiveModalProject(project);
  };

  const handleCloseModal = () => {
    playSoftClick();
    setActiveModalProject(null);
  };

  return (
    <section
      id="projects"
      className="relative w-full bg-[#090909] text-[#F5F2EA] py-24 sm:py-32 overflow-hidden border-t border-zinc-900 select-none"
    >
      {/* ================= AMBIENT BACKGROUND GLOWS ================= */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[650px] h-[650px] bg-[#C8A24A]/4 blur-[160px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-[#C8A24A]/3 blur-[140px] rounded-full pointer-events-none -z-10" />
      
      {/* Fine radial background grid pattern matching existing style */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none opacity-40 -z-10" />

      <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-12 relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 border-b border-zinc-900/80 pb-8 sm:pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-3"
          >
            <span className="section-eyebrow">
              Selected Work
            </span>
            <h2 className="section-heading">
              Featured Projects
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-zinc-400 font-sans font-light max-w-md leading-relaxed select-text"
          >
            A curated portfolio of full-stack web architectures, production AI systems, and cinematic brand narratives engineered for peak impact.
          </motion.p>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-2 sm:gap-3 mb-12 sm:mb-16"
        >
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                id={`filter-${cat.key}`}
                onClick={() => handleCategoryChange(cat.key)}
                className={`relative px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-sans transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? "bg-[#C8A24A]/15 text-[#F5F2EA] border border-[#C8A24A]/60 shadow-[0_0_20px_rgba(200,162,74,0.2)] font-medium"
                    : "bg-white/[0.02] hover:bg-white/[0.06] text-zinc-400 hover:text-zinc-200 border border-white/[0.08]"
                }`}
              >
                {cat.icon && <cat.icon className={`w-3.5 h-3.5 ${isActive ? "text-[#C8A24A]" : "text-zinc-500"}`} />}
                <span>{cat.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A] animate-pulse" />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* ================= PROJECT CARDS GRID ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              return (
                <motion.article
                  key={project.id}
                  id={`project-card-${project.id}`}
                  layout
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative flex flex-col justify-between bg-zinc-950/60 rounded-2xl border border-white/[0.08] hover:border-[#C8A24A]/40 transition-all duration-500 overflow-hidden shadow-[0_12px_35px_rgba(0,0,0,0.6)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(200,162,74,0.12)] hover:-translate-y-1"
                >
                  {/* Subtle top specular glass reflection highlight */}
                  <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 group-hover:via-[#C8A24A]/50 to-transparent pointer-events-none transition-colors duration-500" />
                  
                  {/* Ambient corner glow on hover */}
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#C8A24A]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                  {/* 1. THUMBNAIL AREA */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-900">
                    {/* TODO: replace with real project screenshot */}
                    <img
                      src={project.image}
                      alt={`${project.title} - ${project.categoryLabel}`}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-90 group-hover:brightness-100 contrast-[1.03]"
                      loading="lazy"
                    />

                    {/* Gradient Overlay for visual blending */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Top Floating Category Badge & Year */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-sans font-medium tracking-wide uppercase bg-black/60 backdrop-blur-md border border-white/10 text-[#C8A24A] shadow-sm">
                        {project.categoryLabel}
                      </span>
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  {/* 2. CARD CONTENT BODY */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between gap-6">
                    <div>
                      {/* Project Title (Serif typography) */}
                      <h3 className="text-2xl sm:text-3xl font-serif font-semibold text-[#F5F2EA] group-hover:text-white transition-colors duration-300 tracking-tight leading-snug mb-3">
                        {project.title}
                      </h3>

                      {/* Problem -> Solution -> Result Structured Case Study Flow */}
                      <div className="space-y-2.5 text-xs sm:text-[13px] leading-relaxed text-zinc-300/90 font-sans select-text">
                        <p>
                          <span className="font-semibold text-white/90">Problem: </span>
                          <span className="text-zinc-400">{project.problem}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-[#C8A24A]">Solution: </span>
                          <span className="text-zinc-300">{project.solution}</span>
                        </p>
                        <p>
                          <span className="font-semibold text-emerald-400">Result: </span>
                          <span className="text-zinc-200">{project.result}</span>
                        </p>
                      </div>
                    </div>

                    {/* Tech Stack Pills & View Action Footer */}
                    <div className="pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Tech Stack subtle bordered pills */}
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                        {project.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-2.5 py-1 rounded-md text-[11px] font-mono tracking-tight text-zinc-400 bg-white/[0.03] border border-white/[0.08] group-hover:border-white/[0.14] transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* "View Project" Button with Arrow Icon */}
                      <div className="self-end sm:self-auto shrink-0">
                        <Magnetic range={20} strength={0.2}>
                          <button
                            id={`view-project-btn-${project.id}`}
                            onClick={() => handleOpenProject(project)}
                            className="relative overflow-hidden group/btn px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-[#C8A24A]/15 backdrop-blur-xl border border-white/15 hover:border-[#C8A24A]/60 text-white hover:text-[#F5F2EA] text-xs font-sans font-medium flex items-center gap-2 transition-all duration-300 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.2)] hover:shadow-[0_0_20px_rgba(200,162,74,0.25)] cursor-pointer"
                            aria-label={`View case study details for ${project.title}`}
                          >
                            <span className="relative z-10 tracking-wide font-semibold">View Case Study</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-[#C8A24A] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-200 relative z-10" />
                          </button>
                        </Magnetic>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* ================= MODAL CASE STUDY DETAIL DRAWER ================= */}
      <AnimatePresence>
        {activeModalProject && (
          <div
            className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="case-study-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#0d0c15] border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl text-[#F5F2EA] flex flex-col gap-6"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 border border-white/10 hover:border-[#C8A24A]/60 flex items-center justify-center text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              {/* Modal Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-sans uppercase font-semibold bg-[#C8A24A]/15 text-[#C8A24A] border border-[#C8A24A]/30">
                  {activeModalProject.categoryLabel}
                </span>
                <span className="text-xs font-mono text-zinc-400">
                  {activeModalProject.year} • {activeModalProject.role}
                </span>
              </div>

              {/* Title */}
              <h3 id="case-study-title" className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
                {activeModalProject.title}
              </h3>

              {/* Featured Image */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
                {/* TODO: replace with real project screenshot */}
                <img
                  src={activeModalProject.image}
                  alt={activeModalProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Problem / Solution / Result Deep Dive */}
              <div className="space-y-4 font-sans text-sm sm:text-base leading-relaxed select-text">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <h4 className="text-xs font-mono uppercase text-zinc-400 font-bold tracking-widest mb-1.5">
                    The Challenge (Problem)
                  </h4>
                  <p className="text-zinc-300">{activeModalProject.problem}</p>
                </div>

                <div className="p-4 rounded-xl bg-[#C8A24A]/[0.04] border border-[#C8A24A]/20">
                  <h4 className="text-xs font-mono uppercase text-[#C8A24A] font-bold tracking-widest mb-1.5">
                    The Execution (Solution)
                  </h4>
                  <p className="text-zinc-200">{activeModalProject.solution}</p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/[0.04] border border-emerald-500/20">
                  <h4 className="text-xs font-mono uppercase text-emerald-400 font-bold tracking-widest mb-1.5">
                    The Impact (Result)
                  </h4>
                  <p className="text-zinc-100">{activeModalProject.result}</p>
                </div>
              </div>

              {/* Key Metrics */}
              {activeModalProject.metrics && activeModalProject.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {activeModalProject.metrics.map((metric, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] flex flex-col items-center text-center">
                      <span className="text-2xl sm:text-3xl font-serif font-bold text-[#C8A24A]">
                        {metric.value}
                      </span>
                      <span className="text-xs font-sans text-zinc-400 uppercase tracking-wider mt-1">
                        {metric.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tech Stack */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <span className="text-xs font-mono text-zinc-500 uppercase mr-2">Technologies:</span>
                {activeModalProject.tags.map((tag, tagIdx) => (
                  <span
                    key={tagIdx}
                    className="px-3 py-1 rounded-md text-xs font-mono text-zinc-300 bg-white/[0.04] border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Modal Footer Action */}
              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  onClick={handleCloseModal}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs sm:text-sm font-sans font-medium transition-colors cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
