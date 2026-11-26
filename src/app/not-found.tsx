import { HeroTitle, Button } from "@/components/Editorial";
export default function Missing() {
  return (
    <>
      <HeroTitle
        label="404 / Página no encontrada"
        title="Fuera de página."
        intro="El enlace puede haber cambiado o el contenido aún no está publicado."
      />
      <div className="wrap section">
        <Button href="/">Volver al inicio</Button>
      </div>
    </>
  );
}
