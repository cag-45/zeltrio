"use client";

import { useState } from "react";
import { sampleProjectsData } from "@/data/projects";
import { EditorialImage } from "@/components/brand/EditorialImage";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticLink } from "@/components/ui/MagneticLink";

const nicheFilters = [
  "All Builds",
  "Local Service & Clinics",
  "Founder & Creator Brands",
] as const;

type NicheFilter = (typeof nicheFilters)[number];

export function SampleProjectsSection() {
  const [selectedNiche, setSelectedNiche] = useState<NicheFilter>("All Builds");
  const [activeId, setActiveId] = useState(sampleProjectsData[0]?.id || "");

  const visibleProjects =
    selectedNiche === "All Builds"
      ? sampleProjectsData
      : sampleProjectsData.filter((project) => project.niche === selectedNiche);

  const activeProject =
    visibleProjects.find((project) => project.id === activeId) ||
    visibleProjects[0] ||
    sampleProjectsData[0];

  const handleFilterChange = (niche: NicheFilter) => {
    setSelectedNiche(niche);
    const matching =
      niche === "All Builds"
        ? sampleProjectsData
        : sampleProjectsData.filter((project) => project.niche === niche);
    if (matching.length > 0 && !matching.some((p) => p.id === activeId)) {
      setActiveId(matching[0].id);
    }
  };

  if (!activeProject) {
    return null;
  }

  return (
    <section
      id="sample-projects"
      className="relative border-t border-rule bg-surface/55 py-16 backdrop-blur-[2px] sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col justify-between gap-6 border-b border-rule pb-10 text-left lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold-tint px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                <span className="text-xs font-bold tracking-widest uppercase text-gold-bright">
                  Sample Portfolio · Reference Builds
                </span>
              </div>
              <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                How We Architect Websites for Real Conversions
              </h2>
              <p className="mt-3 text-base leading-relaxed text-slate">
                We only publish real client testimonials with direct permission.
                Until those case studies go live, explore four clearly labelled
                reference builds showing our exact structure, code stack, and
                pre-launch lab targets.
              </p>
            </div>

            <div
              role="group"
              aria-label="Filter sample projects by niche"
              className="flex flex-wrap gap-2"
            >
              {nicheFilters.map((niche) => {
                const isActive = selectedNiche === niche;
                return (
                  <button
                    key={niche}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => handleFilterChange(niche)}
                    className={`min-h-[42px] rounded-xl border px-4 py-2 text-xs font-bold tracking-wide transition-all duration-200 ${
                      isActive
                        ? "border-gold/70 bg-gold text-canvas shadow-[0_10px_24px_-12px_rgba(224,172,88,0.65)]"
                        : "border-rule-strong bg-surface-elevated/80 text-slate hover:border-zeltrio-bright/50 hover:text-ink"
                    }`}
                  >
                    {niche}
                  </button>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="mt-10" delayMs={60}>
          <SpotlightCard
            accent="gold"
            className="surface-glass rounded-3xl border border-rule-strong p-5 text-left shadow-[0_28px_64px_-24px_rgba(0,0,0,0.88)] sm:p-8 lg:p-10"
          >
            <div
              key={activeProject.id}
              className="animate-slide-enter grid items-start gap-8 lg:grid-cols-12"
            >
              <div className="space-y-5 lg:col-span-5">
                <EditorialImage
                  src={activeProject.imagePath}
                  alt={activeProject.imageAlt}
                  label={activeProject.niche}
                  index="REF"
                  sizes="(max-width: 1024px) 100vw, 42vw"
                />

                <div className="rounded-2xl border border-rule bg-surface/85 p-5">
                  <p className="text-xs font-bold tracking-widest uppercase text-gold">
                    Sample Build Specs & Lab Targets
                  </p>
                  <dl className="mt-4 grid grid-cols-2 gap-3">
                    {activeProject.measuredSpecs.map((spec) => (
                      <div
                        key={spec.metric}
                        className="rounded-xl border border-rule bg-canvas/70 p-3"
                      >
                        <dt className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                          {spec.metric}
                        </dt>
                        <dd className="mt-1 font-display text-sm font-bold text-ink">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-3 text-xs leading-relaxed text-muted">
                    {activeProject.disclaimer}
                  </p>
                </div>
              </div>

              <div className="space-y-6 lg:col-span-7">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="rounded-full border border-zeltrio-bright/35 bg-zeltrio-tint px-3 py-1 text-xs font-bold tracking-wide text-zeltrio-bright">
                    {activeProject.label}
                  </span>
                  <span className="rounded-full border border-gold/30 bg-gold-tint px-3 py-1 text-xs font-semibold text-gold-bright">
                    {activeProject.niche}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                    {activeProject.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-slate">
                    {activeProject.summary}
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-rule bg-surface/80 p-5">
                    <p className="text-xs font-bold tracking-widest uppercase text-muted">
                      Typical Bottleneck
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-slate">
                      {activeProject.challenge}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-gold/25 bg-linear-to-br from-surface-elevated to-navy/90 p-5">
                    <p className="text-xs font-bold tracking-widest uppercase text-gold">
                      Architectural Approach
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-ink">
                      {activeProject.solution}
                    </p>
                  </div>
                </div>

                <div className="border-t border-rule pt-5">
                  <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                    Included Build Deliverables
                  </p>
                  <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {activeProject.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm font-medium text-ink"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-5">
                  <div className="flex flex-wrap gap-2">
                    {activeProject.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-rule-strong bg-surface-elevated px-2.5 py-1 text-xs font-semibold text-slate"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <MagneticLink
                    href="/contact?topic=website-audit"
                    className="btn-gold px-5 py-2.5 text-xs uppercase tracking-wider"
                  >
                    <span>Request Free Site Audit</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </MagneticLink>
                </div>
              </div>
            </div>
          </SpotlightCard>
        </RevealOnScroll>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {visibleProjects.map((project, index) => {
            const isSelected = project.id === activeProject.id;
            return (
              <RevealOnScroll key={project.id} delayMs={index * 60}>
                <button
                  type="button"
                  onClick={() => setActiveId(project.id)}
                  aria-pressed={isSelected}
                  className={`group flex h-full w-full flex-col justify-between rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isSelected
                      ? "border-gold/70 bg-linear-to-br from-surface-elevated to-navy shadow-[0_18px_38px_-18px_rgba(224,172,88,0.45)]"
                      : "border-rule-strong bg-card/85 hover:border-zeltrio-bright/50 hover:bg-surface-elevated"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={`text-[11px] font-bold tracking-widest uppercase ${
                          isSelected ? "text-gold" : "text-zeltrio-bright"
                        }`}
                      >
                        Sample 0{index + 1}
                      </span>
                      <span className="rounded-full border border-rule-strong bg-surface px-2 py-0.5 text-[10px] font-semibold text-muted">
                        Reference Build
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-base font-bold leading-snug text-ink group-hover:text-gold-bright">
                      {project.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-slate">
                      {project.summary}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-rule pt-3 text-xs font-semibold">
                    <span className="text-muted">{project.niche}</span>
                    <span
                      className={
                        isSelected ? "text-gold" : "text-zeltrio-bright"
                      }
                    >
                      {isSelected ? "Viewing" : "Inspect"}
                    </span>
                  </div>
                </button>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}

