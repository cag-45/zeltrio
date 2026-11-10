import { routes, type VercelConfig } from "@vercel/config/v1";

export const config: VercelConfig = {
  framework: "nextjs",
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    routes.cacheControl("/images/(.*)", {
      public: true,
      maxAge: "30 days",
      immutable: true,
    }),
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

