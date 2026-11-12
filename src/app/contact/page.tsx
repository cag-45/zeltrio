import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";
import { InquiryForm } from "@/components/contact/InquiryForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export const metadata: Metadata = buildPageMetadata({
  title: "Contact and Project Consultation",
  description:
    "Start a project with Zeltrio Digital Services. Request a consultation for Website Development, SEO Services, Digital Marketing, Influencer Launches, or Business Automation.",
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
    title: "Manual Website & Brief Audit",
    detail:
      "Send your existing URL or launch idea. A real developer reviews page speed, mobile layout, search structure, and inquiry friction.",
  },
  {
    step: "02",
    title: "Plain-English Findings",
    detail:
      "Within one business day, you receive specific takeaways on what is slowing visitors down and which fixes matter most first.",
  },
  {
    step: "03",
    title: "Clear Build Scope (Optional)",
    detail:
      "If you decide to build with Zeltrio, we follow up with a grounded timeline and transparent scope with zero high-pressure sales.",
  },
];

interface ContactPageProps {
  searchParams?: Promise<{ topic?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const isAuditTopic = resolvedParams?.topic === "website-audit";
  const initialServiceInterest = isAuditTopic
    ? "Free Website Audit (Speed, SEO & Conversion)"
    : undefined;

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="relative overflow-hidden border-b border-rule bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="pointer-events-none absolute inset-0">
          <BackgroundPhoto
            src={siteConfig.heroBackgroundPath}
            alt="Zeltrio Digital Services team reviewing client briefs in studio light"
            priority
            className="opacity-14"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-canvas/85 via-canvas/75 to-surface/75"
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
          <p className="animate-hero-enter text-xs font-bold tracking-widest uppercase text-gold">
            Free Website Audit & Project Desk
          </p>
          <h1 className="animate-hero-enter-delay-1 mt-4 max-w-3xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Request a Free Website Audit or Scope a New Build
          </h1>
          <p className="animate-hero-enter-delay-2 mt-6 max-w-2xl text-lg leading-relaxed text-slate">
            Drop your current website URL for a practical teardown, or tell us
            about a new service business site or creator launch you want built
            from scratch. We reply within one business day.
          </p>
        </div>
      </section>

      <section className="relative bg-surface/55 py-16 backdrop-blur-[2px] sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
          <div className="space-y-6 text-left lg:col-span-5">
            <RevealOnScroll>
              <SpotlightCard className="surface-glass rounded-2xl border border-rule-strong p-7">
                <p className="text-xs font-bold tracking-widest uppercase text-gold">
                  What Happens Next
                </p>
                <div className="mt-5 divide-y divide-rule border-t border-rule">
                  {consultationSteps.map((item) => (
                    <div key={item.step} className="py-4">
                      <span className="text-xs font-bold tracking-widest uppercase text-zeltrio-bright">
                        Step {item.step}
                      </span>
                      <h2 className="mt-1 font-display text-base font-bold text-ink">
                        {item.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate">
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </SpotlightCard>
            </RevealOnScroll>

            <RevealOnScroll delayMs={100}>
              <SpotlightCard
                accent="gold"
                className="surface-glass rounded-2xl border border-gold/25 p-7 text-ink"
              >
                <p className="text-xs font-bold tracking-widest uppercase text-gold">
                  Direct Inquiry Channels
                </p>
                <h2 className="mt-2 font-display text-xl font-bold">
                  {siteConfig.legalName}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  Serving businesses and creators from {siteConfig.businessCity}
                  , {siteConfig.businessCountry} and globally through remote
                  delivery.
                </p>

                <div className="mt-5 space-y-2 border-t border-rule pt-5 text-sm">
                  <p className="text-xs font-bold tracking-wider uppercase text-muted">
                    Primary Desk Emails
                  </p>
                  {siteConfig.inquiryEmails.map((email) => (
                    <p key={email}>
                      <a
                        href={`mailto:${email}`}
                        className="wrap-anywhere font-semibold text-zeltrio-bright transition-colors hover:text-gold-bright"
                      >
                        {email}
                      </a>
                    </p>
                  ))}
                </div>

                <div className="mt-6 space-y-4">
                  <a
                    href={siteConfig.inquiryMailtoHref}
                    className="btn-primary w-full px-4 py-3 text-xs uppercase tracking-wider"
                  >
                    Compose Direct Inquiry Email
                  </a>

                  <div className="flex items-center justify-between border-t border-rule pt-4">
                    <span className="text-xs font-bold tracking-widest uppercase text-muted">
                      Social
                    </span>
                    <SocialLogoButtons size="md" />
                  </div>
                </div>
              </SpotlightCard>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7">
            <RevealOnScroll delayMs={80}>
              <InquiryForm
                inquiryEmails={siteConfig.inquiryEmails}
                initialServiceInterest={initialServiceInterest}
              />
            </RevealOnScroll>
          </div>
        </div>
      </section>
    </>
  );
}
