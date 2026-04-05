import React from 'react';

export default function Vision() {
  return (
    <section className="relative min-h-[80vh] bg-zinc-950 overflow-hidden pt-40 pb-24">
      {/* Background Decorative Element (Large Outlined Text) */}
      <div className="absolute inset-0 flex items-start justify-center opacity-10 pointer-events-none pt-20">
        <h2 className="text-[25vw] font-black uppercase italic leading-none border-text">
          FUTURE
        </h2>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <h3 className="text-red-600 font-black uppercase tracking-[0.4em] text-xs mb-10">
          The Vision
        </h3>
        
        <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter text-white leading-tight">
          To build a global community where <span className="text-zinc-500">mental toughness</span> is forged through <span className="underline decoration-red-600 decoration-4 underline-offset-8">physical excellence.</span>
        </h2>

        <p className="mt-12 text-zinc-400 text-lg font-light max-w-2xl mx-auto leading-relaxed">
          We see a future where "average" is obsolete. We are expanding our footprint to ensure that anyone, anywhere, has access to the environment they need to become the strongest version of themselves.
        </p>

        {/* Optional: Subtle divider line at the bottom */}
        <div className="mt-20 w-24 h-px bg-zinc-800 mx-auto"></div>
      </div>

      {/* Custom Styles for the Background Outline */}
      <style jsx>{`
        .border-text {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </section>
  );
}