"use client";
import React, { useState, useEffect } from 'react';

export default function AdminTrainersPage() {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null); // Track the actual file object
  const [formData, setFormData] = useState({
    name: '', experience: '', specialty: '', bio: ''
  });

  const fetchTrainers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainers`);
      const data = await res.json();
      setTrainers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching trainers:", err);
    }
  };

  useEffect(() => { fetchTrainers(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select a portrait image.");

    // ✅ Use FormData for file uploads
    const data = new FormData();
    data.append('name', formData.name);
    data.append('experience', formData.experience);
    data.append('specialty', formData.specialty);
    data.append('bio', formData.bio);
    data.append('image', file); // 'image' must match upload.single('image') in backend

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainers`, {
        method: 'POST',
        // ❌ IMPORTANT: Do NOT set 'Content-Type' header. 
        // The browser will automatically set it to 'multipart/form-data' with the boundary.
        body: data,
      });

      if (res.ok) {
        alert("PERSONNEL ADDED TO SYSTEM");
        setFormData({ name: '', experience: '', specialty: '', bio: '' });
        setFile(null); // Reset file input
        fetchTrainers(); 
      }
    } catch (err) {
      alert("ERROR: UPLOAD FAILED");
    }
  };

  const deleteTrainer = async (id) => {
    if (!confirm("TERMINATE THIS RECORD?")) return;
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trainers/${id}`, { method: 'DELETE' });
    fetchTrainers();
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-6 md:p-12 text-white">
      <div className="mb-12 border-l-4 border-red-600 pl-6">
        <h1 className="text-5xl font-black uppercase italic tracking-tighter">
          Personnel <span className="text-zinc-700">Management</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-zinc-900 border border-zinc-800 p-8 space-y-5">
            <h2 className="text-xl font-black uppercase italic mb-4">Register New Asset</h2>
            
            <div className="space-y-4">
              <input 
                type="text" placeholder="Full Name" required value={formData.name}
                className="w-full bg-black border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none"
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
              <input 
                type="text" placeholder="Experience" required value={formData.experience}
                className="w-full bg-black border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none"
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              />
              <input 
                type="text" placeholder="Specialty" required value={formData.specialty}
                className="w-full bg-black border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none"
                onChange={(e) => setFormData({...formData, specialty: e.target.value})}
              />

              {/* ✅ File Upload Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Portrait Image</label>
                <div className="relative border-2 border-dashed border-zinc-800 hover:border-red-600 transition-colors p-4 text-center cursor-pointer">
                  <input 
                    type="file" 
                    accept="image/*"
                    required
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  <p className="text-xs text-zinc-400 uppercase font-bold tracking-tighter">
                    {file ? `Selected: ${file.name}` : "Click to select or drag file"}
                  </p>
                </div>
              </div>

              <textarea 
                placeholder="Biography" required value={formData.bio}
                className="w-full bg-black border border-zinc-800 p-4 text-sm focus:border-red-600 outline-none h-32 resize-none"
                onChange={(e) => setFormData({...formData, bio: e.target.value})}
              />
            </div>

            <button type="submit" className="w-full bg-red-600 py-4 font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all">
              Deploy Trainer
            </button>
          </form>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-xl font-black uppercase italic mb-6 text-zinc-400">Current Roster</h2>
          {loading ? (
            <p className="animate-pulse text-zinc-600 font-bold uppercase italic">Updating Database...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {trainers.map((trainer) => (
                <div key={trainer._id} className="bg-zinc-900 border border-zinc-800 p-4 flex items-center gap-4 group">
                  <div className="w-20 h-20 bg-black overflow-hidden shrink-0">
                    {/* ✅ Prefix image with API URL for static serving */}
                    <img 
                      src={`${process.env.NEXT_PUBLIC_API_URL}${trainer.image}`} 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" 
                      alt={trainer.name} 
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-black uppercase italic text-lg leading-none">{trainer.name}</h3>
                    <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest mt-1">{trainer.specialty}</p>
                  </div>
                  <button onClick={() => deleteTrainer(trainer._id)} className="bg-zinc-800 p-3 hover:bg-red-600 transition-colors">🗑️</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}