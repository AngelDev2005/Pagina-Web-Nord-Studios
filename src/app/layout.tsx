import type { Metadata } from "next";
import { navigation } from "@/config/navigation";
import { articles } from "@/lib/content";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Link from "next/link";
import { site, whatsapp } from "@/config/site";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: site.origin ? new URL(site.origin) : undefined,
  title: { default: "Nord Studios", template: "%s | Nord Studios" },
  icons: { icon: "/brand/icon.png" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-PE">
      <body>
        <a className="skip" href="#contenido" tabIndex={0}>
          Saltar al contenido
        </a>
        <Header
          links={
            articles().length ? [...navigation, ["/blog", "Blog"]] : navigation
          }
        />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <footer>
          {site.socials.map(([name, href]) => (
            <a key={name} href={href}>
              {name}
            </a>
          ))}
          {site.email && <a href={"mailto:" + site.email}>{site.email}</a>}
          {whatsapp() && <a href={whatsapp()}>WhatsApp</a>}
          <Link href="/privacidad">Privacidad</Link> ·{" "}
          <Link href="/terminos">Términos</Link>
        </footer>
        {process.env.GA4_ID?.match(/^G-[A-Z0-9]+$/) && (
          <Analytics id={process.env.GA4_ID} />
        )}
      </body>
    </html>
  );
}
