"use client";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Form from "next/form";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center justify-end w-full">
      {/* 1. THE TRIGGER ICON */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-end text-white hover:scale-110 transition-transform"
          aria-label="Open Search"
        >
          <MagnifyingGlassIcon className="h-6 w-6" />
        </button>
      )}

      {/* 2. THE CENTERED OVERLAY */}
      {isOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#411b3f] px-6 lg:px-14 animate-in fade-in zoom-in-95 duration-300">
          <Form action="/search" className="relative flex w-full max-w-3xl items-center justify-center">
            
            <input
              autoFocus
              key={searchParams?.get("q")}
              type="text"
              name="q"
              placeholder="SEARCH PRODUCTS..."
              defaultValue={searchParams?.get("q") || ""}
              className="w-full bg-transparent border-b border-neutral-500 pb-2 pt-2 text-center text-lg uppercase tracking-[0.3em] text-white outline-none placeholder:text-white/20 focus:border-white transition-colors"
            />

            {/* CLOSE BUTTON - Positioned to the right of the centered input */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-0 flex h-10 w-10 items-center justify-center text-white/50 hover:text-white transition-colors"
            >
              <XMarkIcon className="h-8 w-8" />
            </button>
          </Form>
        </div>
      )}
    </div>
  );
}

export function SearchSkeleton() {
  return <div className="h-6 w-6 bg-white/10 animate-pulse rounded-full" />;
}