import { standardMetrics } from "@/data/company";

export function StandardsSection() {
  return (
    <section className="bg-alabaster py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Agency Standards
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Built for speed, search clarity, and dependable client acquisition
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {standardMetrics.map((metric) => (
            <div
              key={metric.code}
              className="flex flex-col justify-between rounded-xl border border-rule bg-porcelain p-6"
            >
              <div>
                <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                  Standard {metric.code}
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-cobalt">
                  {metric.label}
                </p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-ink">
                  {metric.value}
                </h3>
              </div>
              <p className="mt-4 border-t border-rule pt-4 text-sm leading-relaxed text-slate">
                {metric.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

