# NorthStar

A founders program at the **University of Austin** — splash page.

> A program whose sole purpose is to increase the number of venture-backable
> startups within the university.

## Stack

- **Next.js 16** (App Router, Turbopack) on React 19
- **Tailwind CSS v4** with a small custom design token layer
- **Framer Motion** for cursor-reactive + scroll-reveal motion
- **Fraunces** (display serif) + **Geist Sans / Geist Mono** for an editorial, technical feel
- **Node.js API route** (`/api/interest`) for email capture

## Getting started

```bash
npm install
npm run dev
# open http://localhost:3000
```

Build / start:

```bash
npm run build
npm start
```

## Project layout

```
src/
  app/
    layout.tsx         # fonts + metadata
    page.tsx           # page composition
    globals.css        # design tokens + utilities
    api/interest/route.ts  # email capture endpoint
  components/
    nav.tsx            # editorial top nav with live status pill
    hero.tsx           # "Follow the NorthStar" hero
    north-star.tsx     # animated SVG star (cursor-reactive, breathing)
    reveal.tsx         # scroll-reveal wrapper
    interest-form.tsx  # client form for /api/interest
    footer.tsx         # editorial footer
    sections/
      gap.tsx          # 01 — The Gap
      instruments.tsx  # 02 — What you get
      cadence.tsx      # 03 — How it works
      eligibility.tsx  # 04 — Who should apply
      cta.tsx          # Request info
```

## Design system

Design tokens live in `src/app/globals.css` under `@theme`:

| Token              | Value                         | Use                          |
| ------------------ | ----------------------------- | ---------------------------- |
| `--color-ink`      | `#050507`                     | Primary background           |
| `--color-paper`    | `#f4efe4`                     | Primary text                 |
| `--color-cream`    | `#eadfbb`                     | Accent — "NorthStar" word    |
| `--color-hair`     | `rgba(244,239,228,0.08)`      | Hairline dividers            |
| `--color-mute`     | `rgba(244,239,228,0.55)`      | Secondary text               |
| `--font-serif`     | Fraunces                      | Display headlines            |
| `--font-sans`      | Geist Sans                    | Body                         |
| `--font-mono`      | Geist Mono                    | Eyebrows, numerals, metadata |

Tailwind utilities are extended with `shell` (container), `eyebrow` (labels),
and `display-serif` (optical-sized Fraunces settings).

## Email capture

`POST /api/interest` accepts `{ email: string }` and currently logs to the
server. Wire it to your delivery of choice — two common options:

1. **Resend** — mail from `onboarding@northstar.uaustin.org` to an
   ops alias.
2. **Vercel Marketplace → Neon Postgres** — persist interest + timestamp +
   UA for later outreach.

Swap the body of `src/app/api/interest/route.ts` with your integration.

## Accessibility + motion

- Motion respects `prefers-reduced-motion: reduce` (breathe / twinkle /
  ticker animations are disabled).
- All interactive elements have a visible focus ring.
- The star visual is decorative (`aria-hidden`), headings and copy carry the
  meaning.

## Deploy

```bash
vercel
```

The splash page is fully static except for `/api/interest`, which runs on
Node.js runtime.
