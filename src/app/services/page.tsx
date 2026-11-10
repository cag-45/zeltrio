import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Agency Services",
  description:
    "Explore Website Development, SEO Services, Digital Marketing including Influencer and Creator Launch Journeys, and Business Automation delivered by Zeltrio Digital Service.",
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

      <section className="border-b border-rule bg-canvas py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
            Service Directory
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Four Integrated Practices Designed to Build, Rank, Market, and
            Automate Your Business
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Every engagement can stand alone or combine across disciplines so
            your website, organic search footprint, influencer or brand launch,
            and client follow up systems operate seamlessly together.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
