"use client";

import React from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'; 
import { useParams } from 'next/navigation';

const programData = {
  'weight-training': {
    title: 'Weight Training',
    tagline: 'Strength & Hypertrophy',
    description: 'Master the iron. Our weight training program focuses on compound movements, progressive overload, and elite form to help you build a powerful physique.',
    duration: '12 Weeks',
    intensity: 'High',
  },
  'cardio-fitness': {
    title: 'Cardio Fitness',
    tagline: 'Endurance & Vitality',
    description: 'Push your heart rate and your limits. From HIIT to steady-state endurance, we provide the tools to incinerate fat and boost your stamina.',
    duration: 'Ongoing',
    intensity: 'Medium to High',
  },
  'crossfit': {
    title: 'CrossFit',
    tagline: 'Functional Intensity',
    description: 'The ultimate test of fitness. Combine gymnastics, weightlifting, and metabolic conditioning in a high-stakes competitive environment.',
    duration: '8 Weeks',
    intensity: 'Elite',
  },
  'yoga': {
    title: 'Yoga',
    tagline: 'Flexibility & Focus',
    description: 'Balance the grind with mindful movement. Improve your mobility, recovery, and mental clarity through expert-led Vinyasa and Hatha flows.',
    duration: 'Daily',
    intensity: 'Low to Medium',
  },
};

export default function ProgramPage() {
  const { slug } = useParams();
  const { data: session, status } = useSession(); 
  
  const program = programData[slug] || {
    title: slug?.replace(/-/g, ' ') || 'Program',
    tagline: 'Elite Fitness',
    description: 'Experience world-class training designed for results.',
    duration: 'Custom',
    intensity: 'Variable',
  };

  // 1. Loading State: Prevents showing the "Login" button to someone who is already logged in
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-600 font-black animate-pulse tracking-widest uppercase">
          Initializing_Protocol...
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white font-sans">
      {/* Hero Header */}
      <div className="h-[50vh] flex items-center justify-center border-b border-zinc-900 relative overflow-hidden bg-black">
        <h1 className="text-[12rem] font-black uppercase italic tracking-tighter opacity-5 absolute whitespace-nowrap select-none">
          {program.title}
        </h1>
        
        <div className="text-center z-10 px-6">
          <Link href="/" className="text-red-600 font-bold uppercase tracking-[0.3em] text-xs mb-4 block hover:text-white transition-colors">
            ← Back to Home
          </Link>
          <h2 className="text-5xl md:text-8xl font-black uppercase italic tracking-tight leading-none">
            {program.title}
          </h2>
          <p className="text-red-600 font-bold uppercase tracking-widest mt-4 italic">
            {program.tagline}
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h3 className="text-zinc-500 font-bold uppercase tracking-widest text-sm mb-6">Program Overview</h3>
            <p className="text-2xl md:text-3xl text-zinc-100 leading-tight font-light italic">
              "{program.description}"
            </p>
          </section>
          
          <div className="h-px bg-zinc-800 w-full" />

          <section className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-bold uppercase text-zinc-500 text-xs mb-3 tracking-widest">Program Duration</h4>
              <p className="text-2xl font-bold italic">{program.duration}</p>
            </div>
            <div>
              <h4 className="font-bold uppercase text-zinc-500 text-xs mb-3 tracking-widest">Intensity Level</h4>
              <p className="text-2xl font-bold italic">{program.intensity}</p>
            </div>
          </section>
        </div>

        {/* SIDEBAR: PROTECTED CONTENT */}
        <aside className="relative">
          <div className="sticky top-10 bg-white text-black p-10 rounded-none border-l-8 border-red-600 shadow-2xl">
            <h3 className="text-3xl font-black uppercase italic leading-none mb-4 text-black">Start Training</h3>
            
            {status === "authenticated" ? (
              <>
                <p className="text-sm opacity-80 mb-8 font-medium text-zinc-700">
                  Welcome back, <span className="text-red-600 font-bold uppercase">{session.user.name}</span>. You have cleared authorization to join this program.
                </p>
                <Link 
                  href={`/contact?program=${slug}`} 
                  className="block w-full bg-black text-white py-5 font-black uppercase italic tracking-widest text-center hover:bg-red-600 transition-all active:scale-95"
                >
                  Secure Your Spot
                </Link>
              </>
            ) : (
              /* This part technically shouldn't be reached if Middleware is working, 
                 but it serves as a perfect "Security Fallback." 
              */
              <>
                <div className="bg-zinc-100 p-4 border border-dashed border-zinc-400 mb-6 text-black">
                  <p className="text-[10px] font-black uppercase text-zinc-500 tracking-tighter mb-2">Security_Alert</p>
                  <p className="text-xs font-bold uppercase leading-tight">
                    Program enrollment is restricted to registered IronCore members only.
                  </p>
                </div>
                <Link 
                  href="/login" 
                  className="block w-full bg-red-600 text-white py-5 font-black uppercase italic tracking-widest text-center hover:bg-black transition-all active:scale-95 shadow-lg"
                >
                  Login to Access
                </Link>
              </>
            )}

            <p className="text-[10px] uppercase tracking-tighter mt-6 text-center opacity-50 font-bold text-black">
              *Full Authorization Required
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}