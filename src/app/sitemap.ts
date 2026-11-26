import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { services } from "@/config/es";
import { projects, articles } from "@/lib/content";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!site.indexable) return [];
  const work = projects(),
    posts = articles();
  return [
    "/",
    "/servicios",
    "/nosotros",
    "/contacto",
    ...services.map((s) => "/servicios/" + s.slug),
    ...(work.length
      ? ["/proyectos", ...work.map((p) => "/proyectos/" + p.slug)]
      : []),
    ...(posts.length ? ["/blog", ...posts.map((p) => "/blog/" + p.slug)] : []),
  ].map((path) => ({ url: site.origin + path }));
}
