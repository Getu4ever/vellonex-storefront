import { getCollectionProducts } from "lib/shopify";
import Image from "next/image";
import Link from "next/link";

type Props = {
  collectionHandle: string;
  currentProductHandle: string;
};

export default async function SimilarFromCollection({
  collectionHandle,
  currentProductHandle,
}: Props) {
  const timestamp = new Date().toISOString();
  console.log(`🔍 [${timestamp}] SimilarFromCollection START`);
  console.log(`   → collectionHandle:`, collectionHandle);
  console.log(`   → currentProductHandle:`, currentProductHandle);

  if (!collectionHandle) {
    console.log(`   → No collectionHandle provided → early return null`);
    return (
      <div className="mt-20 text-center text-red-500">
        Debug: No collection handle passed to SimilarFromCollection
      </div>
    );
  }

  let products = [];
  try {
    console.log(`   → Fetching products from collection: ${collectionHandle}`);
    products = await getCollectionProducts({
      collection: collectionHandle,
    });
    console.log(`   → Success: Fetched ${products.length} products`);
    if (products.length > 0) {
      console.log(`   → First 3 product handles:`, products.slice(0, 3).map(p => p.handle));
    } else {
      console.log(`   → Warning: No products returned from collection`);
    }
  } catch (error) {
    console.error(`   → Error fetching products:`, error);
    return (
      <div className="mt-20 text-center text-red-500">
        Debug: Failed to load similar products (check console)
      </div>
    );
  }

  // Filter out the current product and take up to 4 similar ones
  const filtered = products
    .filter((p) => p.handle !== currentProductHandle)
    .slice(0, 4);

  console.log(`   → After filter: ${filtered.length} similar products remaining`);
  if (filtered.length > 0) {
    console.log(`   → Filtered handles:`, filtered.map(p => p.handle));
  } else {
    console.log(`   → No products left after filtering (all may be the current one)`);
  }

  if (filtered.length === 0) {
    return (
      <div className="mt-20 text-center text-gray-500">
        Debug: No similar products found in this collection
      </div>
    );
  }

  return (
    <section className="mt-20 border-t border-black/10 pt-12">
      <h2 className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-black">
        You may like this
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {filtered.map((product) => (
          <Link
            key={product.handle}
            href={`/product/${product.handle}`}
            className="group block"
          >
            <div className="relative aspect-square overflow-hidden bg-neutral-100">
              <Image
                src={product.featuredImage?.url || "/placeholder.jpg"} // fallback image if missing
                alt={product.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={false}
              />
            </div>

            <div className="mt-3 text-center">
              <p className="text-[10px] uppercase tracking-[0.25em] text-black/70">
                {product.title}
              </p>
              <p className="mt-1 text-[11px] font-medium text-black">
                {product.priceRange?.minVariantPrice?.amount || "–"}{" "}
                {product.priceRange?.minVariantPrice?.currencyCode || ""}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Optional: Loading state for better UX
export function SimilarFromCollectionSkeleton() {
  return (
    <section className="mt-20 border-t border-black/10 pt-12">
      <h2 className="mb-10 text-center text-[11px] font-semibold uppercase tracking-[0.35em] text-black">
        You may like this
      </h2>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="relative aspect-square bg-neutral-200" />
            <div className="mt-3 h-4 w-3/4 mx-auto bg-neutral-200 rounded" />
            <div className="mt-2 h-4 w-1/2 mx-auto bg-neutral-200 rounded" />
          </div>
        ))}
      </div>
    </section>
  );
}