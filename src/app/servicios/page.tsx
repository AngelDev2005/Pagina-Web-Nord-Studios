import { Crumbs, HeroTitle, ServiceRows, Close } from "@/components/Editorial";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Servicios de diseño para empresas",
  "Branding, diseño para redes, diseño gráfico y edición audiovisual para negocios y equipos de marketing.",
  "/servicios",
);
export default function Page() {
  return (
    <>
      <Crumbs items={[["/servicios", "Servicios"]]} />
      <HeroTitle
        label="Qué hacemos"
        title="Disciplinas creativas."
        intro="Elige el servicio que mejor responde al momento de tu marca. Podemos trabajar una pieza concreta o construir un sistema completo."
      />
      <div className="paper">
        <div className="wrap section">
          <ServiceRows />
        </div>
      </div>
      <Close />
    </>
  );
}
