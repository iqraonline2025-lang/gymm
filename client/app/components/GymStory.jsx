import React from 'react';

export default function GymStory() {
  return (
    <section className="bg-zinc-950 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side: The "Vibe" */}
          <div className="relative group">
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-red-600 z-10"></div>
            <div className="overflow-hidden rounded-sm shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800" 
                alt="Original garage gym" 
                className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-red-600 p-8 hidden md:block">
              <p className="text-white font-black text-4xl italic uppercase leading-none">
                Since <br /> Day One
              </p>
            </div>
          </div>

          {/* Text Side: The Story */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h3 className="text-red-600 font-black uppercase tracking-widest text-sm italic">
                The Origin
              </h3>
              <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-white leading-[0.9]">
                BORN FROM <br /> <span className="text-zinc-600">FRUSTRATION.</span>
              </h2>
            </div>

            <div className="space-y-6 text-zinc-400 text-lg leading-relaxed font-light">
              <p>
                In 2018, we looked around and realized the fitness industry had lost its soul. 
                Gyms had become "wellness clubs" filled with bright lights, soft music, and 
                zero intensity. The grit was gone.
              </p>
              
              <p className="border-l-2 border-red-600 pl-6 italic text-white font-medium">
                "We didn't want a club. We wanted a powerhouse. A place where the 
                clanging of iron was the only soundtrack you needed."
              </p>

              <p>
                What started as a three-man operation in a dusty, unheated garage has grown 
                into a community of hundreds. We built this place for the people who train 
                on Christmas morning, the people who push for that one extra rep, and the 
                people who know that physical strength is the foundation of mental toughness.
              </p>
            </div>

            <div className="pt-4 grid grid-cols-2 gap-8 border-t border-zinc-900">
              <div>
                <span className="block text-3xl font-black text-white italic">1.2k+</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Transformations</span>
              </div>
              <div>
                <span className="block text-3xl font-black text-white italic">0</span>
                <span className="text-xs uppercase tracking-widest text-zinc-500 font-bold">Excuses Allowed</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}