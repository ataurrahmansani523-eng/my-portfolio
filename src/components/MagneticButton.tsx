import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  id?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  onMouseEnter,
  id,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  
  // Create continuous motion values for the spring physics
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Spring settings for standard premium heavy metal/fluid "inertia"
  const springX = useSpring(x, { stiffness: 80, damping: 12, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 80, damping: 12, mass: 0.5 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    
    const boundingBox = ref.current.getBoundingClientRect();
    
    // Middle center coordinates of the button
    const absoluteCenterX = boundingBox.left + boundingBox.width / 2;
    const absoluteCenterY = boundingBox.top + boundingBox.height / 2;
    
    // Horizontal and vertical distance from the center of the button to the mouse cursor
    const distanceX = e.clientX - absoluteCenterX;
    const distanceY = e.clientY - absoluteCenterY;
    
    // Magnetic pull distance (typically up to 18px horizontal / vertical max)
    const maxPull = 18;
    const pullX = Math.max(-maxPull, Math.min(maxPull, distanceX * 0.22));
    const pullY = Math.max(-maxPull, Math.min(maxPull, distanceY * 0.22));
    
    x.set(pullX);
    y.set(pullY);
  };
  
  const handleMouseLeave = () => {
    // Reset back to exactly center
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      ref={ref}
      id={id}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={onMouseEnter}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      className={`relative will-change-transform ${className}`}
    >
      {children}
    </motion.button>
  );
}
