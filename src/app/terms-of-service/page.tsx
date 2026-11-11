import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Service",
  description:
    "General terms governing website usage, project proposals, and digital agency engagements with Zeltrio Digital Service.",
  path: "/terms-of-service",
});

export default function TermsOfServicePage() {
  return (
    <section className="relative bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-left sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-gold">
          Legal Information
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm font-medium text-muted">
          Effective Date November 2026 for {siteConfig.legalName}.
        </p>

        <div className="surface-glass mt-10 space-y-8 rounded-2xl border border-rule-strong p-7 text-base leading-relaxed text-slate sm:p-10">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Scope of Website Information
            </h2>
            <p className="mt-2">
              All service descriptions, timelines, and deliverables published on
              this website represent general capability overviews. Specific
              project commitments, deliverables, milestones, and fees are
              confirmed exclusively through written client proposals approved by
              both parties.
            </p>
          </div>

          <div className="border-t border-rule pt-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Intellectual Property
            </h2>
            <p className="mt-2">
              Upon full settlement of agreed project invoices, clients receive
              full ownership and repository transfer of custom website code,
              graphic deliverables, and documented automation workflows created
              specifically for their engagement, excluding pre existing
              licensed software libraries.
            </p>
          </div>

          <div className="border-t border-rule pt-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Client Cooperation and Timelines
            </h2>
            <p className="mt-2">
              Estimated delivery durations depend on timely feedback, access to
              domain or advertising accounts, and verification materials
              provided by the client organization or creator.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
