import { notFound } from "next/navigation";
import SiteHeader from "../../../../../../_components/site-header";
import SiteShell from "../../../../../../_components/site-shell";
import { client } from "../../../../../../../lib/sanity";
import BrandProductPageContent from "./BrandProductPageContent";

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current) && defined(brand) && defined(mainCategory) && defined(subCategory)] {
      brand, mainCategory, subCategory, "slug": slug.current
    }`
  );
  return products
    .filter((p) => p.brand && p.mainCategory && p.subCategory && p.slug)
    .map((p) => ({
      brand: encodeURIComponent(p.brand),
      mainCategory: p.mainCategory,
      subCategory: p.subCategory,
      slug: p.slug,
    }));
}

async function getProduct(slug) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id, name, "slug": slug.current, mainCategory, subCategory, brand,
      shortDescription, description, atAGlance, featured,
      "imageUrl": image.asset->url,
      "datasheetUrl": datasheet.asset->url,
      specifications
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }) {
  const { brand: rawBrand, mainCategory, subCategory, slug } = await params;
  const brand = decodeURIComponent(rawBrand);
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <BrandProductPageContent brand={brand} mainCategory={mainCategory} subCategory={subCategory} product={product} />
    </SiteShell>
  );
}
