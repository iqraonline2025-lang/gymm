import React from 'react';

const stats = [
  {
    number: "500+",
    label: "Success Stories",
    detail: "Members who reached their goal weight or strength targets."
  },
  {
    number: "15+",
    label: "Expert Coaches",
    detail: "Certified professionals across CrossFit, Yoga, and Powerlifting."
  },
  {
    number: "20k",
    label: "Square Feet",
    detail: "Premium training space with world-class equipment."
  },
  {
    number: "08",
    label: "Years of Grit",
    detail: "Building a stronger community since we opened our doors."
  }
];

export default function Achievements() {
  return (
    <section className="bg-zinc-950 py-24 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-red-600 font-black uppercase tracking-[0.3em] text-xs mb-4">
              Our Impact
            </h3>
            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white leading-none">
              The numbers <br /> <span className="text-zinc-700">behind the sweat.</span>
            </h2>
          </div>
          <p className="text-zinc-500 text-sm uppercase font-bold tracking-widest max-w-xs">
            We don't just track reps. We track progress, transformation, and legacy.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="group relative">
              {/* Background Accent on Hover */}
              <div className="absolute -inset-4 bg-zinc-900/0 group-hover:bg-zinc-900/50 transition-colors rounded-xl -z-10"></div>
              
              <div className="space-y-4">
                <span className="block text-6xl font-black text-white italic tracking-tighter group-hover:text-red-600 transition-colors duration-500">
                  {stat.number}
                </span>
                
                <div>
                  <h4 className="text-xl font-bold uppercase italic text-white mb-2">
                    {stat.label}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {stat.detail}
                  </p>
                </div>
                
                {/* Decorative Line */}
                <div className="w-12 h-1 bg-zinc-800 group-hover:w-full group-hover:bg-red-600 transition-all duration-500"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}