import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("enlaces internos, cabeceras e indexación de preview", async ({
  page,
  request,
}) => {
  const pages = [
    "/",
    "/nosotros",
    "/servicios",
    "/servicios/branding",
    "/servicios/social-media",
    "/servicios/diseno-grafico",
    "/servicios/edicion-de-video",
    "/contacto",
    "/proyectos",
    "/blog",
    "/privacidad",
    "/terminos",
  ];
  const links = new Set<string>();
  for (const path of pages) {
    await page.setViewportSize({ width: 320, height: 820 });
    const response = await page.goto(path);
    expect(response?.headers()["x-frame-options"]).toBe("DENY");
    expect(await page.locator("h1").count()).toBe(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
      path,
    ).toBe(true);
    (
      await page
        .locator("a[href]")
        .evaluateAll((nodes) => nodes.map((n) => (n as HTMLAnchorElement).href))
    ).forEach((url) => links.add(url));
  }
  for (const url of links) {
    if (new URL(url).origin === "http://127.0.0.1:3078")
      expect((await request.get(url)).ok(), url).toBe(true);
  }
  expect((await request.post("/api/contact", { data: {} })).status()).toBe(503);
});

test("navegación por teclado y cotización contextual", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Saltar al contenido" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await page
    .getByRole("navigation", { name: "Principal" })
    .getByText("Servicios")
    .click();
  await page.getByRole("link", { name: "Branding e identidad visual" }).click();
  await page.getByRole("link", { name: "Cotizar branding" }).click();
  await expect(page.getByRole("combobox")).toHaveValue("branding");
  await expect(
    page.getByRole("button", { name: "Enviar solicitud" }),
  ).toBeDisabled();
});
test("publicación y rutas de descubrimiento", async ({ request }) => {
  for (const path of [
    "/proyectos/plantilla",
    "/proyectos/plantilla-mdx",
    "/blog/plantilla",
    "/fuera-de-pagina",
  ])
    expect((await request.get(path)).status()).toBe(404);
  for (const path of ["/robots.txt", "/sitemap.xml"])
    expect((await request.get(path)).ok()).toBe(true);
});
test("accesibilidad automática de las estructuras", async ({ page }) => {
  for (const path of ["/", "/contacto", "/servicios/branding", "/proyectos"]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations.map((v) => [v.id, v.nodes.map((n) => n.target)]),
    ).toEqual([]);
  }
});
