import { services } from "@/config/es";
import { site, whatsapp } from "@/config/site";
import {
  Crumbs,
  HeroTitle,
  Button,
  ProjectCards,
} from "@/components/Editorial";
import { meta, Structured } from "@/lib/seo";
import { projects } from "@/lib/content";
import { notFound } from "next/navigation";
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () =>
  services.map(({ slug }) => ({ slug }));
async function get(p: Props) {
  const { slug } = await p.params;
  return services.find((s) => s.slug === slug) ?? notFound();
}
export async function generateMetadata(p: Props) {
  const s = await get(p);
  return meta(s.name + " en Perú", s.intro, "/servicios/" + s.slug);
}
export default async function Page(p: Props) {
  const s = await get(p),
    related = projects().filter((item) => item.category === s.slug);
  return (
    <>
      <Crumbs
        items={[
          ["/servicios", "Servicios"],
          ["/servicios/" + s.slug, s.short],
        ]}
      />
      <Structured
        data={{
          "@type": "Service",
          name: s.name,
          description: s.body,
          provider: { "@type": "Organization", name: site.name },
          areaServed: "Perú",
        }}
      />
      <HeroTitle label="" title={s.name} intro={s.intro} />
      <ul>
        {s.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <Button href={"/contacto?servicio=" + s.slug}>
        Cotizar {s.short.toLowerCase()}
      </Button>
      {whatsapp(s.name) && <Button href={whatsapp(s.name)}>WhatsApp</Button>}
      {related.length > 0 && <ProjectCards items={related} />}
    </>
  );
}
