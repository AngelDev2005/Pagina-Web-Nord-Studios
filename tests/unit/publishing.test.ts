import { afterAll, beforeAll, expect, it, vi } from "vitest";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import template from "../../content/projects/template.json";
import list from "@/app/proyectos/page";
import Home from "@/app/page";
import detail, { generateStaticParams } from "@/app/proyectos/[slug]/page";
import { articles, projects } from "@/lib/content";
const sandbox = fs.mkdtempSync(path.join(os.tmpdir(), "nord-publication-"));
beforeAll(() => {
  for (const name of ["projects", "blog"])
    fs.mkdirSync(path.join(sandbox, "content", name), { recursive: true });
  for (const [slug, category, order, status] of [
    ["uno", "branding", 2, "published"],
    ["dos", "social-media", 1, "published"],
    ["tres", "branding", 3, "draft"],
  ])
    fs.writeFileSync(
      path.join(sandbox, "content/projects", slug + ".json"),
      JSON.stringify({
        ...template,
        slug,
        title: "Caso " + slug,
        category,
        order,
        status,
      }),
    );
  const projectDir = path.join(sandbox, "content/projects");
  const second = JSON.parse(
    fs.readFileSync(path.join(projectDir, "dos.json"), "utf8"),
  );
  fs.unlinkSync(path.join(projectDir, "dos.json"));
  fs.writeFileSync(
    path.join(projectDir, "dos.mdx"),
    ["---", JSON.stringify(second), "---", "## Apuntes del caso"].join("\n"),
  );
  for (const status of ["draft", "published"])
    fs.writeFileSync(
      path.join(sandbox, "content/blog", status + ".mdx"),
      [
        "---",
        "slug: " + status,
        "title: Artículo",
        "description: Descripción",
        "date: 2026-11-25",
        "author: Nord Studios",
        "status: " + status,
        "---",
        "## Encabezado",
      ].join("\n"),
    );
  vi.spyOn(process, "cwd").mockReturnValue(sandbox);
});
afterAll(() => {
  vi.restoreAllMocks();
  if (
    path.dirname(sandbox) === os.tmpdir() &&
    path.basename(sandbox).startsWith("nord-publication-")
  )
    fs.rmSync(sandbox, { recursive: true, force: true });
});
it("genera rutas publicadas en el orden configurado", () => {
  expect(generateStaticParams()).toEqual([{ slug: "dos" }, { slug: "uno" }]);
  expect(articles().map((p) => p.slug)).toEqual(["published"]);
  expect(projects()).toHaveLength(2);
  expect(projects()[0].body).toContain("## Apuntes del caso");
});
it("la portada enlaza al portafolio cuando hay casos publicados sin destacar", () => {
  const html = renderToStaticMarkup(Home());
  expect(html).toMatch(/href="\/proyectos"[^>]*>Ver proyectos/);
});
it("filtra por disciplina y mantiene accesible el filtro Todos", async () => {
  const html = renderToStaticMarkup(
    await list({ searchParams: Promise.resolve({ categoria: "branding" }) }),
  );
  expect(html).toContain("Caso uno");
  expect(html).not.toContain("Caso dos");
  expect(html).toContain("Todos");
});
it("renderiza el caso, el servicio y el siguiente proyecto", async () => {
  const html = renderToStaticMarkup(
    await detail({ params: Promise.resolve({ slug: "uno" }) }),
  );
  expect(html).toContain("Caso uno");
  expect(html).toContain("/proyectos/dos");
  expect(html).toContain("/servicios/branding");
});

it("compila el cuerpo MDX publicado como HTML de servidor", async () => {
  const { MDXRemote } = await import("next-mdx-remote-client/rsc");
  const project = projects().find((item) => item.slug === "dos")!;
  const html = renderToStaticMarkup(await MDXRemote({ source: project.body }));
  expect(html).toContain("<h2>Apuntes del caso</h2>");
});
