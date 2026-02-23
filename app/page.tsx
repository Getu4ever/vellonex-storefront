import EditorialHero from 'components/editorial-hero';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify';

export default async function HomePage() {
  // 1. Fetch products from the 'featured' collection
  const products = await getCollectionProducts({ collection: 'featured' });
  
  // 2. Slices for layout (8 items in top grid, up to 10 in bottom grid)
  const featuredProducts = products.slice(0, 8); 
  const remainingProducts = products.slice(8, 18);

  return (
    <>
      {/* BRAND HEADER */}
<section className="relative z-10 pt-0 pb-6 text-center px-4">
  <h1 className="text-sm md:text-sm tracking-[0.4em] uppercase font-light text-[#3B1438] dark:text-white/60">
    Vellonex London — Luxury Jewelry & High-End Essentials
  </h1>
  <div className="mt-6 h-px w-24 bg-black/10 dark:bg-white/20 mx-auto" />
</section>

{/* TOP PRODUCT GRID */}
<section className="px-4 md:px-10 pb-12">
  <Grid>
    <ProductGridItems products={featuredProducts} />
  </Grid>
</section>

      {/* EDITORIAL SECTION */}
      <EditorialHero />

      {/* BOTTOM PRODUCT GRID (Continue Exploring) */}
      {remainingProducts.length > 0 && (
        <section className="px-4 md:px-10 py-24">
          <div className="mb-12">
            <h3 className="text-[14px] tracking-[0.4em] uppercase opacity-50 mb-4">
              Continue Exploring
            </h3>
            <div className="h-px w-full bg-white/10" />
          </div>
          <Grid>
            <ProductGridItems products={remainingProducts} />
          </Grid>
        </section>
      )}
    </>
  );
}