import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { InteractiveCursor } from "@/components/ui/InteractiveCursor";
import { ScrollProgressBar } from "@/components/ui/InteractiveMotion";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Zeltrio Digital Services for Websites, SEO, Marketing, and Automation",
    template: "%s by Zeltrio Digital Services",
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
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
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google: "l3KeYklYLlGSNbSSuYnfRrG-_OQEf9vYTOQc0R9zDmY",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title:
      "Zeltrio Digital Services for Websites, SEO, Marketing, and Automation",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Zeltrio Digital Services for Websites, SEO, Marketing, and Automation",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${newsreader.variable}`}
    >
      <body className="flex min-h-dvh flex-col bg-canvas text-ink">
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        <ScrollProgressBar />
        <InteractiveCursor />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-zeltrio focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-canvas"
        >
          Skip to Main Content
        </a>
        <Header />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
