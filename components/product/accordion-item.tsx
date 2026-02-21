'use client';

import { useState } from 'react';

export function AccordionItem({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200 dark:border-neutral-800">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between py-4 text-left"
      >
        <span className="text-sm font-medium">{title}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <span className="text-xl">−</span>
          ) : (
            <span className="text-xl">+</span>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 animate-in fade-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
}