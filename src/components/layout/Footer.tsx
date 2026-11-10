import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-obsidian-soft bg-obsidian text-porcelain">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4">
              <BrandLogo size="md" />
              <div>
                <p className="text-xl font-bold tracking-tight text-porcelain">
                  {siteConfig.brandName}
                </p>
                <p className="text-sm text-porcelain/70">Digital Service</p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-porcelain/75">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-semibold tracking-widest uppercase text-porcelain/65">
              {siteConfig.taglineParts.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-porcelain/60">
                Services
              </h2>
              <ul className="mt-4 space-y-3">
                {servicesData.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm text-porcelain/80 transition-colors hover:text-porcelain"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-porcelain/60">
                Company
              </h2>
              <ul className="mt-4 space-y-3">
                {siteConfig.primaryNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-porcelain/80 transition-colors hover:text-porcelain"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-porcelain/60">
                Consultation
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-porcelain/80">
                <li>
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="transition-colors hover:text-porcelain"
                  >
                    Email Zeltrio Team
                  </a>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="inline-block rounded border border-porcelain/25 px-3.5 py-2 text-xs font-semibold uppercase tracking-wider text-porcelain transition-colors hover:border-porcelain"
                  >
                    Request Proposal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-porcelain/15 pt-8 text-xs text-porcelain/60 sm:flex-row sm:items-center">
          <p>
            Copyright {currentYear} {siteConfig.legalName}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {siteConfig.legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-porcelain"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

