import type { Metadata, Viewport } from "next";
import { Outfit, DM_Sans, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteConfig } from "@/config/site";
import { buildOrganizationSchema, buildWebsiteSchema } from "@/lib/schema";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { InteractiveCursor } from "@/components/ui/InteractiveCursor";
import { InteractiveCanvasBackground } from "@/components/ui/InteractiveCanvasBackground";
import { ScrollProgressBar } from "@/components/ui/InteractiveMotion";
import { PageTransitionShell } from "@/components/ui/PageTransitionShell";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
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
  themeColor: "#0b0f17",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Zeltrio Digital Services | Custom Websites, SEO & Automation",
    template: "%s | Zeltrio Digital Services",
  },
  description: siteConfig.description,
  applicationName: siteConfig.legalName,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
  alternates: {
    canonical: siteConfig.url,
  },
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ||
      "l3KeYklYLlGSNbSSuYnfRrG-_OQEf9vYTOQc0R9zDmY",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title:
      "Zeltrio Digital Services | Custom Websites, SEO & Automation",
    description: siteConfig.description,
    images: [
      {
        url: `${siteConfig.url}/images/zeltrio-logo.jpg`,
        width: 1200,
        height: 630,
        alt: "Zeltrio Digital Services - Websites, SEO & Automation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Zeltrio Digital Services | Custom Websites, SEO & Automation",
    description: siteConfig.description,
    site: "@zeltrio_agency",
    creator: "@zeltrio_agency",
    images: [`${siteConfig.url}/images/zeltrio-logo.jpg`],
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
      className={`${outfit.variable} ${dmSans.variable} ${newsreader.variable}`}
    >
      <body className="relative flex min-h-dvh flex-col bg-canvas text-ink">
        <JsonLd data={buildOrganizationSchema()} />
        <JsonLd data={buildWebsiteSchema()} />
        <InteractiveCanvasBackground />
        <ScrollProgressBar />
        <InteractiveCursor />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-zeltrio-dark focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Skip to Main Content
        </a>
        <Header />
        <main id="main-content" className="relative z-10 flex-1">
          <PageTransitionShell>{children}</PageTransitionShell>
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
