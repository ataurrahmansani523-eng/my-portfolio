import React from "react";
import { motion } from "motion/react";
import { Play } from "lucide-react";
import { playSoftClick } from "../utils/audio";
import LiquidMetalButton from "./ui/LiquidMetalButton";

interface EnterNextPageSectionProps {
  onEnterDigitalWorld?: () => void;
}

export default function EnterNextPageSection({ onEnterDigitalWorld }: EnterNextPageSectionProps) {
  return (
    <section 
      id="enter-next-page" 
      className="relative w-full py-28 px-4 sm:px-8 select-none overflow-hidden border-t border-b border-zinc-900/60 bg-[#090909]"
    >
      {/* Decorative center gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#C8A24A]/[0.03] blur-[100px] rounded-full pointer-events-none z-10" />

      {/* Centered glass-screen interface content */}
      <div className="relative z-20 w-full max-w-4xl mx-auto flex flex-col items-center justify-center text-center">
        
        {/* Dynamic & Centered Title Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.1 }}
          className="space-y-4 mb-10 max-w-2xl"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light tracking-[0.15em] text-[#F5F2EA] uppercase leading-none">
            Wanna play <span className="text-[#C8A24A] font-medium font-serif">music?</span>
          </h2>
        </motion.div>

        {/* Beautiful Centered Button Container with subtle corner embellishments */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="w-full max-w-sm relative px-6 py-8 rounded-xl border border-white/[0.03] bg-black/20 backdrop-blur-md"
        >
          {/* Micro Corner Highlights */}
          <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#C8A24A]/20" />
          <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#C8A24A]/20" />
          <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#C8A24A]/20" />
          <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#C8A24A]/20" />

          <div className="flex flex-col items-center justify-center space-y-4 w-full">
            <LiquidMetalButton
              size="lg"
              borderWidth={3}
              metalConfig={{
                colorBack: "#C8A24A",
                colorTint: "#F5F2EA",
                speed: 0.6,
                repetition: 5,
                distortion: 0.18,
                scale: 1,
              }}
              onClick={() => {
                playSoftClick();
                onEnterDigitalWorld?.();
              }}
              icon={<Play size={14} fill="currentColor" className="text-zinc-300 dark:text-zinc-400 group-hover:scale-110 transition-transform" />}
              id="play-music-realm-btn"
              className="w-full font-sans font-bold tracking-[0.2em] text-xs uppercase"
            >
              PLAY MUSIC
            </LiquidMetalButton>
          </div>
        </motion.div>

      </div>
    </section>
  );
}


