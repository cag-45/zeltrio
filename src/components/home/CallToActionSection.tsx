import Link from "next/link";
import { siteConfig } from "@/config/site";
import { BackgroundPhoto } from "@/components/brand/BackgroundPhoto";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

interface CallToActionSectionProps {
  title?: string;
  description?: string;
}

export function CallToActionSection({
  title = "Ready to Accelerate Your Business Growth?",
  description = "Share your business or creator goals with Zeltrio Digital Services and receive a structured project scope, timeline estimate, and recommended technical architecture.",
}: CallToActionSectionProps) {
  return (
    <section className="relative overflow-hidden border-t border-rule bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-2xl border border-zeltrio/20 bg-canvas p-8 text-left shadow-sm sm:p-12">
            <div className="absolute inset-0">
              <BackgroundPhoto
                src={siteConfig.heroBackgroundPath}
                alt="Zeltrio studio collaborators discussing client project timelines"
                className="opacity-12"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/95 to-zeltrio-tint/85"
              />
            </div>

            <div className="relative lg:flex lg:items-center lg:justify-between lg:gap-12">
              <div className="max-w-2xl">
                <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
                  Start Your Project
                </p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                  {title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate">
                  {description}
                </p>
              </div>

              <div className="mt-8 flex shrink-0 flex-wrap items-center gap-3.5 lg:mt-0">
                <Link href="/contact" className="btn-primary px-7 py-3.5 text-sm">
                  Book Consultation
                </Link>
                <Link
                  href="/services"
                  className="btn-secondary px-6 py-3.5 text-sm"
                >
                  Review Services
                </Link>
                {siteConfig.socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary px-5 py-3.5 text-xs uppercase tracking-wider"
                  >
                    {social.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
