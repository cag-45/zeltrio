import type { ContactSubmissionPayload } from "@/types";

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactSubmissionPayload, string>>;
  sanitized: ContactSubmissionPayload;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function cleanField(value: unknown, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, maxLength);
}

export function validateContactPayload(
  raw: Partial<Record<keyof ContactSubmissionPayload, unknown>>
): ValidationResult {
  const sanitized: ContactSubmissionPayload = {
    fullName: cleanField(raw.fullName, 120),
    businessEmail: cleanField(raw.businessEmail, 160),
    companyName: cleanField(raw.companyName, 120),
    serviceInterest: cleanField(raw.serviceInterest, 100),
    projectTimeline: cleanField(raw.projectTimeline, 80),
    projectDetails: cleanField(raw.projectDetails, 2400),
  };

  const errors: Partial<Record<keyof ContactSubmissionPayload, string>> = {};

  if (sanitized.fullName.length < 2) {
    errors.fullName = "Please enter your full name.";
  }

  if (!EMAIL_PATTERN.test(sanitized.businessEmail)) {
    errors.businessEmail = "Please provide a valid email address.";
  }

  if (sanitized.serviceInterest.length < 2) {
    errors.serviceInterest = "Please select a primary service area.";
  }

  if (sanitized.projectDetails.length < 15) {
    errors.projectDetails =
      "Please share a brief overview of at least fifteen characters.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    sanitized,
  };
}

