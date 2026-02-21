"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import type { ListItem } from ".";
import { FilterItem } from "./item";

export default function FilterItemDropdown({ list }: { list: ListItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [active, setActive] = useState("");
  const [openSelect, setOpenSelect] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => window.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    list.forEach((listItem: ListItem) => {
      if (
        ("path" in listItem && pathname === listItem.path) ||
        ("slug" in listItem && searchParams.get("sort") === listItem.slug)
      ) {
        setActive(listItem.title);
      }
    });
  }, [pathname, list, searchParams]);

  return (
    <div className="relative" ref={ref}>
      {/* SELECT TRIGGER */}
      <div
        onClick={() => setOpenSelect(!openSelect)}
        className="flex w-full items-center justify-between rounded-sm border border-white/30 bg-[#411b3f] px-4 py-2 text-sm text-white cursor-pointer"
      >
        <span className="uppercase tracking-wide">
          {active || "Sort"}
        </span>
        <ChevronDownIcon className="h-4 w-4 text-white/80" />
      </div>

      {/* DROPDOWN */}
      {openSelect && (
        <div
          onClick={() => setOpenSelect(false)}
          className="absolute z-40 mt-1 w-full rounded-md bg-[#411b3f] p-2 shadow-2xl border border-white/10"
        >
          {list.map((item: ListItem, i) => (
            <div
              key={i}
              className="rounded-sm px-3 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              <FilterItem item={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
