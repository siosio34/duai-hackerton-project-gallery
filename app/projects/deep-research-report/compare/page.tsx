import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { ResearchCompare } from "@/components/ResearchCompare";

export const metadata: Metadata = {
  title: "같은 질문, 두 가지 방식 — A/B 대조",
  description:
    "일반응답 vs deep-research 스킬을 같은 주제·같은 날·같은 한국어로 돌린 정직한 A/B 비교. 실측 토큰·인용·검증 라운드로 본 격차.",
  openGraph: {
    title: "같은 질문, 두 가지 방식 — Deep Research A/B",
    description:
      "일반응답 vs deep-research 스킬의 정직한 A/B 비교 — 실측 메트릭으로 본 격차.",
    type: "article",
  },
};

export default function ResearchComparePage() {
  return (
    <main className="min-h-[100dvh]">
      <Nav />
      <ResearchCompare />
      <Footer />
    </main>
  );
}
