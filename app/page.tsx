import EditorialHero from "components/editorial-hero";
import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Vellonex London | Luxury Architectural Jewelry & Essentials",
  description:
    "Luxury architectural jewelry crafted in titanium, gold vermeil and lab-grown diamonds. Minimalist rings, necklaces and essentials by Vellonex London.",
  openGraph: {
    title: "Vellonex London | Luxury Architectural Jewelry",
    description:
      "Precision-engineered minimalist jewelry blending industrial architecture with refined luxury.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vellonex London luxury architectural jewelry",
      },
    ],
    type: "website",
  },
};

export default async function HomePage() {
  const products = await getCollectionProducts({ collection: "featured" });

  const featuredProducts = products.slice(0, 8);
  const remainingProducts = products.slice(8, 18);

  return (
    <main className="min-h-screen">
      {/* ===== HERO / PRIMARY SEO BLOCK ===== */}
      <section className="relative z-10 pt-14 pb-12 text-center px-4 md:px-10">
        <h1 className="text-4xl md:text-6xl font-serif tracking-wider uppercase text-[#3B1438] dark:text-white">
          Vellonex London
        </h1>

        <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
          Luxury architectural jewelry crafted for permanence — minimalist rings,
          necklaces and essentials engineered with precision.
        </p>

        <nav className="mt-8 flex justify-center gap-6 text-sm uppercase tracking-widest">
          <Link href="/collections/rings" className="hover:underline">
            Rings
          </Link>
          <Link href="/collections/necklaces" className="hover:underline">
            Necklaces
          </Link>
          <Link href="/collections/bracelets" className="hover:underline">
            Bracelets
          </Link>
        </nav>

        <div className="mt-10 h-px w-32 bg-[#3B1438]/30 dark:bg-white/20 mx-auto" />
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="px-4 md:px-10 pb-20">
        <header className="mb-8 text-center">
          <h2 className="text-xl md:text-2xl tracking-widest uppercase text-[#3B1438] dark:text-white">
            Featured Jewelry Collection
          </h2>
          <p className="mt-3 text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
            Discover our most iconic architectural designs — precision-engineered
            jewelry for modern permanence.
          </p>
        </header>

        <Grid className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          <ProductGridItems products={featuredProducts} />
        </Grid>
      </section>

      {/* ===== EDITORIAL / BRAND STORY ===== */}
      <section aria-labelledby="editorial-heading">
        <h2 id="editorial-heading" className="sr-only">
          Brand Philosophy and Design Language
        </h2>
        <EditorialHero />
      </section>

      {/* ===== CONTINUE EXPLORING ===== */}
      {remainingProducts.length > 0 && (
        <section className="px-4 md:px-10 py-24">
          <header className="mb-12 text-center">
            <h2 className="text-xl md:text-2xl tracking-widest uppercase text-[#3B1438] dark:text-white">
              Continue Exploring
            </h2>
            <p className="mt-3 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
              Explore additional designs crafted with architectural precision and
              enduring materials.
            </p>
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