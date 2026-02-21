'use client';

import Image from 'next/image';
import Link from 'next/link';

const AboutUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Main Content Area */}
      <main className="flex-grow py-20">
        
        {/* Hero Section - Matched to Contact Page Style */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4 mb-24">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-[0.2em] text-[#3B1438] mb-6">
            Vellonex
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-light">
            "Engineering the aesthetic. Forging the future."
          </p>
        </section>

        {/* Brand Narrative Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-[#3B1438] border-l-2 border-[#3B1438] pl-6 uppercase tracking-widest">
              Industrial Soul.<br />Luxury Precision.
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              At Vellonex, we believe that luxury shouldn't be fragile. It should be structural. Our journey began with a single obsession: the marriage of high-density engineering and refined design. 
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              From the aerospace-grade Titanium of <strong className="text-[#3B1438]">The Series</strong> to our precision-etched 3D geometries, we curate items for those who appreciate the mechanical character of fine objects. We don't just sell accessories; we provide the instruments for a life built on precision.
            </p>
          </div>

          {/* Featured Brand Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-sm grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
            <Image 
              src="/vellonex-studio.jpg" // Ensure this image is in your public folder
              alt="Vellonex Studio - Industrial Design and Craftsmanship"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Core Pillars Section */}
        <section className="max-w-7xl mx-auto mt-32 px-6 md:px-20 border-t border-gray-100 pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Materiality</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">Forged from 316L Stainless Steel, Titanium, and Tungsten. Built to withstand the elements and the passage of time.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Haptics</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">Design you can feel. Tactile feedback and mechanical integrity are integrated into our core DNA.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Longevity</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">We reject the disposable. Every Vellonex item is a structural asset designed for the long haul.</p>
            </div>
          </div>
        </section>

        {/* Final Concierge Call to Action */}
        <section className="max-w-3xl mx-auto mt-32 px-6 text-center">
          <div className="bg-[#F9F6F2] p-12 rounded-sm">
            <h2 className="text-2xl font-serif text-[#3B1438] uppercase tracking-widest mb-4">The Personal Touch</h2>
            <p className="text-sm text-gray-600 font-light mb-8">
              Every Vellonex piece is backed by our dedicated Concierge team. We are here to assist with technical specifications, styling, or custom inquiries.
            </p>
            <Link 
              href="/contact" 
              className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
            >
              Consult the Concierge
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUs;