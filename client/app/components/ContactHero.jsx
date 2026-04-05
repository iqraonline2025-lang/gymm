"use client";
import React from 'react';

export default function ContactHero() {
  return (
    <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-black border-b border-zinc-900">
      {/* Background with Darkened Tech Aesthetic */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1516383740770-fbcc5cbece01?q=80&w=2070&auto=format&fit=crop" 
          alt="Technical Background"
          className="w-full h-full object-cover opacity-20 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
      </div>

      {/* Decorative Scanning Line Animation */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-red-600/30 blur-sm animate-scan z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-6">
        <div className="inline-block mb-4 px-3 py-1 border border-red-600/50 bg-red-600/10">
          <span className="text-red-600 font-mono text-[9px] uppercase tracking-[0.4em] leading-none">
            Status: Secure_Connection_Established
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-6">
          Direct <span className="text-transparent text-stroke-white">Uplink</span>
        </h1>

        <p className="max-w-2xl mx-auto text-zinc-500 font-bold uppercase text-[10px] md:text-xs tracking-[0.2em] leading-relaxed">
          Request reinforcements. Inquire about recruitment. <br /> 
          Our command staff is standing by for your transmission.
        </p>
      </div>

      {/* Aesthetic Coordinates (Bottom Left) */}
      <div className="absolute bottom-6 left-8 hidden md:block">
        <div className="text-[9px] font-mono text-zinc-700 leading-tight uppercase">
          Loc: 34.0522° N, 118.2437° W<br />
          Ref: IRONCORE_HQ_COMM_01
        </div>
      </div>

      {/* Aesthetic Data Stream (Bottom Right) */}
      <div className="absolute bottom-6 right-8 hidden md:block">
        <div className="flex gap-1 h-8 items-end">
          {[40, 70, 45, 90, 65, 30, 80].map((h, i) => (
            <div 
              key={i} 
              className="w-[2px] bg-red-600/40 animate-pulse" 
              style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}