import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import PageTransition from "components/layout/page-transition";
import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import CartProviderWrapper from "../components/cart/CartProviderWrapper";
import "./globals.css";

// Brand configuration
const SITE_NAME = process.env.SITE_NAME || "Vellonex";
const SITE_DESCRIPTION =
  "Luxury architectural jewelry and high-end essentials from Vellonex London — handcrafted minimalist rings, necklaces, bracelets and more in titanium, gold vermeil and lab-grown diamonds.";

export const metadata = {
  metadataBase: new URL(baseUrl),

  title: {
    default: `${SITE_NAME} London | Luxury Architectural Jewelry & Essentials`,
    template: `%s | ${SITE_NAME} London`,
  },

  description: SITE_DESCRIPTION,

  keywords: [
    "luxury jewelry London",
    "architectural jewelry",
    "minimalist rings",
    "titanium jewelry",
    "gold vermeil",
    "lab grown diamonds",
    "Vellonex London",
    "high-end essentials UK",
  ],

  alternates: {
    canonical: baseUrl,
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
  },

  openGraph: {
    title: `${SITE_NAME} London | Luxury Architectural Jewelry`,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    siteName: SITE_NAME,
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Vellonex London luxury architectural jewelry collection",
      },
    ],
    locale: "en_GB",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} London | Luxury Architectural Jewelry`,
    description: SITE_DESCRIPTION,
    images: ["/og-home.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
     <head>
  {/* Performance Injections: Shopify Connection Warm-up */}
  <link rel="preconnect" href="https://cdn.shopify.com" crossOrigin="anonymous" />
  <link rel="dns-prefetch" href="https://cdn.shopify.com" />
  
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify([
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Vellonex London",
          url: baseUrl,
          logo: `${baseUrl}/icon.png`,
          description: SITE_DESCRIPTION,
          sameAs: [
            "https://instagram.com/vellonex",
            "https://twitter.com/vellonex",
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vellonex London",
          url: baseUrl,
          potentialAction: {
            "@type": "SearchAction",
            target: `${baseUrl}/search?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        },
      ]),
    }}
  />
</head>

      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white font-sans antialiased">
        {/* CartProvider must wrap everything and stay outside Suspense to maintain state connectivity */}
        <CartProviderWrapper>
          <Suspense
            fallback={
              <div className="h-[120px] bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
            }
          >
            <Navbar />
          </Suspense>

          <main role="main" id="main-content" className="pt-[120px]">
            <PageTransition>{children}</PageTransition>
            <Toaster closeButton />
          </main>

          <Footer />
        </CartProviderWrapper>
      </body>
    </html>
  );
}