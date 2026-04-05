"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; // Added for navigation
import { getAllPlans } from '@/utils/api';

export default function AdminPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    features: '',
    isPopular: false
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    const data = await getAllPlans();
    setPlans(data);
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Form Validation & Formatting
    const formattedData = {
      ...formData,
      // Handle empty string to prevent empty array elements
      features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
      price: Number(formData.price)
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedData),
      });

      if (response.ok) {
        setFormData({ name: '', price: '', features: '', isPopular: false });
        fetchPlans();
        alert("Plan Added Successfully! 🚀");
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error("Submit Error:", err);
      alert("Failed to connect to server.");
    }
  };

  // ✅ Added Delete Functionality
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPlans();
      } else {
        alert("Failed to delete plan.");
      }
    } catch (err) {
      console.error("Delete Error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      {/* Back Link */}
      <Link href="/admin" className="text-zinc-500 hover:text-red-600 text-xs uppercase font-black mb-8 inline-block transition-colors">
        &larr; Back to Control Center
      </Link>

      <h1 className="text-4xl font-black uppercase italic mb-10 text-red-600 tracking-tighter">
        Plan <span className="text-white">Manager</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT: CREATE FORM */}
        <div className="bg-zinc-900 p-8 border border-zinc-800 shadow-2xl">
          <h2 className="text-xl font-bold uppercase italic mb-6 border-b border-zinc-800 pb-4">Create New Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">Plan Name</label>
              <input 
                type="text" 
                placeholder="e.g. ELITE ACCESS"
                className="w-full bg-zinc-800 border border-zinc-700 p-4 outline-none focus:border-red-600 transition-all text-sm uppercase italic font-bold"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required 
              />
            </div>
            
            <div>
              <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">Monthly Price (£)</label>
              <input 
                type="number" 
                placeholder="49.99"
                className="w-full bg-zinc-800 border border-zinc-700 p-4 outline-none focus:border-red-600 transition-all text-sm font-bold"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                required 
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase font-black text-zinc-500 mb-2 tracking-widest">Features (Separate with commas)</label>
              <textarea 
                placeholder="24/7 Access, Free Guest Pass, Personal Trainer"
                className="w-full bg-zinc-800 border border-zinc-700 p-4 outline-none focus:border-red-600 transition-all h-32 text-sm italic"
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                required 
              />
            </div>

            <div className="flex items-center gap-3 bg-zinc-800/50 p-4 border border-zinc-800">
              <input 
                type="checkbox" 
                id="isPopular"
                className="w-4 h-4 accent-red-600"
                checked={formData.isPopular}
                onChange={(e) => setFormData({...formData, isPopular: e.target.checked})}
              />
              <label htmlFor="isPopular" className="text-[10px] uppercase font-black tracking-widest cursor-pointer">
                Highlight as "Most Popular"
              </label>
            </div>

            <button className="w-full bg-red-600 py-5 font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all duration-300">
              Deploy Plan
            </button>
          </form>
        </div>

        {/* RIGHT: LIVE LIST */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold uppercase italic mb-6 border-b border-zinc-800 pb-4 text-zinc-400">Active Plans ({plans.length})</h2>
          
          {loading ? (
            <p className="text-zinc-600 italic animate-pulse uppercase font-black text-xs">Syncing with Arsenal...</p>
          ) : plans.length === 0 ? (
            <p className="text-zinc-600 italic uppercase font-black text-xs">No active plans detected.</p>
          ) : (
            plans.map((plan) => (
              <div key={plan._id} className="group bg-zinc-900 border border-zinc-800 p-6 flex justify-between items-center hover:border-zinc-500 transition-all">
                <div>
                  <h3 className="font-black uppercase italic text-lg tracking-tight group-hover:text-red-600 transition-colors">
                    {plan.name} {plan.isPopular && <span className="text-[8px] bg-red-600 text-white px-2 py-0.5 ml-2 not-italic">POPULAR</span>}
                  </h3>
                  <p className="text-zinc-400 font-bold text-sm italic">£{plan.price} <span className="text-[10px] text-zinc-600">/ MONTH</span></p>
                </div>
                
                <button 
                  onClick={() => handleDelete(plan._id)}
                  className="bg-zinc-800 p-3 hover:bg-red-600 group-hover:bg-zinc-700 transition-all text-zinc-500 hover:text-white"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}