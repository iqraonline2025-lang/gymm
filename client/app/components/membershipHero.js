"use client";
import React from 'react';

export default function MembershipHero() {
  // A high-impact gym floor or weights image
  const heroImage = "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop";

  return (
    <section className="relative h-[70vh] w-full overflow-hidden bg-black flex items-center">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="IronCore Gym" 
          className="w-full h-full object-cover opacity-50 grayscale hover:scale-105 transition-transform duration-[3000ms]"
        />
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-4xl">
          {/* Accent Badge */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-red-600"></span>
            <p className="text-red-600 font-black uppercase italic tracking-[0.3em] text-xs md:text-sm">
              The Investment
            </p>
          </div>
          
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] text-white mb-8">
            Choose Your <br />
            <span className="text-transparent stroke-text">Warpath</span>
          </h1>
          
          {/* Subtext */}
          <p className="text-zinc-400 text-lg md:text-xl font-medium italic max-w-xl leading-relaxed border-l-2 border-zinc-800 pl-6">
            No contracts. No excuses. Just pure performance. Select the tier that matches your ambition and join the elite.
          </p>
        </div>
      </div>

      {/* Decorative Side Text */}
      <div className="absolute right-10 bottom-20 hidden lg:block rotate-90 origin-right">
        <p className="text-zinc-900 text-9xl font-black uppercase italic tracking-tighter opacity-50 select-none">
          EST. 2026
        </p>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
        }
      `}</style>
    </section>
  );
}