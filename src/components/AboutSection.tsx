import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ScrollChoreography } from "@/components/ui/scroll-choreography";

const images = {
  topLeft: "https://images.unsplash.com/photo-1741454570867-4a10f31fc5e3?q=100&w=2832&fm=webp&auto=format&fit=crop",
  topRight: "https://images.unsplash.com/photo-1755456068400-fbcdce2f795a?q=100&w=2832&fm=webp&auto=format&fit=crop",
  bottomLeft: "https://images.unsplash.com/photo-1755456068249-13d384440902?q=100&w=2832&fm=webp&auto=format&fit=crop",
  bottomRight: "https://images.unsplash.com/photo-1741454570904-a22d9d6ea511?q=100&w=2832&fm=webp&auto=format&fit=crop",
};

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const ambientY1 = useTransform(scrollYProgress, [0, 1], [-60, 60]);
  const ambientY2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} id="about" className="relative w-full bg-black overflow-hidden">
      {/* Subtle parallax ambient background glow elements */}
      <motion.div
        style={{ y: ambientY1 }}
        className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-[#C8A24A]/5 blur-[150px] rounded-full pointer-events-none -z-10"
      />
      <motion.div
        style={{ y: ambientY2 }}
        className="absolute bottom-1/4 right-1/5 w-[450px] h-[450px] bg-[#C8A24A]/4 blur-[130px] rounded-full pointer-events-none -z-10"
      />
      <ScrollChoreography images={images} />
    </section>
  );
}

