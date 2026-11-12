import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-rule bg-navy-deep/90 backdrop-blur-xl text-ink">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-zeltrio/55 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="text-left lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4">
              <BrandLogo size="md" />
              <div>
                <p className="font-display text-xl font-bold tracking-tight text-ink">
                  {siteConfig.brandName}
                </p>
                <p className="text-sm font-semibold text-zeltrio-bright">
                  {siteConfig.subtitle}
                </p>
              </div>
            </Link>

            <p className="mt-5 text-xs font-bold tracking-widest uppercase text-gold">
              {siteConfig.tagline}
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <SocialLogoButtons size="md" />
            </div>
          </div>

          <div className="grid gap-8 text-left sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gold">
                Services
              </h2>
              <ul className="mt-4 space-y-3">
                {servicesData.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-sm font-medium text-slate transition-colors hover:text-ink"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gold">
                Company
              </h2>
              <ul className="mt-4 space-y-3">
                {siteConfig.primaryNavigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm font-medium text-slate transition-colors hover:text-ink"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gold">
                Inquiry Desk
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-slate">
                <li className="font-medium text-ink">
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </li>
                {siteConfig.inquiryEmails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="wrap-anywhere font-medium transition-colors hover:text-zeltrio-bright"
                    >
                      {email}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <MagneticLink
                    href="/contact?topic=website-audit"
                    className="btn-primary w-full px-4 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Free Website Audit
                  </MagneticLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-rule pt-8 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            Copyright {currentYear} {siteConfig.legalName}. All Rights Reserved.
          </p>
          <div className="flex flex-wrap gap-6">
            {siteConfig.legalNavigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="font-medium transition-colors hover:text-ink"
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
