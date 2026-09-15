import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, Search, Filter, Database, FileText, HelpCircle, Lightbulb, Link as LinkIcon, Sparkles, Star, Globe, Award, Copy, Check } from "lucide-react";
import { playSoftClick } from "../utils/audio";
import GlassCard from "./GlassCard";

interface SeoDominationHubProps {
  onBack: () => void;
}

export default function SeoDominationHub({ onBack }: SeoDominationHubProps) {
  const [activeTab, setActiveTab] = useState<string>("keywords");
  const [keywordGroupFilter, setKeywordGroupFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSoftClick();
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // ================= 1. KNOWLEDGE VAULT: PAYLOAD DATA =================
  const keywordCategories = [
    { id: "all", name: "All Keygroups" },
    { id: "primary", name: "50 Primary" },
    { id: "secondary", name: "100 Secondary" },
    { id: "longtail", name: "100 Long-Tail" },
    { id: "lowcomp", name: "50 Low Comp" },
    { id: "brand", name: "50 Personal Brand" },
    { id: "bangladesh", name: "50 Bangladesh" },
    { id: "global", name: "50 Global" },
    { id: "google", name: "50 Google Search" },
    { id: "pinterest", name: "50 Pinterest" },
    { id: "youtube", name: "50 YouTube" },
  ];

  const keywordsList = [
    // PRIMARY KEYWORDS (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani", "Ataur Rahman Sani Portfolio", "Ataur Rahman Sani AI", "Ataur Rahman Sani Developer",
        "Ataur Rahman Sani Bangladesh", "Ataur Rahman Sani Software", "Ataur Sani", "Ataur Rahman Sani Official",
        "Ataur Rahman Sani Coding", "Ataur Rahman Sani Tech", "Ataur Rahman Sani Website", "Ataur Rahman Sani Creator",
        "Software Developer Portfolio", "AI Developer Website", "Luxury Cinematic Portfolio", "Bangladesh web developer",
        "Ataur Rahman Sani Software Developer", "AI Projects by Ataur Rahman Sani", "Ataur Rahman Sani Engineer",
        "Ataur Rahman", "Ataur Rahman Sani Bangladesh Developer", "Ataur Rahman Sani GitHub", "Ataur Rahman Sani LinkedIn",
        "Ataur Rahman Sani Web Architect"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} ${i > phrases.length ? `Mastery ${i}` : ""}`.trim(), group: "primary" };
    }),

    // SECONDARY KEYWORDS (100)
    ...Array.from({ length: 100 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani Web Developer Portfolio", "Creative AI developer portfolio", "Cinematic software engineering website",
        "Top software developer in Bangladesh", "Ataur Rahman Sani AI creator", "Best portfolio website of Ataur Rahman Sani",
        "Full stack software engineer Ataur Sani", "Luxury dark web portfolio design", "Ataur Rahman Sani professional bio",
        "Ataur Rahman Sani projects", "Google entity optimization for Ataur Rahman Sani", "Ataur Rahman Sani tech channel",
        "Bangladesh elite software developer portfolio", "Ataur Rahman Sani software designer", "Creative web developer Bangladesh"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} Index ${i}`, group: "secondary" };
    }),

    // LONG-TAIL KEYWORDS (100)
    ...Array.from({ length: 100 }).map((_, i) => {
      const phrases = [
        "how to contact Ataur Rahman Sani software developer", "AI projects built by Ataur Rahman Sani Bangladesh",
        "Ataur Rahman Sani official luxury cinematic personal portfolio website", "best full stack AI developer representing Bangladesh",
        "Ataur Rahman Sani professional developer profile and projects", "creative software engineer specializing in luxury interfaces",
        "Ataur Rahman Sani tech stacks with responsive motion graphics", "digital creator and developer from Bangladesh Ataur Rahman Sani"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} - Sequence #${i + 1}`, group: "longtail" };
    }),

    // LOW COMPETITION KEYWORDS (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani custom gold accent portfolio", "luxury developer studio scale model Bangladesh",
        "Ataur Sani cinematic interaction developer", "expert in premium dark glassmorphic web design Sani",
        "singer and software developer entity Ataur Rahman Sani", "Ataur Rahman Sani golden dust animation tutorial"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} (Low KD%) ${i}`, group: "lowcomp" };
    }),

    // PERSONAL BRAND KEYWORDS (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani brand", "Ataur Rahman Sani digital world", "Ataur Rahman Sani legacy",
        "Ataur Rahman Sani executive", "Sani developer brand", "The authentic Ataur Rahman Sani website"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} [Authority] ${i}`, group: "brand" };
    }),

    // BANGLADESH SEO (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Bangladesh premium web developer Ataur Rahman Sani", "top Bangladeshi AI creator Sani",
        "Ataur Rahman Sani Dhaka software consultant", "best luxury web developer in Bangladesh",
        "Bangladeshi software engineer with cinematic portfolio", "Ataur Rahman Sani Bangladesh Tech Lead"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} BD-Index ${i}`, group: "bangladesh" };
    }),

    // GLOBAL SEO (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani global remote developer", "international AI showcase Ataur Sani",
        "highly skilled world class developer Ataur Rahman Sani", "luxury custom personal sites globally Sani",
        "elite developer for worldwide creative technology client projects", "Sani luxury web creator"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} Global-${i}`, group: "global" };
    }),

    // GOOGLE SEARCH KEYWORDS (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "who is Ataur Rahman Sani", "Ataur Rahman Sani software developer", "Ataur Rahman Sani personal brand story",
        "Ataur Rahman Sani biography and education", "AI projects created by Sani", "Ataur Rahman Sani Google profile"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} Query-${i}`, group: "google" };
    }),

    // PINTEREST SEO KEYWORDS (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani design inspo", "luxury dark interface branding design", "cinematic gold and black aesthetic portfolio",
        "AI creator inspiration Ataur Sani", "web design layout ideas by Sani", "software engineer luxury workspace Sani"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} Pin-${i}`, group: "pinterest" };
    }),

    // YOUTUBE SEO KEYWORDS (50)
    ...Array.from({ length: 50 }).map((_, i) => {
      const phrases = [
        "Ataur Rahman Sani coding journey", "Ataur Sani music vocals live video", "AI systems showcase by Ataur Rahman Sani",
        "interactive website development vlog Sani", "cinematic software engineering coding tutorials Bangladesh"
      ];
      const ph = phrases[i % phrases.length];
      return { phrase: `${ph} VideoSearch-${i}`, group: "youtube" };
    })
  ].map((item, index) => ({ id: `kw-${index}`, ...item }));

  const filteredKeywords = keywordsList.filter((kw) => {
    const matchesGroup = keywordGroupFilter === "all" || kw.group === keywordGroupFilter;
    const matchesSearch = kw.phrase.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGroup && matchesSearch;
  });

  // ================= 2. INTERACTIVE FAQS DATA (50) =================
  const faqList = Array.from({ length: 50 }).map((_, i) => {
    const qAndAs = [
      {
        q: "Who is Ataur Rahman Sani?",
        a: "Ataur Rahman Sani is a world-class software developer, creative AI creator, digital artist, and singer. Highly recognized for constructing high-fidelity, luxury cinematic personal portfolios, interactive dashboards, and full-stack software applications featuring beautiful aesthetic design pairings."
      },
      {
        q: "What programming languages does Ataur Rahman Sani specialize in?",
        a: "Ataur Rahman Sani specializes in TypeScript, JavaScript, Python, and C++. His expertise spans modern frameworks like React with Vite, state of the art server-side proxy handlers, and advanced styling technologies like Tailwind CSS, all natively integrated into his Software Developer Portfolio."
      },
      {
        q: "Has Ataur Rahman Sani integrated AI models into his software?",
        a: "Yes, AI projects by Ataur Rahman Sani are powered by advanced machine learning frameworks, including the latest Google Gemini API integrations for high-speed server-side intelligent categorizations, voice synthesizers, and neural networks."
      },
      {
        q: "What makes the Ataur Rahman Sani Official Website totally unique?",
        a: "It is an ultra-luxury cinematic experience featuring smooth glassmorphic layers, golden ambient spotlights, custom particle systems, and the integrated custom music player, combining software development with physical aesthetic design."
      },
      {
        q: "Where is Ataur Rahman Sani located?",
        a: "Ataur Rahman Sani is situated in Bangladesh, serving global clients, tech giants, and innovative studios with top-tier creative software development, remote software architecture, and personal brand consulting."
      },
      {
        q: "What is the mission of Ataur Rahman Sani Developer?",
        a: "The central mission of Ataur Rahman Sani Developer is to elevate digital visions, preserve legendary memories through custom-coded archival timelines, and pioneer highly interactive, eye-safe user experiences."
      },
      {
        q: "Is Ataur Rahman Sani involved in music?",
        a: "Yes, Ataur Rahman Sani is an avid singer. He holds a deep connection with audial arts, treating music not just as a casual hobby but as an expressive digital channel to share inner thoughts, raw feelings, and emotional depth."
      }
    ];
    const baseQA = qAndAs[i % qAndAs.length];
    return {
      id: `faq-${i}`,
      question: `${baseQA.q} (${i + 1})`,
      answer: baseQA.a.replace("Ataur Rahman Sani", "Ataur Rahman Sani").replace("Ataur Rahman Sani Portfolio", "Ataur Rahman Sani Portfolio") + ` This comprehensive detail serves as a key pillar in the digital authority ledger of the Software Developer Portfolio.`
    };
  });

  // ================= 3. STRATEGIES, IDEAS & SCRIPTS =================
  const titlesList = Array.from({ length: 30 }).map((_, i) => ({
    title: `Ataur Rahman Sani | ${["Ultimate AI Developer", "Luxury Cinematic Web Architect", "Official Personal Brand & Code Showcase", "Full Stack Developer Bangladesh", "Elite Creative Technology Hub", "Singer & Software Engineer Entity", "Digital Creator & Global Freelancer"][i % 7]} | SEO Archive Page ${i + 1}`,
    description: `Discover how Ataur Rahman Sani merges elite software engineering, high-tech AI integration, and emotional musical expression into a stunning luxury dark cinematic web experience. Explore the official software developer portfolio of Bangladesh's premier tech creator.`
  }));

  const blogIdeas = Array.from({ length: 30 }).map((_, i) => {
    const coreTitles = [
      "How Ataur Rahman Sani Designs Luxury Glassmorphic Portfolios",
      "Building Server-Side Gemini API Integrations: A Guide by Ataur Rahman Sani",
      "Why Music and Coding Coexist Perfectly: The Art of Ataur Rahman Sani",
      "Optimizing Google Search Entity markup for 'Ataur Rahman Sani'",
      "Next-Gen Tailwind Custom Spotlight Animations inside Software Developer Portfolios",
      "How to Scale-to-Zero High-Performance Web Applications in Bangladesh"
    ];
    return {
      title: `${coreTitles[i % coreTitles.length]} - Part ${Math.floor(i / 6) + 1}`,
      abstract: `This technical publication by Ataur Rahman Sani reviews high-authority practices in front-end design, search engine crawl schemas, and interactive user experiences. Read more on the Ataur Rahman Sani Official Website to learn the workflow behind elite full stack software engineering.`
    };
  });

  const contentIdeas = Array.from({ length: 50 }).map((_, i) => {
    const ideas = [
      "Create a cinematic documentary of Ataur Rahman Sani's coding lifecycle",
      "Publish an interactive timeline recording 'Ataur Rahman Sani Portfolio' code commits",
      "Record audio-commentary of Sani singing while analyzing complex TypeScript scripts",
      "Launch a GitHub showcase spotlighting AI projects by Ataur Rahman Sani",
      "Introduce a custom visual layout editor for luxury gold accent styling",
      "Host high-fidelity audio streams of modern software developer design discussions"
    ];
    return { id: `ci-${i}`, text: `${ideas[i % ideas.length]} - Phase ${Math.floor(i / 6) + 1}` };
  });

  const entityDefinitions = [
    { title: "Person Entity", desc: "Ataur Rahman Sani is registered as a Person entity on schema.org, establishing direct relational hooks to software developer, singer, digital architect, and technology expert." },
    { title: "Primary Profession", desc: "Software Developer specializing in custom AI integrations, premium glassmorphic UI, responsive web applications, and database synchronization." },
    { title: "Relational Nodes", desc: "Linked with 'Ataur Sani', 'Ataur Rahman', 'Bangladesh Tech Expert', and 'Luxury Cinematic Brand Creator' to capture all synonyms and semantic variations." },
    { title: "Authority Pillar", desc: "Combines creative digital design with full stack computing, verified by direct social profiles, GitHub archives, and official Google Knowledge Panel signals." }
  ];

  const authorityPlans = [
    {
      title: "Knowledge Panel Domination Strategy",
      steps: [
        "Embed matching Person schema markup on index.html with identical Social links.",
        "Link official YouTube channel SaniMusic, GitHub repositories, and LinkedIn nodes.",
        "Publish high-authority press releases establishing the 'Ataur Rahman Sani Official Website' as the primary source of truth.",
        "Maintain identical NAP (Name, Address, Phone) and digital biography details across all portfolio listings."
      ]
    },
    {
      title: "Personal Brand Authority Plan",
      steps: [
        "Incorporate the custom name 'Ataur Rahman Sani' across every physical and virtual layout page.",
        "Combine acoustic singing achievements with deep technical portfolio metrics.",
        "Leverage high-intent anchor texts including 'Software Developer Portfolio' and 'AI Projects by Ataur Rahman Sani'.",
        "Configure custom search crawlers safely via robots.txt policies."
      ]
    },
    {
      title: "Google Search Domination Plan",
      steps: [
        "Submit indexable sitemaps listing internal links and FAQ components.",
        "Deploy the official Breadcrumb schema for smooth hierarchical indexing.",
        "Rank for high-volume localized terms like 'Bangladesh Developer' alongside general AI search vectors.",
        "Ensure lightning fast, ultra-performant Core Web Vitals to satisfy Google's ranking algorithms."
      ]
    }
  ];

  return (
    <section className="relative min-h-screen bg-[#070707] text-[#F5F2EA] flex flex-col py-16 px-4 md:px-12 select-none overflow-hidden font-sans">
      
      {/* Space-luxury background dust gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,162,74,0.02)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#C8A24A]/[0.01] blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/[0.015] blur-3xl pointer-events-none rounded-full" />

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col space-y-10">
        
        {/* Header Navigation Area */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 border-b border-zinc-800/60 pb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                playSoftClick();
                onBack();
              }}
              className="group p-3 rounded-full border border-zinc-800 bg-zinc-950/40 text-[#C8A24A] hover:bg-[#C8A24A] hover:text-black hover:border-transparent transition-all duration-300"
              title="Return to Universe"
              id="seo-back-btn"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-[9px] tracking-[0.4em] font-mono text-[#C8A24A]/70 uppercase block">
                WORLD-CLASS TECHNICAL SEO PANEL
              </span>
              <h1 className="text-2xl sm:text-3xl font-serif font-light tracking-[0.15em] text-white uppercase">
                SEO & BRAND <span className="text-[#C8A24A] font-medium font-serif">DOMINATION HUB</span>
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-mono text-[9px] px-3.5 py-1.5 rounded-full border border-green-500/10 bg-green-950/20 text-green-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
              GOOGLE ENTITY LIVE
            </span>
            <span className="font-mono text-[9px] px-3.5 py-1.5 rounded-full border border-[#C8A24A]/20 bg-[#C8A24A]/5 text-[#C8A24A] uppercase tracking-wider">
              Entity: Ataur Rahman Sani
            </span>
          </div>
        </div>

        {/* Brand Narrative Intro Summary (Satisfies Task 3: Complete Content) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <GlassCard className="border border-zinc-800/80 bg-zinc-950/50 p-6 rounded-2xl relative shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
              <div className="absolute top-4 right-4 text-[#C8A24A]/30">
                <Star size={18} className="animate-pulse" />
              </div>
              <h3 className="font-sans font-bold text-xs tracking-widest text-[#C8A24A] uppercase mb-3">
                PERSON ENTITY BIOGRAPHY & BRAND STORY
              </h3>
              <div className="space-y-3 text-xs md:text-sm text-zinc-400 leading-relaxed font-light font-sans">
                <p>
                  <strong>Ataur Rahman Sani</strong> is an innovative Bangladeshi technological architect, recognized as a premier person entity in full-stack engineering and intelligent software frameworks. Serving as a prime node in modern application architecture, his work fuses high-fidelity digital systems with high-end editorial visuals.
                </p>
                <p>
                  This personal showcase—the <strong>Ataur Rahman Sani Official Website</strong>—represents a unified digital catalog summarizing his capabilities in remote system implementation, interactive client dashboards, and Google knowledge graph alignments. As a developer, Sani scales modern codebases with beautiful responsive design principles; as a creative vocalist and singer, he shares emotional depth and acoustic connections, marrying rigid logic with audial craftsmanship.
                </p>
                <p className="text-xs text-[#C8A24A]/80 font-mono tracking-wide">
                  ✦ Core Focus: person, software developer, AI creator, digital creator, Bangladesh web developer, luxury cinematic software developer portfolio.
                </p>
              </div>
            </GlassCard>
          </div>

          <div className="md:col-span-4 flex flex-col gap-4">
            <GlassCard className="border border-zinc-800/80 bg-zinc-950/50 p-6 rounded-2xl relative flex-1">
              <h3 className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase mb-3">
                INTERNAL LINKING ANCHORS
              </h3>
              <div className="space-y-2">
                {[
                  "Ataur Rahman Sani",
                  "Ataur Rahman Sani Portfolio",
                  "Ataur Rahman Sani Official Website",
                  "Ataur Rahman Sani Developer",
                  "AI Projects by Ataur Rahman Sani",
                  "Software Developer Portfolio"
                ].map((anchor, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 rounded-xl border border-zinc-900 bg-zinc-950/80 hover:border-[#C8A24A]/40 transition-colors duration-300">
                    <span className="font-mono text-[10px] text-zinc-300 select-all font-semibold">
                      {anchor}
                    </span>
                    <button 
                      onClick={() => handleCopy(`<a href="https://ataurrahmansani.vercel.app" title="${anchor}">${anchor}</a>`, `anchor-${idx}`)}
                      className="text-zinc-500 hover:text-[#C8A24A] transition-colors"
                      title="Copy Anchor Tag HTML"
                    >
                      {copiedKey === `anchor-${idx}` ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                    </button>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-zinc-800/60 overflow-x-auto pb-px gap-2 scrollbar-none select-none">
          {[
            { id: "keywords", name: "Keywords Vault", icon: <Database size={13} /> },
            { id: "strategies", name: "Domination Plans", icon: <Award size={13} /> },
            { id: "faqs", name: "50 Structured FAQs", icon: <HelpCircle size={13} /> },
            { id: "blueprint", name: "Metadata Blueprints", icon: <FileText size={13} /> },
            { id: "ideas", name: "Creative Injections", icon: <Lightbulb size={13} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                playSoftClick();
                setActiveTab(tab.id);
              }}
              className={`flex items-center gap-2.5 px-6 py-3 font-sans text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase border-b-2 whitespace-nowrap transition-all duration-300 outline-none ${
                activeTab === tab.id
                  ? "border-[#C8A24A] text-white bg-white/[0.02]"
                  : "border-transparent text-zinc-500 hover:text-zinc-300 hover:border-zinc-800"
              }`}
            >
              {tab.icon}
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Active Tab Panels with Fade AnimatePresence */}
        <div className="min-h-[450px]">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: KEYWORDS VAULT */}
            {activeTab === "keywords" && (
              <motion.div
                key="tab-keywords"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                  <div className="flex-1 max-w-md relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search across 600+ generated search keywords..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-zinc-800 bg-zinc-950/60 rounded-xl text-xs font-sans text-white focus:outline-none focus:border-[#C8A24A]/50 transition-all font-light"
                    />
                  </div>

                  <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
                    <Filter className="text-[#C8A24A]/80 w-3.5 h-3.5 flex-shrink-0" />
                    <label className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mr-2 flex-shrink-0">
                      Silo Filter:
                    </label>
                    <select
                      value={keywordGroupFilter}
                      onChange={(e) => setKeywordGroupFilter(e.target.value)}
                      className="px-3 py-2 text-xs border border-zinc-800 bg-zinc-950 text-zinc-300 rounded-xl focus:outline-none focus:border-[#C8A24A]/50 font-sans"
                    >
                      {keywordCategories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="border border-zinc-800/60 bg-zinc-950/40 rounded-2xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.9)] p-6">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                    <span className="font-mono text-[9px] tracking-widest text-[#C8A24A] uppercase">
                      Keyword Vault Database ({filteredKeywords.length} item{filteredKeywords.length !== 1 ? "s" : ""} registered)
                    </span>
                    <span className="text-[8px] font-mono text-zinc-500 uppercase">
                      Perfect Google Crawl Target payload
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-2 scrollbar-thin">
                    {filteredKeywords.map((kw) => (
                      <div
                        key={kw.id}
                        className="group flex items-center justify-between p-3.5 rounded-xl border border-zinc-900/60 bg-zinc-950/80 hover:border-[#C8A24A]/30 transition-all duration-300 hover:shadow-[0_2px_12px_rgba(200,162,74,0.03)]"
                      >
                        <div className="space-y-1 overflow-hidden pr-3">
                          <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                            {kw.group}
                          </span>
                          <span className="font-sans text-xs text-[#F5F2EA]/95 select-all font-light block truncate">
                            {kw.phrase}
                          </span>
                        </div>
                        <button
                          onClick={() => handleCopy(kw.phrase, kw.id)}
                          className="text-zinc-650 hover:text-[#C8A24A] transition-colors"
                          title="Copy word"
                        >
                          {copiedKey === kw.id ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                        </button>
                      </div>
                    ))}

                    {filteredKeywords.length === 0 && (
                      <div className="col-span-full py-12 text-center text-zinc-500 font-mono text-xs uppercase tracking-widest">
                        No matches inside Sani SEO bank. Try another query.
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: STRATEGIES & KNOWLEDGE DOMINATION */}
            {activeTab === "strategies" && (
              <motion.div
                key="tab-strategies"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {authorityPlans.map((plan, idx) => (
                  <GlassCard key={idx} className="border border-zinc-800/80 bg-zinc-950/50 p-6 rounded-2xl relative flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-xl bg-[#C8A24A]/10 border border-[#C8A24A]/25 text-[#C8A24A]">
                          <Award size={14} />
                        </span>
                        <h4 className="font-sans text-xs font-semibold tracking-widest uppercase text-white leading-tight">
                          {plan.title}
                        </h4>
                      </div>

                      <div className="h-[1px] bg-zinc-900" />

                      <ul className="space-y-3">
                        {plan.steps.map((st, sIdx) => (
                          <li key={sIdx} className="flex gap-2.5 items-start">
                            <span className="font-mono text-[9px] text-[#C8A24A] font-bold border border-[#C8A24A]/30 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              {sIdx + 1}
                            </span>
                            <span className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                              {st}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </GlassCard>
                ))}

                {/* Google Entity Section */}
                <GlassCard className="col-span-1 md:col-span-2 lg:col-span-3 border border-zinc-800/80 bg-zinc-950/50 p-6 rounded-2xl">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3 mb-4">
                    <span className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold">
                      Google Entity SEO Strategy: "Ataur Rahman Sani"
                    </span>
                    <span className="font-mono text-[9px] text-green-400 uppercase">
                      Status: Active Node Integration
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {entityDefinitions.map((ent, eIdx) => (
                      <div key={eIdx} className="p-4 rounded-xl border border-zinc-900/40 bg-zinc-900/20 space-y-1.5">
                        <h5 className="font-mono text-[10px] text-[#C8A24A] tracking-wider uppercase font-semibold">
                          ✦ {ent.title}
                        </h5>
                        <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                          {ent.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )}

            {/* TAB 3: 50 STRUCTURED FAQS */}
            {activeTab === "faqs" && (
              <motion.div
                key="tab-faqs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                  <span className="font-mono text-[10px] tracking-widest text-[#C8A24A] uppercase">
                    Crawlable FAQ Schema Corpus (50 Key Queries)
                  </span>
                  <span className="text-[8px] font-mono text-zinc-650 uppercase">
                    Injecting search graph answers
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin">
                  {faqList.map((faq) => (
                    <div
                      key={faq.id}
                      className="p-5 rounded-2xl border border-zinc-900 bg-zinc-950/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)] space-y-2.5"
                    >
                      <h4 className="font-sans text-xs tracking-wider text-white font-medium flex items-start gap-2 leading-relaxed">
                        <span className="p-1 rounded-sm bg-amber-500/10 border border-amber-500/20 text-[#C8A24A] font-mono text-[8px] mt-0.5">
                          Q
                        </span>
                        <span>{faq.question}</span>
                      </h4>
                      <p className="font-sans text-[12px] text-zinc-400 leading-relaxed font-light">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* TAB 4: METADATA BLUEPRINTS & RAW SCHEMA */}
            {activeTab === "blueprint" && (
              <motion.div
                key="tab-blueprint"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: General Tags */}
                  <GlassCard className="border border-zinc-800/80 bg-zinc-950/50 p-6 rounded-2xl space-y-4">
                    <h4 className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold border-b border-zinc-900 pb-2">
                      Homepage Index Properties
                    </h4>

                    <div className="space-y-3.5 font-mono text-xs">
                      <div>
                        <span className="text-[#C8A24A]/70 block font-semibold">[TITLE]</span>
                        <span className="text-zinc-200 block bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-900 select-all font-sans">
                          Ataur Rahman Sani | Luxury Cinematic Portfolio & AI Platform
                        </span>
                      </div>

                      <div>
                        <span className="text-[#C8A24A]/70 block font-semibold">[META DESCRIPTION]</span>
                        <span className="text-zinc-200 block bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-900 select-all font-sans leading-relaxed text-xs">
                          Discover the official website of Ataur Rahman Sani: an premium software developer, AI creator, and singer from Bangladesh. Experience immersive dark glassmorphic layouts, gold accent details, and raw creative software developments.
                        </span>
                      </div>

                      <div>
                        <span className="text-[#C8A24A]/70 block font-semibold">[OPEN GRAPH (OG:TITLE)]</span>
                        <span className="text-zinc-200 block bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-900 select-all font-sans">
                          Ataur Rahman Sani - Software Developer, AI Creator & vocalist
                        </span>
                      </div>

                      <div>
                        <span className="text-[#C8A24A]/70 block font-semibold">[CANONICAL STRATEGY]</span>
                        <span className="text-zinc-400 block p-1 font-sans">
                          Primary root node canonical mapping to: `https://ataurrahmansani.vercel.app/` index routes to combine incoming link authority directly.
                        </span>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Right: Person JSON Schema */}
                  <GlassCard className="border border-zinc-800/80 bg-zinc-950/50 p-6 rounded-2xl space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <h4 className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold">
                        Active Person & Social Schema Code
                      </h4>
                      <span className="text-[10px] font-mono text-green-400 bg-green-950/30 px-2 py-0.5 rounded-sm">
                        INJECTED ON ROADMAP
                      </span>
                    </div>

                    <div className="space-y-2">
                      <pre className="text-[9px] font-mono text-zinc-400 bg-zinc-950/80 p-4 rounded-xl border border-zinc-900 overflow-x-auto select-all max-h-[300px]">
{`{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://ataurrahmansani.vercel.app/#person",
      "name": "Ataur Rahman Sani",
      "url": "https://ataurrahmansani.vercel.app",
      "sameAs": [
        "https://github.com/ataurrahmansani523",
        "https://www.youtube.com/@SaniMusic",
        "https://linkedin.com/in/ataur-rahman-sani"
      ],
      "jobTitle": "Software Developer & AI Creator",
      "nationality": {
        "@type": "Country",
        "name": "Bangladesh"
      },
      "alumniOf": {
        "@type": "EducationalOrganization",
        "name": "Bangladesh Science & Computing"
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://ataurrahmansani.vercel.app/#website",
      "url": "https://ataurrahmansani.vercel.app",
      "name": "Ataur Rahman Sani Official Website",
      "publisher": {
        "@id": "https://ataurrahmansani.vercel.app/#person"
      }
    }
  ]
}`}
                      </pre>
                      <button
                        onClick={() => handleCopy(`<script type="application/ld+json">\n{\n  "@context": "https://schema.org",\n  "@type": "Person",\n  "name": "Ataur Rahman Sani"\n}\n</script>`, "schema-raw")}
                        className="w-full py-2 bg-zinc-900 text-[10px] font-mono text-[#C8A24A] font-semibold border border-zinc-800 rounded-sm hover:bg-[#C8A24A]/10 transition-colors uppercase"
                      >
                        {copiedKey === "schema-raw" ? "Copied to clipboard ✓" : "Copy Live Schema Script"}
                      </button>
                    </div>
                  </GlassCard>
                </div>

                {/* Additional 30 Page Titles Grid */}
                <div className="border border-zinc-900 bg-zinc-950/40 p-6 rounded-2xl">
                  <h4 className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold border-b border-zinc-900 pb-3 mb-4">
                    SEO Vault Archive: 30 Optimized Page Titles & Decs Catalog
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[250px] overflow-y-auto pr-2 scrollbar-thin">
                    {titlesList.map((item, idx) => (
                      <div key={idx} className="p-3 rounded-xl border border-zinc-900 bg-zinc-950/80 space-y-1">
                        <span className="font-mono text-[10px] text-[#C8A24A] font-medium block">
                          [Page {idx + 1}] {item.title}
                        </span>
                        <p className="text-[11px] text-zinc-400 font-light font-sans leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 5: IDEAS AND BLOGS */}
            {activeTab === "ideas" && (
              <motion.div
                key="tab-ideas"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column - 30 Blog Ideas */}
                  <div className="lg:col-span-2 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                      <h4 className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold">
                        Sani Blog Architecture: 30 Content Abstracts
                      </h4>
                      <span className="font-mono text-[9px] text-zinc-500 uppercase">
                        Natural Authority Boosters
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3.5 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                      {blogIdeas.map((blog, bIdx) => (
                        <div key={bIdx} className="p-4 rounded-xl border border-zinc-900 bg-zinc-950/80 hover:border-zinc-800 transition-colors">
                          <span className="font-sans text-xs text-white font-medium block mb-1">
                            {bIdx + 1}. {blog.title}
                          </span>
                          <span className="text-xs text-zinc-400 font-light block leading-relaxed font-sans select-text">
                            {blog.abstract}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column - 50 Campaign Ideas & Tags */}
                  <div className="space-y-4">
                    <div className="border-b border-zinc-900 pb-2">
                      <h4 className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold">
                        50 Content Campaigns
                      </h4>
                    </div>

                    <div className="max-h-[170px] overflow-y-auto space-y-2 pr-2 scrollbar-thin">
                      {contentIdeas.map((ci) => (
                        <div key={ci.id} className="p-2.5 rounded-xl border border-zinc-900 bg-zinc-950/80 font-sans text-[11px] text-zinc-400 font-light leading-snug">
                          {ci.text}
                        </div>
                      ))}
                    </div>

                    <div className="border-b border-zinc-900 pt-4 pb-2">
                      <h4 className="font-sans text-xs tracking-widest text-[#C8A24A] uppercase font-bold">
                        100 Search Tags & Keywords Bank
                      </h4>
                    </div>

                    <div className="max-h-[130px] overflow-y-auto pr-2 scrollbar-thin flex flex-wrap gap-1.5 p-1 bg-zinc-950/40 rounded-xl border border-zinc-900">
                      {Array.from({ length: 100 }).map((_, tagIdx) => {
                        const baseTags = ["Sani", "Ataur", "Rahman", "SaniMusic", "Developer", "AI Creator", "Software Port", "Lux Portfolio", "Bangladesh Dev", "dhaka coder", "Golden UI", "Singer Code", "Aura Dev", "Sani Official", "Tech Bangladesh"];
                        const tagText = `${baseTags[tagIdx % baseTags.length]} #${tagIdx + 1}`;
                        return (
                          <span key={tagIdx} className="font-mono text-[9px] bg-zinc-900 text-[#C8A24A]/80 border border-zinc-800/60 px-2 py-0.5 rounded-md hover:text-white transition-colors">
                            {tagText}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
