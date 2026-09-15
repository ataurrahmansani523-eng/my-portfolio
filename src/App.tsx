import { useState, useRef, useEffect, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import FooterSection from "./components/FooterSection";
import CursorGlow from "./components/CursorGlow";
import Header from "./components/Header";
import ScrollProgressBar from "./components/ScrollProgressBar";
import { playSoftClick } from "./utils/audio";
import EnterNextPageSection from "./components/EnterNextPageSection";
import MyPlanSection from "./components/MyPlanSection";
import TestimonialsSectionDemo from "./components/TestimonialsSection";
import MagneticSpotlightMarquee from "./components/MagneticSpotlightMarquee";
import IntroAnimation from "./components/ui/scroll-morph-hero";
import ImageTextReveal from "./components/ui/imgtext-reveal-scroll-animation";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Dynamic / Lazy-loaded heavy components for lightning-fast initial load speed
const StellarCardGallerySingle = lazy(() => import("@/components/ui/3d-image-gallery"));
const DigitalWorld = lazy(() => import("./components/DigitalWorld"));
const SeoDominationHub = lazy(() => import("./components/SeoDominationHub"));

import { StaggeredGrid, BentoItem } from "@/components/ui/staggered-grid";
import { FaLaptopCode, FaRocket, FaSearchDollar } from "react-icons/fa";

const SKILL_GRID_IMAGES = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80",
];

const SKILL_BENTO_ITEMS: BentoItem[] = [
  {
    id: "seo",
    title: "SEO Domination",
    subtitle: "Organic Growth",
    description: "Driving premium organic search engine traffic to websites with top tier ranking.",
    icon: <FaSearchDollar className="w-5 h-5 text-[#C8A24A]" />,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "frontend",
    title: "Frontend Craft",
    subtitle: "Immersive Web",
    description: "Developing hyper-interactive, custom React environments with stunning animations.",
    icon: <FaLaptopCode className="w-5 h-5 text-[#C8A24A]" />,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "strategy",
    title: "Brand Strategy",
    subtitle: "Luxury Authority",
    description: "Elevating digital presence with highly cohesive, high-end design aesthetics.",
    icon: <FaRocket className="w-5 h-5 text-[#C8A24A]" />,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80"
  }
];

// Customizable scroll wheel weight constant for fine-tuning scroll feel
const SCROLL_WHEEL_WEIGHT = 0.9;

