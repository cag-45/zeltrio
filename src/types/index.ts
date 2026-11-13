export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

export interface SocialLinkItem {
  name: string;
  handle: string;
  href: string;
  description: string;
}

export interface ServiceDeliverable {
  title: string;
  description: string;
}

export interface ServiceFaqItem {
  question: string;
  answer: string;
}

export interface ServiceDefinition {
  slug: string;
  index: string;
  title: string;
  badge?: string;
  shortSummary: string;
  headline: string;
  overview: string;
  imagePath: string;
  imageAlt: string;
  idealFor: string[];
  deliverables: ServiceDeliverable[];
  outcomes: string[];
  timeline: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  faqs: ServiceFaqItem[];
}

export interface ProcessPhase {
  step: string;
  title: string;
  duration: string;
  summary: string;
  activities: string[];
  outcome: string;
}

export interface StandardMetric {
  code: string;
  label: string;
  value: string;
  detail: string;
}

export interface CompanyPrinciple {
  number: string;
  title: string;
  description: string;
}

export interface SampleProjectSpec {
  metric: string;
  value: string;
}

export interface SampleProject {
  id: string;
  slug: string;
  label: string;
  niche: string;
  title: string;
  summary: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  measuredSpecs: SampleProjectSpec[];
  stack: string[];
  imagePath: string;
  imageAlt: string;
  disclaimer: string;
  demoUrl?: string;
}

export interface ContactSubmissionPayload {
  fullName: string;
  businessEmail: string;
  companyName: string;
  serviceInterest: string;
  projectTimeline: string;
  projectDetails: string;
}
