"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

const REPORT = "/media/research-ai-skills/reports";

// ---------------------------------------------------------------------------
// SOURCE / FLOW ANATOMY
// Phase-by-phase breakdown derived from the skill's own source —
// .claude/skills/deep-research-report/SKILL.md + its references/ & scripts/.
// Each phase: where it runs, what it actually does, and the concrete
// file/script artifact it reads or writes.
// ---------------------------------------------------------------------------

type Phase = {
  id: string;
  name: string;
  where: string;
  always?: boolean;
  body: string;
  artifacts: string[];
};

const PHASES: Phase[] = [
  {
    id: "0",
    name: "브리프 — 관점 설계",
    where: "오케스트레이터 인라인",
    body: "키워드를 동의어·en/ko 변형·경쟁 제품으로 확장하고 보고서가 답할 5–8개 핵심 질문을 뽑는다. 핵심은 관점 분해 — 빈 종이에서 추측하지 않고(STORM식 survey-before-guess) 유사 주제의 강한 글을 먼저 읽어 섹션 분류를 수확한 뒤, 서로 '의견이 갈리는' 10개 이상 관점으로 쪼갠다. 항상 반대·하방 관점 하나, 그리고 비교/시계열/정량 관점을 끼운다. '수혜주·대안·벤더' 같은 카탈로그 토픽이면 이름의 넓이만 담당하는 엔티티 스윕 1–3개를 따로 계획한다.",
    artifacts: ["00-brief.md = 이후 모든 단계의 계약"],
  },
  {
    id: "1",
    name: "팬아웃 리서치 — 병렬 서브에이전트",
    where: "서브에이전트 N개, 단일 메시지 동시 실행",
    body: "관점당 서브에이전트 1개를 한 메시지에 묶어 동시에 띄운다. 각자 평면 검색이 아니라 재귀적 breadth→depth(2–3레벨)로 — 라운드1은 5–8개 강한 소스를 정독해 learnings와 follow-up을 뽑고, 라운드2+는 breadth를 반씩 줄이며 가장 값진 follow-up만 판다. 관점당 12–20개 출처를 실제로 읽되 뉴스 도배 대신 1차·공식(DART/SEC·IR·규제기관·데이터셋)을 좇는다. 발언이 근거면 yt-dlp로 자막을 끌어오고, 추가 CLI가 있으면 핵심 관점을 다른 모델 레인으로 한 번 더 돌려 수집 단계에서 과장을 잡는다. 각자 파일에만 기록하고 경계를 넘는 건 250단어 요약뿐 — 원문은 절대 반환하지 않는다.",
    artifacts: ["evidence/P*.md", "notes/P*.md", "youtube_transcript.py", "prediction_markets.py"],
  },
  {
    id: "2",
    name: "회의론 패스 — 적대적 검증",
    where: "서브에이전트 (항상)",
    always: true,
    body: "요약을 읽은 뒤 서브에이전트 하나를 보내 떠오른 그림을 공격한다 — 반대 근거, 실패 사례, 소스의 이해상충, 과열 디플레. 그리고 가장 load-bearing한 주장마다 2–3명의 검증자를 '반증하라'는 프롬프트로 붙인다. 사람 비위 맞추듯 바로 수긍하는 걸 막는 양보 임계 프로토콜이 핵심 — 검증자는 근거가 반박에 얼마나 강하게 답하는지 1–5로 채점하고 ≥4에서만 주장을 인정한다. 불확실하면 기본값은 '괜찮음'이 아니라 '미확립'.",
    artifacts: ["evidence/SKEPTIC.md", "notes/SKEPTIC.md"],
  },
  {
    id: "3",
    name: "통합 — 원장 + 갭 재팬아웃 루프",
    where: "오케스트레이터 인라인 (+ 갭 서브에이전트)",
    body: "모든 evidence를 전역 ID S1..Sn 원장으로 병합하고(대량이면 JSONL로 dedup) read→report 커버리지 게이트를 건다 — 읽은 걸 인용 안 하거나 원장에 쌓고 안 쓰는 두 누수를 validate_report.py가 잡는다. 그다음 supervisor로서 합성을 훑어 갭을 찾는다 — 저신뢰 핵심 질문, 미해결 모순, 단일 출처 주장. 갭이 (a)핵심에 load-bearing (b)근거로 답 가능 (c)미커버 세 게이트를 통과해야만 새 서브에이전트를 띄운다(anti-drift). 새 라운드가 '신규 갭'을 내는 한 돌고, 안 나오면(dry) 멈춘다 — 최대 4라운드. 품질은 반복 횟수가 아니라 이 게이트에서 나온다.",
    artifacts: ["evidence/ledger.md (S1..Sn)", "05-synthesis.md", "validate_report.py"],
  },
  {
    id: "3.5",
    name: "퓨전 합성 — 패널 → 판정 → 융합",
    where: "패널 서브에이전트 + judge (항상)",
    always: true,
    body: "단일 패스를 믿지 않고 합성을 융합한다. 같은 원장에서 독립 패널 3명이 각각 다른 리드 앵글(합의·회의·정량)로 교차합성을 쓰고, judge가 합의·모순·고유통찰·맹점으로 diff한 뒤, 오케스트레이터가 모순마다 원장에 ≥4/5로 대조해 — 평균이 아니라 — 융합본을 쓴다. OpenRouter의 'fusion beats frontier'를 self-fusion으로 무료 재현한 것(합성 단계 자체가 이득의 대부분). 패널A 단독 초안을 그대로 남겨 'fuse가 잡았는데 solo가 놓친 것'을 A/B로 로깅한다.",
    artifacts: ["fusion-synthesis.md", "05-synthesis.md (## 퓨전 효과)"],
  },
  {
    id: "4",
    name: "report.html 작성 — 섹션별 write+reflect",
    where: "오케스트레이터 인라인",
    body: "템플릿을 복사한 뒤 섹션을 하나씩, 250단어 요약이 아니라 그 섹션의 notes·evidence 원문을 다시 열어 쓴다(요약에서 쓰면 비싸게 모은 깊이를 버리는 셈). 비자명 주장마다 [S#] 인용, 불확실한 건 .uncertain 콜아웃, 정량 토픽엔 출처 박힌 인라인 SVG 차트. 무거운 분석 소절은 600–900단어로 '근거→이견→내 판단→무엇이 결론을 바꾸나'를 쓰고, 쓴 뒤 한 번 reflect해 인용 없는·과장된·중복 문장을 고친다. 실행 요약은 본문이 다 선 마지막에 쓴다.",
    artifacts: ["report-template.html → report.html", "html-report.md", "charts.md"],
  },
  {
    id: "4.5",
    name: "Council 리뷰 — 외부 모델 교차검증",
    where: "로컬 LLM CLI (항상)",
    always: true,
    body: "초안을 로컬에 인증된 외부 CLI(codex·grok·gemini, API 키 불필요)에 적대적 리뷰로 보낸다. 적출된 지적은 Phase 2와 같은 양보 규율로 판정 — 내 현재 문장이 아니라 원장이 ≥4/5로 반박해야만 기각하고, 살아남은 것만 반영한다. 리뷰어 CLI가 없으면 건너뛰되 methodology 푸터에 'council: skipped'를 명시 — 조용한 스킵은 금지(품질이 환경 의존이 되니까).",
    artifacts: ["council-review.md"],
  },
  {
    id: "4.6",
    name: "Humanize — 한국어 자연화",
    where: "오케스트레이터 인라인 (항상)",
    always: true,
    body: "보고서는 항상 한국어라 AI 글 티(번역투, '결론적으로/시사하는 바가 크다' 같은 상투구, 접속사 도배, 균일한 리듬)를 걷어낸다. report.html을 제자리에서 섹션별로 고치되 prose에만 손대고 — HTML 태그·[S#] 인용·앵커·수치·고유명사·인용문은 건드리지 않는다. 검증기가 편집 후 인용/앵커 무결성을 다시 검사하도록 Phase 5 앞에 둔다.",
    artifacts: ["humanize-pass.md"],
  },
  {
    id: "5",
    name: "검증 & 수정 — 기계 + 사람 게이트",
    where: "오케스트레이터 인라인",
    body: "validate_report.py가 구조·앵커/인용 무결성·orphan 출처·플레이스홀더·길이를 기계로 검사한다. 통과 못 하면 다 고쳐 깨끗해질 때까지 재실행. 검증기가 못 하는 두 가지를 사람이 메운다 — (1) 인용 충실도 spot check: 핵심 인용을 원장 항목과 대조해 원자 주장 단위로 ALIGNED/OVERSTATED/NOT_SUPPORTED로 채점, ALIGNED 미만이면 약화·재연결·삭제. (2) 교차 섹션 수치 일관성: 같은 숫자가 요약·인사이트 카드·차트·표·본문에서 일치하는지 대조. 마지막에 파일 경로·출처/단어 수·핵심 결론·council 결과를 사용자에게 보고한다.",
    artifacts: ["validate_report.py", "quality-eval.md (선택: A/B 평가)"],
  },
];

