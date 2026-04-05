import React from 'react';

const Features = () => {
  const featureData = [
    {
      title: "Modern Equipment",
      description: "Train on the industry's latest high-performance machines and premium free weights.",
      // Dumbbell Icon
      icon: <path d="M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM6 10h4v4H6v-4zm10 4h-4v-4h4v4z" />
    },
    {
      title: "Certified Trainers",
      description: "Accredited professionals dedicated to safe, effective, and science-based coaching.",
      // Certificate Icon
      icon: <path d="M12 14.5l-5 3 2-6-5-4 6-.5 2-5.5 2 5.5 6 .5-5 4 2 6z" />
    },
    {
      title: "Flexible Timings",
      description: "Your schedule, your terms. We offer extended hours and 24/7 access options.",
      // Clock Icon
      icon: <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8zm1-13h-2v5l4.3 2.5 1-1.7-3.3-2z" />
    },
    {
      title: "Personal Training",
      description: "1-on-1 sessions with customized workout plans and accountability tailored to you.",
      // Users Icon
      icon: <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2m7-10a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm11 10v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75" />
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-black uppercase tracking-tight">
            Elevate Your Game
          </h2>
          <div className="h-1 w-20 bg-red-600 mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {featureData.map((item, index) => (
            <div key={index} className="group p-6 transition-all duration-300 hover:bg-gray-50 rounded-xl">
              <div className="mb-6 inline-block p-4 bg-black text-white rounded-lg group-hover:bg-red-600 transition-colors">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-8 h-8"
                >
                  {item.icon}
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;