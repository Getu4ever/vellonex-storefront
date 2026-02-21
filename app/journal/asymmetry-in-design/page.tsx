'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function AsymmetryInDesign() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-grow">
        {/* Hero / Title Section */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.15em] text-[#3B1438] mb-6">
            Asymmetry in Design
          </h1>
          <div className="text-gray-500 text-sm md:text-base tracking-wider uppercase">
            <span>March 10, 2026</span>
            <span className="mx-3">•</span>
            <span>7 min read</span>
          </div>
        </section>

        {/* Featured Image */}
        <section className="max-w-7xl mx-auto px-6 md:px-20 mt-12">
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-sm">
            <Image
              src="/journal-placeholder-2.jpg"  // ← use the generated image
              alt="Asymmetry in Design — Vellonex Aesthetic Philosophy"
              fill
              className="object-cover"
              priority
            />
          </div>
        </section>

        {/* Article Content */}
        <section className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24 prose prose-neutral prose-lg md:prose-xl prose-headings:text-[#3B1438] prose-headings:font-serif prose-a:text-[#3B1438] prose-a:no-underline hover:prose-a:underline">
          <p>
            Symmetry has long been the default in traditional jewelry — balanced, predictable, safe. At Vellonex we deliberately break that convention. Asymmetry is not chaos; it is controlled tension, deliberate imbalance, and the quiet confidence that comes from knowing when rules can be rewritten.
          </p>

          <h2>Why Asymmetry Feels Modern</h2>
          <p>
            The human eye is drawn to slight disruption. Perfect symmetry can feel static, almost mechanical in the wrong context. Asymmetry introduces movement, draws attention across the piece, and creates visual rhythm — the same principles used in brutalist architecture, contemporary typography, and high-fashion silhouettes.
          </p>

          <p>
            In our designs, asymmetry appears in offset stone placements, irregular chain links, angular profile cuts, and unbalanced proportions that resolve into harmony only when worn. The result is jewelry that feels alive — never static, never predictable.
          </p>

          <h2>Engineering the Imbalance</h2>
          <p>
            Achieving asymmetry without sacrificing structural integrity requires precision. Each offset element is counterbalanced through hidden mass distribution and calculated weight placement. Our CAD models undergo finite element analysis (FEA) to ensure no weak points emerge from the deliberate imbalance.
          </p>

          <p>
            The visual tension is engineered — never accidental. A seemingly off-center pendant is anchored by a precisely weighted bail. An asymmetrical bracelet arc is reinforced at the tension point. The wearer feels elegance; the material feels physics.
          </p>

          <h2>Asymmetry as Identity</h2>
          <p>
            In an era of mass-produced uniformity, asymmetry becomes a quiet act of individuality. It rejects the idea that beauty must be mirrored. It invites the wearer to engage — to turn the piece, to see it from different angles, to discover new details with movement.
          </p>

          <p className="italic">
            Symmetry calms. Asymmetry provokes. Vellonex chooses provocation — not for shock, but for depth.
          </p>

          <blockquote className="border-l-4 border-[#3B1438] pl-6 my-12 italic text-gray-600">
            "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away — and sometimes, when balance is intentionally disturbed."
          </blockquote>
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