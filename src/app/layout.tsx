import type { Metadata } from "next";
import localFont from "next/font/local";
import { navigation } from "@/config/navigation";
import { articles } from "@/lib/content";
import Analytics from "@/components/Analytics";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/config/site";
import "./globals.css";

const monument = localFont({
  src: "../../font/monumentextended-ultrabold.woff2",
  weight: "800",
  style: "normal",
  display: "swap",
  variable: "--font-monument",
});

const satoshi = localFont({
  src: "../../font/Satoshi-Variable.woff2",
  weight: "300 900",
  style: "normal",
  display: "swap",
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: site.origin ? new URL(site.origin) : undefined,
  title: { default: "Nord Studios", template: "%s | Nord Studios" },
  icons: { icon: "/brand/icon.png" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const navLinks = articles().length
    ? ([...navigation, ["/blog", "Blog"]] as const)
    : navigation;

  return (
    <html lang="es-PE" className={`${monument.variable} ${satoshi.variable}`}>
      <body className="font-sans">
        <a className="skip" href="#contenido" tabIndex={0}>
          Saltar al contenido
        </a>
        <Header links={navLinks} />
        <main id="contenido" tabIndex={-1}>
          {children}
        </main>
        <Footer links={navLinks} />
        {process.env.GA4_ID?.match(/^G-[A-Z0-9]+$/) && (
          <Analytics id={process.env.GA4_ID} />
        )}
      </body>
    </html>
  );
}
