import OpengraphImage from "components/opengraph-image";

export default async function Image({ params }: { params: { page: string } }) {
  // Instead of fetching from Shopify (which is failing the build),
  // we generate the title from the URL slug.
  // e.g., 'shipping-returns' becomes 'Shipping Returns'
  const title = params.page
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return await OpengraphImage({ title });
}