"use client";

import { motion, useReducedMotion } from "motion/react";

const ease = [0.22, 1, 0.36, 1] as const;

type Scrap = {
  icon: string;
  brand: string; // thumbnail color
  title: string;
  domain: string;
};

type Msg = {
  user: string;
  me?: boolean;
  text: string;
  time: string;
  link?: { url: string; scrap: Scrap };
};

// Avatar color + initial per participant (KakaoTalk-style rounded-square avatars).
const PEOPLE: Record<string, { initial: string; color: string }> = {
  "사이프 김영빈님": { initial: "김", color: "#7C9CBF" },
  "사이프 한유진님": { initial: "한", color: "#C98B9E" },
  "사이프 문제웅님": { initial: "문", color: "#6FAE9B" },
  "디프만 이정민님": { initial: "이", color: "#B69A6B" },
};

// Curated slice of the real tokyo-chat.csv fixture — the messages that carry the
// 8 supported link types, in conversation order. This is the literal input the
// pipeline ingests; the "직접 써보기" output right below is the result.
const DAYS: { date: string; msgs: Msg[] }[] = [
  {
    date: "2026년 5월 25일 월요일",
    msgs: [
      { user: "조영제", me: true, text: "다들 7월 첫째주에 도쿄 어때요? 3박4일 정도", time: "오후 9:14" },
      { user: "사이프 한유진님", text: "저도 콜이요~", time: "오후 9:18" },
      {
        user: "조영제",
        me: true,
        text: "그럼 일단 가고싶은 곳 막 던져주세요. 영상이든 블로그든. 나중에 제가 정리할게요",
        time: "오후 9:24",
      },
    ],
  },
  {
    date: "2026년 5월 26일 화요일",
    msgs: [
      {
        user: "사이프 김영빈님",
        text: "이거 보고 도쿄 가고싶어졌었음 ㅋㅋ 시부야/신주쿠 정리 잘되어있어요",
        time: "오후 12:48",
        link: {
          url: "https://youtube.com/watch?v=vOJI6BdKhXA",
          scrap: { icon: "▶", brand: "#FF0000", title: "도쿄 시부야·신주쿠 완벽 정리 | 4박5일 브이로그", domain: "YouTube" },
        },
      },
      {
        user: "사이프 한유진님",
        text: "저도 이거 보고 가고싶었어요. 츠키지/긴자쪽 맛집 위주에요",
        time: "오후 7:21",
        link: {
          url: "https://youtube.com/watch?v=GJgF-iri0W8",
          scrap: { icon: "▶", brand: "#FF0000", title: "도쿄 츠키지·긴자 맛집 투어", domain: "YouTube" },
        },
      },
      {
        user: "사이프 문제웅님",
        text: "쇼츠긴한데 이 라멘집 너무 가보고싶음",
        time: "오후 10:13",
        link: {
          url: "https://youtube.com/shorts/hjEYscNRmMY",
          scrap: { icon: "◆", brand: "#FF0000", title: "이 라멘집 미쳤다 #도쿄 #라멘", domain: "YouTube Shorts" },
        },
      },
    ],
  },
  {
    date: "2026년 5월 27일 수요일",
    msgs: [
      {
        user: "디프만 이정민님",
        text: "아침에 출근하면서 봤는데 이 블로그 정리 미친듯. 3박4일 코스 다 짜놓으셨네요",
        time: "오전 9:42",
        link: {
          url: "https://blog.naver.com/everybean/224178608652",
          scrap: { icon: "✎", brand: "#03C75A", title: "도쿄 3박4일 완벽 코스 총정리", domain: "네이버 블로그" },
        },
      },
      {
        user: "사이프 김영빈님",
        text: "이 릴스도 봐주세요 ㅋㅋ 다이칸야마 카페인데 분위기 좋아보여요",
        time: "오후 1:18",
        link: {
          url: "https://instagram.com/reel/DXilywuiS8J",
          scrap: { icon: "◎", brand: "#E1306C", title: "다이칸야마 감성 브런치 카페", domain: "Instagram" },
        },
      },
    ],
  },
  {
    date: "2026년 5월 28일 목요일",
    msgs: [
      {
        user: "조영제",
        me: true,
        text: "어제 다들 던져주신거 보고 하나 찍어봤어요. 여기 첫날 점심 어때요",
        time: "오전 11:32",
        link: {
          url: "https://maps.app.goo.gl/mPoYcCSLtcg1LGvf9",
          scrap: { icon: "◉", brand: "#34A853", title: "American Diner Andra · 아사쿠사", domain: "Google Maps" },
        },
      },
      {
        user: "조영제",
        me: true,
        text: "일단 다들 던져주신 장소들 지도에 모아봤어요. 빠진거 있으면 알려주세요",
        time: "오후 10:19",
        link: {
          url: "https://google.com/maps/d/viewer?mid=1zCAMXo…",
          scrap: { icon: "▦", brand: "#1A73E8", title: "도쿄 여행 핀 모음 지도", domain: "Google My Maps" },
        },
      },
      { user: "사이프 김영빈님", text: "오 진짜 지도로보니까 동선 짜기 편하네요", time: "오후 10:25" },
    ],
  },
  {
    date: "2026년 5월 29일 금요일",
    msgs: [
      {
        user: "사이프 한유진님",
        text: "저 일정표 시트로 정리해봤어요~ Day1~Day4 시간대별로 칸 만들었으니 채워주세요",
        time: "오전 8:55",
        link: {
          url: "https://docs.google.com/spreadsheets/d/169degag…",
          scrap: { icon: "▤", brand: "#0F9D58", title: "도쿄 일정표 Day1–4 시간대별", domain: "Google Sheets" },
        },
      },
      {
        user: "사이프 김영빈님",
        text: "숙소 후보 몇개 모아서 문서 만들어봤어요. 신주쿠/시부야/긴자 비교",
        time: "오후 6:48",
        link: {
          url: "https://docs.google.com/document/d/1STZUO1fmeN2…",
          scrap: { icon: "▣", brand: "#4285F4", title: "도쿄 숙소 후보 비교 (신주쿠·시부야·긴자)", domain: "Google Docs" },
        },
      },
    ],
  },
];

