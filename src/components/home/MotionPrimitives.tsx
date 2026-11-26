"use client";

import { useEffect, useRef, useState } from "react";
import {
  MotionConfig,
  useReducedMotion,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import { Pause, Play } from "lucide-react";

export function NordMotionRoot({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

function useBelowFoldReveal(delay: number, variant: "slide" | "mask") {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner || reduced) return;

    const initialRect = outer.getBoundingClientRect();
    if (initialRect.top <= window.innerHeight * 1.02) return;

    inner.style.opacity = variant === "mask" ? "0.2" : "0";
    inner.style.transform =
      variant === "mask"
        ? "translate3d(0, 100%, 0)"
        : "translate3d(0, 18px, 0)";

    let done = false;
    const reveal = () => {
      if (done) return;
      done = true;
      inner.style.transition =
        variant === "mask"
          ? `transform 560ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, opacity 420ms ease ${delay}s`
          : `opacity 480ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 520ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;
      inner.style.opacity = "1";
      inner.style.transform = "translate3d(0, 0, 0)";
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };

    const onScroll = () => {
      const r = outer.getBoundingClientRect();
      if (r.top <= window.innerHeight * 1.02) reveal();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (
            entry.isIntersecting ||
            entry.boundingClientRect.top <= window.innerHeight
          ) {
            reveal();
          }
        }
      },
      { threshold: 0, rootMargin: "40px 0px 40px 0px" },
    );

    observer.observe(outer);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [delay, reduced, variant]);

  return { outerRef, innerRef };
}

export function ScrollReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { outerRef, innerRef } = useBelowFoldReveal(delay, "slide");

  return (
    <div ref={outerRef} className={className}>
      <div ref={innerRef} className="h-full">
        {children}
      </div>
    </div>
  );
}

export function MaskReveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { outerRef, innerRef } = useBelowFoldReveal(delay, "mask");

  return (
    <div ref={outerRef} className="overflow-hidden">
      <div ref={innerRef} className={className}>
        {children}
      </div>
    </div>
  );
}

export function HeroBeamParallax() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, 72]);

  if (reduced) {
    return <div aria-hidden="true" className="nord-beam-primary" />;
  }

  return (
    <motion.div
      aria-hidden="true"
      style={{ y }}
      className="nord-beam-primary"
    />
  );
}

const MARQUEE_ITEMS = [
  "BRANDING",
  "IDENTIDAD VISUAL",
  "DISEÑO GRÁFICO",
  "SOCIAL MEDIA",
  "EDICIÓN AUDIOVISUAL",
  "TRUJILLO · PERÚ",
];

export function MarqueeBand() {
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div
      className="nord-marquee relative border-y border-[#0d0d0d]/20 bg-[#f26a2e] text-[#0d0d0d]"
      data-paused={paused || reduced ? "true" : "false"}
    >
      <div className="flex items-center">
        <div className="min-w-0 flex-1 overflow-hidden py-3.5">
          <div className="nord-marquee-track">
            {[0, 1].map((loop) => (
              <div
                key={loop}
                aria-hidden={loop === 1 ? "true" : undefined}
                className="flex shrink-0 items-center"
              >
                {MARQUEE_ITEMS.map((item) => (
                  <span
                    key={`${loop}-${item}`}
                    className="inline-flex items-center gap-6 px-4 font-display text-xs tracking-[0.08em] uppercase sm:px-6 sm:text-sm"
                  >
                    <span>{item}</span>
                    <span
                      aria-hidden="true"
                      className="inline-block h-1.5 w-1.5 bg-[#0d0d0d]"
                    />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-pressed={paused}
          aria-label={
            paused
              ? "Reanudar banda de disciplinas"
              : "Pausar banda de disciplinas"
          }
          onClick={() => setPaused((prev) => !prev)}
          className="inline-flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border-l border-[#0d0d0d]/25 bg-[#f26a2e] px-3 text-[#0d0d0d] transition-colors hover:bg-[#ff7c40]"
        >
          {paused ? (
            <Play aria-hidden="true" className="h-3.5 w-3.5" />
          ) : (
            <Pause aria-hidden="true" className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
    </div>
  );
}
