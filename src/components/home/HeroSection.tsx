import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-canvas">
      <div className="absolute inset-0">
        <BackgroundPhoto
          src={siteConfig.heroBackgroundPath}
          alt="Zeltrio Digital Services specialists collaborating around laptops and design blueprints in a bright studio"
          priority
          className="opacity-22 sm:opacity-28"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/94 to-surface/80"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="animate-hero-enter text-left lg:col-span-7">
            <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-zeltrio/25 bg-canvas/95 px-4 py-1.5 shadow-xs">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-zeltrio"
              />
              <span className="text-xs font-bold tracking-widest uppercase text-ink">
                {siteConfig.legalName}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-[3.5rem]">
              {siteConfig.tagline}{" "}
              <span className="block font-serif font-medium italic text-zeltrio sm:inline">
                With Precision Websites, Search, and Automation
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              Zeltrio Digital Services partners with growing companies to build
              fast websites, improve search engine rankings, manage high impact
              campaigns, and automate client workflows. We also help you start a
              new influencer and creator journey with the help of the Zeltrio
              platform in one go.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-sm">
                Request a Consultation
              </Link>
              <Link
                href="/services"
                className="btn-secondary px-7 py-3.5 text-sm"
              >
                Explore All Services
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs font-semibold text-muted">
              <span className="uppercase tracking-wider">Connect With Us</span>
              {siteConfig.socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[38px] items-center rounded-md border border-rule bg-canvas px-3.5 py-1.5 text-xs font-bold text-ink transition-all duration-200 hover:-translate-y-0.5 hover:border-zeltrio hover:text-zeltrio"
                >
                  {social.name}
                </a>
              ))}
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 divide-x divide-rule border-t border-rule pt-6">
              {siteConfig.taglineParts.map((pillar, idx) => (
                <div key={pillar} className={idx === 0 ? "pr-4" : "px-4"}>
                  <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                    Stage 0{idx + 1}
                  </p>
                  <p className="mt-1 text-base font-bold text-ink sm:text-lg">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-hero-enter lg:col-span-5">
            <div className="rounded-2xl border border-rule bg-canvas/95 p-6 text-left shadow-[0_24px_54px_-24px_rgba(6,26,64,0.22)] backdrop-blur-sm sm:p-8">
              <div className="flex flex-col gap-5 border-b border-rule pb-6 sm:flex-row sm:items-center">
                <BrandLogo size="lg" priority />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                    {siteConfig.legalName}
                  </p>
                  <h2 className="mt-1 font-serif text-xl font-medium leading-snug text-ink sm:text-2xl">
                    Four Integrated Services to Build and Scale Your Brand
                  </h2>
                </div>
              </div>

              <div className="mt-4 divide-y divide-rule">
                {servicesData.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between gap-4 py-3.5 transition-colors hover:text-zeltrio"
                  >
                    <div>
                      <p className="text-sm font-bold text-ink transition-colors group-hover:text-zeltrio sm:text-base">
                        {service.title}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-muted">
                        {service.timeline}
                      </p>
                    </div>
                    <span className="rounded-md border border-rule bg-surface px-3 py-1.5 text-xs font-bold tracking-widest text-zeltrio transition-all duration-200 group-hover:border-zeltrio group-hover:bg-zeltrio group-hover:text-canvas">
                      {service.index}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-navy-border bg-navy p-5 text-canvas">
                <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                  Creator Launch Program
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-canvas/85 sm:text-sm">
                  Start a new influencer and creator journey with the help of
                  the Zeltrio platform in one go with aligned identity, content
                  strategy, and web presence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
