'use client';

import Image from 'next/image';
import Link from 'next/link';

const TheEdit = () => {
  const features = [
    {
      title: "The Neural Architecture",
      subtitle: "Series 01: Face Frames",
      description: "A bold exploration of fluid mechanical design. The Neural is not just an accessory; it is a structural transformation of the silhouette.",
      image: "/the-neural.jpg",
      link: "/product/the-neural-fluid-mechanical-face-frame"
    },
    {
      title: "Magnetic Versatility",
      subtitle: "Series 02: The Vector",
      description: "Transition seamlessly from high-protection polarized optics to precision night-driving lenses with our magnetic titanium system.",
      image: "/the-vector.jpg",
      link: "/product/the-vector-magnetic-titanium-square"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-grow pb-32 pt-12 px-6 md:px-20">
        
        {/* Header Section */}
        <section className="max-w-7xl mx-auto mb-24 border-b border-gray-100 pb-16">
          <h1 className="text-[10px] font-medium uppercase tracking-[0.5em] text-[#3B1438] mb-6">
            Curated Selection
          </h1>
          <h2 className="text-6xl md:text-8xl font-serif tracking-widest uppercase mb-8 text-[#3B1438]">
            The Edit
          </h2>
          <p className="max-w-xl text-gray-500 leading-relaxed uppercase text-[10px] tracking-[0.25em]">
            A precise curation of industrial artifacts, mechanical jewelry, and tactical eyewear. Selected for their structural integrity and avant-garde character.
          </p>
        </section>

        {/* Lookbook Grid */}
        <section className="max-w-7xl mx-auto space-y-48">
          {features.map((item, index) => (
            <div 
              key={index} 
              className={`flex flex-col md:flex-row gap-16 items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Feature Image */}
              <div className="relative h-[700px] w-full md:w-3/5 overflow-hidden bg-[#F9F6F2] rounded-sm group">
                <Image 
                  src={item.image} 
                  alt={item.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[1.5s] ease-in-out"
                />
                {/* Subtle Overlay */}
                <div className="absolute inset-0 bg-[#3B1438]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              {/* Feature Text */}
              <div className="w-full md:w-2/5 space-y-8 px-4">
                <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-[#3B1438]">
                  {item.subtitle}
                </p>
                <h3 className="text-4xl md:text-5xl font-serif uppercase tracking-tight leading-tight text-[#3B1438]">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-light leading-relaxed max-w-sm">
                  {item.description}
                </p>
                <Link 
                  href={item.link}
                  className="inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#3B1438] border-b border-[#3B1438]/30 pb-3 hover:border-[#3B1438] transition-all"
                >
                  Explore Piece →
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default TheEdit;