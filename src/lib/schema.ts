import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { buildAbsoluteUrl } from "@/lib/seo";
import type { ServiceDefinition, ServiceFaqItem } from "@/types";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.legalName,
    alternateName: siteConfig.brandName,
    description: siteConfig.description,
    url: siteConfig.url,
    logo: buildAbsoluteUrl(siteConfig.logoPath),
    image: buildAbsoluteUrl(siteConfig.logoPath),
    email: siteConfig.contactEmail,
    sameAs: siteConfig.socialLinks.map((social) => social.href),
    contactPoint: siteConfig.inquiryEmails.map((email) => ({
      "@type": "ContactPoint",
      contactType: "customer service",
      email,
    })),
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.businessCity,
      addressCountry: siteConfig.businessCountry,
    },
    areaServed: "Worldwide",
    knowsAbout: servicesData.map((service) => service.title),
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
    },
  };
}

export function buildServiceSchema(service: ServiceDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.overview,
    serviceType: service.title,
    url: buildAbsoluteUrl(`/services/${service.slug}`),
    image: buildAbsoluteUrl(service.imagePath),
    provider: {
      "@type": "ProfessionalService",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
  };
}

export function buildFaqSchema(faqs: ServiceFaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: buildAbsoluteUrl(item.path),
    })),
  };
}
