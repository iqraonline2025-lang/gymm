"use client";
import React, { useState, useEffect } from 'react';

export default function AdminSchedulePage() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    className: '',
    day: 'Monday',
    time: '',
    trainer: '',
    category: 'Morning',
    duration: '60 MIN'
  });

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule`);
      const data = await res.json();
      setClasses(data);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => { fetchSchedule(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("TIMETABLE UPDATED");
        setFormData({ ...formData, className: '', time: '', trainer: '' });
        fetchSchedule();
      }
    } catch (err) {
      alert("UPDATE FAILED");
    }
  };

  const deleteClass = async (id) => {
    if (!confirm("REMOVE FROM TIMETABLE?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/schedule/${id}`, { method: 'DELETE' });
    fetchSchedule();
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="mb-10 border-l-4 border-red-600 pl-6">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
          Schedule <span className="text-zinc-700">Editor</span>
        </h1>
        <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px] mt-2">
          Assign Tactical Training Slots & Instructors
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ADD CLASS FORM */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
            <h2 className="font-black uppercase italic text-sm mb-4 text-red-600">New Entry</h2>
            
            <div className="space-y-3">
              <input 
                type="text" placeholder="CLASS NAME (e.g. CrossFit)" required
                className="w-full bg-black border border-zinc-800 p-3 text-xs focus:border-red-600 outline-none"
                value={formData.className} onChange={(e) => setFormData({...formData, className: e.target.value})}
              />
              
              <select 
                className="w-full bg-black border border-zinc-800 p-3 text-xs focus:border-red-600 outline-none uppercase font-bold"
                value={formData.day} onChange={(e) => setFormData({...formData, day: e.target.value})}
              >
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>

              <input 
                type="text" placeholder="TIME (e.g. 07:00 AM)" required
                className="w-full bg-black border border-zinc-800 p-3 text-xs focus:border-red-600 outline-none"
                value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})}
              />

              <input 
                type="text" placeholder="TRAINER NAME" required
                className="w-full bg-black border border-zinc-800 p-3 text-xs focus:border-red-600 outline-none"
                value={formData.trainer} onChange={(e) => setFormData({...formData, trainer: e.target.value})}
              />

              <select 
                className="w-full bg-black border border-zinc-800 p-3 text-xs focus:border-red-600 outline-none uppercase font-bold text-red-600"
                value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="Morning">Morning Session</option>
                <option value="Evening">Evening Session</option>
              </select>

              <input 
                type="text" placeholder="DURATION (e.g. 60 MIN)"
                className="w-full bg-black border border-zinc-800 p-3 text-xs focus:border-red-600 outline-none"
                value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
            </div>

            <button className="w-full bg-red-600 py-4 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
              Commit to Schedule
            </button>
          </form>
        </div>

        {/* LIST VIEW */}
        <div className="lg:col-span-3">
          <div className="bg-zinc-900 border border-zinc-800 overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-black border-b border-zinc-800">
                  <th className="p-4 font-black uppercase italic tracking-widest text-zinc-500">Day</th>
                  <th className="p-4 font-black uppercase italic tracking-widest text-zinc-500">Time</th>
                  <th className="p-4 font-black uppercase italic tracking-widest text-zinc-500">Class</th>
                  <th className="p-4 font-black uppercase italic tracking-widest text-zinc-500">Trainer</th>
                  <th className="p-4 font-black uppercase italic tracking-widest text-zinc-500">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {classes.map((c) => (
                  <tr key={c._id} className="hover:bg-zinc-800/50 transition-colors group">
                    <td className="p-4 font-bold uppercase">{c.day}</td>
                    <td className="p-4 font-mono text-red-600">{c.time}</td>
                    <td className="p-4 font-black uppercase italic text-sm">{c.className}</td>
                    <td className="p-4 text-zinc-400 font-bold uppercase">{c.trainer}</td>
                    <td className="p-4">
                      <button 
                        onClick={() => deleteClass(c._id)}
                        className="text-zinc-600 hover:text-red-600 transition-colors font-black"
                      >
                        [ DELETE ]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {classes.length === 0 && !loading && (
              <div className="p-20 text-center text-zinc-700 font-black uppercase italic tracking-widest">
                No active operations scheduled.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}