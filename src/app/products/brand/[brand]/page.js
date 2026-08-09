import { notFound } from "next/navigation";
import SiteHeader from "../../../_components/site-header";
import SiteShell from "../../../_components/site-shell";
import { client } from "../../../../lib/sanity";
import BrandPageContent from "./BrandPageContent";

export async function generateStaticParams() {
  const products = await client.fetch(`*[_type == "product" && defined(brand)] { brand }`);
  const brands = [...new Set(products.map((p) => p.brand).filter(Boolean))];
  return brands.map((brand) => ({ brand: encodeURIComponent(brand) }));
}

async function getAllProducts() {
  return client.fetch(
    `*[_type == "product" && defined(slug.current)] | order(brand asc, name asc) {
      _id, name, "slug": slug.current, brand, mainCategory, subCategory
    }`
  );
}

async function getMainCategoriesForBrand(brand) {
  const products = await client.fetch(
    `*[_type == "product" && brand == $brand] { mainCategory }`,
    { brand }
  );
  const counts = {};
  products.forEach((p) => {
    if (p.mainCategory) counts[p.mainCategory] = (counts[p.mainCategory] || 0) + 1;
  });
  return counts;
}

export default async function BrandPage({ params }) {
  const { brand: rawBrand } = await params;
  const brand = decodeURIComponent(rawBrand);

  const [counts, allProducts] = await Promise.all([
    getMainCategoriesForBrand(brand),
    getAllProducts(),
  ]);
  const categories = Object.keys(counts).sort();

  if (categories.length === 0) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <BrandPageContent brand={brand} categories={categories} counts={counts} allProducts={allProducts} />
    </SiteShell>
  );
}