// Techniques borrowed from open deep-research work — shows the analysis is
// grounded in the skill's own "Lineage" section.
const LINEAGE = [
  { tag: "STORM", what: "관점-유도 질문 + survey-before-guess" },
  { tag: "GPT-Researcher / Open Deep Research", what: "소절별 write+reflect 섹션 라이터" },
  { tag: "Tongyi BrowseConf / WebWeaver", what: "신뢰도-라우팅 갭 예산 + 동적 아웃라인" },
  { tag: "academic-research-skills", what: "≥4/5 양보 임계 + decompose-then-grade" },
  { tag: "dzhng/deep-research", what: "재귀 breadth×depth + 누적 learnings" },
  { tag: "OpenRouter Fusion", what: "패널→판정→합성, self-fusion 무료 재현" },
];

// ---------------------------------------------------------------------------
// EXAMPLE REPORTS — real validated runs copied verbatim into /public.
// Stats measured from each report.html (cited [S#], reference entries,
// stripped Korean chars, inline charts). Conclusions are the report's own
// executive-summary thesis, trimmed.
// ---------------------------------------------------------------------------

type Report = {
  file: string;
  kind: string;
  title: string;
  thesis: string;
  sources: number;
  chars: string;
  charts: number;
  date: string;
  /** Freshly run for this gallery on the current pipeline (with charts/council). */
  fresh?: boolean;
};

