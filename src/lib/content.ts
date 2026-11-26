import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { services } from "@/config/es";
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const asset = z
  .string()
  .regex(/^\/(?:projects|brand|videos)\/[\w./-]+$/)
  .refine((v) => !v.includes(".."));
const image = z.object({
  src: asset,
  alt: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
});
const base = z.object({
  slug,
  title: z.string().min(1),
  description: z.string().min(1),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  ogImage: asset.optional(),
});
export const projectSchema = base.extend({
  category: z.enum(services.map((s) => s.slug) as [string, ...string[]]),
  year: z.number().int().optional(),
  client: z.string().optional(),
  cover: image,
  gallery: z.array(image).default([]),
  videos: z
    .array(
      z.object({
        src: asset,
        poster: asset,
        title: z.string(),
        captions: asset.optional(),
      }),
    )
    .default([]),
  context: z.string().default(""),
  challenge: z.string().default(""),
  concept: z.string().default(""),
  solution: z.string().default(""),
  deliverables: z.array(z.string()).default([]),
  body: z.string().default(""),
  results: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  order: z.number().default(100),
});
const articleSchema = base.extend({
  date: z.coerce.date(),
  author: z.string().min(1),
  service: z.string().optional(),
});
export type Project = z.infer<typeof projectSchema>;
const folder = (name: string) => path.join(process.cwd(), "content", name);
function unique<T extends { slug: string }>(items: T[]) {
  if (new Set(items.map((i) => i.slug)).size !== items.length)
    throw new Error("Slug duplicado");
  return items;
}
export function projects() {
  return unique(
    fs
      .readdirSync(folder("projects"))
      .filter((file) => /\.(mdx|json)$/.test(file))
      .map((file) => {
        const source = fs.readFileSync(
          path.join(folder("projects"), file),
          "utf8",
        );
        if (file.endsWith(".json"))
          return projectSchema.parse(JSON.parse(source));
        const doc = matter(source);
        return projectSchema.parse({ ...doc.data, body: doc.content });
      }),
  )
    .filter((p) => p.status === "published")
    .sort((a, b) => a.order - b.order);
}
export function articles() {
  return unique(
    fs
      .readdirSync(folder("blog"))
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => {
        const doc = matter(
          fs.readFileSync(path.join(folder("blog"), f), "utf8"),
        );
        return { ...articleSchema.parse(doc.data), body: doc.content };
      }),
  )
    .filter((a) => a.status === "published")
    .sort((a, b) => +b.date - +a.date);
}
