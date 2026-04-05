"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { getAllPlans } from '@/utils/api';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PricingGrid() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchPlans = async () => {
      const data = await getAllPlans();
      setPlans(data);
      setLoading(false);
    };
    fetchPlans();
  }, []);

  // 1. We wrap handleSubscription in useCallback so it can be used safely inside useEffect
  const handleSubscription = useCallback(async (planId) => {
    if (status === "unauthenticated") {
      // 2. We add 'resumePlan' to the callbackUrl
      router.push(`/login?callbackUrl=/membership?resumePlan=${planId}`);
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/plans/create-checkout`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.id}` 
        },
        body: JSON.stringify({ 
          planId,
          userId: session?.user?.id,
          email: session?.user?.email 
        }),
      });

      const sessionData = await response.json();
      if (sessionData.error) throw new Error(sessionData.error);
      if (sessionData.url) window.location.href = sessionData.url;
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Checkout failed. Please try again.");
    }
  }, [status, session, router]);

  // 3. AUTO-RESUME LOGIC: Triggers when the user returns from Login
  useEffect(() => {
    const resumePlanId = searchParams.get('resumePlan');
    
    if (resumePlanId && status === "authenticated") {
      // Remove the ID from the URL immediately so it doesn't loop
      const newUrl = window.location.pathname;
      window.history.replaceState({}, '', newUrl);
      
      // Fire the subscription logic automatically
      handleSubscription(resumePlanId);
    }
  }, [status, searchParams, handleSubscription]);

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-zinc-500 uppercase font-black italic tracking-[0.3em] animate-pulse">Syncing Arsenal</p>
      </div>
    </div>
  );

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] select-none">
        <h2 className="text-[20vw] font-black uppercase italic leading-none whitespace-nowrap">IronCore • Power • Results • No Excuses •</h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter text-white mb-4">
            Pick Your <span className="text-red-600">Weapon</span>
          </h2>
          <p className="text-zinc-500 font-bold uppercase tracking-[0.4em] text-xs">Tiered Access Control v2.0</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {plans.map((plan) => (
            <div 
              key={plan._id} 
              className={`group relative flex flex-col p-1 transition-all duration-500 ${
                plan.isPopular ? 'scale-105 z-20' : 'hover:scale-102'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute inset-0 bg-red-600 blur-2xl opacity-10 animate-pulse"></div>
              )}

              <div className={`flex flex-col h-full p-10 relative bg-zinc-950 border-t-4 ${
                plan.isPopular ? 'border-red-600' : 'border-zinc-800'
              } hover:border-white transition-colors duration-500`}>
                
                {plan.isPopular && (
                  <div className="absolute -top-10 left-0 w-full text-center">
                    <span className="bg-red-600 text-white text-[10px] font-black uppercase italic px-6 py-2 tracking-[0.2em] shadow-lg">
                      Recommended Protocol
                    </span>
                  </div>
                )}

                <div className="mb-10">
                  <h3 className="text-sm font-black uppercase tracking-[0.3em] text-zinc-500 mb-2 group-hover:text-red-600 transition-colors">
                    Level 0{plans.indexOf(plan) + 1}
                  </h3>
                  <h4 className="text-4xl font-black uppercase italic text-white tracking-tighter leading-none mb-4">
                    {plan.name}
                  </h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-black text-white italic tracking-tighter group-hover:scale-110 transition-transform origin-left">£{plan.price}</span>
                    <span className="text-zinc-600 uppercase font-black text-[10px] tracking-widest leading-none">/ Mo</span>
                  </div>
                </div>
                
                <ul className="mb-12 space-y-6 flex-grow border-t border-zinc-900 pt-10">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-zinc-400 text-xs font-bold uppercase italic flex items-center gap-4 group/item">
                      <div className="w-2 h-2 bg-zinc-800 group-hover/item:bg-red-600 rotate-45 transition-colors" />
                      <span className="group-hover/item:text-white transition-colors">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => handleSubscription(plan._id)}
                  className={`relative overflow-hidden group/btn w-full py-6 font-black uppercase italic tracking-[0.2em] text-xs transition-all duration-300 ${
                    plan.isPopular 
                    ? 'bg-red-600 text-white' 
                    : 'bg-white text-black'
                  }`}
                >
                  <span className="relative z-10">
                    {status === "unauthenticated" ? "Login to Subscribe" : "Initiate Subscription"}
                  </span>
                  <div className={`absolute inset-0 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ${
                    plan.isPopular ? 'bg-white' : 'bg-red-600'
                  }`}></div>
                  <span className={`absolute inset-0 z-20 flex items-center justify-center translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 pointer-events-none ${
                    plan.isPopular ? 'text-black' : 'text-white'
                  }`}>
                    {status === "unauthenticated" ? "Login Required" : "Deploy Access →"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}