'use client';
import React from 'react';
import Link from 'next/link';

const programs = [
  { title: "Weight Training", slug: "weight-training", img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800" },
  { title: "Cardio Fitness", slug: "cardio-fitness", img: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?q=80&w=800" },
  { title: "CrossFit", slug: "crossfit", img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800" },
  { title: "Yoga", slug: "yoga", img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800" }
];

export default function Programs() {
  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-2">
            <span className="text-red-600 font-bold tracking-widest uppercase text-sm italic underline decoration-2 underline-offset-8">Our Expertise</span>
            <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tight">Build Your Body</h2>
          </div>
          <p className="max-w-xs text-zinc-400 text-sm leading-relaxed border-l border-zinc-800 pl-4">
            Our world-class programs are designed to push you to your absolute limits. No excuses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {programs.map((item) => (
            <Link key={item.slug} href={`/programs/${item.slug}`} className="group relative h-[450px] overflow-hidden rounded-sm">
              {/* Background Image */}
              <img 
                src={item.img} 
                className="absolute inset-0 w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                alt={item.title} 
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-8 w-full translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-2xl font-black uppercase italic mb-4">{item.title}</h3>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="h-px w-8 bg-red-600" />
                  <span className="text-xs font-bold tracking-[0.2em] uppercase">Explore Program</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}