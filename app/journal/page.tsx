'use client';

import Image from 'next/image';
import Link from 'next/link';

const Journal = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      {/* Main Content Area */}
      <main className="flex-grow py-20">
        
        {/* Hero Section */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4 mb-24">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-[0.2em] text-[#3B1438] mb-6">
            Vellonex Journal
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-light">
            "Stories behind the structure. Insights into the craft."
          </p>
        </section>

        {/* Brand Narrative Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-3xl font-serif text-[#3B1438] border-l-2 border-[#3B1438] pl-6 uppercase tracking-widest">
              Where Design Meets Narrative.
            </h2>
            <p className="text-gray-600 font-light leading-relaxed">
              The Vellonex Journal is a curated space where engineering meets aesthetics, precision meets poetry, and industrial soul meets refined luxury. Here, we explore the stories behind our pieces, the materials that define them, and the vision that drives us forward.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              From deep dives into material science and craftsmanship techniques to profiles of our artisan partners and explorations of contemporary design philosophy, the Journal is for those who appreciate the thought and intent woven into every Vellonex creation.
            </p>
          </div>

          {/* Featured Journal Image */}
          <div className="relative h-[500px] w-full overflow-hidden rounded-sm shadow-sm grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out">
            <Image 
              src="/journal.jpg" // Replace with your actual image path in /public
              alt="Vellonex Journal - Design, Craftsmanship, and Narrative"
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
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Craft & Process</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Behind-the-scenes looks at our materials, fabrication techniques, and the engineering that makes each piece structurally exceptional.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Inspiration & Design</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Explorations of industrial aesthetics, contemporary minimalism, and the cultural intersections that influence Vellonex's visual language.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-sm font-medium uppercase tracking-[0.3em] text-[#3B1438]">Stories & Perspectives</h3>
              <p className="text-gray-500 text-sm font-light leading-relaxed">
                Profiles of our collaborators, reflections on luxury in the modern age, and conversations about longevity, precision, and intentional design.
              </p>
            </div>
          </div>
        </section>

        {/* Latest Entries Teaser Section - Hybrid ready */}
        <section className="max-w-7xl mx-auto mt-32 px-6 md:px-20 border-t border-gray-100 pt-20">
          <h2 className="text-3xl font-serif text-center text-[#3B1438] mb-12 uppercase tracking-widest">
            Latest from the Journal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Placeholder Article Card 1 */}
            <Link href="/journal/the-science-of-titanium" className="group block">
              <div className="relative h-64 overflow-hidden rounded-sm shadow-sm">
                <Image
                  src="/journal-placeholder-1.jpg" // Add real placeholder images later
                  alt="The Science of Titanium"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-serif text-[#3B1438] mb-2">
                  The Science of Titanium
                </h3>
                <p className="text-gray-600 text-sm font-light">
                  Exploring why aerospace-grade titanium is the foundation of modern luxury durability.
                </p>
                <p className="mt-4 text-[#3B1438] text-xs uppercase tracking-widest">
                  Read More →
                </p>
              </div>
            </Link>

            {/* Placeholder Article Card 2 */}
            <Link href="/journal/asymmetry-in-design" className="group block">
              <div className="relative h-64 overflow-hidden rounded-sm shadow-sm">
                <Image
                  src="/journal-placeholder-2.jpg"
                  alt="Asymmetry in Design"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-serif text-[#3B1438] mb-2">
                  Asymmetry: The Future of Design
                </h3>
                <p className="text-gray-600 text-sm font-light">
                  How irregular forms are redefining elegance in contemporary jewelry.
                </p>
                <p className="mt-4 text-[#3B1438] text-xs uppercase tracking-widest">
                  Read More →
                </p>
              </div>
            </Link>

            {/* Placeholder Article Card 3 */}
            <Link href="/journal/ethical-sourcing" className="group block">
              <div className="relative h-64 overflow-hidden rounded-sm shadow-sm">
                <Image
                  src="/journal-placeholder-3.jpg"
                  alt="Ethical Sourcing"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-xl font-serif text-[#3B1438] mb-2">
                  Ethical Materials Journey
                </h3>
                <p className="text-gray-600 text-sm font-light">
                  Tracing the origins of our responsibly sourced alloys and stones.
                </p>
                <p className="mt-4 text-[#3B1438] text-xs uppercase tracking-widest">
                  Read More →
                </p>
              </div>
            </Link>
          </div>

          {/* View All Link */}
          <div className="text-center mt-16">
            <Link 
              href="/journal/archive" // or wherever you want the full list to go later
              className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
            >
              View All Entries
            </Link>
          </div>
        </section>

        {/* Final Concierge Call to Action */}
        <section className="max-w-3xl mx-auto mt-32 px-6 text-center">
          <div className="bg-[#F9F6F2] p-12 rounded-sm">
            <h2 className="text-2xl font-serif text-[#3B1438] uppercase tracking-widest mb-4">Explore the Journal</h2>
            <p className="text-sm text-gray-600 font-light mb-8">
              Dive into our latest stories, essays, and behind-the-scenes features. Subscribe or browse the archive for ongoing inspiration.
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

export default Journal;