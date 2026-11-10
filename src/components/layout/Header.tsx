import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-canvas/95 backdrop-blur-md">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3.5 transition-opacity hover:opacity-95"
        >
          <BrandLogo size="sm" priority />
          <div className="flex flex-col text-left">
            <span className="text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-zeltrio">
              {siteConfig.brandName}
            </span>
            <span className="text-xs font-semibold tracking-wide text-muted">
              Digital Service
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary Navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {siteConfig.primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative py-1 text-sm font-semibold text-slate transition-colors hover:text-zeltrio after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:scale-x-0 after:bg-zeltrio after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact" className="btn-primary px-5 py-2.5 text-sm">
            Start a Project
          </Link>
        </div>

        <MobileMenu items={siteConfig.primaryNavigation} />
      </div>
    </header>
  );
}
