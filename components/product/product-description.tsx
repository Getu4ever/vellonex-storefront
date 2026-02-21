'use client';

import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import { Product } from 'lib/shopify/types';
import { AccordionItem } from './accordion-item';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  const specifications = product.metafields?.find((m) => m?.key === 'specifications')?.value;

  const renderRichText = (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      const listItems = data.children?.[0]?.children || [];
      return (
        <ul className="list-disc pl-5 space-y-2">
          {listItems.map((item: any, index: number) => (
            <li key={index}>
              {item.children?.map((child: any, i: number) => (
                <span key={i} className={child.bold ? 'font-bold' : ''}>
                  {child.value || child.text}
                </span>
              ))}
            </li>
          ))}
        </ul>
      );
    } catch (e) {
      return <div dangerouslySetInnerHTML={{ __html: jsonString }} />;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-3xl font-medium uppercase tracking-tight">{product.title}</h1>
        
        {/* RESTORED: Blue price background */}
<div className="mr-auto w-auto rounded-full bg-[#3B1438] p-2 px-4 text-sm text-white font-medium">
            <Price
            amount={product.priceRange.minVariantPrice.amount}
            currencyCode={product.priceRange.minVariantPrice.currencyCode}
          />
        </div>
      </div>

      <div className="mb-8">
        <VariantSelector options={product.options} variants={product.variants as any} />
      </div>

      <div className="mb-10">
        <AddToCart product={product} />
        <p className="mt-4 text-center text-[10px] tracking-widest text-neutral-400 uppercase font-medium">
          Complimentary shipping on the series
        </p>
      </div>

      <div className="border-t border-neutral-100 dark:border-neutral-800">
        <AccordionItem title="Description">
          <div 
            className="prose prose-sm py-4 text-neutral-500 font-light leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
          />
        </AccordionItem>

        {specifications && (
          <AccordionItem title="Specifications">
            <div className="prose prose-sm py-4 text-neutral-500 font-light">
               {renderRichText(specifications)}
            </div>
          </AccordionItem>
        )}

        {/* RESTORED: Shipping & Returns Accordion */}
        <AccordionItem title="Shipping & Returns">
          <div className="py-4 text-sm text-neutral-500 font-light leading-relaxed">
            We offer free standard shipping on all Series orders. Returns are accepted within 30 days of purchase in original, unworn condition.
          </div>
        </AccordionItem>
      </div>
    </div>
  );
}