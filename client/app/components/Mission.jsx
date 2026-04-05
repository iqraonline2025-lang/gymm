import React from 'react';

export default function Mission() {
  return (
    <section className="bg-white py-24 md:py-40 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center">
          
          {/* Label */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px w-8 bg-red-600"></div>
            <span className="text-black font-black uppercase tracking-[0.4em] text-xs">
              The Core Mission
            </span>
            <div className="h-px w-8 bg-red-600"></div>
          </div>

          {/* The Mission Statement */}
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter text-center leading-[0.85] text-black">
            Helping people <br /> 
            become <span className="text-red-600">stronger</span> <br /> 
            & <span className="relative inline-block">
              healthier
              <svg className="absolute -bottom-2 left-0 w-full h-3 text-red-600/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="8" />
              </svg>
            </span>
          </h2>

          {/* Subtext */}
          <p className="mt-12 text-zinc-500 uppercase tracking-widest font-bold text-sm text-center max-w-lg leading-relaxed">
            Simple goals. Brutal execution. No fluff, just results for every body that walks through our doors.
          </p>
          
        </div>
      </div>
    </section>
  );
}