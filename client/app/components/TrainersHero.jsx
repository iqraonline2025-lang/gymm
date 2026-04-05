"use client";
import React from 'react';
import Link from 'next/link';

export default function TrainersHero() {
  return (
    <section className="relative h-[80vh] min-h-[650px] bg-zinc-950 overflow-hidden flex items-center">
      {/* 1. Background Visuals */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="IronCore Training Ground"
          className="w-full h-full object-cover object-center grayscale opacity-40"
        />
      </div>

      {/* 2. Content Container */}
      <div className="max-w-7xl mx-auto px-6 relative z-20 w-full">
        <div className="max-w-4xl">
          {/* Tactical Badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-[2px] bg-red-600"></span>
            <span className="text-red-600 font-black uppercase italic tracking-[0.3em] text-xs">
              Elite Instruction Division
            </span>
          </div>

          {/* Main Title - Adjusted leading and tracking for better UI */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-white leading-[0.85] mb-8">
            The <span className="text-transparent" style={{ WebkitTextStroke: '2px white' }}>Architects</span> <br />
            of <span className="text-red-600">Pain</span>
          </h1>

          <p className="text-zinc-400 text-sm md:text-base font-bold max-w-xl mb-10 leading-relaxed uppercase italic tracking-wide">
            Our trainers don't just count reps. They engineer transformations. 
            Meet the team dedicated to rebuilding your discipline from the ground up.
          </p>

          {/* Action Buttons - Streamlined Link UI */}
          <div className="flex flex-wrap items-center gap-6">
            <Link 
              href="/contact"
              className="px-10 py-5 border border-zinc-700 text-white font-black uppercase italic tracking-widest hover:border-red-600 hover:bg-red-600/10 transition-all duration-300 text-xs md:text-sm inline-block"
            >
              Book Assessment
            </Link>
            
            <Link 
              href="/directory" 
              className="text-zinc-500 hover:text-white font-black uppercase italic tracking-widest text-[10px] transition-colors"
            >
              Personnel_Directory [002]
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Bottom Decorative Elements */}
      <div className="absolute bottom-0 right-0 p-10 hidden lg:block">
        <div className="flex flex-col items-end gap-2">
          <span className="text-zinc-800 font-black text-8xl uppercase italic leading-none select-none">
            002
          </span>
          <span className="text-zinc-500 font-bold uppercase tracking-[0.5em] text-[10px]">
            Personnel / Directory
          </span>
        </div>
      </div>

      {/* Side Vertical Text */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden xl:block">
        <p className="rotate-90 origin-right text-zinc-900 font-black uppercase tracking-[1em] text-xs whitespace-nowrap">
          /// IronCore • No Excuses • IronCore • No Excuses ///
        </p>
      </div>
    </section>
  );
}