export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<{ node: T }>;
  pageInfo?: {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    startCursor: string | null;
    endCursor: string | null;
  };
};

export type Image = {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type SEO = {
  title: string | null;
  description: string | null;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  selectedOptions: SelectedOption[];
  availableForSale: boolean;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: Array<{ id: string; name: string; values: string[] }>;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: ProductVariant[];
  images: Image[];
  featuredImage: Image | null;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  metafields: Array<{ key: string; value: string }>;
  collections?: Connection<Collection>; // ← FIXED: added collections field (optional)
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  seo: SEO;
  updatedAt: string;
  path: string;
  metafield?: { value: string } | null;
};

export type CartLine = {
  id: string;
  quantity: number;
  cost: { totalAmount: Money };
  merchandise: ProductVariant;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money | null;
  };
  lines: CartLine[];
  totalQuantity: number;
};

/* RAW SHOPIFY RESPONSE TYPES */
export type ShopifyProduct = Omit<Product, 'variants' | 'images'> & {
  variants: Connection<ProductVariant>;
  images: Connection<Image>;
  collections?: Connection<Collection>; // ← added here too for safety
};

export type ShopifyCollection = Collection;

export type ShopifyCart = Omit<Cart, 'lines'> & {
  lines: Connection<CartLine>;
};

/* API ARGUMENT TYPES */
export type GetCollectionProductsArgs = {
  collection?: string;
  handle?: string;
  reverse?: boolean;
  sortKey?: string;
  query?: string;
  first?: number; // ← added support for first (pagination)
};

/* API OPERATION TYPES */
export type ShopifyCartOperation = {
  data: { cart: ShopifyCart | null };
  variables: { cartId: string };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
  variables: Record<string, never>; 
};

export type ShopifyAddToCartOperation = {
  data: { cartLinesAdd: { cart: ShopifyCart } };
  variables: { cartId: string; lines: Array<{ merchandiseId: string; quantity: number }> };
};

export type ShopifyRemoveFromCartOperation = {
  data: { cartLinesRemove: { cart: ShopifyCart } };
  variables: { cartId: string; lineIds: string[] };
};

export type ShopifyUpdateCartOperation = {
  data: { cartLinesUpdate: { cart: ShopifyCart } };
  variables: { cartId: string; lines: Array<{ id: string; merchandiseId: string; quantity: number }> };
};

export type ShopifyCollectionOperation = {
  data: { collection: ShopifyCollection | null };
  variables: { handle: string };
};

// Updated to use the new Args type + first support
export type ShopifyCollectionProductsOperation = {
  data: { collection: { products: Connection<ShopifyProduct> } | null };
  variables: GetCollectionProductsArgs;
};

export type ShopifyCollectionsOperation = {
  data: { collections: Connection<ShopifyCollection> };
  variables: Record<string, never>;
};

export type ShopifyMenuOperation = {
  data: { menu: { items: Array<{ title: string; url: string }> } | null };
  variables: { handle: string };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct | null };
  variables: { handle: string };
};

export type ShopifyProductsOperation = {
  data: { products: Connection<ShopifyProduct> };
  variables: { query?: string; reverse?: boolean; sortKey?: string };
};

export type Menu = { title: string; path: string; };