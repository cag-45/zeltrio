import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    routes.header("/images/(.*)", [
      {
        key: "Cache-Control",
        value: "public, max-age=2592000, immutable",
      },
    ]),
    routes.header("/sitemap.xml", [
      {
        key: "Cache-Control",
        value: "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    ]),
    routes.header("/robots.txt", [
      {
        key: "Cache-Control",
        value: "public, s-maxage=86400, stale-while-revalidate=86400",
      },
    ]),
  ],
};

