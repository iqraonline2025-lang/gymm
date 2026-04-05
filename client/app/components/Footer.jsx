'use client';
import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    // Removed h-screen to prevent content cutoff on mobile
    <footer className="relative bg-white text-black flex flex-col justify-between p-6 md:p-12 overflow-hidden border-t border-zinc-200">
      
      {/* TOP SECTION: Grid Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 w-full pt-12 z-10">
        
        {/* Column 1: Opening Hours */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Operations_Clock</h4>
          <ul className="space-y-2 font-black italic uppercase text-2xl tracking-tighter">
            <li className="flex justify-between border-b border-zinc-100 pb-2">
              <span>Mon — Fri</span> <span>05:00 - 23:00</span>
            </li>
            <li className="flex justify-between border-b border-zinc-100 pb-2">
              <span>Saturday</span> <span>08:00 - 20:00</span>
            </li>
            <li className="flex justify-between border-b border-zinc-100 pb-2 text-zinc-400">
              <span>Sunday</span> <span>09:00 - 18:00</span>
            </li>
          </ul>
        </div>

        {/* Column 2: Social Uplinks */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Social_Uplink</h4>
          <ul className="space-y-2 text-4xl md:text-5xl font-black uppercase italic tracking-tighter">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors block">Instagram</a>
            </li>
            <li>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors block">YouTube</a>
            </li>
            <li>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors block">Twitter_X</a>
            </li>
          </ul>
        </div>

        {/* Column 3: Headquarters */}
        <div className="space-y-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-600">Base_Location</h4>
          <address className="not-italic text-3xl font-black uppercase tracking-tighter leading-none">
            123 Iron Street<br />
            Fitness District<br />
            London, UK
          </address>
          <div className="pt-4 space-y-1">
            <p className="text-xl font-black italic underline hover:text-red-600 cursor-pointer">hello@ironcore.com</p>
            <p className="text-xl font-black italic">+44 20 1234 5678</p>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: Background Watermark */}
      <div className="py-20 flex items-center justify-center overflow-hidden">
        <h1 className="text-[18vw] font-black uppercase italic tracking-tighter leading-none select-none pointer-events-none opacity-[0.03] absolute">
          IRONCORE
        </h1>
      </div>

      {/* BOTTOM SECTION: CTA & Legal */}
      <div className="flex flex-col gap-10 mt-10">
        <div className="w-full text-center md:text-right">
          {/* Linked to Register as requested */}
          <Link href="/register" className="text-7xl md:text-[10rem] font-black uppercase italic tracking-tighter hover:text-red-600 transition-all leading-[0.8] inline-block">
            JOIN US →
          </Link>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center border-t border-zinc-200 pt-8 pb-4 gap-4">
          <div className="max-w-xs text-center md:text-left">
            <p className="text-[9px] font-black uppercase leading-tight text-zinc-400 tracking-widest">
              © 2026 IronCore Gym Ltd. All rights reserved. <br />
              Privacy_Policy. Terms_of_Engagement.
            </p>
          </div>
          
          <div className="flex gap-6">
             <span className="text-[10px] font-black italic text-red-600 animate-pulse uppercase">System_Active</span>
             <span className="text-[10px] font-black italic uppercase">Built_by_Passion</span>
          </div>
        </div>
      </div>

    </footer>
  );
}