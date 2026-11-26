import Image from "next/image";
import {
  Crumbs,
  HeroTitle,
  ProjectCards,
  Close,
  Button,
} from "@/components/Editorial";
import { services } from "@/config/es";
import type { portfolioDetail } from "@/features/portfolio/catalog";
export function ProjectDetail({
  p,
  related,
  next,
  children,
}: NonNullable<ReturnType<typeof portfolioDetail>> & {
  children?: React.ReactNode;
}) {
  return (
    <>
      <Crumbs
        items={[
          ["/proyectos", "Proyectos"],
          ["/proyectos/" + p.slug, p.title],
        ]}
      />
      <HeroTitle
        label={[
          services.find((s) => s.slug === p.category)?.short,
          p.client,
          p.year,
        ]
          .filter(Boolean)
          .join(" / ")}
        title={p.title}
        intro={p.description}
      />
      <Image
        className="widepic"
        {...p.cover}
        alt={p.cover.alt}
        sizes="100vw"
        priority
      />
      <div className="paper">
        <div className="wrap reading section">
          {children}
          {[
            ["Contexto", p.context],
            ["Desafío", p.challenge],
            ["Concepto", p.concept],
            ["Solución", p.solution],
          ]
            .filter(([, body]) => body)
            .map(([t, b]) => (
              <section key={t}>
                <h2>{t}</h2>
                <p>{b}</p>
              </section>
            ))}
          {[
            ["Entregables", p.deliverables],
            ["Resultados", p.results],
          ].map(
            ([t, values]) =>
              Array.isArray(values) &&
              values.length > 0 && (
                <section key={String(t)}>
                  <h2>{t}</h2>
                  <ul>
                    {values.map((i) => (
                      <li key={i}>{i}</li>
                    ))}
                  </ul>
                </section>
              ),
          )}
        </div>
      </div>
      <div className="wrap gallery">
        {p.gallery.map((i) => (
          <Image key={i.src} {...i} sizes="90vw" alt={i.alt} />
        ))}
        {p.videos.map((v) => (
          <video
            key={v.src}
            controls
            preload="none"
            poster={v.poster}
            aria-label={v.title}
            src={v.src}
          >
            {v.captions && (
              <track kind="captions" srcLang="es" src={v.captions} default />
            )}
          </video>
        ))}
      </div>
      {related.length > 0 && (
        <section className="wrap section">
          <h2>Casos relacionados.</h2>
          <ProjectCards items={related} />
        </section>
      )}
      <div className="wrap section actions">
        <Button href={"/servicios/" + p.category}>Explorar el servicio</Button>
        {next && (
          <Button secondary href={"/proyectos/" + next.slug}>
            Siguiente proyecto · {next.title}
          </Button>
        )}
      </div>
      <Close />
    </>
  );
}