export default function App() {
  const [isEntered, setIsEntered] = useState(true);
  const [showGallery3D, setShowGallery3D] = useState(false);
  const [showDigitalWorld, setShowDigitalWorld] = useState(false);
  const [showSeoHub, setShowSeoHub] = useState(false);

  // Custom scrolling hook pointers
  const exploreRef = useRef<HTMLDivElement | null>(null);
  const mainContentRef = useRef<HTMLElement | null>(null);

  // Initialize Lenis smooth scroll engine & synchronize with GSAP ScrollTrigger & Velocity Blur
  useEffect(() => {
    if (!isEntered) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: SCROLL_WHEEL_WEIGHT,
      touchMultiplier: 1,
      infinite: false,
    });

    (window as any).__lenis = lenis;

    // Single RAF loop: Drive Lenis through GSAP's ticker to eliminate duplicate RAF loops
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Velocity-based subtle motion blur during high-speed flick scrolling (tasteful & capped <= 2.5px)
    let currentBlur = 0;
    let targetBlur = 0;
    let blurRafId: number;

    const lerpBlur = () => {
      // Smoothly interpolate current blur towards target
      currentBlur += (targetBlur - currentBlur) * 0.12;

      if (mainContentRef.current) {
        if (currentBlur > 0.05) {
          mainContentRef.current.style.filter = `blur(${currentBlur.toFixed(2)}px)`;
          mainContentRef.current.style.willChange = "filter";
        } else if (mainContentRef.current.style.filter) {
          mainContentRef.current.style.filter = "";
          mainContentRef.current.style.willChange = "";
        }
      }

      // Decay target blur naturally towards 0
      targetBlur *= 0.88;
      if (targetBlur < 0.01) targetBlur = 0;

      blurRafId = requestAnimationFrame(lerpBlur);
    };
    blurRafId = requestAnimationFrame(lerpBlur);

    // Synchronize GSAP ScrollTrigger with Lenis scroll and calculate scroll velocity blur
    const handleScroll = (e: any) => {
      ScrollTrigger.update();

      const absVelocity = Math.abs(e.velocity || 0);
      const velocityThreshold = 1.2;
      if (absVelocity > velocityThreshold) {
        const rawBlur = (absVelocity - velocityThreshold) * 0.08;
        targetBlur = Math.min(2.5, rawBlur);
      }
    };

    lenis.on("scroll", handleScroll);

    return () => {
      gsap.ticker.remove(updateLenis);
      cancelAnimationFrame(blurRafId);
      if (mainContentRef.current) {
        mainContentRef.current.style.filter = "";
      }
      lenis.destroy();
      delete (window as any).__lenis;
    };
  }, [isEntered]);

  const handleScrollToExplore = () => {
    const target = document.querySelector("#projects") || exploreRef.current;
    if (target) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(target, { offset: -60, duration: 1.2 });
      } else if ("scrollIntoView" in target) {
        (target as HTMLElement).scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleEnterWorld = () => {
    setIsEntered(true);
  };

  return (
    <div className="relative min-h-screen bg-[#090909] text-[#F5F2EA] overflow-x-hidden antialiased selection:bg-[#C8A24A]/25 selection:text-[#F5F2EA]">
      
      {/* 3D Immersive Chronicles Gallery View */}
      <AnimatePresence>
        {showGallery3D && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[230]"
          >
            <Suspense fallback={
              <div className="fixed inset-0 bg-[#090909] z-[230] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-2 border-[#C8A24A]/10" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-b-2 border-l-2 border-[#C8A24A]/70 animate-spin" />
                  </div>
                  <p className="font-mono text-[10px] tracking-[0.4em] text-[#C8A24A]/80 uppercase animate-pulse">
                    Summoning 3D Chronicles...
                  </p>
                </div>
              </div>
            }>
              <StellarCardGallerySingle onClose={() => setShowGallery3D(false)} />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 1. Thin Imperial Gold Scroll Progress Bar (Lenis-linked & rendered above everything) */}
      {isEntered && <ScrollProgressBar />}

      {/* Interactive Precision Custom Spotlight Cursor */}
      <CursorGlow />

      {/* Luxury floating brand Header navigation */}
      {isEntered && !showDigitalWorld && !showSeoHub && <Header isEntered={isEntered} />}

      <AnimatePresence mode="wait">
        {showDigitalWorld ? (
          /* 2nd Page: Immersive Digital World Room Dashboard mimicking the exact picture requested */
          <motion.div
            key="digital-world-realm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%" }}
          >
            <Suspense fallback={
              <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-zinc-800" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#C8A24A] animate-spin" />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[#C8A24A]/60 uppercase animate-pulse">
                    Entering Digital World...
                  </p>
                </div>
              </div>
            }>
              <DigitalWorld onBack={() => setShowDigitalWorld(false)} />
            </Suspense>
          </motion.div>
        ) : showSeoHub ? (
          /* 4th Page: SEO & Personal Brand Domination Hub */
          <motion.div
            key="seo-domination-realm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: "100%" }}
          >
            <Suspense fallback={
              <div className="min-h-screen bg-[#070707] flex flex-col items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-zinc-900" />
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#C8A24A] animate-spin" />
                  </div>
                  <p className="font-mono text-[10px] tracking-widest text-[#C8A24A]/60 uppercase animate-pulse">
                    Summoning SEO Domination Engine...
                  </p>
                </div>
              </div>
            }>
              <SeoDominationHub onBack={() => setShowSeoHub(false)} />
            </Suspense>
          </motion.div>
        ) : (
          /* 4. Complete Immersive Millionaire Personal Brand Universe */
          <motion.main
            ref={mainContentRef}
            key="universe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Top-Level Glowing Atmosphere Backdrops (Dynamic light leak details) */}
            <div className="absolute top-0 left-1/3 w-full h-[100vh] bg-gradient-to-b from-[#C8A24A]/[0.015] via-transparent to-transparent pointer-events-none z-[1]" />
            <div className="absolute top-[80vh] right-1/4 w-[350px] h-[350px] bg-[#C8A24A] opacity-5 blur-[120px] rounded-full pointer-events-none" />

            {/* A. Full screen Hero Presentation Layer */}
            <HeroSection onScrollToExplore={handleScrollToExplore} />

            {/* Anchor anchor point to receive smooth scroll targeting */}
            <div ref={exploreRef} id="explore-anchor" className="relative -top-1" />

            {/* Image Text Reveal Scroll Animation Section directly after Hero */}
            <ImageTextReveal />

            {/* C. About/Philosophy Layer */}
            <AboutSection />

            {/* C.1 Selected Work / Featured Projects Case Studies Section */}
            <ProjectsSection />

            {/* C.2 My Plan, My Goal (Top 1% Blueprint) Parallax Layer */}
            <MyPlanSection />

            {/* 3. My Skills Staggered Grid Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative py-12 bg-black border-t border-zinc-900/40 overflow-hidden w-full"
            >
              <div className="w-full max-w-7xl mx-auto relative z-10 px-4 md:px-8">
                <StaggeredGrid 
                  images={SKILL_GRID_IMAGES}
                  bentoItems={SKILL_BENTO_ITEMS}
                  centerText="MY SKILLS"
                  showFooter={false}
                />
              </div>
            </motion.section>

            {/* Spotlight Marquee Section */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <MagneticSpotlightMarquee />
            </motion.div>

            {/* Scroll Morph 3D Hero Gallery Section (Sticky Scroll-Driven Experience) */}
            <section className="relative w-full h-[750px] md:h-[800px] border-y border-zinc-800/80 overflow-hidden">
              <IntroAnimation />
            </section>

            {/* 4. Testimonials Marquee Section ("Trusted by developers worldwide") */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <TestimonialsSectionDemo />
            </motion.div>

            {/* 5. Separate Enter Next Page Section ("Wanna play music?") */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <EnterNextPageSection onEnterDigitalWorld={() => setShowDigitalWorld(true)} />
            </motion.div>

            {/* E. Capital Form & Final Signature Footer */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{ willChange: "transform, opacity" }}
            >
              <FooterSection onOpenSeoHub={() => setShowSeoHub(true)} />
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>

    </div>
  );
}
