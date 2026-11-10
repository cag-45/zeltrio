import Link from "next/link";
import { servicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";

export function ServicesGridSection() {
  return (
    <section id="services" className="bg-alabaster py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 border-b border-rule pb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
              Capabilities
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Specialized digital services structured for real business outcomes
            </h2>
          </div>
          <Link
            href="/services"
            className="text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-cobalt"
          >
            Compare all service scopes
          </Link>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.slug}
              service={service}
              priorityImage={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

