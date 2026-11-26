import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/config/es";
import { HeroBeamParallax } from "@/components/home/MotionPrimitives";

export default function HomeHero({ hasProjects }: { hasProjects: boolean }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="nord-beam-stage relative border-b border-[#f4efe9]/14 bg-[#0d0d0d] text-[#f4efe9]"
    >
      <HeroBeamParallax />
      <div aria-hidden="true" className="nord-grain absolute inset-0" />

      {/* Retícula arquitectónica diagonal inspirada en la lámina V2 */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.11]"
      >
        <line
          x1="980"
          y1="0"
          x2="520"
          y2="800"
          stroke="#F4EFE9"
          strokeWidth="1"
        />
        <line
          x1="1280"
          y1="0"
          x2="820"
          y2="800"
          stroke="#F26A2E"
          strokeWidth="1"
        />
        <line
          x1="0"
          y1="140"
          x2="1440"
          y2="140"
          stroke="#F4EFE9"
          strokeWidth="0.75"
        />
      </svg>

      <div className="nord-container relative z-10 pb-14 pt-6 sm:pb-20 sm:pt-8 lg:pb-24 lg:pt-10">
        {/* Barra superior editorial */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#f4efe9]/14 pb-4 text-[11px] font-medium tracking-[0.18em] text-[#b5b0a8] uppercase">
          <div className="flex items-center gap-3">
            <span
              className="inline-block h-2 w-2 bg-[#f26a2e]"
              aria-hidden="true"
            />
            <span>01 / Estudio Creativo Independiente — Perú</span>
          </div>
          <span className="hidden text-[#f4efe9]/75 sm:inline">
            Creative Direction for Modern Brands
          </span>
        </div>

        {/* Titular principal sobredimensionado — visible en primer pintado (LCP) */}
        <div className="mt-8 sm:mt-12 lg:mt-14">
          <p className="mb-4 text-[11px] font-bold tracking-[0.22em] text-[#f26a2e] uppercase sm:text-xs">
            Trujillo · Atención en todo el Perú
          </p>
          <h1
            id="hero-title"
            className="font-display m-0 max-w-[16ch] text-[clamp(1.95rem,5.8vw,5.1rem)] leading-[1.06] tracking-[-0.025em] text-[#f4efe9] uppercase"
          >
            Diseñamos <span className="text-[#f26a2e]">marcas</span> que dejan
            huella.
          </h1>
        </div>

        {/* Composición asimétrica inferior */}
        <div className="mt-10 grid items-end gap-10 border-t border-[#f4efe9]/14 pt-8 lg:mt-14 lg:grid-cols-12 lg:gap-10 lg:pt-10">
          <div className="lg:col-span-7">
            <p className="m-0 max-w-[50ch] text-base leading-relaxed text-[#f4efe9]/86 sm:text-lg lg:text-xl">
              Creamos identidades visuales y contenido gráfico para marcas que
              buscan diferenciarse, conectar y comunicar con claridad.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                href="/contacto"
                className="group inline-flex min-h-[48px] items-center gap-3 bg-[#f26a2e] px-6 py-3.5 text-sm font-bold tracking-[0.08em] text-[#0d0d0d] uppercase transition-colors duration-150 hover:bg-[#ff7c40]"
              >
                <span>Inicia tu proyecto</span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>

              <Link
                href={hasProjects ? "/proyectos" : "/servicios"}
                className="group inline-flex min-h-[48px] items-center gap-3 border border-[#f4efe9]/28 bg-[#0d0d0d]/70 px-6 py-3.5 text-sm font-medium tracking-[0.08em] text-[#f4efe9] uppercase transition-colors duration-150 hover:border-[#f26a2e] hover:text-[#f26a2e]"
              >
                {hasProjects ? "Ver proyectos" : "Explorar servicios"}
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>

          {/* Bloque arquitectónico de disciplinas e isotipo V2 */}
          <div className="lg:col-span-5">
            <div className="border border-[#f4efe9]/16 bg-[#0d0d0d]/80 p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-[#f4efe9]/12 pb-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/mark-orange.png"
                    alt="Isotipo geométrico de Nord Studios"
                    width={513}
                    height={349}
                    className="h-7 w-auto"
                  />
                  <span className="text-[11px] font-bold tracking-[0.18em] text-[#b5b0a8] uppercase">
                    Disciplinas
                  </span>
                </div>
                <span className="text-[11px] tracking-[0.16em] text-[#f26a2e] uppercase">
                  04 Áreas
                </span>
              </div>

              <ul className="m-0 mt-3 grid list-none gap-1 p-0 sm:grid-cols-2 sm:gap-x-4">
                {services.map((s, idx) => (
                  <li key={s.slug}>
                    <Link
                      href={"/servicios/" + s.slug}
                      className="group flex min-h-[40px] items-center justify-between border-b border-[#f4efe9]/8 py-2 text-sm text-[#f4efe9]/88 transition-colors hover:text-[#f26a2e]"
                    >
                      <span>
                        <span className="mr-2 font-mono text-[11px] text-[#b5b0a8]">
                          0{idx + 1}
                        </span>
                        {s.short}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-3.5 w-3.5 text-[#b5b0a8] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#f26a2e]"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
