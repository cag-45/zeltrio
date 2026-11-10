import type { Metadata } from "next";
import { processPhases } from "@/data/process";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { JsonLd } from "@/components/seo/JsonLd";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Delivery Process",
  description:
    "How Zeltrio Digital Service plans, designs, engineers, and launches websites, search optimization, digital marketing, and business automation.",
  path: "/process",
  keywords: [
    "agency workflow",
    "website delivery methodology",
    "SEO implementation process",
    "automation integration workflow",
  ],
});

export default function ProcessPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Process", path: "/process" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="border-b border-rule bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Execution Framework
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            A structured four phase process designed for clarity and speed
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            We replace guesswork with transparent weekly milestones. Every
            client knows precisely what is being engineered, reviewed, and
            prepared for launch at each stage.
          </p>
        </div>
      </section>

      <section className="bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl space-y-8 px-6 lg:px-8">
          {processPhases.map((phase) => (
            <article
              key={phase.step}
              className="grid gap-8 rounded-2xl border border-rule bg-porcelain p-7 sm:p-10 lg:grid-cols-12"
            >
              <div className="lg:col-span-5">
                <span className="text-xs font-semibold tracking-widest uppercase text-cobalt">
                  Phase {phase.step}
                </span>
                <p className="mt-2 text-xs font-medium uppercase tracking-wider text-muted">
                  {phase.duration}
                </p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  {phase.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  {phase.summary}
                </p>
              </div>

              <div className="lg:col-span-7 lg:border-l lg:border-rule lg:pl-10">
                <p className="text-xs font-semibold tracking-widest uppercase text-muted">
                  Key Activities
                </p>
                <ul className="mt-4 divide-y divide-rule border-t border-rule">
                  {phase.activities.map((activity) => (
                    <li
                      key={activity}
                      className="py-3.5 text-sm leading-relaxed text-ink"
                    >
                      {activity}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 rounded-lg bg-stone/75 px-5 py-4">
                  <p className="text-xs font-semibold tracking-wider uppercase text-cobalt">
                    Phase Deliverable
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink">
                    {phase.outcome}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}

