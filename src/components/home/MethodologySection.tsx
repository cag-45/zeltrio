import { processPhases } from "@/data/process";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticLink } from "@/components/ui/MagneticLink";

export function MethodologySection() {
  return (
    <section className="relative border-y border-rule bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col justify-between gap-6 pb-12 text-left md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase text-gold">
                Working Process
              </p>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Four Disciplined Phases From Initial Audit to Live Growth
              </h2>
            </div>
            <MagneticLink
              href="/process"
              className="btn-secondary shrink-0 px-5 py-2.5 text-sm"
            >
              Read Full Delivery Workflow
            </MagneticLink>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          {processPhases.map((phase, index) => (
            <RevealOnScroll key={phase.step} delayMs={index * 80}>
              <SpotlightCard
                accent={index % 2 === 0 ? "cobalt" : "gold"}
                className="group h-full rounded-2xl border border-rule-strong bg-card/85 p-7 text-left backdrop-blur-md transition-colors duration-300 hover:border-gold/45 sm:p-8"
              >
                <div className="flex items-center justify-between border-b border-rule pb-4">
                  <span className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                    <span className="h-1.5 w-1.5 rounded-full bg-zeltrio-bright" />
                    Phase {phase.step}
                  </span>
                  <span className="rounded-full border border-gold/25 bg-gold-tint px-3 py-0.5 text-xs font-semibold text-gold-bright">
                    {phase.duration}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-gold-bright">
                  {phase.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {phase.summary}
                </p>

                <p className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-slate">
                  <span className="font-bold text-gold">Primary Outcome: </span>
                  {phase.outcome}
                </p>
              </SpotlightCard>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
