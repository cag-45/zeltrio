import Link from "next/link";
import { processPhases } from "@/data/process";

export function MethodologySection() {
  return (
    <section className="border-y border-rule bg-stone/65 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 pb-12 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
              Working Process
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Four disciplined phases from initial audit to live growth
            </h2>
          </div>
          <Link
            href="/process"
            className="text-sm font-semibold text-ink underline underline-offset-4 transition-colors hover:text-cobalt"
          >
            Read full delivery workflow
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {processPhases.map((phase) => (
            <div
              key={phase.step}
              className="rounded-xl border border-rule bg-porcelain p-7 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-rule pb-4">
                <span className="text-xs font-semibold tracking-widest uppercase text-cobalt">
                  Phase {phase.step}
                </span>
                <span className="text-xs font-medium text-muted">
                  {phase.duration}
                </span>
              </div>

              <h3 className="mt-5 text-xl font-bold tracking-tight text-ink">
                {phase.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-slate">
                {phase.summary}
              </p>

              <p className="mt-5 border-t border-rule pt-4 text-xs leading-relaxed text-muted">
                <span className="font-semibold text-ink">Primary outcome.</span>{" "}
                {phase.outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
