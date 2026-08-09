import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";
import { client } from "../../lib/sanity";
import ProductsPageContent from "./_components/ProductsPageContent";

async function getAllProductsData() {
  return client.fetch(
    `*[_type == "product" && defined(slug.current)] | order(brand asc, name asc) {
      _id,
      name,
      "slug": slug.current,
      brand,
      category,
      shortDescription
    }`
  );
}

export default async function ProductsPage() {
  const allProducts = await getAllProductsData();
  const counts = {};
  allProducts.forEach((p) => {
    if (p.brand) counts[p.brand] = (counts[p.brand] || 0) + 1;
  });
  const brands = Object.keys(counts).sort();

  return (
    <SiteShell>
      <SiteHeader />
      <ProductsPageContent
        allProducts={allProducts}
        brands={brands}
        counts={counts}
        playfairClassName={playfair.className}
      />
    </SiteShell>
  );
}
