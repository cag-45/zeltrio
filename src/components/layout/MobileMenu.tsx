"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavigationItem } from "@/types";

interface MobileMenuProps {
  items: NavigationItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        className="rounded-md border border-rule bg-porcelain px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-ink"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="absolute inset-x-0 top-full z-40 border-b border-rule bg-alabaster px-6 py-6 shadow-sm"
        >
          <nav aria-label="Mobile navigation" className="flex flex-col gap-3">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-rule/70 py-2.5 text-base font-medium text-ink transition-colors hover:text-cobalt"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-cobalt px-5 py-3 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}

