import type { VisualKind } from "@/lib/types";

// ---------------------------------------------------------------------------
// ProjectVisual
// Deterministic, data-driven SVG art used in place of screenshots. Each kind
// is an abstract brand composition tinted by the project's accent over paper.
// Pure server component, no client JS. Decorative (aria-hidden by caller).
// ---------------------------------------------------------------------------

interface Props {
  kind: VisualKind;
  accent: string;
  /** Optional label rendered as a faint glyph/specimen (used by `glyph`). */
  label?: string;
  className?: string;
}

const PAPER = "#ece8dd";
const PAPER_DEEP = "#e2ddce";
const INK = "#16140f";

export function ProjectVisual({ kind, accent, label, className }: Props) {
  return (
    <div className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
        role="presentation"
      >
        <rect width="400" height="300" fill={PAPER} />
        {kind === "strata" && <Strata accent={accent} />}
        {kind === "mesh" && <Mesh accent={accent} />}
        {kind === "grid" && <Grid accent={accent} />}
        {kind === "orbit" && <Orbit accent={accent} />}
        {kind === "glyph" && <Glyph accent={accent} label={label} />}
        {kind === "scan" && <Scan accent={accent} />}
      </svg>
    </div>
  );
}

// Layered topographic bands. For data / fleet / field work.
function Strata({ accent }: { accent: string }) {
  const lines = Array.from({ length: 9 }, (_, i) => {
    const y = 40 + i * 26;
    const amp = 10 + i * 1.6;
    return `M -10 ${y} C 90 ${y - amp}, 150 ${y + amp}, 240 ${y - amp / 2} S 410 ${y + amp}, 410 ${y}`;
  });
  return (
    <g fill="none">
      <rect width="400" height="300" fill={PAPER_DEEP} opacity="0.5" />
      {lines.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={i === 4 ? accent : INK}
          strokeWidth={i === 4 ? 2.4 : 1}
          opacity={i === 4 ? 0.95 : 0.18 + i * 0.02}
        />
      ))}
      <circle cx="240" cy="118" r="5" fill={accent} />
    </g>
  );
}

// Soft layered fields (not AI-purple — tinted to the project accent + neutrals).
function Mesh({ accent }: { accent: string }) {
  return (
    <g>
      <defs>
        <radialGradient id="m1" cx="28%" cy="32%" r="60%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.85" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="m2" cx="78%" cy="70%" r="55%">
          <stop offset="0%" stopColor={INK} stopOpacity="0.5" />
          <stop offset="100%" stopColor={INK} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="300" fill="url(#m1)" />
      <rect width="400" height="300" fill="url(#m2)" />
      {Array.from({ length: 6 }, (_, i) => (
        <circle
          key={i}
          cx={60 + i * 56}
          cy={150 + Math.sin(i * 1.3) * 60}
          r={2}
          fill={INK}
          opacity={0.25}
        />
      ))}
    </g>
  );
}

// Modular dot/line grid with a few activated nodes. For systems / tooling.
function Grid({ accent }: { accent: string }) {
  const cols = 11;
  const rows = 8;
  const gx = 400 / (cols + 1);
  const gy = 300 / (rows + 1);
  const active = new Set(["3-2", "7-4", "5-5", "8-1"]);
  const dots = [];
  for (let r = 1; r <= rows; r++) {
    for (let c = 1; c <= cols; c++) {
      const key = `${c}-${r}`;
      const on = active.has(key);
      dots.push(
        <circle
          key={key}
          cx={c * gx}
          cy={r * gy}
          r={on ? 4 : 1.4}
          fill={on ? accent : INK}
          opacity={on ? 1 : 0.22}
        />,
      );
    }
  }
  return (
    <g>
      <line x1={3 * gx} y1={2 * gy} x2={5 * gx} y2={5 * gy} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      <line x1={5 * gx} y1={5 * gy} x2={7 * gx} y2={4 * gy} stroke={accent} strokeWidth="1.5" opacity="0.6" />
      {dots}
    </g>
  );
}

// Concentric arcs / orbits. For graphs, maps, networks.
function Orbit({ accent }: { accent: string }) {
  return (
    <g fill="none" stroke={INK}>
      {[40, 72, 104, 136].map((r, i) => (
        <circle
          key={r}
          cx="150"
          cy="150"
          r={r}
          strokeWidth={i === 1 ? 2 : 1}
          stroke={i === 1 ? accent : INK}
          opacity={i === 1 ? 0.9 : 0.2}
        />
      ))}
      <circle cx="150" cy="150" r="5" fill={accent} stroke="none" />
      <circle cx={150 + 72} cy="150" r="4" fill={INK} stroke="none" opacity="0.8" />
      <circle cx={150} cy={150 - 104} r="3.5" fill={INK} stroke="none" opacity="0.6" />
      <circle cx={150 - 136} cy={150} r="3" fill={accent} stroke="none" />
      <line x1="150" y1="150" x2={150 + 72} y2="150" stroke={accent} strokeWidth="1" opacity="0.5" />
    </g>
  );
}

// Oversized typographic specimen. For editors, writing, type-led work.
function Glyph({ accent, label }: { accent: string; label?: string }) {
  const ch = (label ?? "A").charAt(0).toUpperCase();
  return (
    <g>
      <rect width="400" height="300" fill={PAPER_DEEP} opacity="0.4" />
      <text
        x="200"
        y="210"
        textAnchor="middle"
        fontSize="240"
        fontWeight="600"
        letterSpacing="-0.05em"
        fill={INK}
        opacity="0.92"
        style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
      >
        {ch}
      </text>
      <rect x="40" y="48" width="60" height="6" fill={accent} />
      <rect x="40" y="62" width="32" height="6" fill={INK} opacity="0.25" />
    </g>
  );
}

// Diagonal scan / waveform. For analytics, signal, privacy infra.
function Scan({ accent }: { accent: string }) {
  const bars = Array.from({ length: 30 }, (_, i) => {
    const x = 18 + i * 12.4;
    const h = 24 + Math.abs(Math.sin(i * 0.7) * 120) + (i % 5) * 6;
    return { x, h };
  });
  return (
    <g>
      <rect width="400" height="300" fill={PAPER_DEEP} opacity="0.4" />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={250 - b.h}
          width="5"
          height={b.h}
          fill={i % 7 === 3 ? accent : INK}
          opacity={i % 7 === 3 ? 0.95 : 0.22}
        />
      ))}
      <line x1="0" y1="250" x2="400" y2="250" stroke={INK} strokeWidth="1" opacity="0.3" />
    </g>
  );
}
