"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";

gsap.registerPlugin(ScrollTrigger);

// Subtle scroll parallax on a visual. Motivated: adds depth to large editorial
// visuals so the gallery reads as layered rather than flat. Inner layer is
// over-scaled so the translate never exposes an edge. Collapses to static under
// reduced motion.
export function Parallax({
  children,
  strength = 12,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !wrap.current || !inner.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner.current,
        { yPercent: -strength },
        {
          yPercent: strength,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, wrap);
    return () => ctx.revert();
  }, [reduce, strength]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className ?? ""}`}>
      <div
        ref={inner}
        className="h-full w-full"
        style={{ scale: reduce ? 1 : 1.18 }}
      >
        {children}
      </div>
    </div>
  );
}
