import { describe, it, expect, vi, afterEach } from "vitest";
import { projects, articles, projectSchema } from "@/lib/content";
import { contactSchema } from "@/lib/contact-schema";
import { limitedJson } from "@/lib/contact-server";
import { POST } from "@/app/api/contact/route";
import template from "../../content/projects/template.json";
describe("Contenido del estudio", () => {
  it("oculta todas las plantillas de borrador", () => {
    expect(projects().some((p) => p.slug === "plantilla")).toBe(false);
    expect(articles().some((a) => a.slug === "plantilla")).toBe(false);
  });
  it("valida slug, categorías y referencias a imágenes", () => {
    expect(projectSchema.safeParse(template).success).toBe(true);
    for (const patch of [
      { slug: "No válido" },
      { category: "otro" },
      { cover: { ...template.cover, src: "/projects/../private" } },
    ])
      expect(projectSchema.safeParse({ ...template, ...patch }).success).toBe(
        false,
      );
  });
});
const payload = {
  name: "Ensayo",
  email: "qa@example.org",
  service: "branding",
  description: "Solicitud de prueba local",
  consent: true,
  token: "prueba",
};
it("valida en servidor consentimiento, correo y extensión", () => {
  expect(contactSchema.parse(payload).name).toBe("Ensayo");
  for (const patch of [
    { consent: false },
    { email: "x" },
    { description: "x" },
    { description: "x".repeat(3001) },
    { token: "" },
  ])
    expect(contactSchema.safeParse({ ...payload, ...patch }).success).toBe(
      false,
    );
});
it("limita el cuerpo incluso sin Content-Length", async () => {
  await expect(
    limitedJson(
      new Request("https://example.org", {
        method: "POST",
        body: "a".repeat(16385),
      }),
    ),
  ).rejects.toThrow(RangeError);
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.resetModules();
});
it("deshabilitado devuelve 503 sin enviar", async () => {
  vi.stubEnv("CONTACT_ENABLED", "false");
  expect(
    (await POST(new Request("https://example.org", { method: "POST" }))).status,
  ).toBe(503);
});
describe("Recepción de cotizaciones con proveedores simulados", () => {
  async function submit(
    responses: unknown[],
    data: unknown = payload,
    origin = "https://example.org",
  ) {
    for (const key of [
      "LEGAL_CONTROLLER",
      "LEGAL_ADDRESS",
      "LEGAL_RIGHTS_EMAIL",
      "LEGAL_DATA_REGISTER",
      "LEGAL_RETENTION",
      "LEGAL_TRANSFERS",
      "TURNSTILE_SITE_KEY",
      "TURNSTILE_SECRET_KEY",
      "RESEND_API_KEY",
      "CONTACT_FROM",
      "CONTACT_TO",
      "UPSTASH_REDIS_REST_URL",
      "UPSTASH_REDIS_REST_TOKEN",
      "RATE_LIMIT_SALT",
    ])
      vi.stubEnv(key, "test");
    vi.stubEnv("CONTACT_ENABLED", "true");
    vi.stubEnv("PRIVACY_APPROVED", "true");
    vi.stubEnv("SITE_URL", "https://example.org");
    const fetcher = vi.fn();
    responses.forEach((r) => fetcher.mockResolvedValueOnce(Response.json(r)));
    vi.stubGlobal("fetch", fetcher);
    vi.resetModules();
    const { POST: post } = await import("@/app/api/contact/route");
    return (
      await post(
        new Request("https://example.org/api/contact", {
          method: "POST",
          headers: { origin, "content-type": "application/json" },
          body: JSON.stringify(data),
        }),
      )
    ).status;
  }
  it("confirma únicamente tras aceptación del proveedor", async () =>
    expect(
      await submit([
        { result: 1 },
        { success: true, hostname: "example.org", action: "quote" },
        { id: "test" },
      ]),
    ).toBe(200));
  it("rechaza verificación caducada", async () =>
    expect(await submit([{ result: 1 }, { success: false }])).toBe(422));
  it("aplica el límite compartido", async () =>
    expect(await submit([{ result: 6 }])).toBe(429));
  it("rechaza origen ajeno", async () =>
    expect(await submit([], payload, "https://other.example")).toBe(403));
  it("comunica un fallo del proveedor", async () =>
    expect(
      await submit([
        { result: 1 },
        { success: true, hostname: "example.org", action: "quote" },
        {},
      ]),
    ).toBe(503));
});
