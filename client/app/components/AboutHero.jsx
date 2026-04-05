import React from 'react';

export default function AboutHero() {
  return (
    <section className="relative h-[80vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600" 
          alt="Gym Interior" 
          className="w-full h-full object-cover opacity-40 grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <span className="text-red-600 font-black uppercase tracking-[0.5em] text-sm mb-4 block animate-fade-in">
          EST. 2018
        </span>
        
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase italic tracking-tighter text-white leading-none mb-8">
          More Than <br /> 
          <span className="text-transparent stroke-text">Just Iron</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
          We didn't just build a gym; we built a sanctuary for those who refuse to settle. 
          Founded on sweat, science, and a zero-excuses mentality.
        </p>

        {/* Decorative Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Our Story</span>
          <div className="w-px h-12 bg-gradient-to-b from-red-600 to-transparent"></div>
        </div>
      </div>

      {/* CSS for the 'hollow' text effect */}
      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px white;
          text-shadow: none;
        }
      `}</style>
    </section>
  );
}