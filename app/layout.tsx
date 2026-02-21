import Footer from "components/layout/footer";
import { Navbar } from "components/layout/navbar";
import PageTransition from "components/layout/page-transition";
import { WelcomeToast } from "components/welcome-toast";
import { GeistSans } from "geist/font/sans";
import { baseUrl } from "lib/utils";
import { ReactNode, Suspense } from "react";
import { Toaster } from "sonner";
import CartProviderWrapper from "../components/cart/CartProviderWrapper";
import "./globals.css";

// Use the environment variable for your brand name
const SITE_NAME = process.env.SITE_NAME || 'Vellonex';
const SITE_DESCRIPTION = 'Architectural jewelry for the modern minimalist.';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`, // This adds " | Vellonex" to every sub-page title
  },
  description: SITE_DESCRIPTION,
  robots: {
    follow: true,
    index: true,
  },
  // This links your favicon and apple icon
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white font-sans">
        <Suspense
          fallback={
            <div className="h-16 bg-neutral-100 dark:bg-neutral-800 animate-pulse" />
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
              <WelcomeToast />
            </main>

            <Footer />
          </CartProviderWrapper>
        </Suspense>
      </body>
    </html>
  );
}