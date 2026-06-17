"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

// Editorial masthead. GSAP drives a one-time line-rise intro on mount —
// motivated as storytelling (the page introduces itself in sequence).
// Honors reduced motion by rendering everything static.
export function Masthead({
  projects,
  automation,
  skills,
  years,
}: {
  projects: number;
  automation: number;
  skills: number;
  years: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !root.current) return;
    const ctx = gsap.context(() => {
      gsap.set(".mh-rise", { yPercent: 110 });
      gsap.set(".mh-fade", { opacity: 0, y: 16 });
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.to(".mh-rise", {
        yPercent: 0,
        duration: 1.1,
        stagger: 0.12,
      })
        .to(
          ".mh-fade",
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.7",
        );
    }, root);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section
      ref={root}
      className="mx-auto max-w-[1400px] px-5 pb-16 pt-20 sm:px-8 sm:pb-24 sm:pt-24"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-9">
          <p className="mh-fade meta-label mb-5">Heka의 프로젝트 갤러리</p>
          <h1 className="display text-[2rem] font-semibold text-ink sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="mh-rise inline-block">직접 만들고 배포한</span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span className="mh-rise inline-block">
                <span className="text-accent">프로젝트</span>와 스킬.
              </span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col justify-end lg:col-span-3">
          <p className="mh-fade max-w-[34ch] break-keep text-base leading-relaxed text-ink-soft">
            3D 게임부터 데이터 수집·검증 자동화, 리서치·평가를 돕는 Claude Code
            스킬까지. 각 카드를 열면 무엇을, 왜, 어떻게 만들었는지로 이어집니다.
          </p>
        </div>
      </div>

      <dl className="mh-fade mt-14 grid grid-cols-4 gap-4 border-t border-line pt-6 sm:max-w-2xl sm:gap-6">
        <div>
          <dt className="meta-label">프로젝트</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {String(projects).padStart(2, "0")}
          </dd>
        </div>
        <div>
          <dt className="meta-label">자동화</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {String(automation).padStart(2, "0")}
          </dd>
        </div>
        <div>
          <dt className="meta-label">스킬</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {String(skills).padStart(2, "0")}
          </dd>
        </div>
        <div>
          <dt className="meta-label">기간</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {years}
          </dd>
        </div>
      </dl>
    </section>
  );
}
