import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact and Project Consultation",
  description:
    "Start a project with Zeltrio Digital Service. Request a consultation for website development, SEO services, digital marketing, or business automation.",
  path: "/contact",
  keywords: [
    "contact Zeltrio",
    "website consultation",
    "SEO agency inquiry",
    "business automation quote",
  ],
});

const consultationSteps = [
  {
    step: "01",
    title: "Brief Review",
    detail:
      "We read your goals, review any existing website or social channels, and note technical opportunities.",
  },
  {
    step: "02",
    title: "Scope Call",
    detail:
      "A focused thirty minute conversation to align on deliverables, target timeline, and commercial priorities.",
  },
  {
    step: "03",
    title: "Clear Proposal",
    detail:
      "You receive a straightforward written scope, phased delivery calendar, and transparent pricing.",
  },
];

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="border-b border-rule bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
            Consultation Desk
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Tell us what you are building and where your growth needs momentum
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Whether you require a new corporate website, technical search
            optimization, social media campaign execution, or automated client
            follow up systems, Zeltrio responds within one business day.
          </p>
        </div>
      </section>

      <section className="bg-alabaster py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-rule bg-porcelain p-7">
              <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
                What Happens Next
              </p>
              <div className="mt-5 divide-y divide-rule border-t border-rule">
                {consultationSteps.map((item) => (
                  <div key={item.step} className="py-4">
                    <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                      Step {item.step}
                    </span>
                    <h2 className="mt-1 text-base font-bold text-ink">
                      {item.title}
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-obsidian-soft bg-obsidian p-7 text-porcelain">
              <p className="text-xs font-semibold tracking-widest uppercase text-porcelain/65">
                Direct Channel
              </p>
              <h2 className="mt-2 text-xl font-bold">
                {siteConfig.legalName}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-porcelain/75">
                Serving businesses from {siteConfig.businessCity},{" "}
                {siteConfig.businessCountry} and globally through remote
                delivery.
              </p>
              <div className="mt-6">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center justify-center rounded-md border border-porcelain/30 px-4 py-2.5 text-xs font-semibold tracking-wider uppercase text-porcelain transition-colors hover:border-porcelain"
                >
                  Open Direct Email Client
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

