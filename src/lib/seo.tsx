import type { Metadata } from "next";
import { site } from "@/config/site";
export function meta(
  title: string,
  description: string,
  path: string,
  visible = true,
  image?: string,
): Metadata {
  const url = site.origin ? site.origin + path : undefined;
  return {
    title,
    description,
    robots: { index: site.indexable && visible, follow: true },
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: "website",
      locale: "es_PE",
      siteName: site.name,
      title,
      description,
      url,
      images: site.origin && image ? [site.origin + image] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: site.origin && image ? [site.origin + image] : undefined,
    },
  };
}
export function Structured({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          ...data,
        }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
