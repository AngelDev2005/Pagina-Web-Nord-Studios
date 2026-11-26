import { Crumbs, HeroTitle } from "@/components/Editorial";
import { meta } from "@/lib/seo";
import { legal, privacyReady } from "@/config/legal";
export const metadata = meta(
  "Aviso de privacidad",
  "Datos del formulario de contacto y uso de la información para responder cotizaciones.",
  "/privacidad",
  false,
);
export default function Page() {
  if (!privacyReady)
    return (
      <>
        <h1>Aviso de privacidad</h1>
        <p>El formulario está deshabilitado hasta la aprobación del aviso.</p>
      </>
    );
  return (
    <>
      <Crumbs items={[["/privacidad", "Privacidad"]]} />
      <HeroTitle
        label="Información legal"
        title="Aviso de privacidad."
        intro="Cómo se utiliza la información que compartes al solicitar una cotización."
      />
      <div className="paper">
        <div className="wrap section reading">
          <h2>Responsable y finalidad</h2>
          <p>
            {legal.controller || "Responsable legal pendiente de confirmación."}{" "}
            {legal.address} Usamos los datos de contacto para evaluar el
            proyecto, preparar la cotización y responder a tu consulta.
          </p>
          <h2>Información solicitada</h2>
          <p>
            Necesitamos nombre, correo, servicio y descripción para atender la
            solicitud. Empresa, WhatsApp y presupuesto son opcionales. Al omitir
            los campos obligatorios, el formulario no permite enviar la
            consulta.
          </p>
          <h2>Proveedores y conservación</h2>
          <p>
            Al activar el envío, Cloudflare Turnstile verifica la interacción,
            el servicio de limitación de solicitudes utiliza un identificador
            seudonimizado y Resend tramita la entrega del mensaje al estudio.
          </p>
          <p>
            {legal.register || "Banco de datos pendiente de identificación."}{" "}
            {legal.transfers ||
              "Tratamiento por proveedores y transferencias pendientes de confirmación."}{" "}
            {legal.retention ||
              "Plazo de conservación pendiente de confirmación."}
          </p>
          {process.env.GA4_ID && (
            <>
              <h2>Medición opcional</h2>
              <p>
                Si autorizas Google Analytics, medimos páginas visitadas y
                acciones como abrir un servicio o solicitar una cotización.
                Puedes cambiar tu elección en el pie de página. La preferencia
                se guarda en este navegador.
              </p>
            </>
          )}
          <h2>Tus derechos</h2>
          <p>
            Puedes solicitar acceso, rectificación, cancelación u oposición al
            tratamiento de tus datos.{" "}
            {legal.rights ? (
              <a href={"mailto:" + legal.rights}>{legal.rights}</a>
            ) : (
              "El canal para ejercer estos derechos está pendiente de confirmación."
            )}
          </p>
        </div>
      </div>
    </>
  );
}
