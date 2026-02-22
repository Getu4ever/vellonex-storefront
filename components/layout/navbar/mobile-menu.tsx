"use client";

import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment, Suspense, useEffect, useState } from "react";

import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Menu } from "lib/shopify/types";
import Search, { SearchSkeleton } from "./search";

/* -------------------------------------------------------------------------- */
/*                               FALLBACK LINKS                                */
/* -------------------------------------------------------------------------- */

const FALLBACK_MENU: Menu[] = [
  { title: "Shop All", path: "/search/featured" },
  { title: "Best Sellers", path: "/search/featured" },
  { title: "The Edit", path: "/edit" },
  { title: "Archive", path: "/search/archive" },
  { title: "About", path: "/about-us" },
];

export default function MobileMenu({ menu }: { menu: Menu[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  const resolvedMenu = menu.length ? menu : FALLBACK_MENU;

  /* Close menu on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  /* Close menu if resized to desktop */
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* OPEN BUTTON */}
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white transition hover:bg-white/10 md:hidden"
      >
        <Bars3Icon className="h-5" />
      </button>

      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          {/* BACKDROP */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
          </Transition.Child>

          {/* PANEL */}
          <Transition.Child
            as={Fragment}
            enter="transition-transform duration-300"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition-transform duration-200"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="fixed inset-y-0 left-0 w-full max-w-sm bg-[#411b3f] text-white flex flex-col px-6 pb-8">
              
              {/* CLOSE */}
              <div className="flex justify-between items-center py-6">
                <span className="text-xs tracking-widest uppercase text-white/60">
                  Menu
                </span>
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                  className="h-10 w-10 flex items-center justify-center rounded-md border border-white/20 hover:bg-white/10"
                >
                  <XMarkIcon className="h-5" />
                </button>
              </div>

              {/* SEARCH */}
              <div className="mb-8">
                <Suspense fallback={<SearchSkeleton />}>
                  <Search />
                </Suspense>
              </div>

              {/* NAV LINKS */}
              <nav className="flex flex-col gap-5">
                {resolvedMenu.map((item) => (
                  <Link
                    key={item.title}
                    href={item.path}
                    onClick={closeMobileMenu}
                    className="text-lg font-light tracking-wide hover:opacity-70 transition"
                  >
                    {item.title}
                  </Link>
                ))}
              </nav>

              {/* FOOTER */}
              <div className="mt-auto pt-10 text-xs tracking-widest uppercase text-white/40">
                Vellonex © {new Date().getFullYear()}
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
