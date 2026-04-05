"use client";
import React from 'react';

export default function ScheduleHero() {
  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image with Heavy Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background"
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      </div>

      {/* Tactical Grid Overlay */}
      <div className="absolute inset-0 z-10 opacity-10" 
           style={{ backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`, size: '40px 40px', backgroundSize: '40px 40px' }}>
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="w-12 h-[2px] bg-red-600"></span>
          <span className="text-red-600 font-black uppercase tracking-[0.5em] text-[10px]">
            Operational_Window
          </span>
          <span className="w-12 h-[2px] bg-red-600"></span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-4">
          Training <span className="text-transparent text-stroke-white">Schedule</span>
        </h1>

        <p className="max-w-xl mx-auto text-zinc-400 font-bold uppercase text-xs md:text-sm tracking-widest leading-relaxed">
          Select your window of dominance. Our elite instructors are ready to 
          break your limits 24/7. No excuses. No delays.
        </p>

        {/* UI Decorative Elements */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-[1px] h-20 bg-gradient-to-b from-red-600 to-transparent"></div>
          <span className="text-[10px] font-mono text-red-600 animate-pulse">SCROLL_TO_COORDINATES</span>
        </div>
      </div>

      {/* Corner Brackets (Tactical Look) */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-zinc-800 hidden md:block"></div>
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-zinc-800 hidden md:block"></div>
    </section>
  );
}