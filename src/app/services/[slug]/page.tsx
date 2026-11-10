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

      <section className="border-b border-rule bg-alabaster py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center divide-x divide-rule text-xs font-semibold tracking-wider uppercase text-muted"
          >
            <Link href="/" className="pr-3 transition-colors hover:text-ink">
              Home
            </Link>
            <Link
              href="/services"
              className="px-3 transition-colors hover:text-ink"
            >
              Services
            </Link>
            <span className="pl-3 text-cobalt">{service.title}</span>
          </nav>

          <div className="mt-8 grid items-center gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                  Service {service.index}
                </span>
                {service.badge ? (
                  <span className="rounded-full bg-sage-tint px-3 py-1 text-xs font-semibold text-sage">
                    {service.badge}
                  </span>
                ) : null}
              </div>

              <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {service.title}
              </h1>

              <p className="mt-4 font-serif text-xl leading-snug text-cobalt sm:text-2xl">
                {service.headline}
              </p>

              <p className="mt-5 text-base leading-relaxed text-slate sm:text-lg">
                {service.overview}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-md bg-cobalt px-6 py-3.5 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark"
                >
                  Request Scope and Estimate
                </Link>
                <span className="text-sm font-medium text-muted">
                  Typical timeline is {service.timeline.toLowerCase()}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
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

      <section className="bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-16 px-6 lg:px-8">
          <ServiceDeliverables service={service} />
          <ServiceFaqAccordion
            faqs={service.faqs}
            serviceTitle={service.title}
          />
        </div>
      </section>

      <section className="border-t border-rule bg-stone/60 py-16">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Related Services
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
            Continue exploring Zeltrio capabilities
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {otherServices.map((other) => (
              <Link
                key={other.slug}
                href={`/services/${other.slug}`}
                className="rounded-xl border border-rule bg-porcelain p-6 transition-colors hover:border-ink/40"
              >
                <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                  Service {other.index}
                </span>
                <h3 className="mt-2 text-lg font-bold text-ink">
                  {other.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {other.shortSummary}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}
