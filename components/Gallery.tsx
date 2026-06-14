"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Project } from "@/lib/types";
import { FilterBar } from "./FilterBar";
import { ProjectCard } from "./ProjectCard";

export function Gallery({
  projects,
  categories,
}: {
  projects: Project[];
  categories: string[];
}) {
  const [active, setActive] = useState("All");

  const shown = useMemo(
    () =>
      active === "All"
        ? projects
        : projects.filter((p) => p.category === active),
    [active, projects],
  );

  return (
    <section className="mx-auto max-w-[1400px] px-5 sm:px-8" id="work">
      <h2 className="meta-label mb-3">Selected work</h2>

      <FilterBar
        categories={categories}
        active={active}
        onChange={setActive}
        total={projects.length}
        shown={shown.length}
      />

      <motion.div
        layout
        className="grid grid-cols-1 gap-x-6 gap-y-12 [grid-auto-flow:dense] md:grid-cols-12"
      >
        <AnimatePresence mode="popLayout">
          {shown.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {shown.length === 0 && (
        <p className="py-24 text-center text-ink-mute">
          No projects in this category yet.
        </p>
      )}
    </section>
  );
}
