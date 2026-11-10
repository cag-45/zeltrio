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

export const siteConfig = {
  brandName: "Zeltrio",
  legalName: "Zeltrio Digital Service",
  taglineParts: ["Create", "Grow", "Go Digital"] as const,
  taglineText: "Create, Grow, Go Digital",
  description:
    "Zeltrio Digital Service is a digital engineering and growth agency specializing in website development, search engine optimization, digital marketing, and business automation for modern companies.",
  url: rawSiteUrl.replace(/\/+$/, ""),
  locale: "en_US",
  contactEmail: process.env.CONTACT_EMAIL || "hello@zeltrio.com",
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
