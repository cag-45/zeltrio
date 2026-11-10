import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-rule bg-canvas">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="animate-hero-enter text-left lg:col-span-7">
            <p className="inline-flex items-center gap-2 rounded-full border border-zeltrio/25 bg-zeltrio-tint px-4 py-1.5 text-xs font-bold tracking-widest uppercase text-zeltrio">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-zeltrio"
              />
              <span>{siteConfig.legalName}</span>
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.4rem]">
              Websites, Search Growth, and Automation Built for{" "}
              <span className="font-serif font-medium italic text-zeltrio">
                Lasting Commercial Trust
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              Zeltrio partners with ambitious businesses to engineer high speed
              websites, elevate organic search rankings, execute focused digital
              campaigns, and automate client inquiries. We also help you start a
              new influencer and creator journey with the help of the Zeltrio
              platform in one go.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
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

            <div className="mt-12 grid max-w-xl grid-cols-3 divide-x divide-rule border-t border-rule pt-6">
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
            <div className="rounded-2xl border border-obsidian-border bg-obsidian p-7 text-left text-canvas shadow-[0_24px_48px_-24px_rgba(5,8,15,0.65)] sm:p-9">
              <div className="flex flex-col gap-5 border-b border-obsidian-border pb-7 sm:flex-row sm:items-center">
                <BrandLogo size="lg" priority />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                    Full Practice Overview
                  </p>
                  <h2 className="mt-1.5 font-serif text-2xl font-medium leading-snug text-canvas">
                    Four Integrated Capabilities Under One Roof
                  </h2>
                </div>
              </div>

              <div className="mt-5 divide-y divide-obsidian-border">
                {servicesData.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="group flex items-center justify-between gap-4 py-4 transition-colors hover:text-zeltrio-bright"
                  >
                    <div>
                      <p className="text-sm font-bold text-canvas transition-colors group-hover:text-zeltrio-bright sm:text-base">
                        {service.title}
                      </p>
                      <p className="mt-0.5 text-xs text-canvas/65">
                        {service.timeline}
                      </p>
                    </div>
                    <span className="rounded border border-obsidian-border bg-obsidian-soft px-3 py-1 text-xs font-bold tracking-widest text-zeltrio-bright transition-colors group-hover:border-zeltrio-bright group-hover:bg-zeltrio group-hover:text-canvas">
                      {service.index}
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-xl border border-obsidian-border bg-obsidian-soft p-4">
                <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                  Creator Launch Advantage
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-canvas/80">
                  Start a new influencer and creator journey with the help of
                  the Zeltrio platform in one go with unified identity, content
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
