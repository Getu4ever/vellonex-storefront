import EditorialHero from 'components/editorial-hero';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vellonex London | Luxury Architectural Jewelry & Essentials',
  description: 'Discover handcrafted minimalist rings, necklaces, bracelets and luxury essentials. High-end titanium, gold vermeil and lab-grown diamond jewelry for men and women.',
  openGraph: {
    title: 'Vellonex London | Luxury Architectural Jewelry',
    description: 'Precision-engineered jewelry blending industrial design and refined luxury.',
    images: '/og-image.jpg', // add a real OG image
  },
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: 'featured' });
  
  const featuredProducts = products.slice(0, 8);
  const remainingProducts = products.slice(8, 18);

  return (
    <main className="min-h-screen">
      {/* Hero / Brand Header – make this the true H1 for SEO */}
      <section className="relative z-10 pt-12 pb-8 text-center px-4 md:px-10">
        <h1 className="text-4xl md:text-6xl font-serif tracking-wider uppercase text-[#3B1438] dark:text-white">
          Vellonex London
        </h1>
        <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Luxury architectural jewelry and high-end essentials — engineered for permanence.
        </p>
        <div className="mt-8 h-px w-32 bg-[#3B1438]/30 dark:bg-white/20 mx-auto" />
      </section>

      {/* Featured Products Grid */}
      <section className="px-4 md:px-10 pb-16">
        <h2 className="sr-only">Featured Luxury Collection</h2> {/* hidden H2 for structure */}
        <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductGridItems products={featuredProducts} />
        </Grid>
      </section>

      {/* Editorial Hero Section */}
      <EditorialHero />

      {/* Continue Exploring */}
      {remainingProducts.length > 0 && (
        <section className="px-4 md:px-10 py-20">
          <header className="mb-12 text-center">
            <h2 className="text-xl md:text-2xl tracking-widest uppercase text-[#3B1438] dark:text-white">
              Continue Exploring
            </h2>
            <div className="mt-4 h-px w-24 bg-[#3B1438]/30 dark:bg-white/20 mx-auto" />
          </header>
          <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <ProductGridItems products={remainingProducts} />
          </Grid>
        </section>
      )}
    </main>
  );
}