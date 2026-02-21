'use client';

import Link from 'next/link';

// Hardcoded list of articles (replace with real data later: MDX, CMS, JSON, etc.)
const articles = [
  {
    slug: 'the-science-of-titanium',
    title: 'The Science of Titanium',
    excerpt: 'Why aerospace-grade titanium is the foundation of modern luxury durability.',
    date: 'February 15, 2026',
  },
  {
    slug: 'asymmetry-in-design',
    title: 'Asymmetry in Design',
    excerpt: 'How deliberate imbalance is redefining elegance in contemporary jewelry.',
    date: 'March 10, 2026',
  },
  {
    slug: 'ethical-sourcing',
    title: 'Ethical Materials Journey',
    excerpt: 'Tracing the origins of responsibly sourced alloys and stones.',
    date: 'March 25, 2026',
  },
  // Add more articles here as you create them
];

export default function JournalArchive() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <main className="flex-grow py-20">
        {/* Hero Section */}
        <section className="py-20 bg-[#F9F6F2] text-center px-4 mb-16">
          <h1 className="text-5xl md:text-7xl font-serif uppercase tracking-[0.2em] text-[#3B1438] mb-6">
            Journal Archive
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed italic font-light">
            All stories, essays, and insights from Vellonex
          </p>
        </section>

        {/* Articles Grid */}
        <section className="max-w-7xl mx-auto px-6 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article) => (
              <Link 
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group block bg-white border border-gray-100 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="p-8">
                  <h3 className="text-2xl font-serif text-[#3B1438] mb-3 group-hover:underline">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {article.excerpt}
                  </p>
                  <p className="text-gray-500 text-xs uppercase tracking-wider">
                    {article.date}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* If no articles yet */}
          {articles.length === 0 && (
            <p className="text-center text-gray-500 py-20">
              No articles published yet. Check back soon.
            </p>
          )}
        </section>

        {/* Back to Journal */}
        <section className="max-w-3xl mx-auto px-6 text-center py-20">
          <Link 
            href="/journal"
            className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
          >
            Back to Journal Overview
          </Link>
        </section>
      </main>
    </div>
  );
}