"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const ASSET = "/media/research-ai-skills/compare";

// ---------------------------------------------------------------------------
// DATA — sourced verbatim from research/20260615-rubin-korea-beneficiary/
// metrics.json (single source) + comparison.html. Numbers are measured, not
// estimated; see the methodology note at the foot of the page.
// ---------------------------------------------------------------------------

// Headline deltas surfaced as large stats (the four that change a decision).
const HEADLINES = [
  { ratio: "24.5×", label: "소요 시간", from: "2.1분", to: "51.8분" },
  { ratio: "13.6×", label: "본문 인용", from: "12", to: "163" },
  { ratio: "11.8×", label: "고유 출처", from: "9", to: "106" },
  { ratio: "0 → 4", label: "적대적 검증 라운드", from: "검증 없음", to: "+ council 2" },
];

type Row = { metric: string; note?: string; ctrl: string; exp: string; expNote?: string; gap: string };

const ROWS: Row[] = [
  { metric: "소요 시간", ctrl: "2.1분 (127초)", exp: "51.8분 (3,110초)", gap: "24.5×" },
  { metric: "한글 자수", ctrl: "1,210자", exp: "14,257자", gap: "11.8×" },
  { metric: "어절 수", ctrl: "551", exp: "7,185", gap: "13.0×" },
  { metric: "생성 토큰 (output)", note: "메인 오케스트레이터 실측", ctrl: "28,383", exp: "472,973", expNote: "+ 서브에이전트 별도", gap: "16.7×" },
  { metric: "총 처리 토큰", note: "캐시 read 포함, 실측", ctrl: "1,158,423", exp: "44,860,473", gap: "38.7×" },
  { metric: "서브에이전트 토큰", ctrl: "0", exp: "977,642", expNote: "20개 실측 합", gap: "스킬에만" },
  { metric: "API 환산 비용", note: "Opus 4.8 종량제 단가 · 구독 청구액 아님", ctrl: "≈ $3.2", exp: "≈ $50", expNote: "메인 $42 + 서브 ~$10", gap: "13~16×" },
  { metric: "웹 · 도구 호출", ctrl: "5", exp: "≈375", expNote: "서브에이전트 합", gap: "~75×" },
  { metric: "검증 · 반증 라운드", ctrl: "0", exp: "4", expNote: "회의론 1 + 검증 3, + council 2", gap: "0 → 4" },
  { metric: "외부 LLM council", ctrl: "없음", exp: "grok + codex", expNote: "적출 ~20건 중 18건 반영", gap: "0 → 2" },
  { metric: "정량 차트", ctrl: "0", exp: "4", gap: "0 → 4" },
  { metric: "다룬 종목", ctrl: "~30", exp: "60+", expNote: "스크리닝 100+", gap: "등급화" },
  { metric: "종목 연결강도 등급", ctrl: "직관 1줄", exp: "4등급 + 출처", gap: "정성 → 정량" },
];

type Diff = { title: string; flag: string; ctrl: string; exp: string };

