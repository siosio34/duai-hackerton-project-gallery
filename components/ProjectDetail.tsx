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

      {/* Cinematic — the game's intro prologue (portrait-aware), shown up top */}
      {project.media?.cinematic && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="meta-label mb-8">시네마틱 프롤로그</h2>
          <Reveal>
            <figure className="flex flex-col items-center">
              <div
                className={`w-full overflow-hidden rounded-xl border border-line bg-ink ${
                  project.media.cinematic.portrait
                    ? "aspect-[3/4] max-w-[420px]"
                    : "aspect-[16/9]"
                }`}
              >
                <video
                  className="h-full w-full object-cover"
                  src={project.media.cinematic.src}
                  poster={project.media.cinematic.poster}
                  controls
                  playsInline
                  preload="none"
                />
              </div>
              <figcaption className="mt-3 max-w-[44ch] break-keep text-center text-sm text-ink-mute">
                게임을 시작하면 흐르는 프롤로그. 슬럼의 두두가 비트코인 한 닢을
                만나며 이야기가 열린다. (소리 포함)
              </figcaption>
            </figure>
          </Reveal>
        </section>
      )}

      {/* Prologue — game scenario / VN dialogue */}
      {project.prologue && (
        <section className="mt-24 border-t border-line pt-10">
          <h2 className="meta-label mb-8">이야기</h2>
          <div className="max-w-[64ch]">
            {project.prologue.intro && (
              <Reveal>
                <p className="break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
                  {project.prologue.intro}
                </p>
              </Reveal>
            )}
            {project.prologue.lines && project.prologue.lines.length > 0 && (
              <Reveal delay={0.05}>
                <div className="mt-8 space-y-4 border-l-2 border-accent/40 pl-6">
                  {project.prologue.lines.map((l, i) => (
                    <p key={i} className="break-keep leading-relaxed">
                      <span className="mr-3 font-mono text-xs uppercase tracking-wide text-accent-deep">
                        {l.speaker}
                      </span>
                      <span className="text-[1.05rem] text-ink-soft">
                        {l.text}
                      </span>
                    </p>
                  ))}
                </div>
              </Reveal>
            )}
            {project.prologue.outro && (
              <Reveal delay={0.1}>
                <p className="mt-8 break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
                  {project.prologue.outro}
                </p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Lead (overview or role) + stack — falls back to a slim stack band */}
      {project.overview || project.role ? (
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
                {project.overview ?? project.role}
              </p>
            </Reveal>
          </div>

          <aside className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.1}>
              <div className="space-y-8 border-t border-line pt-6">
                {project.overview && project.role && (
                  <div>
                    <h2 className="meta-label">역할</h2>
                    <p className="mt-2 break-keep leading-relaxed text-ink-soft">
                      {project.role}
                    </p>
                  </div>
                )}
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
      ) : (
        <div className="mt-12 border-t border-line pt-6">
          <h2 className="meta-label mb-3">스택</h2>
          <ul className="flex flex-wrap gap-2">
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
      )}

      {/* Problem */}
      {project.problem && (
        <section className="mt-24 grid grid-cols-1 gap-x-8 gap-y-6 border-t border-line pt-10 lg:grid-cols-12">
          <h2 className="meta-label lg:col-span-3">문제</h2>
          <Reveal className="lg:col-span-8 lg:col-start-5">
            <p className="max-w-[58ch] break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
              {project.problem}
            </p>
          </Reveal>
        </section>
      )}

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

      {/* How it works — pipeline diagram */}
      {project.diagram && (
        <section className="mt-24 border-t border-line pt-10">
          <h2 className="meta-label mb-8">어떻게 돌아가나</h2>
          <Reveal>
            <figure>
              <div className="overflow-hidden rounded-xl border border-line bg-paper-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.diagram.image}
                  alt="딥리서치 스킬 파이프라인 다이어그램"
                  className="w-full"
                  loading="lazy"
                />
              </div>
              {project.diagram.caption && (
                <figcaption className="mt-3 break-keep text-sm text-ink-mute">
                  {project.diagram.caption}
                </figcaption>
              )}
            </figure>
          </Reveal>
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
      {project.outcome && (
        <section className="mt-24 border-t border-line pt-10">
          <h2 className="meta-label mb-8">성과</h2>
          <Reveal>
            <p className="max-w-[60ch] break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
              {project.outcome}
            </p>
          </Reveal>
        </section>
      )}

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

      {/* Themed showcases (concept galleries) */}
      {project.showcases?.map((sc) => (
        <section key={sc.title} className="mt-24 border-t border-line pt-10">
          <h2 className="meta-label mb-3">{sc.title}</h2>
          {sc.caption && (
            <p className="mb-9 max-w-[62ch] break-keep leading-relaxed text-ink-soft">
              {sc.caption}
            </p>
          )}
          <div
            className={`grid grid-cols-2 gap-5 ${
              sc.cols === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
            }`}
          >
            {sc.items.map((it, i) => (
              <motion.figure
                key={it.src}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease }}
              >
                <div
                  className={`${
                    sc.aspect === "wide" ? "aspect-[16/10]" : "aspect-square"
                  } overflow-hidden rounded-xl border border-line bg-paper-2`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    alt={it.label ?? ""}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.04]"
                  />
                </div>
                {it.label && (
                  <figcaption className="mt-2.5 break-keep text-sm text-ink-mute">
                    {it.label}
                  </figcaption>
                )}
              </motion.figure>
            ))}
          </div>
        </section>
      ))}

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
