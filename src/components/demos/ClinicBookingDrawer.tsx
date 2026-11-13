"use client";

import { useState, type FormEvent } from "react";
import { clinicData, clinicTreatments } from "@/data/clinic-demo";

interface ClinicBookingDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTreatmentId?: string;
}

export function ClinicBookingDrawer({
  isOpen,
  onClose,
  selectedTreatmentId = "single-sitting-rct",
}: ClinicBookingDrawerProps) {
  const [treatmentId, setTreatmentId] = useState(selectedTreatmentId);
  const [patientName, setPatientName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("Morning (10:00 AM – 1:00 PM)");
  const [selectedDate, setSelectedDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [isConfirmedOnline, setIsConfirmedOnline] = useState(false);
  const [tokenNumber, setTokenNumber] = useState("");

  if (!isOpen) {
    return null;
  }

  const currentTreatment =
    clinicTreatments.find((t) => t.id === treatmentId) || clinicTreatments[0];

  const handleWhatsAppConfirm = () => {
    const message = [
      `Hello Aura Dental & Facial Aesthetics!`,
      ``,
      `I would like to book a dental appointment:`,
      `• Patient Name: ${patientName || "Patient"}`,
      `• Treatment Interest: ${currentTreatment.name}`,
      `• Preferred Date: ${selectedDate}`,
      `• Preferred Slot: ${selectedSlot}`,
      `• Mobile Number: ${mobileNumber || "Shared in chat"}`,
      ``,
      `Please let me know doctor availability. Thank you!`,
    ].join("\n");

    const waUrl = `https://wa.me/${clinicData.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  const handleOnlineConfirm = (e: FormEvent) => {
    e.preventDefault();
    const randomToken = `AURA-JH-${Math.floor(1000 + Math.random() * 9000)}`;
    setTokenNumber(randomToken);
    setIsConfirmedOnline(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-drawer-title"
      className="fixed inset-0 z-50 flex items-center justify-end bg-canvas/80 p-0 sm:p-4 backdrop-blur-md animate-hero-enter"
    >
      <div
        className="fixed inset-0 cursor-pointer"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative flex h-full w-full max-w-xl flex-col justify-between overflow-y-auto border-l border-rule-strong bg-surface p-6 sm:rounded-2xl sm:border sm:p-8 shadow-2xl z-10">
        <div>
          <div className="flex items-center justify-between border-b border-rule pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sage">
                Online Consultation Desk
              </span>
              <h2
                id="booking-drawer-title"
                className="mt-1 font-display text-xl font-bold text-ink sm:text-2xl"
              >
                Schedule Your Priority Visit
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-rule p-2 text-slate hover:border-gold hover:text-ink transition-colors"
              aria-label="Close booking modal"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>

          {isConfirmedOnline ? (
            <div className="animate-slide-enter mt-6 space-y-5 rounded-2xl border border-sage/40 bg-surface-elevated p-6 text-left">
              <div className="inline-flex items-center gap-2 rounded-full border border-sage/40 bg-sage-tint px-3 py-1 text-xs font-bold text-sage">
                <span className="h-2 w-2 rounded-full bg-sage animate-ping" />
                Appointment Request Logged
              </div>

              <h3 className="font-display text-2xl font-bold text-ink">
                Priority Booking Token:{" "}
                <span className="text-gold font-mono">{tokenNumber}</span>
              </h3>

              <div className="space-y-2 border-y border-rule py-4 text-sm text-slate">
                <p>
                  <strong className="text-ink">Patient:</strong> {patientName || "Valued Patient"}
                </p>
                <p>
                  <strong className="text-ink">Treatment:</strong> {currentTreatment.name}
                </p>
                <p>
                  <strong className="text-ink">Slot:</strong> {selectedDate} ({selectedSlot})
                </p>
                <p>
                  <strong className="text-ink">Clinic Location:</strong> {clinicData.address}
                </p>
                <p>
                  <strong className="text-ink">Valet Parking:</strong> {clinicData.valetParking}
                </p>
              </div>

              <p className="text-xs text-muted leading-relaxed">
                Our front desk confirms all online appointments via SMS and WhatsApp within 30 minutes during clinic hours. For immediate emergencies, call{" "}
                <a href={`tel:${clinicData.phone}`} className="text-zeltrio-bright font-bold">
                  {clinicData.phone}
                </a>
                .
              </p>

              <button
                type="button"
                onClick={() => {
                  setIsConfirmedOnline(false);
                  onClose();
                }}
                className="btn-gold w-full py-3 text-sm font-bold"
              >
                Close & Return to Clinic Site
              </button>
            </div>
          ) : (
            <form onSubmit={handleOnlineConfirm} className="mt-6 space-y-5 text-left">
              <div>
                <label
                  htmlFor="clinic-treatment-select"
                  className="block text-xs font-bold uppercase tracking-wider text-muted"
                >
                  Step 1: Select Dental Treatment
                </label>
                <select
                  id="clinic-treatment-select"
                  value={treatmentId}
                  onChange={(e) => setTreatmentId(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-rule-strong bg-surface-elevated px-4 py-3 text-sm text-ink focus:border-gold"
                >
                  {clinicTreatments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} ({t.priceRange})
                    </option>
                  ))}
                  <option value="general-consultation">
                    General Dental Checkup & Routine Digital X-Ray (₹600)
                  </option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="clinic-date"
                    className="block text-xs font-bold uppercase tracking-wider text-muted"
                  >
                    Step 2: Preferred Date
                  </label>
                  <input
                    id="clinic-date"
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-rule-strong bg-surface-elevated px-4 py-3 text-sm text-ink focus:border-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="clinic-slot"
                    className="block text-xs font-bold uppercase tracking-wider text-muted"
                  >
                    Time Slot
                  </label>
                  <select
                    id="clinic-slot"
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-rule-strong bg-surface-elevated px-4 py-3 text-sm text-ink focus:border-gold"
                  >
                    <option value="Morning (10:00 AM – 1:00 PM)">
                      Morning (10:00 AM – 1:00 PM)
                    </option>
                    <option value="Afternoon (2:00 PM – 5:00 PM)">
                      Afternoon (2:00 PM – 5:00 PM)
                    </option>
                    <option value="Evening (5:00 PM – 8:00 PM)">
                      Evening (5:00 PM – 8:00 PM)
                    </option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="patient-name"
                    className="block text-xs font-bold uppercase tracking-wider text-muted"
                  >
                    Step 3: Patient Full Name
                  </label>
                  <input
                    id="patient-name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-rule-strong bg-surface-elevated px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold"
                  />
                </div>

                <div>
                  <label
                    htmlFor="patient-mobile"
                    className="block text-xs font-bold uppercase tracking-wider text-muted"
                  >
                    WhatsApp / Phone Number
                  </label>
                  <input
                    id="patient-mobile"
                    type="tel"
                    required
                    placeholder="e.g. 98765 43210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    className="mt-2 w-full rounded-xl border border-rule-strong bg-surface-elevated px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-gold"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-rule bg-canvas/60 p-4 text-xs leading-relaxed text-slate">
                <div className="flex items-center justify-between text-ink font-semibold">
                  <span>Selected Procedure:</span>
                  <span className="text-gold">{currentTreatment.priceRange}</span>
                </div>
                <p className="mt-1 text-muted">
                  Duration: {currentTreatment.duration} · {currentTreatment.painLevel}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppConfirm}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-[1.01] active:scale-[0.99]"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.277-.1-.478-.15-.679.15-.2.301-.778.978-.954 1.179-.176.2-.351.226-.652.075-.301-.15-1.27-.468-2.42-1.494-.894-.798-1.498-1.784-1.674-2.085-.176-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.301-.502.1-.2.05-.376-.025-.527-.075-.15-.678-1.634-.929-2.238-.244-.588-.493-.508-.678-.518-.175-.01-.376-.01-.577-.01-.2 0-.527.075-.803.376s-1.054 1.029-1.054 2.511c0 1.482 1.079 2.91 1.23 3.111.15.201 2.123 3.242 5.143 4.547.718.311 1.279.497 1.716.636.723.23 1.38.197 1.9.12.58-.087 1.78-.727 2.03-1.43.25-.703.25-1.305.176-1.43-.076-.126-.277-.201-.578-.352zM12 2C6.477 2 2 6.477 2 12c0 1.892.525 3.662 1.437 5.179L2 22l4.982-1.308C8.423 21.528 10.155 22 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2z" />
                  </svg>
                  <span>Confirm via WhatsApp (Instant Reply)</span>
                </button>

                <button
                  type="submit"
                  className="btn-gold flex w-full items-center justify-center py-3.5 text-sm font-bold"
                >
                  Confirm Online (Generate Clinic Token)
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 border-t border-rule pt-4 text-center text-xs text-muted">
          Need immediate assistance? Call{" "}
          <a
            href={`tel:${clinicData.phone}`}
            className="font-bold text-ink underline hover:text-gold"
          >
            {clinicData.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

