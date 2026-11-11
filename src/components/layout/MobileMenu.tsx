"use client";

import { useState } from "react";
import Link from "next/link";
import type { NavigationItem, SocialLinkItem } from "@/types";

interface MobileMenuProps {
  items: NavigationItem[];
  socialLinks: SocialLinkItem[];
}

export function MobileMenu({ items, socialLinks }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-panel"
        className="min-h-[44px] rounded-md border border-rule bg-surface px-4 py-2 text-sm font-bold text-ink transition-all duration-200 hover:border-zeltrio hover:text-zeltrio active:scale-95"
      >
        {isOpen ? "Close" : "Menu"}
      </button>

      {isOpen ? (
        <div
          id="mobile-navigation-panel"
          className="animate-hero-enter absolute inset-x-0 top-full z-40 border-b border-rule bg-canvas px-4 py-6 shadow-xl sm:px-6"
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
                className="flex min-h-[44px] items-center rounded-md border-b border-rule/70 px-3 py-2.5 text-base font-semibold text-ink transition-colors hover:bg-surface hover:text-zeltrio"
              >
                {item.label}
              </Link>
            ))}

            <div className="mt-4 flex flex-wrap gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="btn-secondary flex-1 px-4 py-2.5 text-xs uppercase tracking-wider"
                >
                  Follow on {social.name}
                </a>
              ))}
            </div>

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn-primary mt-3 w-full px-5 py-3 text-sm"
            >
              Start a Project
            </Link>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
