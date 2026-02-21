import EditorialHero from 'components/editorial-hero';
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { getCollectionProducts } from 'lib/shopify'; // Changed from getProducts

export default async function HomePage() {
  // 1. Fetch products (Ensuring we get at least 16)
  const products = await getCollectionProducts({ collection: 'featured' });
  
  // 2. Updated Slices for 8 products each
  const featuredProducts = products.slice(0, 8); // Items 1, 2, 3, 4, 5, 6, 7, 8
  const remainingProducts = products.slice(8, 18); // Items 9, 10, 11, 12, 13, 14, 15, 16


  return (
    <>
      <main>
        {/* Top Section */}
        <section className="px-4 md:px-10 py-12">
          <Grid>
            <ProductGridItems products={featuredProducts} />
          </Grid>
        </section>

        <EditorialHero />

        {/* Bottom Section */}
        {remainingProducts.length > 0 && (
          <section className="px-4 md:px-10 py-12">
            <div className="mb-12">
              <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-50 mb-4">
                Continue Exploring
              </h3>
              <div className="h-px w-full bg-white/10" />
            </div>
            <Grid>
              <ProductGridItems products={remainingProducts} />
            </Grid>
          </section>
        )}
      </main>
      
    </>
  );
}