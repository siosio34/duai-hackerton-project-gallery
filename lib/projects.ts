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
    title: "DUDU: Bitcoin Upward Life-Climb",
    tagline:
      "온리업 스타일 수직 등반에 비트코인 자산 성장 판타지를 얹었다. 두두가 도시를 오를수록 시뮬레이션 BTC가 오르고, 포트폴리오가 거주 티어를 끌어올린다.",
    section: "projects",
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
    span: 12,
    accent: "#f7931a",
    visual: "strata",
    media: {
      video: "/media/onlyup-duai/hero.mp4",
      poster: "/media/onlyup-duai/poster.jpg",
      cinematic: {
        src: "/media/onlyup-duai/prologue.mp4",
        poster: "/media/onlyup-duai/prologue-poster.jpg",
        portrait: true,
      },
    },
    prologue: {
      intro: "몇 해 전, 한 손님이 피자 두 판을 시키고는 '현금이 없다'며 코인 1만 개를 놓고 갔다. 비트코인 피자데이, 그 전설의 '피자 두 판 = 1만 코인'이 두두에게도 일어난 거다. 그 1만 개가 지금은 한 개에 1억. 두두의 낡은 지갑 속에서 손도 못 댄 채 잠들어 있다. 그런데 하필, 시세가 막 무너지기 시작했다. 1억 ▼ 9,900만 ▼ …",
      lines: [
        { speaker: "두두", text: "가진 건 1조어치인데, 손에 쥔 현금은 0원이라니. 웃기지도 않네." },
        { speaker: "두두", text: "게다가 이건 옛날 콜드월렛이라, 본인 확인을 해야 풀려. 그것도 정상 거래소 본점에서만." },
        { speaker: "두두", text: "떨어지는 속도보다 빨리 올라가서, 현금으로 바꾼다. 방법은 그것뿐이야." },
      ],
      outro: "그렇게 두두는 수직 도시를 오른다. 정상 거래소의 빨간 [전량 매도] 버튼 앞에서, 마지막 판단만을 남겨둔 채. (게임 속 이야기예요. 가볍게 즐겨주세요.)",
    },
    features: [
      "7개 존을 오른다. 골목에서 펜트하우스, 달, 신계까지. 정상에 닿으면 무한 상승장 BULL RUN이 열리고, 곧바로 번 돈을 한 판에 거는 더블다운이 기다린다.",
      "발판 패턴이 다양하다. 나선·지그재그·계단·롱점프·기둥·붕괴·이동·트램펄린·빙판에, 두 줄 중 하나가 가짜인 징검다리까지 섞었다.",
      "멀티플레이는 Vercel 서버리스 함수와 Upstash Redis 폴링(~400ms)으로 돌아간다. 고스트 플레이어, Q 강탈, 자유 채팅, 글로벌 영구 랭킹을 지원하고, Redis가 없으면 솔로와 로컬 랭킹, AI 봇으로 자동 폴백한다.",
      "CC0 PBR 텍스처·HDRI·은하수 파노라마·존별 3D 데코를 비동기로 불러온다. 7~24MB짜리 네온 간판은 gltf-transform으로 200KB 안팎까지 압축했다.",
      "캐릭터·효과음·UI는 전부 프로시저럴이다(프리미티브 지오메트리·WebAudio·캔버스).",
    ],
    outcome:
      "Vercel에 배포돼 있어 누구나 바로 플레이할 수 있다. 루브릭 기반 9장면 자동 스크린샷, 장면별 FPS 측정, 상호작용·물리 기능 테스트를 스크립트로 갖춰 비주얼과 성능, 동작을 회귀 검증한다. 서버가 없을 때도 AI 봇이 대신 등반하고 채팅해서 솔로 레이스가 성립하도록 폴백을 짰다. 덕분에 어떤 환경에서도 깨지지 않는다.",
    links: [{ label: "Live site", href: "https://onlyup-duai-one.vercel.app" }],
    gallery: [],
    showcases: [
      {
        title: "돈을 벌면 진화하는 두두",
        caption:
          "포트폴리오가 커질수록 두두의 차림이 바뀐다. 빈손 블롭에서 시작해 왕관을 쓰고, ATH에 닿으면 몸에서 빛이 난다.",
        cols: 3,
        aspect: "square",
        items: [
          { src: "/media/onlyup-duai/char-1.jpg", label: "1티어 · 빈손 블롭" },
          { src: "/media/onlyup-duai/char-2.jpg", label: "중반 · 왕관" },
          { src: "/media/onlyup-duai/char-3.jpg", label: "ATH · 발광 오라" },
        ],
      },
      {
        title: "층마다 바뀌는 풍경",
        caption:
          "거주 티어가 오르면 배경 세계가 통째로 바뀐다. 골목 지하에서 출발해 아파트, 고급 주거지, 펜트하우스를 지나 달과 신계까지 오른다.",
        cols: 3,
        aspect: "wide",
        items: [
          { src: "/media/onlyup-duai/g1-street.jpg", label: "골목 지하" },
          { src: "/media/onlyup-duai/g2-apartments.jpg", label: "아파트촌" },
          { src: "/media/onlyup-duai/scene-lux.jpg", label: "고급 주거지" },
          { src: "/media/onlyup-duai/scene-penthouse.jpg", label: "펜트하우스" },
          { src: "/media/onlyup-duai/g3-space.jpg", label: "우주 · 달" },
          { src: "/media/onlyup-duai/scene-god.jpg", label: "신계" },
        ],
      },
      {
        title: "발판과 장애물",
        caption:
          "단순한 점프가 아니다. 나선·지그재그·계단·롱점프·기둥·붕괴·이동·트램펄린·빙판에, 갈림길 가짜 발판과 시세 캔들·돌풍·스윕 바 같은 함정이 섞인다. 헛디디면 그대로 폭락한다.",
        cols: 3,
        aspect: "wide",
        items: [
          { src: "/media/onlyup-duai/obs-fork.jpg", label: "갈림길, 둘 중 하나는 가짜 발판" },
          { src: "/media/onlyup-duai/obs-traffic.jpg", label: "트래픽, 가로지르는 장애물" },
          { src: "/media/onlyup-duai/obs-sweep.jpg", label: "스윕 바, 회전하며 쓸어낸다" },
          { src: "/media/onlyup-duai/obs-candles.jpg", label: "캔들, 치솟는 봉을 피해" },
          { src: "/media/onlyup-duai/obs-wind.jpg", label: "돌풍, 옆으로 밀어낸다" },
          { src: "/media/onlyup-duai/obs-crumble.jpg", label: "붕괴 발판, 밟으면 부서진다" },
          { src: "/media/onlyup-duai/obs-mover.jpg", label: "이동 발판, 좌우로 움직인다" },
          { src: "/media/onlyup-duai/obs-bounce.jpg", label: "트램펄린, 위로 튕겨 올린다" },
          { src: "/media/onlyup-duai/obs-conveyor.jpg", label: "무빙워크, 벨트가 옆으로 옮긴다" },
        ],
      },
      {
        title: "동네에서 마주치는 NPC들",
        caption:
          "슬럼의 주민들은 돈 벌어오라며 핀잔을 주고, 두두는 운다. 위로 올라갈수록 부자들은 비웃고, 신계에선 떠받든다. 전부 비주얼 노벨식 대화창으로 펼쳐진다.",
        cols: 4,
        aspect: "square",
        items: [
          { src: "/media/onlyup-duai/npc-00.jpg" },
          { src: "/media/onlyup-duai/npc-01.jpg" },
          { src: "/media/onlyup-duai/npc-02.jpg" },
          { src: "/media/onlyup-duai/npc-03.jpg" },
        ],
      },
    ],
  },
  {
    slug: "linktrip",
    title: "링크트립",
    tagline: "공개 준비 중인 프로젝트입니다.",
    section: "projects",
    category: "Web",
    tags: ["진행중"],
    tech: [],
    year: 2026,
    status: "in-progress",
    span: 6,
    accent: "#2563eb",
    visual: "mesh",
    placeholder: true,
    features: [],
    links: [],
    gallery: [],
  },
  {
    slug: "coin-collect-with-soldier",
    title: "코인모으기 With 군인",
    tagline: "공개 준비 중인 프로젝트입니다.",
    section: "projects",
    category: "Game",
    tags: ["진행중"],
    tech: [],
    year: 2026,
    status: "in-progress",
    span: 6,
    accent: "#16a34a",
    visual: "glyph",
    placeholder: true,
    features: [],
    links: [],
    gallery: [],
  },
  {
    slug: "deep-research-report",
    title: "Deep Research Report",
    tagline:
      "키워드 하나만 던져도 13개 넘는 관점으로 알아서 넓혀 조사하고, 증거 원장과 교차검증을 거쳐 인용 200건급 한국어 보고서로 정리하는 Claude Code 스킬.",
    section: "skills",
    category: "Research",
    tags: ["딥리서치", "멀티에이전트", "증거 기반", "A/B 검증"],
    tech: [
      "Claude Code",
      "Python",
      "Codex CLI",
      "Grok CLI",
      "yt-dlp",
      "React",
    ],
    year: 2026,
    status: "live",
    featured: true,
    span: 6,
    accent: "#0f766e",
    visual: "grid",
    media: {
      poster: "/media/research-ai-skills/poster.jpg",
      thumbnail: "/media/research-ai-skills/thumb.jpg",
    },
    motivations: [
      {
        title: "물어보면 답이 너무 짧았다",
        body: "그냥 질문하면 두세 문단으로 끝나기 일쑤였다. 깊게 파고든 리서치가 기본값이면 했다.",
      },
      {
        title: "더 좋은 소스로, 더 오래 생각하게",
        body: "뉴스 몇 개로 때우지 않고, 1차·공식 자료까지 폭넓게 읽고 충분히 따져본 결론을 원했다.",
      },
      {
        title: "키워드 하나면 알아서 넓혀가게",
        body: "짧은 키워드만 던져도 인접한 주제와 후속 질문으로 꼬리를 물어, 스스로 조사 범위를 넓히길 바랐다.",
      },
      {
        title: "다른 에이전트로 교차검증",
        body: "한 모델 말을 그대로 믿는 대신 다른 에이전트로 사실을 다시 확인하고 싶었다. 예를 들어 grok을 붙이면 최신 X(트위터) 데이터처럼 모델마다 잘 가져오는 소스까지 함께 모을 수 있다.",
      },
      {
        title: "차트와 표가 들어간 깔끔한 결과물",
        body: "무엇보다, 결과를 차트와 도표가 함께 있는 읽기 좋은 형식으로 받고 싶었다.",
      },
    ],
    diagram: {
      image: "/media/research-ai-skills/pipeline.jpg",
      caption:
        "키워드 하나를 받아 인용 보고서가 나오기까지의 5단계. 갭이 있으면 되돌아가 수렴할 때까지 반복하고, 모든 중간 산출물은 파일로 쌓인다.",
    },
    features: [
      "중간 산출물을 전부 run 디렉터리에 쌓아 파일을 상태로 삼는다. 밖으로 넘기는 건 인용을 담은 원장 항목과 250단어 요약뿐이라, 대화가 잘려도 파일에서 그대로 이어간다.",
      "관점 13개 이상을 동시에 풀어 조사하고, 회의론자와 검증 에이전트(양보 임계 4/5 이상)로 주장을 때린 뒤, 빈틈이 보이면 다시 팬아웃한다. 새로 나올 게 없을 때까지 돈다. 실제로 한 번에 19개 서브에이전트가 붙었다.",
      "출처마다 신뢰도를 A부터 D로 매기고 주장 단위로 기록한다. 원장에 없는 사실은 보고서에 못 쓴다. validate_report.py가 섹션, 앵커, 인용 무결성, 커버리지를 기계로 검사한다.",
      "codex, grok, gemini 같은 로컬 CLI로 다른 모델에게 교차 리뷰를 시키고(API 키 없이), 원장과 대조해 살아남은 지적만 반영한다. grok으로는 최신 X(트위터) 반응을, yt-dlp로는 영상 자막에서 발언 원문을 가져온다.",
      "한국어 보고서는 humanize-korean으로 한 번 더 다듬어 AI 티를 걷어낸다. 이때 HTML 태그, [S#] 인용, 수치, 고유명사는 건드리지 않고, 끝나면 검증기를 다시 돌린다.",
    ],
    links: [
      {
        label: "실제 보고서 보기",
        href: "/media/research-ai-skills/compare/report.html",
      },
      { label: "A/B 비교 보기", href: "#compare" },
    ],
    gallery: [
      {
        caption: "산출물. 인용 141개와 정량 차트가 박힌 한국어 딥리서치 보고서 원문.",
        image: "/media/research-ai-skills/g1-report.jpg",
      },
      {
        caption: "리드 지표. 모든 수치는 metrics.json에서만 온다(하드코딩 없음).",
        image: "/media/research-ai-skills/g2-cards.jpg",
      },
      {
        caption: "출처 다양성. 뉴스·위키 2종에서 11종으로, 1차·공식은 0에서 21로.",
        image: "/media/research-ai-skills/g3-charts.jpg",
      },
      {
        caption: "본문. 관점별 분석에 인용과 차트, 불확실성 콜아웃을 함께 담았다.",
        image: "/media/research-ai-skills/g4-report-body.jpg",
      },
    ],
  },
  {
    slug: "eval-improve-skills",
    title: "Eval-Improve Skills",
    tagline:
      "결과물이든 스킬 자체든, 여러 독립 평가자로 채점해 기준 통과까지 자동으로 개선·재평가하는 Claude Code 스킬.",
    section: "skills",
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
    span: 6,
    accent: "#4f46e5",
    visual: "orbit",
    media: { thumbnail: "/media/eval-improve-skills/thumb.jpg" },
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
  {
    slug: "idea-validation-skill",
    title: "아이디어 검증 스킬",
    tagline: "공개 준비 중인 스킬입니다.",
    section: "skills",
    category: "Skill",
    tags: ["진행중"],
    tech: [],
    year: 2026,
    status: "in-progress",
    span: 6,
    accent: "#db2777",
    visual: "scan",
    placeholder: true,
    features: [],
    links: [],
    gallery: [],
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
