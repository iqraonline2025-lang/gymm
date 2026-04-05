import Link from 'next/link';

const Hero = () => {
  return (
    <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden bg-black">
      {/* 1. Background Image & Overlays */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 hover:scale-105"
        style={{
          // Professional gym backgroud
          backgroundImage: `url('/images/hero.jpg')`,
        }}
      >
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/70"></div>
        {/* Red gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-red-900/20"></div>
      </div>

      {/* 2. Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        {/* Heading */}
        <h1 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter italic leading-none">
          Transform Your <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Body.</span> <br />
          Transform Your <span className="text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]">Life.</span>
        </h1>
        
        {/* Subheading */}
        <p className="mt-8 text-lg md:text-2xl text-gray-300 font-medium max-w-2xl mx-auto">
          Stop making excuses. Join the elite fitness community at <span className="text-white font-bold">IRONCORE</span>. 
          The best equipment and expert trainers in <span className="text-red-500">Downtown City</span>.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/register" 
            className="px-10 py-4 bg-red-600 text-white text-sm font-black uppercase tracking-widest hover:bg-red-700 transition transform hover:scale-105 shadow-xl"
          >
            Join Now
          </Link>
          
          <Link 
            href="/contact" 
            className="px-10 py-4 bg-transparent border-2 border-white text-white text-sm font-black uppercase tracking-widest hover:bg-white hover:text-black transition transform hover:scale-105"
          >
            Book Free Trial
          </Link>
        </div>
      </div>

      {/* 3. Decorative Scroll Bar */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-[1px] h-16 bg-gradient-to-b from-red-600 to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;