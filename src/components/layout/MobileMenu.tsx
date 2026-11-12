"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NavigationItem } from "@/types";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";

interface MobileMenuProps {
  items: NavigationItem[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-rule-strong bg-surface-elevated/90 px-4 py-2 text-sm font-bold text-ink transition-all duration-200 hover:border-gold/60 hover:text-gold active:scale-95"
      >
        <span>{isOpen ? "Close" : "Menu"}</span>
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="animate-hero-enter absolute inset-x-0 top-full z-40 max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-b border-rule-strong bg-surface/95 px-4 py-6 shadow-2xl backdrop-blur-2xl sm:px-6"
        >
          <nav
            aria-label="Mobile Navigation"
            className="flex flex-col gap-1.5 text-left"
          >
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex min-h-[44px] items-center rounded-lg border-b border-rule px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-surface-elevated hover:text-gold"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex items-center justify-between gap-3 pt-2">
              <span className="text-xs font-bold tracking-widest uppercase text-muted">
                Social Channels
              </span>
              <SocialLogoButtons
                size="md"
                onAction={() => setIsOpen(false)}
              />
            </div>

            <Link
              href="/contact?topic=website-audit"
              onClick={() => setIsOpen(false)}
              className="btn-gold mt-4 w-full px-5 py-3 text-sm"
            >
              Get a Free Website Audit
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