function LinkScrap({ scrap }: { scrap: Scrap }) {
  return (
    <a
      className="mt-1.5 flex overflow-hidden rounded-lg border border-black/[0.06] bg-white/90"
      onClick={(e) => e.preventDefault()}
      href="#"
    >
      <span
        className="flex w-12 shrink-0 items-center justify-center text-lg text-white"
        style={{ backgroundColor: scrap.brand }}
      >
        {scrap.icon}
      </span>
      <span className="min-w-0 px-2.5 py-1.5">
        <span className="block truncate text-[0.78rem] font-medium text-[#1a1a1a]">
          {scrap.title}
        </span>
        <span className="mt-0.5 block truncate text-[0.68rem] text-[#8a8a8a]">
          {scrap.domain}
        </span>
      </span>
    </a>
  );
}

export function LinktripChat() {
  const reduce = useReducedMotion();

  return (
    <section className="mt-24 border-t border-line pt-10">
      <h2 className="meta-label mb-3">이런 단톡방이 들어가면</h2>
      <p className="mb-9 max-w-[62ch] break-keep leading-relaxed text-ink-soft">
        도쿄 여행 단톡방 .txt 한 장(5명 · 열흘 대화)이 입력이다. 영상·쇼츠·릴스·블로그·지도
        링크가 잡담에 섞여 흐른다. 이 대화에서 링크만 골라 장소를 뽑은 결과가 바로 아래
        ‘직접 써보기’의 지도다.
      </p>

      {/* KakaoTalk-style chat */}
      <div className="mx-auto max-w-[430px] overflow-hidden rounded-[26px] border border-black/10 shadow-xl">
        {/* header */}
        <div className="flex items-center gap-2 bg-[#9db8d2] px-4 py-3 text-[#1c1c1c]">
          <span className="text-xl leading-none">‹</span>
          <div className="min-w-0 flex-1 text-center">
            <p className="truncate text-[0.92rem] font-semibold">
              도쿄 여행 단톡방 <span className="font-normal text-[#3c5267]">5</span>
            </p>
          </div>
          <span className="text-lg leading-none">☰</span>
        </div>

        {/* chat body */}
        <div className="bg-[#b2c7da] px-3 py-4">
          {DAYS.map((day) => (
            <div key={day.date}>
              <div className="my-3 flex justify-center">
                <span className="rounded-full bg-black/15 px-3 py-1 text-[0.68rem] text-white/95">
                  {day.date}
                </span>
              </div>
              {day.msgs.map((m, i) => {
                const prev = day.msgs[i - 1];
                const grouped = prev && prev.user === m.user;
                const person = PEOPLE[m.user];
                return (
                  <motion.div
                    key={i}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.35, ease }}
                    className={`flex gap-2 ${grouped ? "mt-1" : "mt-2.5"} ${
                      m.me ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    {/* avatar (friends only, first of a group) */}
                    {!m.me &&
                      (grouped ? (
                        <span className="w-9 shrink-0" />
                      ) : (
                        <span
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[14px] text-sm font-medium text-white"
                          style={{ backgroundColor: person?.color ?? "#9aa7b4" }}
                        >
                          {person?.initial ?? "?"}
                        </span>
                      ))}

                    <div
                      className={`flex max-w-[78%] flex-col ${
                        m.me ? "items-end" : "items-start"
                      }`}
                    >
                      {!m.me && !grouped && (
                        <span className="mb-1 ml-0.5 text-[0.72rem] text-[#33475b]">
                          {m.user}
                        </span>
                      )}
                      <div
                        className={`flex items-end gap-1.5 ${
                          m.me ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`break-keep rounded-2xl px-3 py-2 text-[0.84rem] leading-relaxed shadow-sm ${
                            m.me
                              ? "rounded-tr-md bg-[#FEE500] text-[#1c1c1c]"
                              : "rounded-tl-md bg-white text-[#1c1c1c]"
                          }`}
                        >
                          <p>{m.text}</p>
                          {m.link && (
                            <>
                              <a
                                href="#"
                                onClick={(e) => e.preventDefault()}
                                className="mt-0.5 block truncate text-[0.78rem] text-[#3b6ea5] underline"
                              >
                                {m.link.url}
                              </a>
                              <LinkScrap scrap={m.link.scrap} />
                            </>
                          )}
                        </div>
                        <span className="mb-0.5 shrink-0 text-[0.62rem] text-[#5b6b7c]">
                          {m.time}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ))}

          <p className="mt-5 text-center text-[0.68rem] text-[#3c5267]">
            잡담은 흘려보내고 링크 8종만 골라 장소를 추출한다
          </p>
        </div>
      </div>

      <div className="mt-6 flex justify-center text-2xl text-ink-mute" aria-hidden>
        ↓
      </div>
    </section>
  );
}
