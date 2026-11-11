import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { processPhases } from "@/data/process";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { JsonLd } from "@/components/seo/JsonLd";
import { CallToActionSection } from "@/components/home/CallToActionSection";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export const metadata: Metadata = buildPageMetadata({
  title: "Our Delivery Process",
  description:
    "How Zeltrio Digital Services plans, designs, engineers, and launches websites, search optimization, digital marketing, creator launches, and business automation.",
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

      <section className="relative overflow-hidden border-b border-rule bg-canvas py-16 sm:py-20">
        <div className="absolute inset-0">
          <BackgroundPhoto
            src={siteConfig.studioBackgroundPath}
            alt="Zeltrio Digital Services team collaborating across strategy and engineering phases"
            priority
            className="opacity-14"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/94 to-surface/85"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
            Execution Framework
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            A Structured Four Phase Process Designed for Clarity and Speed
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            We replace guesswork with transparent weekly milestones. Every
            client and creator knows precisely what is being engineered,
            reviewed, and prepared for launch at each stage.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
          {processPhases.map((phase, idx) => (
            <RevealOnScroll key={phase.step} delayMs={idx * 80}>
              <article className="grid gap-8 rounded-2xl border border-rule bg-card p-7 text-left transition-all duration-300 hover:border-zeltrio/50 hover:shadow-md sm:p-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                    Phase {phase.step}
                  </span>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-muted">
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
                  <p className="text-xs font-bold tracking-widest uppercase text-muted">
                    Key Activities
                  </p>
                  <ul className="mt-4 divide-y divide-rule border-t border-rule">
                    {phase.activities.map((activity) => (
                      <li
                        key={activity}
                        className="py-3.5 text-sm font-medium leading-relaxed text-ink"
                      >
                        {activity}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 rounded-lg border border-zeltrio/20 bg-surface px-5 py-4">
                    <p className="text-xs font-bold tracking-wider uppercase text-zeltrio">
                      Phase Deliverable
                    </p>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink">
                      {phase.outcome}
                    </p>
                  </div>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}
