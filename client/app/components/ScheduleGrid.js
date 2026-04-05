"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // ✅ Import Link for redirection

export default function ScheduleGrid() {
  const [schedule, setSchedule] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule`);
        const data = await res.json();
        setSchedule(data);
      } catch (err) {
        console.error("DATA_RETRIEVAL_FAILURE", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, []);

  const filteredSchedule = filter === 'All' 
    ? schedule 
    : schedule.filter(item => item.category === filter);

  return (
    <section className="py-20 bg-black">
      {/* 1. FILTER TABS */}
      <div className="flex justify-center gap-4 mb-16">
        {['All', 'Morning', 'Evening'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-10 py-3 text-[10px] font-black uppercase tracking-[0.3em] border transition-all duration-300 ${
              filter === type 
              ? 'bg-red-600 border-red-600 text-white' 
              : 'border-zinc-800 text-zinc-500 hover:border-zinc-500 hover:text-white'
            }`}
          >
            {type}_Sessions
          </button>
        ))}
      </div>

      {/* 2. THE GRID */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-px bg-zinc-900 border border-zinc-900">
          {days.map((day) => (
            <div key={day} className="bg-black min-h-[400px]">
              <div className="p-4 border-b border-zinc-900 bg-zinc-950/50">
                <h3 className="text-red-600 font-black uppercase italic tracking-tighter text-lg">
                  {day}
                </h3>
                <span className="text-[8px] text-zinc-600 font-mono tracking-widest uppercase">
                  Sector_{day.substring(0, 3)}
                </span>
              </div>

              <div className="p-2 space-y-2">
                {loading ? (
                  <div className="h-20 bg-zinc-900/20 animate-pulse" />
                ) : (
                  filteredSchedule
                    .filter(item => item.day === day)
                    .sort((a, b) => a.time.localeCompare(b.time))
                    .map((item) => (
                      <div key={item._id} className="group relative bg-zinc-900/30 border border-zinc-800 p-4 hover:border-red-600 transition-all duration-300">
                        <span className="text-[9px] font-mono text-zinc-500 group-hover:text-red-500">
                          {item.time}
                        </span>
                        <h4 className="text-sm font-black uppercase italic text-white mt-1 leading-tight">
                          {item.className}
                        </h4>
                        <p className="text-[9px] text-zinc-500 uppercase mt-2 border-t border-zinc-800 pt-2">
                          Lead: <span className="text-zinc-300">{item.trainer}</span>
                        </p>
                        
                        {/* ✅ Redirection Link added here */}
                        <Link href="/contact">
                          <button className="w-full mt-4 bg-white text-black py-2 text-[9px] font-black uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 hover:text-white cursor-pointer">
                            Reserve Spot
                          </button>
                        </Link>
                      </div>
                    ))
                )}
                
                {!loading && filteredSchedule.filter(item => item.day === day).length === 0 && (
                  <div className="py-10 text-center">
                    <p className="text-[8px] text-zinc-800 font-black uppercase tracking-widest">
                      No_Active_Ops
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}