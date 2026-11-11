# Zeltrio Obsidian Dark Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the Zeltrio Digital Services website into a dark-mode, highly interactive, humanized editorial agency experience matching the Obsidian + Cobalt + Champagne Gold spec.

**Architecture:** Server Components remain at the page/SEO layer while `"use client"` interactive motion primitives (`InteractiveCanvasBackground`, `SpotlightCard`, `MagneticLink`, `PageTransitionShell`, `SocialLogoButtons`, `BrandLogo`, `InteractiveCursor`, `InteractiveMotion`) deliver 60fps Canvas, pointer-spotlight, and scroll choreography with zero external animation dependencies.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4 (`@theme inline`), HTML5 Canvas, CSS `@keyframes`.

**Spec:** `docs/superpowers/specs/2026-11-11-zeltrio-dark-redesign-design.md`

## Global Constraints
- No plain white (`#ffffff`) or light-mode backgrounds anywhere across any route or component.
- Maintain >= 4.5:1 text contrast on dark `#0B0F17` / `#101624` / `#131B2B` surfaces; `color-scheme: dark` on `html`.
- Respect `prefers-reduced-motion: reduce` and pause offscreen/hidden animations.
- Preserve all SEO metadata, sitemap, robots, Schema.org JSON-LD, and contact form submission/Google Sheets/FormSubmit pipelines.
- Instagram and X social buttons display ONLY colored brand logos (`aria-label` preserved, no visible label text).
- Client reviews display ONLY `clientName` (no `companyOrChannel` and no `roleTitle`).

## Review Focus
- Check every file for leftover light-mode classes (`bg-white`, `text-navy`, `bg-navy`, `bg-canvas` light assumptions) or contrast issues.
- Verify `prefers-reduced-motion` and tab-hidden visibility pausing in `InteractiveCanvasBackground`, `InteractiveCursor`, and `CustomerReviewsSection`.
- Verify zero TypeScript prop mismatches after removing `roleTitle` and `companyOrChannel` from `CustomerReview`.
- Verify `BrandLogo` and `EditorialImage` gracefully handle missing or uncopied local images without breaking layout.
- Verify interactive buttons/links inside `SpotlightCard` keep clickable pointer events and `44x44px` touch targets.

---

### Task 1: Asset Script, Types, Reviews Data, and Core Design System Tokens
- [ ] Update `scripts/setup-zeltrio.ps1` to copy `media_1794412748733_a1c1c361.jpg` to `public/images/zeltrio-logo.jpg` alongside hero/studio photos.
- [ ] Update `src/types/index.ts` and `src/data/reviews.ts` to remove `roleTitle` and `companyOrChannel`.
- [ ] Overhaul `src/app/globals.css` with Obsidian + Cobalt + Champagne Gold `@theme inline` tokens, `color-scheme: dark`, kinetic `@keyframes`, shimmer CTA classes, and reduced-motion rules.
- [ ] Update `src/app/layout.tsx`, `src/app/icon.tsx`, and `src/app/opengraph-image.tsx` with `Outfit` + `DM_Sans` + `Newsreader` fonts, `themeColor: "#0B0F17"`, and global dark canvas + interactive wrappers.

### Task 2: Interactive Engine, Brand Medallion, and Colored Social Logo Primitives
- [ ] Create `src/components/ui/InteractiveCanvasBackground.tsx` (60fps pointer-reactive constellation + drifting cobalt/gold aurora mesh).
- [ ] Create `src/components/ui/SpotlightCard.tsx` (pointer-tracking radial spotlight + subtle damped 3D tilt).
- [ ] Create `src/components/ui/MagneticLink.tsx` and `src/components/ui/PageTransitionShell.tsx`.
- [ ] Upgrade `src/components/ui/InteractiveMotion.tsx` (`RevealOnScroll` directional variants + cobalt-gold `ScrollProgressBar`) and `src/components/ui/InteractiveCursor.tsx`.
- [ ] Create `src/components/brand/SocialLogoButtons.tsx` (colored Instagram gradient glyph & colored X geometric mark, icon-only).
- [ ] Upgrade `src/components/brand/BrandLogo.tsx`, `src/components/brand/BackgroundPhoto.tsx`, and `src/components/brand/EditorialImage.tsx` for dark obsidian framing.

### Task 3: Layout Chrome & Homepage Interactive Sections
- [ ] Update `src/components/layout/Header.tsx`, `src/components/layout/MobileMenu.tsx`, and `src/components/layout/Footer.tsx`.
- [ ] Rebuild `src/components/home/HeroSection.tsx` (ambient depth, kinetic capability ticker, orbital brand crest, interactive studio capability deck, magnetic CTAs, colored social logos).
- [ ] Upgrade `src/components/home/ServicesGridSection.tsx`, `src/components/home/ServicesInteractiveShowcase.tsx`, and `src/components/services/ServiceCard.tsx`.
- [ ] Upgrade `src/components/home/MethodologySection.tsx`, `src/components/home/StandardsSection.tsx`, `src/components/home/CustomerReviewsSection.tsx`, and `src/components/home/CallToActionSection.tsx`.

### Task 4: Inner Pages, Contact Form, & Whole-Project Verification Review
- [ ] Update `src/app/services/page.tsx`, `src/app/services/[slug]/page.tsx`, `src/components/services/ServiceDeliverables.tsx`, `src/components/services/ServiceFaqAccordion.tsx`.
- [ ] Update `src/app/process/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/components/contact/InquiryForm.tsx`, `src/app/privacy-policy/page.tsx`, `src/app/terms-of-service/page.tsx`, and `src/app/not-found.tsx`.
- [ ] Dispatch a fresh `research` reviewer subagent to audit every modified/created file for TypeScript errors, missing imports, leftover light/white classes, review field leaks, and accessibility issues, and resolve any findings.

