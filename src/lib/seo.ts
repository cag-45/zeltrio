import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

interface BuildPageMetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  imagePath?: string;
}

export function buildAbsoluteUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return normalizedPath === "/" ? siteConfig.url : `${siteConfig.url}${normalizedPath}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
  imagePath,
}: BuildPageMetadataInput): Metadata {
  const canonicalUrl = buildAbsoluteUrl(path);
  const ogImages = imagePath
    ? [
        {
          url: buildAbsoluteUrl(imagePath),
          width: 1200,
          height: 630,
          alt: title,
        },
      ]
    : [
        {
          url: buildAbsoluteUrl(siteConfig.logoPath),
          width: 1200,
          height: 630,
          alt: `${siteConfig.legalName} - Websites, SEO & Automation`,
        },
      ];

  return {
    title,
    description,
    keywords: [
      "Zeltrio",
      "Zeltrio Digital",
      "Zeltrio Digital Services",
      "zeltriodigital.online",
      "www.zeltriodigital.online",
      "Website Development",
      "Next.js Website Agency",
      "Custom Web Development",
      "SEO Services",
      "Technical SEO",
      "Local SEO Hyderabad",
      "Digital Marketing",
      "Creator Launch Platform",
      "Business Automation",
      "WhatsApp Lead Routing",
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      type: "website",
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@zeltrio_agency",
      creator: "@zeltrio_agency",
      images: ogImages.map((img) => img.url),
    },
  };
}

