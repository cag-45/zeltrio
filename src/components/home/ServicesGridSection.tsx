import Link from "next/link";
import { servicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export function ServicesGridSection() {
  return (
    <section id="services" className="bg-surface py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col justify-between gap-6 border-b border-rule pb-10 text-left md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                Agency Capabilities
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Specialized Digital Services Structured for Real Business Outcomes
              </h2>
            </div>
            <Link
              href="/services"
              className="btn-secondary shrink-0 px-5 py-2.5 text-sm"
            >
              Compare All Service Scopes
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {servicesData.map((service, index) => (
            <RevealOnScroll key={service.slug} delayMs={index * 90}>
              <ServiceCard service={service} priorityImage={index < 2} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
