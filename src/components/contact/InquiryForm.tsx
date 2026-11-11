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

function buildDirectMailtoHref(
  payload: ContactSubmissionPayload,
  toEmail: string,
  ccEmail: string
): string {
  const subject = `Zeltrio Project Inquiry from ${payload.fullName}`;
  const body = [
    `Full Name: ${payload.fullName}`,
    `Business Email: ${payload.businessEmail}`,
    `Company or Brand: ${payload.companyName || "Not Specified"}`,
    `Service Interest: ${payload.serviceInterest}`,
    `Preferred Timeline: ${payload.projectTimeline}`,
    "",
    "Project Goals and Scope:",
    payload.projectDetails,
  ].join("\n");

  const ccQuery = ccEmail ? `&cc=${encodeURIComponent(ccEmail)}` : "";
  return `mailto:${toEmail}?subject=${encodeURIComponent(subject)}${ccQuery}&body=${encodeURIComponent(body)}`;
}

export function InquiryForm() {
  const [formState, setFormState] =
    useState<ContactSubmissionPayload>(initialFormState);
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof ContactSubmissionPayload, string>>
  >({});
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fallbackMailtoHref, setFallbackMailtoHref] = useState<string | null>(
    null
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatusMessage(null);
    setIsSuccess(false);
    setFallbackMailtoHref(null);

    if (honeypot.trim().length > 0) {
      return;
    }

    const validation = validateContactPayload(formState);
    if (!validation.valid) {
      setFieldErrors(validation.errors);
      setStatusMessage("Please Review the Highlighted Fields Below.");
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const apiResponse = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(validation.sanitized),
      });

      const apiResult = (await apiResponse.json()) as {
        message?: string;
        deliveredByServer?: boolean;
        deliveryConfig?: {
          to?: string;
          cc?: string;
        };
        errors?: Partial<Record<keyof ContactSubmissionPayload, string>>;
      };

      const targetToEmail =
        apiResult.deliveryConfig?.to || siteConfig.contactEmail;
      const targetCcEmail =
        apiResult.deliveryConfig?.cc ?? siteConfig.ccEmail;

      if (!apiResponse.ok) {
        if (apiResult.errors) {
          setFieldErrors(apiResult.errors);
        }
        setStatusMessage(
          apiResult.message || "Unable to Submit Your Inquiry Right Now."
        );
        return;
      }

      if (apiResult.deliveredByServer) {
        setIsSuccess(true);
        setStatusMessage(
          apiResult.message ||
          "Thank You. Your Project Inquiry Has Been Saved and Delivered to Zeltrio Digital Services."
        );
        setFormState(initialFormState);
        return;
      }

      const formSubmitResponse = await fetch(
        `https://formsubmit.co/ajax/${encodeURIComponent(targetToEmail)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: validation.sanitized.fullName,
            email: validation.sanitized.businessEmail,
            company: validation.sanitized.companyName || "Not Specified",
            service: validation.sanitized.serviceInterest,
            timeline: validation.sanitized.projectTimeline,
            message: validation.sanitized.projectDetails,
            _subject: `New Zeltrio Project Inquiry From ${validation.sanitized.fullName}`,
            ...(targetCcEmail ? { _cc: targetCcEmail } : {}),
            _replyto: validation.sanitized.businessEmail,
            _template: "table",
            _url: window.location.href,
          }),
        }
      );

      const formSubmitResult = (await formSubmitResponse.json()) as {
        success?: string | boolean;
        message?: string;
      };

      const rawMessage = String(formSubmitResult.message || "");
      const needsActivation = rawMessage.toLowerCase().includes("activation");

      if (needsActivation) {
        setFallbackMailtoHref(
          buildDirectMailtoHref(
            validation.sanitized,
            targetToEmail,
            targetCcEmail
          )
        );
        setStatusMessage(
          `One Time Email Verification Sent to ${targetToEmail}. Please Click the Activation Link in That Email so Future Submissions Deliver Automatically.`
        );
        return;
      }

      const delivered =
        formSubmitResponse.ok &&
        formSubmitResult.success !== "false" &&
        formSubmitResult.success !== false;

      if (!delivered) {
        setFallbackMailtoHref(
          buildDirectMailtoHref(
            validation.sanitized,
            targetToEmail,
            targetCcEmail
          )
        );
        setStatusMessage(
          rawMessage ||
          "Automated Email Relay Could Not Complete. Please Use the Direct Email Button Below."
        );
        return;
      }

      setIsSuccess(true);
      setStatusMessage(
        `Thank You. Your Project Inquiry Has Been Sent to our team and Our Team Will Respond Within One Day.`
      );
      setFormState(initialFormState);
    } catch {
      setFallbackMailtoHref(
        buildDirectMailtoHref(
          validation.sanitized,
          siteConfig.contactEmail,
          siteConfig.ccEmail
        )
      );
      setStatusMessage(
        "Unable to Reach the Automated Delivery Service. Please Use the Direct Email Button Below."
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
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="websiteReference">Leave Empty</label>
        <input
          id="websiteReference"
          name="websiteReference"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="border-b border-rule pb-6">
        <p className="text-xs font-bold tracking-widest uppercase text-zeltrio">
          Project Brief
        </p>
        <h2 className="mt-2 text-2xl font-bold tracking-tight text-ink">
          Request a Tailored Proposal
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate">
          Inquiries are delivered to {siteConfig.inquiryEmails.join(", ")}. Our
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
            autoComplete="name"
            required
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            value={formState.fullName}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, fullName: e.target.value }))
            }
            placeholder="Enter Your Full Name"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-base text-ink transition-colors focus:border-zeltrio focus:bg-canvas sm:text-sm placeholder:text-muted"
          />
          {fieldErrors.fullName ? (
            <p id="fullName-error" className="mt-1.5 text-xs font-semibold text-zeltrio">
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
            autoComplete="email"
            required
            aria-invalid={Boolean(fieldErrors.businessEmail)}
            aria-describedby={
              fieldErrors.businessEmail ? "businessEmail-error" : undefined
            }
            value={formState.businessEmail}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                businessEmail: e.target.value,
              }))
            }
            placeholder="Enter Your Email Address"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-base text-ink transition-colors focus:border-zeltrio focus:bg-canvas sm:text-sm placeholder:text-muted"
          />
          {fieldErrors.businessEmail ? (
            <p
              id="businessEmail-error"
              className="mt-1.5 text-xs font-semibold text-zeltrio"
            >
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
            autoComplete="organization"
            value={formState.companyName}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, companyName: e.target.value }))
            }
            placeholder="Enter Company or Creator Name"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-base text-ink transition-colors focus:border-zeltrio focus:bg-canvas sm:text-sm placeholder:text-muted"
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
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-base text-ink transition-colors focus:border-zeltrio focus:bg-canvas sm:text-sm"
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
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-base text-ink transition-colors focus:border-zeltrio focus:bg-canvas sm:text-sm"
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
            aria-invalid={Boolean(fieldErrors.projectDetails)}
            aria-describedby={
              fieldErrors.projectDetails ? "projectDetails-error" : undefined
            }
            value={formState.projectDetails}
            onChange={(e) =>
              setFormState((prev) => ({
                ...prev,
                projectDetails: e.target.value,
              }))
            }
            placeholder="Describe Your Website, Search Optimization, Influencer Launch, Digital Marketing, or Automation Goals"
            className="mt-2 w-full rounded-md border border-rule bg-surface px-4 py-3 text-base text-ink transition-colors focus:border-zeltrio focus:bg-canvas sm:text-sm placeholder:text-muted"
          />
          {fieldErrors.projectDetails ? (
            <p
              id="projectDetails-error"
              className="mt-1.5 text-xs font-semibold text-zeltrio"
            >
              {fieldErrors.projectDetails}
            </p>
          ) : null}
        </div>
      </div>

      {statusMessage ? (
        <div
          role="status"
          className={`mt-6 rounded-md border px-4 py-3.5 text-sm font-medium ${isSuccess
              ? "border-sage/30 bg-sage-tint text-sage"
              : "border-zeltrio/30 bg-zeltrio-tint text-zeltrio"
            }`}
        >
          <p>{statusMessage}</p>
          {fallbackMailtoHref ? (
            <a
              href={fallbackMailtoHref}
              className="btn-primary mt-3 px-4 py-2 text-xs uppercase tracking-wider"
            >
              Send via Email Application
            </a>
          ) : null}
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
