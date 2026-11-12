import { servicesData } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { ServicesInteractiveShowcase } from "@/components/home/ServicesInteractiveShowcase";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function ServicesGridSection() {
  return (
    <section
      id="services"
      className="relative bg-surface/55 py-16 backdrop-blur-[2px] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col justify-between gap-6 border-b border-rule pb-10 text-left md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase text-gold">
                Core Web Build + Supporting Layers
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                We Lead With Website Development, Then Layer Search, Content,
                and Automation
              </h2>
            </div>
            <MagneticLink
              href="/services/website-development"
              className="btn-secondary shrink-0 px-5 py-2.5 text-sm"
            >
              Inspect Website Development
            </MagneticLink>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10" delayMs={60}>
          <ServicesInteractiveShowcase services={servicesData} />
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
