import type { ServiceDefinition } from "@/types";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

interface ServiceDeliverablesProps {
  service: ServiceDefinition;
}

export function ServiceDeliverables({ service }: ServiceDeliverablesProps) {
  return (
    <div className="space-y-16 text-left">
      <section>
        <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
          Included Scope
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Core Deliverables for {service.title}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {service.deliverables.map((item, idx) => (
            <RevealOnScroll key={item.title} delayMs={idx * 75}>
              <div className="h-full rounded-xl border border-rule bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-zeltrio/50 hover:shadow-md sm:p-7">
                <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                  Deliverable 0{idx + 1}
                </span>
                <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <RevealOnScroll>
          <div className="h-full rounded-xl border border-rule bg-card p-7 sm:p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
              Client Fit
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
              Best Suited for These Organizations
            </h3>
            <ul className="mt-5 divide-y divide-rule border-t border-rule">
              {service.idealFor.map((item) => (
                <li
                  key={item}
                  className="py-3.5 text-sm leading-relaxed text-slate"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <div className="h-full rounded-xl border border-zeltrio/20 bg-surface p-7 sm:p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
              Commercial Impact
            </p>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
              Measurable Outcomes After Delivery
            </h3>
            <ul className="mt-5 divide-y divide-rule border-t border-rule">
              {service.outcomes.map((outcome) => (
                <li
                  key={outcome}
                  className="py-3.5 text-sm font-medium leading-relaxed text-ink"
                >
                  {outcome}
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </section>
    </div>
  );
}
