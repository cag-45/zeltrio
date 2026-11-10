import Link from "next/link";
import { processPhases } from "@/data/process";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export function MethodologySection() {
  return (
    <section className="border-y border-rule bg-canvas py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="flex flex-col justify-between gap-6 pb-12 text-left md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                Working Process
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                Four Disciplined Phases From Initial Audit to Live Growth
              </h2>
            </div>
            <Link
              href="/process"
              className="btn-secondary shrink-0 px-5 py-2.5 text-sm"
            >
              Read Full Delivery Workflow
            </Link>
          </div>
        </RevealOnScroll>

        <div className="grid gap-6 md:grid-cols-2">
          {processPhases.map((phase, index) => (
            <RevealOnScroll key={phase.step} delayMs={index * 80}>
              <div className="group h-full rounded-xl border border-rule bg-surface/65 p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-zeltrio/50 hover:bg-card hover:shadow-md sm:p-8">
                <div className="flex items-center justify-between border-b border-rule pb-4">
                  <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                    Phase {phase.step}
                  </span>
                  <span className="text-xs font-semibold text-muted">
                    {phase.duration}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-ink transition-colors group-hover:text-zeltrio">
                  {phase.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-slate">
                  {phase.summary}
                </p>

                <p className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-muted">
                  <span className="font-bold text-ink">Primary Outcome.</span>{" "}
                  {phase.outcome}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
