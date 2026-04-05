"use client";
import React from 'react';

export default function GymMap() {
  // Replace this with your actual Google Maps Embed URL
  // To get your URL: Go to Google Maps -> Search your Gym -> Share -> Embed a map -> Copy the 'src' attribute
  const mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.733248043702!2d-118.24582848478502!3d34.05223422501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2c648fa1d480d%3A0x5140142bc967a6d9!2sLos%20Angeles%2C%20CA!5e0!3m2!1sen!2sus!4v1679434567890!5m2!1sen!2sus";

  return (
    <section className="w-full bg-black py-12">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header decoration */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 animate-pulse"></div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.3em]">
              Sector_Location_Lock: 34.05° N / 118.24° W
            </span>
          </div>
          <span className="text-[10px] font-mono text-zinc-700 uppercase hidden md:block">
            Signal_Type: Satellite_Uplink
          </span>
        </div>

        {/* Map Container */}
        <div className="relative group border border-zinc-800 p-1 bg-zinc-900/20">
          {/* Corner Brackets */}
          <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-red-600 z-10"></div>
          <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-red-600 z-10"></div>
          
          <div className="relative w-full h-[450px] overflow-hidden grayscale contrast-125 brightness-75 invert-[0.9] hover:grayscale-0 hover:invert-0 hover:brightness-100 transition-all duration-700">
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Gym Location"
              className="opacity-80 group-hover:opacity-100 transition-opacity"
            ></iframe>
            
            {/* HUD Overlay (Optional - pointer events none so map remains usable) */}
            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/10"></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-4 flex justify-end">
          <div className="text-right">
            <p className="text-white font-black uppercase italic text-sm tracking-tighter">
              IronCore <span className="text-red-600">Main Operations</span>
            </p>
            <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest mt-1">
              Industrial District // Sector 7G // Restricted Access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}