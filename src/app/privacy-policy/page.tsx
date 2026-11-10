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
    <section className="bg-alabaster py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
          Legal Information
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-muted">
          Effective date November 2026 for {siteConfig.legalName}.
        </p>

        <div className="mt-10 space-y-8 border-t border-rule pt-8 text-base leading-relaxed text-slate">
          <div>
            <h2 className="text-xl font-bold text-ink">
              Information You Submit
            </h2>
            <p className="mt-2">
              When you submit a consultation inquiry on this website, we collect
              your name, business email address, optional organization name,
              selected service interest, timeline preference, and project
              description strictly to respond to your request and prepare a
              relevant proposal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">
              Confidentiality and Data Sharing
            </h2>
            <p className="mt-2">
              {siteConfig.legalName} does not sell, rent, or trade your contact
              details or project briefs with unrelated third parties. Submitted
              information is accessed only by team members evaluating or
              delivering your requested services.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">
              Performance Measurement
            </h2>
            <p className="mt-2">
              We use privacy conscious platform analytics and speed monitoring
              to measure page loading reliability and aggregate visitor patterns
              without collecting invasive personal profiles.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-ink">
              Correction and Deletion Requests
            </h2>
            <p className="mt-2">
              You may request access to, correction of, or removal of any
              consultation data you previously submitted by contacting our
              agency desk through the Contact page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

