"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Minus, Plus } from "lucide-react";
import { faqs } from "@/config/es";
import { MaskReveal } from "@/components/home/MotionPrimitives";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion();

  return (
    <section
      id="preguntas"
      aria-labelledby="faq-title"
      className="border-t border-[#f4efe9]/12 bg-[#0d0d0d] py-16 text-[#f4efe9] sm:py-24 lg:py-28"
    >
      <div className="nord-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#f26a2e] uppercase">
              07 / Preguntas frecuentes
            </p>
            <MaskReveal>
              <h2
                id="faq-title"
                className="font-display m-0 mt-3 text-[clamp(1.75rem,3.6vw,2.9rem)] leading-[1.08] tracking-[-0.025em] uppercase"
              >
                Claridad antes de empezar.
              </h2>
            </MaskReveal>
            <p className="mt-4 max-w-[34ch] text-base text-[#b5b0a8]">
              Respuestas directas sobre cómo iniciamos, modalidad de pago,
              revisiones y entregables.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#f26a2e] uppercase transition-colors hover:text-[#ff7c40]"
            >
              <span>Resolver una duda puntual</span>
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="divide-y divide-[#f4efe9]/14 border-y border-[#f4efe9]/14">
              {faqs.map(([question, answer], idx) => {
                const isOpen = openIndex === idx;
                const panelId = `faq-panel-${idx}`;
                const buttonId = `faq-button-${idx}`;

                return (
                  <div key={question} className="py-1">
                    <h3 className="m-0">
                      <button
                        id={buttonId}
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={panelId}
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="flex min-h-[60px] w-full cursor-pointer items-center justify-between gap-4 bg-transparent py-5 text-left text-[#f4efe9] transition-colors hover:text-[#f26a2e]"
                      >
                        <span className="flex items-baseline gap-4">
                          <span className="font-mono text-xs text-[#f26a2e]">
                            0{idx + 1}
                          </span>
                          <span className="text-base font-bold sm:text-lg">
                            {question}
                          </span>
                        </span>
                        <span
                          aria-hidden="true"
                          className={`inline-flex h-8 w-8 shrink-0 items-center justify-center border transition-colors ${
                            isOpen
                              ? "border-[#f26a2e] bg-[#f26a2e] text-[#0d0d0d]"
                              : "border-[#f4efe9]/20 text-[#f4efe9]"
                          }`}
                        >
                          {isOpen ? (
                            <Minus className="h-4 w-4" />
                          ) : (
                            <Plus className="h-4 w-4" />
                          )}
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={panelId}
                          role="region"
                          aria-labelledby={buttonId}
                          initial={
                            reduced ? { opacity: 1 } : { height: 0, opacity: 0 }
                          }
                          animate={
                            reduced
                              ? { opacity: 1 }
                              : { height: "auto", opacity: 1 }
                          }
                          exit={
                            reduced ? { opacity: 0 } : { height: 0, opacity: 0 }
                          }
                          transition={{
                            duration: reduced ? 0 : 0.24,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className="overflow-hidden"
                        >
                          <p className="m-0 pb-6 pl-8 pr-4 text-base leading-relaxed text-[#b5b0a8]">
                            {answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
