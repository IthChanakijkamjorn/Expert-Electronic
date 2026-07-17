import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../_components/site-header";
import SiteShell from "../../../_components/site-shell";
import { playfair } from "../../../_components/brand-fonts";
import { client } from "../../../../lib/sanity";
import GlobalProductSearch from "../../_components/GlobalProductSearch";

const MAIN_CATEGORY_LABELS = {
  'pa-amplifier': 'PA Amplifier',
  'pa-speaker': 'PA Speaker',
  'analog-pa-system': 'Analog PA System',
  'ip-pa-intercom': 'IP/PA Intercom',
  'audio-conference': 'Audio Conference',
  'interactive-flat-panel': 'Interactive Flat Panel',
  'led-stage-lighting': 'LED Stage Lighting',
  'architecture-lighting': 'Architecture Lighting',
};

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
      <main className="relative pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
          <Link
            href="/products"
            className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60 hover:text-[#00004d]"
          >
            &larr; All Brands
          </Link>

          <div className="mt-4 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">Brand</p>
            <h1 className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}>
              {brand}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              Browse categories for {brand} products.
            </p>
          </div>

          {/* Global search */}
          <GlobalProductSearch allProducts={allProducts} />

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {categories.map((cat, index) => (
              <Link
                key={cat}
                href={`/products/brand/${encodeURIComponent(brand)}/${cat}`}
                className="group rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                  {counts[cat]} product{counts[cat] !== 1 ? "s" : ""}
                </p>
                <h2 className={`${playfair.className} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}>
                  {MAIN_CATEGORY_LABELS[cat] || cat}
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
