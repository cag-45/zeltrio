import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { buildAbsoluteUrl } from "@/lib/seo";
import type { ServiceDefinition, ServiceFaqItem } from "@/types";

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.legalName,
    alternateName: ["Zeltrio", "Zeltrio Digital", "Zeltrio Agency"],
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      "@id": `${siteConfig.url}/#logo`,
      url: buildAbsoluteUrl(siteConfig.logoPath),
      caption: siteConfig.legalName,
    },
    image: buildAbsoluteUrl(siteConfig.logoPath),
    email: siteConfig.contactEmail,
    sameAs: siteConfig.socialLinks.map((social) => social.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service and project inquiries",
        email: siteConfig.contactEmail,
        availableLanguage: ["English", "Hindi", "Telugu"],
        areaServed: "Worldwide",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.businessCity,
      addressRegion: siteConfig.businessRegion,
      addressCountry: siteConfig.businessCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "17.3850",
      longitude: "78.4867",
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "19:00",
      },
    ],
    areaServed: [
      {
        "@type": "Country",
        name: "India",
      },
      {
        "@type": "AdministrativeArea",
        name: "Worldwide",
      },
    ],
    knowsAbout: [
      "Website Development",
      "Next.js Web Engineering",
      "Search Engine Optimization (SEO)",
      "Technical SEO",
      "Local Search SEO",
      "Digital Marketing",
      "Creator Launch Platform",
      "Instagram Creative Systems",
      "Business Automation",
      "WhatsApp & CRM Lead Routing",
      ...servicesData.map((service) => service.title),
    ],
  };
}

export function buildWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.legalName,
    alternateName: "Zeltrio Digital",
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: "en-US",
  };
}

export function buildServiceSchema(service: ServiceDefinition) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${buildAbsoluteUrl(`/services/${service.slug}`)}/#service`,
    name: service.title,
    description: service.overview,
    serviceType: service.title,
    url: buildAbsoluteUrl(`/services/${service.slug}`),
    image: buildAbsoluteUrl(service.imagePath),
    provider: {
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Deliverables`,
      itemListElement: service.deliverables.map((item, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: item.title,
          description: item.description,
        },
        position: index + 1,
      })),
    },
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
