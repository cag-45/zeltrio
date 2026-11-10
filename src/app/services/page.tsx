import type { Metadata } from "next";
import { servicesData } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { ServiceCard } from "@/components/services/ServiceCard";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Digital Agency Services",
  description:
    "Explore website development, SEO services, digital marketing, and business automation delivered by Zeltrio Digital Service.",
  path: "/services",
  keywords: [
    "website development",
    "SEO optimization",
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

      <section className="border-b border-rule bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Service Directory
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Four integrated practices designed to build, rank, market, and
            automate your business
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Every engagement can stand alone or combine across disciplines so
            your website, organic search footprint, social campaigns, and client
            follow up systems operate seamlessly together.
          </p>
        </div>
      </section>

      <section className="bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {servicesData.map((service, idx) => (
              <ServiceCard
                key={service.slug}
                service={service}
                priorityImage={idx < 2}
              />
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection
        title="Unsure which combination of services fits your current stage?"
        description="Tell us what your organization wants to achieve over the next ninety days and we will recommend a clear phased roadmap."
      />
    </>
  );
}

