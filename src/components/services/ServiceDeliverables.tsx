import type { ServiceDefinition } from "@/types";

interface ServiceDeliverablesProps {
  service: ServiceDefinition;
}

export function ServiceDeliverables({ service }: ServiceDeliverablesProps) {
  return (
    <div className="space-y-16">
      <section>
        <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
          Included Scope
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          Core deliverables for {service.title.toLowerCase()}
        </h2>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {service.deliverables.map((item, idx) => (
            <div
              key={item.title}
              className="rounded-xl border border-rule bg-porcelain p-6 sm:p-7"
            >
              <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                Deliverable 0{idx + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-rule bg-porcelain p-7 sm:p-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Client Fit
          </p>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
            Best suited for these organizations
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

        <div className="rounded-xl border border-rule bg-stone/70 p-7 sm:p-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Commercial Impact
          </p>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
            Measurable outcomes after delivery
          </h3>
          <ul className="mt-5 divide-y divide-rule border-t border-rule">
            {service.outcomes.map((outcome) => (
              <li
                key={outcome}
                className="py-3.5 text-sm leading-relaxed text-ink"
              >
                {outcome}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}

