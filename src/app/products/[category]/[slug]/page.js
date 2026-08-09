import { notFound } from "next/navigation";
import SiteHeader from "../../../_components/site-header";
import SiteShell from "../../../_components/site-shell";
import { client } from "../../../../lib/sanity";
import ProductDetailPageContent from "./ProductDetailPageContent";

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current)] {
      category,
      "slug": slug.current
    }`
  );
  return products
    .filter((p) => p.category && p.slug)
    .map((p) => ({ category: p.category, slug: p.slug }));
}

async function getProduct(slug) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, category, brand,
      shortDescription, description, atAGlance, featured,
      "imageUrl": image.asset->url,
      "datasheetUrl": datasheet.asset->url,
      specifications
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }) {
  const { category, slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <ProductDetailPageContent category={category} product={product} />
    </SiteShell>
  );
}
