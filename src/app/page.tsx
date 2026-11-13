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
    "Zeltrio Digital Services | Custom Websites, SEO & Automation",
  description:
    "Official site of Zeltrio Digital Services (www.zeltriodigital.online). Fast Next.js websites, search engine optimization, creator platforms, and business automation built for growing firms.",
  path: "/",
  keywords: [
    "Zeltrio",
    "Zeltrio Digital",
    "Zeltrio Digital Services",
    "zeltriodigital.online",
    "www.zeltriodigital.online",
    "website development agency",
    "Next.js web development",
    "SEO services",
    "technical SEO",
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
