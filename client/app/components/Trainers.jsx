import React from 'react';

const trainers = [
  {
    name: "Marcus Chen",
    specialty: "Bodybuilding & Strength",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=800",
  },
  {
    name: "Sarah Jenkins",
    specialty: "HIIT & Fat Loss",
    img: "/images/coach1.jpg",
  },
  {
    name: "David 'viking' Rossi",
    specialty: "CrossFit & Mobility",
    img: "/images/coach2.jpg",
  }
];

export default function Trainers() {
  return (
    <section className="py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-black uppercase italic tracking-tighter mb-4">
            Meet the <span className="text-red-600">Elites</span>
          </h2>
          <p className="text-zinc-400 max-w-lg mx-auto uppercase tracking-widest text-xs font-bold">
            World-class athletes dedicated to your transformation.
          </p>
        </div>

        {/* Trainers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="group relative">
              {/* Photo Container */}
              <div className="relative h-[500px] w-full overflow-hidden border-b-4 border-transparent group-hover:border-red-600 transition-all duration-500">
                <img 
                  src={trainer.img} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                {/* Text Content */}
                <div className="absolute bottom-0 left-0 p-8 w-full">
                  <p className="text-red-600 font-black uppercase tracking-widest text-xs mb-1 italic">
                    {trainer.specialty}
                  </p>
                  <h3 className="text-3xl font-black uppercase italic leading-none">
                    {trainer.name}
                  </h3>
                </div>
              </div>
              
              {/* Social/Bio Reveal (Optional visual touch) */}
              <div className="mt-4 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="h-px flex-grow bg-zinc-800 self-center"></div>
                <span className="text-[10px] uppercase font-bold tracking-tighter text-zinc-500">Elite Certified</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}