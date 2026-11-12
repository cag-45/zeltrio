import { siteConfig } from "@/config/site";
import { standardMetrics } from "@/data/company";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export function StandardsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep/85 py-16 text-ink sm:py-24">
      <div className="pointer-events-none absolute inset-0">
        <BackgroundPhoto
          src={siteConfig.studioBackgroundPath}
          alt="Zeltrio Digital Services specialists reviewing project architecture together in a studio office"
          className="opacity-16"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-b from-navy-deep/90 via-navy-deep/80 to-canvas/95"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="max-w-2xl text-left">
            <p className="text-xs font-bold tracking-widest uppercase text-gold">
              Measured Engineering Standards
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Verified Pre-Launch Benchmarks Instead of Vague Promises
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standardMetrics.map((metric, index) => (
            <RevealOnScroll key={metric.code} delayMs={index * 75}>
              <SpotlightCard
                accent={index % 2 === 1 ? "gold" : "cobalt"}
                className="flex h-full flex-col justify-between rounded-2xl border border-navy-border bg-navy-card/85 p-6 text-left backdrop-blur-md transition-colors duration-300 hover:border-zeltrio-bright/60"
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-muted">
                      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                      Standard {metric.code}
                    </span>
                    <p className="mt-4 text-xs font-bold tracking-wider uppercase text-zeltrio-bright">
                      {metric.label}
                    </p>
                    <h3 className="mt-2 font-display text-lg font-bold tracking-tight text-ink">
                      {metric.value}
                    </h3>
                  </div>
                  <p className="mt-4 border-t border-rule pt-4 text-sm leading-relaxed text-slate">
                    {metric.detail}
                  </p>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
