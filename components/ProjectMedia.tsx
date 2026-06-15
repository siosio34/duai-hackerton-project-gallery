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
}: {
  project: Project;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const media = project.media;
  const fill = `h-full w-full object-cover ${className ?? ""}`;

  if (media?.video && !reduce) {
    return (
      <video
        className={fill}
        src={media.video}
        poster={media.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    );
  }

  if (media?.poster) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={fill} src={media.poster} alt="" aria-hidden />;
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
