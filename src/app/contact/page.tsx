import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact and Project Consultation",
  description:
    "Start a project with Zeltrio Digital Service. Request a consultation for Website Development, SEO Services, Digital Marketing, Influencer Launches, or Business Automation.",
  path: "/contact",
  keywords: [
    "contact Zeltrio",
    "website consultation",
    "SEO agency inquiry",
    "influencer launch agency",
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

      <section className="border-b border-rule bg-canvas py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
            Consultation Desk
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Tell Us What You Are Building and Where Your Growth Needs Momentum
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Whether you require a new corporate website, technical search
            optimization, launching a new influencer and creator journey with
            Zeltrio in one go, or automated client follow up systems, our team
            responds within one business day.
          </p>
        </div>
      </section>

      <section className="bg-surface py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 text-left lg:col-span-5">
            <RevealOnScroll>
              <div className="rounded-2xl border border-rule bg-card p-7">
                <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                  What Happens Next
                </p>
                <div className="mt-5 divide-y divide-rule border-t border-rule">
                  {consultationSteps.map((item) => (
                    <div key={item.step} className="py-4">
                      <span className="text-xs font-bold tracking-widest uppercase text-zeltrio">
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
            </RevealOnScroll>

            <RevealOnScroll delayMs={100}>
              <div className="rounded-2xl border border-obsidian-border bg-obsidian p-7 text-canvas">
                <p className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                  Direct Inquiry Channels
                </p>
                <h2 className="mt-2 text-xl font-bold">
                  {siteConfig.legalName}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-canvas/75">
                  Serving businesses and creators from {siteConfig.businessCity}
                  , {siteConfig.businessCountry} and globally through remote
                  delivery.
                </p>

                <div className="mt-5 space-y-2 border-t border-obsidian-border pt-5 text-sm">
                  <p className="text-xs font-bold tracking-wider uppercase text-canvas/60">
                    Primary Desk Emails
                  </p>
                  {siteConfig.inquiryEmails.map((email) => (
                    <p key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="break-all font-semibold text-zeltrio-bright transition-colors hover:text-canvas"
                      >
                        {email}
                      </a>
                    </p>
                  ))}
                </div>

                <div className="mt-6">
                  <a
                    href={siteConfig.inquiryMailtoHref}
                    className="btn-primary w-full px-4 py-3 text-xs uppercase tracking-wider"
                  >
                    Compose Direct Inquiry Email
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll delayMs={80}>
              <InquiryForm />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
