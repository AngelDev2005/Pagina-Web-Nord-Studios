import Link from "next/link";
import { articles } from "@/lib/content";
import { Crumbs, HeroTitle, Button } from "@/components/Editorial";
import { meta } from "@/lib/seo";
export function generateMetadata() {
  return meta(
    "Cuaderno de diseño",
    "Artículos de Nord Studios sobre identidad, diseño y comunicación de marca.",
    "/blog",
    articles().length > 0,
  );
}
export default function Page() {
  const posts = articles();
  return (
    <>
      <Crumbs items={[["/blog", "Blog"]]} />
      <HeroTitle
        label="Blog"
        title="Cuaderno de diseño."
        intro="Ideas para tomar mejores decisiones sobre la comunicación visual de tu negocio."
      />
      <div className="paper">
        <div className="wrap section reading">
          {posts.length ? (
            posts.map((a) => (
              <article key={a.slug}>
                <h2>
                  <Link href={"/blog/" + a.slug}>{a.title}</Link>
                </h2>
                <p>{a.description}</p>
              </article>
            ))
          ) : (
            <>
              <p>El cuaderno abrirá con la primera publicación del estudio.</p>
              <Button secondary href="/servicios">
                Conoce nuestras disciplinas
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}
