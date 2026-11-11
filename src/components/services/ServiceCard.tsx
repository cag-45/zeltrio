import Link from "next/link";
import type { ServiceDefinition } from "@/types";
import { EditorialImage } from "@/components/brand/EditorialImage";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

interface ServiceCardProps {
  service: ServiceDefinition;
  priorityImage?: boolean;
}

export function ServiceCard({
  service,
  priorityImage = false,
}: ServiceCardProps) {
  return (
    <SpotlightCard
      accent={service.index === "03" || service.index === "01" ? "gold" : "cobalt"}
      className="group h-full rounded-2xl border border-rule-strong bg-card/90 backdrop-blur-md transition-colors duration-300 hover:border-zeltrio/55 hover:shadow-[0_24px_48px_-22px_rgba(79,142,247,0.3)]"
    >
      <article className="flex h-full flex-col overflow-hidden">
        <div className="p-5 pb-0">
          <EditorialImage
            src={service.imagePath}
            alt={service.imageAlt}
            label={service.title}
            index={service.index}
            priority={priorityImage}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6 text-left sm:p-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
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

            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-gold-bright">
              {service.title}
            </h3>

            <p className="mt-3 text-base leading-relaxed text-slate">
              {service.shortSummary}
            </p>

            <ul className="mt-5 space-y-2.5 border-t border-rule pt-5">
              {service.deliverables.map((item) => (
                <li
                  key={item.title}
                  className="flex items-start gap-2.5 text-sm font-medium text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                  />
                  <span>{item.title}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-rule pt-5">
            <span className="text-xs font-semibold text-muted">
              {service.timeline}
            </span>
            <Link
              href={`/services/${service.slug}`}
              className="inline-flex min-h-[40px] items-center gap-2 rounded-lg border border-rule-strong bg-surface-elevated px-4 py-2 text-xs font-bold uppercase tracking-wider text-zeltrio-bright transition-all duration-200 hover:border-gold/60 hover:bg-gold hover:text-canvas"
            >
              <span>View Service Scope</span>
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </article>
    </SpotlightCard>
  );
}
