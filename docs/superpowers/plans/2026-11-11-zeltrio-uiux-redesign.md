# Zeltrio Digital Services UI/UX Redesign Plan

> **For agentic workers:** Implementing via superpowers:executing-plans with ui-ux-pro-max + ui-styling rules.

**Goal:** Redesign the Zeltrio Digital Services website around the new white-grounded Navy & Cobalt logo (`media_1794409134557_e063fe15.jpg`), human-working background & service photography, interactive motion, customer reviews, Instagram & X links, and full cross-device polish.

**Architecture:** Modular Next.js App Router + TypeScript + Tailwind CSS v4 architecture. Design tokens mapped to the new logo (`#FFFFFF` canvas, `#061A40` deep maritime navy, `#0066FF` brand cobalt, `#F4F7FC` ice surface, `#EF233C` interactive pointer dot). Pure CSS/IntersectionObserver GPU compositor animations (`transform`/`opacity`) paired with interactive React islands (`ServicesShowcase`, `CustomerReviewsSection`, `ServiceFaqAccordion`, `InquiryForm`, `MobileMenu`, `InteractiveCursor`).

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, `@vercel/analytics`, `@vercel/speed-insights`, `@vercel/config`.

## Global Constraints
- Replace logo with `media_1794409134557_e063fe15.jpg` ("Zeltrio Digital Services — Accelerate Your Business Growth")
- Strictly non-AI color palette (no purple/cyan neon blobs or dark-slop gradients)
- Include professional background & section photography of human beings working
- Keep strict Title Case on headings/titles/buttons and zero emojis/Unicode symbol clutter
- Add X (`https://x.com/zeltrio_agency`) and Instagram (`https://www.instagram.com/zeltriodigital_service?psln=MXJweGpxbTNybGk0Mw==`) links in Header, Footer, About, Digital Marketing, and Contact
- Include realistic Customer Reviews section with keyboard/reduced-motion accessible controls
- Keep full inquiry workflow routing to `aashraybopparaju15@gmail.com` with CC to `b.rishivarma16@gmail.com` and `kaushalzz2008@gmail.com`

