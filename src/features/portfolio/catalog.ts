import { projects } from "@/lib/content";
import { services } from "@/config/es";
export function portfolioIndex(categoria?: string) {
  const all = projects();
  const cats = services.filter((s) => all.some((p) => p.category === s.slug));
  const selected = cats.find((c) => c.slug === categoria)?.slug;
  return {
    cats,
    selected,
    hasProjects: all.length > 0,
    items: selected ? all.filter((p) => p.category === selected) : all,
  };
}
export function portfolioDetail(slug: string) {
  const all = projects();
  const index = all.findIndex((p) => p.slug === slug);
  if (index < 0) return undefined;
  const p = all[index];
  return {
    p,
    next: all.length > 1 ? all[(index + 1) % all.length] : undefined,
    related: all.filter(
      (item) => item.slug !== slug && item.category === p.category,
    ),
  };
}
