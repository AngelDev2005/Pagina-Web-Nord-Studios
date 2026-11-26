import { MDXRemote } from "next-mdx-remote-client/rsc";
import { ProjectDetail } from "@/components/ProjectDetail";
import { portfolioDetail } from "@/features/portfolio/catalog";
import { projects } from "@/lib/content";
import { meta } from "@/lib/seo";
import { notFound } from "next/navigation";
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () =>
  projects().map(({ slug }) => ({ slug }));
async function get(p: Props) {
  const { slug } = await p.params;
  return portfolioDetail(slug) ?? notFound();
}
export async function generateMetadata(props: Props) {
  const { p } = await get(props);
  return meta(
    p.seoTitle || p.title,
    p.seoDescription || p.description,
    "/proyectos/" + p.slug,
    true,
    p.ogImage || p.cover.src,
  );
}
export default async function Page(props: Props) {
  const model = await get(props);
  return (
    <ProjectDetail {...model}>
      {model.p.body && (
        <article>
          <MDXRemote source={model.p.body} />
        </article>
      )}
    </ProjectDetail>
  );
}
