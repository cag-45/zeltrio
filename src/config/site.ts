import type { NavigationItem } from "@/types";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined) ||
  "https://zeltrio.com";

const primaryEmail =
  process.env.CONTACT_EMAIL || "aashraybopparaju15@gmail.com";
const rawCcEmails =
  process.env.CONTACT_CC_EMAIL ||
  "b.rishivarma16@gmail.com,kaushalzz2008@gmail.com";
const ccEmails = rawCcEmails
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);
const ccEmail = ccEmails.join(",");

export const siteConfig = {
  brandName: "Zeltrio",
  legalName: "Zeltrio Digital Service",
  taglineParts: ["Create", "Grow", "Go Digital"] as const,
  taglineText: "Create, Grow, Go Digital",
  description:
    "Zeltrio Digital Service is a digital engineering and growth agency delivering Website Development, SEO Services, Digital Marketing including Influencer and Creator Launch Journeys, and Business Automation.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "en_US",
  contactEmail: primaryEmail,
  ccEmail,
  ccEmails,
  inquiryEmails: [primaryEmail, ...ccEmails] as const,
  inquiryMailtoHref: `mailto:${primaryEmail}?${ccEmail ? `cc=${encodeURIComponent(ccEmail)}&` : ""}subject=${encodeURIComponent("Project Consultation Inquiry for Zeltrio Digital Service")}`,
  businessCity: process.env.NEXT_PUBLIC_BUSINESS_CITY || "Hyderabad",
  businessCountry: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "India",
  logoPath: "/images/zeltrio-logo.jpg",
  primaryNavigation: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Process",
      href: "/process",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ] satisfies NavigationItem[],
  legalNavigation: [
    {
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      label: "Terms of Service",
      href: "/terms-of-service",
    },
  ] satisfies NavigationItem[],
};
