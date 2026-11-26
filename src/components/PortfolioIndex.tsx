import Link from "next/link";
import {
  Crumbs,
  HeroTitle,
  ProjectCards,
  Button,
  Close,
} from "@/components/Editorial";
import type { portfolioIndex } from "@/features/portfolio/catalog";
export function PortfolioIndex({
  cats,
  selected,
  hasProjects,
  items,
}: ReturnType<typeof portfolioIndex>) {
  return (
    <>
      <Crumbs items={[["/proyectos", "Proyectos"]]} />
      <HeroTitle
        label="Portafolio"
        title="Proyectos seleccionados."
        intro="Una mirada a la idea, las decisiones de diseño y las aplicaciones detrás de cada identidad."
      />
      <div className="paper">
        <div className="wrap section">
          {hasProjects ? (
            <>
              <nav className="filters" aria-label="Filtrar por disciplina">
                {[{ slug: "", short: "Todos" }, ...cats].map((c) => (
                  <Link
                    key={c.slug}
                    aria-current={
                      (selected || "") === c.slug ? "true" : undefined
                    }
                    href={
                      c.slug ? "/proyectos?categoria=" + c.slug : "/proyectos"
                    }
                  >
                    {c.short}
                  </Link>
                ))}
              </nav>
              <ProjectCards items={items} />
            </>
          ) : (
            <div className="empty-panel">
              <h2>Estamos preparando los casos.</h2>
              <p>
                Mientras seleccionamos los proyectos del portafolio, puedes
                conocer cómo trabajamos cada disciplina.
              </p>
              <Button secondary href="/servicios">
                Explorar servicios
              </Button>
            </div>
          )}
        </div>
      </div>
      <Close />
    </>
  );
}
