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
        className="min-h-[42px] rounded-md border border-rule bg-surface px-4 py-2 text-sm font-semibold text-ink transition-all duration-200 hover:border-zeltrio hover:text-zeltrio active:scale-95"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="animate-hero-enter absolute inset-x-0 top-full z-40 border-b border-rule bg-canvas px-4 py-6 shadow-lg sm:px-6"
        >
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col gap-2 text-left"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-md border-b border-rule/70 px-2 py-3 text-base font-semibold text-ink transition-colors hover:bg-surface hover:text-zeltrio"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-4 w-full px-5 py-3 text-sm"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
