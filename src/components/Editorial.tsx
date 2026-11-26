import Link from "next/link";
import { Structured } from "@/lib/seo";
import { site } from "@/config/site";
import type { Project } from "@/lib/content";
import { services } from "@/config/es";
export function Crumbs({ items }: { items: [string, string][] }) {
  return (
    <>
      <nav className="wrap crumbs" aria-label="Ruta de navegación">
        <Link href="/">Inicio</Link>
        {items.map(([href, label], i) => (
          <span key={href}>
            {" "}
            /{" "}
            {i === items.length - 1 ? label : <Link href={href}>{label}</Link>}
          </span>
        ))}
      </nav>
      {site.origin && (
        <Structured
          data={{
            "@type": "BreadcrumbList",
            itemListElement: [["/", "Inicio"], ...items].map(
              ([href, name], i) => ({
                "@type": "ListItem",
                position: i + 1,
                name,
                item: site.origin + href,
              }),
            ),
          }}
        />
      )}
    </>
  );
}

export function Button({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
}) {
  return <Link href={href}>{children}</Link>;
}
export function Label({ children }: { children: React.ReactNode }) {
  return <p>{children}</p>;
}
export function HeroTitle({
  title,
  intro,
}: {
  title: string;
  intro: string;
  label: string;
}) {
  return (
    <>
      <h1>{title}</h1>
      <p>{intro}</p>
    </>
  );
}
export function ProjectCards({ items }: { items: Project[] }) {
  return (
    <ul>
      {items.map((p) => (
        <li key={p.slug}>
          <Link href={"/proyectos/" + p.slug}>{p.title}</Link>
        </li>
      ))}
    </ul>
  );
}
export function ServiceRows() {
  return (
    <ul>
      {services.map((s) => (
        <li key={s.slug}>
          <Link href={"/servicios/" + s.slug}>{s.name}</Link>
        </li>
      ))}
    </ul>
  );
}
export function Close() {
  return (
    <p>
      <Link href="/contacto">Solicitar una cotización</Link>
    </p>
  );
}
