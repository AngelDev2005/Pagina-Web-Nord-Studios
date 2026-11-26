import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/config/site";
import { MaskReveal, ScrollReveal } from "@/components/home/MotionPrimitives";

export default function AboutSection() {
  return (
    <section
      id="nosotros"
      aria-labelledby="about-title"
      className="bg-[#f4efe9] py-16 text-[#0d0d0d] sm:py-24 lg:py-28"
    >
      <div className="nord-container">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
          <ScrollReveal className="lg:col-span-5">
            <figure className="m-0 border border-[#0d0d0d]/16 bg-[#0d0d0d] p-3 sm:p-4">
              <div className="overflow-hidden">
                <Image
                  src="/brand/isotipo-grid.jpg"
                  alt="Retícula constructiva del isotipo N de Nord Studios sobre fondo negro con haces de luz naranja"
                  width={1080}
                  height={1350}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between gap-2 px-1 text-[11px] font-medium tracking-[0.14em] text-[#b5b0a8] uppercase">
                <span>Identidad V2 / Retícula N</span>
                <span className="text-[#f26a2e]">{site.city}</span>
              </figcaption>
            </figure>
          </ScrollReveal>

          <div className="lg:col-span-7">
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#524e49] uppercase">
              06 / Nosotros
            </p>
            <MaskReveal>
              <h2
                id="about-title"
                className="font-display m-0 mt-3 text-[clamp(1.75rem,3.9vw,3.25rem)] leading-[1.08] tracking-[-0.025em] uppercase"
              >
                Estudio creativo independiente en Trujillo, Perú.
              </h2>
            </MaskReveal>

            <p className="mt-6 max-w-[54ch] text-base leading-relaxed text-[#0d0d0d]/85 sm:text-lg">
              Nord Studios es la división creativa de NORD. Con más de tres años
              de experiencia en diseño, transformamos ideas y negocios en marcas
              con personalidad, intención y coherencia visual.
            </p>
            <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-[#524e49]">
              Acompañamos a emprendedores, pymes y equipos de marketing en
              Trujillo, todo el Perú y proyectos remotos, combinando dirección
              visual con foco práctico en el negocio.
            </p>

            <dl className="m-0 mt-10 grid gap-6 border-y border-[#0d0d0d]/16 py-6 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] font-bold tracking-[0.16em] text-[#524e49] uppercase">
                  Trayectoria
                </dt>
                <dd className="m-0 mt-2">
                  <span className="font-display block text-xl text-[#0d0d0d] uppercase">
                    +3 años
                  </span>
                  <span className="mt-1 block text-xs text-[#524e49]">
                    Construyendo identidades y piezas gráficas.
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.16em] text-[#524e49] uppercase">
                  Cobertura
                </dt>
                <dd className="m-0 mt-2">
                  <span className="font-display block text-xl text-[#0d0d0d] uppercase">
                    Perú &amp; Remoto
                  </span>
                  <span className="mt-1 block text-xs text-[#524e49]">
                    Base en Trujillo, atención a distancia.
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-[11px] font-bold tracking-[0.16em] text-[#524e49] uppercase">
                  Modalidad
                </dt>
                <dd className="m-0 mt-2">
                  <span className="font-display block text-xl text-[#0d0d0d] uppercase">
                    Trato directo
                  </span>
                  <span className="mt-1 block text-xs text-[#524e49]">
                    Proyectos puntuales y planes mensuales.
                  </span>
                </dd>
              </div>
            </dl>

            <div className="mt-8">
              <Link
                href="/nosotros"
                className="group inline-flex min-h-[44px] items-center gap-2 border border-[#0d0d0d] bg-[#0d0d0d] px-6 py-3 text-xs font-bold tracking-[0.14em] text-[#f4efe9] uppercase transition-colors hover:bg-[#191919]"
              >
                <span>Conocer más sobre el estudio</span>
                <ArrowRight
                  aria-hidden="true"
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
