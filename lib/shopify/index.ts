import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS,
} from "lib/constants";
import { ensureStartsWith } from "lib/utils";
import { cacheLife, cacheTag, revalidateTag } from "next/cache";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
} from "./mutations/cart";
import { getCartQuery } from "./queries/cart";
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from "./queries/collection";
import { getMenuQuery } from "./queries/menu";
import { getPageQuery, getPagesQuery } from "./queries/page";
import {
  getProductQuery,
  getProductsQuery,
} from "./queries/product";

import {
  Cart,
  CartLine,
  Collection,
  Image,
  Menu,
  Product,
  ProductVariant,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyMenuOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from "./types";

/* CORE FETCH */
type ExtractVariables<T> = T extends { variables: object } ? T["variables"] : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables,
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T }> {
  const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
  const domain = storeDomain ? ensureStartsWith(storeDomain, "https://") : "";
  const endpoint = domain ? `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}` : "";

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken!,
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  });

  const text = await res.text();
  const body = text ? JSON.parse(text) : {};
  if (!res.ok || body.errors) throw { status: res.status, errors: body.errors, query };
  return { status: res.status, body };
}

/* RESHAPE HELPERS */
const removeEdgesAndNodes = <T>(connection: any): T[] => {
  if (Array.isArray(connection)) return connection;
  return connection?.edges?.map((edge: any) => edge.node) ?? [];
};

const reshapeImages = (images: any, title: string) =>
  removeEdgesAndNodes<Image>(images).map((image) => ({
    ...image,
    altText: image.altText || `${title} - ${image.url.match(/.*\/(.*)\..*/)?.[1] ?? ""}`,
  }));

const reshapeProduct = (product?: ShopifyProduct, filterHidden = true): Product | undefined => {
  if (!product || (filterHidden && product.tags.includes(HIDDEN_PRODUCT_TAG))) return undefined;
  return {
    ...product,
    images: reshapeImages(product.images, product.title),
    variants: removeEdgesAndNodes<ProductVariant>(product.variants),
  };
};

const reshapeProducts = (products: ShopifyProduct[]) =>
  products.map((p) => reshapeProduct(p)).filter(Boolean) as Product[];

const reshapeCollection = (collection?: ShopifyCollection): Collection | undefined =>
  collection ? { ...collection, path: `/search/${collection.handle}` } : undefined;

const reshapeCollections = (collections: ShopifyCollection[]) =>
  collections.map(reshapeCollection).filter((c): c is Collection => !!c && !c.handle.startsWith("hidden"));

const reshapeCart = (cart: ShopifyCart): Cart => ({
  ...cart,
  cost: {
    ...cart.cost,
    totalTaxAmount: cart.cost.totalTaxAmount ?? ({ amount: "0.0", currencyCode: cart.cost.totalAmount.currencyCode } as any),
  },
  lines: removeEdgesAndNodes<CartLine>(cart.lines),
});

/* API CALLS */
export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({ query: createCartMutation, variables: {} as any });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function getCart(cartId: string | undefined): Promise<Cart | undefined> {
  "use cache"; cacheTag(TAGS.cart); cacheLife("seconds");
  if (!cartId) return undefined;
  try {
    const res = await shopifyFetch<ShopifyCartOperation>({ query: getCartQuery, variables: { cartId } });
    return res.body.data.cart ? reshapeCart(res.body.data.cart) : undefined;
  } catch { return undefined; }
}

