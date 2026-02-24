import Grid from "components/grid";
import { GridTileImage } from "components/grid/tile";
import { Product } from "lib/shopify/types";
import Link from "next/link";

export default function ProductGridItems({
  products,
  priorityCount = 4, 
}: {
  products: Product[];
  priorityCount?: number;
}) {
  return (
    <>
      {products.map((product, index) => {
        // High priority for the first row (index 0-3)
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
                sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
                priority={isPriority}
                // Explicitly set loading to "eager" for priority images to bypass browser throttling
                loading={isPriority ? "eager" : "lazy"}
              />
            </Link>
          </Grid.Item>
        );
      })}
    </>
  );
}