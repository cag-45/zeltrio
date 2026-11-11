import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-navy-border bg-navy-deep text-canvas">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="text-left lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4">
              <BrandLogo size="md" />
              <div>
                <p className="text-xl font-bold tracking-tight text-canvas">
                  {siteConfig.brandName}
                </p>
                <p className="text-sm font-semibold text-zeltrio-bright">
                  {siteConfig.subtitle}
                </p>
              </div>
            </Link>

            <p className="mt-5 text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
              {siteConfig.tagline}
            </p>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-canvas/80">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ghost-navy px-4 py-2 text-xs uppercase tracking-wider"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>

          <div className="grid gap-8 text-left sm:grid-cols-3 lg:col-span-8">
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-canvas/60">
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
              <h2 className="text-xs font-bold tracking-widest uppercase text-canvas/60">
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
              <h2 className="text-xs font-bold tracking-widest uppercase text-canvas/60">
                Inquiry Desk
              </h2>
              <ul className="mt-4 space-y-3 text-sm text-canvas/85">
                <li className="font-medium">
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </li>
                {siteConfig.inquiryEmails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="break-all font-medium transition-colors hover:text-zeltrio-bright"
                    >
                      {email}
                    </a>
                  </li>
                ))}
                <li className="pt-2">
                  <Link
                    href="/contact"
                    className="btn-primary w-full px-4 py-2.5 text-xs uppercase tracking-wider"
                  >
                    Request Proposal
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-navy-border pt-8 text-xs text-canvas/70 sm:flex-row sm:items-center">
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
