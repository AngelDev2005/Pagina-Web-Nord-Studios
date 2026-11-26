"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { steps } from "@/config/es";
import { MaskReveal, ScrollReveal } from "@/components/home/MotionPrimitives";

export default function ProcessSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="proceso"
      aria-labelledby="process-title"
      className="relative overflow-hidden border-y border-[#f4efe9]/12 bg-[#141414] py-16 text-[#f4efe9] sm:py-24 lg:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-25 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,106,46,0.55) 0%, transparent 70%)",
        }}
      />

      <div className="nord-container relative z-10">
        <div className="flex flex-col justify-between gap-6 border-b border-[#f4efe9]/14 pb-8 lg:flex-row lg:items-end">
          <div>
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#f26a2e] uppercase">
              05 / Proceso creativo
            </p>
            <MaskReveal>
              <h2
                id="process-title"
                className="font-display m-0 mt-3 max-w-[20ch] text-[clamp(1.75rem,4vw,3.3rem)] leading-[1.08] tracking-[-0.025em] uppercase"
              >
                De una idea a una identidad con dirección.
              </h2>
            </MaskReveal>
          </div>
          <p className="m-0 max-w-[40ch] text-sm leading-relaxed text-[#b5b0a8] sm:text-base">
            Para empezar solo necesitas contarnos qué hace tu negocio, qué
            piezas necesitas y cuál es tu objetivo. Nosotros ordenamos el
            camino.
          </p>
        </div>

        <ol className="m-0 mt-10 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-5">
          {steps.map(([title, description], idx) => {
            const isSelected = active === idx;
            return (
              <li key={title}>
                <ScrollReveal delay={idx * 0.05} className="h-full">
                  <div
                    onMouseEnter={() => setActive(idx)}
                    onFocus={() => setActive(idx)}
                    className={`flex h-full flex-col justify-between border p-6 transition-colors duration-200 ${
                      isSelected
                        ? "border-[#f26a2e] bg-[#191919]"
                        : "border-[#f4efe9]/14 bg-[#0d0d0d]/75 hover:border-[#f4efe9]/35"
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-[#f4efe9]/12 pb-4">
                        <span
                          className={`font-display text-2xl transition-colors ${
                            isSelected ? "text-[#f26a2e]" : "text-[#f4efe9]/65"
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <span
                          aria-hidden="true"
                          className={`h-2 w-2 transition-colors ${
                            isSelected ? "bg-[#f26a2e]" : "bg-[#f4efe9]/25"
                          }`}
                        />
                      </div>

                      <h3 className="font-display m-0 mt-5 text-base leading-snug tracking-[-0.015em] text-[#f4efe9] uppercase">
                        {title}
                      </h3>
                      <p className="m-0 mt-3 text-sm leading-relaxed text-[#b5b0a8]">
                        {description}
                      </p>
                    </div>

                    <span className="mt-6 block font-mono text-[11px] tracking-[0.16em] text-[#b5b0a8]/80 uppercase">
                      Etapa 0{idx + 1} / 05
                    </span>
                  </div>
                </ScrollReveal>
              </li>
            );
          })}
        </ol>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#f4efe9]/14 pt-6">
          <p className="m-0 text-sm text-[#b5b0a8]">
            Trabajamos con hitos definidos y comunicación directa en Trujillo y
            en modalidad remota.
          </p>
          <Link
            href="/contacto"
            className="inline-flex min-h-[44px] items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#f26a2e] uppercase transition-colors hover:text-[#ff7c40]"
          >
            <span>Agendar primer diagnóstico</span>
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
