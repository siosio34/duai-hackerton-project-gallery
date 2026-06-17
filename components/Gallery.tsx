import type { Project } from "@/lib/types";
import { ProjectCard } from "./ProjectCard";

// Two top-level sections: built projects, then Claude Code skills. The grouping
// is the navigation (no category filter for this many items). Each section gets
// its own heading + count and renders the shared 12-col card grid.
function Section({
  id,
  kicker,
  title,
  blurb,
  items,
}: {
  id: string;
  kicker: string;
  title: string;
  blurb: string;
  items: Project[];
}) {
  if (items.length === 0) return null;
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-baseline justify-between gap-4 border-t border-line-strong pt-5">
        <h2 className="display text-2xl font-semibold text-ink sm:text-3xl">
          {title}
        </h2>
        <span className="meta-label tabular-nums">
          {String(items.length).padStart(2, "0")} {kicker}
        </span>
      </div>
      <p className="mt-3 max-w-[52ch] break-keep text-[0.95rem] leading-relaxed text-ink-soft">
        {blurb}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 [grid-auto-flow:dense] md:grid-cols-12">
        {items.map((project, i) => (
          <ProjectCard key={project.slug} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}

export function Gallery({ projects }: { projects: Project[] }) {
  const builtProjects = projects.filter(
    (p) => (p.section ?? "projects") === "projects",
  );
  const automation = projects.filter((p) => p.section === "automation");
  const skills = projects.filter((p) => p.section === "skills");

  return (
    <div className="mx-auto max-w-[1400px] space-y-24 px-5 pt-4 sm:px-8 sm:space-y-28">
      <Section
        id="projects"
        kicker="projects"
        title="프로젝트"
        blurb="직접 설계하고 배포한, 손에 잡히는 결과물. 열어서 플레이하거나 만져볼 수 있는 작업입니다."
        items={builtProjects}
      />
      <Section
        id="automation"
        kicker="automation"
        title="자동화"
        blurb="스크래핑·OCR·백테스트를 엮은 데이터 파이프라인. 흩어진 원천 데이터를 자동으로 모으고 검증해, 한 화면에서 읽히는 결과물로 만들어냅니다."
        items={automation}
      />
      <Section
        id="skills"
        kicker="skills"
        title="스킬"
        blurb="Claude Code로 만든 자동화 스킬. 딥 리서치 보고서 생성과 결과물 자동 개선처럼, 작업의 품질을 끌어올리는 도구들입니다."
        items={skills}
      />
    </div>
  );
}
