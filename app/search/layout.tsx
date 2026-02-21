import Collections from "components/layout/search/collections";
import FilterList from "components/layout/search/filter";
import { sorting } from "lib/constants";
import { Suspense } from "react";
import ChildrenWrapper from "./children-wrapper";

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mx-auto mt-4 flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
        
        {/* LEFT SIDEBAR: Collections */}
        <div className="bg-[#411b3f] py-10 px-2 text-center text-[10px] uppercase tracking-[0.2em] rounded-sm border-t border-white/10">
  {/* Added [&_.underline]:text-amber-400 to target only the active link color */}
  <div className="flex flex-col space-y-6 leading-[2.5] [&_a]:block [&_a]:py-2 [&_.underline]:text-amber-400">
    <Collections /> 
  </div>
</div>
        

        {/* CENTER CONTENT */}
        <div className="order-last min-h-screen w-full md:order-none">
          <Suspense fallback={null}>
            <ChildrenWrapper>{children}</ChildrenWrapper>
          </Suspense>
        </div>

       {/* RIGHT SIDEBAR: Sort By */}
<div className="order-none flex-none md:order-last md:w-[125px]">
  <div className="bg-[#411b3f] py-10 px-2 text-center text-[10px] uppercase tracking-[0.2em] rounded-sm border-t border-white/10">
    {/* Using your exact spacing and yellow highlight logic */}
    <div className="flex flex-col space-y-6 leading-[2.5] [&_a]:block [&_a]:py-2 [&_.underline]:text-amber-400">
      <FilterList list={sorting} title="Sort by" />
    </div>
  </div>
</div>

      </div>
    </>
  );
}