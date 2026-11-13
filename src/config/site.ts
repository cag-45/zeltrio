import type { NavigationItem, SocialLinkItem } from "@/types";

const rawSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : undefined) ||
  "https://www.zeltriodigital.online";

const primaryEmail =
  process.env.CONTACT_EMAIL || "contact@zeltriodigital.online";
const rawCcEmails = process.env.CONTACT_CC_EMAIL || "";
const ccEmails = rawCcEmails
  .split(",")
  .map((email) => email.trim())
  .filter(Boolean);
const ccEmail = ccEmails.join(",");

export const siteConfig = {
  brandName: "Zeltrio",
  legalName: "Zeltrio Digital Services",
  subtitle: "Digital Services",
  tagline: "Accelerate Your Business Growth",
  taglineParts: ["Create", "Grow", "Go Digital"] as const,
  taglineText: "Accelerate Your Business Growth",
  description:
    "Zeltrio Digital Services delivers high-speed Website Development, SEO Services, Digital Marketing, Creator Launch Journeys, and Business Automation engineered to accelerate your business growth.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "en_US",
  contactEmail: primaryEmail,
  ccEmail,
  ccEmails,
  inquiryEmails: (ccEmails.length > 0 ? [primaryEmail, ...ccEmails] : [primaryEmail]) as readonly string[],
  inquiryMailtoHref: `mailto:${primaryEmail}?${ccEmail ? `cc=${encodeURIComponent(ccEmail)}&` : ""}subject=${encodeURIComponent("Project Consultation Inquiry for Zeltrio Digital Services")}`,
  businessCity: process.env.NEXT_PUBLIC_BUSINESS_CITY || "Hyderabad",
  businessRegion: process.env.NEXT_PUBLIC_BUSINESS_REGION || "Telangana",
  businessCountry: process.env.NEXT_PUBLIC_BUSINESS_COUNTRY || "India",
  logoPath: "/images/zeltrio-logo.jpg",
  heroBackgroundPath: "/images/hero-team-working.jpg",
  studioBackgroundPath: "/images/studio-collaboration-bg.jpg",
  socialLinks: [
    {
      name: "Instagram",
      handle: "zeltriodigital_service",
      href: "https://www.instagram.com/zeltriodigital_service?psln=MXJweGpxbTNybGk0Mw==",
      description:
        "Follow our studio projects, creative campaigns, and creator launch highlights on Instagram.",
    },
    {
      name: "X",
      handle: "zeltrio_agency",
      href: "https://x.com/zeltrio_agency",
      description:
        "Read web engineering notes, search insights, and agency updates on X.",
    },
  ] satisfies SocialLinkItem[],
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
