import { siteConfig } from "@/config/site";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { SocialLogoButtons } from "@/components/brand/SocialLogoButtons";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MagneticLink } from "@/components/ui/MagneticLink";

interface CallToActionSectionProps {
  title?: string;
  description?: string;
}

export function CallToActionSection({
  title = "Ready to Accelerate Your Business Growth?",
  description = "Share your business or creator goals with Zeltrio Digital Services and receive a structured project scope, timeline estimate, and recommended technical architecture.",
}: CallToActionSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-rule bg-canvas/45 py-16 backdrop-blur-[2px] sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll direction="scale">
          <SpotlightCard
            accent="gold"
            enableTilt={false}
            className="surface-glass relative overflow-hidden rounded-3xl border border-rule-strong p-8 text-left shadow-[0_28px_64px_-24px_rgba(0,0,0,0.9)] sm:p-12"
          >
            <div className="pointer-events-none absolute inset-0">
              <BackgroundPhoto
                src={siteConfig.heroBackgroundPath}
                alt="Zeltrio studio collaborators discussing client project timelines"
                className="opacity-14"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-r from-surface/95 via-surface/90 to-navy/85"
              />
              <div
                aria-hidden="true"
                className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-gold/14 blur-[90px]"
              />
            </div>

            <div className="relative lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-widest uppercase text-gold">
                  Start Your Project
                </p>
                <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  {description}
                </p>
              </div>

              <div className="mt-8 flex shrink-0 flex-wrap items-center gap-3.5 lg:mt-0">
                <MagneticLink
                  href="/contact"
                  className="btn-gold px-7 py-3.5 text-sm"
                >
                  <span>Book Consultation</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </MagneticLink>
                <MagneticLink
                  href="/services"
                  className="btn-secondary px-6 py-3.5 text-sm"
                >
                  Review Services
                </MagneticLink>
                <SocialLogoButtons size="md" />
              </div>
            </div>
          </SpotlightCard>
        </RevealOnScroll>
      </div>
    </section>
  );
}
