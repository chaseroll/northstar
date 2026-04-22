# North Star

A founders program at the **University of Austin** — splash page, portfolio
holding page, and online application.

> A program whose sole purpose is to increase the number of venture-backable
> startups within the university.

## Stack

- **Next.js 16** (App Router, Turbopack) on React 19
- **Tailwind CSS v4** with a small custom design-token layer
- **Framer Motion** for scroll-reveal sections only (no idle animations)
- **Geist Sans / Geist Mono + Fraunces** via `next/font/google`
- **Node.js API routes** for interest capture (`/api/interest`) and the full
  application (`/api/apply`)

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
    layout.tsx                 # fonts, metadata, viewport
    page.tsx                   # splash composition
    globals.css                # design tokens + utilities
    apply/page.tsx             # online application
    portfolio/page.tsx         # portfolio holding page
    api/
      interest/route.ts        # email-only interest capture
      apply/route.ts           # full application submission
  components/
    nav.tsx                    # editorial top nav + mobile overlay
    footer.tsx                 # editorial footer
    hero.tsx                   # "North Star." hero
    north-star.tsx             # static lens-flare guide star (SVG)
    star-field.tsx             # canvas: static starfield backdrop
    comets.tsx                 # canvas: infrequent shooting stars
    floating-stars.tsx         # CSS-only decorative stars
    floating-companies.tsx     # cursor-proximity company names
    star-mark.tsx              # four-point brand sparkle (SVG)
    reveal.tsx                 # scroll-reveal wrapper (framer-motion)
    interest-form.tsx          # splash email capture form
    sections/
      gap.tsx                  # 01 — The gap
      program.tsx              # 02 — The proposal (three instruments)
      cta.tsx                  # Admission CTA + interest form
    apply/
      application-form.tsx     # full multi-section application
      form-primitives.tsx      # Field / TextInput / Select / RadioGroup / …
```

## Design system

Design tokens live in `src/app/globals.css` under `@theme`:

| Token              | Value                    | Use                          |
| ------------------ | ------------------------ | ---------------------------- |
| `--color-navy`     | `#05091a`                | Primary background           |
| `--color-white`    | `#ffffff`                | Primary text                 |
| `--color-hair`     | `rgba(255,255,255,0.08)` | Hairline dividers            |
| `--color-mute`     | `rgba(255,255,255,0.58)` | Secondary text               |
| `--font-sans`      | Geist (100–900 variable) | Wordmark, display, body, UI  |
| `--font-mono`      | Geist Mono               | Eyebrows, numerals, metadata |

Tailwind utilities are extended with `shell` (container), `eyebrow` (labels),
`wordmark`, `display-xl/lg/md/sm`, `body`, `body-lg`, and `section-y`.

## Performance

- The `NorthStar` hero visual is a static SVG — no idle animations.
- `StarField` paints once to a canvas and only repaints on resize.
- `Comets` only runs the rAF loop while a comet is in flight, pauses while
  the tab is hidden or the hero scrolls offscreen, and skips itself on
  touch-primary devices or when `prefers-reduced-motion: reduce`.
- `FloatingCompanies` uses a single pointer listener scoped to the hero, a
  single rAF, and CSS variables (`--p`) to drive all 12 chips — there is no
  framer-motion at idle and no work while the hero is offscreen.
- `FloatingStars` is pure CSS hover.
- All interactive elements carry a visible focus ring.

## Submissions

- `POST /api/interest` — `{ email: string }` — currently logs to the server.
- `POST /api/apply` — the full application payload — currently logs to the
  server and validates required fields.

Wire either endpoint to your delivery of choice (Resend, Neon, Notion,
Google Sheets, …) by swapping the body of the route handler.

## Deploy

```bash
vercel
```

The site is static except for the two POST endpoints, which run on the
Node.js runtime.
