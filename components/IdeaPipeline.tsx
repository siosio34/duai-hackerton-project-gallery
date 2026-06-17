"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

// Six-stage Korea-Idea-Validator pipeline, rendered as crisp responsive DOM
// (not a scaled-down image) so the text stays readable at any width.

type Stage = {
  no: string;
  title: string;
  body: string;
  gate: string;
};

const STAGES: Stage[] = [
  {
    no: "1",
    title: "아이디어 명료화",
    body: "러프한 한 줄을 1·6 pager로 — 문제·타깃·대안·해법·차별화·수익·가설·지표로 풀어 동결한다.",
    gate: "브리프 고정",
  },
  {
    no: "2",
    title: "시장 평가",
    body: "TAM/SAM/바텀업 SOM, 경쟁사·대체재 분해, 100점 매력도 스코어. 출처 없는 추정은 가정으로 남긴다.",
    gate: "근거 출처",
  },
  {
    no: "3",
    title: "한국인 페르소나 패널",
    body: "Nemotron-Personas-Korea에서 6~12인 샘플(회의론자 포함), 각자 채택·지불 의향과 실제 사용 맥락.",
    gate: "페르소나 QA",
  },
  {
    no: "4",
    title: "LLM 카운슬",
    body: "8역할이 독립 1차 의견 → 익명 동료 랭킹 → 의장 종합(Karpathy llm-council). 모델을 역할마다 다양화.",
    gate: "합의·이견",
  },
  {
    no: "5",
    title: "한국 법률 스크린",
    body: "개인정보·전자금융·자본시장·표시광고 등에서 조항 단위 심각도와 자문 질문. 합법 단정이 아닌 이슈 스파팅.",
    gate: "BLOCKER 차단",
  },
  {
    no: "6",
    title: "빌드 준비 렌즈",
    body: "기술·데이터·신뢰·CAC/LTV·운영비·보안·B2B·문화저항 8렌즈로 채점하고 MVP 범위를 도출한다.",
    gate: "법적 경계",
  },
];

const EVIDENCE = [
  "검증된 근거",
  "합성 페르소나 가설",
  "카운슬 판단",
  "포지셔닝 가설",
  "가정",
];

export function IdeaPipeline() {
  const reduce = useReducedMotion();

  return (
    <section className="mt-24 border-t border-line pt-10">
      <h2 className="meta-label mb-3">어떻게 돌아가나</h2>
      <p className="mb-10 max-w-[64ch] break-keep leading-relaxed text-ink-soft">
        러프한 아이디어 한 줄이 GO/MODIFY/KILL 판정과 디자인 리포트가 되기까지의 여섯 단계.{" "}
        각 단계엔 게이트가 있어 통과 못 하면 무엇이 빠졌는지 알리고 멈추며, 다섯 증거 클래스는 전 과정
        분리된다.
      </p>

      {/* input chip */}
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-line-strong bg-paper-2 px-4 py-2 text-sm font-medium text-ink-soft">
        <span className="meta-label text-accent-deep">입력</span>
        아이디어 한 줄
      </div>

      {/* connected vertical flow */}
      <ol className="relative ml-[18px] border-l-2 border-line pl-7 sm:ml-[22px] sm:pl-9">
        {STAGES.map((s, i) => (
          <motion.li
            key={s.no}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.25), ease }}
            className="relative mb-4 last:mb-0"
          >
            {/* numbered node on the spine */}
            <span className="absolute -left-[calc(1.75rem+19px)] top-3 flex h-9 w-9 items-center justify-center rounded-xl bg-accent-soft font-mono text-sm font-semibold text-accent-deep sm:-left-[calc(2.25rem+20px)]">
              {s.no}
            </span>
            <div className="rounded-xl border border-line bg-paper p-5 transition-colors hover:border-line-strong sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="break-keep text-lg font-semibold text-ink">
                  {s.title}
                </h3>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-line-strong px-3 py-1 text-xs text-ink-mute">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                  게이트 · <span className="font-medium text-accent-deep">{s.gate}</span>
                </span>
              </div>
              <p className="mt-2.5 break-keep leading-relaxed text-ink-soft">
                {s.body}
              </p>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* verdict output */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, ease }}
        className="mt-4 flex flex-col gap-4 rounded-xl border border-line-strong bg-paper-2/50 p-6 sm:flex-row sm:items-center sm:gap-6"
      >
        <div className="flex shrink-0 gap-2">
          {[
            { t: "GO", c: "bg-[#dcefe3] text-[#14532d]" },
            { t: "MODIFY", c: "bg-[#fbe8d6] text-[#9a4a12]" },
            { t: "KILL", c: "bg-[#f4dcdc] text-[#9b1c1c]" },
          ].map((v) => (
            <span
              key={v.t}
              className={`rounded-lg px-3 py-1.5 text-sm font-bold ${v.c}`}
            >
              {v.t}
            </span>
          ))}
        </div>
        <p className="break-keep text-[15px] leading-relaxed text-ink-soft">
          판정 + <span className="font-medium text-ink">추적 가능한 디자인 리포트</span> — 차트(매력도
          레이더·SOM·채택vs지불·법률 심각도)와 표로, 어떤 경쟁사·사람·역할·조항에서 나왔는지까지 되짚을
          수 있게.
        </p>
      </motion.div>

      {/* evidence-class rail */}
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 border-t border-line pt-6">
        <span className="meta-label shrink-0">전 과정 분리 유지</span>
        <ul className="flex flex-wrap gap-2">
          {EVIDENCE.map((e, i) => (
            <li
              key={e}
              className="flex items-center gap-1.5 rounded-full border border-line bg-paper px-3 py-1 text-sm text-ink-soft"
            >
              <span className="font-mono text-xs text-accent-deep">
                {["①", "②", "③", "④", "⑤"][i]}
              </span>
              {e}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
