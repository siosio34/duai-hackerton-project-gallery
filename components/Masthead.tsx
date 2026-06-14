"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "motion/react";

// Editorial masthead. GSAP drives a one-time line-rise intro on mount —
// motivated as storytelling (the page introduces itself in sequence).
// Honors reduced motion by rendering everything static.
export function Masthead({
  count,
  years,
  disciplines,
}: {
  count: number;
  years: string;
  disciplines: number;
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
          <h1 className="display text-[2rem] font-semibold text-ink sm:text-6xl lg:text-7xl">
            <span className="block overflow-hidden">
              <span className="mh-rise inline-block">An index of built</span>
            </span>
            <span className="block overflow-hidden">
              <span className="mh-rise inline-block">
                things, and how they
              </span>
            </span>
            <span className="block overflow-hidden">
              <span className="mh-rise inline-block text-accent">happened.</span>
            </span>
          </h1>
        </div>

        <div className="flex flex-col justify-end lg:col-span-3">
          <p className="mh-fade max-w-[34ch] text-base leading-relaxed text-ink-soft">
            Realtime systems, design tooling, and software made for the field.
            Each entry opens into how it was built.
          </p>
        </div>
      </div>

      <dl className="mh-fade mt-14 grid grid-cols-3 gap-4 border-t border-line pt-6 sm:max-w-xl sm:gap-6">
        <div>
          <dt className="meta-label">Projects</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {String(count).padStart(2, "0")}
          </dd>
        </div>
        <div>
          <dt className="meta-label">Span</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {years}
          </dd>
        </div>
        <div>
          <dt className="meta-label">Fields</dt>
          <dd className="mt-1 font-mono text-lg font-medium tabular-nums text-ink sm:text-2xl">
            {String(disciplines).padStart(2, "0")}
          </dd>
        </div>
      </dl>
    </section>
  );
}
