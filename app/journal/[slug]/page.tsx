import { seoMapping } from "lib/seo-config";
import { Metadata } from "next";
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from "next/navigation";

// Data fetching helper
const getArticleBySlug = (slug: string) => {
  const articles: Record<string, any> = {
    'the-science-of-titanium': {
      title: 'The Science of Titanium',
      date: 'February 15, 2026',
      readTime: '8 min read',
      featuredImage: '/journal-placeholder-1.jpg',
      content: `
        <p>Titanium is not just a metal — it is the cornerstone of modern performance luxury...</p>
        <h2>Why Titanium?</h2>
        <ul>
          <li>Density: 4.43 g/cm³ — 40% lighter than steel</li>
          <li>Corrosion resistance: forms stable oxide layer</li>
          <li>Biocompatibility: used in medical implants</li>
        </ul>
      `,
    },
    'asymmetry-in-design': {
        title: 'Asymmetry in Design',
        date: 'February 18, 2026',
        readTime: '6 min read',
        featuredImage: '/journal-placeholder-2.jpg',
        content: `<p>Exploring the balance of architectural jewelry through intentional asymmetry...</p>`
    },
    'ethical-sourcing': {
        title: 'Ethical Sourcing',
        date: 'February 20, 2026',
        readTime: '5 min read',
        featuredImage: '/journal-placeholder-3.jpg',
        content: `<p>Our commitment to transparency and conflict-free materials...</p>`
    }
  };

  return articles[slug] || null;
};

/* 1. SEO GENERATOR (Server Side Only) */
export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) return { title: 'Article Not Found' };

  const manualSeo = seoMapping[slug];

  return {
    title: manualSeo?.title || article.title,
    description: manualSeo?.description || 'A Vellonex Journal editorial.',
    openGraph: {
      title: manualSeo?.title || article.title,
      description: manualSeo?.description,
      type: 'article',
      url: `https://vellonex.co.uk/journal/${slug}`,
    }
  };
}

/* 2. PAGE COMPONENT */
export default async function JournalPost(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const article = getArticleBySlug(slug);

  if (!article) notFound();

  // JSON-LD for Google Discovery
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    datePublished: article.date,
    author: { '@type': 'Organization', name: 'Vellonex', url: 'https://vellonex.co.uk' }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="flex-grow">
        <section className="py-20 bg-[#F9F6F2] text-center px-4">
          <h1 className="text-4xl md:text-6xl font-serif uppercase tracking-[0.15em] text-[#3B1438] mb-6">
            {article.title}
          </h1>
          <div className="text-gray-500 text-sm md:text-base tracking-wider uppercase">
            <span>{article.date}</span>
            {article.readTime && <span className="mx-3">•</span>}
            <span>{article.readTime}</span>
          </div>
        </section>

        {article.featuredImage && (
          <section className="max-w-7xl mx-auto px-6 md:px-20 mt-12">
            <div className="relative aspect-[16/9] overflow-hidden rounded-sm shadow-sm">
              <Image
                src={article.featuredImage}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </section>
        )}

        <section className="max-w-4xl mx-auto px-6 md:px-20 py-16 md:py-24 prose prose-neutral prose-lg md:prose-xl prose-headings:text-[#3B1438] prose-headings:font-serif">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </section>

        <section className="max-w-3xl mx-auto px-6 text-center pb-20">
          <Link 
            href="/journal"
            className="inline-block border border-[#3B1438] px-10 py-4 text-[#3B1438] text-xs uppercase tracking-[0.2em] hover:bg-[#3B1438] hover:text-white transition-all"
          >
            Back to Journal
          </Link>
        </section>
      </main>
    </div>
  );
}