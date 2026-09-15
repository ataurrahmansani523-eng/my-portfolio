'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface RevealLine {
  id?: string;
  prefix?: string;
  image?: string;
  alt?: string;
  suffix?: string;
  fullText?: string;
}

export interface ImageTextRevealProps {
  lines?: RevealLine[];
  revealWidthDesktop?: number;
  revealWidthMobile?: number;
  floatingWidth?: number;
  floatingHeight?: number;
  className?: string;
  textClassName?: string;
}

const DEFAULT_LINES: RevealLine[] = [
  {
    prefix: 'I',
    image:
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80',
    alt: 'I Create',
    suffix: 'CREATE',
  },
  {
    prefix: 'WEB',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
    alt: 'Web Experiences',
    suffix: 'EXPERIENCES',
  },
  {
    prefix: 'WITH',
    image:
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    alt: 'Code Architecture',
    suffix: 'CODE,',
  },
  {
    prefix: 'AI &',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    alt: 'AI & Creativity',
    suffix: 'CREATIVITY.',
  },
];

export const ImageTextReveal: React.FC<ImageTextRevealProps> = ({
  lines = DEFAULT_LINES,
  revealWidthDesktop = 300,
  revealWidthMobile = 110,
  className = '',
  textClassName = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseImgRef = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const lineElements = containerRef.current.querySelectorAll('.reveal-line');
    const isMobile = window.innerWidth < 768;
    const revealWidth = isMobile ? revealWidthMobile : revealWidthDesktop;

    const anims: gsap.core.Tween[] = [];

    lineElements.forEach((line) => {
      const imgSpan = line.querySelector('.img-reveal-span');
      if (imgSpan) {
        const anim = gsap.to(imgSpan, {
          width: revealWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: line,
            start: 'top 85%',
            end: 'top 40%',
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
        anims.push(anim);
      }
    });

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const moveMouse = (e: MouseEvent) => {
      if (mouseImgRef.current) {
        gsap.to(mouseImgRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.5,
          ease: 'power3.out',
        });
      }
    };

    window.addEventListener('mousemove', moveMouse);

    return () => {
      clearTimeout(refreshTimer);
      window.removeEventListener('mousemove', moveMouse);
      anims.forEach((a) => {
        if (a.scrollTrigger) a.scrollTrigger.kill();
        a.kill();
      });
    };
  }, [revealWidthDesktop, revealWidthMobile]);

  const defaultTextClass =
    'text-[clamp(2.2rem,7.5vw,7.5rem)] font-black tracking-tighter leading-none whitespace-nowrap uppercase select-none text-[#F5F2EA] hover:text-white transition-colors duration-200';

  const combinedTextClass = textClassName
    ? `${defaultTextClass} ${textClassName}`
    : defaultTextClass;

  const fallbackFirstImage = lines.find((l) => l.image)?.image || '';

  return (
    <div
      className={`relative w-full bg-[#090909] text-[#F5F2EA] overflow-x-hidden selection:bg-[#C8A24A]/30 selection:text-white cursor-default py-24 md:py-36 border-t border-b border-zinc-900/80 ${className}`}
    >
      {/* FLOATING IMAGE FOLLOWER */}
      <div
        ref={mouseImgRef}
        className={`fixed top-0 left-0 
          w-[280px] h-[190px]          
          md:w-[500px] md:h-[330px]    
          pointer-events-none z-[999] overflow-hidden rounded-2xl 
          transition-all duration-300 -translate-x-1/2 -translate-y-1/2 
          shadow-[0_30px_70px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/15 bg-zinc-900
          ${activeImage ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}
      >
        <img
          src={activeImage || fallbackFirstImage}
          className="w-full h-full object-cover"
          alt="preview follower"
        />
      </div>

      {/* TEXT LINES CONTAINER */}
      <div
        ref={containerRef}
        className="w-full flex flex-col justify-center items-center space-y-3 md:space-y-6 px-0"
      >
        {lines.map((line, idx) => {
          if (line.fullText) {
            return (
              <div
                key={line.id || `line-${idx}`}
                className="reveal-line flex justify-center items-center"
              >
                <span className={combinedTextClass}>{line.fullText}</span>
              </div>
            );
          }

          return (
            <div
              key={line.id || `line-${idx}`}
              className="reveal-line flex justify-center items-center gap-2 md:gap-6 flex-wrap md:flex-nowrap"
            >
              {line.prefix && (
                <span className={combinedTextClass}>{line.prefix}</span>
              )}

              {line.image && (
                <span
                  onMouseEnter={() => setActiveImage(line.image!)}
                  onMouseLeave={() => setActiveImage(null)}
                  className="img-reveal-span h-11 md:h-24 w-0 rounded-md md:rounded-2xl overflow-hidden relative bg-zinc-900 cursor-pointer shadow-inner shrink-0 border border-white/15"
                >
                  <img
                    src={line.image}
                    alt={line.alt || 'reveal visual'}
                    className="h-full w-full object-cover opacity-85 hover:opacity-100 transition-opacity duration-300"
                  />
                </span>
              )}

              {line.suffix && (
                <span className={combinedTextClass}>{line.suffix}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageTextReveal;
