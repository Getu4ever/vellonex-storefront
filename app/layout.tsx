import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import PageTransition from "components/layout/page-transition";
import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import CartProviderWrapper from "../components/cart/CartProviderWrapper";
import "./globals.css";

// Use the environment variable for your brand name
const SITE_NAME = process.env.SITE_NAME || 'Vellonex';
const SITE_DESCRIPTION = 'Discover Vellonex London\'s collection of architectural jewelry and high-end essentials. Handcrafted luxury pieces for the modern minimalist.';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${SITE_NAME} London | Luxury Jewelry & High-End Essentials`,
    template: `%s | ${SITE_NAME}`, // This adds " | Vellonex" to every sub-page title
  },
  description: SITE_DESCRIPTION,
  keywords: ["luxury jewelry London", "minimalist jewelry", "high-end essentials", "Vellonex jewelry", "bespoke jewelry UK"],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // This links your favicon and apple icon
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: `${SITE_NAME} London`,
    description: SITE_DESCRIPTION,
    url: baseUrl,
    siteName: SITE_NAME,
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
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
        {/* Structured Data (JSON-LD) for Search Engine Rich Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Vellonex London',
              url: baseUrl,
              logo: `${baseUrl}/icon.png`,
              description: SITE_DESCRIPTION,
              sameAs: [
                'https://instagram.com/vellonex', // Update with your actual social links
              ],
            }),
          }}
        />
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white font-sans">
        {/* Adjusted fallback height to h-[120px] to match your navbar height and prevent CLS */}
        <Suspense
          fallback={
            <div className="h-[120px] bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
          }
        >
          <CartProviderWrapper>
            <Navbar />

            {/* The main content area */}
            <main className="pt-[120px]">
              <PageTransition>
                {children}
              </PageTransition>

              <Toaster closeButton />
            </main>

            <Footer />
          </CartProviderWrapper>
        </Suspense>
      </body>
    </html>
  );
}