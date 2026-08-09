import { notFound } from "next/navigation";
import SiteHeader from "../../../../_components/site-header";
import SiteShell from "../../../../_components/site-shell";
import { client } from "../../../../../lib/sanity";
import MainCategoryPageContent from "./MainCategoryPageContent";

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(brand) && defined(mainCategory)] { brand, mainCategory }`
  );
  const seen = new Set();
  return products
    .filter((p) => {
      const key = `${p.brand}__${p.mainCategory}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((p) => ({ brand: encodeURIComponent(p.brand), mainCategory: p.mainCategory }));
}

async function getAllProducts() {
  return client.fetch(
    `*[_type == "product" && defined(slug.current)] | order(brand asc, name asc) {
      _id, name, "slug": slug.current, brand, mainCategory, subCategory
    }`
  );
}

async function getSubCategoriesForBrandAndMain(brand, mainCategory) {
  const products = await client.fetch(
    `*[_type == "product" && brand == $brand && mainCategory == $mainCategory] { subCategory }`,
    { brand, mainCategory }
  );
  const counts = {};
  products.forEach((p) => {
    if (p.subCategory) counts[p.subCategory] = (counts[p.subCategory] || 0) + 1;
  });
  return counts;
}

export default async function MainCategoryPage({ params }) {
  const { brand: rawBrand, mainCategory } = await params;
  const brand = decodeURIComponent(rawBrand);

  const [counts, allProducts] = await Promise.all([
    getSubCategoriesForBrandAndMain(brand, mainCategory),
    getAllProducts(),
  ]);
  const subCategories = Object.keys(counts).sort();

  if (subCategories.length === 0) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <MainCategoryPageContent brand={brand} mainCategory={mainCategory} subCategories={subCategories} counts={counts} allProducts={allProducts} />
    </SiteShell>
  );
}
