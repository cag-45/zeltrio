"use client";

import { useState } from "react";
import { clinicTreatments, type ClinicTreatment } from "@/data/clinic-demo";

interface ClinicTreatmentEstimatorProps {
  onSelectTreatmentForBooking: (treatmentId: string) => void;
}

export function ClinicTreatmentEstimator({
  onSelectTreatmentForBooking,
}: ClinicTreatmentEstimatorProps) {
  const [selectedId, setSelectedId] = useState(clinicTreatments[0]?.id || "");

  const activeTreatment: ClinicTreatment =
    clinicTreatments.find((t) => t.id === selectedId) || clinicTreatments[0];

  return (
    <section id="treatment-estimator" className="relative py-12 sm:py-16">
      <div className="rounded-3xl border border-rule-strong bg-linear-to-b from-surface via-surface-elevated/70 to-surface p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col justify-between gap-4 border-b border-rule pb-8 text-left md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage-tint px-3 py-1 text-xs font-bold uppercase tracking-wider text-sage">
              <span className="h-1.5 w-1.5 rounded-full bg-sage" />
              Interactive Treatment Fee Guide
            </span>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Transparent Pricing & Duration Calculator
            </h2>
            <p className="mt-2 text-sm text-slate">
              No hidden fees, no surprise diagnostic charges. Compare treatment timelines and cost ranges before your visit.
            </p>
          </div>
          <span className="text-xs font-semibold text-muted">
            Updated November 2026 · Standardized Clinical Tariff
          </span>
        </div>

        {/* Treatment Tabs */}
        <div className="mt-8 flex flex-wrap gap-2 sm:gap-2.5">
          {clinicTreatments.map((treatment) => {
            const isSelected = treatment.id === activeTreatment.id;
            return (
              <button
                key={treatment.id}
                type="button"
                onClick={() => setSelectedId(treatment.id)}
                className={`rounded-xl border px-4 py-2.5 text-xs font-bold transition-all duration-200 ${
                  isSelected
                    ? "border-gold bg-gold text-canvas shadow-[0_10px_20px_-8px_rgba(224,172,88,0.6)]"
                    : "border-rule bg-surface text-slate hover:border-gold/50 hover:text-ink"
                }`}
              >
                {treatment.name}
              </button>
            );
          })}
        </div>

        {/* Dynamic Detail Card */}
        <div className="animate-slide-enter mt-8 grid gap-8 rounded-2xl border border-rule bg-canvas/60 p-6 sm:p-8 lg:grid-cols-12 text-left">
          <div className="space-y-5 lg:col-span-7">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-full border border-zeltrio-bright/40 bg-zeltrio-tint px-3 py-1 text-xs font-bold uppercase tracking-wide text-zeltrio-bright">
                {activeTreatment.category} Dentistry
              </span>
              <span className="rounded-full border border-sage/40 bg-sage-tint px-3 py-1 text-xs font-semibold text-sage">
                {activeTreatment.painLevel}
              </span>
            </div>

            <div>
              <h3 className="font-display text-2xl font-bold text-ink sm:text-3xl">
                {activeTreatment.name}
              </h3>
              <p className="mt-2 text-sm italic text-gold font-serif">
                {activeTreatment.tagline}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-slate sm:text-base">
                {activeTreatment.overview}
              </p>
            </div>

            <div className="border-t border-rule pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-muted">
                What is Included in This Fee
              </p>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {activeTreatment.included.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs font-medium text-slate sm:text-sm"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4ade9b"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-gold/30 bg-surface-elevated/90 p-6 lg:col-span-5">
            <div className="space-y-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold">
                Tariff Breakdown
              </span>
              <div className="border-b border-rule pb-4">
                <p className="text-xs text-muted">Estimated Cost Range</p>
                <p className="font-display text-2xl sm:text-3xl font-extrabold text-ink">
                  {activeTreatment.priceRange}
                </p>
                <p className="text-[11px] text-slate mt-1">
                  0% EMI available on debit/credit cards
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-rule bg-canvas/70 p-3">
                  <p className="font-semibold text-muted">Duration</p>
                  <p className="mt-1 font-bold text-ink">{activeTreatment.duration}</p>
                </div>
                <div className="rounded-xl border border-rule bg-canvas/70 p-3">
                  <p className="font-semibold text-muted">Sittings</p>
                  <p className="mt-1 font-bold text-ink">{activeTreatment.sittings}</p>
                </div>
              </div>

              <div className="rounded-xl border border-rule bg-canvas/50 p-3 text-xs leading-relaxed text-slate">
                <strong className="text-ink">Recommended For:</strong>{" "}
                {activeTreatment.recommendedFor}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-rule">
              <button
                type="button"
                onClick={() => onSelectTreatmentForBooking(activeTreatment.id)}
                className="btn-gold flex w-full items-center justify-center gap-2 py-3.5 text-xs font-bold uppercase tracking-wider"
              >
                <span>Book This Treatment</span>
                <svg
                  width="14"
                  height="14"
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
        </div>
      </div>
    </section>
  );
}

