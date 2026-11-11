import Link from "next/link";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticLink } from "@/components/ui/MagneticLink";

const marqueeCapabilities = [
  "Custom Website Engineering",
  "Technical & Local Search SEO",
  "Influencer & Creator Launch Platform",
  "Instagram Creative Systems",
  "WhatsApp & CRM Automation",
  "Sub-Second Edge Performance",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-rule">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundPhoto
          src={siteConfig.heroBackgroundPath}
          alt="Zeltrio Digital Services specialists collaborating around laptops and design blueprints in a studio"
          priority
          className="opacity-14"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-canvas/45 via-canvas/70 to-canvas/90"
        />
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-zeltrio/12 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="absolute right-1/5 bottom-8 h-80 w-80 rounded-full bg-gold/10 blur-[120px]"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pt-12 pb-14 sm:px-6 sm:pt-18 sm:pb-20 lg:px-8 lg:pt-20 lg:pb-24">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="text-left lg:col-span-7">
            <div className="animate-hero-enter inline-flex flex-wrap items-center gap-2.5 rounded-full border border-rule-strong bg-surface-elevated/85 px-4 py-1.5 backdrop-blur-md">
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
              </span>
              <span className="text-xs font-bold tracking-widest uppercase text-ink">
                {siteConfig.legalName}
              </span>
              <span className="hidden h-3 w-px bg-rule-strong sm:inline-block" />
              <span className="hidden text-xs font-medium text-gold sm:inline">
                Digital Engineering & Creator Launch
              </span>
            </div>

            <h1 className="animate-hero-enter-delay-1 mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.6rem]">
              {siteConfig.tagline}{" "}
              <span className="block font-serif font-medium italic text-gold sm:inline">
                With Precision Websites, Search, and Automation
              </span>
            </h1>

            <p className="animate-hero-enter-delay-2 mt-6 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
              Zeltrio Digital Services partners with growing companies to build
              fast websites, improve search engine rankings, manage high impact
              campaigns, and automate client workflows. We also help you start a
              new influencer and creator journey with the help of the Zeltrio
              platform in one go.
            </p>

            <div className="animate-hero-enter-delay-3 mt-8 flex flex-wrap items-center gap-4">
              <MagneticLink
                href="/contact"
                className="btn-gold px-7 py-3.5 text-sm"
              >
                <span>Request a Consultation</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </MagneticLink>

              <MagneticLink
                href="/services"
                className="btn-secondary px-7 py-3.5 text-sm"
              >
                Explore All Services
              </MagneticLink>
            </div>

            <div className="animate-hero-enter-delay-3 mt-7 flex flex-wrap items-center gap-4">
              <span className="text-xs font-bold tracking-widest uppercase text-muted">
                Connect
              </span>
              <SocialLogoButtons size="md" />
            </div>

            <div className="animate-hero-enter-delay-3 mt-10 grid max-w-xl grid-cols-3 divide-x divide-rule border-t border-rule pt-6">
              {siteConfig.taglineParts.map((pillar, idx) => (
                <div
                  key={pillar}
                  className={`group ${idx === 0 ? "pr-4" : "px-4"}`}
                >
                  <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright transition-colors group-hover:text-gold">
                    Stage 0{idx + 1}
                  </p>
                  <p className="mt-1 font-display text-base font-bold text-ink sm:text-lg">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-hero-enter-delay-2 lg:col-span-5">
            <SpotlightCard
              accent="gold"
              className="surface-glass rounded-2xl border border-rule-strong p-6 text-left shadow-[0_28px_64px_-24px_rgba(0,0,0,0.85)] sm:p-8"
            >
              <div className="flex flex-col gap-5 border-b border-rule pb-6 sm:flex-row sm:items-center">
                <BrandLogo size="lg" priority />
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gold">
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
                    className="group flex items-center justify-between gap-4 py-3.5 transition-all duration-200 hover:pl-1.5"
                  >
                    <div>
                      <p className="font-display text-sm font-bold text-ink transition-colors group-hover:text-gold sm:text-base">
                        {service.title}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-muted">
                        {service.timeline}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-rule-strong bg-surface-elevated px-3 py-1.5 text-xs font-bold tracking-widest text-zeltrio-bright transition-all duration-200 group-hover:border-gold/60 group-hover:bg-gold group-hover:text-canvas">
                      <span>{service.index}</span>
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-gold/25 bg-linear-to-br from-surface-elevated via-navy to-surface p-5">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold tracking-widest uppercase text-gold">
                    Creator Launch Program
                  </p>
                  <span className="rounded-full bg-gold-tint px-2.5 py-0.5 text-[11px] font-bold text-gold-bright">
                    One Go Setup
                  </span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate sm:text-sm">
                  Start a new influencer and creator journey with the help of
                  the Zeltrio platform in one go with aligned identity, content
                  strategy, and web presence.
                </p>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>

      {/* Kinetic Studio Capabilities Strip */}
      <div className="relative border-t border-rule bg-surface/60 backdrop-blur-md">
        <div className="group flex overflow-hidden py-3.5 select-none">
          <div className="animate-marquee flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]">
            {marqueeCapabilities.map((item) => (
              <div key={item} className="flex items-center gap-8">
                <span className="whitespace-nowrap font-display text-xs font-semibold tracking-[0.18em] uppercase text-slate">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-gold"
                />
              </div>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="animate-marquee flex shrink-0 items-center gap-8 pr-8 group-hover:[animation-play-state:paused]"
          >
            {marqueeCapabilities.map((item) => (
              <div key={`${item}-dup`} className="flex items-center gap-8">
                <span className="whitespace-nowrap font-display text-xs font-semibold tracking-[0.18em] uppercase text-slate">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-zeltrio-bright" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
