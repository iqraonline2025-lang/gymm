"use client";
import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    intent: 'General Inquiry', // Default intent
    message: ''
  });

  const handleWhatsAppSend = (e) => {
    e.preventDefault();

    // REPLACE WITH YOUR PHONE (Format: CountryCode + Number, no + or spaces)
    const yourPhone = "1234567890"; 

    // Formatting the multi-purpose transmission
    const text = `*--- IRONCORE COMMAND UPLINK ---*%0A` +
                 `*Type:* ${formData.intent.toUpperCase()}%0A` +
                 `*Operator:* ${formData.name}%0A` +
                 `*Direct_Line:* ${formData.phone}%0A` +
                 `*Location:* ${formData.address}%0A` +
                 `*Email:* ${formData.email}%0A%0A` +
                 `*Message:* ${formData.message}%0A` +
                 `*--- END TRANSMISSION ---*`;

    window.open(`https://wa.me/${yourPhone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-zinc-900/40 border border-zinc-800 p-8 md:p-12 relative">
      {/* Corner Accents */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-red-600"></div>
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-red-600"></div>

      <form onSubmit={handleWhatsAppSend} className="space-y-6">
        
        {/* Intent Selector (The "Switch") */}
        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">Mission_Type</label>
          <select 
            className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none uppercase font-bold cursor-pointer"
            onChange={(e) => setFormData({...formData, intent: e.target.value})}
          >
            <option value="General Inquiry">General Inquiry / Support</option>
            <option value="Class Booking">Reserve Training Slot</option>
            <option value="Membership Access">Membership Acquisition</option>
            <option value="Private Coaching">Elite 1-on-1 Request</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Full_Name</label>
            <input 
              type="text" required
              className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
              placeholder="IDENTIFY YOURSELF"
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Comm_Link (Email)</label>
            <input 
              type="email" required
              className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
              placeholder="EMAIL@SECURE.COM"
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Phone */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Phone_Digits</label>
            <input 
              type="tel" required
              className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
              placeholder="+00 000 000 000"
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          {/* Address */}
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Current_Sector (Address)</label>
            <input 
              type="text" required
              className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all"
              placeholder="CITY, COUNTRY"
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>
        </div>

        {/* Message / Booking Details */}
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">
            {formData.intent === 'Class Booking' ? 'Class_Name_&_Time' : 'Message_Payload'}
          </label>
          <textarea 
            rows="4" required
            className="w-full bg-black border border-zinc-800 p-4 text-xs text-white focus:border-red-600 outline-none transition-all resize-none italic"
            placeholder={formData.intent === 'Class Booking' ? "Example: Monday 06:00 AM - Dawn Breaker Yoga" : "HOW CAN WE ASSIST?"}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>

        {/* Submit */}
        <button 
          type="submit"
          className="w-full bg-red-600 hover:bg-white hover:text-black text-white font-black py-5 uppercase italic tracking-[0.4em] text-[10px] transition-all duration-500 shadow-lg shadow-red-900/20"
        >
          Send Transmission
        </button>
      </form>
    </div>
  );
}