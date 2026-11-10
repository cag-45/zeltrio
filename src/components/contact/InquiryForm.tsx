"use client";

import { useState, type FormEvent } from "react";
import { servicesData } from "@/data/services";
import { validateContactPayload } from "@/lib/validation";
import type { ContactSubmissionPayload } from "@/types";

const timelineOptions = [
  "Immediate start within two weeks",
  "Planning launch within one month",
  "Longer project across one quarter",
  "Exploratory scope consultation",
];

const initialFormState: ContactSubmissionPayload = {
  fullName: "",
  businessEmail: "",
  companyName: "",
  serviceInterest: servicesData[0]?.title || "Website development",
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
      setStatusMessage("Please review the highlighted fields below.");
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
          result.message || "Unable to submit your inquiry right now."
        );
        return;
      }

      setIsSuccess(true);
      setStatusMessage(
        result.message ||
          "Thank you. Your project inquiry has been recorded by Zeltrio Digital Service."
      );
      setFormState(initialFormState);
    } catch {
      setStatusMessage(
        "A network error occurred while sending your request. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-rule bg-porcelain p-7 sm:p-10"
    >
      <div className="border-b border-rule pb-6">
        <p className="text-xs font-semibold tracking-widest uppercase text-cobalt">
          Project Brief
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Request a tailored proposal
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Provide brief context about your company and priorities. Our team
          reviews every inquiry personally within one business day.
        </p>
      </div>

      <div className="mt-7 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-semibold text-ink"
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
            placeholder="Enter your full name"
            className="mt-2 w-full rounded-md border border-rule bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-muted"
          />
          {fieldErrors.fullName ? (
            <p className="mt-1.5 text-xs font-medium text-cobalt">
              {fieldErrors.fullName}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="businessEmail"
            className="block text-sm font-semibold text-ink"
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
            placeholder="Enter your business email address"
            className="mt-2 w-full rounded-md border border-rule bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-muted"
          />
          {fieldErrors.businessEmail ? (
            <p className="mt-1.5 text-xs font-medium text-cobalt">
              {fieldErrors.businessEmail}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="block text-sm font-semibold text-ink"
          >
            Company or Organization
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            value={formState.companyName}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, companyName: e.target.value }))
            }
            placeholder="Enter your company name"
            className="mt-2 w-full rounded-md border border-rule bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-muted"
          />
        </div>

        <div>
          <label
            htmlFor="serviceInterest"
            className="block text-sm font-semibold text-ink"
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
            className="mt-2 w-full rounded-md border border-rule bg-alabaster px-4 py-3 text-sm text-ink"
          >
            {servicesData.map((service) => (
              <option key={service.slug} value={service.title}>
                {service.title}
              </option>
            ))}
            <option value="Multiple integrated services">
              Multiple integrated services
            </option>
          </select>
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="projectTimeline"
            className="block text-sm font-semibold text-ink"
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
            className="mt-2 w-full rounded-md border border-rule bg-alabaster px-4 py-3 text-sm text-ink"
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
            className="block text-sm font-semibold text-ink"
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
            placeholder="Describe your website, search optimization, digital marketing, or automation goals"
            className="mt-2 w-full rounded-md border border-rule bg-alabaster px-4 py-3 text-sm text-ink placeholder:text-muted"
          />
          {fieldErrors.projectDetails ? (
            <p className="mt-1.5 text-xs font-medium text-cobalt">
              {fieldErrors.projectDetails}
            </p>
          ) : null}
        </div>
      </div>

      {statusMessage ? (
        <div
          role="status"
          className={`mt-6 rounded-md border px-4 py-3 text-sm ${
            isSuccess
              ? "border-sage/30 bg-sage-tint text-sage"
              : "border-cobalt/30 bg-cobalt-tint text-cobalt"
          }`}
        >
          {statusMessage}
        </div>
      ) : null}

      <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-rule pt-6">
        <p className="text-xs text-muted">
          All project inquiries remain strictly confidential.
        </p>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-md bg-cobalt px-6 py-3.5 text-sm font-semibold text-porcelain transition-colors hover:bg-cobalt-dark disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Submitting Inquiry" : "Submit Project Inquiry"}
        </button>
      </div>
    </form>
  );
}

