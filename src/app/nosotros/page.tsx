import { site } from "@/config/site";
import { meta } from "@/lib/seo";
export const metadata = meta(
  "Sobre Nord Studios",
  "Estudio creativo independiente en Trujillo, Perú.",
  "/nosotros",
);
export default function Page() {
  return (
    <>
      <h1>Sobre {site.name}</h1>
      <p>{site.city}</p>
    </>
  );
}
