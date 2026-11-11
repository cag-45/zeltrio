import { siteConfig } from "@/config/site";
import { standardMetrics } from "@/data/company";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export function StandardsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-deep py-16 text-canvas sm:py-24">
      <div className="absolute inset-0">
        <BackgroundPhoto
          src={siteConfig.studioBackgroundPath}
          alt="Zeltrio Digital Services specialists reviewing project architecture together in a studio office"
          className="opacity-22"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/90 via-navy-deep/85 to-navy-deep/95"
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="max-w-2xl text-left">
            <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
              Agency Standards
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-canvas sm:text-4xl">
              Built for Speed, Search Clarity, and Dependable Client Acquisition
            </h2>
          </div>
        </RevealOnScroll>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standardMetrics.map((metric, index) => (
            <RevealOnScroll key={metric.code} delayMs={index * 75}>
              <div className="flex h-full flex-col justify-between rounded-xl border border-navy-border bg-navy-card/90 p-6 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-zeltrio-bright">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-canvas/60">
                    Standard {metric.code}
                  </span>
                  <p className="mt-4 text-xs font-bold tracking-wider uppercase text-zeltrio-bright">
                    {metric.label}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-canvas">
                    {metric.value}
                  </h3>
                </div>
                <p className="mt-4 border-t border-navy-border pt-4 text-sm leading-relaxed text-canvas/80">
                  {metric.detail}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
