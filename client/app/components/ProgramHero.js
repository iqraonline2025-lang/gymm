"use client";
import React from 'react';
import Link from 'next/link';

export default function ProgramHero({ program }) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // Loading State
  if (!program) {
    return (
      <section className="relative h-[85vh] w-full bg-zinc-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-zinc-500 font-black uppercase italic tracking-[0.3em] text-xs">Initializing Arsenal</p>
        </div>
      </section>
    );
  }

  const backgroundImage = program.image ? `${API_URL}${program.image}` : "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070";
  const titleParts = program.title ? program.title.split(' ') : ['Iron', 'Core'];
  const firstWord = titleParts[0];
  const restOfTitle = titleParts.slice(1).join(' ');

  return (
    <section className="relative h-[90vh] w-full overflow-hidden bg-black group">
      {/* Background Image Layer with Scale Effect */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[3000ms] ease-out group-hover:scale-110"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        {/* Advanced Multi-layer Overlay */}
        <div className="absolute inset-0 bg-zinc-950/40" /> {/* Subtle tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        
        {/* Floating Tagline */}
        <div className="overflow-hidden mb-4">
            <p className="text-red-600 font-black uppercase italic tracking-[0.5em] text-[10px] md:text-xs animate-in slide-in-from-bottom duration-700">
                Phase 01 // {program.target || "ELITE"}
            </p>
        </div>

        {/* Massive Dynamic Title */}
        <h1 className="text-[12vw] md:text-9xl font-black uppercase italic tracking-tighter text-white leading-[0.8] mb-12">
          <span className="block drop-shadow-2xl">{firstWord}</span>
          <span className="block text-transparent stroke-text opacity-80 transition-opacity hover:opacity-100">
            {restOfTitle}
          </span>
        </h1>

        {/* Advanced Stats Grid */}
        <div className="flex flex-wrap gap-12 border-l-2 border-red-600 pl-8 mb-12">
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Duration</p>
            <p className="text-white font-black uppercase italic text-2xl">08 <span className="text-xs text-zinc-500">Wks</span></p>
          </div>
          <div className="space-y-1">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Intensity</p>
            <p className="text-white font-black uppercase italic text-2xl">Elite</p>
          </div>
          <div className="space-y-1 hidden sm:block">
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Format</p>
            <p className="text-white font-black uppercase italic text-2xl">Hybrid</p>
          </div>
        </div>

        {/* CTA Buttons with Link Redirect */}
        <div className="flex flex-col sm:flex-row gap-6">
          <Link 
            href="/contact" 
            className="group/btn relative overflow-hidden bg-red-600 text-white px-12 py-6 font-black uppercase italic tracking-widest transition-all hover:bg-white hover:text-black text-center"
          >
            <span className="relative z-10">Enroll Now</span>
            <div className="absolute inset-0 bg-white translate-y-[100%] group-hover/btn:translate-y-0 transition-transform duration-300" />
          </Link>
          
          <Link 
            href="/membership" 
            className="px-12 py-6 border border-zinc-700 text-white font-black uppercase italic tracking-widest hover:border-white transition-colors text-center"
          >
            Explore Plan
          </Link>
        </div>
      </div>

      {/* Large Decorative Watermark */}
      <div className="absolute -bottom-10 -right-20 pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[25rem] font-black italic uppercase leading-none">
          {firstWord}
        </h2>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1.5px white;
        }
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </section>
  );
}