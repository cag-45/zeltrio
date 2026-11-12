import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { buildPageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/HeroSection";
import { ServicesGridSection } from "@/components/home/ServicesGridSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { StandardsSection } from "@/components/home/StandardsSection";
import { SampleProjectsSection } from "@/components/home/SampleProjectsSection";
import { CallToActionSection } from "@/components/home/CallToActionSection";

export const metadata: Metadata = buildPageMetadata({
  title:
    "Zeltrio Digital Services for Websites, SEO, Marketing, and Automation",
  description: siteConfig.description,
  path: "/",
  keywords: [
    "digital agency",
    "Zeltrio Digital Services",
    "website development agency",
    "SEO services",
    "digital marketing agency",
    "influencer and creator platform",
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
      <SampleProjectsSection />
      <CallToActionSection />
    </>
  );
}
