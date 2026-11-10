import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.legalName,
    short_name: siteConfig.brandName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f7f6f2",
    theme_color: "#154380",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}

