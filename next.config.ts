/** @type {import('next').NextConfig} */
const nextConfig = {
  // TypeScript: Ignore build errors (useful in dev, disable in prod for safety)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Experimental features (only keep what's actually needed)
  experimental: {
    // Inline CSS for better performance (valid in Next 16)
    inlineCss: true,
  },

  // Image optimization settings
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**',
      },
      {
        protocol: 'https',
        hostname: '**.shopify.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // if you use external images
        pathname: '/**',
      },
    ],
  },

  // Performance & build optimizations
  swcMinify: true,               // faster minification
  productionBrowserSourceMaps: false, // disable source maps in prod (smaller bundles)
  compress: true,                 // gzip compression

  // Optional: if you need redirects or rewrites
  // async redirects() {
  //   return [];
  // },

  // Optional: if you need headers
  // async headers() {
  //   return [];
  // },
};

export default nextConfig;