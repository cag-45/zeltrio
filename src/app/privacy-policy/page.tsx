import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How Zeltrio Digital Service handles project inquiry information, website analytics, and client confidentiality.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <section className="relative bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-20">
      <div className="mx-auto max-w-4xl px-4 text-left sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-gold">
          Legal Information
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm font-medium text-muted">
          Effective Date November 2026 for {siteConfig.legalName}.
        </p>

        <div className="surface-glass mt-10 space-y-8 rounded-2xl border border-rule-strong p-7 text-base leading-relaxed text-slate sm:p-10">
          <div>
            <h2 className="font-display text-xl font-bold text-ink">
              Information You Submit
            </h2>
            <p className="mt-2">
              When you submit a consultation inquiry on this website, we collect
              your name, business email address, optional organization or
              creator brand name, selected service interest, timeline
              preference, and project description strictly to respond to your
              request and prepare a relevant proposal.
            </p>
          </div>

          <div className="border-t border-rule pt-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Confidentiality and Data Sharing
            </h2>
            <p className="mt-2">
              {siteConfig.legalName} does not sell, rent, or trade your contact
              details or project briefs with unrelated external parties.
              Submitted information is processed solely by our team at{" "}
              {siteConfig.inquiryEmails.join(", ")} to evaluate or deliver your
              requested services.
            </p>
          </div>

          <div className="border-t border-rule pt-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Performance Measurement
            </h2>
            <p className="mt-2">
              We use privacy conscious platform analytics and speed monitoring
              to measure page loading reliability and aggregate visitor patterns
              without collecting invasive personal profiles.
            </p>
          </div>

          <div className="border-t border-rule pt-6">
            <h2 className="font-display text-xl font-bold text-ink">
              Correction and Deletion Requests
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or removal of any
              consultation data you previously submitted by contacting{" "}
              {siteConfig.inquiryEmails.join(", ")}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
