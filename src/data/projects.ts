import type { SampleProject } from "@/types";

export const sampleProjectsData: SampleProject[] = [
  {
    id: "clinic-booking-architecture",
    slug: "clinic-booking-architecture",
    label: "Sample Project · Reference Build",
    niche: "Local Service & Clinics",
    title: "Multi-Treatment Clinic Website & 3-Tap Booking Intake",
    summary:
      "Reference architecture showing how a dental or physiotherapy clinic can replace a slow brochure site with treatment-focused pages, transparent pricing guides, and instant mobile booking.",
    challenge:
      "Many local clinics lose mobile visitors to buried phone numbers, heavy unoptimized stock galleries, and generic contact forms that never get answered outside desk hours.",
    solution:
      "We structured clean treatment landing pages, sticky mobile click-to-call and WhatsApp appointment routing, LocalBusiness JSON-LD schema, and pre-rendered pages so patients reach booking in under three taps.",
    deliverables: [
      "Treatment-specific service pages with FAQ schema",
      "3-tap mobile appointment & WhatsApp intake",
      "LocalBusiness structured data & XML sitemap",
      "Accessible contrast & keyboard-ready navigation",
    ],
    measuredSpecs: [
      { metric: "Lab Performance Target", value: "98 / 100 Lighthouse" },
      { metric: "Mobile Booking Flow", value: "3 Taps to Request" },
      { metric: "Media Delivery", value: "AVIF / WebP Sized" },
      { metric: "Lead Routing", value: "Email + WhatsApp Alert" },
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "JSON-LD"],
    imagePath: "/images/service-website-development.jpg",
    imageAlt:
      "Reference website architecture for a multi-treatment service clinic on desktop and mobile",
    disclaimer:
      "Concept reference build showing our standard architecture and pre-launch lab audit targets — not a fabricated client claim.",
  },
  {
    id: "regional-service-lead-hub",
    slug: "regional-service-lead-hub",
    label: "Sample Project · Reference Build",
    niche: "Local Service & Clinics",
    title: "Regional Service Business Portal & Area Search Structure",
    summary:
      "A conversion-first build designed for home service, advisory, and B2B field teams that rely on steady quote requests across specific cities and neighborhoods.",
    challenge:
      "Service firms often bury all locations on one vague page, miss urgent phone inquiries while teams are on-site, and rank poorly for city-specific service searches.",
    solution:
      "We organize clean service-plus-location hierarchy, clear scope estimators, and an automated inquiry pipeline that logs every request into Google Sheets while alerting the desk immediately.",
    deliverables: [
      "City and service-line SEO landing templates",
      "Structured quote intake with urgency selection",
      "Automated Google Sheets & email alert webhook",
      "Clean Core Web Vitals baseline across templates",
    ],
    measuredSpecs: [
      { metric: "Lab SEO & Best Practices", value: "100 / 100 Checks" },
      { metric: "Service Area Schema", value: "Verified Markup" },
      { metric: "CRM / Sheet Logging", value: "Instant Webhook" },
      { metric: "Form Accessibility", value: "WCAG AA Labels" },
    ],
    stack: ["Next.js", "App Router API", "Google Sheets Webhook", "SEO Schema"],
    imagePath: "/images/service-seo-services.jpg",
    imageAlt:
      "Reference architecture showing regional search optimization and structured service inquiry routing",
    disclaimer:
      "Concept reference build demonstrating our technical SEO and lead-capture workflow — not an invented client review.",
  },
  {
    id: "founder-brand-storefront",
    slug: "founder-brand-storefront",
    label: "Sample Project · Reference Build",
    niche: "Founder & Creator Brands",
    title: "Founder-Led Product Brand Hub & Paid Campaign Landing System",
    summary:
      "An editorial product showcase built for emerging D2C founders who need their homepage and campaign landing pages to feel trustworthy on first visit—without bloated templates.",
    challenge:
      "Off-the-shelf themes frequently stall on 3G/4G phones under oversized scripts and popups, burning ad spend before buyers ever read product proof.",
    solution:
      "We pair lightweight custom React sections with crisp product comparison layouts, dedicated Instagram/ad campaign landing pages, and clean analytics instrumentation from day one.",
    deliverables: [
      "Custom editorial product showcase & FAQ flow",
      "Dedicated paid-social & Instagram campaign pages",
      "Zero third-party popup script bloat",
      "Event tracking ready for conversion measurement",
    ],
    measuredSpecs: [
      { metric: "Layout Stability Target", value: "< 0.05 CLS (Lab)" },
      { metric: "Above-Fold Clarity", value: "Offer + Proof in 5s" },
      { metric: "Campaign Readiness", value: "UTM & Meta Friendly" },
      { metric: "Device Parity", value: "360px Mobile First" },
    ],
    stack: ["Next.js", "React 19", "Next/Image", "Vercel Analytics"],
    imagePath: "/images/service-digital-marketing.jpg",
    imageAlt:
      "Reference digital storefront and campaign landing page structure for founder-led brands",
    disclaimer:
      "Concept reference build illustrating storefront architecture and campaign landing hygiene — not a past client endorsement.",
  },
  {
    id: "creator-launch-platform",
    slug: "creator-launch-platform",
    label: "Sample Project · Reference Build",
    niche: "Founder & Creator Brands",
    title: "One-Go Creator Media Kit, Brand Deal Desk & Content Hub",
    summary:
      "Designed for creators starting an influencer journey with Zeltrio in one go: one fast personal site replacing fragmented link-in-bio pages, paired with brand-inquiry automation.",
    challenge:
      "New creators juggle scattered link tools, unorganized DMs, and PDFs that brands never open—missing sponsorship replies and looking amateur compared to established talent.",
    solution:
      "We bundle a custom personal hub, structured audience & niche media card, Instagram/X creative alignment, and an automated sponsorship intake form that qualifies budgets before reaching the creator.",
    deliverables: [
      "Custom creator hub & live media-kit overview",
      "Automated brand sponsorship & collabs intake",
      "Instagram & X bio/visual identity alignment",
      "One-go setup across web, content, and routing",
    ],
    measuredSpecs: [
      { metric: "Launch Track", value: "One-Go Unified Setup" },
      { metric: "Sponsor Filtering", value: "Budget + Brief Form" },
      { metric: "Social Link Hubs", value: "Instagram & X Native" },
      { metric: "Follow-Up Routing", value: "Automated Auto-Reply" },
    ],
    stack: ["Next.js", "Creator Hub UI", "Form Automation", "Social Systems"],
    imagePath: "/images/service-business-automation.jpg",
    imageAlt:
      "Reference creator launch platform combining personal website, media kit, and automated sponsor intake",
    disclaimer:
      "Concept reference build illustrating Zeltrio's one-go creator launch package — sample specs only.",
  },
];

