import { standardMetrics } from "@/data/company";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export function StandardsSection() {
  return (
    <section className="bg-obsidian py-16 text-canvas sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
              <div className="flex h-full flex-col justify-between rounded-xl border border-obsidian-border bg-obsidian-soft p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-zeltrio-bright/60">
                <div>
                  <span className="text-xs font-bold tracking-widest uppercase text-canvas/55">
                    Standard {metric.code}
                  </span>
                  <p className="mt-4 text-xs font-bold tracking-wider uppercase text-zeltrio-bright">
                    {metric.label}
                  </p>
                  <h3 className="mt-2 text-lg font-bold tracking-tight text-canvas">
                    {metric.value}
                  </h3>
                </div>
                <p className="mt-4 border-t border-obsidian-border pt-4 text-sm leading-relaxed text-canvas/75">
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
