import { MaskReveal, ScrollReveal } from "@/components/home/MotionPrimitives";

const PILLARS = [
  {
    code: "A",
    title: "Diseño estratégico, no decoración.",
    body: "Cada decisión visual responde a lo que tu marca necesita comunicar y a cómo decide tu cliente, evitando adornos sin propósito.",
  },
  {
    code: "B",
    title: "Coherencia en todos tus puntos de contacto.",
    body: "Desde el isotipo hasta una etiqueta, un post o un reel, construimos sistemas gráficos que se reconocen al instante.",
  },
  {
    code: "C",
    title: "Atención directa con el estudio.",
    body: "Conversas directamente con quienes piensan y diseñan tu proyecto, con hitos claros y rondas ordenadas desde el inicio.",
  },
  {
    code: "D",
    title: "Entregables listos para uso real.",
    body: "Preparamos archivos digitales, artes para imprenta y lineamientos prácticos para que tu equipo pueda aplicar la marca sin fricción.",
  },
];

export default function ValuePropSection() {
  return (
    <section
      id="propuesta"
      aria-labelledby="value-title"
      className="bg-[#f4efe9] py-16 text-[#0d0d0d] sm:py-24 lg:py-28"
    >
      <div className="nord-container">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="m-0 text-[11px] font-bold tracking-[0.2em] text-[#524e49] uppercase">
              04 / Propuesta de valor
            </p>
            <MaskReveal>
              <h2
                id="value-title"
                className="font-display m-0 mt-3 text-[clamp(1.75rem,3.8vw,3.1rem)] leading-[1.08] tracking-[-0.025em] uppercase"
              >
                Creatividad con dirección de negocio.
              </h2>
            </MaskReveal>
            <p className="mt-5 max-w-[42ch] text-base leading-relaxed text-[#524e49] sm:text-lg">
              Ayudamos a emprendedores, pymes y equipos de marketing a construir
              una percepción sólida, clara y memorable sin procesos
              burocráticos.
            </p>

            <div className="mt-8 border-l-2 border-[#f26a2e] pl-4">
              <p className="m-0 text-xs font-bold tracking-[0.14em] text-[#0d0d0d] uppercase">
                Sin promesas vacías
              </p>
              <p className="m-0 mt-1 text-sm text-[#524e49]">
                Alcances definidos, tiempos realistas y comunicación
                transparente en cada etapa.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="m-0 list-none divide-y divide-[#0d0d0d]/16 border-y border-[#0d0d0d]/16 p-0">
              {PILLARS.map((pillar, idx) => (
                <li key={pillar.code}>
                  <ScrollReveal delay={idx * 0.05}>
                    <div className="grid gap-4 py-8 sm:grid-cols-12 sm:items-baseline sm:py-9">
                      <div className="flex items-center gap-3 sm:col-span-2">
                        <span className="font-display inline-flex h-10 w-10 items-center justify-center bg-[#0d0d0d] text-sm text-[#f26a2e]">
                          {pillar.code}
                        </span>
                      </div>
                      <div className="sm:col-span-10">
                        <h3 className="font-display m-0 text-lg tracking-[-0.015em] text-[#0d0d0d] uppercase sm:text-xl">
                          {pillar.title}
                        </h3>
                        <p className="m-0 mt-2.5 max-w-[56ch] text-base leading-relaxed text-[#524e49]">
                          {pillar.body}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
