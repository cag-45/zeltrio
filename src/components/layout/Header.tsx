import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-alabaster/95 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3.5 transition-opacity hover:opacity-90"
        >
          <BrandLogo size="sm" priority />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-ink">
              {siteConfig.brandName}
            </span>
            <span className="text-xs font-medium tracking-wide text-muted">
              Digital Service
            </span>
          </div>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {siteConfig.primaryNavigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-slate transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-cobalt px-5 py-2.5 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark"
          >
            Start a Project
          </Link>
        </div>

        <MobileMenu items={siteConfig.primaryNavigation} />
      </div>
    </header>
  );
}

