import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { TextGlitch } from "@/components/ui/text-glitch-effect";
import { Target } from "lucide-react";

export default function MyPlanSection() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const videoWrapperRef = useRef<HTMLDivElement | null>(null);
  const isVideoInView = useInView(videoWrapperRef, { amount: 0.2 });

  // Array of video URLs to play sequentially
  const playlistVideos = [
    "https://i.imgur.com/HNbIWSD.mp4",
    "https://i.imgur.com/meJNKhL.mp4",
    "https://i.imgur.com/L9iYEP6.mp4",
    "https://i.imgur.com/XLbbXgl.mp4"
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleVideoEnded = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlistVideos.length);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoInView) {
      // Unmute and play when in view
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.log("Unmuted play blocked by browser policy, attempting muted play as fallback:", err);
          // Browser autoplay policy might require interaction first, fall back to muted play if needed
          video.muted = true;
          video.play().catch((e) => console.log("Muted fallback play failed too:", e));
        });
      }
    } else {
      // Mute and pause when scrolled away
      video.muted = true;
      video.pause();
    }
  }, [isVideoInView, currentVideoIndex]);

  // 8 Curated high-fidelity luxury, focus, and performance images for the ZoomParallax scroll sequence
  const parallaxImages = [
    {
      src: "https://i.imgur.com/gXuSIMa.jpeg",
      alt: "Visionary Roadmap & Elite Focus",
    },
    {
      src: "https://i.imgur.com/FMlYt5o.jpeg",
      alt: "Sovereign Lifestyle & Global Network",
    },
    {
      src: "https://i.imgur.com/7Q3oTqY.jpeg",
      alt: "Next-Gen Strategic Operations",
    },
    {
      src: "https://i.imgur.com/eJ0ywK5.jpeg",
      alt: "Deep Execution & Code Mastery",
    },
    {
      src: "https://i.imgur.com/7HifJHt.jpeg",
      alt: "Systemic Wealth and Abundance",
    },
    {
      src: "https://i.imgur.com/wlwZEZr.jpeg",
      alt: "Apex High Performance Peak State",
    },
    {
      src: "https://i.imgur.com/X2WcDUt.jpeg",
      alt: "Elite Mindset & Mental Fortitude",
    },
    {
      src: "https://i.imgur.com/giVobXA.jpeg",
      alt: "Legacy Empire Build & Empire Scale",
    },
  ];

  return (
    <section
      id="my-plan"
      ref={containerRef}
      className="relative bg-black text-white overflow-hidden pt-16 pb-0 border-t border-zinc-900"
    >
      {/* Exquisite golden radial light glows to draw high-end contrast */}
      <div className="absolute top-10 left-1/4 w-[380px] h-[380px] bg-[#C8A24A]/4 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[420px] h-[420px] bg-[#C8A24A]/3 blur-[160px] rounded-full pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-6 md:px-12 z-10 relative">
        {/* Section title header */}
        <div className="flex flex-col items-center text-center gap-4 mb-16 border-b border-zinc-900 pb-10">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.02 }}
            className="text-3xl md:text-5xl font-serif font-light tracking-widest text-zinc-100 uppercase"
          >
            MY PLAN, MY GOAL
          </motion.h2>
        </div>
      </div>

      {/* 1. IMMERSIVE ZOOM PARALLAX VIEWPORT */}
      <div className="relative w-full z-10 mt-4 mb-0 select-none">
        <ZoomParallax images={parallaxImages} />
      </div>

      {/* 2. CINEMATIC VIDEO BLUEPRINT SHOWCASE (Pictures after / Niche Section) */}
      <div className="relative w-full z-20 pb-24 pt-12 md:pt-20 px-6 md:px-12 bg-gradient-to-b from-black via-zinc-950 to-black -mt-8 md:-mt-12">
        <div className="max-w-5xl mx-auto">
          {/* Elite Mindset Motivational Statement with TextGlitch Effect */}
          <div className="text-center mb-14 max-w-4xl mx-auto flex flex-col items-center gap-3">
            <TextGlitch
              text="I AM THE BEST"
              hoverText="YOU CANNOT BEAT ME"
              className="text-3xl sm:text-5xl md:text-6xl text-center items-center justify-center border-none"
              delay={0.1}
            />
            <TextGlitch
              text="YOU CANNOT BEAT ME"
              hoverText="I AM GOING TO THE TOP 1%"
              className="text-2xl sm:text-4xl md:text-5xl text-center items-center justify-center border-none text-[#C8A24A]/40"
              delay={0.25}
            />
            <TextGlitch
              text="I AM GOING TO THE TOP 1%"
              hoverText="TOP 1% BLUEPRINT"
              className="text-xl sm:text-3xl md:text-4xl text-center items-center justify-center border-none"
              delay={0.4}
            />
          </div>

          {/* Majestic video frame preserving exact aspect ratio */}
          <div ref={videoWrapperRef} className="relative w-full aspect-video rounded-2xl overflow-hidden border border-zinc-800 bg-black shadow-[0_25px_60px_rgba(0,0,0,0.9)] group">
            {/* Ambient gold glow leak behind the frame */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#C8A24A]/20 via-[#C8A24A]/5 to-[#C8A24A]/20 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-700 pointer-events-none" />

            {/* Core HTML5 Video Element playing the playlist sequentially */}
            <video
              ref={videoRef}
              src={playlistVideos[currentVideoIndex]}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnded}
              className="relative w-full h-full object-cover transition-all duration-500 ease-out z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
