import React from 'react';

const images = [
  {
    url: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800",
    caption: "The Main Floor",
    size: "col-span-2 row-span-2" // Large feature image
  },
  {
    url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800",
    caption: "Olympic Racks",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=800",
    caption: "Cardio Zone",
    size: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=800",
    caption: "Recovery Suite",
    size: "col-span-2 row-span-1"
  }
];

export default function GymGallery() {
  return (
    <section className="bg-black py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter text-white">
            The <span className="text-red-600">Facility</span>
          </h2>
          <p className="text-zinc-500 uppercase tracking-widest text-xs font-bold mt-2">
            20,000 SQ FT of Pure Performance
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
          {images.map((img, index) => (
            <div 
              key={index} 
              className={`relative group overflow-hidden bg-zinc-900 ${img.size}`}
            >
              {/* Image */}
              <img 
                src={img.url} 
                alt={img.caption}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-70 group-hover:opacity-100"
              />
              
              {/* Overlay Label */}
              <div className="absolute bottom-0 left-0 p-6 w-full bg-gradient-to-t from-black/80 to-transparent translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white font-black uppercase italic tracking-widest text-sm">
                  {img.caption}
                </p>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-white/20 group-hover:border-red-600 transition-colors"></div>
            </div>
          ))}
        </div>

        {/* Bottom Detail */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 border-t border-zinc-900 pt-8">
            <p className="text-zinc-400 text-sm max-w-md italic">
                Our facility is cleaned hourly and features climate-controlled ventilation to ensure your peak performance.
            </p>
            <div className="flex gap-8">
                <div className="text-center">
                    <span className="block text-white font-black text-2xl uppercase italic">24/7</span>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Access</span>
                </div>
                <div className="text-center">
                    <span className="block text-white font-black text-2xl uppercase italic">Pro</span>
                    <span className="text-[10px] text-zinc-600 uppercase font-bold tracking-widest">Equipment</span>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
}