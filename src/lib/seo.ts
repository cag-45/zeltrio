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
    : undefined;

  return {
    title,
    description,
    keywords: [
      "Zeltrio",
      "Zeltrio Digital Service",
      "Website Development",
      "SEO Services",
      "Digital Marketing",
      "Business Automation",
      ...keywords,
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: siteConfig.legalName,
      locale: siteConfig.locale,
      type: "website",
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImages ? { images: ogImages.map((img) => img.url) } : {}),
    },
  };
}

