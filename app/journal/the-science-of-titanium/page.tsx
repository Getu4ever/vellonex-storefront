'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function TitaniumScience() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-grow">
        {/* Hero / Title Section */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.15em] text-[#3B1438] mb-6">
            The Science of Titanium
          </h1>
          <div className="text-gray-500 text-sm md:text-base tracking-wider uppercase">
            <span>February 15, 2026</span>
            <span className="mx-3">•</span>
            <span>8 min read</span>
          </div>
        </section>

        {/* Featured Image */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/journal-placeholder-1.jpg"  // ← use the generated image
              alt="The Science of Titanium — Vellonex Engineering"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24 prose prose-neutral prose-lg md:prose-xl prose-headings:text-[#3B1438] prose-headings:font-serif prose-a:text-[#3B1438] prose-a:no-underline hover:prose-a:underline">
          <p>
            Titanium is not merely a material — it is the foundation upon which modern performance luxury is built. With a strength-to-weight ratio superior to steel, near-total corrosion resistance, and complete biocompatibility, aerospace-grade titanium allows Vellonex to create jewelry that is simultaneously feather-light, virtually indestructible, and safe for lifelong wear.
          </p>

          <h2>Grade 5 (6Al-4V) — The Gold Standard</h2>
          <p>
            We exclusively use Ti-6Al-4V (Grade 5), the most widely used titanium alloy in aerospace, medical implants, and high-performance motorsport. This alloy combines:
          </p>

          <ul>
            <li><strong>Density</strong>: 4.43 g/cm³ — approximately 40% lighter than stainless steel</li>
            <li><strong>Tensile strength</strong>: 900–1200 MPa — stronger than many steels</li>
            <li><strong>Corrosion resistance</strong>: forms a stable, self-healing oxide layer</li>
            <li><strong>Fatigue resistance</strong>: withstands millions of load cycles without failure</li>
            <li><strong>Biocompatibility</strong>: used in pacemakers, joint replacements, and dental implants</li>
          </ul>

          <h2>From Raw Billet to Precision Component</h2>
          <p>
            Every Vellonex titanium piece begins as a solid billet of Grade 5 alloy. Through multi-axis CNC machining, we achieve tolerances measured in microns — far tighter than conventional jewelry production allows. Post-machining, each component undergoes hand-finishing, bead blasting, and proprietary surface treatments to achieve the signature matte-to-satin gradient that defines our aesthetic.
          </p>

          <p>
            Unlike cast or stamped jewelry, our subtractive process preserves the full integrity of the material grain structure — resulting in components that are structurally superior and dramatically more resistant to bending, cracking, or fatigue over time.
          </p>

          <h2>Testing Beyond Industry Standards</h2>
          <p>
            Every production batch is subjected to:
          </p>
          <ul>
            <li>ISO 10993 biocompatibility testing (skin contact safety)</li>
            <li>Salt-spray corrosion testing (ASTM B117 — 1000+ hours)</li>
            <li>Cyclic fatigue testing (10⁶–10⁷ cycles)</li>
            <li>Drop and impact resistance protocols</li>
          </ul>

          <p>
            The result is jewelry engineered to survive the elements, daily wear, and decades of use — while remaining comfortable enough for constant wear and elegant enough for any occasion.
          </p>

          <h2>Why Titanium Matters to Vellonex</h2>
          <p>
            We chose titanium not because it is trendy, but because it is correct. It allows us to eliminate compromise: pieces can be large and bold without becoming heavy, intricate without becoming fragile, modern without becoming disposable.
          </p>

          <p className="italic">
            In a world of fast fashion accessories, Vellonex builds structural assets — objects meant to be worn for a lifetime and passed to the next.
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