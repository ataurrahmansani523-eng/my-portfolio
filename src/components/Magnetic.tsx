import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  range?: number;
  strength?: number;
}

export default function Magnetic({
  children,
  className = "",
  range = 65,
  strength = 0.32,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Continuous motion values for smooth physics transitions
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Fluid springs matching premium inertia curves
  const springX = useSpring(x, { stiffness: 85, damping: 13, mass: 0.55 });
  const springY = useSpring(y, { stiffness: 85, damping: 13, mass: 0.55 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const boundingBox = ref.current.getBoundingClientRect();
    
    // Middle center coordinates of the interactive bounding area
    const centerX = boundingBox.left + boundingBox.width / 2;
    const centerY = boundingBox.top + boundingBox.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate total geometric hyp distance
    const dist = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    if (dist < range) {
      // Gravitate toward mouse coordinates with proportional strength
      x.set(distanceX * strength);
      y.set(distanceY * strength);
    } else {
      // Revert back silently to initial center coordinates
      x.set(0);
      y.set(0);
    }
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}
