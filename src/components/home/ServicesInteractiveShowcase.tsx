"use client";

import { useState } from "react";
import Link from "next/link";
import type { ServiceDefinition } from "@/types";
import { EditorialImage } from "@/components/brand/EditorialImage";

interface ServicesInteractiveShowcaseProps {
  services: ServiceDefinition[];
}

export function ServicesInteractiveShowcase({
  services,
}: ServicesInteractiveShowcaseProps) {
  const [activeSlug, setActiveSlug] = useState(services[0]?.slug || "");
  const activeService =
    services.find((service) => service.slug === activeSlug) || services[0];

  if (!activeService) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-rule bg-canvas p-5 text-left shadow-sm sm:p-8 lg:p-10">
      <div
        role="tablist"
        aria-label="Interactive Service Explorer"
        className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {services.map((service) => {
          const isSelected = service.slug === activeService.slug;
          return (
            <button
              key={service.slug}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => setActiveSlug(service.slug)}
              className={`flex min-h-[54px] flex-col items-start justify-center rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                isSelected
                  ? "border-zeltrio bg-navy text-canvas shadow-md"
                  : "border-rule bg-surface text-ink hover:border-zeltrio/60 hover:bg-zeltrio-tint/40"
              }`}
            >
              <span
                className={`text-xs font-bold tracking-widest uppercase ${
                  isSelected ? "text-zeltrio-bright" : "text-zeltrio"
                }`}
              >
                Service {service.index}
              </span>
              <span className="mt-1 text-sm font-bold">{service.title}</span>
            </button>
          );
        })}
      </div>

      <div
        key={activeService.slug}
        role="tabpanel"
        className="animate-slide-enter mt-8 grid items-center gap-8 border-t border-rule pt-8 lg:grid-cols-12"
      >
        <div className="lg:col-span-6">
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
            <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
              Practice {activeService.index}
            </span>
            {activeService.badge ? (
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  activeService.badge === "Core Service"
                    ? "bg-sage-tint text-sage"
                    : "bg-zeltrio-tint text-zeltrio"
                }`}
              >
                {activeService.badge}
              </span>
            ) : null}
          </div>

          <h3 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            {activeService.title}
          </h3>

          <p className="text-base leading-relaxed text-slate">
            {activeService.overview}
          </p>

          <div className="grid gap-3 border-t border-rule pt-4 sm:grid-cols-2">
            {activeService.deliverables.map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-rule bg-surface/75 p-3.5"
              >
                <p className="text-sm font-bold text-ink">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href={`/services/${activeService.slug}`}
              className="btn-primary px-6 py-3 text-sm"
            >
              Explore {activeService.title}
            </Link>
            <Link href="/contact" className="btn-secondary px-6 py-3 text-sm">
              Book Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

