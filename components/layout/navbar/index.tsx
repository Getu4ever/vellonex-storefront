import CartModal from "components/cart/modal";
import { getMenu } from "lib/shopify";
import Link from "next/link";
import { Suspense } from "react";
import MobileMenu from "./mobile-menu";
import Search, { SearchSkeleton } from "./search";

export async function Navbar() {
  const menu = await getMenu("next-js-frontend-header-menu");

  return (
    <nav
      aria-label="Primary navigation"
      className="relative flex items-center justify-between py-6 px-6 lg:px-14 bg-[#411b3f] border-b border-white/5 z-40"
    >
      {/* 1. MOBILE MENU */}
      <div className="block flex-none md:hidden text-white">
        <Suspense fallback={null}>
          <MobileMenu menu={menu} />
        </Suspense>
      </div>

      <div className="flex w-full items-center justify-between">
        
        {/* LOGO */}
        <div className="flex md:w-1/5 items-center">
          <Link
            href="/"
            className="flex items-center group outline-none"
            aria-label="Vellonex London homepage"
          >
            {/* Invisible SEO-friendly brand text */}
            <span className="sr-only">
              Vellonex London – Luxury Jewelry & High-End Essentials
            </span>

            <div
              role="img"
              aria-label="Vellonex London logo"
              style={{
                width: "180px",
                height: "60px",
                backgroundImage: 'url("/vellonex-logo.png")',
                backgroundSize: "contain",
                backgroundPosition: "left center",
                backgroundRepeat: "no-repeat",
                mixBlendMode: "screen",
              }}
              className="transition-opacity duration-300 group-hover:opacity-90"
            />
          </Link>
        </div>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex justify-center md:w-3/5">
          <ul
            role="list"
            className="flex gap-10 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90"
          >
            
            {/* SHOP MEGA MENU */}
            <li className="group/nav relative py-4 cursor-pointer">
              <span
                role="button"
                aria-haspopup="true"
                className="hover:text-white transition-colors border-b border-transparent hover:border-white/40 pb-1"
              >
                Shop
              </span>

              <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover/nav:grid grid-cols-4 gap-12 bg-[#411b3f] border border-white/10 p-10 min-w-[850px] shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">

                {/* Jewelry */}
                <div className="flex flex-col">
                  <h3 className="text-white font-bold mb-4 tracking-widest text-[11px] border-b border-white/10 pb-2">
                    Jewelry
                  </h3>
                  <Link href="/search/the-orbit-rings" className="hover:text-white mb-3 text-white/60">
                    Rings
                  </Link>
                  <Link href="/search/the-link-bracelets" className="hover:text-white mb-3 text-white/60">
                    Bracelets
                  </Link>
                  <Link href="/search/the-foundation-necklaces" className="hover:text-white mb-3 text-white/60">
                    Necklaces
                  </Link>
                  <Link href="/search/the-acoustic-earrings" className="hover:text-white text-white/60">
                    Earrings
                  </Link>
                </div>

                {/* Materials */}
                <div className="flex flex-col">
                  <h3 className="text-white font-bold mb-4 tracking-widest text-[11px] border-b border-white/10 pb-2">
                    Materials
                  </h3>
                  <Link href="/search/the-meridian-timepieces" className="hover:text-white mb-3 text-white/60">
                    Watches
                  </Link>
                  <Link href="/search/the-goods-leather" className="hover:text-white text-white/60">
                    Leather Goods
                  </Link>
                </div>

                {/* Series */}
                <div className="flex flex-col">
                  <h3 className="text-white font-bold mb-4 tracking-widest text-[11px] border-b border-white/10 pb-2">
                    Series
                  </h3>
                  <Link href="/search/the-eyewear-series" className="hover:text-white mb-3 text-white/60">
                    Eyewear
                  </Link>
                  <Link href="/search/featured" className="hover:text-white text-white/60">
                    Featured
                  </Link>
                </div>

                {/* Editorial Highlight */}
                <div className="flex flex-col justify-between bg-white/5 p-5 rounded-sm border border-white/5">
                  <div>
                    <h3 className="text-white font-bold mb-2 tracking-widest text-[10px]">
                      The Edit
                    </h3>
                    <p className="text-[9px] text-white/40 leading-relaxed tracking-wider uppercase mb-4">
                      Curated objects <br /> with narrative intent
                    </p>
                  </div>
                  <Link
                    href="/search/curated"
                    className="text-[10px] font-bold border-t border-white/10 pt-4 hover:text-white transition-colors"
                  >
                    View Edit →
                  </Link>
                </div>
              </div>
            </li>

            {/* TOP LEVEL LINKS */}
            <li className="py-4">
              <Link href="/search/featured" className="hover:text-white transition-colors">
                Best Sellers
              </Link>
            </li>

            <li className="py-4">
              <Link href="/search/curated" className="hover:text-white transition-colors">
                The Edit
              </Link>
            </li>

            <li className="py-4">
              <Link href="/about-us" className="hover:text-white transition-colors">
                About
              </Link>
            </li>

            <li className="py-4">
              <Link
                href="/search/archive"
                className="text-white/40 hover:text-white transition-colors"
              >
                Archive
              </Link>
            </li>
          </ul>
        </div>

        {/* SEARCH & CART */}
        <div className="flex items-center justify-end gap-6 md:w-1/5 relative z-50">
          <Suspense fallback={<SearchSkeleton />}>
            <Search />
          </Suspense>

          <div className="text-white transition-all duration-300 hover:scale-110 [&_svg]:text-white [&_svg]:fill-current">
            <CartModal />
          </div>
        </div>
      </div>
    </nav>
  );
}