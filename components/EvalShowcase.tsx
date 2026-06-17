"use client";

import { Fragment, useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;
const DOC_BASE = "/media/eval-improve-skills/docs";

// ---------------------------------------------------------------------------
// FLOW — the eval → gate → improve → re-eval loop, drawn as crisp DOM (not an
// image) so the labels stay readable at any width. Mirrors IdeaPipeline's spine.
// ---------------------------------------------------------------------------

const LENSES = [
  { tag: "native", name: "Claude 서브에이전트", note: "서술 완성도" },
  { tag: "external", name: "Codex + Grok CLI", note: "로컬 · API 키 불필요" },
  { tag: "persona", name: "한국인 페르소나 패널", note: "사용자 신뢰" },
];

type Stage = { no: string; title: string; body: string; gate: string };

const STAGES: Stage[] = [
  {
    no: "1",
    title: "3렌즈 독립 채점",
    body: "서로 상관되지 않는 세 평가자 — Claude 서브에이전트(native)·로컬 Codex+Grok(external)·한국인 페르소나 패널(persona) — 이 같은 산출물을 각자 채점한다.",
    gate: "렌즈 독립성",
  },
  {
    no: "2",
    title: "결정적 게이트",
    body: "스크립트가 판정한다. 종합점수 ≥ 8.0 AND 모든 렌즈 ≥ 6.0 둘 다 충족해야 PASS — 한 렌즈라도 바닥이면 통과 불가(겉만 좋은 결과물 차단).",
    gate: "종합 8.0 · 렌즈 6.0",
  },
  {
    no: "3",
    title: "개선 에이전트",
    body: "미달이면 통합 must_fix만 반영해 고친다. artifact 모드는 결과물을 직접 덮어쓰고, skill 모드는 출력이 아니라 SKILL.md를 고쳐 다음 실행이 통과하게 만든다.",
    gate: "must_fix만 반영",
  },
];

const ROUNDS = [
  { round: 1, overall: 2.0, native: 2.0, external: 2.0, persona: 2.0, decision: "IMPROVE" },
  { round: 2, overall: 5.0, native: 6.0, external: 5.0, persona: 4.1, decision: "IMPROVE" },
  { round: 3, overall: 4.9, native: 7.0, external: 5.0, persona: 2.7, decision: "IMPROVE" },
  { round: 4, overall: 4.6, native: 6.0, external: 5.5, persona: 2.4, decision: "STOP" },
];

const DOCS = [
  {
    key: "original",
    label: "원본 기획서",
    sub: "초안 v0 · 41줄",
    file: "original.md",
    dot: "bg-ink-mute",
    note: "의도적으로 거친 1차 초안. ‘AI가 알아서 판단’·‘정확도 높이면 됨’·‘리스크는 유저 책임’ — 비교의 baseline이다.",
  },
  {
    key: "without",
    label: "스킬 안 쓴 기획서",
    sub: "1-pass 개선 · 185줄",
    file: "without-skill.md",
    dot: "bg-ink",
    note: "평가·게이트 없이 1패스로 다듬은 v1. 목차·KPI·리스크 절이 붙어 겉보기 완성도는 올라가지만, 어떤 렌즈에도 채점받지 않았다.",
  },
  {
    key: "withskill",
    label: "스킬 쓴 기획서",
    sub: "quality-gate-loop · round 2",
    file: "with-skill.md",
    dot: "bg-accent",
    note: "3렌즈 채점·게이트를 거친 최고점(round 2) 산출물. 이후 라운드에서 persona 신뢰가 더 떨어져 STOP·에스컬레이션됐고, 최고 버전을 복원했다.",
  },
];

// ---------------------------------------------------------------------------
// Minimal markdown → React. Handles headings, blockquotes, ordered/unordered
// lists (one nesting level), GFM tables, and **bold** — the only constructs the
// three plan docs use (verified: no links/code/images).
// ---------------------------------------------------------------------------

function inline(text: string, k: string): ReactNode[] {
  return text.split(/(\*\*[^*]+\*\*)/g).map((p, i) => {
    const m = p.match(/^\*\*([^*]+)\*\*$/);
    return m ? (
      <strong key={`${k}-${i}`} className="font-semibold text-ink">
        {m[1]}
      </strong>
    ) : (
      <Fragment key={`${k}-${i}`}>{p}</Fragment>
    );
  });
}

function row(line: string): string[] {
  return line
    .replace(/^\||\|$/g, "")
    .split("|")
    .map((c) => c.trim());
}

function renderMarkdown(md: string): ReactNode {
  const lines = md.replace(/\r/g, "").split("\n");
  const out: ReactNode[] = [];
  let i = 0;
  const isList = (l: string) => /^(\s*)([-*]|\d+\.)\s/.test(l);
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const k = `b${i}`;

    const h = line.match(/^(#{1,4})\s+(.*)$/);
    if (h) {
      const lvl = h[1].length;
      const txt = inline(h[2], k);
      if (lvl === 1)
        out.push(
          <h3 key={k} className="mt-7 break-keep text-xl font-semibold text-ink first:mt-0 sm:text-2xl">
            {txt}
          </h3>,
        );
      else if (lvl === 2)
        out.push(
          <h4 key={k} className="mt-7 break-keep border-t border-line pt-5 text-lg font-semibold text-ink first:mt-0 first:border-0 first:pt-0">
            {txt}
          </h4>,
        );
      else
        out.push(
          <h5 key={k} className="mt-5 break-keep text-[0.95rem] font-semibold text-ink-soft">
            {txt}
          </h5>,
        );
      i++;
      continue;
    }

    if (line.startsWith(">")) {
      const buf: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        buf.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      out.push(
        <blockquote key={k} className="mt-4 break-keep border-l-2 border-accent/40 bg-paper-2/50 py-2.5 pl-4 text-[0.95rem] leading-relaxed text-ink-mute">
          {buf.map((b, j) => (
            <span key={j} className="block">
              {inline(b, `${k}-${j}`)}
            </span>
          ))}
        </blockquote>,
      );
      continue;
    }

    if (line.startsWith("|") && i + 1 < lines.length && /^\|[\s:|-]+\|?\s*$/.test(lines[i + 1])) {
      const head = row(line);
      i += 2;
      const body: string[][] = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        body.push(row(lines[i]));
        i++;
      }
      out.push(
        <div key={k} className="mt-4 overflow-x-auto rounded-lg border border-line">
          <table className="w-full min-w-[460px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-line-strong bg-paper-2/60 text-left">
                {head.map((c, j) => (
                  <th key={j} className="px-3.5 py-2.5 font-medium text-ink">
                    {inline(c, `${k}h${j}`)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri} className={ri % 2 ? "bg-paper-2/30" : undefined}>
                  {r.map((c, ci) => (
                    <td key={ci} className="break-keep px-3.5 py-2.5 align-top text-ink-soft">
                      {inline(c, `${k}r${ri}c${ci}`)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>,
      );
      continue;
    }

    if (isList(line)) {
      const items: { indent: number; text: string }[] = [];
      const ordered = /^\s*\d+\./.test(line);
      while (i < lines.length && isList(lines[i])) {
        const m = lines[i].match(/^(\s*)([-*]|\d+\.)\s+(.*)$/)!;
        items.push({ indent: m[1].length, text: m[3] });
        i++;
      }
      const nodes: ReactNode[] = [];
      for (let j = 0; j < items.length; j++) {
        if (items[j].indent >= 2) continue;
        const kids: { indent: number; text: string }[] = [];
        let n = j + 1;
        while (n < items.length && items[n].indent >= 2) {
          kids.push(items[n]);
          n++;
        }
        nodes.push(
          <li key={j} className="break-keep leading-relaxed text-ink-soft">
            {inline(items[j].text, `${k}-${j}`)}
            {kids.length > 0 && (
              <ul className="mt-1.5 ml-4 list-disc space-y-1 marker:text-ink-mute">
                {kids.map((c, ci) => (
                  <li key={ci} className="break-keep leading-relaxed text-ink-mute">
                    {inline(c.text, `${k}-${j}-${ci}`)}
                  </li>
                ))}
              </ul>
            )}
          </li>,
        );
      }
      out.push(
        ordered ? (
          <ol key={k} className="mt-3 ml-5 list-decimal space-y-1.5 marker:text-accent-deep">
            {nodes}
          </ol>
        ) : (
          <ul key={k} className="mt-3 ml-5 list-disc space-y-1.5 marker:text-ink-mute">
            {nodes}
          </ul>
        ),
      );
      continue;
    }

    const buf: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{1,4})\s/.test(lines[i]) &&
      !lines[i].startsWith(">") &&
      !lines[i].startsWith("|") &&
      !isList(lines[i])
    ) {
      buf.push(lines[i]);
      i++;
    }
    out.push(
      <p key={k} className="mt-3 break-keep leading-relaxed text-ink-soft">
        {inline(buf.join(" "), k)}
      </p>,
    );
  }
  return out;
}

function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function EvalShowcase() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<string>("withskill");
  const [docs, setDocs] = useState<Record<string, string>>({});

  useEffect(() => {
    let alive = true;
    Promise.all(
      DOCS.map((d) =>
        fetch(`${DOC_BASE}/${d.file}`)
          .then((r) => (r.ok ? r.text() : ""))
          .then((t) => [d.key, t] as const)
          .catch(() => [d.key, ""] as const),
      ),
    ).then((pairs) => {
      if (alive) setDocs(Object.fromEntries(pairs));
    });
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      {/* ---- Flow diagram ---- */}
      <section className="mt-24 border-t border-line pt-10">
        <h2 className="meta-label mb-3">어떻게 돌아가나</h2>
        <p className="mb-10 max-w-[64ch] break-keep leading-relaxed text-ink-soft">
          결과물(또는 스킬)이 기준을 통과할 때까지 <span className="text-ink">채점 → 게이트 → 개선 → 재채점</span>을 자동으로
          돈다. 핵심은 서로 상관되지 않는 세 렌즈로 채점하고, 통과 여부는 사람 감이 아니라 결정적 스크립트가 판정한다는 것.
        </p>

        {/* input */}
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper-2 px-4 py-2 text-sm font-medium text-ink-soft">
          <span className="meta-label text-accent-deep">입력</span>
          결과물 또는 스킬
        </div>

        {/* spine */}
        <ol className="relative ml-[18px] border-l-2 border-line pl-7 sm:ml-[22px] sm:pl-9">
          {STAGES.map((s, i) => (
            <motion.li
              key={s.no}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.2), ease }}
              className="relative mb-4 last:mb-0"
            >
              <span className="absolute -left-[calc(1.75rem+19px)] top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent-deep sm:-left-[calc(2.25rem+20px)]">
                {s.no}
              </span>
              <div className="rounded-xl border border-line bg-paper p-5 transition-colors hover:border-line-strong sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="break-keep text-lg font-semibold text-ink">{s.title}</h3>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1 text-xs text-ink-mute">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                    게이트 · <span className="font-medium text-accent-deep">{s.gate}</span>
                  </span>
                </div>
                <p className="mt-2.5 break-keep leading-relaxed text-ink-soft">{s.body}</p>
                {s.no === "1" && (
                  <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {LENSES.map((l) => (
                      <div key={l.tag} className="rounded-lg border border-line bg-paper-2/50 px-3 py-2.5">
                        <p className="font-mono text-xs text-accent-deep">{l.tag}</p>
                        <p className="mt-1 break-keep text-sm font-medium text-ink">{l.name}</p>
                        <p className="break-keep text-xs text-ink-mute">{l.note}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ol>

        {/* loop-back hint */}
        <div className="ml-[18px] flex items-center gap-2 py-3 pl-7 text-sm text-ink-mute sm:ml-[22px] sm:pl-9">
          <span aria-hidden className="text-accent-deep">↻</span>
          미달이면 1번으로 되돌아가 재채점 — PASS 또는 상한까지 반복.
        </div>

        {/* terminal outcomes */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, ease }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          <div className="rounded-xl border border-line bg-paper-2/50 p-6">
            <span className="rounded-lg bg-[#dcefe3] px-3 py-1.5 text-sm font-bold text-[#14532d]">PASS</span>
            <p className="mt-3 break-keep text-[15px] leading-relaxed text-ink-soft">
              기준 통과. 그래도 상한까지 최고점을 좇되, 최종본은 가장 잘 나온 버전을 복원한다.
            </p>
          </div>
          <div className="rounded-xl border border-line-strong bg-paper p-6">
            <span className="rounded-lg bg-[#f4dcdc] px-3 py-1.5 text-sm font-bold text-[#9b1c1c]">STOP · 에스컬레이션</span>
            <p className="mt-3 break-keep text-[15px] leading-relaxed text-ink-soft">
              한 렌즈가 바닥에서 정체하면 점수를 부풀리지 않고 멈춘다. 텍스트로 못 고치는 신뢰·설계 문제는 사람에게 넘긴다.
            </p>
          </div>
        </motion.div>
      </section>

      {/* ---- Rounds — the measured divergence ---- */}
      <section className="mt-24 border-t border-line pt-10">
        <h2 className="meta-label mb-3">실측 — 라운드별 점수</h2>
        <p className="mb-8 max-w-[64ch] break-keep leading-relaxed text-ink-soft">
          ‘AI 자동매매 봇 기획서’를 스킬로 돌린 4라운드. 개선할수록 <span className="text-ink">native(완성도)는 2→7</span>로
          올랐지만 <span className="text-ink">persona(사용자 신뢰)는 4.1→2.4</span>로 떨어졌다 — 디테일·헤지가 늘수록 일반
          사용자는 리스크가 더 잘 보여 신뢰를 덜 했다. 단일 렌즈였다면 못 봤을 괴리를 게이트가 잡아 정직하게 STOP했다.
        </p>
        <Reveal>
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[520px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line-strong text-left">
                  <th className="px-4 py-3 font-medium text-ink">라운드</th>
                  <th className="px-4 py-3 text-right font-medium text-ink">종합</th>
                  <th className="px-4 py-3 text-right font-medium text-ink-mute">native</th>
                  <th className="px-4 py-3 text-right font-medium text-ink-mute">external</th>
                  <th className="px-4 py-3 text-right font-medium text-accent-deep">persona</th>
                  <th className="px-4 py-3 text-right font-medium text-ink">판정</th>
                </tr>
              </thead>
              <tbody>
                {ROUNDS.map((r) => (
                  <tr key={r.round} className={r.round === 2 ? "bg-accent-soft/40" : r.round % 2 ? "bg-paper-2/30" : undefined}>
                    <td className="px-4 py-3 align-top text-ink">
                      R{r.round}
                      {r.round === 2 && <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[0.7rem] font-medium text-accent-deep">최고점</span>}
                    </td>
                    <td className="px-4 py-3 text-right align-top font-mono tabular-nums text-ink">{r.overall.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right align-top font-mono tabular-nums text-ink-soft">{r.native.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right align-top font-mono tabular-nums text-ink-soft">{r.external.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right align-top font-mono tabular-nums font-semibold text-accent-deep">{r.persona.toFixed(1)}</td>
                    <td className="px-4 py-3 text-right align-top">
                      <span className={`font-mono text-xs font-semibold ${r.decision === "STOP" ? "text-[#9b1c1c]" : "text-ink-mute"}`}>
                        {r.decision}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <p className="mt-4 break-keep text-sm leading-relaxed text-ink-mute">
          게이트 기준 — 종합 ≥ 8.0 AND 모든 렌즈 ≥ 6.0. 3라운드 연속 persona가 바닥에서 정체해 round 4에서 STOP·에스컬레이션,
          최고점인 round 2 버전을 복원했다. (합성 페르소나·LLM council 점수는 방향성 신호로, 실제 시장 검증을 대체하지 않는다.)
        </p>
      </section>

      {/* ---- Three plans, in one place ---- */}
      <section className="mt-24 border-t border-line pt-10">
        <h2 className="meta-label mb-3">세 기획서 한눈에</h2>
        <p className="mb-8 max-w-[64ch] break-keep leading-relaxed text-ink-soft">
          같은 초안에서 갈라진 세 문서를 한 자리에서 읽는다 — 거친 <span className="text-ink">원본 초안</span>, 평가 없이 1패스로
          다듬은 <span className="text-ink">스킬 미사용</span>, 3렌즈 게이트를 거친 <span className="text-ink">스킬 사용</span> 최고점본.
        </p>

        {/* tabs */}
        <div className="flex flex-wrap gap-2">
          {DOCS.map((d) => {
            const on = active === d.key;
            return (
              <button
                key={d.key}
                onClick={() => setActive(d.key)}
                aria-pressed={on}
                className={`group flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left transition-colors ${
                  on ? "border-accent-deep bg-paper" : "border-line bg-paper-2/50 hover:border-line-strong"
                }`}
              >
                <span className={`inline-block h-2 w-2 rounded-full ${d.dot}`} aria-hidden />
                <span>
                  <span className={`block text-sm font-medium ${on ? "text-ink" : "text-ink-soft"}`}>{d.label}</span>
                  <span className="block font-mono text-[0.7rem] text-ink-mute">{d.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* active doc */}
        {DOCS.filter((d) => d.key === active).map((d) => (
          <div key={d.key} className="mt-6">
            <div className="mb-4 flex items-start gap-3 rounded-xl border border-line bg-paper-2/50 px-5 py-4">
              <span className={`mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full ${d.dot}`} aria-hidden />
              <p className="break-keep text-sm leading-relaxed text-ink-soft">{d.note}</p>
            </div>
            <div className="max-h-[640px] overflow-y-auto rounded-xl border border-line bg-paper px-6 py-7 sm:px-9 sm:py-9">
              {docs[d.key] === undefined ? (
                <p className="text-sm text-ink-mute">문서를 불러오는 중…</p>
              ) : docs[d.key] === "" ? (
                <p className="text-sm text-ink-mute">
                  문서를 불러오지 못했다.{" "}
                  <a href={`${DOC_BASE}/${d.file}`} target="_blank" rel="noreferrer" className="link-underline text-ink-soft">
                    원문 .md ↗
                  </a>
                </p>
              ) : (
                <div className="max-w-[68ch]">{renderMarkdown(docs[d.key])}</div>
              )}
            </div>
            <p className="mt-3 text-right">
              <a href={`${DOC_BASE}/${d.file}`} target="_blank" rel="noreferrer" className="link-underline text-sm text-ink-mute">
                원문 .md ↗
              </a>
            </p>
          </div>
        ))}
      </section>
    </>
  );
}
