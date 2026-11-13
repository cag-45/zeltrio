"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  const pathname = usePathname();

  if (pathname?.startsWith("/demos")) {
    return null;
  }
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-canvas/80 backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3.5 transition-opacity hover:opacity-95"
        >
          <BrandLogo size="sm" priority />
          <div className="flex flex-col text-left">
            <span className="font-display text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-zeltrio-bright">
              {siteConfig.brandName}
            </span>
            <span className="text-xs font-semibold tracking-wide text-gold">
              {siteConfig.subtitle}
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-7 md:flex lg:gap-8"
        >
          {siteConfig.primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-1.5 text-sm font-semibold text-slate transition-colors duration-200 hover:text-ink after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:origin-left after:scale-x-0 after:bg-linear-to-r after:from-zeltrio-bright after:to-gold after:transition-transform after:duration-300 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <div className="hidden items-center lg:flex">
            <SocialLogoButtons size="sm" />
          </div>

          <MagneticLink
            href="/contact?topic=website-audit"
            className="btn-primary px-5 py-2.5 text-sm"
          >
            <span>Free Site Audit</span>
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </MagneticLink>
        </div>

        <MobileMenu items={siteConfig.primaryNavigation} />
      </div>
    </header>
  );
}
