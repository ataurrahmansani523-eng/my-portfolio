"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticSpotlightMarqueeProps {
  className?: string;
  title?: string[];
  subtitle?: string[];
  paragraphs?: string[][];
  navEmail?: string;
  navLinks?: string;
  footerText?: string;
}

const config = {
  stripFollowEase: 0.05,
  stripEdgeInset: 175,
  contentRiseRate: 0.85,
  risenTopGap: 100,
  liftHeadStart: 125,
  wakeStrength: 2.5,
  wakeReach: 125,
  lineSettleEase: 0.09,
};

const DEFAULT_TITLE = ["SANI", "STUDIO"];
const DEFAULT_SUBTITLE = ["CREATIVE CODING", "CINEMATIC DESIGN"];
const DEFAULT_PARAGRAPHS = [
  [
    "Ataur Rahman Sani is an elite software engineer,",
    "creative director, and YouTube tech content creator",
    "pioneering ultra-luxury immersive web platforms.",
  ],
  [
    "We synthesize pure mathematics and cinematic code.",
    "Our interactive applications bridge high-fidelity design,",
    "intelligent user interfaces, and robust systems.",
    "Tailored specifically to solve non-trivial digital challenges",
    "with pixel-perfect precision and fluid feedback loops."
  ]
];

export function MagneticSpotlightMarquee({
  className,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  paragraphs = DEFAULT_PARAGRAPHS,
  navEmail = "ataurrahmansani523@gmail.com",
  navLinks = "SOFTWARE ENGINEER • WEB DEVELOPER • YOUTUBER • SCRIPT WRITER",
  footerText = "We navigate in no-nonsense environments pushing the boundaries of web design and interactive media development. Whether building next-gen digital systems, luxury audio suites, or bespoke AI workflows, Ataur Rahman Sani is your elite partner in digital innovation.",
}: MagneticSpotlightMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // Dynamic wake effect logic responding to cursor movement
  useEffect(() => {
    if (!containerRef.current || !contentWrapperRef.current) return;

    const spotlightSection = containerRef.current;

    let sectionHeight = 0;
    let stripRestCenterY = 0;
    let contentTopAtRest = 0;

    let stripTargetY = 0;
    let stripCurrentY = 0;
    let stripPrevY = 0;
    let hasPointerMoved = false;

    let targets: { el: HTMLElement; restCenterY: number; currentY: number }[] = [];
    let rafId: number;

    const measureGeometry = () => {
      sectionHeight = spotlightSection.getBoundingClientRect().height;
      stripRestCenterY = config.stripEdgeInset;
      
      const elements = Array.from(spotlightSection.querySelectorAll('.wake-target')) as HTMLElement[];
      
      let blockTop = Infinity;
      targets = elements.map(el => {
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== spotlightSection) {
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement;
        }
        const restCenterY = y + el.offsetHeight / 2;
        blockTop = Math.min(blockTop, restCenterY - el.offsetHeight / 2);
        
        return {
          el,
          restCenterY,
          currentY: 0
        };
      });

      contentTopAtRest = isFinite(blockTop) ? blockTop : sectionHeight * 0.4;
      
      if (!hasPointerMoved) {
        const restY = config.stripEdgeInset;
        stripTargetY = restY;
        stripCurrentY = restY;
        stripPrevY = restY;
      }
    };

    setTimeout(measureGeometry, 100);
    window.addEventListener('resize', measureGeometry);

    const handlePointerMove = (e: MouseEvent) => {
      hasPointerMoved = true;
      const rect = spotlightSection.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      stripTargetY = pointerY;
    };

    const handlePointerLeave = () => {
      hasPointerMoved = false;
      stripTargetY = config.stripEdgeInset;
    };

    spotlightSection.addEventListener('mousemove', handlePointerMove);
    spotlightSection.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;

      const stripCenterY = stripCurrentY;
      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;

      const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
      const maxRise = Math.max(0, contentTopAtRest - config.risenTopGap);
      const contentRise = -Math.min(
        descentBelowRest * config.contentRiseRate,
        maxRise
      );

      targets.forEach(line => {
        const gapToStrip = line.restCenterY - stripCenterY;
        const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;
        
        const wakeInfluence = Math.exp(
          -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
        );
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });
      });

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', measureGeometry);
      spotlightSection.removeEventListener('mousemove', handlePointerMove);
      spotlightSection.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "spotlight relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-black text-white font-sans select-none",
        className
      )}
    >
      {/* Top Nav - Centered layout */}
      <div className="absolute top-0 left-0 w-full p-6 flex flex-col items-center justify-center z-50 text-[10px] md:text-xs font-medium tracking-wide opacity-90 mix-blend-difference pointer-events-none">
        <div>{navEmail}</div>
        <div>{navLinks}</div>
      </div>

      {/* Main Content Layout */}
      <div 
        ref={contentWrapperRef}
        className="spotlight-content-wrapper relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-difference"
      >
        {/* Title */}
        <h1 
          className="text-[15vw] md:text-[12rem] font-serif font-normal leading-[0.85] tracking-tighter mb-20 text-center flex flex-col items-center"
        >
          {title.map((line, idx) => (
            <div key={idx} className="wake-target inline-block relative">
              {line}
              {/* Playful dot for 'Studio' */}
              {line === "Studio" && (
                <span className="absolute right-[0.45em] top-[0.1em] w-[0.25em] h-[0.25em] bg-white rounded-full"></span>
              )}
            </div>
          ))}
        </h1>
        
        {/* Subtitle & Paragraphs row */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mt-8 px-4 md:px-8 gap-8 md:gap-4">
          
          {/* Subtitle / Header (Left side) */}
          <div className="flex-1 md:max-w-[280px] text-right md:text-right mt-1">
            <h3 className="text-xl md:text-3xl uppercase tracking-tight font-medium leading-[1.1]">
              {subtitle.map((line, idx) => (
                <div key={idx} className="wake-target">{line}</div>
              ))}
            </h3>
          </div>

          {/* Paragraphs (Right side) */}
          <div className="flex-1 flex flex-col sm:flex-row gap-6 md:gap-12 text-[10px] md:text-xs leading-[1.6]">
            {paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="flex-1 flex flex-col">
                {para.map((line, lIdx) => (
                  <div key={lIdx} className="wake-target whitespace-nowrap">
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-40 flex justify-center pointer-events-none mix-blend-difference">
        <p className="text-[8px] md:text-[10px] text-white/70 max-w-2xl text-center leading-[1.6]">
          {footerText}
        </p>
      </div>
    </section>
  );
}

export default MagneticSpotlightMarquee;
