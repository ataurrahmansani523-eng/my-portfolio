"use client";
import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
  videoSrc?: string;
  titleTop?: string;
  titleBottom?: string;
  alt?: string;
}
interface Colors {
  name?: string;
  designation?: string;
  testimony?: string;
  arrowBackground?: string;
  arrowForeground?: string;
  arrowHoverBackground?: string;
}
interface FontSizes {
  name?: string;
  designation?: string;
  quote?: string;
}
interface CircularTestimonialsProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  colors?: Colors;
  fontSizes?: FontSizes;
}

function calculateGap(width: number) {
  if (typeof window !== "undefined") {
    if (window.innerWidth >= 1280) {
      return 150; // Spacious 3D offset for XL screens
    }
    if (window.innerWidth >= 1024) {
      return 130; // Spacious 3D offset for LG screens
    }
    if (window.innerWidth >= 768) {
      return 110; // Comfortable offset for MD screens
    }
  }
  return width < 360 ? 80 : 100; // Perfect mobile spacing
}

export const CircularTestimonials = ({
  testimonials,
  autoplay = true,
  colors = {},
  fontSizes = {},
}: CircularTestimonialsProps) => {
  // Color & font config
  const colorName = colors.name ?? "#000";
  const colorDesignation = colors.designation ?? "#6b7280";
  const colorTestimony = colors.testimony ?? "#4b5563";
  const colorArrowBg = colors.arrowBackground ?? "#141414";
  const colorArrowFg = colors.arrowForeground ?? "#f1f1f7";
  const colorArrowHoverBg = colors.arrowHoverBackground ?? "#00a6fb";
  const fontSizeName = fontSizes.name ?? "1.5rem";
  const fontSizeDesignation = fontSizes.designation ?? "0.925rem";
  const fontSizeQuote = fontSizes.quote ?? "1.125rem";

  // State
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsLength = useMemo(() => testimonials.length, [testimonials]);
  const activeTestimonial = useMemo(
    () => testimonials[activeIndex],
    [activeIndex, testimonials]
  );

  // Responsive gap calculation
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayIntervalRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonialsLength);
      }, 6000);
    }
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [autoplay, testimonialsLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, testimonialsLength]);

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  // Compute transforms for each image (always show 3: left, center, right)
  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = typeof window !== "undefined" && window.innerWidth >= 768 ? 20 : 12;
    const offset = (index - activeIndex + testimonialsLength) % testimonialsLength;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.65,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.65,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    // Hide all other images
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transform: `translateX(0px) translateY(0px) scale(0.75) rotateY(0deg)`,
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  // Framer Motion variants for quote
  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full max-w-6xl p-4 md:p-8 bg-transparent">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-28 lg:gap-36 xl:gap-40 items-center">
        {/* Images Container with fixed bounding-box to center fanning nicely */}
        <div 
          className="relative w-full max-w-[280px] xs:max-w-[320px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[340px] mx-auto h-[20rem] xs:h-[24rem] sm:h-[28rem] md:h-[24rem] lg:h-[28rem] [perspective:1000px]" 
          ref={imageContainerRef}
        >
          {testimonials.map((testimonial, index) => {
            const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
            const isRight = (activeIndex + 1) % testimonialsLength === index;
            const isActive = index === activeIndex;

            return (
              <div
                key={index}
                onClick={isLeft ? handlePrev : isRight ? handleNext : undefined}
                className={`absolute w-full h-full rounded-[24px] overflow-hidden shadow-[0_20px_45px_rgba(200,162,74,0.12)] border border-[#C8A24A]/15 bg-zinc-950 transition-all duration-300 ${
                  isLeft || isRight
                    ? "cursor-pointer hover:border-[#C8A24A]/40 hover:brightness-110 active:scale-95"
                    : "cursor-default"
                }`}
                style={getImageStyle(index)}
              >
                {testimonial.videoSrc ? (
                  <video
                    src={testimonial.videoSrc}
                    className="w-full h-full object-cover"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={testimonial.src}
                    alt={testimonial.alt || testimonial.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
                {/* Visual depth of field / glass shadow overlay on left and right background cards */}
                {(isLeft || isRight) && (
                  <div className="absolute inset-0 bg-black/45 backdrop-blur-[0.5px] transition-opacity duration-300 hover:opacity-10 pointer-events-none" />
                )}
              </div>
            );
          })}
        </div>
        {/* Content with additional padding on PC to prevent overlapping with fanned card */}
        <div className="flex flex-col justify-between min-h-[360px] md:min-h-[400px] md:pl-6 lg:pl-10 xl:pl-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              variants={quoteVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Stacked on Mobile, Inline on PC Brutalist Title */}
              <div className="flex flex-col md:flex-row md:items-baseline md:flex-wrap select-none mb-6 gap-x-3">
                <span className="font-serif font-bold text-[1.65rem] xs:text-[2.2rem] sm:text-[3.2rem] md:text-[2.8rem] lg:text-[3.4rem] xl:text-[4rem] tracking-tight leading-[0.9] text-white uppercase break-words">
                  {activeTestimonial.titleTop || activeTestimonial.name}
                </span>
                <span className="font-serif font-bold text-[1.65rem] xs:text-[2.2rem] sm:text-[3.2rem] md:text-[2.8rem] lg:text-[3.4rem] xl:text-[4rem] tracking-tight leading-[0.9] text-zinc-700 uppercase mt-1 md:mt-0 break-words">
                  {activeTestimonial.titleBottom || "CREATOR"}
                </span>
              </div>

              {/* White crisp subtitle / Designation */}
              <h4 className="font-sans font-medium text-base sm:text-lg text-white tracking-normal leading-snug mb-4">
                {activeTestimonial.designation}
              </h4>

              <div className="relative pl-5 py-1.5 border-l border-[#C8A24A]/15 bg-gradient-to-r from-[#C8A24A]/3 to-transparent rounded-r-lg">
                <div className="absolute -left-[3px] top-0 bottom-0 w-[5px] bg-[#C8A24A] rounded-full shadow-[0_0_12px_rgba(200,162,74,0.35)]" />
                <div
                  className="font-sans font-normal leading-relaxed select-text tracking-wide text-zinc-400 text-xs sm:text-sm md:text-base"
                >
                  {activeTestimonial.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{
                        filter: "blur(5px)",
                        opacity: 0,
                        y: 5,
                      }}
                      animate={{
                        filter: "blur(0px)",
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.22,
                        ease: "easeInOut",
                        delay: 0.02 * i,
                      }}
                      className="inline-block mr-[6px]"
                    >
                      {word}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Premium Gold Accent Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800/80 bg-zinc-950/90 text-zinc-400 hover:text-white hover:border-[#C8A24A] hover:bg-[#C8A24A]/10 transition-all duration-300 shadow-md active:scale-95"
              aria-label="Previous card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={handleNext}
              className="group flex items-center justify-center w-12 h-12 rounded-full border border-zinc-800/80 bg-zinc-950/90 text-zinc-400 hover:text-white hover:border-[#C8A24A] hover:bg-[#C8A24A]/10 transition-all duration-300 shadow-md active:scale-95"
              aria-label="Next card"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5 group-hover:translate-x-0.5 transition-transform"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircularTestimonials;
