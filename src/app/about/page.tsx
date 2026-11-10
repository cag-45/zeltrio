import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { companyPrinciples, companyStory } from "@/data/company";
import { buildPageMetadata } from "@/lib/seo";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { BrandLogo } from "@/components/brand/BrandLogo";
import { JsonLd } from "@/components/seo/JsonLd";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "About Zeltrio Digital Service",
  description:
    "Learn how Zeltrio Digital Service unites website engineering, search visibility, digital marketing, and business automation under disciplined agency standards.",
  path: "/about",
  keywords: [
    "about Zeltrio",
    "Zeltrio Digital Service",
    "digital agency standards",
  ],
});

export default function AboutPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className="border-b border-rule bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
                About the Agency
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {companyStory.headline}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate">
                {companyStory.introduction}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate">
                {companyStory.philosophy}
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="flex flex-col items-center rounded-2xl border border-obsidian-soft bg-obsidian p-10 text-center text-porcelain">
                <BrandLogo size="hero" priority />
                <h2 className="mt-6 text-2xl font-bold tracking-tight">
                  {siteConfig.legalName}
                </h2>
                <p className="mt-2 text-sm text-porcelain/75">
                  {siteConfig.businessCity}, {siteConfig.businessCountry}
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-5 border-t border-porcelain/15 pt-6 text-xs font-semibold tracking-widest uppercase text-porcelain/70">
                  {siteConfig.taglineParts.map((pillar) => (
                    <span key={pillar}>{pillar}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-alabaster py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
              Operating Principles
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              How Zeltrio approaches every client engagement
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {companyPrinciples.map((principle) => (
              <article
                key={principle.number}
                className="rounded-xl border border-rule bg-porcelain p-7 sm:p-8"
              >
                <span className="text-xs font-semibold tracking-widest uppercase text-muted">
                  Principle {principle.number}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-ink">
                  {principle.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-slate">
                  {principle.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CallToActionSection />
    </>
  );
}

