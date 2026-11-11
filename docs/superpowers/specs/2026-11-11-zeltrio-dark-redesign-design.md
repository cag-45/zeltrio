# Zeltrio Digital Services — Obsidian Dark Redesign Spec

**Date:** 2026-11-11
**Status:** Approved by user ("go with approach A and Obsidian + Cobalt + Champagne Gold")

## 1. Goals & Requirements
1. **Zero Plain White Backgrounds:** Replace all white/light surfaces (`#ffffff`, `#f4f7fc`, etc.) across every page and component with an eye-comfortable Obsidian Midnight layered dark architecture.
2. **Humanized Color & Typography System (Anti-AI Aesthetic):**
   - Base surfaces: `#0B0F17` (canvas), `#101624` (surface), `#131B2B` (card), `#161E2F` (elevated interactive panels), `rgba(226, 222, 213, 0.10)` hairline rules.
   - Humanized text: `#F2EFE9` (warm ivory headings/ink), `#C7C2B8` (warm sandstone prose), `#938F86` (warm taupe muted metadata, >=4.5:1 contrast).
   - Brand & warm accents: Logo Cobalt (`#4F8EF7` / `#75AAFF` / `#2563EB` CTA fill) + Warm Champagne Gold (`#E0AC58` / `#F0C67A`) + Mint Sage (`#4ADE9B` status).
   - Typography: `Outfit` (display/headings), `DM Sans` (body/UI), `Newsreader` italic (editorial callouts).
3. **Colored Logo-Only Social Buttons:** Replace text-labeled Instagram & X links everywhere (Header, MobileMenu, Hero, CTA, About, Contact, Footer) with icon-only colored official brand logos (`Instagram` multi-stop gradient glyph, `X` vibrant sky-cobalt brand mark) with accessible `aria-label`s and `44x44px` minimum touch targets.
4. **New Brand Logo Integration:**
   - Update `scripts/setup-zeltrio.ps1` to copy `media_1794412748733_a1c1c361.jpg` to `public/images/zeltrio-logo.jpg` (plus missing hero/studio backgrounds).
   - Upgrade `BrandLogo.tsx` to frame the circular white-interior emblem inside an illuminated obsidian-and-cobalt orbital medallion so it sits naturally on dark surfaces.
   - Update `icon.tsx` and `opengraph-image.tsx` to match the Obsidian + Cobalt + Champagne Gold identity.
5. **Interactive Animated Background & Motion System (Approach A — Native Zero-Dependency):**
   - `InteractiveCanvasBackground.tsx`: Passive mouse-reactive particle constellation + drifting cobalt/gold aurora field on HTML5 `<canvas>`, paused offscreen/hidden, static fallback under `prefers-reduced-motion`.
   - `SpotlightCard.tsx`: Cursor-tracking border/surface spotlight + gentle 3D perspective tilt.
   - `MagneticButton.tsx` + enhanced `.btn-primary`/`.btn-secondary`: Subtle magnetic cursor attraction, specular shimmer sweep, spring press feedback.
   - `InteractiveCursor.tsx`: Cobalt + Champagne Gold spotlight ring cursor on fine pointers.
   - Kinetic marquee strip, smooth route entrance transitions (`PageTransitionShell.tsx`), and staggered `RevealOnScroll` choreography with `cubic-bezier(0.16, 1, 0.3, 1)`.
6. **Reviews Simplification:** Remove both `companyOrChannel` and `roleTitle` from `CustomerReview` type, `src/data/reviews.ts`, and `CustomerReviewsSection.tsx`, keeping strictly `clientName`.

## 2. Constraints
- Keep Next.js 16 App Router Server Components for all pages and metadata/JSON-LD SEO builders; push `"use client"` strictly to interactive leaf components.
- Zero new npm dependencies (`run_command` is unavailable with `Access is denied..` in this session; all animations use native Canvas, Web Animations API, React 19, and CSS `@keyframes`).

