import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/config/es";
import { MaskReveal, ScrollReveal } from "@/components/home/MotionPrimitives";

export default function ServicesSection() {
  return (
    <section
      id="servicios"
      aria-labelledby="services-title"
      className="border-t border-[#f4efe9]/12 bg-[#0d0d0d] py-16 text-[#f4efe9] sm:py-24 lg:py-28"
    >
      <div className="nord-container">
        <div className="grid gap-8 border-b border-[#f4efe9]/14 pb-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#f26a2e] uppercase">
              03 / Servicios
            </p>
            <MaskReveal>
              <h2
                id="services-title"
                className="font-display m-0 mt-3 text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.025em] uppercase"
              >
                Disciplinas creativas con criterio comercial.
              </h2>
            </MaskReveal>
          </div>
          <div className="flex flex-col items-start gap-5 lg:col-span-5 lg:items-end lg:text-right">
            <p className="m-0 max-w-[40ch] text-base text-[#b5b0a8]">
              Trabajamos desde piezas puntuales hasta sistemas completos de
              marca y contenido recurrente.
            </p>
            <Link
              href="/servicios"
              className="group inline-flex min-h-[44px] items-center gap-2 border border-[#f4efe9]/25 px-5 py-2.5 text-xs font-bold tracking-[0.14em] text-[#f4efe9] uppercase transition-colors hover:border-[#f26a2e] hover:text-[#f26a2e]"
            >
              <span>Ver todas las disciplinas</span>
              <ArrowRight
                aria-hidden="true"
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        <ul className="m-0 list-none divide-y divide-[#f4efe9]/14 border-b border-[#f4efe9]/14 p-0">
          {services.map((s, idx) => (
            <li key={s.slug}>
              <ScrollReveal delay={idx * 0.04}>
                <div className="group relative grid gap-6 py-8 transition-colors duration-200 hover:bg-[#141414] sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-8 lg:px-4">
                  <span
                    aria-hidden="true"
                    className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-[#f26a2e] transition-transform duration-200 group-hover:scale-y-100"
                  />

                  <div className="flex items-baseline gap-4 lg:col-span-5">
                    <span className="font-display text-xl text-[#f26a2e] sm:text-2xl">
                      0{idx + 1}
                    </span>
                    <div>
                      <h3 className="font-display m-0 text-xl tracking-[-0.02em] text-[#f4efe9] uppercase sm:text-2xl">
                        <Link
                          href={"/servicios/" + s.slug}
                          className="text-[#f4efe9] no-underline transition-colors group-hover:text-[#f26a2e]"
                        >
                          {s.name}
                        </Link>
                      </h3>
                      <p className="m-0 mt-2 max-w-[44ch] text-sm leading-relaxed text-[#b5b0a8] sm:text-base">
                        {s.intro}
                      </p>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                      {s.items.map((deliverable) => (
                        <li
                          key={deliverable}
                          className="border border-[#f4efe9]/16 px-3 py-1.5 text-xs text-[#f4efe9]/85"
                        >
                          {deliverable}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 lg:col-span-3 lg:justify-end">
                    <Link
                      href={"/servicios/" + s.slug}
                      className="inline-flex min-h-[44px] items-center gap-1.5 border border-[#f4efe9]/25 px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#f4efe9] uppercase transition-colors hover:border-[#f4efe9]"
                    >
                      <span>Explorar</span>
                      <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                    </Link>
                    <Link
                      href={"/contacto?servicio=" + s.slug}
                      className="inline-flex min-h-[44px] items-center gap-1.5 bg-[#f26a2e] px-4 py-2 text-xs font-bold tracking-[0.12em] text-[#0d0d0d] uppercase transition-colors hover:bg-[#ff7c40]"
                    >
                      <span>Cotizar</span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5"
                      />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