export async function addToCart(lines: { merchandiseId: string; quantity: number }[]): Promise<Cart> {
  let cartId = (await cookies()).get("cartId")?.value;
  if (!cartId) cartId = (await createCart()).id;
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: { cartId, lines },
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value;
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: { cartId: cartId!, lineIds },
  });
  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(lines: { id: string; merchandiseId: string; quantity: number }[]): Promise<Cart> {
  const cartId = (await cookies()).get("cartId")?.value;
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: { cartId: cartId!, lines },
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getMenu(handle: string): Promise<Menu[]> {
  "use cache"; cacheTag(TAGS.collections); cacheLife("days");
  const res = await shopifyFetch<ShopifyMenuOperation>({ query: getMenuQuery, variables: { handle } });
  
  return res.body.data.menu?.items.map((item) => {
    // 1. Clean the URL by removing the Shopify domain if present
    const cleanUrl = item.url
      .replace(process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!, "")
      .replace(/^https?:\/\/[^\/]+/, "");

    // 2. Handle Shopify "Pages" (About, Contact, etc.)
    // We strip '/pages' so /pages/about becomes /about to match app/[page]/page.tsx
    if (cleanUrl.includes('/pages/')) {
      return {
        title: item.title,
        path: cleanUrl.replace('/pages', '')
      };
    }

    // 3. Handle Shopify "Collections" (Rings, Archive, etc.)
    // We change /collections to /search to match app/search/[collection]/page.tsx
    if (cleanUrl.includes('/collections/')) {
      return {
        title: item.title,
        path: cleanUrl.replace('/collections', '/search')
      };
    }

    // 4. Handle the "All Products" / Catalog link
    if (cleanUrl === '/collections' || cleanUrl === '/products') {
      return {
        title: item.title,
        path: '/search'
      };
    }

    // 5. Fallback for Home or other direct links
    return {
      title: item.title,
      path: cleanUrl || '/'
    };
  }) ?? [];
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  "use cache"; cacheTag(TAGS.collections); cacheLife("days");
  const res = await shopifyFetch<ShopifyCollectionOperation>({ query: getCollectionQuery, variables: { handle } });
  return reshapeCollection(res.body.data.collection || undefined);
}

export async function getCollections(): Promise<Collection[]> {
  "use cache"; cacheTag(TAGS.collections); cacheLife("days");
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    variables: {}
  });
  return reshapeCollections(removeEdgesAndNodes(res.body.data.collections));
}

export async function getCollectionProducts({
  collection,
  sortKey,
  reverse,
}: {
  collection: string;
  sortKey?: string;
  reverse?: boolean;
}): Promise<Product[]> {
  "use cache";
  cacheTag(TAGS.products);
  cacheLife("days");

  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      handle: collection,
      sortKey: sortKey === "CREATED_AT" ? "CREATED" : sortKey,
      reverse,
    },
  });

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection?.products)
  );
}

export async function getPage(handle: string): Promise<any> {
  "use cache"; 
  cacheTag(TAGS.pages); 
  cacheLife("days");
  
  const res = await shopifyFetch<any>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.page;
}

export async function getPages(): Promise<any[]> {
  "use cache"; cacheTag(TAGS.pages); cacheLife("days");
  const res = await shopifyFetch<any>({
    query: getPagesQuery,
    variables: {}
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  "use cache"; cacheTag(TAGS.products); cacheLife("days");
  const res = await shopifyFetch<ShopifyProductOperation>({ query: getProductQuery, variables: { handle } });
  return reshapeProduct(res.body.data.product || undefined, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  "use cache"; cacheTag(TAGS.products); cacheLife("days");
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: /* GraphQL */ `
      query getProductRecommendations($productId: ID!) {
        productRecommendations(productId: $productId) {
          ...product
        }
      }
    `,
    variables: { productId } as any
  });

  return reshapeProducts(res.body.data.products as any);
}

export async function getProducts({ query }: { query?: string }): Promise<Product[]> {
  "use cache"; cacheTag(TAGS.products); cacheLife("days");
  const res = await shopifyFetch<ShopifyProductsOperation>({ query: getProductsQuery, variables: { query } as any });
  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

/* REVALIDATION */
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  const topic = (await headers()).get("x-shopify-topic") || "";
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ status: 401 });
  }

  if (topic.startsWith("collections/")) {
    revalidateTag(TAGS.collections, "max" as any);
  }

  if (topic.startsWith("products/")) {
    revalidateTag(TAGS.products, "max" as any);
  }

  return NextResponse.json({ revalidated: true });
}