"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// Eval-Improve flow as crisp responsive DOM. Unlike a linear pipeline this is a
// LOOP: score (3 lenses) -> deterministic gate -> improve -> re-score, until
// PASS or a round cap, then restore the best version.

const LENSES = [
  { k: "native", d: "Claude 서브에이전트" },
  { k: "external", d: "Codex + Grok CLI (API 키 불필요)" },
  { k: "persona", d: "한국인 페르소나 패널 (한국 타깃 시)" },
];

const LOOP = [
  {
    no: "1",
    title: "3렌즈 독립 채점",
    body: "서로 상관 없는 세 평가자로 병렬 채점한다. 단일 모델의 긍정 편향을 깨고, 렌즈 간 점수 괴리 자체를 신호로 본다.",
  },
  {
    no: "2",
    title: "결정적 게이트",
    body: "스크립트로 판정 — 종합점수 ≥ threshold(기본 8.0) AND 모든 렌즈 ≥ floor(기본 6.0) 둘 다 충족해야 PASS. 한 렌즈라도 바닥이면 통과 불가.",
  },
  {
    no: "3",
    title: "개선 에이전트",
    body: "미달이면 통합 must_fix만 반영. artifact 모드는 결과물을 직접 덮어쓰고, skill 모드는 출력이 아니라 SKILL.md를 고친다. 모델 폴백으로 루프가 안 끊긴다.",
  },
];

export function EvalImprovePipeline() {
  const reduce = useReducedMotion();

  return (
    <section className="mt-24 border-t border-line pt-10">
      <h2 className="meta-label mb-3">어떻게 돌아가나</h2>
      <p className="mb-10 max-w-[66ch] break-keep leading-relaxed text-ink-soft">
        선형 파이프라인이 아니라 루프다 — 3렌즈로 채점하고, 결정적 게이트로 판정하고, 미달이면 고쳐서
        다시 채점한다. PASS하거나 라운드 상한에 닿을 때까지 돌고, 마지막엔 가장 잘 나온 버전을 복원한다.
      </p>

      {/* input */}
      <div className="mb-3 inline-flex flex-wrap items-center gap-2 rounded-full border border-line-strong bg-paper-2 px-4 py-2 text-sm font-medium text-ink-soft">
        <span className="meta-label text-accent-deep">입력</span>
        산출물(보고서·기획서·카피·코드) 또는 스킬 — 두 모드
      </div>

      {/* the loop */}
      <div className="relative rounded-2xl border border-line-strong bg-paper-2/40 p-5 sm:p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 font-mono text-xs font-semibold text-accent-deep">
            <span aria-hidden>↻</span> 평가 · 개선 루프
          </span>
          <span className="break-keep text-xs text-ink-mute">
            PASS 또는 라운드 상한까지 반복
          </span>
        </div>

        <ol className="space-y-3">
          {LOOP.map((s, i) => (
            <motion.li
              key={s.no}
              initial={reduce ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: Math.min(i * 0.06, 0.2), ease }}
              className="rounded-xl border border-line bg-paper p-5 sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent-deep">
                  {s.no}
                </span>
                <div className="min-w-0">
                  <h3 className="break-keep text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 break-keep leading-relaxed text-ink-soft">
                    {s.body}
                  </p>
                  {s.no === "1" && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {LENSES.map((l) => (
                        <li
                          key={l.k}
                          className="rounded-md border border-line-strong bg-paper-2/60 px-2.5 py-1 text-xs text-ink-soft"
                        >
                          <span className="font-mono text-accent-deep">{l.k}</span>
                          <span className="mx-1.5 text-line-strong">·</span>
                          {l.d}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </motion.li>
          ))}
        </ol>

        {/* loop-back indicator */}
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-dashed border-line-strong px-4 py-2.5 text-sm text-ink-mute">
          <span aria-hidden className="font-mono text-accent-deep">↺</span>
          <span className="break-keep">
            <span className="font-medium text-accent-deep">미달</span>이면 3 → 1로 되돌아가 재평가 — 점수가
            오르는 한 라운드를 반복한다.
          </span>
        </div>
      </div>

      {/* exit → restore → output */}
      <div className="mt-3 flex items-center gap-3 pl-1 text-sm text-ink-mute">
        <span aria-hidden className="font-mono">↓</span>
        <span className="break-keep">
          <span className="font-medium text-ink-soft">PASS</span> 또는 라운드 상한 도달
        </span>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease }}
        className="mt-3 rounded-xl border border-line-strong bg-paper p-5 sm:p-6"
      >
        <div className="flex items-start gap-4">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent-deep">
            ✓
          </span>
          <div>
            <h3 className="break-keep text-lg font-semibold text-ink">
              종료 &amp; 최고점 복원
            </h3>
            <p className="mt-2 break-keep leading-relaxed text-ink-soft">
              PASS를 넘겨서도 최고점을 끝까지 좇되, 최종본은 가장 잘 나온 버전을 복원한다. 텍스트로 못
              고치는 신뢰·설계 문제는 점수를 부풀리지 않고 정직하게 멈춰 사람에게 에스컬레이션한다.
            </p>
          </div>
        </div>
      </motion.div>

      {/* two modes rail */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-line pt-6 sm:grid-cols-2">
        <div className="rounded-xl border border-line bg-paper p-4">
          <p className="meta-label mb-1.5 text-accent-deep">artifact 모드</p>
          <p className="break-keep text-sm leading-relaxed text-ink-soft">
            결과물만 있을 때 — must_fix를 반영해 <span className="text-ink">결과물을 직접 덮어쓰고</span>{" "}
            재평가, PASS/상한까지.
          </p>
        </div>
        <div className="rounded-xl border border-line bg-paper p-4">
          <p className="meta-label mb-1.5 text-accent-deep">skill 모드</p>
          <p className="break-keep text-sm leading-relaxed text-ink-soft">
            입력이 스킬일 때 — 출력은 일회용, 손은 <span className="text-ink">SKILL.md(생성기)</span>에.
            가장 낮은 렌즈로 게이트해 일반화해야만 통과.
          </p>
        </div>
      </div>
    </section>
  );
}
