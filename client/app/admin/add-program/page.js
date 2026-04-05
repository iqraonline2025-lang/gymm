"use client";
import React, { useState } from 'react';
import { createProgram } from '@/utils/api';

export default function AddProgram() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    benefits: '', 
    target: '',
    image: null // Changed to null to store the File object
  });

  const handleTitleChange = (e) => {
    const title = e.target.value;
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    setFormData({ ...formData, title, slug });
  };

  // New handler for file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ We must use FormData for file uploads
      const data = new FormData();
      data.append('title', formData.title);
      data.append('slug', formData.slug);
      data.append('description', formData.description);
      data.append('target', formData.target);
      data.append('image', formData.image); // Appending the actual file

      // Format benefits into an array and stringify for the backend to parse
      const benefitsArray = formData.benefits.split(',').map(b => b.trim()).filter(b => b !== "");
      data.append('benefits', JSON.stringify(benefitsArray));

      await createProgram(data);
      alert("✅ Program forged and added to the database!");
      
      // Reset form
      setFormData({ title: '', slug: '', description: '', benefits: '', target: '', image: null });
      // Reset the file input manually if needed
      e.target.reset();
    } catch (err) {
      alert(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black p-6 md:p-20">
      <div className="max-w-2xl mx-auto">
        <header className="mb-12">
          <h1 className="text-5xl font-black uppercase italic tracking-tighter">
            Admin <span className="text-red-600">Entry</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mt-2">
            Upload new disciplines to the gym arsenal
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required
              type="text" 
              placeholder="PROGRAM TITLE" 
              className="p-4 border-2 border-black font-bold uppercase outline-none focus:border-red-600 transition-colors"
              value={formData.title}
              onChange={handleTitleChange}
            />
            <input 
              required
              type="text" 
              placeholder="SLUG" 
              className="p-4 border-2 border-zinc-200 font-mono text-sm outline-none bg-zinc-50"
              value={formData.slug}
              readOnly
            />
          </div>

          <textarea 
            required
            placeholder="DETAILED DESCRIPTION..." 
            className="w-full p-4 border-2 border-black font-medium h-32 outline-none focus:border-red-600"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <input 
            required
            type="text" 
            placeholder="BENEFITS (COMMA SEPARATED)" 
            className="w-full p-4 border-2 border-black font-bold outline-none focus:border-red-600"
            value={formData.benefits}
            onChange={(e) => setFormData({...formData, benefits: e.target.value})}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              required
              type="text" 
              placeholder="TARGET AUDIENCE" 
              className="p-4 border-2 border-black font-bold uppercase outline-none focus:border-red-600"
              value={formData.target}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
            />
            
            {/* ✅ FILE INPUT REPLACED IMAGE URL INPUT */}
            <div className="relative border-2 border-black p-3 bg-zinc-50">
              <label className="block text-[10px] font-black uppercase mb-1">Upload Program Image</label>
              <input 
                required
                type="file" 
                accept="image/*"
                className="text-xs font-bold uppercase"
                onChange={handleFileChange}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-black text-white py-6 font-black uppercase italic tracking-widest hover:bg-red-600 transition-all disabled:bg-zinc-300"
          >
            {loading ? "UPLOADING TO DATABASE..." : "PUBLISH TO SERVICES"}
          </button>
        </form>
      </div>
    </div>
  );
}