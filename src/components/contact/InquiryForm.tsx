"use client";

import { useState, type FormEvent } from "react";
import { servicesData } from "@/data/services";
import { siteConfig } from "@/config/site";
import { validateContactPayload } from "@/lib/validation";
import type { ContactSubmissionPayload } from "@/types";

const timelineOptions = [
  "Immediate Start Within Two Weeks",
  "Planned Launch Within One Month",
  "Longer Project Across One Quarter",
  "Exploratory Scope Consultation",
];

const initialFormState: ContactSubmissionPayload = {
  fullName: "",
  businessEmail: "",
  companyName: "",
  serviceInterest: servicesData[0]?.title || "Website Development",
  projectTimeline: timelineOptions[0],
  projectDetails: "",
};

export function InquiryForm() {
  const [formState, setFormState] =
    useState<ContactSubmissionPayload>(initialFormState);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactSubmissionPayload, string>>
  >({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);
    setIsSuccess(false);

    const validation = validateContactPayload(formState);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setStatusMessage("Please Review the Highlighted Fields Below.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.sanitized),
      });

      const result = (await response.json()) as {
        message?: string;
        errors?: Partial<Record<keyof ContactSubmissionPayload, string>>;
      };

      if (!response.ok) {
        if (result.errors) {
          setFieldErrors(result.errors);
        }
        setStatusMessage(
          result.message || "Unable to Submit Your Inquiry Right Now."
        );
        return;
      }

      setIsSuccess(true);
      setStatusMessage(
        result.message ||
          "Thank You. Your Project Inquiry Has Been Received by Zeltrio Digital Service."
      );
      setFormState(initialFormState);
    } catch {
      setStatusMessage(
        "A Network Error Occurred While Sending Your Request. Please Try Again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-rule bg-card p-6 text-left shadow-sm sm:p-10"
    >
      <div className="border-b border-rule pb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
          Project Brief
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Request a Tailored Proposal
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Inquiries are routed to {siteConfig.inquiryEmails.join(", ")}. Our
          team responds personally within one business day.
        </p>
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-bold text-ink"
          >
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={formState.fullName}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, fullName: e.target.value }))
            }
            placeholder="Enter Your Full Name"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-zeltrio focus:bg-canvas placeholder:text-muted"
          />
          {fieldErrors.fullName ? (
            <p className="mt-1.5 text-xs font-semibold text-zeltrio">
              {fieldErrors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="businessEmail"
            className="block text-sm font-bold text-ink"
          >
            Business Email
          </label>
          <input
            id="businessEmail"
            name="businessEmail"
            type="email"
            required
            value={formState.businessEmail}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                businessEmail: e.target.value,
              }))
            }
            placeholder="Enter Your Email Address"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-zeltrio focus:bg-canvas placeholder:text-muted"
          />
          {fieldErrors.businessEmail ? (
            <p className="mt-1.5 text-xs font-semibold text-zeltrio">
              {fieldErrors.businessEmail}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-bold text-ink"
          >
            Company or Creator Brand
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formState.companyName}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, companyName: e.target.value }))
            }
            placeholder="Enter Company or Creator Name"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-zeltrio focus:bg-canvas placeholder:text-muted"
          />
        </div>

        <div>
          <label
            htmlFor="serviceInterest"
            className="block text-sm font-bold text-ink"
          >
            Primary Service Interest
          </label>
          <select
            id="serviceInterest"
            name="serviceInterest"
            value={formState.serviceInterest}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                serviceInterest: e.target.value,
              }))
            }
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-zeltrio focus:bg-canvas"
          >
            {servicesData.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Influencer and Creator Launch Package">
              Influencer and Creator Launch Package
            </option>
            <option value="Multiple Integrated Services">
              Multiple Integrated Services
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="projectTimeline"
            className="block text-sm font-bold text-ink"
          >
            Preferred Timeline
          </label>
          <select
            id="projectTimeline"
            name="projectTimeline"
            value={formState.projectTimeline}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                projectTimeline: e.target.value,
              }))
            }
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-zeltrio focus:bg-canvas"
          >
            {timelineOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="projectDetails"
            className="block text-sm font-bold text-ink"
          >
            Project Goals and Scope
          </label>
          <textarea
            id="projectDetails"
            name="projectDetails"
            rows={5}
            required
            value={formState.projectDetails}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                projectDetails: e.target.value,
              }))
            }
            placeholder="Describe Your Website, Search Optimization, Influencer Launch, Digital Marketing, or Automation Goals"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-sm text-ink transition-colors focus:border-zeltrio focus:bg-canvas placeholder:text-muted"
          />
          {fieldErrors.projectDetails ? (
            <p className="mt-1.5 text-xs font-semibold text-zeltrio">
              {fieldErrors.projectDetails}
            </p>
          ) : null}
        </div>
      </div>

      {statusMessage ? (
        <div
          role="status"
          className={`mt-6 rounded-md border px-4 py-3 text-sm font-medium ${
            isSuccess
              ? "border-sage/30 bg-sage-tint text-sage"
              : "border-zeltrio/30 bg-zeltrio-tint text-zeltrio"
          }`}
        >
          {statusMessage}
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
        <p className="text-xs font-medium text-muted">
          All Project Inquiries Remain Strictly Confidential.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary px-7 py-3.5 text-sm disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting Inquiry" : "Submit Project Inquiry"}
        </button>
      </div>
    </form>
  );
}
