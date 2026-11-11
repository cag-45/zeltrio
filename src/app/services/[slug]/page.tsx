import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, servicesData } from "@/data/services";
import { buildPageMetadata } from "@/lib/seo";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  buildServiceSchema,
} from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { EditorialImage } from "@/components/brand/EditorialImage";
import { ServiceDeliverables } from "@/components/services/ServiceDeliverables";
import { ServiceFaqAccordion } from "@/components/services/ServiceFaqAccordion";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { MagneticLink } from "@/components/ui/MagneticLink";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return buildPageMetadata({
      title: "Service Not Found",
      description: "Requested service scope could not be located.",
      path: "/services",
    });
  }

  return buildPageMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/services/${service.slug}`,
    keywords: service.keywords,
    imagePath: service.imagePath,
  });
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const otherServices = servicesData.filter((item) => item.slug !== service.slug);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.title, path: `/services/${service.slug}` },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={buildServiceSchema(service)} />
      <JsonLd data={buildFaqSchema(service.faqs)} />

      <section className="relative border-b border-rule bg-canvas/45 py-14 backdrop-blur-[2px] sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center divide-x divide-rule text-xs font-bold tracking-wider uppercase text-muted"
          >
            <Link href="/" className="pr-3 transition-colors hover:text-gold">
              Home
            </Link>
            <Link
              href="/services"
              className="px-3 transition-colors hover:text-gold"
            >
              Services
            </Link>
            <span className="pl-3 text-zeltrio-bright">{service.title}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="animate-hero-enter lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                  Service {service.index}
                </span>
                {service.badge ? (
                  <span
                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                      service.badge === "Core Service"
                        ? "border-sage/30 bg-sage-tint text-sage"
                        : "border-gold/30 bg-gold-tint text-gold-bright"
                    }`}
                  >
                    {service.badge}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {service.title}
              </h1>

              <p className="mt-4 font-serif text-xl italic leading-snug text-gold sm:text-2xl">
                {service.headline}
              </p>

              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                {service.overview}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-5">
                <MagneticLink
                  href="/contact"
                  className="btn-gold px-6 py-3.5 text-sm"
                >
                  Request Scope and Estimate
                </MagneticLink>
                <span className="rounded-full border border-rule-strong bg-surface-elevated/80 px-4 py-2 text-xs font-semibold text-slate">
                  Delivery Timeline: {service.timeline}
                </span>
              </div>
            </div>

            <div className="animate-hero-enter-delay-1 group lg:col-span-5">
              <EditorialImage
                src={service.imagePath}
                alt={service.imageAlt}
                label={service.title}
                index={service.index}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="relative bg-surface/55 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-4 sm:px-6 lg:px-8">
          <ServiceDeliverables service={service} />
          <RevealOnScroll>
            <ServiceFaqAccordion
              faqs={service.faqs}
              serviceTitle={service.title}
            />
          </RevealOnScroll>
        </div>
      </section>

      <section className="relative border-t border-rule bg-canvas/45 py-16 backdrop-blur-[2px]">
        <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-gold">
            Related Services
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink">
            Continue Exploring Zeltrio Capabilities
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {otherServices.map((other) => (
              <SpotlightCard
                key={other.slug}
                className="group h-full rounded-2xl border border-rule-strong bg-card/85 transition-colors duration-300 hover:border-gold/50"
              >
                <Link
                  href={`/services/${other.slug}`}
                  className="block h-full p-6"
                >
                  <span className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                    Service {other.index}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-bold text-ink transition-colors group-hover:text-gold-bright">
                    {other.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {other.shortSummary}
                  </p>
                </Link>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}
