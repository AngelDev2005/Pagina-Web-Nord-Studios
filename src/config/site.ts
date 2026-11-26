const origin = process.env.SITE_URL?.replace(/\/$/, "");
export const site = {
  name: "Nord Studios",
  locale: "es-PE",
  city: "Trujillo, Perú",
  origin,
  indexable: Boolean(origin && process.env.SITE_INDEXABLE === "true"),
  email: process.env.PUBLIC_CONTACT_EMAIL || "",
  phone: (process.env.PUBLIC_WHATSAPP || "").replace(/[^0-9]/g, ""),
  socials: Object.entries({
    Instagram: process.env.INSTAGRAM_URL,
    Behance: process.env.BEHANCE_URL,
    Facebook: process.env.FACEBOOK_URL,
    TikTok: process.env.TIKTOK_URL,
    LinkedIn: process.env.LINKEDIN_URL,
  }).filter((entry): entry is [string, string] =>
    Boolean(entry[1]?.startsWith("https://")),
  ),
};
export const whatsapp = (service = "diseño") =>
  site.phone
    ? "https://wa.me/" +
      site.phone +
      "?text=" +
      encodeURIComponent(
        "Hola, Nord Studios. Me interesa " +
          service +
          " y quisiera solicitar una cotización.",
      )
    : "";
