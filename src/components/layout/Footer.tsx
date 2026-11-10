import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-obsidian-border bg-obsidian text-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center gap-4">
              <BrandLogo size="md" />
              <div className="text-left">
                <p className="text-xl font-bold tracking-tight text-canvas">
                  {siteConfig.brandName}
                </p>
                <p className="text-sm font-medium text-zeltrio-bright">
                  Digital Service
                </p>
              </div>
            </Link>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-canvas/75">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs font-semibold tracking-widest uppercase text-zeltrio-bright">
              {siteConfig.taglineParts.map((word) => (
                <span key={word}>{word}</span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-canvas/60">
                Services
              </h2>
              <ul className="mt-4 space-y-3">
                {servicesData.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm font-medium text-canvas/85 transition-colors hover:text-zeltrio-bright"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-canvas/60">
                Company
              </h2>
              <ul className="mt-4 space-y-3">
                {siteConfig.primaryNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-canvas/85 transition-colors hover:text-zeltrio-bright"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-semibold tracking-widest uppercase text-canvas/60">
                Inquiry Desk
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-canvas/85">
                <li>
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="break-all font-medium transition-colors hover:text-zeltrio-bright"
                  >
                    {siteConfig.contactEmail}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.secondaryEmail}`}
                    className="break-all font-medium transition-colors hover:text-zeltrio-bright"
                  >
                    {siteConfig.secondaryEmail}
                  </a>
                </li>
                <li className="pt-1">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-md border border-zeltrio-bright/50 bg-obsidian-soft px-4 py-2 text-xs font-semibold uppercase tracking-wider text-canvas transition-all duration-200 hover:-translate-y-0.5 hover:border-zeltrio-bright hover:bg-zeltrio"
                  >
                    Request Proposal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-obsidian-border pt-8 text-xs text-canvas/65 sm:flex-row sm:items-center">
          <p>
            Copyright {currentYear} {siteConfig.legalName}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {siteConfig.legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium transition-colors hover:text-canvas"
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
