"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface ScrollChoreographyProps {
  className?: string;
  images: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

export function ScrollChoreography({
  className,
  images,
}: ScrollChoreographyProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Initial quadrant coordinate offsets relative to center
  const xLeft = "-24vw";
  const xRight = "24vw";
  const yTop = "-18vh";
  const yBottom = "18vh";

  // Phase 1 (0.0 -> 0.70): 4 Cards animate from corners and converge smoothly to center
  // Phase 2 (0.70 -> 1.00): Animation finishes and locks in place cleanly until scroll leaves section

  // Top Left Card
  const tlX = useTransform(scrollYProgress, [0, 0.65, 1], [xLeft, "-3vw", "-3vw"]);
  const tlY = useTransform(scrollYProgress, [0, 0.65, 1], [yTop, "-3vh", "-3vh"]);
  const tlRotate = useTransform(scrollYProgress, [0, 0.65, 1], [-8, -4, -4]);
  const tlScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.95, 1.02, 1.02]);

  // Bottom Right Card
  const brX = useTransform(scrollYProgress, [0, 0.65, 1], [xRight, "4vw", "4vw"]);
  const brY = useTransform(scrollYProgress, [0, 0.65, 1], [yBottom, "4vh", "4vh"]);
  const brRotate = useTransform(scrollYProgress, [0, 0.65, 1], [8, 5, 5]);
  const brScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.95, 1.02, 1.02]);

  // Bottom Left Card
  const blX = useTransform(scrollYProgress, [0, 0.65, 1], [xLeft, "-4vw", "-4vw"]);
  const blY = useTransform(scrollYProgress, [0, 0.65, 1], [yBottom, "3vh", "3vh"]);
  const blRotate = useTransform(scrollYProgress, [0, 0.65, 1], [-5, -2, -2]);
  const blScale = useTransform(scrollYProgress, [0, 0.65, 1], [0.95, 0.98, 0.98]);

  // Top Right Card
  const trX = useTransform(scrollYProgress, [0, 0.65, 1], [xRight, "0vw", "0vw"]);
  const trY = useTransform(scrollYProgress, [0, 0.65, 1], [yTop, "0vh", "0vh"]);
  const trRotate = useTransform(scrollYProgress, [0, 0.65, 1], [6, 0, 0]);
  const trScale = useTransform(scrollYProgress, [0, 0.65, 1], [1, 1.08, 1.08]);

  const baseCardClasses =
    "absolute left-1/2 top-1/2 w-[42vw] sm:w-[32vw] md:w-[28vw] lg:w-[24vw] h-[22vh] sm:h-[26vh] md:h-[30vh] max-w-[420px] max-h-[300px] overflow-hidden -translate-x-1/2 -translate-y-1/2 bg-zinc-950 border border-white/15 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.85)] will-change-transform backdrop-blur-md";

  return (
    <div ref={containerRef} className={cn("relative h-[250vh] w-full bg-[#050505]", className)}>
      {/* Sticky Viewport Container that stays pinned while scrolling */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center pointer-events-none">
        
        {/* Subtle Ambient Center Glow */}
        <div className="absolute w-[500px] h-[500px] bg-[#C8A24A]/[0.04] blur-[140px] rounded-full pointer-events-none" />

        {/* 1. Top Left Card */}
        <motion.div
          style={{
            x: tlX,
            y: tlY,
            rotate: tlRotate,
            scale: tlScale,
          }}
          className={cn(baseCardClasses, "z-10")}
        >
          <img
            src={images.topLeft}
            alt="About Choreography 1"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 2. Bottom Left Card */}
        <motion.div
          style={{
            x: blX,
            y: blY,
            rotate: blRotate,
            scale: blScale,
          }}
          className={cn(baseCardClasses, "z-20")}
        >
          <img
            src={images.bottomLeft}
            alt="About Choreography 2"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 3. Bottom Right Card */}
        <motion.div
          style={{
            x: brX,
            y: brY,
            rotate: brRotate,
            scale: brScale,
          }}
          className={cn(baseCardClasses, "z-30")}
        >
          <img
            src={images.bottomRight}
            alt="About Choreography 3"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        </motion.div>

        {/* 4. Top Right Card (Top Layer Center) */}
        <motion.div
          style={{
            x: trX,
            y: trY,
            rotate: trRotate,
            scale: trScale,
          }}
          className={cn(baseCardClasses, "z-40 border-[#C8A24A]/25")}
        >
          <img
            src={images.topRight}
            alt="About Choreography 4"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover brightness-95 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
        </motion.div>

      </div>
    </div>
  );
}

export default ScrollChoreography;


