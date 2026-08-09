import { notFound } from "next/navigation";
import SiteHeader from "../../../../../_components/site-header";
import SiteShell from "../../../../../_components/site-shell";
import { client } from "../../../../../../lib/sanity";
import SubCategoryPageContent from "./SubCategoryPageContent";

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(brand) && defined(mainCategory) && defined(subCategory)] { brand, mainCategory, subCategory }`
  );
  const seen = new Set();
  return products
    .filter((p) => {
      const key = `${p.brand}__${p.mainCategory}__${p.subCategory}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((p) => ({ brand: encodeURIComponent(p.brand), mainCategory: p.mainCategory, subCategory: p.subCategory }));
}

async function getAllProducts() {
  return client.fetch(
    `*[_type == "product" && defined(slug.current)] | order(brand asc, name asc) {
      _id, name, "slug": slug.current, brand, mainCategory, subCategory
    }`
  );
}

async function getProducts(brand, mainCategory, subCategory) {
  return client.fetch(
    `*[_type == "product" && brand == $brand && mainCategory == $mainCategory && subCategory == $subCategory && defined(slug.current)] | order(name asc) {
      _id, name, "slug": slug.current, brand, shortDescription, "imageUrl": image.asset->url
    }`,
    { brand, mainCategory, subCategory }
  );
}

export default async function SubCategoryPage({ params }) {
  const { brand: rawBrand, mainCategory, subCategory } = await params;
  const brand = decodeURIComponent(rawBrand);

  const [products, allProducts] = await Promise.all([
    getProducts(brand, mainCategory, subCategory),
    getAllProducts(),
  ]);

  if (!products || products.length === 0) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <SubCategoryPageContent brand={brand} mainCategory={mainCategory} subCategory={subCategory} products={products} allProducts={allProducts} />
    </SiteShell>
  );
}
