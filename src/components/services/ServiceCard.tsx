import Link from "next/link";
import type { ServiceDefinition } from "@/types";
import { EditorialImage } from "@/components/brand/EditorialImage";

interface ServiceCardProps {
  service: ServiceDefinition;
  priorityImage?: boolean;
}

export function ServiceCard({
  service,
  priorityImage = false,
}: ServiceCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-rule bg-card transition-all duration-300 hover:-translate-y-1 hover:border-zeltrio/60 hover:shadow-[0_18px_36px_-18px_rgba(0,87,255,0.28)]">
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
            <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
              Service {service.index}
            </span>
            {service.badge ? (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${service.badge === "Core Service"
                    ? "bg-sage-tint text-sage"
                    : "bg-zeltrio-tint text-zeltrio"
                  }`}
              >
                {service.badge}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink transition-colors group-hover:text-zeltrio">
            {service.title}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-slate">
            {service.shortSummary}
          </p>

          <ul className="mt-5 space-y-2.5 border-t border-rule pt-5">
            {service.deliverables.map((item) => (
              <li
                key={item.title}
                className="flex items-start gap-2.5 text-sm font-semibold text-ink"
              >
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zeltrio"
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
            className="inline-flex items-center rounded-md border border-rule bg-surface px-4 py-2 text-xs font-semibold uppercase tracking-wider text-zeltrio transition-all duration-200 hover:border-zeltrio hover:bg-zeltrio hover:text-canvas"
          >
            View Service Scope
          </Link>
        </div>
      </div>
    </article>
  );
}
