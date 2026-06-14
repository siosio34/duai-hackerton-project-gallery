"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/types";
import { STATUS_LABEL } from "@/lib/types";
import { ProjectVisual } from "./ProjectVisual";
import { Parallax } from "./Parallax";

// Desktop column span on the 12-col grid. Literal strings so Tailwind keeps them.
const SPAN: Record<Project["span"], string> = {
  4: "lg:col-span-4 md:col-span-6",
  5: "lg:col-span-5 md:col-span-6",
  6: "lg:col-span-6 md:col-span-6",
  7: "lg:col-span-7 md:col-span-12",
  8: "lg:col-span-8 md:col-span-12",
  12: "lg:col-span-12 md:col-span-12",
};

// Visual aspect ratio scales with the card's prominence.
function aspectFor(span: Project["span"]): string {
  if (span === 12) return "aspect-[16/7] sm:aspect-[16/6]";
  if (span >= 7) return "aspect-[16/10] sm:aspect-[16/9]";
  return "aspect-[4/3]";
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const reduce = useReducedMotion();
  const visual = (
    <ProjectVisual
      kind={project.visual}
      accent={project.accent}
      label={project.title}
      className="transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
    />
  );

  return (
    <motion.article
      layout
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.7,
        delay: Math.min(index * 0.05, 0.3),
        ease: [0.22, 1, 0.36, 1],
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }}
      className={`group col-span-1 ${SPAN[project.span]}`}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="block focus-visible:outline-none"
        aria-label={`${project.title}: ${project.tagline}`}
      >
        <div
          className={`relative ${aspectFor(
            project.span,
          )} overflow-hidden rounded-lg border border-line bg-paper-2`}
        >
          {project.featured ? (
            <Parallax strength={9} className="h-full w-full">
              {visual}
            </Parallax>
          ) : (
            visual
          )}

          {/* Hover scrim + read-more affordance */}
          <div className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-ink/0 to-ink/0 p-4 opacity-0 transition-opacity duration-500 group-hover:from-ink/15 group-hover:opacity-100">
            <span className="meta-label !text-paper">View project</span>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-paper text-ink">
              <Arrow />
            </span>
          </div>

          {project.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-paper/90 px-2.5 py-1 text-[0.62rem] font-medium uppercase tracking-wide text-ink backdrop-blur-sm">
              Featured
            </span>
          )}
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="display text-xl font-semibold text-ink transition-colors group-hover:text-accent-deep sm:text-2xl">
              {project.title}
            </h2>
            <p className="mt-1.5 max-w-[42ch] text-[0.95rem] leading-snug text-ink-soft">
              {project.tagline}
            </p>
          </div>
          <span className="meta-label shrink-0 tabular-nums">
            {project.year}
          </span>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
          <span className="meta-label">{project.category}</span>
          <span className="h-3 w-px bg-line-strong" aria-hidden />
          <span className="meta-label !normal-case !tracking-normal text-ink-mute">
            {project.tech.slice(0, 3).join(" · ")}
          </span>
          <span
            className={`ml-auto inline-flex items-center gap-1.5 text-[0.72rem] ${
              project.status === "live"
                ? "text-accent-deep"
                : "text-ink-mute"
            }`}
          >
            {STATUS_LABEL[project.status]}
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M3 11L11 3M11 3H5M11 3V9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
