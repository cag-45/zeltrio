import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { buildAbsoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const corePages: MetadataRoute.Sitemap = [
    {
      url: buildAbsoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
      images: [buildAbsoluteUrl(siteConfig.logoPath)],
    },
    {
      url: buildAbsoluteUrl("/services"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
      images: servicesData.map((service) =>
        buildAbsoluteUrl(service.imagePath)
      ),
    },
    {
      url: buildAbsoluteUrl("/process"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: buildAbsoluteUrl("/about"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: buildAbsoluteUrl("/contact"),
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl("/privacy-policy"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: buildAbsoluteUrl("/terms-of-service"),
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = servicesData.map((service) => ({
    url: buildAbsoluteUrl(`/services/${service.slug}`),
    lastModified,
    changeFrequency: "weekly",
    priority: 0.9,
    images: [buildAbsoluteUrl(service.imagePath)],
  }));

  return [...corePages, ...servicePages];
}

