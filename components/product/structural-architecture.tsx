import { getCollection } from 'lib/shopify';

export async function StructuralArchitecture({
  collectionHandle
}: {
  collectionHandle: string | undefined;
}) {
  if (!collectionHandle) return null;

  const collection = await getCollection(collectionHandle);

  // Use the metafield value if it exists, otherwise fallback to description
  const content = collection?.metafield?.value || collection?.descriptionHtml;

  if (!content) return null;

  return (
    <div className="mt-16 border-t border-neutral-200 pt-12 dark:border-neutral-800">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/4">
          <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#3B1438] dark:text-neutral-400">
            Structural Architecture
          </h3>
        </div>
        <div className="md:w-3/4">
          <div
            className="prose prose-sm max-w-none text-base leading-relaxed text-neutral-600 dark:text-neutral-400 font-light italic"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>
    </div>
  );
}