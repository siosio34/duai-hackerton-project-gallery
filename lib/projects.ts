import type { Project } from "./types";

// ---------------------------------------------------------------------------
// PROJECT DATA
// ---------------------------------------------------------------------------
// To add a project: append an object matching the `Project` type.
//   - `slug` must be unique and URL-safe (it becomes /projects/<slug>).
//   - `span` controls how wide the card is on the 12-col desktop grid.
//     Vary it (4 / 5 / 6 / 7 / 8 / 12) to keep the editorial rhythm.
//   - `accent` tints the generative visual; pick a saturated hex.
//   - `visual` chooses the generative treatment (see VisualKind).
// No images are required: visuals are drawn from data.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "halyard",
    title: "Halyard",
    tagline: "Realtime telemetry for distributed sailing fleets.",
    category: "Web app",
    tags: ["Realtime", "Data viz", "Maps"],
    tech: ["Next.js", "WebSocket", "D3", "PostGIS", "Rust"],
    year: 2025,
    status: "live",
    featured: true,
    span: 7,
    accent: "#d83a12",
    visual: "strata",
    overview:
      "Halyard streams position, heel angle, and weather data from offshore racing fleets into a single editorial dashboard that crews can read at a glance from a wet cockpit.",
    problem:
      "Race teams juggled four separate apps to answer one question: who is gaining, and why. Latency and clutter made the data useless exactly when decisions mattered most.",
    role: "Lead engineer and interface designer. Owned the realtime pipeline, the map renderer, and the type system end to end.",
    features: [
      "Sub-second WebSocket fan-out to hundreds of concurrent viewers.",
      "Time-scrubbing replay that reconstructs any moment of a race.",
      "Glanceable heel and speed gauges legible in direct sunlight.",
      "Offline-first caching for patchy satellite connections.",
    ],
    outcome:
      "Adopted by three offshore programs across two seasons. Crews cut tactical decision time and stopped switching apps mid-leg.",
    links: [
      { label: "Live site", href: "#" },
      { label: "Case study", href: "#" },
    ],
    gallery: [
      { caption: "Fleet overview with live position trails.", visual: "strata" },
      { caption: "Replay scrubber and tactical layer.", visual: "scan" },
    ],
  },
  {
    slug: "tideglass",
    title: "Tideglass",
    tagline: "Audio-reactive generative visuals for live performance.",
    category: "Creative",
    tags: ["WebGL", "Audio", "Generative"],
    tech: ["TypeScript", "WebGL2", "Web Audio", "GLSL"],
    year: 2024,
    status: "live",
    featured: true,
    span: 5,
    accent: "#1f6f5c",
    visual: "mesh",
    overview:
      "Tideglass turns a live audio signal into projected fields of light. Performers shape the visuals in real time without touching a laptop on stage.",
    problem:
      "VJ tools were either rigid presets or fragile code sketches. Nothing let a musician improvise visuals as fluidly as they improvised sound.",
    role: "Solo project. Designed the shader system, the MIDI control surface, and the performance UX.",
    features: [
      "FFT-driven shader fields running at a steady 60fps.",
      "Hardware MIDI mapping for hands-free live control.",
      "Preset morphing that crossfades between scenes.",
      "Projector-safe output with calibrated color and edge masking.",
    ],
    outcome:
      "Used in a dozen live sets and one gallery installation. Open-sourced the shader core for other performers to fork.",
    links: [
      { label: "Demo reel", href: "#" },
      { label: "Source", href: "#" },
    ],
    gallery: [
      { caption: "Bass-reactive field at full intensity.", visual: "mesh" },
      { caption: "Scene morph between two presets.", visual: "orbit" },
    ],
  },
  {
    slug: "cadence-kit",
    title: "Cadence Kit",
    tagline: "An accessible component library built on real constraints.",
    category: "Design system",
    tags: ["Accessibility", "Design system", "Open source"],
    tech: ["React", "TypeScript", "Radix", "Style Dictionary"],
    year: 2025,
    status: "live",
    span: 4,
    accent: "#3b4ad8",
    visual: "grid",
    overview:
      "Cadence Kit is a component library that treats accessibility and theming as the starting point, not a later patch. Every primitive ships keyboard, focus, and contrast behaviour by default.",
    problem:
      "Teams kept rebuilding the same buttons and dialogs, each time reintroducing the same accessibility bugs. The fixes never made it back upstream.",
    role: "Maintainer. Defined the token pipeline, the contribution model, and the audit tooling.",
    features: [
      "Token pipeline that generates light and dark themes from one source.",
      "Every component ships an automated axe-core test.",
      "Headless primitives so teams keep their own visual language.",
      "A contribution guide that makes accessibility the default path.",
    ],
    outcome:
      "Shipped in four internal products. Contrast and focus regressions in new UI fell sharply once the kit became the default.",
    links: [
      { label: "Docs", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    gallery: [
      { caption: "Token reference, light and dark.", visual: "grid" },
      { caption: "Focus-state specimen sheet.", visual: "glyph" },
    ],
  },
  {
    slug: "margin",
    title: "Margin",
    tagline: "A markdown-native knowledge base that stays out of the way.",
    category: "Productivity",
    tags: ["Editor", "Local-first", "Search"],
    tech: ["Next.js", "CodeMirror", "SQLite", "WASM"],
    year: 2024,
    status: "in-progress",
    span: 4,
    accent: "#8a4b1f",
    visual: "glyph",
    overview:
      "Margin keeps your notes as plain markdown files on disk and layers fast search, backlinks, and a calm editor on top. Your knowledge never gets locked in a database.",
    problem:
      "Most note tools trap your writing in a proprietary store. Margin proves you can have a modern editor without giving up ownership of the files.",
    role: "Designer and full-stack engineer. Built the local-first sync model and the editor surface.",
    features: [
      "Files stay as portable markdown on your own disk.",
      "Full-text search compiled to WASM for instant results.",
      "Backlinks and an outline that update as you type.",
      "A reading mode that hides every control until you need it.",
    ],
    outcome:
      "In private beta with a small group of writers and researchers. Daily-active testers keep their entire archive inside it.",
    links: [{ label: "Waitlist", href: "#" }],
    gallery: [
      { caption: "The reading mode, all controls hidden.", visual: "glyph" },
      { caption: "Backlink graph for a single note.", visual: "orbit" },
    ],
  },
  {
    slug: "postliminary",
    title: "Postliminary",
    tagline: "Privacy-first analytics without a single cookie.",
    category: "Infrastructure",
    tags: ["Privacy", "Analytics", "Edge"],
    tech: ["Go", "ClickHouse", "Edge Functions", "Preact"],
    year: 2023,
    status: "live",
    span: 4,
    accent: "#5a5f6b",
    visual: "scan",
    overview:
      "Postliminary measures what a site actually needs without tracking people across the web. No cookies, no fingerprints, no shared identifiers, just honest aggregate counts.",
    problem:
      "Site owners wanted to understand traffic without inheriting the legal and ethical weight of surveillance analytics. The mainstream tools made that impossible.",
    role: "Backend lead. Designed the aggregation model and the sub-kilobyte client script.",
    features: [
      "A tracking script under one kilobyte, gzipped.",
      "Aggregation that never stores a personal identifier.",
      "Edge ingestion that keeps data in-region by default.",
      "Reports a non-engineer can read without a glossary.",
    ],
    outcome:
      "Running on a few hundred independent sites. Owners get the numbers they need and a consent banner they no longer have to show.",
    links: [
      { label: "Live site", href: "#" },
      { label: "Source", href: "#" },
    ],
    gallery: [
      { caption: "Aggregate traffic, no identifiers stored.", visual: "scan" },
      { caption: "In-region edge ingestion map.", visual: "strata" },
    ],
  },
  {
    slug: "verge-atlas",
    title: "Verge Atlas",
    tagline: "Crowd-sourced maps for safe urban cycling routes.",
    category: "Civic",
    tags: ["Maps", "PWA", "Community"],
    tech: ["Next.js", "Mapbox GL", "Supabase", "Turf.js"],
    year: 2025,
    status: "in-progress",
    span: 8,
    accent: "#2f7d3a",
    visual: "orbit",
    overview:
      "Verge Atlas lets cyclists map the routes they actually trust, scoring streets by lighting, surface, and traffic so newcomers can find a calm way across the city.",
    problem:
      "Official cycling maps show where lanes are painted, not where riding feels safe. The real knowledge lived in people's heads and never reached anyone new.",
    role: "Product engineer. Built the contribution flow, the routing model, and the offline PWA shell.",
    features: [
      "Segment-level safety scoring from community input.",
      "A routing engine that optimizes for calm, not just speed.",
      "An installable PWA that works fully offline mid-ride.",
      "Lightweight moderation to keep contributions trustworthy.",
    ],
    outcome:
      "Piloting in two cities with active local cycling groups. Early riders contribute hundreds of street segments a week.",
    links: [
      { label: "Open the map", href: "#" },
      { label: "Contribute", href: "#" },
    ],
    gallery: [
      { caption: "Safety-scored segments across the city.", visual: "orbit" },
      { caption: "Offline route saved before a ride.", visual: "grid" },
    ],
  },
  {
    slug: "loomwright",
    title: "Loomwright",
    tagline: "A writing studio where the AI stays in the margins.",
    category: "AI",
    tags: ["AI", "Editor", "Writing"],
    tech: ["Next.js", "Claude API", "tRPC", "Postgres"],
    year: 2025,
    status: "concept",
    span: 4,
    accent: "#7a3b86",
    visual: "mesh",
    overview:
      "Loomwright is a long-form editor that offers suggestions only when asked and never rewrites your voice. The model assists at the sentence edge, never the center.",
    problem:
      "AI writing tools tend to flatten an author's voice into the same agreeable register. Loomwright explores keeping the human firmly in the driver's seat.",
    role: "Concept and prototype. Exploring the interaction model and the prompt scaffolding.",
    features: [
      "Suggestions surface in the margin, never inline by default.",
      "A voice profile the model is asked to preserve, not replace.",
      "Versioned drafts so any experiment is reversible.",
      "A focus mode that mutes every assist until invited.",
    ],
    outcome:
      "An interactive prototype used to test the core interaction. Validating whether restraint makes AI assistance feel trustworthy.",
    links: [{ label: "Prototype", href: "#" }],
    gallery: [
      { caption: "Margin suggestions, opt-in only.", visual: "mesh" },
      { caption: "Voice profile configuration.", visual: "glyph" },
    ],
  },
  {
    slug: "saltmarsh",
    title: "Saltmarsh",
    tagline: "Field-research data capture that survives the wetland.",
    category: "Mobile",
    tags: ["PWA", "Offline", "Science"],
    tech: ["React", "IndexedDB", "Service Worker", "GeoJSON"],
    year: 2023,
    status: "archived",
    span: 12,
    accent: "#356a7a",
    visual: "strata",
    overview:
      "Saltmarsh is a rugged data-collection app for ecologists working far from signal. It records structured observations, photos, and coordinates that sync only once the team is back online.",
    problem:
      "Researchers wading through tidal marshes lost data to dead batteries, dropped connections, and paper forms that disintegrated in the wet. The science suffered for it.",
    role: "Engineer in partnership with a coastal research lab. Built the offline data model and the rugged capture UI.",
    features: [
      "Fully offline capture with conflict-aware background sync.",
      "Structured species and habitat forms with validation.",
      "Geotagged photos bundled with each observation.",
      "Large, glove-friendly controls for use in the field.",
    ],
    outcome:
      "Carried through two full field seasons before the study wrapped. Captured thousands of clean observations with zero data loss.",
    links: [
      { label: "Field report", href: "#" },
      { label: "Source", href: "#" },
    ],
    gallery: [
      { caption: "Offline capture form in the field.", visual: "strata" },
      { caption: "Sync status once back in range.", visual: "scan" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All unique categories, with an "All" pseudo-filter prepended. */
export function getCategories(): string[] {
  const set = new Set(projects.map((p) => p.category));
  return ["All", ...Array.from(set)];
}
