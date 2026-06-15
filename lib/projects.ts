import type { Project } from "./types";

// ---------------------------------------------------------------------------
// PROJECT DATA
// ---------------------------------------------------------------------------
// To add a project: append an object matching the `Project` type.
//   - `slug` must be unique and URL-safe (it becomes /projects/<slug>).
//   - `span` controls how wide the card is on the 12-col desktop grid.
//     Vary it (4 / 5 / 6 / 7 / 8 / 12) to keep the editorial rhythm.
//   - `accent` tints the generative visual; pick a saturated hex.
//   - `visual` chooses the generative treatment (see VisualKind).
//   - `media` (optional) supplies a real video/poster that replaces the
//     generative visual on the card thumbnail and the detail hero.
// No images are required: visuals are drawn from data unless `media` is set.
// Order matters — the array order is the gallery order.
// ---------------------------------------------------------------------------

export const projects: Project[] = [
  {
    slug: "onlyup-duai",
    title: "DUDU — Bitcoin Upward Life-Climb",
    tagline:
      "온리업 스타일 수직 등반 × 비트코인 자산 성장 판타지. 두두가 도시를 오르면 시뮬레이션 BTC가 오르고, 포트폴리오가 거주 티어를 끌어올린다.",
    category: "Creative",
    tags: ["3D 게임", "WebGL", "멀티플레이", "생성형 비주얼"],
    tech: [
      "Three.js",
      "Vite",
      "Vercel Serverless",
      "Upstash Redis",
      "WebSocket",
      "Playwright",
    ],
    year: 2026,
    status: "live",
    featured: true,
    span: 8,
    accent: "#f7931a",
    visual: "strata",
    media: {
      video: "/media/onlyup-duai/hero.mp4",
      poster: "/media/onlyup-duai/poster.jpg",
    },
    overview:
      "두두(파란 블롭 캐릭터)가 수직 도시를 오르면 시뮬레이션 BTC 가격이 오르고, 코인을 모으면 보유량이 늘어 '가격 × 보유량 = 포트폴리오'가 거주 티어(골목 지하 → 원룸촌 → 아파트 옥상 → 고급 주거지 → ATH 펜트하우스)와 두두의 액세서리를 업그레이드한다. 떨어지면 폭락한다. 실제 시세/거래소와 무관한 시뮬레이션 데모이며 투자 조언이 아니다.",
    problem:
      "자산 성장이라는 추상적 감각을 몸으로 느낄 방법이 없었다. 차트의 숫자는 '오른다'는 실감으로 이어지지 않는다. 수직 등반이라는 물리적 상승과 자산 그래프를 한 몸으로 묶어, 오르는 손맛과 떨어지는 공포를 동시에 체험하게 만들고 싶었다.",
    role: "솔로 빌드. Three.js 게임플레이·물리(코요테/버퍼 점프), 7개 존의 절차적 발판 생성, 멀티플레이 동기화(서버리스 폴링), 자동 스크린샷·FPS·기능 테스트 파이프라인까지 전부 설계했다.",
    features: [
      "7개 존(골목 → 펜트하우스 → 달 → 신계) + 정상 등정 후 🐂 BULL RUN 무한 상승장, 직후 🎰 더블다운 한 방 올인 선택.",
      "발판 패턴 — 나선/지그재그/계단/롱점프/기둥/붕괴/이동/트램펄린/빙판 + 🔮 징검다리(2열 중 하나는 가짜).",
      "멀티플레이는 Vercel 서버리스 함수 + Upstash Redis ~400ms 폴링으로 동작 — 고스트·Q 강탈·자유 채팅·글로벌 영구 랭킹. Redis가 없으면 솔로 + 로컬 랭킹 + AI 봇으로 자동 폴백.",
      "CC0 PBR 텍스처·HDRI·은하수 파노라마·존별 3D 데코를 비동기 로드. 7~24MB 네온 간판은 gltf-transform로 ~200KB까지 압축.",
      "캐릭터·효과음·UI는 모두 프로시저럴(프리미티브 지오메트리·WebAudio·캔버스).",
    ],
    outcome:
      "Vercel에 배포되어 누구나 바로 플레이할 수 있다. 루브릭 기반 9장면 자동 스크린샷, 장면별 FPS 측정, 상호작용/물리 기능 테스트를 스크립트로 갖춰 비주얼·성능·동작을 회귀 검증한다. 서버가 없어도 AI 봇이 등반·채팅하며 솔로 레이스가 성립하도록 폴백을 설계해 어떤 환경에서도 깨지지 않는다.",
    links: [{ label: "Live site", href: "https://onlyup-duai.vercel.app" }],
    gallery: [
      {
        caption: "골목 지하에서 시작 — 네온 간판과 BTC 터미널 HUD.",
        image: "/media/onlyup-duai/g1-street.jpg",
      },
      {
        caption: "아파트 티어 — 포트폴리오가 오르면 거주지가 올라간다.",
        image: "/media/onlyup-duai/g2-apartments.jpg",
      },
      {
        caption: "우주존 — 달 너머로 이어지는 수직 등반.",
        image: "/media/onlyup-duai/g3-space.jpg",
      },
      {
        caption: "정상 등정 직후 🎰 더블다운 — 챙길지 올인할지.",
        image: "/media/onlyup-duai/g4-jackpot.jpg",
      },
    ],
  },
  {
    slug: "eval-improve-skills",
    title: "Eval-Improve Skills",
    tagline:
      "결과물이든 스킬 자체든, 여러 독립 평가자로 채점해 기준 통과까지 자동으로 개선·재평가하는 Claude Code 스킬.",
    category: "Skill",
    tags: ["LLM 평가", "멀티에이전트", "한국인 페르소나", "스킬 자기개선"],
    tech: [
      "Claude Code",
      "Python",
      "Codex CLI",
      "Grok CLI",
      "Nemotron-Personas-Korea",
    ],
    year: 2026,
    status: "live",
    featured: true,
    span: 8,
    accent: "#4f46e5",
    visual: "orbit",
    overview:
      "보고서·기획서·사업제안서·카피·코드 등 완성된 산출물을, 서로 독립적인 평가자 여러 명으로 채점하고 기준치에 도달할 때까지 자동으로 개선·재평가하는 Claude Code 스킬. 같은 평가 엔진을 '무엇을 고치느냐'에 따라 두 모드로 쓴다 — 결과물만 있으면 그 결과물을 갱신(artifact 모드)하고, 입력이 스킬이면 스킬을 돌려 나온 출력을 채점한 뒤 출력이 아니라 스킬 자체(SKILL.md)를 고쳐 다음 실행이 통과하게 만든다(skill 모드).",
    problem:
      "단일 모델로 산출물을 평가하면 점수가 서로 상관되고 긍정 편향이 낀다. '괜찮아 보인다'와 '기준을 통과했다'는 다르다. 게다가 보통의 품질 루프는 결과물 하나만 고칠 뿐, 그 결과물을 만드는 스킬 자체는 그대로라 같은 결함이 매번 재발한다 — 객관적 게이트와, 출력이 아니라 생성기를 고치는 루프가 둘 다 없었다.",
    role: "솔로 빌드. 페르소나 샘플러, 멀티모델 council 오케스트레이션, 결정적 게이트 집계, 그리고 결과물 개선·스킬 자기개선 두 자율 루프 래퍼까지 평가 파이프라인 전체를 설계했다.",
    features: [
      "3개 독립 렌즈로 채점 — Claude 서브에이전트(native) · 로컬 Codex+Grok CLI(external, API 키 불필요) · 한국인 페르소나 패널(persona, 한국 타깃이면 자동 적용).",
      "게이트는 결정적 스크립트로 판정 — 종합점수 ≥ threshold(기본 8.0) AND 모든 렌즈 ≥ floor(기본 6.0) 둘 다 충족해야 PASS. 한 렌즈라도 바닥이면 통과 불가(겉만 좋은 결과물 차단).",
      "artifact 모드 — 미달이면 개선 에이전트가 통합 must_fix만 반영해 결과물을 직접 덮어쓰고 재평가, PASS/상한까지 반복.",
      "skill 모드 — 스킬을 샘플 입력 여러 개에 실행해 출력을 채점하고, 손은 SKILL.md에 댄다. 오버피팅을 막으려고 가장 낮은 렌즈 점수로 게이트해 스킬이 일반화해야만 통과시킨다. 출력은 일회용, 개선된 스킬이 산출물.",
      "한국인 페르소나는 nvidia/Nemotron-Personas-Korea(100만 레코드·26필드) 실데이터에서 타깃별로 샘플링, relevance weight(1~3) 가중 종합점수 10점 + GO/조건부GO/PIVOT/KILL 판정.",
    ],
    outcome:
      "두 모드 모두 동작한다. 루프 종료 규칙은 — 목표 점수를 만족하면 몇 번째든 즉시 PASS로 종료하고, 통과 못 하면 최소 10회(min_improve) 개선까지는 무조건 시도한 뒤 점수가 정체·하락하면 조기 종료한다(하드 상한으로 무한루프 방지, 라운드별 백업). 다른 스킬 SKILL.md 끝에 한 줄만 추가하면 그 스킬 결과물에 자가개선 게이트가 붙는 합성형 구조라 평가 대상을 산출물 종류와 무관하게 확장할 수 있다. (스킬 실행은 SKILL.md 지침을 따르는 근사라 헬퍼 스크립트 동작까지 고치진 않으며, 합성 페르소나·LLM council 점수는 방향성 신호로 실제 시장 검증을 대체하지 않는다.)",
    links: [
      { label: "Source", href: "#" },
      { label: "README", href: "#" },
    ],
    gallery: [
      { caption: "3렌즈 채점 → 결정적 게이트 → 개선 루프.", visual: "orbit" },
      { caption: "한국인 페르소나 패널 가중 종합점수.", visual: "scan" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** All unique categories, with an "All" pseudo-filter prepended. */
export function getCategories(): string[] {
  const set = new Set(projects.map((p) => p.category));
  return ["All", ...Array.from(set)];
}
