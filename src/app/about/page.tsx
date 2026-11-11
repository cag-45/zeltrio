import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { companyPrinciples, companyStory } from "@/data/company";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { JsonLd } from "@/components/seo/JsonLd";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

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

      <section className="relative overflow-hidden border-b border-rule bg-canvas py-16 sm:py-20">
        <div className="absolute inset-0">
          <BackgroundPhoto
            src={siteConfig.studioBackgroundPath}
            alt="Zeltrio Digital Services specialists collaborating in a studio workspace"
            priority
            className="opacity-14"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/94 to-surface/85"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="animate-hero-enter lg:col-span-7">
              <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                About the Agency
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {companyStory.headline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate">
                {companyStory.introduction}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {companyStory.philosophy}
              </p>
            </div>

            <div className="animate-hero-enter lg:col-span-5">
              <div className="flex flex-col items-start rounded-2xl border border-navy-border bg-navy p-8 text-left text-canvas shadow-lg sm:p-10">
                <BrandLogo size="hero" priority />
                <h2 className="mt-6 text-2xl font-bold tracking-tight">
                  {siteConfig.legalName}
                </h2>
                <p className="mt-1.5 text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                  {siteConfig.tagline}
                </p>
                <p className="mt-2 text-sm text-canvas/80">
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </p>

                <div className="mt-6 flex w-full flex-wrap gap-3 border-t border-navy-border pt-6">
                  {siteConfig.socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-ghost-navy px-4 py-2 text-xs uppercase tracking-wider"
                    >
                      Follow on {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
              Operating Principles
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              How Zeltrio Approaches Every Client Engagement
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {companyPrinciples.map((principle, idx) => (
              <RevealOnScroll key={principle.number} delayMs={idx * 80}>
                <article className="h-full rounded-xl border border-rule bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-zeltrio/50 hover:shadow-md sm:p-8">
                  <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                    Principle {principle.number}
                  </span>
                  <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
                    {principle.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {principle.description}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}
