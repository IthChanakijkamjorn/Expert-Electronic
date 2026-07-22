import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../_components/site-header";
import SiteShell from "../../../../_components/site-shell";
import { playfair } from "../../../../_components/brand-fonts";
import { client } from "../../../../../lib/sanity";
import GlobalProductSearch from "../../../_components/GlobalProductSearch";
import { slugToLabel } from "../../../../../lib/slugToLabel";

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

  const mainLabel = slugToLabel(mainCategory);

  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60">
            <Link href="/products" className="hover:text-[#00004d]">Products</Link>
            <span>/</span>
            <Link href={`/products/brand/${encodeURIComponent(brand)}`} className="hover:text-[#00004d]">{brand}</Link>
            <span>/</span>
            <span className="text-[#00004d]">{mainLabel}</span>
          </nav>

          <div className="mt-4 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">{brand}</p>
            <h1 className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}>
              {mainLabel}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              Browse sub-categories for {brand} {mainLabel}.
            </p>
          </div>

          <GlobalProductSearch allProducts={allProducts} />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {subCategories.map((sub, index) => (
              <Link
                key={sub}
                href={`/products/brand/${encodeURIComponent(brand)}/${mainCategory}/${sub}`}
                className="group rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                  {counts[sub]} product{counts[sub] !== 1 ? "s" : ""}
                </p>
                <h2 className={`${playfair.className} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}>
                  {slugToLabel(sub)}
                </h2>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">View all &rarr;</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
