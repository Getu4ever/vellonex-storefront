import { GridTileImage } from "components/grid/tile";
import { getCollectionProducts } from "lib/shopify";
import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // We are now looking for the 'homepage' collection handle
  const homepageItems = await getCollectionProducts({
    collection: "homepage",
  });

  // Updated logic: Only return null if there are ZERO products.
  // This allows 1 or 2 products to show up.
  if (!homepageItems || homepageItems.length === 0) return null;

  const firstProduct = homepageItems[0];
  const secondProduct = homepageItems[1];
  const thirdProduct = homepageItems[2];

  return (
    <section className="mx-auto grid max-w-(--breakpoint-2xl) gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      {/* Product 1 - Large Tile */}
      {firstProduct && (
        <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      )}

      {/* Product 2 - Small Tile (Renders only if it exists) */}
      {secondProduct && (
        <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      )}

      {/* Product 3 - Small Tile (Renders only if it exists) */}
      {thirdProduct && (
        <ThreeItemGridItem size="half" item={thirdProduct} />
      )}
    </section>
  );

}
