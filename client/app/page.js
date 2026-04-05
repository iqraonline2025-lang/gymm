'use client';

import Features from "./components/Features";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Programs from "./components/Programs";
import Testimonials from "./components/Testimonials";
import Trainers from "./components/Trainers";

export default function Home() {
  return (
    <>
     <Hero />
     <Features />
     <Programs />
     <Trainers />
     <Testimonials />
     <Footer />
    </>
  )
}