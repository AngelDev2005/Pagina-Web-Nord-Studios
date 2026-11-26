import { PortfolioIndex } from "@/components/PortfolioIndex";
import { portfolioIndex } from "@/features/portfolio/catalog";
import { projects } from "@/lib/content";
import { meta } from "@/lib/seo";
export function generateMetadata() {
  return meta(
    "Portafolio de diseño y branding",
    "Casos de identidad visual, diseño y comunicación de Nord Studios.",
    "/proyectos",
    projects().length > 0,
  );
}
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  return <PortfolioIndex {...portfolioIndex((await searchParams).categoria)} />;
}
