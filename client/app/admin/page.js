"use client";
import React from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <main className="min-h-screen bg-black text-white p-8 md:p-20">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 border-l-4 border-red-600 pl-6">
          <h1 className="text-6xl font-black uppercase italic tracking-tighter leading-none">
            Control <span className="text-red-600">Center</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.3em] text-[10px] mt-4">
            Gym Management System v1.2 // Auth: Admin_Level_01 // Region: IronCore_HQ
          </p>
        </header>

        {/* Updated Grid: 3 columns on large screens to accommodate the new card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 01: Add Program */}
          <AdminCard 
            number="01" 
            title="Add Programs" 
            href="/admin/add-program"
            desc="Deploy new fitness disciplines, strength training, or yoga classes to the live arsenal."
          />

          {/* Card 02: Membership Plans */}
          <AdminCard 
            number="02" 
            title="Manage Plans" 
            href="/admin/plans"
            desc="Configure subscription tiers, update pricing, and modify features for the membership grid."
          />

          {/* Card 03: Personnel Roster */}
          <AdminCard 
            number="03" 
            title="Personnel Roster" 
            href="/admin/trainers"
            desc="Manage elite coaching staff. Update bios, experience levels, and tactical specialties."
          />

          {/* Card 04: Class Schedule ✅ NEW SECTION */}
          <AdminCard 
            number="04" 
            title="Class Schedule" 
            href="/admin/schedule"
            color="text-red-600"
            desc="Assign tactical training slots, set operational hours, and link instructors to time blocks."
          />

          {/* Card 05: Live Preview */}
          <AdminCard 
            number="05" 
            title="Live Preview" 
            href="/" 
            color="text-white"
            desc="Launch the public-facing terminal. View the layout, images, and pricing exactly as members do."
          />

        </div>

        {/* System Footer Decoration */}
        <footer className="mt-16 pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-[10px] text-zinc-700 font-mono tracking-widest">
            ID: IRONCORE_CORE_STK_V2 // SERVER_STATUS: OPTIMAL
          </div>
          <div className="text-[10px] text-zinc-700 font-mono tracking-widest uppercase italic">
            Connection Secured // No Excuses // 2026_CORE_UPDATE
          </div>
        </footer>
      </div>
    </main>
  );
}

// Reusable Card Component to keep the code clean
function AdminCard({ number, title, href, desc, color = "text-red-600" }) {
  return (
    <Link href={href} className="group border border-zinc-800 p-8 hover:border-red-600 transition-all duration-500 bg-zinc-900/10 hover:bg-zinc-900/40 relative overflow-hidden">
      <div className="flex flex-col h-full relative z-10">
        <span className={`${color} font-black text-4xl mb-4 italic uppercase tracking-tighter group-hover:translate-x-2 transition-transform inline-block`}>
          {number}
        </span>
        <h2 className="text-2xl font-black uppercase italic mb-2 tracking-tighter">{title}</h2>
        <p className="text-zinc-500 text-xs leading-relaxed mb-8 font-medium">
          {desc}
        </p>
        <div className="mt-auto text-[9px] font-black uppercase tracking-[0.2em] text-zinc-600 group-hover:text-white transition-colors flex items-center gap-2">
          Execute_Module <span className="text-red-600">---&gt;</span>
        </div>
      </div>
      {/* Subtle background glow on hover */}
      <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-red-600/5 rounded-full blur-3xl group-hover:bg-red-600/10 transition-all"></div>
    </Link>
  );
}