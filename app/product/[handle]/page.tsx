import SimilarFromCollection from "@/components/product/SimilarFromCollection";
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import { getCollection, getCollectionProducts, getProduct } from 'lib/shopify';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export default async function ProductPage(props: { params: Promise<{ handle: string }> }) {
  const resolvedParams = await props.params;
  const product = await getProduct(resolvedParams.handle);

  if (!product) return notFound();

  // 1. Resolve Collection for "Similar Products"
  const collectionFromProduct =
    product.collections?.edges?.[0]?.node?.handle ??
    (product.tags.find((tag) => tag.startsWith("the-"))?.replace("the-", "") || "frontpage");

  const [collection, relatedProducts] = await Promise.all([
    getCollection(collectionFromProduct),
    getCollectionProducts({ collection: collectionFromProduct })
  ]);

  // 2. Parse Structural Architecture Metafield
  const structuralSpecsRaw = collection?.metafield?.value || null;
  let structuralSpecsText = '';
  if (structuralSpecsRaw) {
    try {
      const parsed = JSON.parse(structuralSpecsRaw);
      const extractText = (node: any): string => {
        if (node.type === 'text') return node.value || '';
        if (node.children) return node.children.map(extractText).join(' ');
        return '';
      };
      structuralSpecsText = extractText(parsed);
    } catch (e) {
      structuralSpecsText = structuralSpecsRaw;
    }
  }

  // 3. Clean Image Array for Gallery
  const allImages = Array.isArray(product.images) 
    ? product.images 
    : (product.images as any)?.edges?.map((edge: any) => edge.node) || [];

  // 4. JSON-LD Structured Data for Google Search Console
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.featuredImage?.url,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: 'Vellonex',
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: product.priceRange.minVariantPrice.currencyCode,
      price: product.priceRange.minVariantPrice.amount,
      availability: product.availableForSale 
        ? 'https://schema.org/InStock' 
        : 'https://schema.org/OutOfStock',
      url: `https://www.vellonex.co.uk/product/${product.handle}`,
      seller: {
        '@type': 'Organization',
        name: 'Vellonex',
      },
    },
  };

  return (
    <>
      {/* Google Structured Data Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />

      <div className="mx-auto max-w-screen-2xl px-4 py-10">
        <div className="flex flex-col lg:flex-row lg:gap-20">
          {/* LEFT COLUMN: Gallery + Metafields */}
          <div className="w-full lg:basis-4/6 flex flex-col min-h-[600px] lg:min-h-auto">
            <div className="relative w-full">
              <Suspense fallback={<div className="aspect-square w-full bg-neutral-100 animate-pulse rounded-lg" />}>
                <Gallery
                  images={allImages.slice(0, 10).map((image: any) => ({
                    src: image.url,
                    altText: image.altText || product.title
                  }))}
                />
              </Suspense>
            </div>

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

          {/* RIGHT COLUMN: Sidebar (Sticky) */}
          <div className="w-full lg:basis-2/6 lg:sticky lg:top-20 h-fit mt-10 lg:mt-0">
            <Suspense fallback={null}>
              <ProductDescription product={product} />
            </Suspense>
          </div>
        </div>

        {/* RELATED PRODUCTS */}
        <Suspense fallback={<div className="mt-32 h-64 bg-neutral-100 animate-pulse rounded-lg" />}>
          <SimilarFromCollection
            collectionHandle={collectionFromProduct}
            currentProductHandle={product.handle}
          />
        </Suspense>
      </div>
    </>
  );
}