// Ordered newest-first. The chart feature landed 2026-06-14, so runs before
// that date legitimately show 0 charts (see the provenance note below).
const REPORTS: Report[] = [
  {
    file: "glp1-obesity-market.html",
    kind: "정량 · 제약/시장",
    title: "GLP-1 비만치료제 시장 2026",
    thesis:
      "임상적으로는 진짜, 재정적으로는 과대평가. TAM은 상승하는 한 점이 아니라 은행 밴드($95~114bn); 표시가는 급락해도 net은 리베이트 상쇄로 제자리; 릴리가 주사제·매출은 앞서도 경구 처방·밸류에이션은 노보 우위. 판단의 경첩은 침투율이 아니라 지속률(3년 잔존 14%).",
    sources: 78,
    chars: "약 9,500자",
    charts: 5,
    date: "2026-06-17",
    fresh: true,
  },
  {
    file: "vera-rubin-dram.html",
    kind: "정량 · 시장 속보",
    title: "베라루빈 DRAM 축소, 악재인가 기회인가",
    thesis:
      "'DRAM 절반' 헤드라인의 진원지는 엔비디아 발표가 아니라 SemiAnalysis 유료 추정. 줄어든 건 CPU측 SOCAMM2 용량뿐, 이익의 핵심 GPU측 HBM4(288GB)는 한 비트도 안 줄었다 — 수요 둔화가 아니라 공급부족 속 배급 조치.",
    sources: 109,
    chars: "약 2.6만 자",
    charts: 4,
    date: "2026-06-17",
  },
  {
    file: "storage-stocks-compare.html",
    kind: "비교 · 3사",
    title: "씨게이트·샌디스크·웨스턴디지털 비교",
    thesis:
      "WDC의 NAND 분사로 이제 HDD 듀오폴리 + NAND 순수기업 구도. 셋 다 'AI 스토리지 슈퍼사이클'로 폭등했지만 가장 큰 단서는 세 종목 모두 현재가가 애널리스트 평균 목표가를 넘었다는 것.",
    sources: 67,
    chars: "약 1.5만 자",
    charts: 0,
    date: "2026-06-14",
  },
  {
    file: "aaoi-stock.html",
    kind: "단일 종목 · 실사",
    title: "AAOI — AI 광트랜시버 폭등주의 실체",
    thesis:
      "1년 만에 +1,066%, 매출 성장은 실재(데이터센터 +154%). 그러나 여전히 적자에 지속적 희석으로 조달, 'AI 수주'의 상당부는 미감사 PR, 'Nvidia $4B 베팅'은 Amazon 워런트의 와전 — 분리해서 봐야 한다.",
    sources: 46,
    chars: "약 1.3만 자",
    charts: 0,
    date: "2026-06-14",
  },
  {
    file: "mcp-ecosystem.html",
    kind: "생태계 · 표준",
    title: "MCP 생태계 2026 — 표준화·보안·도입 전략",
    thesis:
      "MCP는 조직 AI 툴 연결 계층의 사실상 무경쟁 표준. 단 '수만 개 서버'의 실가용 코어는 수천 개이고(감사 기준 17%만 프로덕션급) 서버 품질 검증이 진짜 병목 — 게이트웨이 뒤 검증된 서버만, 툴 수 예산제로.",
    sources: 69,
    chars: "약 1.7만 자",
    charts: 0,
    date: "2026-06-11",
  },
  {
    file: "ai-agent-crypto-trading.html",
    kind: "시장 · 리스크",
    title: "AI 에이전트 코인 자동매매 2026",
    thesis:
      "공개·검증 가능한 증거는 한 방향 — 실행은 자동화하되 판단은 위임하지 말라. 'LLM이 매매로 시장을 이긴다'는 재평가에서 '평가 방법론의 산물'로 판정됐고, 유일한 규모 있는 실거래 실험에선 6개 모델 중 4개가 손실.",
    sources: 75,
    chars: "약 1.9만 자",
    charts: 0,
    date: "2026-06-11",
  },
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
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

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

export function ResearchPipeline() {
  const reduce = useReducedMotion();

  return (
    <section className="mx-auto mt-24 max-w-[1180px]">
      {/* ── Pipeline anatomy (source + flow) ────────────────────────────── */}
      <SectionHead kicker="소스 · 플로우 해부" title="키워드 한 줄이 인용 보고서가 되기까지" />
      <p className="mt-6 max-w-[68ch] break-keep text-lg leading-relaxed text-ink-soft">
        스킬의 본체는{" "}
        <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm text-ink">
          SKILL.md
        </code>{" "}
        한 장과 그것이 부르는{" "}
        <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm text-ink">
          references/
        </code>
        ·
        <code className="rounded bg-paper-2 px-1.5 py-0.5 font-mono text-sm text-ink">
          scripts/
        </code>
        다. 이 단일 컨텍스트 리서치를 이기는 비결은 한 가지 —{" "}
        <span className="text-ink">모든 중간 산출물을 파일로 영속</span>해, 어느 단계도 원문을
        컨텍스트에 쥐고 있을 필요가 없게 한다. 경계를 넘는 건 인용 원장과 250단어 요약뿐이라,
        대화가 잘려도 파일에서 그대로 이어진다.
      </p>

      <ol className="mt-12 space-y-px overflow-hidden rounded-xl border border-line bg-line">
        {PHASES.map((p, i) => (
          <motion.li
            key={p.id}
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: Math.min(i * 0.04, 0.2), ease }}
            className="grid grid-cols-1 gap-x-8 gap-y-4 bg-paper p-7 sm:grid-cols-12 sm:p-8"
          >
            {/* left rail: phase id + name + where */}
            <div className="sm:col-span-4">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-sm text-accent-deep">
                  P{p.id}
                </span>
                <h3 className="break-keep text-lg font-semibold text-ink">
                  {p.name}
                </h3>
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="break-keep text-xs text-ink-mute">
                  {p.where}
                </span>
                {p.always && (
                  <span className="rounded-full border border-accent/40 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-accent-deep">
                    always
                  </span>
                )}
              </div>
            </div>

            {/* body + artifacts */}
            <div className="sm:col-span-8">
              <p className="break-keep leading-relaxed text-ink-soft">{p.body}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.artifacts.map((a) => (
                  <li
                    key={a}
                    className="rounded-md border border-line-strong bg-paper-2/60 px-2.5 py-1 font-mono text-[0.72rem] text-ink-mute"
                  >
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>

      {/* Lineage strip */}
      <Reveal delay={0.05} className="mt-10">
        <div className="rounded-xl border border-line bg-paper-2/40 p-7">
          <h3 className="meta-label mb-1">계보 — 차용한 기법</h3>
          <p className="mb-6 max-w-[64ch] break-keep text-sm leading-relaxed text-ink-mute">
            각 단계의 메커니즘은 공개 딥리서치 연구에서 검증된 패턴을 가져와 한 파이프라인으로 엮은
            것이다. 새 발명이 아니라, 흩어진 best practice의 조립이 설계의 핵심.
          </p>
          <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
            {LINEAGE.map((l) => (
              <li key={l.tag} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="shrink-0 font-mono text-xs text-accent-deep">
                  {l.tag}
                </span>
                <span className="break-keep text-sm text-ink-soft">{l.what}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      {/* ── Example reports ─────────────────────────────────────────────── */}
      <div className="mt-24">
        <SectionHead kicker="예시 리포트" title="실제로 나온 보고서들" />
        <p className="mt-6 max-w-[66ch] break-keep text-lg leading-relaxed text-ink-soft">
          모두 이 스킬이 실제로 돌려 검증(validate_report.py)을 통과한 한국어 보고서다.
          제약·반도체·시장·단일 종목까지 주제 모양이 다르고, 카드를 열면 인용·차트가 그대로 박힌{" "}
          <span className="text-ink">디자인된 HTML 원문</span>이 뜬다. 맨 앞{" "}
          <span className="text-accent-deep">GLP-1 보고서는 이 갤러리를 위해 현재 버전 스킬로 처음부터 새로 돌린 것</span>
          (12관점 팬아웃 → 회의론·검증 2 → codex council → 검증)이다.
        </p>
        <div className="mt-5 rounded-xl border border-line bg-paper-2/40 p-5">
          <p className="break-keep text-sm leading-relaxed text-ink-mute">
            <span className="font-medium text-ink-soft">출처·차트 수가 보고서마다 다른 이유.</span>{" "}
            출처 수는 주제 넓이의 결과다 — 단일 종목(46)보다 시장·생태계(69~109)가 더 많이 읽는다.
            차트가 0인 보고서는 <span className="text-ink-soft">인라인 SVG 차트 기능이 들어오기 전(2026-06-14 이전)</span>에
            돌린 옛 버전 산출물이라 그렇다. 그래서 각 카드에 실행일을 표기했고, 정량 주제를 현재 버전으로
            돌리면 GLP-1·베라루빈처럼 차트가 함께 나온다.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {REPORTS.map((r, i) => (
            <Reveal key={r.file} delay={Math.min(i * 0.06, 0.24)}>
              <a
                href={`${REPORT}/${r.file}`}
                target="_blank"
                rel="noreferrer"
                className={`group flex h-full flex-col rounded-xl border bg-paper p-7 transition-colors hover:border-ink ${
                  r.fresh ? "border-accent/50" : "border-line"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2">
                    <span className="meta-label text-accent-deep">{r.kind}</span>
                    {r.fresh && (
                      <span className="rounded-full bg-accent-deep px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-wide text-paper">
                        신규 실행
                      </span>
                    )}
                  </span>
                  <span
                    aria-hidden
                    className="text-ink-mute transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-deep"
                  >
                    ↗
                  </span>
                </div>
                <h3 className="mt-3 break-keep text-lg font-semibold text-ink">
                  {r.title}
                </h3>
                <p className="mt-3 flex-1 break-keep text-[15px] leading-relaxed text-ink-soft">
                  {r.thesis}
                </p>
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 border-t border-line pt-4 font-mono text-xs text-ink-mute">
                  <div className="flex items-baseline gap-1.5">
                    <dt>출처</dt>
                    <dd className="text-ink-soft tabular-nums">{r.sources}</dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt>본문</dt>
                    <dd className="text-ink-soft">{r.chars}</dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt>차트</dt>
                    <dd className="text-ink-soft tabular-nums">{r.charts}</dd>
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <dt>실행</dt>
                    <dd className="text-ink-soft tabular-nums">{r.date}</dd>
                  </div>
                </dl>
              </a>
            </Reveal>
          ))}
        </div>
        <p className="mt-5 break-keep text-sm text-ink-mute">
          지표는 각 보고서 원문에서 실측 — 인용 [S#] 수, 공백 제외 한글 자수, 인라인 SVG 차트
          수. 결론 한 줄은 보고서 자신의 실행 요약을 옮긴 것이다.
        </p>
      </div>
    </section>
  );
}
