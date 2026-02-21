import Grid from "components/grid";
import ProductGridItems from "components/layout/product-grid-items";
import { defaultSort, sorting } from "lib/constants";
import { seoMapping } from "lib/seo-config"; // Import your mapping
import { getCollection, getCollectionProducts } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ collection: string }>;
}): Promise<Metadata> {
  const { collection: handle } = await props.params;
  const collection = await getCollection(handle);

  if (!collection) return notFound();

  // Check if we have a manual override in lib/seo-config.ts
  const manualSeo = seoMapping[handle];

  return {
    title: manualSeo?.title || collection.seo?.title || collection.title,
    description: 
      manualSeo?.description || 
      collection.seo?.description || 
      collection.description || 
      `${collection.title} products`,
  };
}

export default async function CategoryPage(props: {
  params: Promise<{ collection: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [{ collection: handle }, searchParams] = await Promise.all([
    props.params,
    props.searchParams
  ]);

  const sort = (searchParams?.sort as string) || '';
  const { sortKey, reverse } = sorting.find((item) => item.slug === sort) || defaultSort;

  const [products, collection] = await Promise.all([
    getCollectionProducts({
      collection: handle, 
      sortKey,
      reverse,
    }),
    getCollection(handle)
  ]);

  if (!collection) return notFound();

  // Also pull the description for the UI if it exists in your config
  const manualDescription = seoMapping[handle]?.description;

  return (
    <section className="mx-auto max-w-screen-2xl px-4 text-white">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold uppercase tracking-widest text-[#3B1438]">
          {collection.title}
        </h1>
        {manualDescription && (
          <p className="max-w-2xl text-sm text-neutral-500 italic">
            {manualDescription}
          </p>
        )}
      </div>

      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </section>
  );
}