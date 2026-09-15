'use client';

import React from 'react';
import ImageTextReveal from '@/components/ui/imgtext-reveal-scroll-animation';

export default function ImageTextRevealDemo() {
  return (
    <div className="min-h-screen w-full bg-white text-zinc-900 font-sans selection:bg-black selection:text-white">
      {/* 1. INTRO SECTION */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center text-center px-6 sm:px-16 md:px-28 lg:px-44 xl:px-60">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block">
            [ SECTION 01 // INTRO ]
          </span>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
            Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor.
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-zinc-500 font-normal leading-relaxed max-w-3xl mx-auto">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat.
          </p>
        </div>
      </section>

      {/* 2. CENTER ANIMATION SECTION */}
      <ImageTextReveal />

      {/* 3. OUTRO SECTION */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center text-center px-6 sm:px-16 md:px-28 lg:px-44 xl:px-60">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-mono tracking-widest text-zinc-400 uppercase block">
            [ SECTION 02 // OUTRO ]
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.
          </h2>

          <p className="text-base sm:text-xl md:text-2xl text-zinc-500 font-normal leading-relaxed max-w-3xl mx-auto">
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit sed quia consequuntur magni dolores eos.
          </p>
        </div>
      </section>
    </div>
  );
}
