import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ArrowUpRight, Sparkles } from "lucide-react";
import { playSoftClick } from "../utils/audio";
import Magnetic from "./Magnetic";

interface HeaderProps {
  isEntered: boolean;
}

export default function Header({ isEntered }: HeaderProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scroll for updating active navigation section and hero header appearance
  useEffect(() => {
    if (!isEntered) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setIsScrolled(currentScroll > 40);

      // Hero check: if near the top, always mark "home" as active
      if (currentScroll < 200) {
        setActiveSection("home");
        return;
      }

      const sections = ["hero", "about", "projects", "system", "contact"];
      const scrollPos = currentScroll + window.innerHeight * 0.35;

      for (let i = 0; i < sections.length; i++) {
        const id = sections[i];
        
        // Map alias sections
        if (id === "system") {
          const myPlanEl = document.getElementById("my-plan");
          const galleryEl = document.getElementById("gallery");
          const enterNextPageEl = document.getElementById("enter-next-page");
          
          let isInSystem = false;
          if (myPlanEl) {
            const top = myPlanEl.offsetTop;
            const height = myPlanEl.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              isInSystem = true;
            }
          }
          if (!isInSystem && galleryEl) {
            const top = galleryEl.offsetTop;
            const height = galleryEl.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              isInSystem = true;
            }
          }
          if (!isInSystem && enterNextPageEl) {
            const top = enterNextPageEl.offsetTop;
            const height = enterNextPageEl.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              isInSystem = true;
            }
          }
          
          if (isInSystem) {
            setActiveSection(id);
            break;
          }
          continue;
        }
        
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }

      // Also highlight "about" when in achievements section
      const achievementsEl = document.getElementById("achievements");
      if (achievementsEl) {
        const top = achievementsEl.offsetTop;
        const height = achievementsEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          setActiveSection("about");
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isEntered]);

  if (!isEntered) return null;

  const navLinks = [
    { label: "Home", id: "home", href: "#hero" },
    { label: "About", id: "about", href: "#about" },
    { label: "Work", id: "projects", href: "#projects" },
    { label: "Features", id: "system", href: "#my-plan" },
    { label: "Contact", id: "contact", href: "#contact" },
  ];

  const handleLinkClick = (id: string, href: string) => {
    playSoftClick();
    setIsMobileMenuOpen(false);
    setActiveSection(id);

    if (id === "home") {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
      return;
    }

    const targetSection = document.querySelector(href);
    if (targetSection) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(targetSection, { offset: -60, duration: 1.2 });
      } else {
        const topOffset = targetSection.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }
    }
  };

  const handleTalkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    playSoftClick();
    setIsMobileMenuOpen(false);
    setActiveSection("contact");

    const contactSection = document.getElementById("contact") || document.querySelector("#contact");
    if (contactSection) {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(contactSection, { offset: -60, duration: 1.2 });
      } else {
        const topOffset = contactSection.getBoundingClientRect().top + window.scrollY - 60;
        window.scrollTo({ top: topOffset, behavior: "smooth" });
      }

      // Smooth focus on the name input field in the contact form
      setTimeout(() => {
        const nameInput = document.querySelector('input[name="name"]') as HTMLInputElement | null;
        if (nameInput) {
          nameInput.focus({ preventScroll: true });
        }
      }, 700);
    }
  };

  return (
    <>
      <header
        role="banner"
        className="fixed top-4 sm:top-5 left-0 right-0 z-[200] flex justify-center px-4 sm:px-6 pointer-events-none select-none transition-all duration-300"
      >
        <div 
          className={`relative w-full max-w-4xl pointer-events-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-2xl border transition-all duration-300 ${
            isScrolled
              ? "bg-[#0d0c15]/90 backdrop-blur-2xl border-white/[0.08] shadow-[0_16px_45px_rgba(0,0,0,0.75)]"
              : "bg-[#0d0c15]/75 backdrop-blur-xl border-white/[0.06] shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          }`}
        >
          
          {/* Subtle purple electric ambient glow through the center bar matching image */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none -z-10">
            <div className="absolute top-1/2 left-2/3 -translate-x-1/2 -translate-y-1/2 w-64 h-24 bg-purple-600/15 blur-2xl rounded-full" />
            <div className="absolute -top-6 right-1/3 w-32 h-16 bg-purple-500/20 blur-xl rounded-full" />
          </div>

          {/* LEFT: React-Bits Style Atom Logo + Brand Name */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleLinkClick("home", "#hero");
            }}
            className="flex items-center gap-2.5 text-white group cursor-pointer transition-transform duration-200 active:scale-95 focus:outline-none"
            aria-label="Home - Ataur Rahman Sani Portfolio"
          >
            <div className="relative flex items-center justify-center text-white w-7 h-7">
              {/* React Bits orbital atom icon */}
              <svg
                className="w-6 h-6 transition-transform duration-700 ease-out group-hover:rotate-180 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="2" fill="currentColor" />
                <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(30 12 12)" />
                <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(90 12 12)" />
                <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(150 12 12)" />
              </svg>
            </div>
            <span className="font-sans font-semibold text-white text-[15px] sm:text-base tracking-tight">
              Sani
            </span>
          </a>

          {/* RIGHT: Navigation Links + Ultra-Premium Let's Talk Button */}
          <div className="hidden md:flex items-center gap-6">
            <nav aria-label="Primary Navigation" className="flex items-center gap-5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id, link.href);
                    }}
                    className={`text-sm font-medium transition-colors duration-200 cursor-pointer ${
                      isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Clean & Sleek Premium Let's Talk CTA Button */}
            <a
              id="header-lets-talk-btn"
              href="#contact"
              onClick={handleTalkClick}
              aria-label="Let's Talk - Contact Ataur Rahman Sani"
              className="group inline-flex items-center gap-2 bg-white text-zinc-950 font-semibold text-xs sm:text-sm px-4 sm:px-4.5 py-1.5 sm:py-2 rounded-full hover:bg-zinc-100 hover:shadow-sm hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-zinc-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* MOBILE HAMBURGER & COMPACT TALK BUTTON */}
          <div className="flex md:hidden items-center gap-2">
            <a
              id="mobile-header-lets-talk-btn"
              href="#contact"
              onClick={handleTalkClick}
              className="inline-flex items-center gap-1 bg-white text-zinc-950 font-semibold text-xs px-3 py-1.5 rounded-full hover:bg-zinc-100 active:scale-95 transition-all"
            >
              <span>Talk</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-600" />
            </a>
            <button
              onClick={() => {
                playSoftClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="w-9 h-9 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

        </div>
      </header>

      {/* MOBILE POPUP MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="fixed top-20 left-4 right-4 z-[195] md:hidden bg-[#0d0c15]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-5 shadow-2xl flex flex-col gap-3"
            role="dialog"
            aria-label="Mobile Navigation Menu"
          >
            <nav aria-label="Mobile Navigation" className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.id, link.href);
                    }}
                    className={`text-left text-sm font-medium py-2.5 px-3 rounded-xl transition-all ${
                      isActive 
                        ? "text-white bg-white/10" 
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>
            <div className="pt-2 border-t border-white/10">
              <a
                href="#contact"
                onClick={handleTalkClick}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white text-zinc-950 font-semibold text-sm hover:bg-zinc-100 transition-colors text-center"
              >
                <span>Let's Talk</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-700" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
