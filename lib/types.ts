// Domain types for the project gallery.
// Add new projects in lib/projects.ts following the `Project` shape below.

export type ProjectStatus = "live" | "in-progress" | "archived" | "concept";

// Generative visual treatments. Each maps to a deterministic SVG composition
// rendered in components/ProjectVisual.tsx, tinted with the project accent.
export type VisualKind = "strata" | "mesh" | "grid" | "orbit" | "glyph" | "scan";

export interface ProjectLink {
  label: string;
  href: string;
}

export interface GalleryFrame {
  caption: string;
  /** Real screenshot path under /public. Falls back to `visual` when absent. */
  image?: string;
  visual?: VisualKind;
}

/** Optional real media. When present it replaces the generative visual on the
 *  card thumbnail and the detail hero. */
export interface ProjectMedia {
  /** Looping clip (mp4). Autoplays muted on the card + hero (unless reduced motion). */
  video?: string;
  /** Still image — poster for the video, or the detail-hero still. */
  poster?: string;
  /** Card-only thumbnail (designed for the grid). Falls back to `poster`. The
   *  detail hero ignores this and uses `poster`. */
  thumbnail?: string;
  /** A standalone cinematic clip (e.g. the game's intro), shown as its own
   *  section with playback controls. `portrait` frames a vertical video. */
  cinematic?: { src: string; poster?: string; portrait?: boolean };
}

/** Top-level grouping on the home page. Built apps/games → "projects";
 *  data-automation pipelines → "automation"; Claude Code skills → "skills". */
export type ProjectSection = "projects" | "automation" | "skills";

export interface Project {
  slug: string;
  title: string;
  /** One-line description shown on the card and detail header. */
  tagline: string;
  /** Home-page section this belongs to. Defaults to "projects" when omitted. */
  section?: ProjectSection;
  /** Primary category, e.g. "Web app", "Design system". Shown as a meta chip. */
  category: string;
  /** Topic / tech tags surfaced as filter chips. */
  tags: string[];
  /** Full tech stack, listed on the detail page. */
  tech: string[];
  year: number;
  status: ProjectStatus;
  /** Marks editorial weight. Featured projects get larger grid cells. */
  featured?: boolean;
  /** Column span on the 12-col desktop grid. Controls editorial rhythm. */
  span: 4 | 5 | 6 | 7 | 8 | 12;
  /** Hex accent used to tint the generative visual. */
  accent: string;
  visual: VisualKind;
  /** Real screenshot/video media. Overrides the generative visual when set. */
  media?: ProjectMedia;
  /** Work-in-progress teaser. Renders a non-clickable card with a "진행중"
   *  placeholder instead of media, and has no detail page. */
  placeholder?: boolean;

  // --- Detail content ---
  /** Lead paragraph. Optional — when omitted, the detail page leads with `role`. */
  overview?: string;
  /** The problem framing. Optional — omit when `motivations` carries the "why". */
  problem?: string;
  /** Optional "why I built it" goals, shown where the problem would sit. */
  motivations?: { title: string; body: string }[];
  /** Optional game scenario / prologue: narration + VN-style dialogue lines. */
  prologue?: {
    intro?: string;
    lines?: { speaker: string; text: string }[];
    outro?: string;
  };
  /** Optional "how it works" diagram (image under /public) + caption. */
  diagram?: { image: string; caption?: string };
  /** Optional controls reference (games): keycaps + what each does. */
  controls?: { keys: string[]; action: string }[];
  /** Optional in-game controls card image (shown instead of the keycap grid). */
  controlsImage?: string;
  /** Optional technical strengths, surfaced as a prominent highlights section. */
  strengths?: { title: string; body: string }[];
  /** Optional external resource credits (assets referenced). */
  credits?: { source: string; use: string; license: string; href?: string }[];
  /** Optional themed image showcases (concept galleries), each its own section. */
  showcases?: {
    title: string;
    caption?: string;
    cols?: 3 | 4;
    aspect?: "square" | "wide";
    /** Render this showcase high up (right after the flow diagram) instead of near the bottom. */
    early?: boolean;
    items: { src: string; label?: string }[];
  }[];
  /** Builder's role. Optional. */
  role?: string;
  features: string[];
  outcome?: string;
  links: ProjectLink[];
  gallery: GalleryFrame[];
}

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  archived: "Archived",
  concept: "Concept",
};
