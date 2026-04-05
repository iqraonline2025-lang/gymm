import React from 'react';
import Link from 'next/link';

const reviews = [
  {
    quote: "Best gym ever! Lost 10kg in 3 months. The community and trainers keep you accountable every single day.",
    author: "James Wilson",
    role: "Weight Loss Program",
    rating: 5
  },
  {
    quote: "The CrossFit equipment is top-tier. I've been to many boxes, but the atmosphere here is unmatched.",
    author: "Elena Rodriguez",
    role: "CrossFit Athlete",
    rating: 5
  },
  {
    quote: "Yoga sessions here changed my recovery game. The instructors actually understand sports science.",
    author: "Tom Hardiman",
    role: "Yoga & Mobility",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.4em] px-4 py-1 mb-4">
            Success Stories
          </span>
          <h2 className="text-5xl md:text-6xl font-black uppercase italic tracking-tighter">
            Don't take our <span className="text-zinc-400">word for it</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reviews.map((rev, index) => (
            <div key={index} className="flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(rev.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 fill-red-600" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-2xl font-bold leading-tight italic mb-8 flex-grow">
                "{rev.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4 border-t border-zinc-100 pt-6">
                <div className="w-12 h-12 bg-zinc-200 rounded-full flex items-center justify-center font-black text-zinc-500">
                  {rev.author[0]}
                </div>
                <div>
                  <h4 className="font-black uppercase italic text-sm">{rev.author}</h4>
                  <p className="text-red-600 text-[10px] font-bold uppercase tracking-widest">
                    {rev.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-10 bg-zinc-950 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <h3 className="text-3xl font-black uppercase italic tracking-tight text-center md:text-left">
            Ready to be our next <br /> <span className="text-red-600 underline">success story?</span>
          </h3>
          <Link 
  href="/contact" 
  className="px-10 py-4 bg-white text-black font-black uppercase italic tracking-widest hover:bg-red-600 hover:text-white transition-all whitespace-nowrap text-center"
>
  Join the movement
</Link>
        </div>
      </div>
    </section>
  );
}