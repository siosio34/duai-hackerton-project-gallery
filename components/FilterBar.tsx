"use client";

import { motion } from "motion/react";

// Category filter as a row of accessible toggle chips. Uses a shared layoutId
// so the active indicator slides between chips (motivated: feedback for the
// current filter). Horizontally scrollable on mobile.
export function FilterBar({
  categories,
  active,
  onChange,
  total,
  shown,
}: {
  categories: string[];
  active: string;
  onChange: (c: string) => void;
  total: number;
  shown: number;
}) {
  return (
    <div className="sticky top-16 z-30 -mx-5 mb-10 border-y border-line bg-paper/85 px-5 py-3 backdrop-blur-md sm:-mx-8 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4">
        <ul
          className="flex flex-1 items-center gap-1.5 overflow-x-auto"
          role="group"
          aria-label="Filter projects by category"
          style={{ scrollbarWidth: "none" }}
        >
          {categories.map((cat) => {
            const isActive = cat === active;
            return (
              <li key={cat} className="shrink-0">
                <button
                  type="button"
                  onClick={() => onChange(cat)}
                  aria-pressed={isActive}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "text-paper"
                      : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-ink"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 whitespace-nowrap">{cat}</span>
                </button>
              </li>
            );
          })}
        </ul>
        <span
          className="meta-label hidden shrink-0 tabular-nums sm:block"
          aria-live="polite"
        >
          {shown === total ? `${total} projects` : `${shown} of ${total}`}
        </span>
      </div>
    </div>
  );
}
