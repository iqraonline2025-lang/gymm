'use client';

import PricingGrid from "../components/PricingGrid"; 
import Footer from "../components/Footer"; 
import MembershipHero from "../components/membershipHero"; 

export default function MembershipPage() {
    return (
        <main className="bg-zinc-950 min-h-screen">
            {/* 1. Hero Section */}
            <section className="relative w-full">
                <MembershipHero />
            </section>

            {/* 2. Pricing Section - Removed -mt-20 for testing */}
            <section className="relative z-10 py-20 bg-zinc-950"> 
                <div className="max-w-7xl mx-auto px-6">
                    <PricingGrid />
                </div>
            </section>

            {/* 3. Footer */}
            <Footer />
        </main>
    )
}