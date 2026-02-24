import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
  priorityCount = 4, // Changed from 0 to 4 to fix the slow load
}: {
  products: Product[];
  priorityCount?: number;
}) {
  return (
    <>
      {products.map((product, index) => {
        // If index is 0, 1, 2, or 3, isPriority will be true
        const isPriority = index < priorityCount;

        return (
          <Grid.Item key={product.handle} className="animate-fadeIn">
            <Link
              className="relative inline-block h-full w-full"
              href={`/product/${product.handle}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode,
                }}
                src={product.featuredImage?.url ?? '/placeholder.jpg'}
                fill
                sizes="(min-width: 768px) 33vw, 100vw"
                /* SPEED FIX: 
                   Priority images are preloaded. 
                   Non-priority images are lazily loaded to save bandwidth.
                */
                priority={isPriority}
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}