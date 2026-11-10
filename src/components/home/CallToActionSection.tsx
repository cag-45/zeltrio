import Link from "next/link";
import { RevealOnScroll } from "@/components/ui/InteractiveMotion";

interface CallToActionSectionProps {
  title?: string;
  description?: string;
}

export function CallToActionSection({
  title = "Ready to Build a Faster, Higher Converting Digital Presence?",
  description = "Share your business or creator goals with Zeltrio Digital Service and receive a structured project scope, timeline estimate, and recommended technical architecture.",
}: CallToActionSectionProps) {
  return (
    <section className="border-t border-rule bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealOnScroll>
          <div className="rounded-2xl border border-zeltrio/20 bg-canvas p-8 text-left shadow-sm sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
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

            <div className="mt-8 flex shrink-0 flex-wrap gap-4 lg:mt-0">
              <Link href="/contact" className="btn-primary px-7 py-3.5 text-sm">
                Book Consultation
              </Link>
              <Link
                href="/services"
                className="btn-secondary px-7 py-3.5 text-sm"
              >
                Review Services
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
