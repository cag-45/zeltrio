# Zeltrio Digital Service Website

Official corporate website for **Zeltrio Digital Service** (`Create, Grow, Go Digital`), engineered with Next.js App Router, TypeScript, Tailwind CSS v4, dynamic SEO sitemaps, structured Schema.org JSON-LD, and Vercel deployment configuration.

## Architecture Overview

```text
zeltrio/
├── scripts/
│   └── setup-zeltrio.ps1        # Copies brand logo + service images & installs npm packages
├── public/images/               # Brand logo & service editorial photographs
├── src/
│   ├── app/                     # Next.js App Router routes, API, sitemap, robots, OG images
│   ├── components/              # Modular UI divided by brand, layout, home, services, contact, seo
│   ├── config/                  # Centralized brand & navigation settings
│   ├── data/                    # Structured service scopes, process phases, company standards
│   ├── lib/                     # SEO metadata builders, JSON-LD generators, form validation
│   └── types/                   # Strict TypeScript definitions
├── next.config.ts               # Image optimization (AVIF/WebP) and security headers
├── vercel.ts                    # Typed Vercel edge caching configuration
├── tsconfig.json                # Strict TypeScript setup
└── eslint.config.mjs            # Next.js 16 flat ESLint configuration
```

## Quick Setup (Local Windows PowerShell)

1. Run the setup script once to copy your uploaded logo and generated service photographs into `public/images/` and install dependencies:

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\setup-zeltrio.ps1
```

2. Create a local environment file from `.env.example`:

```powershell
Copy-Item .env.example .env.local
```

Update `NEXT_PUBLIC_SITE_URL` in `.env.local` (and in Vercel Project Settings -> Environment Variables) to match your live production domain so `/sitemap.xml`, `/robots.txt`, canonical tags, and OpenGraph URLs resolve to your domain.

3. Start the development server or verify the production build:

```powershell
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Inquiry Delivery & Easy Google Sheets Storage

Out of the box, submitting the inquiry form delivers directly to `aashraybopparaju15@gmail.com` with CC to `b.rishivarma16@gmail.com` and `kaushalzz2008@gmail.com` via FormSubmit AJAX — on your very first live submission, click the one-time **Activate Form** link sent to `aashraybopparaju15@gmail.com`.

To **also save every inquiry into a private Google Sheet with one-click WhatsApp forwarding links** (free, no database hosting required):
1. Create a Google Sheet in Google Drive under `aashraybopparaju15@gmail.com` (and optionally share it with `b.rishivarma16@gmail.com` and `kaushalzz2008@gmail.com`).
2. Open **Extensions → Apps Script**, paste the contents of `scripts/google-sheets-inquiries.gs`, and deploy as a **Web App** (`Execute as: Me`, `Who has access: Anyone`).
3. Paste the generated Web App URL into `CONTACT_WEBHOOK_URL` in `.env.local` and your Vercel project's **Settings → Environment Variables**.

## Deploying to Vercel

1. Push the repository to GitHub or run `npx vercel` in the project directory.
2. Set `NEXT_PUBLIC_SITE_URL` (for example `https://zeltrio.com`) and optional `CONTACT_WEBHOOK_URL` (for Google Sheets inquiry storage and WhatsApp forwarding links) in your Vercel Environment Variables.
3. Once deployed, submit `https://your-domain.com/sitemap.xml` inside Google Search Console.

