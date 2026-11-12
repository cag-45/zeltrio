import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesInteractiveShowcase } from "@/components/home/ServicesInteractiveShowcase";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Agency Services",
  description:
    "Explore Website Development, SEO Services, Digital Marketing including Influencer and Creator Launch Journeys, and Business Automation delivered by Zeltrio Digital Services.",
  path: "/services",
  keywords: [
    "website development",
    "SEO optimization",
    "influencer and creator launch",
    "Instagram management",
    "business automation",
  ],
});

export default function ServicesPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="relative overflow-hidden border-b border-rule bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          <BackgroundPhoto
            src={siteConfig.studioBackgroundPath}
            alt="Zeltrio Digital Services team reviewing design and SEO execution plans"
            priority
            className="opacity-14"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-canvas/85 via-canvas/75 to-surface/75"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <p className="animate-hero-enter text-xs font-bold tracking-widest uppercase text-gold">
            Website-First Service Scope
          </p>
          <h1 className="animate-hero-enter-delay-1 mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Website Development at the Center — With Search, Content, and
            Automation Wired In
          </h1>
          <p className="animate-hero-enter-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Designed for local service businesses and founder-led or creator
            brands. Start with a fast, conversion-focused website—or add our
            supporting SEO, social launch, and automation systems so everything
            works under one roof.
          </p>
        </div>
      </section>

      <section className="relative bg-surface/55 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="mx-auto max-w-7xl space-y-12 px-4 sm:px-6 lg:px-8">
          <RevealOnScroll>
            <ServicesInteractiveShowcase services={servicesData} />
          </RevealOnScroll>

          <div className="grid gap-8 md:grid-cols-2">
            {servicesData.map((service, idx) => (
              <RevealOnScroll key={service.slug} delayMs={idx * 80}>
                <ServiceCard service={service} priorityImage={idx < 2} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection
        title="Unsure Which Combination of Services Fits Your Current Stage?"
        description="Tell us what your company or creator brand wants to achieve over the next ninety days and we will recommend a clear phased roadmap."
      />
    </>
  );
}
