'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function EthicalSourcing() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-grow">
        {/* Hero / Title Section */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.15em] text-[#3B1438] mb-6">
            Ethical Materials Journey
          </h1>
          <div className="text-gray-500 text-sm md:text-base tracking-wider uppercase">
            <span>March 25, 2026</span>
            <span className="mx-3">•</span>
            <span>9 min read</span>
          </div>
        </section>

        {/* Featured Image */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/journal-placeholder-3.jpg"  // ← use the generated image
              alt="Ethical Materials Journey — Vellonex Responsible Sourcing"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24 prose prose-neutral prose-lg md:prose-xl prose-headings:text-[#3B1438] prose-headings:font-serif prose-a:text-[#3B1438] prose-a:no-underline hover:prose-a:underline">
          <p>
            True luxury cannot exist without responsibility. At Vellonex, ethical sourcing is not a marketing claim — it is a non-negotiable part of our engineering and design philosophy. Every material we use is selected with traceability, environmental impact, and human welfare in mind.
          </p>

          <h2>Our Sourcing Principles</h2>
          <p>
            We adhere to four core standards across every component:
          </p>
          <ul>
            <li><strong>Traceability</strong>: Full chain-of-custody documentation from mine/refinery to final assembly</li>
            <li><strong>Conflict-Free</strong>: All metals certified under Responsible Minerals Initiative (RMI) protocols</li>
            <li><strong>Low-Impact Extraction</strong>: Preference for recycled and upcycled sources whenever possible</li>
            <li><strong>Fair Labor</strong>: All partners audited against SMETA 4-pillar or equivalent standards</li>
          </ul>

          <h2>Titanium — Recycled & Responsible</h2>
          <p>
            Our Grade 5 titanium is sourced from suppliers who prioritize aerospace scrap recycling. Approximately 60–70% of each billet comes from post-industrial recycled content, significantly reducing the environmental footprint compared to virgin extraction.
          </p>

          <p>
            Primary suppliers are certified under the Aluminium Stewardship Initiative (ASI) equivalent frameworks for titanium, ensuring energy-efficient melting and minimal waste.
          </p>

          <h2>Stones & Gemstones</h2>
          <p>
            When natural stones are used, they are sourced exclusively from conflict-free, ethically mined origins with Kimberley Process certification (diamonds) or equivalent guarantees for colored gems. Increasingly, we shift toward lab-grown alternatives — chemically, optically, and physically identical to mined stones, but with dramatically lower environmental and social impact.
          </p>

          <h2>Leather & Organic Materials</h2>
          <p>
            All leather components come from LWG (Leather Working Group) Gold-rated tanneries. We prioritize vegetable-tanned or chrome-free processes and actively seek regenerative farming sources. Textile elements (such as cord or lining) are sourced from OEKO-TEX Standard 100 certified suppliers.
          </p>

          <h2>Transparency & Accountability</h2>
          <p>
            We publish annual material sourcing reports and maintain third-party audit records available upon request. Our goal is full traceability to the original mine or recycling facility for every significant component — a standard far beyond what most luxury brands achieve.
          </p>

          <p className="italic">
            Ethical sourcing is not the endpoint of luxury — it is the baseline. At Vellonex, responsibility is structural, just like our pieces.
          </p>
        </section>

        {/* Back to Journal + Share CTA */}
        <section className="max-w-3xl mx-auto px-6 text-center pb-20">
          <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
            <Link 
              href="/journal"
              className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
            >
              Back to Journal
            </Link>
            <Link 
              href="/contact"
              className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
            >
              Discuss This Article
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}