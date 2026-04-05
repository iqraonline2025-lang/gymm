"use client";
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useSession, signIn } from "next-auth/react"; // ✅ Import session tools
import { getProgramBySlug } from '@/utils/api';

export default function ProgramDetail() {
  const { data: session, status } = useSession(); // ✅ Track if user is logged in
  const { slug } = useParams();
  const [program, setProgram] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await getProgramBySlug(slug);
        setProgram(data);
      } catch (error) {
        console.error("Failed to load program:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  // 1. Show global loader while fetching API or checking Auth status
  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // 2. IF NOT LOGGED IN: Show a "Login to View" screen
  if (!session) {
    return (
      <main className="bg-zinc-950 text-white min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full border border-zinc-800 p-10 text-center bg-zinc-900 shadow-2xl">
          <h2 className="text-4xl font-black uppercase italic mb-4 tracking-tighter">
            Access <span className="text-red-600">Denied</span>
          </h2>
          <p className="text-zinc-400 text-sm mb-8 uppercase tracking-widest font-bold">
            You must be authenticated to view the details of this module.
          </p>
          <button 
            onClick={() => signIn()} // ✅ Redirects to your login page
            className="w-full bg-red-600 py-4 text-white font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all"
          >
            Login to Arsenal
          </button>
          <Link href="/services" className="inline-block mt-6 text-zinc-600 text-xs font-bold uppercase hover:text-white transition-colors">
            ← Return to Services
          </Link>
        </div>
      </main>
    );
  }

  // 3. IF LOGGED IN: Show the normal content
  if (!program) return <div className="min-h-screen bg-black text-white p-20 text-center uppercase font-black">Program not found.</div>;

  return (
    <main className="bg-zinc-950 text-white min-h-screen pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6">
        
        <button onClick={() => window.history.back()} className="text-red-600 font-black uppercase italic text-xs mb-8 hover:tracking-widest transition-all">
          ← Back to Arsenal
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="sticky top-32">
            <div className="border-2 border-red-600 p-2">
               <img 
                 src={`${API_URL}${program.image}`} 
                 alt={program.title} 
                 className="w-full aspect-[4/5] object-cover grayscale hover:grayscale-0 transition-all duration-700" 
               />
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none mb-4">
                {program.title}
              </h1>
              <span className="bg-white text-black px-4 py-1 text-xs font-black uppercase italic">
                Target: {program.target}
              </span>
            </div>

            <div className="space-y-6">
              <h3 className="text-zinc-500 font-black uppercase tracking-widest text-sm">Description</h3>
              <p className="text-zinc-300 text-lg leading-relaxed font-light italic">
                "{program.description}"
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-zinc-500 font-black uppercase tracking-widest text-sm">Key Benefits</h3>
              <div className="grid grid-cols-1 gap-3">
                {program.benefits?.map((benefit, i) => (
                  <div key={i} className="flex items-center gap-4 border-l-2 border-red-600 pl-4 py-2 bg-zinc-900/50">
                    <span className="text-white font-bold uppercase italic tracking-tight">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link 
              href="/contact"
              className="block w-full bg-red-600 py-6 text-white text-center font-black uppercase italic tracking-[0.3em] hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(220,38,38,0.3)]"
            >
              Secure Your Spot
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}