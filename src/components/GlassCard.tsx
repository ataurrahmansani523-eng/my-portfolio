import React from "react";

interface GlassCardProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  glowOnHover?: boolean;
}

export default function GlassCard({ id, className = "", children, glowOnHover = true }: GlassCardProps) {
  return (
    <div
      id={id}
      className={`relative overflow-hidden rounded-2xl bg-white/[0.03] md:bg-white/[0.04] backdrop-blur-2xl border border-white/10 hover:border-amber-500/40 transition-all duration-700 ease-out p-6 md:p-8 group ${
        glowOnHover
          ? "hover:bg-white/[0.06] hover:shadow-[0_0_40px_rgba(212,175,55,0.08)] hover:-translate-y-1"
          : ""
      } ${className}`}
    >
      {/* Intricate subtle gold corner highlight */}
      <span className="absolute top-0 left-0 w-[1.5px] h-0 bg-gradient-to-b from-amber-400 to-transparent group-hover:h-full transition-all duration-700 pointer-events-none" />
      <span className="absolute top-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-amber-400 to-transparent group-hover:w-full transition-all duration-700 pointer-events-none" />
      
      {/* Background warm radial light beam inside card */}
      <div className="absolute inset-0 bg-radial-gradient(150px_circle_at_var(--mouse-x,0px)_var(--mouse-y,0px),rgba(212,175,55,0.06),transparent_80%) opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Decorative content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
