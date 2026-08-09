import { notFound } from "next/navigation";
import SiteHeader from "../../_components/site-header";
import SiteShell from "../../_components/site-shell";
import { client } from "../../../lib/sanity";
import CategoryPageContent from "./CategoryPageContent";

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product" && defined(category)] { category }`);
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];
  return categories.map((category) => ({ category }));
}

async function getCategoryProducts(category) {
  return client.fetch(
    `*[_type == "product" && category == $category && defined(slug.current)] | order(name asc) {
      _id,
      name,
      "slug": slug.current,
      brand,
      shortDescription,
      "imageUrl": image.asset->url
    }`,
    { category }
  );
}

export default async function CategoryPage({ params }) {
  const { category } = await params;

  const products = await getCategoryProducts(category);

  if (!products || products.length === 0) {
    const exists = await client.fetch(
      `count(*[_type == "product" && category == $category])`,
      { category }
    );
    if (exists === 0) notFound();
  }

  return (
    <SiteShell>
      <SiteHeader />
      <CategoryPageContent category={category} products={products} />
    </SiteShell>
  );
}
