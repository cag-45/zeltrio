"use client";

import { useState } from "react";
import Link from "next/link";
import {
  clinicData,
  clinicTreatments,
  clinicDoctors,
  clinicCases,
  clinicReviews,
  clinicFaqs,
} from "@/data/clinic-demo";
import { DemoShowcaseBar } from "@/components/demos/DemoShowcaseBar";
import { ClinicTreatmentEstimator } from "@/components/demos/ClinicTreatmentEstimator";
import { ClinicBookingDrawer } from "@/components/demos/ClinicBookingDrawer";

export default function ClinicDemoPage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingTreatmentId, setBookingTreatmentId] = useState("single-sitting-rct");
  const [activeFaqIndex, setActiveFaqIndex] = useState<number | null>(0);
  const [activeCaseId, setActiveCaseId] = useState(clinicCases[0]?.id || "");

  const handleOpenBooking = (treatmentId?: string) => {
    if (treatmentId) {
      setBookingTreatmentId(treatmentId);
    }
    setIsBookingOpen(true);
  };

  const activeCase =
    clinicCases.find((c) => c.id === activeCaseId) || clinicCases[0];

  return (
    <div className="relative min-h-screen bg-canvas text-ink antialiased selection:bg-gold/30 selection:text-gold-bright">
      {/* 1. Zeltrio Agency Top Floating Showcase Bar */}
      <DemoShowcaseBar />

      {/* 2. Clinic Emergency & Working Hours Topbar */}
      <header className="border-b border-rule bg-navy-deep/90 py-2.5 text-xs text-slate backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-1.5 text-ink">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#e0ac58"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>{clinicData.landmark}</span>
            </span>
            <span className="hidden text-rule md:inline">|</span>
            <span className="hidden text-muted md:inline">
              {clinicData.workingHours.weekdays}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden text-muted sm:inline">
              {clinicData.valetParking}
            </span>
            <a
              href={`tel:${clinicData.phone}`}
              className="font-bold text-gold transition-colors hover:text-gold-bright"
            >
              📞 Hotline: {clinicData.phone}
            </a>
          </div>
        </div>
      </header>

      {/* 3. Clinic Main Navigation */}
      <nav
        aria-label="Clinic Navigation"
        className="sticky top-0 z-40 border-b border-rule bg-canvas/90 backdrop-blur-xl"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          <a href="#clinic-top" className="flex items-center gap-3 text-left">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-surface-elevated font-display text-lg font-black text-gold shadow-md">
              A+
            </div>
            <div>
              <p className="font-display text-base font-bold tracking-tight text-ink sm:text-lg">
                {clinicData.name}
              </p>
              <p className="text-[11px] font-semibold text-muted">
                Jubilee Hills, Road No. 36
              </p>
            </div>
          </a>

          <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider text-slate lg:flex">
            <a href="#treatments" className="hover:text-gold transition-colors">
              Treatments
            </a>
            <a
              href="#treatment-estimator"
              className="hover:text-gold transition-colors"
            >
              Fee Calculator
            </a>
            <a href="#doctors" className="hover:text-gold transition-colors">
              Doctors
            </a>
            <a href="#cases" className="hover:text-gold transition-colors">
              Smile Gallery
            </a>
            <a href="#reviews" className="hover:text-gold transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-gold transition-colors">
              Patient FAQ
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={`https://wa.me/${clinicData.whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-3 py-2 text-xs font-bold text-[#25D366] transition-colors hover:bg-[#25D366] hover:text-white sm:flex"
            >
              <span>WhatsApp Desk</span>
            </a>

            <button
              type="button"
              onClick={() => handleOpenBooking()}
              className="btn-gold px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-md"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      {/* 4. Clinic Hero Section */}
      <section
        id="clinic-top"
        className="relative overflow-hidden border-b border-rule bg-linear-to-b from-navy-deep/60 via-canvas to-surface/40 py-14 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="text-left lg:col-span-7">
              <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-gold/30 bg-gold-tint/40 px-3.5 py-1 text-xs font-bold text-gold-bright">
                <span className="flex text-gold">★★★★★</span>
                <span>{clinicData.googleStats.rating} on Google</span>
                <span className="text-rule-strong">·</span>
                <span className="text-ink">
                  {clinicData.googleStats.totalReviews} Verified Patient Reviews
                </span>
              </div>

              <h1 className="mt-5 font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-5xl lg:text-[3.25rem]">
                Dentistry with Zero Fear, Zero Guesswork, and{" "}
                <span className="font-serif italic font-medium text-gold">
                  Complete Price Transparency.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate sm:text-lg">
                Specialist dental implants, invisible clear aligners, and
                same-day single-sitting root canals. Led by board-certified oral
                surgeons and prosthodontists in Jubilee Hills with computerized
                painless anesthesia.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn-gold px-7 py-3.5 text-sm font-bold shadow-lg hover:scale-[1.02] transition-transform"
                >
                  <span>Book Consultation (₹600)</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="ml-1.5 inline"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>

                <a
                  href="#treatment-estimator"
                  className="btn-secondary px-6 py-3.5 text-sm font-bold"
                >
                  Calculate Treatment Cost
                </a>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 border-t border-rule pt-6 sm:grid-cols-4">
                {clinicData.amenities.slice(0, 4).map((amenity) => (
                  <div key={amenity} className="space-y-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-sage inline-block" />
                    <p className="text-xs font-semibold text-slate leading-tight">
                      {amenity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-rule-strong bg-linear-to-b from-surface-elevated to-surface p-6 sm:p-8 text-left shadow-2xl">
                <div className="flex items-center justify-between border-b border-rule pb-4">
                  <span className="text-xs font-bold uppercase tracking-widest text-gold">
                    Live Clinic Queue
                  </span>
                  <span className="rounded-full bg-sage-tint px-2.5 py-0.5 text-[11px] font-bold text-sage">
                    Slots Open Today
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="rounded-2xl border border-rule bg-canvas/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      Consultation Desk
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-ink">
                      Walk-In & Scheduled Consultations
                    </h3>
                    <p className="mt-1 text-xs text-slate">
                      Comprehensive oral checkup, digital RVG x-rays, and customized treatment planning.
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold">
                      <span className="text-gold">Fee: ₹600 (Adjustable)</span>
                      <span className="text-muted">Wait: ~15 mins</span>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-rule bg-canvas/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted">
                      Same-Day Emergency Service
                    </p>
                    <h3 className="mt-1 font-display text-lg font-bold text-ink">
                      Severe Toothache & Trauma Care
                    </h3>
                    <p className="mt-1 text-xs text-slate">
                      Emergency pain relief, fractured tooth repair, or acute infection drainage.
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs font-bold">
                      <span className="text-sage">24/7 Hotline</span>
                      <a
                        href={`tel:${clinicData.phone}`}
                        className="text-zeltrio-bright hover:underline"
                      >
                        {clinicData.phone}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-2">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking()}
                    className="btn-gold w-full py-3.5 text-xs uppercase tracking-wider font-bold"
                  >
                    Select Slot & Confirm on WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Interactive Treatment Estimator */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ClinicTreatmentEstimator
          onSelectTreatmentForBooking={(treatmentId) => handleOpenBooking(treatmentId)}
        />
      </div>

      {/* 6. Comprehensive Treatments Grid */}
      <section id="treatments" className="border-t border-rule bg-surface/40 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Clinical Specializations
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Precision Dental Care Under One Roof
            </h2>
            <p className="mt-3 text-base text-slate">
              Every procedure is backed by microscopic magnification, digital diagnostic imaging, and post-procedure follow-ups.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {clinicTreatments.map((treatment) => (
              <div
                key={treatment.id}
                className="group flex flex-col justify-between rounded-2xl border border-rule-strong bg-card/90 p-6 text-left transition-all duration-300 hover:border-gold/60 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-zeltrio-bright">
                      {treatment.category}
                    </span>
                    <span className="text-xs font-semibold text-muted">
                      {treatment.duration}
                    </span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold text-ink group-hover:text-gold-bright transition-colors">
                    {treatment.name}
                  </h3>

                  <p className="mt-1 text-xs italic text-gold font-serif">
                    {treatment.tagline}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-slate">
                    {treatment.overview}
                  </p>

                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Key Advantage
                    </p>
                    <p className="mt-1 text-xs text-ink font-medium">
                      {treatment.included[0]}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-rule pt-4">
                  <span className="font-display text-sm font-bold text-ink">
                    {treatment.priceRange}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(treatment.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-gold hover:text-gold-bright transition-colors"
                  >
                    <span>Book</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Doctors & Specialists */}
      <section id="doctors" className="border-t border-rule bg-canvas/70 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-gold">
              Clinical Leadership
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Meet Your Specialist Dental Team
            </h2>
            <p className="mt-3 text-base text-slate">
              No junior general dentists performing complex surgeries. All root canals, surgical extractions, and implants are delivered directly by board-certified specialists.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {clinicDoctors.map((doctor) => (
              <div
                key={doctor.name}
                className="flex flex-col justify-between rounded-2xl border border-rule-strong bg-surface-elevated/80 p-6 text-left shadow-lg"
              >
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold/40 bg-surface font-display text-base font-bold text-gold">
                    {doctor.name.split(" ")[1]?.charAt(0) || "D"}
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-ink">
                    {doctor.name}
                  </h3>
                  <p className="text-xs font-bold text-gold mt-0.5">
                    {doctor.role}
                  </p>
                  <p className="text-xs text-muted font-medium mt-1">
                    {doctor.degrees} · {doctor.experience}
                  </p>
                  <p className="text-[11px] text-slate/80 font-mono mt-1">
                    DCI Reg: {doctor.registrationNumber}
                  </p>

                  <p className="mt-4 text-xs leading-relaxed text-slate">
                    {doctor.bio}
                  </p>

                  <div className="mt-5 border-t border-rule pt-4">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                      Speciality Focus
                    </p>
                    <p className="mt-1 text-xs text-ink font-semibold">
                      {doctor.specialization}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-rule pt-4 text-xs">
                  <p className="text-muted">Available Schedule:</p>
                  <p className="mt-1 font-semibold text-slate">{doctor.schedule}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Interactive Patient Cases & Smile Gallery */}
      <section id="cases" className="border-t border-rule bg-surface/50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-sage">
              Clinical Case Evidence
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Real Patient Outcomes & Treatment Notes
            </h2>
            <p className="mt-3 text-base text-slate">
              Explore documented clinical transformations with transparent timelines and conservative treatment approaches.
            </p>
          </div>

          <div className="mt-10 flex flex-wrap gap-2.5">
            {clinicCases.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCaseId(c.id)}
                className={`rounded-xl border px-4 py-2 text-xs font-bold transition-all ${
                  c.id === activeCase.id
                    ? "border-gold bg-gold text-canvas shadow-md"
                    : "border-rule bg-surface text-slate hover:border-gold/40 hover:text-ink"
                }`}
              >
                Case: {c.treatmentName}
              </button>
            ))}
          </div>

          <div className="animate-slide-enter mt-8 rounded-2xl border border-rule-strong bg-canvas/80 p-6 sm:p-8 text-left shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gold">
                  Patient {activeCase.patientInitials} ({activeCase.age})
                </span>
                <h3 className="mt-1 font-display text-2xl font-bold text-ink">
                  {activeCase.treatmentName}
                </h3>
              </div>
              <div className="flex gap-2">
                <span className="rounded-lg border border-rule bg-surface-elevated px-3 py-1 text-xs font-bold text-slate">
                  Duration: {activeCase.duration}
                </span>
                <span className="rounded-lg border border-rule bg-surface-elevated px-3 py-1 text-xs font-bold text-slate">
                  {activeCase.sittings}
                </span>
              </div>
            </div>

            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="rounded-xl border border-rule bg-surface p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-muted">
                  Presenting Problem
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {activeCase.problem}
                </p>
              </div>

              <div className="rounded-xl border border-rule bg-surface p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gold">
                  Clinical Solution
                </p>
                <p className="mt-2 text-sm leading-relaxed text-slate">
                  {activeCase.clinicalSolution}
                </p>
              </div>

              <div className="rounded-xl border border-sage/35 bg-sage-tint/30 p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-sage">
                  Final Patient Outcome
                </p>
                <p className="mt-2 text-sm leading-relaxed text-ink font-medium">
                  {activeCase.outcome}
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => handleOpenBooking()}
                className="btn-gold px-5 py-2.5 text-xs uppercase tracking-wider font-bold"
              >
                Discuss a Similar Treatment
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Verified Google Patient Reviews */}
      <section id="reviews" className="border-t border-rule bg-canvas/80 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 border-b border-rule pb-8 text-left md:flex-row md:items-end">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Patient Feedback
              </span>
              <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
                What Hyderabad Patients Say About Us
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-gold/40 bg-gold-tint/40 px-3.5 py-1.5 text-xs font-bold text-gold-bright">
                ★ 4.9 Rating ({clinicData.googleStats.totalReviews} Reviews)
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
            {clinicReviews.map((review) => (
              <div
                key={review.id}
                className="flex flex-col justify-between rounded-2xl border border-rule bg-surface p-6 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gold font-bold">★★★★★</span>
                    <span className="text-muted">{review.date}</span>
                  </div>
                  <p className="mt-3 text-xs font-bold text-zeltrio-bright">
                    Treatment: {review.treatment}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-slate italic">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-5 border-t border-rule pt-3 flex items-center justify-between text-xs">
                  <span className="font-bold text-ink">{review.author}</span>
                  <span className="text-sage text-[10px] font-semibold">
                    ✓ Verified Patient
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Patient FAQs */}
      <section id="faq" className="border-t border-rule bg-surface/50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-gold">
            Common Inquiries
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Frequently Asked Patient Questions
          </h2>
          <p className="mt-3 text-sm text-slate">
            Clear clinical answers to help you prepare comfortably for your appointment.
          </p>

          <div className="mt-10 divide-y divide-rule border-y border-rule">
            {clinicFaqs.map((faq, idx) => {
              const isOpen = activeFaqIndex === idx;
              return (
                <div key={faq.question} className="py-4">
                  <button
                    type="button"
                    onClick={() => setActiveFaqIndex(isOpen ? null : idx)}
                    className="flex w-full items-center justify-between text-left text-base font-bold text-ink hover:text-gold transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="text-gold font-mono text-lg">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen ? (
                    <p className="animate-slide-enter mt-3 text-sm leading-relaxed text-slate">
                      {faq.answer}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Clinic Location & Directions */}
      <section className="border-t border-rule bg-navy-deep py-16 text-left">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-6">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">
                Visit Aura Dental
              </span>
              <h2 className="font-display text-3xl font-bold text-ink">
                Easy Accessibility in Jubilee Hills
              </h2>
              <div className="space-y-3 text-sm text-slate">
                <p>
                  <strong className="text-ink">Address:</strong> {clinicData.address}
                </p>
                <p>
                  <strong className="text-ink">Landmark:</strong> {clinicData.landmark}
                </p>
                <p>
                  <strong className="text-ink">Parking:</strong> {clinicData.valetParking}
                </p>
                <p>
                  <strong className="text-ink">Hours:</strong> {clinicData.workingHours.weekdays}
                </p>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={`tel:${clinicData.phone}`}
                  className="btn-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  Call Reception ({clinicData.phone})
                </a>
                <button
                  type="button"
                  onClick={() => handleOpenBooking()}
                  className="btn-secondary px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
                >
                  Schedule Appointment
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-rule bg-surface p-6 lg:col-span-6 flex flex-col justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-sage">
                  Dental Trauma & Emergency Protocol
                </p>
                <h3 className="mt-2 font-display text-xl font-bold text-ink">
                  Emergency Line Active 24 Hours
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-slate">
                  For fractured teeth, bleeding following an accident, or unbearable nighttime infection, our on-call dental surgeon can be reached directly:
                </p>
                <p className="mt-3 text-sm font-bold text-gold">
                  {clinicData.emergencyHotline}
                </p>
              </div>

              <div className="mt-6 border-t border-rule pt-4 text-xs text-muted">
                Hospital registration: TS-MED-JH-2018-842 · Certified by Telangana Dental Council.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Clinic Simple Clean Footer */}
      <footer className="border-t border-rule bg-canvas py-8 text-center text-xs text-muted">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 {clinicData.name}. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-slate font-medium">
              Demo Built by{" "}
              <Link
                href="/"
                className="text-gold font-bold underline hover:text-gold-bright"
              >
                Zeltrio Digital Services
              </Link>
            </span>
          </div>
        </div>
      </footer>

      {/* 13. Floating Mobile Sticky Action Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 flex items-center justify-between gap-3 border-t border-rule bg-surface/95 p-3 backdrop-blur-xl sm:hidden">
        <a
          href={`tel:${clinicData.phone}`}
          className="btn-secondary flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider"
        >
          📞 Call Clinic
        </a>
        <button
          type="button"
          onClick={() => handleOpenBooking()}
          className="btn-gold flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider"
        >
          Book Appointment
        </button>
      </div>

      {/* 14. Interactive Booking Modal/Drawer */}
      <ClinicBookingDrawer
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTreatmentId={bookingTreatmentId}
      />
    </div>
  );
}

