'use client';
import React, { Suspense } from 'react'; // 1. Added Suspense
import PricingGrid from "../components/PricingGrid"; 
import Footer from "../components/Footer"; 
import MembershipHero from "../components/membershipHero"; 

// 2. Create a content component
function MembershipContent() {
    return (
        <main className="bg-zinc-950 min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative w-full">
                <MembershipHero />
            </section>

            {/* 2. Pricing Section */}
            <section className="relative z-10 py-20 bg-zinc-950"> 
                <div className="max-w-7xl mx-auto px-6">
                    <PricingGrid />
                </div>
            </section>

            {/* 3. Footer */}
            <Footer />
        </main>
    );
}

// 3. Default export wrapped in Suspense
export default function MembershipPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="text-red-600 font-black uppercase italic tracking-widest animate-pulse">
                    Loading_Membership_Data...
                </div>
            </div>
        }>
            <MembershipContent />
        </Suspense>
    );
}
