import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function HeroSection() {
  return (
    <section className="border-b border-rule bg-alabaster">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="inline-block rounded-full border border-rule bg-porcelain px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-slate">
              {siteConfig.legalName}
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Websites, search growth, and automation built for{" "}
              <span className="font-serif font-medium italic text-cobalt">
                lasting commercial trust.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
              Zeltrio partners with ambitious companies to engineer fast loading
              websites, elevate organic search rankings, execute focused digital
              campaigns, and automate client inquiries from initial click to
              confirmed appointment.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-md bg-cobalt px-6 py-3.5 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark"
              >
                Request a Consultation
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-md border border-rule bg-porcelain px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-rule border-t border-rule pt-6">
              {siteConfig.taglineParts.map((pillar, idx) => (
                <div
                  key={pillar}
                  className={idx === 0 ? "pr-4" : "px-4"}
                >
                  <p className="text-xs font-semibold tracking-widest uppercase text-muted">
                    Stage 0{idx + 1}
                  </p>
                  <p className="mt-1 text-base font-bold text-ink">{pillar}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-obsidian-soft bg-obsidian p-8 text-porcelain sm:p-10">
              <div className="flex flex-col items-center text-center">
                <BrandLogo size="hero" priority />
                <p className="mt-6 text-xs font-semibold tracking-widest uppercase text-porcelain/65">
                  Full Practice Overview
                </p>
                <h2 className="mt-2 font-serif text-2xl font-medium text-porcelain">
                  Four integrated capabilities under one roof
                </h2>
              </div>

              <div className="mt-8 divide-y divide-porcelain/15 border-t border-porcelain/15">
                {servicesData.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="flex items-center justify-between py-3.5 text-sm transition-colors hover:text-porcelain/75"
                  >
                    <span className="font-medium text-porcelain">
                      {service.title}
                    </span>
                    <span className="text-xs font-semibold tracking-widest uppercase text-porcelain/55">
                      {service.index}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

