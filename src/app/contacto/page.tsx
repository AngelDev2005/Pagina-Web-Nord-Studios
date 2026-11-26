import { Crumbs, Button, Label } from "@/components/Editorial";
import QuoteForm from "@/components/QuoteForm";
import { services } from "@/config/es";
import { site, whatsapp } from "@/config/site";
import { contactReady } from "@/lib/contact-server";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Cotiza tu proyecto de diseño",
  "Cuéntanos sobre tu marca y solicita una cotización de branding, diseño gráfico, redes o edición de video.",
  "/contacto",
);
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ servicio?: string }>;
}) {
  const { servicio } = await searchParams;
  const s = services.find((s) => s.slug === servicio);
  return (
    <>
      <Crumbs items={[["/contacto", "Contacto"]]} />
      <section className="wrap section contact-layout">
        <aside>
          <Label>Contacto / Cotizaciones</Label>
          <h1 className="contact-title">Hablemos de tu proyecto.</h1>
          <p className="lead">
            Cuéntanos qué necesita tu marca. El primer paso es entender el
            objetivo, los entregables y los tiempos.
          </p>
          {whatsapp(s?.name) && (
            <Button href={whatsapp(s?.name)}>Conversar por WhatsApp</Button>
          )}
          {site.email && <a href={"mailto:" + site.email}>{site.email}</a>}
        </aside>
        <QuoteForm
          enabled={contactReady()}
          service={s?.slug || ""}
          siteKey={process.env.TURNSTILE_SITE_KEY || ""}
        />
      </section>
    </>
  );
}
