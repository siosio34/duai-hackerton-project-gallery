# Index — an editorial project gallery

A project gallery / portfolio built to read like a printed index, not a templated
SaaS landing page. Visitors scan an asymmetric editorial grid, then open any
project for a full write-up at a shareable URL.

Built with **Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · GSAP**.

---

## Design decisions

The look deliberately rejects the usual AI-portfolio tells (dark background + neon
gradients, three identical cards, glassmorphism everywhere):

- **One locked light theme** — warm paper, ink, and a single vermillion accent for
  UI chrome (links, active filter, status, hover). No dark+neon.
- **Asymmetric editorial grid** — cards vary in column span (`4 / 5 / 6 / 8 / 12`)
  by editorial weight, with `grid-auto-flow: dense` so the grid repacks cleanly
  when filtered. The page ends on a full-width feature.
- **Data-driven visuals, no stock images** — every thumbnail is a deterministic SVG
  composition (`strata`, `mesh`, `grid`, `orbit`, `glyph`, `scan`) tinted by the
  project's own accent. No empty image boxes, no fake screenshots.
- **Strong type, wide whitespace** — Geist for display/body, Geist Mono for meta
  (year, category, stack). Clear information hierarchy over decoration.
- **Motion that helps you read, not show off**
  - _Framer Motion_: card entrance/hover, filter reflow (`layout` + `AnimatePresence`),
    the sliding active-filter pill, and detail-page section reveals.
  - _GSAP + ScrollTrigger_: the masthead intro (lines rise in sequence) and subtle
    scroll parallax on large visuals.
  - All motion is gated behind `prefers-reduced-motion`.
- **Accessibility** — single locked focus ring, `aria-pressed` filter toggles, a
  skip link, semantic headings, keyboard-navigable cards, and AA-contrast text
  (the deeper accent variant is reserved for anything carrying white text).

---

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build (prerenders every project page)
npm run start    # serve the production build
```

Requires Node 18.18+ (developed on Node 20+).

---

## Add a project

All content lives in one typed data file: **`lib/projects.ts`**. Append an object
to the `projects` array following the `Project` type in `lib/types.ts`:

```ts
{
  slug: "my-project",          // unique, URL-safe -> /projects/my-project
  title: "My Project",
  tagline: "One line that earns the click.",
  category: "Web app",          // also becomes a filter chip
  tags: ["Realtime", "Maps"],
  tech: ["Next.js", "Rust"],
  year: 2025,
  status: "live",               // live | in-progress | archived | concept
  featured: true,               // featured cards get larger cells + parallax
  span: 7,                       // desktop column span: 4 | 5 | 6 | 7 | 8 | 12
  accent: "#d83a12",            // tints the generative visual
  visual: "strata",             // strata | mesh | grid | orbit | glyph | scan

  overview: "...",
  problem: "...",
  role: "...",
  features: ["...", "..."],
  outcome: "...",
  links: [{ label: "Live site", href: "https://..." }],
  gallery: [{ caption: "...", visual: "scan" }],
}
```

That is the only file you touch. The card, the `/projects/[slug]` route, the
filter chips, and the masthead counts all update automatically. Vary `span` and
`visual` across projects to keep the editorial rhythm.

### Tuning the layout rhythm

`span` values are the 12-column desktop widths. A pleasant row sums to 12, e.g.
`7 + 5`, `4 + 4 + 4`, `6 + 6`, or a single `12` as a closing full-width piece.
`grid-auto-flow: dense` fills any gaps, so the grid stays tidy even when filtered.

---

## Project structure

```
app/
  layout.tsx                 # fonts, metadata, grain overlay, skip link
  page.tsx                   # home: masthead + gallery
  not-found.tsx              # 404
  projects/[slug]/page.tsx   # detail route (generateStaticParams + metadata)
components/
  Nav.tsx  Masthead.tsx  Footer.tsx
  Gallery.tsx                # filter state + animated grid (client)
  FilterBar.tsx  ProjectCard.tsx  ProjectDetail.tsx
  ProjectVisual.tsx          # the generative SVG visuals
  Parallax.tsx               # GSAP scroll parallax (client leaf)
lib/
  types.ts                   # Project / VisualKind / status types
  projects.ts                # ALL project data lives here
```

---

## Deploy to Vercel

The app is a standard Next.js App Router project — zero extra config needed.

**Option A — Vercel CLI**

```bash
npm i -g vercel
vercel            # first run links/creates the project (follow prompts)
vercel --prod     # deploy to production
```

**Option B — Git + dashboard**

1. Push this repo to GitHub/GitLab/Bitbucket.
2. In the Vercel dashboard, **New Project → Import** the repo.
3. Framework preset auto-detects **Next.js**. Build command `next build`,
   output handled automatically. No environment variables are required.
4. Deploy. Every push to the default branch ships to production.

After deploying, update `metadataBase` in `app/layout.tsx` to your real domain so
Open Graph URLs resolve correctly.
