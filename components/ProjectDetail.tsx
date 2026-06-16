"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/lib/types";
import { STATUS_LABEL } from "@/lib/types";
import { ProjectVisual } from "./ProjectVisual";
import { ProjectMedia } from "./ProjectMedia";
import { ResearchCompare } from "./ResearchCompare";
import { Parallax } from "./Parallax";

const ease = [0.22, 1, 0.36, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ProjectDetail({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const reduce = useReducedMotion();

  return (
    <article className="mx-auto max-w-[1400px] px-5 pb-10 pt-10 sm:px-8">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
      >
        <Link
          href="/#projects"
          className="meta-label link-underline inline-flex items-center gap-1.5 text-ink-soft"
        >
          <span aria-hidden>←</span> 갤러리
        </Link>

        {/* Header */}
        <header className="mt-8 grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1 className="display text-[2.5rem] font-semibold text-ink sm:text-6xl lg:text-7xl">
              {project.title}
            </h1>
            <p className="mt-4 max-w-[38ch] break-keep text-lg leading-relaxed text-ink-soft sm:text-xl">
              {project.tagline}
            </p>

            {project.links.length > 0 && (
              <div className="mt-7 flex flex-wrap gap-3">
                {project.links.map((l, i) => {
                  const external =
                    /^https?:\/\//.test(l.href) || l.href.endsWith(".html");
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className={
                        i === 0
                          ? "inline-flex items-center gap-1.5 rounded-full bg-accent-deep px-5 py-2.5 text-sm font-medium text-paper transition-transform hover:-translate-y-px"
                          : "inline-flex items-center gap-1.5 rounded-full border border-line-strong px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink"
                      }
                    >
                      {l.label}
                      <span aria-hidden className="text-xs">
                        {external ? "↗" : "↓"}
                      </span>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
          <dl className="grid grid-cols-2 gap-y-5 self-end lg:col-span-4">
            <Meta label="분류" value={project.category} />
            <Meta label="연도" value={String(project.year)} />
            <Meta label="상태" value={STATUS_LABEL[project.status]} />
            <Meta label="분야" value={project.tags[0]} />
          </dl>
        </header>
      </motion.div>

      {/* Hero visual with parallax */}
      <motion.div
        initial={reduce ? false : { opacity: 0, scale: 0.985 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.1 }}
        className="mt-10 aspect-[16/9] overflow-hidden rounded-xl border border-line bg-paper-2 sm:mt-14 sm:aspect-[16/7]"
      >
        {project.media ? (
          <ProjectMedia project={project} />
        ) : (
          <Parallax strength={10} className="h-full w-full">
            <ProjectVisual
              kind={project.visual}
              accent={project.accent}
              label={project.title}
            />
          </Parallax>
        )}
      </motion.div>

      {/* Overview + sidebar */}
      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
              {project.overview}
            </p>
          </Reveal>
        </div>

        <aside className="lg:col-span-4 lg:col-start-9">
          <Reveal delay={0.1}>
            <div className="space-y-8 border-t border-line pt-6">
              <div>
                <h2 className="meta-label">역할</h2>
                <p className="mt-2 break-keep leading-relaxed text-ink-soft">
                  {project.role}
                </p>
              </div>
              <div>
                <h2 className="meta-label">스택</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-line-strong px-3 py-1 text-sm text-ink-soft"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </aside>
      </div>

      {/* Problem */}
      <section className="mt-24 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-10 lg:grid-cols-12">
        <h2 className="meta-label lg:col-span-3">문제</h2>
        <Reveal className="lg:col-span-8 lg:col-start-5">
          <p className="max-w-[58ch] break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
            {project.problem}
          </p>
        </Reveal>
      </section>

      {/* Motivations — why it was built */}
      {project.motivations && project.motivations.length > 0 && (
        <section className="mt-24 border-t border-line pt-10">
          <h2 className="meta-label mb-10">왜 만들었나</h2>
          <ol className="divide-y divide-line border-y border-line">
            {project.motivations.map((m, i) => (
              <motion.li
                key={i}
                initial={reduce ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.05, ease }}
                className="grid grid-cols-1 gap-x-8 gap-y-2 py-7 sm:grid-cols-12"
              >
                <div className="flex items-baseline gap-3 sm:col-span-5">
                  <span className="font-mono text-sm text-accent-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="break-keep text-lg font-medium text-ink">
                    {m.title}
                  </h3>
                </div>
                <p className="break-keep leading-relaxed text-ink-soft sm:col-span-7">
                  {m.body}
                </p>
              </motion.li>
            ))}
          </ol>
        </section>
      )}

      {/* Features — editorial numbered grid, not a bullet list */}
      <section className="mt-24 border-t border-line pt-10">
        <h2 className="meta-label mb-10">기능</h2>
        <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
          {project.features.map((f, i) => (
            <motion.li
              key={i}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.55, delay: i * 0.06, ease }}
              className="flex gap-5 bg-paper p-7 sm:p-9"
            >
              <span className="font-mono text-sm text-accent-deep">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="break-keep text-base leading-relaxed text-ink">
                {f}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Outcome */}
      <section className="mt-24 border-t border-line pt-10">
        <h2 className="meta-label mb-8">성과</h2>
        <Reveal>
          <p className="max-w-[60ch] break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
            {project.outcome}
          </p>
        </Reveal>
      </section>

      {/* Gallery frames */}
      {project.gallery.length > 0 && (
        <section className="mt-24">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {project.gallery.map((g, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <figure>
                  <div className="aspect-[16/9] overflow-hidden rounded-xl border border-line bg-paper-2">
                    {g.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={g.image}
                        alt={g.caption}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                        loading="lazy"
                      />
                    ) : (
                      <Parallax strength={7} className="h-full w-full">
                        <ProjectVisual
                          kind={g.visual ?? project.visual}
                          accent={project.accent}
                        />
                      </Parallax>
                    )}
                  </div>
                  <figcaption className="mt-3 text-sm text-ink-mute">
                    {g.caption}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* Embedded A/B comparison (deep-research-report only) */}
      {project.slug === "deep-research-report" && <ResearchCompare embedded />}

      {/* Next project */}
      <Link
        href={`/projects/${next.slug}`}
        className="group mt-28 block border-t border-line pt-10"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <span className="meta-label">다음</span>
            <p className="display mt-2 text-4xl font-semibold text-ink transition-colors group-hover:text-accent-deep sm:text-6xl">
              {next.title}
            </p>
            <p className="mt-2 max-w-[40ch] text-ink-soft">{next.tagline}</p>
          </div>
          <span
            aria-hidden
            className="hidden text-4xl text-ink transition-transform duration-500 group-hover:translate-x-2 group-hover:text-accent-deep sm:block sm:text-6xl"
          >
            →
          </span>
        </div>
      </Link>
    </article>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="meta-label">{label}</dt>
      <dd className="mt-1.5 text-ink">{value}</dd>
    </div>
  );
}
