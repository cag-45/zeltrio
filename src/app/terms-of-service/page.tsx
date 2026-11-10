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
    <section className="bg-canvas py-16 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-left sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
          Legal Information
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm font-medium text-muted">
          Effective Date November 2026 for {siteConfig.legalName}.
        </p>

        <div className="mt-10 space-y-8 border-t border-rule pt-8 text-base leading-relaxed text-slate">
          <div>
            <h2 className="text-xl font-bold text-ink">
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

          <div>
            <h2 className="text-xl font-bold text-ink">
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

          <div>
            <h2 className="text-xl font-bold text-ink">
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
