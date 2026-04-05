export default function TrainerCard({ trainer }) {
  // ✅ Construct the full image path
  const imageUrl = `${process.env.NEXT_PUBLIC_API_URL}${trainer.image}`;

  return (
    <div className="group relative bg-zinc-900 border border-zinc-800 overflow-hidden transition-all duration-500 hover:border-red-600">
      {/* Portrait Image */}
      <div className="aspect-[3/4] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
        <img 
          src={imageUrl} 
          alt={trainer.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          /* Fallback in case image fails to load */
          onError={(e) => { e.target.src = "https://via.placeholder.com/400x600?text=IMAGE+NOT+FOUND"; }}
        />
      </div>

      {/* Info Block */}
      <div className="p-8 relative bg-zinc-950">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-red-600 font-black text-[10px] uppercase tracking-widest italic block mb-1">
              {trainer.experience} Experience
            </span>
            <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">
              {trainer.name}
            </h3>
          </div>
          <div className="text-zinc-800 font-black text-2xl select-none">
             {/* This looks cool, but keep in mind it changes on every refresh */}
            0{Math.floor(Math.random() * 9) + 1}
          </div>
        </div>
        
        <p className="text-zinc-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-6 border-b border-zinc-900 pb-4">
          {trainer.specialty}
        </p>
        
        <p className="text-zinc-400 text-xs leading-relaxed italic opacity-80 group-hover:opacity-100 transition-opacity">
          {trainer.bio}
        </p>

        {/* Decorative Corner */}
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-red-600 translate-x-4 translate-y-4 rotate-45 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500"></div>
      </div>
    </div>
  );
}