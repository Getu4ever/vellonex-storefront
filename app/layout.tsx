import EditorialHero from 'components/editorial-hero';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Vellonex London | Luxury Architectural Jewelry & High-End Essentials',
  description: 'Handcrafted minimalist rings, necklaces, bracelets and luxury essentials in titanium, gold vermeil and lab-grown diamonds. Precision-engineered jewelry for men and women.',
  openGraph: {
    title: 'Vellonex London | Luxury Architectural Jewelry',
    description: 'Elevated essentials blending industrial design and refined luxury.',
    images: '/og-home.jpg',
  },
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: 'featured' });

  const featuredProducts = products.slice(0, 8);
  const remainingProducts = products.slice(8, 18);

  return (
    <main className="min-h-screen">
      {/* Server-rendered introductory text + H2 + internal links */}
      <section className="px-4 md:px-10 py-12 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-serif uppercase tracking-wider text-[#3B1438] dark:text-white mb-6">
          Featured Architectural Collection
        </h2>
        <p className="text-lg md:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8">
          Vellonex London presents handcrafted minimalist jewelry and high-end essentials — precision-engineered in titanium, gold vermeil, and lab-grown diamonds. Each piece blends industrial architecture with timeless luxury, designed for permanence and modern elegance. Explore our curated selection of 
          <Link href="/search/rings" className="text-[#3B1438] dark:text-white underline hover:no-underline mx-1">
            rings
          </Link>, 
          <Link href="/search/necklaces" className="text-[#3B1438] dark:text-white underline hover:no-underline mx-1">
            necklaces
          </Link>, and 
          <Link href="/search/bracelets" className="text-[#3B1438] dark:text-white underline hover:no-underline mx-1">
            bracelets
          </Link>.
        </p>
        <div className="h-px w-32 bg-[#3B1438]/30 dark:bg-white/20 mx-auto mb-8" />
      </section>

      {/* Hero / Brand H1 – already server-rendered */}
      <section className="relative z-10 pt-8 pb-12 text-center px-4 md:px-10">
        <h1 className="text-5xl md:text-7xl font-serif tracking-wider uppercase text-[#3B1438] dark:text-white">
          Vellonex London
        </h1>
        <p className="mt-6 text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto">
          Luxury architectural jewelry & high-end essentials — engineered for permanence.
        </p>
        <div className="mt-10 h-px w-32 bg-[#3B1438]/40 dark:bg-white/20 mx-auto" />
      </section>

      {/* Featured Products Grid */}
      <section className="px-4 md:px-10 pb-16">
        <h2 className="sr-only">Featured Luxury Collection</h2>
        <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          <ProductGridItems products={featuredProducts} />
        </Grid>
      </section>

      {/* Editorial Section */}
      <EditorialHero />

      {/* Continue Exploring */}
      {remainingProducts.length > 0 && (
        <section className="px-4 md:px-10 py-20">
          <header className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl tracking-widest uppercase text-[#3B1438] dark:text-white">
              Continue Exploring
            </h2>
            <p className="mt-4 text-neutral-600 dark:text-neutral-400">
              Discover more precision-crafted pieces from our luxury collection.
            </p>
          </header>
          <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <ProductGridItems products={remainingProducts} />
          </Grid>
        </section>
      )}
    </main>
  );
}