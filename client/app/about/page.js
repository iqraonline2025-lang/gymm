'use client';

import AboutHero from "../components/AboutHero";
import Achievements from "../components/Achievements";
import Footer from "../components/Footer";
import GymGallery from "../components/GymGallery";
import GymStory from "../components/GymStory";
import Mission from "../components/Mission";
import Vision from "../components/Vision";

export default function About() {
    return (
        <>
         <AboutHero />
         <GymStory />
         <Mission />
         <Vision />
         <GymGallery />
         <Achievements />
         <Footer />
        </>
    )
}