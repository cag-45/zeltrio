import Link from "next/link";

interface CallToActionSectionProps {
  title?: string;
  description?: string;
}

export function CallToActionSection({
  title = "Ready to build a faster, higher converting digital presence?",
  description = "Share your business goals with Zeltrio Digital Service and receive a structured project scope, timeline estimate, and recommended architecture.",
}: CallToActionSectionProps) {
  return (
    <section className="border-t border-rule bg-alabaster py-20">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="rounded-2xl border border-rule bg-porcelain p-8 sm:p-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
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
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-cobalt px-6 py-3.5 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark"
            >
              Book Consultation
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center rounded-md border border-rule bg-alabaster px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Review Services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

