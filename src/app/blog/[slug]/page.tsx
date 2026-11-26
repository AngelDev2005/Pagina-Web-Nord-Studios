import { MDXRemote } from "next-mdx-remote-client/rsc";
import { articles } from "@/lib/content";
import { site } from "@/config/site";
import { services } from "@/config/es";
import { Crumbs, HeroTitle, Button } from "@/components/Editorial";
import { meta, Structured } from "@/lib/seo";
import { notFound } from "next/navigation";
type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () =>
  articles().map(({ slug }) => ({ slug }));
async function get(p: Props) {
  const { slug } = await p.params;
  return articles().find((a) => a.slug === slug) ?? notFound();
}
export async function generateMetadata(p: Props) {
  const a = await get(p);
  return meta(
    a.seoTitle || a.title,
    a.seoDescription || a.description,
    "/blog/" + a.slug,
    true,
    a.ogImage,
  );
}
export default async function Page(p: Props) {
  const a = await get(p),
    s = services.find((s) => s.slug === a.service);
  return (
    <>
      <Crumbs
        items={[
          ["/blog", "Blog"],
          ["/blog/" + a.slug, a.title],
        ]}
      />
      <HeroTitle
        label={
          a.author +
          " / " +
          a.date.toLocaleDateString(site.locale, { timeZone: "UTC" })
        }
        title={a.title}
        intro={a.description}
      />
      <Structured
        data={{
          "@type": "Article",
          headline: a.title,
          author: { "@type": "Organization", name: a.author },
          datePublished: a.date.toISOString(),
        }}
      />
      <div className="paper">
        <article className="wrap section reading">
          <MDXRemote source={a.body} />
          {s && (
            <Button secondary href={"/servicios/" + s.slug}>
              {s.name}
            </Button>
          )}
        </article>
      </div>
    </>
  );
}
