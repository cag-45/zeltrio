"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import type { ServiceDefinition } from "@/types";
import { EditorialImage } from "@/components/brand/EditorialImage";
import { MagneticLink } from "@/components/ui/MagneticLink";

interface ServicesInteractiveShowcaseProps {
  services: ServiceDefinition[];
}

export function ServicesInteractiveShowcase({
  services,
}: ServicesInteractiveShowcaseProps) {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug || "");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeService =
    services.find((service) => service.slug === activeSlug) || services[0];

  if (!activeService) {
    return null;
  }

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    idx: number
  ) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") {
      return;
    }
    event.preventDefault();
    const delta = event.key === "ArrowRight" ? 1 : -1;
    const nextIdx = (idx + delta + services.length) % services.length;
    setActiveSlug(services[nextIdx].slug);
    tabRefs.current[nextIdx]?.focus();
  };

  return (
    <div className="surface-glass rounded-2xl border border-rule-strong p-5 text-left shadow-[0_24px_56px_-28px_rgba(0,0,0,0.85)] sm:p-8 lg:p-10">
      <div
        role="tablist"
        aria-label="Interactive Service Explorer"
        className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service, idx) => {
          const isSelected = service.slug === activeService.slug;
          return (
            <button
              key={service.slug}
              ref={(el) => {
                tabRefs.current[idx] = el;
              }}
              id={`service-tab-${service.slug}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`service-panel-${service.slug}`}
              tabIndex={isSelected ? 0 : -1}
              onKeyDown={(e) => handleTabKeyDown(e, idx)}
              onClick={() => setActiveSlug(service.slug)}
              className={`group relative flex min-h-[60px] flex-col items-start justify-center overflow-hidden rounded-xl border px-4 py-3 text-left transition-all duration-300 ${
                isSelected
                  ? "border-gold/60 bg-linear-to-br from-surface-elevated to-navy shadow-[0_12px_28px_-14px_rgba(79,142,247,0.5)]"
                  : "border-rule bg-surface/70 text-slate hover:border-zeltrio/45 hover:bg-surface-elevated"
              }`}
            >
              {isSelected ? (
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-zeltrio-bright to-gold"
                />
              ) : null}
              <span
                className={`text-xs font-bold tracking-widest uppercase transition-colors ${
                  isSelected
                    ? "text-gold"
                    : "text-zeltrio-bright group-hover:text-gold"
                }`}
              >
                Service {service.index}
              </span>
              <span
                className={`mt-1 font-display text-sm font-bold transition-colors ${
                  isSelected ? "text-ink" : "text-slate group-hover:text-ink"
                }`}
              >
                {service.title}
              </span>
            </button>
          );
        })}
      </div>

      <div
        id={`service-panel-${activeService.slug}`}
        aria-labelledby={`service-tab-${activeService.slug}`}
        key={activeService.slug}
        role="tabpanel"
        className="animate-slide-enter mt-8 grid items-center gap-8 border-t border-rule pt-8 lg:grid-cols-12"
      >
        <div className="group lg:col-span-6">
          <EditorialImage
            src={activeService.imagePath}
            alt={activeService.imageAlt}
            label={activeService.title}
            index={activeService.index}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div className="space-y-5 lg:col-span-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
              Practice {activeService.index}
            </span>
            {activeService.badge ? (
              <span
                className={`rounded-full border px-3 py-1 text-xs font-semibold ${
                  activeService.badge === "Core Service"
                    ? "border-sage/30 bg-sage-tint text-sage"
                    : "border-gold/30 bg-gold-tint text-gold-bright"
                }`}
              >
                {activeService.badge}
              </span>
            ) : null}
          </div>

          <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {activeService.title}
          </h3>

          <p className="text-base leading-relaxed text-slate">
            {activeService.overview}
          </p>

          <div className="grid gap-3 border-t border-rule pt-4 sm:grid-cols-2">
            {activeService.deliverables.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-rule bg-surface/80 p-3.5 transition-colors duration-200 hover:border-zeltrio/40 hover:bg-surface-elevated"
              >
                <p className="font-display text-sm font-bold text-ink">
                  {item.title}
                </p>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <MagneticLink
              href={`/services/${activeService.slug}`}
              className="btn-gold px-6 py-3 text-sm"
            >
              <span>Explore {activeService.title}</span>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </MagneticLink>
            <MagneticLink
              href="/contact?topic=website-audit"
              className="btn-secondary px-6 py-3 text-sm"
            >
              Free Website Audit
            </MagneticLink>
          </div>
        </div>
      </div>
    </div>
  );
}
