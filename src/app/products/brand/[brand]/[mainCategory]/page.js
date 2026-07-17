import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "../../../../_components/site-header";
import SiteShell from "../../../../_components/site-shell";
import { playfair } from "../../../../_components/brand-fonts";
import { client } from "../../../../../lib/sanity";
import GlobalProductSearch from "../../../_components/GlobalProductSearch";

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

const SUB_CATEGORY_LABELS = {
  'mixer-amplifier': 'Mixer Amplifier',
  'zone-mixer-amplifier': 'Zone Mixer Amplifier',
  'class-d-power-amplifier': 'Class-D Power Amplifier',
  'pre-amplifier': 'Pre-Amplifier',
  'ceiling-speaker': 'Ceiling Speaker',
  'wall-mounted-speaker': 'Wall Mounted Speaker',
  'active-speaker': 'Active Speaker',
  'horn-speaker': 'Horn Speaker',
  'projection-speaker': 'Projection Speaker',
  'pendant-speaker': 'Pendant Speaker',
  'garden-speaker': 'Garden Speaker',
  'column-speaker': 'Column Speaker',
  'controller': 'Controller',
  'audio-sources': 'Audio Sources',
  'microphone': 'Microphone',
  'volume-controller': 'Volume Controller',
  'lectern': 'Lectern',
  'others': 'Others',
  '88-series': '88 Series',
  '77-series': '77 Series',
  '69-series': '69 Series',
  'digital-conference': 'Digital Conference',
  'itchub': 'itcHUB',
  '810-series': '810 Series',
  '820-series': '820 Series',
  '830e-series': '830E Series',
  'par-light': 'Par Light',
  'effect-light': 'Effect Light',
  'moving-head-light': 'Moving Head Light',
  'console': 'Console',
  'flood-light': 'Flood Light',
};

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

  const mainLabel = MAIN_CATEGORY_LABELS[mainCategory] || mainCategory;

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

          {/* Global search */}
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
                  {SUB_CATEGORY_LABELS[sub] || sub}
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
