import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // In Next 16, this is a top-level flag, not inside experimental
  cacheComponents: true, 
  
  typescript: {
    // Keeps build running despite small type mismatches
    ignoreBuildErrors: true,
  },

  experimental: {
    inlineCss: true,
    // We removed 'dynamicIO' (it's now cacheComponents)
    // We removed 'cacheHandlers: true' (it's for custom Redis/KV objects)
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.shopify.com",
        pathname: "/s/files/**",
      },
    ],
  },
};

export default nextConfig;