'use client';

import Image from 'next/image';
import Link from 'next/link';

const Repairs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Main Content Area */}
      <main className="flex-grow py-20">
        
        {/* Hero Section - Matched to About Us & Jewelry Care Style */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4 mb-24">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-[0.2em] text-[#3B1438] mb-6">
            Repairs & Service
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-light">
            "Engineered for longevity. Supported with care."
          </p>
        </section>

        {/* Service Philosophy Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-[#3B1438] border-l-2 border-[#3B1438] pl-6 uppercase tracking-widest">
              Built to Last.<br />Supported for Life.
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              Vellonex pieces are crafted from durable, high-grade materials designed to withstand daily wear and time. While we do not operate an in-house repair workshop, we stand behind every piece with a comprehensive warranty and dedicated support.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              For manufacturing defects, we offer replacement or refund. For normal wear, resizing, stone replacement or accidental damage, our Concierge team provides professional guidance, trusted local jeweler recommendations, or coordination with specialist repair partners.
            </p>
          </div>

          {/* Featured Service Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-sm grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
            <Image 
              src="/repairs.jpg" // Replace with your actual image path in /public
              alt="Vellonex Service Support - Warranty and Professional Guidance"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Core Service Pillars Section */}
        <section className="max-w-7xl mx-auto mt-32 px-6 md:px-20 border-t border-gray-100 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Warranty Coverage</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                All Vellonex jewelry includes a 1-year warranty against manufacturing defects. Proof of purchase required. Normal wear and accidental damage not covered.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Replacement Policy</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Defective items may be replaced or refunded within warranty period. Contact Concierge for assessment. Shipping covered for approved claims.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Professional Guidance</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                For wear-related services or repairs, our team recommends trusted local jewelers or coordinates with specialist partners. Full transparency on costs provided.
              </p>
            </div>
          </div>
        </section>

        {/* Final Concierge Call to Action */}
        <section className="max-w-3xl mx-auto mt-32 px-6 text-center">
          <div className="bg-[#F9F6F2] p-12 rounded-sm">
            <h2 className="text-2xl font-serif text-[#3B1438] uppercase tracking-widest mb-4">Need Support?</h2>
            <p className="text-sm text-gray-600 font-light mb-8">
              Submit your inquiry for warranty claims, replacement requests, or professional repair guidance. Our Concierge team responds within 24–48 hours.
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

export default Repairs;