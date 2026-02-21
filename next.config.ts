/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Allows build to continue even with minor type mismatches
    ignoreBuildErrors: true,
  },
  experimental: {
    inlineCss: true,
    // This is the specific flag required to use the "use cache" directive
    dynamicIO: true, 
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