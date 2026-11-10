import Link from "next/link";
import type { ServiceDefinition } from "@/types";
import { EditorialImage } from "@/components/brand/EditorialImage";

interface ServiceCardProps {
  service: ServiceDefinition;
  priorityImage?: boolean;
}

export function ServiceCard({ service, priorityImage = false }: ServiceCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-rule bg-porcelain transition-colors hover:border-ink/40">
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

      <div className="flex flex-1 flex-col justify-between p-6 sm:p-8">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-muted">
              Service {service.index}
            </span>
            {service.badge ? (
              <span className="rounded-full bg-sage-tint px-3 py-1 text-xs font-semibold text-sage">
                {service.badge}
              </span>
            ) : null}
          </div>

          <h3 className="mt-3 text-2xl font-bold tracking-tight text-ink">
            {service.title}
          </h3>

          <p className="mt-3 text-base leading-relaxed text-slate">
            {service.shortSummary}
          </p>

          <ul className="mt-5 space-y-2 border-t border-rule pt-5">
            {service.deliverables.map((item) => (
              <li key={item.title} className="text-sm font-medium text-ink">
                {item.title}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-7 flex items-center justify-between border-t border-rule pt-5">
          <span className="text-xs font-medium text-muted">
            {service.timeline}
          </span>
          <Link
            href={`/services/${service.slug}`}
            className="text-sm font-semibold text-cobalt underline-offset-4 transition-colors hover:text-cobalt-dark hover:underline"
          >
            View service scope
          </Link>
        </div>
      </div>
    </article>
  );
}

