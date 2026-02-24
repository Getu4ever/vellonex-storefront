import EditorialHero from 'components/editorial-hero';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';
import { Product } from 'lib/shopify/types';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic'; 

export const metadata: Metadata = {
  title: 'Vellonex London | Jewelry & High-End Essentials',
  description: 'Handcrafted minimalist rings, necklaces, bracelets and luxury essentials.',
  openGraph: {
    title: 'Vellonex London | Luxury Architectural Jewelry',
    description: 'Elevated essentials blending industrial design and refined luxury.',
    images: '/og-home.jpg',
  },
};

export default async function HomePage() {
  let products: Product[] = [];
  try {
    products = await getCollectionProducts({ collection: 'featured' });
  } catch (error) {
    console.error('Fetch error:', error);
    products = [];
  }

  const featuredProducts = products.slice(0, 8);
  const remainingProducts = products.slice(8, 18);

  // LCP Injection: Identify the very first product image URL
 const firstProduct = featuredProducts[0];
const firstProductImage = firstProduct?.featuredImage?.url;

return (
  <>
    {firstProductImage && (
      <link
        rel="preload"
        as="image"
        href={firstProductImage}
        fetchPriority="high"
        // This ensures mobile-specific preloading logic
        imageSrcSet={`${firstProductImage}?width=400 400w, ${firstProductImage}?width=800 800w, ${firstProductImage} 1200w`}
        imageSizes="(min-width: 768px) 33vw, 100vw"
      />
    )}

      <main>
        {/* 1. Original Minimalist Hero Section */}
        <section className="relative z-10 pt-16 pb-12 text-center px-4 md:px-10">
          <h1 className="text-5xl md:text-7xl font-serif tracking-wider uppercase text-[#3B1438] dark:text-white">
            Vellonex London
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-neutral-700 dark:text-neutral-300 max-w-4xl mx-auto">
            Luxury architectural jewelry & high-end essentials — engineered for permanence.
          </p>
          <div className="mt-10 h-px w-32 bg-[#3B1438]/40 dark:bg-white/20 mx-auto" />
        </section>

        {/* 2. Main Product Grid */}
        <section className="px-4 md:px-10 pb-16">
          <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            <ProductGridItems products={featuredProducts} priorityCount={4} />
          </Grid>
        </section>

        {/* 3. Editorial Hero */}
        <EditorialHero />

        {/* 4. Secondary Grid (Only shows if there are more products) */}
        {remainingProducts.length > 0 && (
          <section className="px-4 md:px-10 py-20">
            <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              <ProductGridItems products={remainingProducts} />
            </Grid>
          </section>
        )}
      </main>
    </>
  );
}