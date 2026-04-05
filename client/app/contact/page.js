'use client';

import ContactForm from "../components/ContactForm";
import ContactHero from "../components/ContactHero";
import FaqSection from "../components/FaqSection";
import Footer from "../components/Footer";
import GymMap from "../components/GymMap";

export default function Contact() {
    return (
        <>
         <ContactHero />
         <ContactForm />
         <FaqSection />
         <GymMap />
         <Footer />
        </>
    )
}