import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGridSection } from "@/components/home/ServicesGridSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { StandardsSection } from "@/components/home/StandardsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export const metadata: Metadata = buildPageMetadata({
  title: "Zeltrio Digital Service for Websites, SEO, Marketing, and Automation",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "digital agency",
    "website development agency",
    "SEO services",
    "digital marketing agency",
    "WhatsApp business automation",
  ],
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesGridSection />
      <MethodologySection />
      <StandardsSection />
      <CallToActionSection />
    </>
  );
}

