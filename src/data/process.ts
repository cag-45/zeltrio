import type { ProcessPhase } from "@/types";

export const processPhases: ProcessPhase[] = [
  {
    step: "01",
    title: "Discovery and Technical Audit",
    duration: "Days One to Three",
    summary:
      "We review your business model, creator or brand goals, current web infrastructure, search standing, and operational inquiry flow before writing a single line of code.",
    activities: [
      "Stakeholder goal alignment and commercial priority mapping",
      "Technical audit of existing domains, speed scores, and search indexing",
      "Competitor positioning review across organic search and social channels",
      "Definition of measurable milestones, scope boundaries, and delivery schedule",
    ],
    outcome:
      "A clear project blueprint detailing architecture, messaging structure, and success targets.",
  },
  {
    step: "02",
    title: "Architecture and Content Design",
    duration: "Days Four to Ten",
    summary:
      "We structure information hierarchies, write clear descriptive brand copy, design responsive visual layouts, and plan automation logic with zero decorative clutter.",
    activities: [
      "Sitemap architecture and page by page user flow mapping",
      "Editorial layout composition with high contrast typography and structured grids",
      "Professional copywriting tuned for human clarity, creator launches, and search relevance",
      "Workflow diagramming for inquiry routing, booking, and CRM synchronization",
    ],
    outcome:
      "Approved visual blueprints, finalized copy decks, and verified integration specifications.",
  },
  {
    step: "03",
    title: "Engineering and Integration",
    duration: "Weeks Two to Four",
    summary:
      "We build modular, type safe frontends, configure technical SEO schemas, connect WhatsApp and CRM automation workflows, and verify performance across real devices.",
    activities: [
      "Clean component engineering with Next.js App Router, TypeScript, and Tailwind CSS",
      "Dynamic XML sitemap, robots directives, OpenGraph cards, and JSON LD schema setup",
      "Automation pipeline assembly for instant inquiry acknowledgment and scheduling",
      "Cross device testing across desktop monitors, tablets, and mobile browsers",
    ],
    outcome:
      "A staging deployment ready for your direct inspection and final launch sign off.",
  },
  {
    step: "04",
    title: "Launch and Continuous Growth",
    duration: "Launch Week and Ongoing",
    summary:
      "After deploying seamlessly to Vercel edge infrastructure, we verify search engine submission, monitor Core Web Vitals, and iterate on marketing and conversion data.",
    activities: [
      "Production deployment with clean DNS cutover and SSL verification",
      "Search console sitemap submission and indexation monitoring",
      "Live campaign rollout, creator content execution, and analytics verification",
      "Monthly performance reviews covering speed, rankings, and lead volume",
    ],
    outcome:
      "A fast, dependable digital system actively generating and converting client demand.",
  },
];
