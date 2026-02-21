'use client';

import Image from 'next/image';
import Link from 'next/link';

const JewelryCare = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Main Content Area */}
      <main className="flex-grow py-20">
        
        {/* Hero Section - Matched to About Us Style */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4 mb-24">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-[0.2em] text-[#3B1438] mb-6">
            Jewelry Care
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-light">
            "Preserve the precision. Protect the legacy."
          </p>
        </section>

        {/* Care Philosophy Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-[#3B1438] border-l-2 border-[#3B1438] pl-6 uppercase tracking-widest">
              Engineered to Last.<br />Cared for to Endure.
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              At Vellonex, every piece is built from materials chosen for longevity — aerospace-grade alloys, hardened titanium, and precision finishes. With proper care, your jewelry will maintain its structural integrity and aesthetic for decades.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              These guidelines are designed to protect the mechanical precision and refined surfaces that define Vellonex. Treat your pieces as functional heirlooms — not disposables.
            </p>
          </div>

          {/* Featured Care Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-sm grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
            <Image 
              src="/jewelry-care-new.jpg" // Replace with your actual image path in /public
              alt="Vellonex Jewelry Care - Precision Cleaning and Storage"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Core Care Pillars Section */}
        <section className="max-w-7xl mx-auto mt-32 px-6 md:px-20 border-t border-gray-100 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Daily Wear</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Remove before physical activity, swimming, or applying cosmetics. Avoid direct contact with harsh chemicals (perfume, lotion, chlorine).
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Cleaning</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Use warm water, mild soap, and a soft brush. Dry immediately with microfiber cloth. Never use ultrasonic cleaners or steam on mechanical pieces.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Storage</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Store in a dry, cool place away from direct sunlight. Use individual pouches or the original case to prevent scratches and oxidation.
              </p>
            </div>
          </div>
        </section>

        {/* Final Concierge Call to Action */}
        <section className="max-w-3xl mx-auto mt-32 px-6 text-center">
          <div className="bg-[#F9F6F2] p-12 rounded-sm">
            <h2 className="text-2xl font-serif text-[#3B1438] uppercase tracking-widest mb-4">Need Assistance?</h2>
            <p className="text-sm text-gray-600 font-light mb-8">
              Our Concierge team is available for personalized care advice, professional cleaning recommendations, or repair coordination.
            </p>
            <Link 
              href="/contact" 
              className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
            >
              Contact Concierge
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JewelryCare;