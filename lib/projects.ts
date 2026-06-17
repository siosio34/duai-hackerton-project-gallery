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
    features: [],
    strengths: [
      {
        title: "상시 서버 없이 굴러가는 멀티플레이",
        body: "Vercel은 상주 웹소켓 서버를 못 띄운다. 그래서 서버리스 함수와 Upstash Redis 폴링(~400ms)으로 고스트·강탈·채팅·글로벌 랭킹을 굴렸다. Redis가 없으면 솔로와 AI 봇으로 알아서 떨어져, 어떤 환경에서도 깨지지 않는다.",
      },
      {
        title: "손맛까지 맞춘 절차적 등반",
        body: "7개 존을 나선·계단·붕괴·이동·트램펄린·빙판 같은 14가지 패턴으로 매번 새로 깐다. 코요테 타임과 점프 버퍼, 더블점프를 넣어 떨어질 듯 말 듯한 손맛을 잡았다.",
      },
      {
        title: "에셋은 가볍게, 화면은 화려하게",
        body: "캐릭터·효과음·UI를 전부 프로시저럴로 만들어 외부 파일을 거의 안 쓴다. 무거운 네온 간판은 gltf-transform으로 7~24MB에서 200KB 안팎까지 눌러, 화려한 도시를 빠르게 띄운다.",
      },
      {
        title: "스스로 검증하는 빌드",
        body: "루브릭 기반 9장면 자동 스크린샷, 장면별 FPS 측정, 상호작용·물리 기능 테스트를 스크립트로 갖췄다. 비주얼이 깨지거나 프레임이 떨어지면 바로 드러난다.",
      },
    ],
    credits: [
      { source: "ambientCG", use: "PBR 텍스처 12종", license: "CC0", href: "https://ambientcg.com" },
      { source: "Poly Haven", use: "HDRI 환경광", license: "CC0", href: "https://polyhaven.com" },
      { source: "ESO / S. Brunier", use: "은하수 파노라마", license: "CC BY 4.0" },
      { source: "Kevin MacLeod", use: "배경 음악", license: "CC BY 4.0", href: "https://incompetech.com" },
      { source: "Polygonal Mind", use: "존별 3D 데코", license: "CC0", href: "https://github.com/ToxSam/open-source-3D-assets" },
      { source: "Kenney", use: "우주 키트", license: "CC0", href: "https://kenney.nl" },
    ],
    links: [{ label: "Live site", href: "https://onlyup-duai-one.vercel.app" }],
    controls: [
      { keys: ["W", "A", "S", "D"], action: "이동 (카메라 기준)" },
      { keys: ["Shift"], action: "달리기" },
      { keys: ["Space"], action: "점프 (코요테·버퍼)" },
      { keys: ["마우스"], action: "카메라" },
      { keys: ["Q"], action: "밀치기 강탈" },
      { keys: ["1", "2", "3"], action: "퀵 이모트" },
      { keys: ["Enter"], action: "채팅" },
      { keys: ["Tab"], action: "랭킹 (명예의 전당)" },
      { keys: ["M"], action: "음악" },
    ],
    controlsImage: "/media/onlyup-duai/controls.png",
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
      {
        title: "정상에 닿은 뒤 — 한 방의 도박",
        caption:
          "정상 거래소의 [전량 매도] 버튼이 끝이 아니다. 이 런으로 번 포트폴리오 전부를 한 스핀에 거는 더블다운, 그리고 매도를 미루고 올라타면 곰이 추격해 오는 BULL RUN 무한 상승장이 기다린다.",
        cols: 4,
        aspect: "wide",
        items: [
          { src: "/media/onlyup-duai/end-victory.jpg", label: "신계 정상, 전량 매도 직전" },
          { src: "/media/onlyup-duai/end-slot.jpg", label: "더블다운 — 챙길까, 올인할까" },
          { src: "/media/onlyup-duai/end-jackpot.jpg", label: "MOON! ₿₿₿ ×4 잭팟" },
          { src: "/media/onlyup-duai/end-bullrun.jpg", label: "BULL RUN, 청산 곰의 추격" },
        ],
      },
      {
        title: "혼자 오르지 않는다",
        caption:
          "상주 서버 없이 Vercel 서버리스와 Redis 폴링으로 굴러가는 멀티플레이. 같은 탑을 오르는 고스트와 AI 봇, Q로 옆 사람 코인을 뺏는 강탈왕 쟁탈전, 금액·시간·체크포인트로 줄 세우는 명예의 전당, 그리고 런이 끝나면 뜨는 계좌 공유 카드까지.",
        cols: 4,
        aspect: "wide",
        items: [
          { src: "/media/onlyup-duai/mp-airace.jpg", label: "고스트·AI 봇과 같은 탑을 경쟁" },
          { src: "/media/onlyup-duai/mp-king.jpg", label: "가장 많이 턴 사람에게 붙는 👑 강탈왕" },
          { src: "/media/onlyup-duai/mp-rank.jpg", label: "명예의 전당 · 전체/오늘, 금액/시간/체크포인트" },
          { src: "/media/onlyup-duai/mp-share.jpg", label: "런이 끝나면 뜨는 오늘의 계좌 카드" },
        ],
      },
      {
        title: "숨겨진 방",
        caption:
          "1층 슬럼 구석엔 🍕 표식이 붙은 비밀 워프 패드가 있다. E로 들어가면 숨은 방과 그곳을 지키는 두니가 나오고, 정상 거래소로 가는 지름길이 열린다.",
        cols: 3,
        aspect: "wide",
        items: [
          { src: "/media/onlyup-duai/secret-entrance.jpg", label: "1층 구석, 🍕 표식의 비밀 통로" },
          { src: "/media/onlyup-duai/secret-room.jpg", label: "워프 너머 숨겨진 방" },
          { src: "/media/onlyup-duai/secret-kayjay.jpg", label: "히든룸을 지키는 두니" },
        ],
      },
    ],
  },
  {
    slug: "linktrip",
    title: "링크트립",
    tagline:
      "여행 단톡방에 흩어진 유튜브·릴스·블로그·지도 링크에서 장소를 자동으로 뽑아, 친구들과 같이 보는 지도 컬렉션과 하루 동선으로 묶어준다.",
    section: "projects",
    category: "Web",
    tags: ["여행", "지도", "장소 추출", "공유 컬렉션"],
    tech: [
      "Next.js 15",
      "FastAPI",
      "Supabase",
      "Leaflet",
      "Google Places API",
      "yt-dlp",
    ],
    year: 2026,
    status: "in-progress",
    span: 6,
    accent: "#059669",
    visual: "mesh",
    media: {
      poster: "/media/linktrip/poster.jpg",
      thumbnail: "/media/linktrip/thumb.jpg",
    },
    overview:
      "여행 단톡방엔 유튜브 맛집 영상, 인스타 릴스, 네이버 블로그 후기, 구글맵 링크가 매일 쌓이지만 며칠만 지나면 채팅에 묻혀 다시 못 찾는다. 링크트립은 카카오톡 단톡방 export 한 장을 받아 거기 등장한 모든 링크에서 실제 장소를 뽑아내고, 친구들과 같이 보며 좋아요를 누르는 공유 지도와 하루 동선으로 묶어준다. 정리한 장소는 구글 마이맵스로 그대로 내보낼 수 있다.",
    motivations: [
      {
        title: "며칠이면 채팅에 묻힌다",
        body: "단톡방에 던져진 링크들은 스크롤에 밀려 사라진다. 막상 떠날 때가 되면 '그 영상 어디 갔지'부터 시작한다.",
      },
      {
        title: "장소 정리는 매번 노가다",
        body: "영상 보고, 블로그 읽고, 이름 검색해서 지도에 하나씩 찍는 수작업. 이걸 사람 대신 파이프라인이 하게 했다.",
      },
      {
        title: "친구들과 같이 정하고 싶다",
        body: "누가 어떤 링크에서 추천했는지 출처째로 보여주고, 댓글 대신 좋아요만으로 가볍게 갈 곳을 추린다.",
      },
      {
        title: "최적의 동선을 정하기가 어렵다",
        body: "갈 곳은 정했는데 어떤 순서로 묶어 돌아야 효율적인지가 막막하다. 가까운 곳끼리 묶은 하루 동선을 대신 추천받고 싶었다.",
      },
      {
        title: "정리한 장소를 바로 지도로",
        body: "다시 옮겨 적지 않고 구글 마이맵스로 한 번에 내보내, 여행 당일 바로 길찾기로 이어지게.",
      },
    ],
    diagram: {
      image: "/media/linktrip/flow.jpg",
      caption:
        "단톡방 .txt 한 장이 친구들과 같이 보는 지도가 되기까지. 업로드 → 파싱·분류 → 콘텐츠 페치 → 장소 추출·매칭 → 저장·슬러그 발급 → 지도에서 보고 좋아요.",
    },
    features: [
      "9가지 링크를 자동 분류해 추출한다 — 유튜브·쇼츠·인스타·네이버 블로그는 자막과 본문에서, 구글맵 장소·마이맵스·저장 리스트·시트·닥스는 URL·KML 같은 결정론적 단서에서.",
      "텍스트에서 실제 장소를 뽑아 매칭한다. yt-dlp 자막·캡션과 블로그 본문에서 장소명을 추려 Google Places API로 place_id·좌표·사진·평점·가격대를 확정한다.",
      "친구들과 같이 보는 공유 지도. 장소 카드마다 출처 링크 미리보기(썸네일·제목·발췌)를 붙여 '왜 이 장소인지'가 한눈에 보인다. unlisted 슬러그로 받은 사람만, 장소당 좋아요 1표로 가볍게 추린다.",
      "하루 동선을 자동으로 추천한다. 가까운 곳끼리 묶어 Day별 루트로 펼치고, 미식 집중·여유 하이라이트·동네별 3가지 프리셋으로 성격을 바꾼다.",
      "구글 마이맵스로 내보내기. KML 다운로드로 정리한 장소를 본인 '내 지도'에 그대로 import해 여행 당일 길찾기로 이어진다.",
    ],
    showcases: [
      {
        title: "직접 써보기",
        caption:
          "도쿄 여행 단톡방 예시(5명 · 10개 링크)로 끝까지 돌려본 실제 화면. 업로드 한 번이면 지도 컬렉션과 장소 상세, 하루 동선까지 나온다.",
        cols: 4,
        aspect: "wide",
        early: true,
        items: [
          { src: "/media/linktrip/landing.jpg", label: "카카오톡 .txt 드롭 한 번으로 시작" },
          { src: "/media/linktrip/result.jpg", label: "지도 핀 + 출처 링크가 달린 장소 카드" },
          { src: "/media/linktrip/place-detail.jpg", label: "장소마다 평점·가격대·구글 리뷰와 출처" },
          { src: "/media/linktrip/planner.jpg", label: "가까운 곳끼리 묶은 Day별 동선 추천" },
        ],
      },
    ],
    outcome:
      "백엔드 추출 파이프라인과 프론트 화면(업로드 · 지도 컬렉션 · 하루 동선)은 도쿄 여행 픽스처로 끝까지 돌아간다. 비동기 잡·Supabase 저장과 공개 배포는 다음 단계.",
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
      {
        label: "GitHub 레포",
        href: "https://github.com/siosio34/research-ai-skills",
      },
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
    media: {
      thumbnail: "/media/eval-improve-skills/thumb.jpg",
      poster: "/media/eval-improve-skills/poster.jpg",
    },
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
      "한국인 페르소나는 nvidia/Nemotron-Personas-Korea(100만 레코드·26필드) 실데이터에서 타깃별로 샘플링, relevance weight(1~3) 가중 종합점수 10점 + GO/조건부GO/PIVOT/KILL 판정. 각 페르소나의 개별 사유(rationale)까지 펼쳐 본다.",
      "라운드마다 3렌즈 점수·모델·페르소나 상세와 직전 대비 Δ를 리포트로 남긴다. 채점은 --max-parallel로 병렬 처리하고, 개선 에이전트는 모델 간 폴백을 둬 한 모델이 막혀도 루프가 끊기지 않는다. 종료 규칙은 PASS를 넘겨서도 최고점을 끝까지 좇되, 최종본은 가장 잘 나온 버전을 복원한다.",
    ],
    outcome:
      "실제로 'AI 자동매매 봇 기획서'를 같은 초안에서 두 경로로 돌려봤다. 스킬 없이 1-pass로 다듬으면 목차·KPI·리스크 절이 붙어 겉보기 완성도는 올라가지만 아무도 신뢰를 검증하지 않는다. quality-gate-loop로 돌리자, 개선을 거듭할수록 native(서술 완성도)는 2→7로 올랐지만 persona(한국 사용자 신뢰)는 4.1→2.4로 떨어졌다 — 디테일·헤지가 늘수록 일반 사용자는 '리스크가 더 잘 보여서' 신뢰를 덜 했다. 단일 렌즈였다면 못 봤을 렌즈 간 괴리를 게이트가 포착해, 점수를 부풀리지 않고 정직하게 STOP한 뒤 텍스트로 못 고치는 신뢰·설계 문제를 사람에게 에스컬레이션하고 최고점 버전을 복원했다. '그럴듯함 ≠ 신뢰'를 숫자와 인용으로 드러내는 게 이 스킬의 값어치다. (합성 페르소나·LLM council 점수는 방향성 신호로, 실제 시장 검증을 대체하지 않는다.)",
    links: [
      {
        label: "비교 시연 — 스킬 vs 미사용",
        href: "/media/eval-improve-skills/comparison.html",
      },
      {
        label: "A/B 테스트 (3개 도메인)",
        href: "/media/eval-improve-skills/ab-test.html",
      },
      {
        label: "GitHub 레포",
        href: "https://github.com/siosio34/eval-improve-skills",
      },
    ],
    gallery: [
      {
        caption:
          "같은 초안, 두 경로. 스킬 없이 1-pass로 다듬은 결과와 quality-gate-loop를 나란히 둔 시연 페이지.",
        image: "/media/eval-improve-skills/compare-1-setup.jpg",
      },
      {
        caption:
          "렌즈 간 괴리. 개선할수록 native(완성도)는 2→7로 오르는데 persona(사용자 신뢰)는 4.1→2.4로 떨어진다 — 게이트가 잡아낸 신호.",
        image: "/media/eval-improve-skills/compare-2-divergence.jpg",
      },
      {
        caption:
          "라운드별 3렌즈 채점(native·external·persona)과 페르소나 개별 반응, 판정·Δ를 함께 남긴다.",
        image: "/media/eval-improve-skills/compare-3-rounds.jpg",
      },
      {
        caption:
          "3개 도메인(여행 챗·냉장고 레시피·랜딩 카피)에서 provenance를 가린 블라인드 A/B 투표로 스킬 효과를 검증.",
        image: "/media/eval-improve-skills/abtest.jpg",
      },
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
