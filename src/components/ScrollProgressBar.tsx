import React, { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateProgress = (progress: number) => {
      if (barRef.current) {
        const clampedProgress = Math.min(Math.max(progress, 0), 1);
        barRef.current.style.transform = `scaleX(${clampedProgress})`;
      }
    };

    // Calculate progress using document scroll geometry as fallback or initial measure
    const calculateFallbackProgress = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        updateProgress(scrollY / docHeight);
      }
    };

    // Initial sync
    calculateFallbackProgress();

    // Check for Lenis instance on window
    const lenis = (window as any).__lenis;

    const handleLenisScroll = (e: { progress?: number }) => {
      if (typeof e.progress === "number") {
        updateProgress(e.progress);
      } else {
        calculateFallbackProgress();
      }
    };

    if (lenis && typeof lenis.on === "function") {
      lenis.on("scroll", handleLenisScroll);
    } else {
      window.addEventListener("scroll", calculateFallbackProgress, { passive: true });
    }

    const handleResize = () => {
      calculateFallbackProgress();
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (lenis && typeof lenis.off === "function") {
        lenis.off("scroll", handleLenisScroll);
      }
      window.removeEventListener("scroll", calculateFallbackProgress);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-[999] pointer-events-none overflow-hidden bg-transparent select-none"
    >
      <div
        ref={barRef}
        style={{
          transform: "scaleX(0)",
          transformOrigin: "0% 50%",
          willChange: "transform",
        }}
        className="w-full h-full bg-gradient-to-r from-[#C8A24A] via-[#E5C060] to-[#C8A24A] shadow-[0_0_10px_rgba(200,162,74,0.6),0_0_3px_rgba(229,192,96,0.8)]"
      />
    </div>
  );
}
