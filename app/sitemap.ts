import { getCollections, getPages, getProducts } from "lib/shopify";
import { baseUrl, validateEnvironmentVariables } from "lib/utils";
import { MetadataRoute } from "next";

type Route = {
  url: string;
  lastModified: string;
};

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure we don't crash if environment variables are missing
  try {
    validateEnvironmentVariables();
  } catch (error) {
    console.error("Sitemap: Environment validation failed", error);
  }

  // 1. Base Routes (Home)
  const routesMap: Route[] = [""].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // 2. Journal Routes (Manual Injection for vellonex.co.uk articles)
  const journalRoutes: Route[] = [
    "/journal",
    "/journal/the-science-of-titanium",
    "/journal/asymmetry-in-design",
    "/journal/ethical-sourcing",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date().toISOString(),
  }));

  // Define the fetch promises
  const collectionsPromise = getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}${collection.path}`,
      lastModified: collection.updatedAt || new Date().toISOString(),
    })),
  );

  const productsPromise = getProducts({}).then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.handle}`,
      lastModified: product.updatedAt || new Date().toISOString(),
    })),
  );

  const pagesPromise = getPages().then((pages) =>
    pages.map((page) => ({
      url: `${baseUrl}/${page.handle}`,
      lastModified: page.updatedAt || new Date().toISOString(),
    })),
  );

  let fetchedRoutes: Route[] = [];

  try {
    // Use allSettled so one failed Shopify fetch doesn't trigger a 500 error
    const results = await Promise.allSettled([
      collectionsPromise,
      productsPromise,
      pagesPromise,
    ]);

    fetchedRoutes = results
      .filter((result): result is PromiseFulfilledResult<Route[]> => result.status === "fulfilled")
      .map((result) => result.value)
      .flat();
      
    // Log failures to terminal for debugging without crashing the page
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        const types = ["Collections", "Products", "Pages"];
        console.error(`Sitemap: Failed to fetch ${types[index]}`, result.reason);
      }
    });
  } catch (error) {
    console.error("Sitemap generation critical error:", error);
  }

  // Combine: Home + Journal + Successful Shopify Data
  return [...routesMap, ...journalRoutes, ...fetchedRoutes];
}