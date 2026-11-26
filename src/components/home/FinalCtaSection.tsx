import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { whatsapp } from "@/config/site";
import { MaskReveal } from "@/components/home/MotionPrimitives";

export default function FinalCtaSection() {
  const waHref = whatsapp();

  return (
    <section
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-[#f26a2e] py-20 text-[#0d0d0d] sm:py-24 lg:py-28"
    >
      {/* Líneas diagonales derivadas de la retícula N */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.12]"
      >
        <line
          x1="1120"
          y1="0"
          x2="820"
          y2="520"
          stroke="#0D0D0D"
          strokeWidth="1.2"
        />
        <line
          x1="1340"
          y1="0"
          x2="1040"
          y2="520"
          stroke="#0D0D0D"
          strokeWidth="1.2"
        />
      </svg>

      <div className="nord-container relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#0d0d0d] uppercase">
              08 / Siguiente paso
            </p>
            <MaskReveal>
              <h2
                id="final-cta-title"
                className="font-display m-0 mt-4 max-w-[17ch] text-[clamp(1.85rem,4.6vw,3.9rem)] leading-[1.06] tracking-[-0.03em] text-[#0d0d0d] uppercase"
              >
                ¿Tienes un proyecto en mente? Hagamos que tu marca se sienta
                diferente.
              </h2>
            </MaskReveal>
          </div>

          <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
            <p className="m-0 max-w-[36ch] text-base font-medium leading-relaxed text-[#0d0d0d]/90 lg:text-right">
              Cuéntanos qué necesitas diseñar y preparamos una propuesta acorde
              a tu etapa y objetivos.
            </p>
            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                href="/contacto"
                className="group inline-flex min-h-[48px] items-center gap-3 bg-[#0d0d0d] px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-[#f4efe9] uppercase transition-colors hover:bg-[#191919]"
              >
                <span>Inicia tu proyecto</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              {waHref ? (
                <a
                  href={waHref}
                  className="inline-flex min-h-[48px] items-center gap-2 border border-[#0d0d0d] px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-[#0d0d0d] uppercase transition-colors hover:bg-[#0d0d0d] hover:text-[#f4efe9]"
                >
                  <span>WhatsApp</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  href="/servicios"
                  className="inline-flex min-h-[48px] items-center gap-2 border border-[#0d0d0d] px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-[#0d0d0d] uppercase transition-colors hover:bg-[#0d0d0d] hover:text-[#f4efe9]"
                >
                  <span>Explorar servicios</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
