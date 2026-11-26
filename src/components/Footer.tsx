import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { services } from "@/config/es";
import { site, whatsapp } from "@/config/site";

type NavLink = readonly [string, string];

export default function Footer({ links }: { links: ReadonlyArray<NavLink> }) {
  const waHref = whatsapp();
  const hasDirectChannels =
    Boolean(site.email) || Boolean(waHref) || site.socials.length > 0;

  return (
    <footer className="border-t border-[#f4efe9]/14 bg-[#0d0d0d] text-[#f4efe9]">
      <div className="nord-container py-16 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Link
              href="/"
              aria-label="Nord Studios — Volver al inicio"
              className="inline-flex min-h-[44px] items-center"
            >
              <Image
                src="/brand/logo-light.png"
                alt="Nord Studios Creative Agency"
                width={711}
                height={149}
                className="h-[40px] w-auto sm:h-[44px]"
              />
            </Link>
            <p className="mt-6 max-w-[38ch] text-base leading-relaxed text-[#b5b0a8]">
              Estudio creativo independiente en {site.city}. Transformamos ideas
              y negocios en identidades visuales coherentes y comunicación
              gráfica con intención.
            </p>
            <p className="mt-4 text-[11px] font-medium tracking-[0.2em] text-[#f26a2e] uppercase">
              Branding · Diseño · Estrategia
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:col-span-7">
            <div>
              <h2 className="m-0 mb-4 text-[11px] font-bold tracking-[0.18em] text-[#b5b0a8] uppercase">
                Estudio
              </h2>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {links.map(([href, label]) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="inline-flex min-h-[40px] items-center text-[15px] text-[#f4efe9] transition-colors hover:text-[#f26a2e]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="m-0 mb-4 text-[11px] font-bold tracking-[0.18em] text-[#b5b0a8] uppercase">
                Disciplinas
              </h2>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={"/servicios/" + s.slug}
                      className="inline-flex min-h-[40px] items-center text-[15px] text-[#f4efe9] transition-colors hover:text-[#f26a2e]"
                    >
                      {s.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="m-0 mb-4 text-[11px] font-bold tracking-[0.18em] text-[#b5b0a8] uppercase">
                Contacto
              </h2>
              <ul className="m-0 flex list-none flex-col gap-1 p-0">
                <li>
                  <Link
                    href="/contacto"
                    className="inline-flex min-h-[40px] items-center gap-1.5 text-[15px] font-medium text-[#f26a2e] transition-colors hover:text-[#ff7c40]"
                  >
                    <span>Solicitar cotización</span>
                    <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                </li>
                {site.email && (
                  <li>
                    <a
                      href={"mailto:" + site.email}
                      className="inline-flex min-h-[40px] items-center break-all text-[15px] text-[#f4efe9] transition-colors hover:text-[#f26a2e]"
                    >
                      {site.email}
                    </a>
                  </li>
                )}
                {waHref && (
                  <li>
                    <a
                      href={waHref}
                      className="inline-flex min-h-[40px] items-center gap-1.5 text-[15px] text-[#f4efe9] transition-colors hover:text-[#f26a2e]"
                    >
                      <span>WhatsApp</span>
                      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                    </a>
                  </li>
                )}
                {hasDirectChannels &&
                  site.socials.map(([name, href]) => (
                    <li key={name}>
                      <a
                        href={href}
                        rel="noopener noreferrer"
                        target="_blank"
                        className="inline-flex min-h-[40px] items-center gap-1.5 text-[15px] text-[#f4efe9] transition-colors hover:text-[#f26a2e]"
                      >
                        <span>{name}</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="h-3.5 w-3.5"
                        />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-[#f4efe9]/14 pt-8 text-xs tracking-[0.08em] text-[#b5b0a8] sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">
            © 2026 {site.name} · {site.city}
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link
              href="/privacidad"
              className="inline-flex min-h-[36px] items-center text-[#b5b0a8] transition-colors hover:text-[#f4efe9]"
            >
              Privacidad
            </Link>
            <Link
              href="/terminos"
              className="inline-flex min-h-[36px] items-center text-[#b5b0a8] transition-colors hover:text-[#f4efe9]"
            >
              Términos
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