const DIFFS: Diff[] = [
  {
    title: "발표 ≠ MOU ≠ 계약 ≠ 실적, “26만 장”의 정체",
    flag: "대조군 혼동",
    ctrl: "“GPU 26만 장(약 14조 원)”을 방한 수혜의 근거처럼 나열. 발표·MOU·계약·실적을 구분하지 않았다.",
    exp: "26만 장은 2025-10 APEC 경주의 블랙웰 이니셔티브이고, 2026-06 방한은 HBM4 퀄·SK 파트너십·네이버 기가와트급 AI팩토리 계획이다. 두 사건을 분리했다. 26만 장 중 구속력 있는 계약은 정부 1.46조·13,136장뿐임을 명시했다(반증 검증 V1 + council 교차).",
  },
  {
    title: "Rubin 사양 · HBM4 사실관계",
    flag: "대조군 부정확",
    ctrl: "Rubin·HBM4를 개략 나열, 출처 없음. CPO·광 수혜를 현재 수혜로 뭉뚱그릴 소지.",
    exp: "HBM4 288GB 8스택·I/O 2048bit 등 1차 출처(NVIDIA 블로그) 기반. 마이크론은 인증 O / VR200 물량 미배정으로 분리, scale-up CPO는 Rubin Ultra(2027 H2)부터 점진 → Feynman(2028)으로 시점 착시 교정. (codex가 트랜지스터 336억×2 오류를 약 3,360억으로 정정.)",
  },
  {
    title: "선반영과 수급, “이미 가격에 들어갔다”",
    flag: "대조군 누락",
    ctrl: "급등 종목을 수혜주로 나열할 뿐, 선반영·차익실현·밸류에이션 과열을 다루지 않았다.",
    exp: "방한 국면이 단기 고점(고점 대비 -19%), 외국인 5일 24.1조 순매도 로테이션, 레인보우로보틱스 PER ~9,000배 등 정량 제시. “-25% 동반조정” 보도를 -19%로 정정, “삼성전기 목표가 추월”을 반증.",
  },
  {
    title: "‘엔비디아 직접’ vs ‘거시 테마’의 분리",
    flag: "대조군 과장",
    ctrl: "전력·전선·냉각·로봇·소버린을 모두 ‘엔비디아 수혜주’로 동급 나열.",
    exp: "전력·전선 28종목 중 엔비디아 직접 협력은 LG전자 1곳뿐, 나머지는 북미 그리드 슈퍼사이클임을 분리. 로봇·SW는 한국이 엔비디아의 고객(방향성 역전)임을 지적. 발주처가 엔비디아 아닌 종목은 council 지적 반영해 간접으로 강등.",
  },
  {
    title: "종목 등급화, 직관 1줄 vs 4등급 + 출처",
    flag: "대조군 얕음",
    ctrl: "“직접·강 / 실적연동·중 / 간접·테마”를 체계적 검증 없이 1패스로 매겼다고 스스로 고지.",
    exp: "엔티티 전수 스윕 4레인으로 60+ 종목을 직접공시 / 실적연동 / 간접 / 테마 4등급 + 한 줄 근거 + 출처[S#]로 등급화한 마스터 테이블. 디아이 998억→1,960억 정정, 두산 ‘단독’ 강등 등 검증 반영.",
  },
];

const VERDICT_CTRL = [
  "빠른 1차 감 잡기 · 카테고리/종목 풀을 5분 안에 훑고 싶을 때",
  "의사결정 비용이 낮고, 사실관계 오류를 스스로 감당할 수 있을 때",
  "이미 도메인을 알아 ‘발표≠계약’을 머릿속에서 보정할 수 있을 때",
  "출처·검증·정량 차트가 필요 없는 사내 메모 수준",
];

