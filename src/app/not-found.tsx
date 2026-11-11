import { MagneticLink } from "@/components/ui/MagneticLink";

export default function NotFound() {
  return (
    <section className="relative bg-canvas/45 py-24 backdrop-blur-[2px] sm:py-32">
      <div className="mx-auto max-w-7xl px-4 text-left sm:px-6 lg:px-8">
        <p className="text-xs font-bold tracking-widest uppercase text-gold">
          Page Not Found
        </p>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
          This Page Is Currently Unavailable
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate">
          The page you requested may have moved or is no longer active. You can
          return to the main Zeltrio overview or browse our four core digital
          services directly.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <MagneticLink href="/" className="btn-gold px-6 py-3 text-sm">
            Return to Home
          </MagneticLink>
          <MagneticLink
            href="/services"
            className="btn-secondary px-6 py-3 text-sm"
          >
            View Services
          </MagneticLink>
        </div>
      </div>
    </section>
  );
}
