import Prose from "components/prose";
import { seoMapping } from "lib/seo-config"; // Import your manual SEO config
import { getPage } from "lib/shopify";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata(props: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  // Check for manual override in lib/seo-config.ts
  const manualSeo = seoMapping[params.page];

  return {
    title: manualSeo?.title || page.seo?.title || page.title,
    description: manualSeo?.description || page.seo?.description || page.bodySummary,
    openGraph: {
      title: manualSeo?.title || page.seo?.title || page.title,
      description: manualSeo?.description || page.seo?.description || page.bodySummary,
      type: 'article'
    }
  };
}

export default async function Page(props: { params: Promise<{ page: string }> }) {
  const params = await props.params;
  const page = await getPage(params.page);

  if (!page) return notFound();

  // Optionally pull manual description for the UI
  const manualDescription = seoMapping[params.page]?.description;

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-20 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <h1 className="mb-4 text-5xl font-bold uppercase tracking-tighter">
          {page.title}
        </h1>
        
        {/* Adds the SEO description as a sub-headline if it exists */}
        {manualDescription && (
          <p className="mb-8 text-lg text-neutral-400 italic font-light">
            {manualDescription}
          </p>
        )}

        <Prose className="mb-8 text-neutral-300" html={page.body} />
        
        <p className="text-sm italic text-neutral-500 border-t border-neutral-800 pt-8">
          {`This document was last updated on ${new Intl.DateTimeFormat(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }).format(new Date(page.updatedAt))}.`}
        </p>
      </div>
    </div>
  );
}