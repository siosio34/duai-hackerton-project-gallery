"use client";

import { useReducedMotion } from "motion/react";
import type { Project } from "@/lib/types";
import { ProjectVisual } from "./ProjectVisual";

// Renders a project's real media when present (looping video → poster image),
// otherwise falls back to the deterministic generative visual. Respects
// prefers-reduced-motion by showing the poster still instead of autoplaying.
export function ProjectMedia({
  project,
  className,
  card = false,
}: {
  project: Project;
  className?: string;
  /** Card context prefers the designed `thumbnail`; the hero ignores it. */
  card?: boolean;
}) {
  const reduce = useReducedMotion();
  const media = project.media;
  const fill = `h-full w-full object-cover ${className ?? ""}`;

  if (media?.video && !reduce) {
    return (
      <video
        className={fill}
        src={media.video}
        poster={media.poster ?? media.thumbnail}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }

  const still = card ? media?.thumbnail ?? media?.poster : media?.poster;
  if (still) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={fill} src={still} alt="" aria-hidden />;
  }

  return (
    <ProjectVisual
      kind={project.visual}
      accent={project.accent}
      label={project.title}
      className={className}
    />
  );
}
