import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { services } from "@/config/es";
import type { Project } from "@/lib/content";
import { MaskReveal, ScrollReveal } from "@/components/home/MotionPrimitives";

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const featured = projects.slice(0, 4);
  const lead = featured[0];
  const secondary = featured.slice(1);

  return (
    <section
      id="proyectos"
      aria-labelledby="projects-title"
      className="bg-[#f4efe9] py-16 text-[#0d0d0d] sm:py-24 lg:py-28"
    >
      <div className="nord-container">
        <div className="flex flex-col justify-between gap-6 border-b border-[#0d0d0d]/16 pb-8 md:flex-row md:items-end">
          <div>
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#524e49] uppercase">
              02 / Portafolio
            </p>
            <MaskReveal>
              <h2
                id="projects-title"
                className="font-display m-0 mt-3 text-[clamp(1.75rem,4.2vw,3.5rem)] leading-[1.08] tracking-[-0.025em] uppercase"
              >
                Proyectos seleccionados.
              </h2>
            </MaskReveal>
          </div>

          <Link
            href="/proyectos"
            className="group inline-flex min-h-[44px] items-center gap-2 self-start border border-[#0d0d0d]/25 px-5 py-2.5 text-xs font-bold tracking-[0.14em] text-[#0d0d0d] uppercase transition-colors hover:border-[#0d0d0d] hover:bg-[#0d0d0d] hover:text-[#f4efe9] md:self-auto"
          >
            <span>Explorar portafolio</span>
            <ArrowRight
              aria-hidden="true"
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>

        {lead ? (
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <ScrollReveal className="lg:col-span-7">
              <article className="group border border-[#0d0d0d]/14 bg-[#f4efe9]">
                <Link
                  href={"/proyectos/" + lead.slug}
                  className="block overflow-hidden bg-[#141414]"
                >
                  <Image
                    src={lead.cover.src}
                    alt={lead.cover.alt}
                    width={lead.cover.width}
                    height={lead.cover.height}
                    sizes="(max-width: 1024px) 100vw, 58vw"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  />
                </Link>
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-bold tracking-[0.16em] text-[#524e49] uppercase">
                    <span>
                      {services.find((s) => s.slug === lead.category)?.short ||
                        lead.category}
                    </span>
                    {lead.year && <span>{lead.year}</span>}
                  </div>
                  <h3 className="font-display m-0 mt-3 text-xl tracking-[-0.02em] uppercase sm:text-2xl">
                    <Link
                      href={"/proyectos/" + lead.slug}
                      className="text-[#0d0d0d] no-underline transition-colors group-hover:text-[#b44312]"
                    >
                      {lead.title}
                    </Link>
                  </h3>
                  <p className="mt-3 max-w-[52ch] text-base text-[#524e49]">
                    {lead.description}
                  </p>
                  <Link
                    href={"/proyectos/" + lead.slug}
                    className="mt-5 inline-flex min-h-[44px] items-center gap-2 text-xs font-bold tracking-[0.14em] text-[#0d0d0d] uppercase"
                  >
                    <span>Ver caso de estudio</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </ScrollReveal>

            <div className="flex flex-col gap-6 lg:col-span-5">
              {secondary.map((p, idx) => (
                <ScrollReveal key={p.slug} delay={0.06 * (idx + 1)}>
                  <article className="group grid gap-4 border border-[#0d0d0d]/14 p-4 sm:grid-cols-12 sm:items-center sm:p-5">
                    <Link
                      href={"/proyectos/" + p.slug}
                      className="block overflow-hidden bg-[#141414] sm:col-span-5"
                    >
                      <Image
                        src={p.cover.src}
                        alt={p.cover.alt}
                        width={p.cover.width}
                        height={p.cover.height}
                        sizes="(max-width: 640px) 100vw, 24vw"
                        className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </Link>
                    <div className="sm:col-span-7">
                      <span className="text-[11px] font-bold tracking-[0.16em] text-[#524e49] uppercase">
                        0{idx + 2} /{" "}
                        {services.find((s) => s.slug === p.category)?.short ||
                          p.category}
                      </span>
                      <h3 className="font-display m-0 mt-2 text-base tracking-[-0.015em] uppercase sm:text-lg">
                        <Link
                          href={"/proyectos/" + p.slug}
                          className="text-[#0d0d0d] no-underline"
                        >
                          {p.title}
                        </Link>
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-[#524e49]">
                        {p.description}
                      </p>
                    </div>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        ) : (
          /* Estado curatorial cuando aún no hay casos publicados en content/projects */
          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
            <ScrollReveal className="lg:col-span-7">
              <div className="nord-beam-stage relative flex h-full flex-col justify-between border border-[#0d0d0d] bg-[#0d0d0d] p-7 text-[#f4efe9] sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-85"
                  style={{
                    background:
                      "radial-gradient(ellipse 65% 32% at 88% 12%, rgba(242,106,46,0.34), transparent 68%), radial-gradient(ellipse 50% 24% at 10% 95%, rgba(244,239,233,0.14), transparent 70%)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="nord-grain absolute inset-0"
                />

                <div className="relative z-10 flex items-center justify-between gap-4 border-b border-[#f4efe9]/14 pb-5">
                  <Image
                    src="/brand/logo-light.png"
                    alt="Nord Studios"
                    width={711}
                    height={149}
                    className="h-7 w-auto sm:h-8"
                  />
                  <span className="border border-[#f26a2e]/50 px-3 py-1 text-[11px] font-bold tracking-[0.16em] text-[#f26a2e] uppercase">
                    Archivo en curaduría
                  </span>
                </div>

                <div className="relative z-10 my-10">
                  <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#b5b0a8] uppercase">
                    Selección oficial en preparación
                  </p>
                  <h3 className="font-display m-0 mt-3 max-w-[18ch] text-[clamp(1.35rem,3vw,2.25rem)] leading-[1.14] tracking-[-0.02em] text-[#f4efe9] uppercase">
                    Casos de estudio reales en documentación.
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[#b5b0a8]">
                    Estamos organizando las piezas autorizadas de identidad
                    visual, diseño publicitario y edición audiovisual para
                    presentarlas con contexto, proceso y aplicaciones reales.
                  </p>
                </div>

                <div className="relative z-10 flex flex-wrap items-center gap-3 border-t border-[#f4efe9]/14 pt-6">
                  <Link
                    href="/contacto"
                    className="inline-flex min-h-[44px] items-center gap-2 bg-[#f26a2e] px-5 py-2.5 text-xs font-bold tracking-[0.12em] text-[#0d0d0d] uppercase transition-colors hover:bg-[#ff7c40]"
                  >
                    <span>Solicitar muestras del estudio</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/proyectos"
                    className="inline-flex min-h-[44px] items-center gap-2 border border-[#f4efe9]/25 px-5 py-2.5 text-xs font-medium tracking-[0.12em] text-[#f4efe9] uppercase transition-colors hover:border-[#f26a2e] hover:text-[#f26a2e]"
                  >
                    <span>Estado del portafolio</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <div className="flex flex-col justify-between gap-4 lg:col-span-5">
              {services.slice(0, 3).map((item, idx) => (
                <ScrollReveal key={item.slug} delay={0.07 * (idx + 1)}>
                  <Link
                    href={"/servicios/" + item.slug}
                    className="group flex flex-col justify-between border border-[#0d0d0d]/16 bg-[#f4efe9] p-6 text-[#0d0d0d] no-underline transition-colors duration-200 hover:border-[#0d0d0d] hover:bg-[#ebe4db]"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-mono text-xs font-bold tracking-[0.16em] text-[#524e49]">
                        0{idx + 1} / ÁREA DE TRABAJO
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="h-4 w-4 text-[#0d0d0d] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </div>
                    <h3 className="font-display m-0 mt-3 text-lg tracking-[-0.015em] uppercase">
                      {item.short}
                    </h3>
                    <p className="m-0 mt-2 text-sm leading-relaxed text-[#524e49]">
                      {item.intro}
                    </p>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
