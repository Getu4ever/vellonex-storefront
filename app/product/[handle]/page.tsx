import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getCollection, getCollectionProducts, getProduct } from 'lib/shopify';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import SimilarFromCollection from "@/components/product/SimilarFromCollection"; // adjust path

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await props.params;
  const product = await getProduct(resolvedParams.handle);

  if (!product) return notFound();

  /* -------------------------------------------------------------------------- */
  /* SAFELY RESOLVE PRIMARY COLLECTION (NON-BREAKING)                            */
  /* -------------------------------------------------------------------------- */

  // Use real collection if available, fallback to tag-based logic
  const collectionFromProduct =
    product.collections?.edges?.[0]?.node?.handle ??
    (
      product.tags.find((tag) => tag.startsWith("the-"))?.replace("the-", "") ||
      "frontpage"
    );

  const primaryCollectionHandle = collectionFromProduct;

  const [collection, relatedProducts] = await Promise.all([
    getCollection(primaryCollectionHandle),
    getCollectionProducts({ collection: primaryCollectionHandle })
  ]);

  const filteredRelatedProducts = relatedProducts
    .filter((p) => p.handle !== product.handle)
    .slice(0, 4);
  
  const structuralSpecsRaw = collection?.metafield?.value || null;

  // Parse Shopify structured text metafield (JSON) to plain text
  let structuralSpecsText = '';
  if (structuralSpecsRaw) {
    try {
      const parsed = JSON.parse(structuralSpecsRaw);
      // Extract all text from children recursively
      const extractText = (node: any): string => {
        if (node.type === 'text') return node.value || '';
        if (node.children) return node.children.map(extractText).join(' ');
        return '';
      };
      structuralSpecsText = extractText(parsed);
    } catch (e) {
      structuralSpecsText = structuralSpecsRaw; // fallback to raw if parse fails
    }
  }

  const allImages = Array.isArray(product.images) 
    ? product.images 
    : (product.images as any)?.edges?.map((edge: any) => edge.node) || [];

  return (
    <>
      <div className="mx-auto max-w-screen-2xl px-4 py-10">
        {/* ROW 1: Media + Specs + Sidebar */}
        <div className="flex flex-col lg:flex-row lg:gap-20">
          <div className="w-full lg:basis-4/6 flex flex-col min-h-[600px] lg:min-h-auto">
            <div className="relative w-full">
              <Suspense fallback={<div className="aspect-square w-full bg-neutral-100 animate-pulse rounded-lg" />}>
                <Gallery
                  images={allImages.slice(0, 5).map((image: any) => ({
                    src: image.url,
                    altText: image.altText
                  }))}
                />
              </Suspense>
            </div>

            {/* Structural Architecture - fixed JSON rendering */}
            {structuralSpecsText && (
              <div className="mt-12 pt-12 border-t border-neutral-200 dark:border-neutral-800">
                <h2 className="text-xl font-bold uppercase tracking-wider text-neutral-800 dark:text-neutral-200 mb-6">
                  Structural Architecture
                </h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed">
                  {structuralSpecsText}
                </div>
              </div>
            )}
          </div>

          <div className="w-full lg:basis-2/6 lg:sticky lg:top-20 h-fit mt-10 lg:mt-0">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>

        {/* "You May Like This" - single instance */}
        <Suspense fallback={<div className="mt-32 h-64 bg-neutral-100 animate-pulse rounded-lg" />}>
          <SimilarFromCollection
            collectionHandle={collectionFromProduct}
            currentProductHandle={product.handle}
          />
        </Suspense>

        {/* Removed duplicate related products section to avoid double content */}
        {/* Uncomment below if you want to keep the old GridTileImage style */}
        {/* 
        {filteredRelatedProducts.length > 0 && (
          <div className="mt-32 border-t border-neutral-200 pt-20 dark:border-neutral-800">
            <h2 className="mb-12 text-3xl font-bold tracking-tight">
              You May Also Like
            </h2>

            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {filteredRelatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.handle}
                  href={`/product/${relatedProduct.handle}`}
                >
                  <div className="overflow-hidden bg-neutral-100 dark:bg-neutral-900 rounded-lg">
                    <GridTileImage
                      alt={relatedProduct.title}
                      src={relatedProduct.featuredImage?.url || ''}
                      width={400}
                      height={400}
                      label={{
                        title: relatedProduct.title,
                        amount: relatedProduct.priceRange?.minVariantPrice?.amount,
                        currencyCode: relatedProduct.priceRange?.minVariantPrice?.currencyCode
                      }}
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
        */}
      </div>
    </>
  );
}