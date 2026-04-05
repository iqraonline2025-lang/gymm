"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { getAllPrograms } from '@/utils/api';
// ✅ Import the Hero component
import ProgramHero from '../components/ProgramHero';
import Footer from '../components/Footer';

export default function ServicesPage() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get the base API URL from environment variables
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const data = await getAllPrograms();
        setPrograms(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load arsenal:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <h2 className="text-white font-black uppercase italic animate-pulse tracking-widest text-xl">
          Loading the Arsenal...
        </h2>
      </div>
    );
  }

  // ✅ FIX: Define the program to be featured in the Hero
  // We pick the first one in the list. If the list is empty, it stays null.
  const featuredProgram = programs.length > 0 ? programs[0] : null;

  return (
    <main className="bg-zinc-950 text-white min-h-screen">
      
      {/* ✅ FIXED: Pass the featuredProgram prop to the Hero component */}
      <ProgramHero program={featuredProgram} />

      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Section Divider/Label */}
        <div className="flex items-center justify-between mb-12 border-b border-zinc-800 pb-6">
           <h2 className="text-2xl font-black uppercase italic tracking-tighter">
             Active <span className="text-red-600">Modules</span>
           </h2>
           <span className="text-zinc-600 font-bold text-[10px] uppercase tracking-widest">
             {programs.length} Programs Found
           </span>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog) => (
            <div key={prog._id} className="group bg-zinc-900 border border-zinc-800 hover:border-red-600 transition-all duration-500 flex flex-col">
              
              {/* Image Container */}
              <div className="relative h-72 overflow-hidden bg-zinc-800">
                <img 
                  src={`${API_URL}${prog.image}`} 
                  alt={prog.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  onError={(e) => {
                    e.target.src = "https://placehold.co/600x400/000000/FFFFFF?text=IMAGE+NOT+FOUND";
                  }}
                />
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 uppercase italic shadow-xl">
                  {prog.target}
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-3xl font-black uppercase italic mb-4 group-hover:text-red-600 transition-colors">
                  {prog.title}
                </h3>
                
                <p className="text-zinc-400 text-sm mb-6 leading-relaxed line-clamp-3">
                  {prog.description}
                </p>

                {/* Benefits Badges */}
                <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                  {prog.benefits?.map((benefit, i) => (
                    <span key={i} className="text-[9px] border border-zinc-700 px-2 py-1 uppercase font-bold italic text-zinc-500 group-hover:text-zinc-300 group-hover:border-zinc-500 transition-colors">
                      {benefit}
                    </span>
                  ))}
                </div>

                <Link 
                  href={`/services/${prog.slug}`}
                  className="block w-full py-4 border border-white text-center font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {programs.length === 0 && (
          <div className="text-center py-40 border-2 border-dashed border-zinc-900">
            <p className="text-zinc-600 uppercase font-black italic tracking-widest">
              The Arsenal is currently empty.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}