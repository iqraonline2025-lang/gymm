"use client";
import React, { useState } from 'react';

const faqData = [
  {
    question: "What are the operational hours of IronCore?",
    answer: "Our facility is active 24/7 for Elite Members. Standard personnel access is from 05:00 to 23:00 daily. Check the Schedule for specific class deployment times."
  },
  {
    question: "Do I need prior experience to join CrossFit or HIIT?",
    answer: "Negative. All IronCore programs are scalable. Our trainers will adjust the intensity based on your current fitness level while pushing you toward your maximum potential."
  },
  {
    question: "How do I book a specific training slot?",
    answer: "Use the 'Direct Uplink' form or the 'Reserve' button on the Schedule page. All bookings are finalized via WhatsApp for immediate confirmation with our command staff."
  },
  {
    question: "Is there a trial period for new recruits?",
    answer: "We offer a 3-Day 'Tactical Evaluation' pass for local residents. Contact us via the uplink form to request your temporary access codes."
  },
  {
    question: "What equipment is available in the Sector?",
    answer: "We house competition-grade calibrated plates, specialized powerlifting racks, a full 20m turf sprint track, and a dedicated combat sports zone with heavy bags."
  },
  {
    question: "Are there locker rooms and showers?",
    answer: "Affirmative. High-speed decontamination zones (showers) and secure locker storage are available for all active personnel."
  },
  {
    question: "Can I cancel my membership at any time?",
    answer: "Membership protocols depend on your specific tier. Contract-free options are available, while long-term deployments offer reduced rate benefits."
  }
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-black border-t border-zinc-900">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-12 border-l-2 border-red-600 pl-4">
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            Intelligence <span className="text-zinc-600">Briefing</span>
          </h2>
          <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.2em] mt-1">
            FAQ // Knowledge_Base_v2.1 // Sector_Access
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div 
              key={index} 
              className={`border transition-all duration-300 ${
                openIndex === index ? 'border-red-600 bg-zinc-900/40' : 'border-zinc-800 bg-zinc-900/10'
              }`}
            >
              <button 
                onClick={() => toggleFaq(index)}
                className="w-full flex justify-between items-center p-6 text-left group"
              >
                <span className={`text-xs font-black uppercase tracking-widest transition-colors ${
                  openIndex === index ? 'text-white' : 'text-zinc-400 group-hover:text-zinc-200'
                }`}>
                  {item.question}
                </span>
                
                {/* Tactical Plus/Minus Icon */}
                <div className="relative w-4 h-4 flex items-center justify-center">
                  <div className={`absolute w-full h-[2px] bg-red-600 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}></div>
                  <div className={`absolute w-[2px] h-full bg-red-600 transition-transform duration-300 ${openIndex === index ? 'rotate-90 opacity-0' : ''}`}></div>
                </div>
              </button>
              
              {/* Expandable Content */}
              <div 
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-zinc-500 text-xs leading-relaxed italic font-medium border-t border-zinc-800/50 mt-2">
                  <span className="text-red-600 mr-2 font-mono font-bold">RE:</span>
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 flex items-center justify-between opacity-20">
          <div className="h-[1px] flex-grow bg-zinc-800"></div>
          <div className="px-4 text-[8px] font-mono text-zinc-500 tracking-[0.5em]">
            END_OF_BRIEFING
          </div>
          <div className="h-[1px] flex-grow bg-zinc-800"></div>
        </div>
      </div>
    </section>
  );
}