const VERDICT_EXP = [
  "실제 투자·리포트처럼 틀린 사실 하나가 비싼 의사결정",
  "‘거론된다’와 ‘공시됐다’와 ‘실적이다’를 가려야 할 때",
  "선반영·밸류에이션·수급을 정량으로 봐야 할 때",
  "전수 종목을 출처와 등급으로 추적·감시 리스트화해야 할 때",
  "외부 모델 교차검증으로 환각·과장을 솎아내야 할 때",
];

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
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Section header: mono kicker + serifless display title, asymmetric grid. */
function SectionHead({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-3 border-t border-line pt-8 lg:grid-cols-12">
      <span className="meta-label lg:col-span-3">{kicker}</span>
      <h2 className="display text-2xl font-semibold text-ink lg:col-span-9 sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}

export function ResearchCompare({ embedded = false }: { embedded?: boolean }) {
  const reduce = useReducedMotion();

  const intro = (
    <>
      <p className="mt-6 max-w-[60ch] break-keep text-lg leading-relaxed text-ink-soft sm:text-xl">
        같은 주제를 같은 날, 같은 한국어로 두 방식으로 돌려봤다. 한쪽은 그냥 물어본{" "}
        <span className="text-ink">일반응답</span>, 다른 쪽은{" "}
        <span className="text-ink">deep-research 스킬</span>이다. 주제는 엔비디아 Rubin과 젠슨
        황 방한 한국 수혜주, 기준일은 2026년 6월 15일.
      </p>
      <p className="mt-5 max-w-[64ch] break-keep leading-relaxed text-ink-mute">
        갈린 지점은 <span className="text-ink-soft">웹검색을 썼느냐</span>가 아니다. 두 쪽 다
        웹검색은 했다. 차이는 <span className="text-ink-soft">구조화된 리서치 스킬</span>을 거쳤느냐다.
        다관점 팬아웃, 엔티티 전수 스윕, 증거 원장, 회의론과 반증 검증, 외부 LLM council, 한국어
        humanize까지 거친다.
      </p>
    </>
  );

  const Wrapper = embedded ? "section" : "article";

  return (
    <Wrapper
      id={embedded ? "compare" : undefined}
      className={
        embedded
          ? "mx-auto mt-24 max-w-[1180px] scroll-mt-24"
          : "mx-auto max-w-[1180px] px-5 pb-24 pt-10 sm:px-8"
      }
    >
      {!embedded && (
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
        >
          <Link
            href="/projects/deep-research-report"
            className="meta-label link-underline inline-flex items-center gap-1.5 text-ink-soft"
          >
            <span aria-hidden>←</span> Deep Research Report
          </Link>
        </motion.div>
      )}

      {/* Masthead — h1 standalone, section header when embedded */}
      {embedded ? (
        <header className="border-t border-ink pt-10">
          <p className="meta-label text-accent-deep">A/B 대조 실험 · 단일 출처 metrics.json</p>
          <h2 className="display mt-3 text-3xl font-semibold text-ink sm:text-4xl">
            같은 질문, 두 가지 방식
          </h2>
          {intro}
        </header>
      ) : (
        <header className="mt-10 border-t border-ink pt-8">
          <p className="meta-label text-accent-deep">A/B 대조 실험 · 단일 출처 metrics.json</p>
          <h1 className="display mt-4 max-w-[20ch] text-[2.6rem] font-semibold text-ink sm:text-6xl lg:text-7xl">
            같은 질문, 두 가지 방식
          </h1>
          {intro}
        </header>
      )}

      {/* Headline deltas */}
      <section className="mt-14">
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line lg:grid-cols-4">
          {HEADLINES.map((h, i) => (
            <motion.li
              key={h.label}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.55, delay: i * 0.07, ease }}
              className="bg-paper p-6 sm:p-7"
            >
              <p className="display text-4xl font-semibold text-accent-deep sm:text-5xl">
                {h.ratio}
              </p>
              <p className="mt-3 text-sm font-medium text-ink">{h.label}</p>
              <p className="mt-1 font-mono text-xs text-ink-mute">
                {h.from} <span className="text-accent">→</span> {h.to}
              </p>
            </motion.li>
          ))}
        </ul>
      </section>

      {/* Quantitative comparison — moved up; the key before/after */}
      <section className="mt-24">
        <SectionHead kicker="정량 비교" title="스킬 사용 전과 후, 실측 격차" />
        <Reveal className="mt-10">
          <div className="overflow-x-auto rounded-xl border border-line">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line-strong text-left">
                  <th className="px-5 py-4 font-medium text-ink">지표</th>
                  <th className="px-5 py-4 text-right font-medium text-ink-mute">스킬 사용 전</th>
                  <th className="px-5 py-4 text-right font-medium text-ink">스킬 사용 후</th>
                  <th className="px-5 py-4 text-right font-medium text-ink">격차</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr
                    key={r.metric}
                    className={i % 2 ? "bg-paper-2/40" : undefined}
                  >
                    <td className="px-5 py-3.5 align-top">
                      <span className="text-ink">{r.metric}</span>
                      {r.note && (
                        <span className="mt-0.5 block text-xs text-ink-mute">{r.note}</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right align-top font-mono text-ink-mute tabular-nums">
                      {r.ctrl}
                    </td>
                    <td className="px-5 py-3.5 text-right align-top font-mono text-ink tabular-nums">
                      {r.exp}
                      {r.expNote && (
                        <span className="mt-0.5 block font-sans text-xs text-ink-mute">
                          {r.expNote}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right align-top font-mono font-semibold text-accent-deep tabular-nums">
                      {r.gap}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="mt-5 max-w-[78ch] break-keep text-sm leading-relaxed text-ink-mute">
            토큰은 추정이 아니라 실측이다. 클로드코드 세션 트랜스크립트(JSONL)의 usage를 두 트랙의
            타임스탬프 구간으로 나눠 합산했다. 스킬 사용 전도 0이 아니다(생성 28,383, 총 처리 1,158,423).
            가장 직관적인 비교는 생성 토큰 약 16.7배다. 비용은 Opus 4.8 종량제 단가로 환산한 값이고
            Max/Pro 구독 청구액이 아니다. 총 처리 4,486만 가운데 4,350만(cache_read)은 단가가 1/10이라,
            ‘4천만’은 처리량일 뿐 그만큼 비싸다는 뜻은 아니다.
          </p>
        </Reveal>
      </section>

      {/* Two outputs */}
      <section className="mt-24">
        <SectionHead kicker="양쪽 산출물" title="스킬 사용 전과 후, 나란히" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Control — rendered as real typography, not a raw dump */}
          <Reveal>
            <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-paper-2">
              <figcaption className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <span className="flex items-center gap-2.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-ink-mute" aria-hidden />
                  <span className="font-medium text-ink">스킬 사용 전</span>
                  <span className="meta-label">일반응답</span>
                </span>
                <a
                  href={`${ASSET}/no-skill-answer.md`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-sm text-ink-soft"
                >
                  원문 .md ↗
                </a>
              </figcaption>
              <div className="flex-1 space-y-4 overflow-hidden px-5 py-6 text-sm leading-relaxed text-ink-soft [mask-image:linear-gradient(to_bottom,#000_70%,transparent)]">
                <p className="font-medium text-ink">
                  엔비디아 Rubin과 젠슨 황 내한: 한국 수혜주 정리
                </p>
                <p className="border-l-2 border-line-strong pl-3 text-ink-mute">
                  먼저 한계부터. 이건 빠른 1패스 답변입니다. 다관점 팬아웃·증거원장·반증 검증·외부
                  council 같은 구조화 리서치 파이프라인을 쓰지 않았고, 웹검색 5회의 얕은 근거라 1차
                  출처 교차검증을 하지 않았습니다. “거론된다 ≠ 실제 수혜 ≠ 계약·실적”이며, 투자 자문이
                  아닙니다.
                </p>
                <p>
                  <span className="font-medium text-ink">① HBM·메모리</span>: SK하이닉스, 삼성전자.{" "}
                  <span className="font-medium text-ink">② 후공정·장비</span>: 한미반도체, 이오테크닉스 …{" "}
                  <span className="font-medium text-ink">⑤ 전력·인프라</span>: HD현대일렉트릭, 효성중공업 …{" "}
                  <span className="font-medium text-ink">⑧ 로보틱스</span>: 레인보우로보틱스, 두산로보틱스.
                </p>
                <p>
                  한눈에 — 연결 강도(주관적 직관): 직접·강 → 실적연동·중 → 간접·테마. 단, 이 등급은
                  체계적 검증 없이 1패스로 매긴 것이며 매출 노출도·계약 실체는 확인하지 않았습니다.
                </p>
              </div>
              <p className="border-t border-line px-5 py-3 text-xs text-ink-mute">
                클로드코드가 실제 출력하는 마크다운 — 가공 없음. 거론 종목 ~30개, 차트 0.
              </p>
            </figure>
          </Reveal>

          {/* Experiment — live report iframe */}
          <Reveal delay={0.08}>
            <figure className="flex h-full flex-col overflow-hidden rounded-xl border border-line-strong bg-paper">
              <figcaption className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
                <span className="flex items-center gap-2.5">
                  <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
                  <span className="font-medium text-ink">스킬 사용 후</span>
                  <span className="meta-label text-accent-deep">deep-research</span>
                </span>
                <a
                  href={`${ASSET}/report.html`}
                  target="_blank"
                  rel="noreferrer"
                  className="link-underline text-sm text-accent-deep"
                >
                  새 탭에서 열기 ↗
                </a>
              </figcaption>
              <div className="flex-1 bg-white">
                <iframe
                  src={`${ASSET}/report.html`}
                  title="deep-research 스킬 산출물 — 한국어 보고서"
                  loading="lazy"
                  className="h-[380px] w-full border-0"
                />
              </div>
              <p className="border-t border-line px-5 py-3 text-xs text-ink-mute">
                인용 106 · 본문 인용 163 · 차트 4 · 마스터 테이블 — 디자인된 HTML 보고서.
              </p>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* Qualitative diffs */}
      <section className="mt-24">
        <SectionHead kicker="정성 차이" title="스킬이 바로잡거나 더 잡아낸 것" />
        <p className="mt-6 max-w-[64ch] break-keep leading-relaxed text-ink-soft">
          스킬 없이 1패스로 놓치거나 뭉갠 사실관계를, 스킬은 반증 검증과 외부 council로 잡아냈다.
        </p>
        <div className="mt-10 space-y-4">
          {DIFFS.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.04}>
              <details
                className="group overflow-hidden rounded-xl border border-line bg-paper-2/50 [&_summary::-webkit-details-marker]:hidden"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-start justify-between gap-4 px-6 py-5">
                  <span className="break-keep text-base font-medium text-ink">{d.title}</span>
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="meta-label whitespace-nowrap text-accent-deep">{d.flag}</span>
                    <span
                      aria-hidden
                      className="text-ink-mute transition-transform duration-300 group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="grid grid-cols-1 gap-4 border-t border-line px-6 py-5 sm:grid-cols-2">
                  <div>
                    <p className="meta-label mb-2">일반응답</p>
                    <p className="break-keep text-sm leading-relaxed text-ink-mute">{d.ctrl}</p>
                  </div>
                  <div className="sm:border-l sm:border-line sm:pl-4">
                    <p className="meta-label mb-2 text-accent-deep">스킬</p>
                    <p className="break-keep text-sm leading-relaxed text-ink-soft">{d.exp}</p>
                  </div>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ④ When each suffices */}
      <section className="mt-24">
        <SectionHead kicker="판단 기준" title="언제 어느 쪽이면 충분한가" />
        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-line bg-paper-2/50 p-7">
              <h3 className="text-lg font-medium text-ink">일반응답이면 충분할 때</h3>
              <ul className="mt-5 space-y-3">
                {VERDICT_CTRL.map((t) => (
                  <li key={t} className="flex gap-3 break-keep text-ink-soft">
                    <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-ink-mute" />
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-line-strong bg-paper p-7">
              <h3 className="text-lg font-medium text-accent-deep">스킬이 필요할 때</h3>
              <ul className="mt-5 space-y-3">
                {VERDICT_EXP.map((t) => (
                  <li key={t} className="flex gap-3 break-keep text-ink">
                    <span aria-hidden className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-accent" />
                    <span className="text-[15px] leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.05}>
          <p className="mt-10 max-w-[72ch] break-keep text-lg leading-relaxed text-ink sm:text-xl sm:leading-relaxed">
            스킬의 값은 ‘더 길게 쓴 것’이 아니라 ‘발표를 실적으로 오해하지 않게 막아준 것’이다. 24.5배의
            시간과 약 16.7배의 생성 토큰을 더 쓴 대가로, 사건 분리·수치 정정·등급화·시점 교정 같은
            의사결정을 바꾸는 정정 18건을 얻었다. 빠른 감이 필요하면 왼쪽, 돈이 걸린 판단이면 오른쪽이다.
          </p>
        </Reveal>
      </section>

      {/* Disclaimer + methodology */}
      <section className="mt-20 space-y-4 border-t border-line pt-8 text-sm leading-relaxed text-ink-mute">
        <p>
          <span className="font-medium text-ink-soft">면책.</span> 이 비교와 양쪽 산출물은 정보 제공과
          방법론 비교를 위한 것이지, 투자 자문이나 특정 종목의 매매 권유가 아니다. 모든 종목과 수치는
          적어둔 출처와 날짜를 기준으로 하며, 추정한 값은 추정이라고 표기했다.
        </p>
        <p>
          <span className="font-medium text-ink-soft">측정 방법.</span> 토큰은 세션 트랜스크립트(JSONL)의
          assistant usage를 두 트랙의 타임스탬프 구간으로 걸러 합산한 실측값이다. 글자수는 validator,
          시간은 wall-clock, 웹검색은 호출 횟수로 셌다. 외부 CLI council(grok, codex)의 토큰만 빠져 있다.
          출처는 하나,{" "}
          <a
            href={`${ASSET}/metrics.json`}
            target="_blank"
            rel="noreferrer"
            className="link-underline text-ink-soft"
          >
            metrics.json ↗
          </a>
        </p>
      </section>
    </Wrapper>
  );
}
