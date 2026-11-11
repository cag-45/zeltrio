import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { companyPrinciples, companyStory } from "@/data/company";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";
import { JsonLd } from "@/components/seo/JsonLd";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const metadata: Metadata = buildPageMetadata({
  title: "About Zeltrio Digital Services",
  description:
    "Learn how Zeltrio Digital Services unites Website Engineering, Search Visibility, Influencer and Creator Launches, Digital Marketing, and Business Automation.",
  path: "/about",
  keywords: [
    "about Zeltrio",
    "Zeltrio Digital Services",
    "digital agency standards",
    "creator platform launch",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="relative overflow-hidden border-b border-rule bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          <BackgroundPhoto
            src={siteConfig.studioBackgroundPath}
            alt="Zeltrio Digital Services specialists collaborating in a studio workspace"
            priority
            className="opacity-14"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-canvas/85 via-canvas/75 to-surface/75"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="animate-hero-enter lg:col-span-7">
              <p className="text-xs font-bold tracking-widest uppercase text-gold">
                About the Agency
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {companyStory.headline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate">
                {companyStory.introduction}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {companyStory.philosophy}
              </p>
            </div>

            <div className="animate-hero-enter-delay-1 lg:col-span-5">
              <SpotlightCard
                accent="gold"
                className="surface-glass flex flex-col items-start rounded-2xl border border-rule-strong p-8 text-left text-ink shadow-[0_28px_64px_-24px_rgba(0,0,0,0.85)] sm:p-10"
              >
                <BrandLogo size="hero" priority />
                <h2 className="mt-6 font-display text-2xl font-bold tracking-tight text-ink">
                  {siteConfig.legalName}
                </h2>
                <p className="mt-1.5 text-xs font-bold tracking-widest uppercase text-gold">
                  {siteConfig.tagline}
                </p>
                <p className="mt-2 text-sm text-slate">
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </p>

                <div className="mt-6 flex w-full items-center justify-between gap-3 border-t border-rule pt-6">
                  <span className="text-xs font-bold tracking-widest uppercase text-muted">
                    Social
                  </span>
                  <SocialLogoButtons size="md" />
                </div>
              </SpotlightCard>
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-surface/55 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-gold">
              Operating Principles
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              How Zeltrio Approaches Every Client Engagement
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {companyPrinciples.map((principle, idx) => (
              <RevealOnScroll key={principle.number} delayMs={idx * 80}>
                <SpotlightCard
                  accent={idx % 2 === 0 ? "cobalt" : "gold"}
                  className="h-full rounded-2xl border border-rule-strong bg-card/90 p-7 backdrop-blur-md transition-colors duration-300 hover:border-gold/50 sm:p-8"
                >
                  <article>
                    <span className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                      Principle {principle.number}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-base leading-relaxed text-slate">
                      {principle.description}
                    </p>
                  </article>
                </SpotlightCard>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}
