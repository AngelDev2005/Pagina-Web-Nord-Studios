import { Home as HomeView } from "@/components/Home";
import { projects } from "@/lib/content";
import { meta, Structured } from "@/lib/seo";
import { site } from "@/config/site";

export const metadata = meta(
  "Estudio creativo y branding en Trujillo, Perú",
  "Dirección creativa, identidad visual y diseño estratégico para marcas. Descubre el trabajo de Nord Studios en Trujillo, Perú.",
  "/",
);
export default function Home() {
  const published = projects();

  return (
    <>
      <Structured
        data={{
          "@type": "Organization",
          name: site.name,
          url: site.origin,
          areaServed: "Perú",
          sameAs: site.socials.map(([, url]) => url),
        }}
      />
      <Structured
        data={{
          "@type": "WebSite",
          name: site.name,
          url: site.origin,
          inLanguage: "es-PE",
        }}
      />
      <HomeView name={site.name} hasProjects={published.length > 0} />
    </>
  );
}
