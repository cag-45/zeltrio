import type { ServiceDefinition } from "@/types";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface ServiceDeliverablesProps {
  service: ServiceDefinition;
}

export function ServiceDeliverables({ service }: ServiceDeliverablesProps) {
  return (
    <div className="space-y-16 text-left">
      <section>
        <p className="text-xs font-bold tracking-widest uppercase text-gold">
          Included Scope
        </p>
        <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Core Deliverables for {service.title}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {service.deliverables.map((item, idx) => (
            <RevealOnScroll key={item.title} delayMs={idx * 75}>
              <SpotlightCard
                accent={idx % 2 === 0 ? "cobalt" : "gold"}
                className="h-full rounded-2xl border border-rule-strong bg-card/90 p-6 backdrop-blur-md transition-colors duration-300 hover:border-zeltrio/55 sm:p-7"
              >
                <span className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                  Deliverable 0{idx + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-bold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-slate">
                  {item.description}
                </p>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <RevealOnScroll>
          <SpotlightCard className="h-full rounded-2xl border border-rule-strong bg-card/90 p-7 backdrop-blur-md sm:p-8">
            <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
              Client Fit
            </p>
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink">
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
          </SpotlightCard>
        </RevealOnScroll>

        <RevealOnScroll delayMs={100}>
          <SpotlightCard
            accent="gold"
            className="h-full rounded-2xl border border-gold/25 bg-surface-elevated/90 p-7 backdrop-blur-md sm:p-8"
          >
            <p className="text-xs font-bold tracking-widest uppercase text-gold">
              Commercial Impact
            </p>
            <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-ink">
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
          </SpotlightCard>
        </RevealOnScroll>
      </section>
    </div>
  );
}
