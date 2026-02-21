'use client';

import Image from 'next/image';
import Link from 'next/link';

const Stockists = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Main Content Area */}
      <main className="flex-grow py-20">
        
        {/* Hero Section - Matched to previous pages */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4 mb-24">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-[0.2em] text-[#3B1438] mb-6">
            Stockists
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-light">
            "Discover Vellonex worldwide."
          </p>
        </section>

        {/* Stockists Introduction Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-[#3B1438] border-l-2 border-[#3B1438] pl-6 uppercase tracking-widest">
              Curated Partners.<br />Global Reach.
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Vellonex is available through a carefully selected network of premium retailers, galleries, and concept stores worldwide. Each stockist shares our commitment to precision craftsmanship, industrial elegance, and enduring quality.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Whether you're seeking a signature piece or exploring our latest collection, our partners provide expert guidance and the full Vellonex experience in carefully curated environments.
            </p>
          </div>

          {/* Featured Stockists Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-sm grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
            <Image 
              src="/stockists-new.jpg" // Replace with your actual image path in /public
              alt="Vellonex Stockists - Premium Retail Partners Worldwide"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Core Stockists Pillars Section */}
        <section className="max-w-7xl mx-auto mt-32 px-6 md:px-20 border-t border-gray-100 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Curated Selection</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Our stockists carry the full Vellonex collection or exclusive pieces, presented with expert curation and storytelling.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Global Network</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                From flagship boutiques in major cities to select galleries in design districts — discover Vellonex in the world's most discerning retail spaces.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">In-Store Experience</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Visit our partners for personalized consultations, try-on sessions, and expert advice from trained staff who understand Vellonex's engineering and aesthetic.
              </p>
            </div>
          </div>
        </section>

        {/* Final Concierge Call to Action */}
        <section className="max-w-3xl mx-auto mt-32 px-6 text-center">
          <div className="bg-[#F9F6F2] p-12 rounded-sm">
            <h2 className="text-2xl font-serif text-[#3B1438] uppercase tracking-widest mb-4">Find a Stockist Near You</h2>
            <p className="text-sm text-gray-600 font-light mb-8">
              Contact our Concierge for the most up-to-date list of authorized retailers, current stock availability, or to arrange a private viewing.
            </p>
            <Link 
              href="/contact" 
              className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
            >
              Inquire About Stockists
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Stockists;