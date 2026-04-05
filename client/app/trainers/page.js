'use client';

import React, { useEffect, useState } from 'react';
import TrainersHero from "../components/TrainersHero";
import Footer from "../components/Footer";
import TrainerCard from "../components/TrainerCard";

export default function Trainers() {
    const [trainers, setTrainers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrainers = async () => {
            try {
                // Ensure NEXT_PUBLIC_API_URL is set in your .env (e.g., http://localhost:5000)
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainers`);
                const data = await res.json();
                setTrainers(data);
            } catch (err) {
                console.error("FAILED TO RADIATE PERSONNEL DATA:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTrainers();
    }, []);

    return (
        <main className="bg-black min-h-screen text-white">
            {/* 01. HERO SECTION */}
            <TrainersHero />

            {/* 02. PERSONNEL GRID SECTION */}
            <section className="py-24 px-6 max-w-7xl mx-auto relative">
                
                {/* Tactical Divider Styling */}
                <div className="flex items-center gap-4 mb-16 opacity-30">
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">
                        Active_Personnel_Roster
                    </span>
                    <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-zinc-500 to-transparent"></div>
                </div>

                {loading ? (
                    /* Tactical Loading Skeletons */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3].map((n) => (
                            <div key={n} className="aspect-[3/4] bg-zinc-900/50 animate-pulse border border-zinc-800" />
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {trainers.map((trainer) => (
                            <TrainerCard key={trainer._id} trainer={trainer} />
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && trainers.length === 0 && (
                    <div className="text-center py-40 border border-dashed border-zinc-800 rounded-lg">
                        <p className="text-zinc-500 font-black uppercase italic tracking-widest text-sm">
                            No Elite Assets currently deployed to this sector.
                        </p>
                    </div>
                )}
            </section>

            {/* 03. FOOTER */}
            <Footer />
        </main>
    );
}