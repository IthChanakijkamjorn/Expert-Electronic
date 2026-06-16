import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import SiteHeader from "../../../_components/site-header";
import SiteShell from "../../../_components/site-shell";
import { playfair } from "../../../_components/brand-fonts";
import { client } from "../../../../lib/sanity";

const CATEGORIES = {
  natv: "NATV & Distribution",
  "micro-headend": "Micro Headend",
  sound: "Sound Systems",
  led: "LED & Display",
  cctv: "CCTV & Security",
};

export async function generateStaticParams() {
  const products = await client.fetch(
    `*[_type == "product" && defined(slug.current)] {
      category,
      "slug": slug.current
    }`
  );
  return products
    .filter((p) => p.category && p.slug)
    .map((p) => ({
      category: p.category,
      slug: p.slug,
    }));
}

async function getProduct(slug) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0] {
      _id,
      name,
      "slug": slug.current,
      category,
      brand,
      shortDescription,
      description,
      atAGlance,
      featured,
      "imageUrl": image.asset->url,
      "datasheetUrl": datasheet.asset->url,
      specifications
    }`,
    { slug }
  );
}

export default async function ProductPage({ params }) {
  const { category, slug } = await params;
  if (!CATEGORIES[category]) notFound();

  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60">
            <Link href="/products" className="hover:text-[#00004d]">
              Products
            </Link>
            <span>/</span>
            <Link
              href={`/products/${category}`}
              className="hover:text-[#00004d]"
            >
              {CATEGORIES[category]}
            </Link>
            <span>/</span>
            <span className="text-[#00004d] truncate max-w-[160px]">
              {product.name}
            </span>
          </nav>

          <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
            {/* Image */}
            <div
              className="animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              {product.imageUrl ? (
                <div className="relative h-80 w-full overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_rgba(0,0,77,0.12)]">
                  <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                  />
                </div>
              ) : (
                <div className="flex h-80 w-full items-center justify-center rounded-3xl bg-[#00004d]/5">
                  <span className="text-[10px] uppercase tracking-widest text-[#00004d]/30">
                    No image
                  </span>
                </div>
              )}
            </div>

            {/* Details */}
            <div
              className="flex flex-col gap-5 animate-fade-up"
              style={{ animationDelay: "80ms" }}
            >
              {product.featured && (
                <span className="inline-block w-fit rounded-full bg-[#00004d] px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white">
                  Featured
                </span>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                  {CATEGORIES[product.category]}
                </p>
                <h1
                  className={`${playfair.className} mt-2 text-3xl font-semibold text-[#0c0c2a] sm:text-4xl`}
                >
                  {product.name}
                </h1>
                {product.brand && (
                  <p className="mt-1 text-sm text-[#00004d]/60">{product.brand}</p>
                )}
              </div>

              {product.shortDescription && (
                <p className="text-base leading-7 text-[#3d3d5f]">
                  {product.shortDescription}
                </p>
              )}

              {product.description && (
                <div className="rounded-2xl border border-[#00004d]/10 bg-white p-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60">
                    Description
                  </p>
                  <p className="whitespace-pre-line text-sm leading-7 text-[#4b4b6a]">
                    {product.description}
                  </p>
                </div>
              )}

              {/* At a Glance */}
              {product.atAGlance && product.atAGlance.length > 0 && (
                <div className="rounded-2xl border border-[#00004d]/10 bg-white p-5">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60">
                    At a Glance
                  </p>
                  <ul className="flex flex-col gap-2">
                    {product.atAGlance.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm leading-6 text-[#4b4b6a]">
                        <span className="mt-1 text-[#00004d]">✓</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.datasheetUrl && (
                <a
                  href={product.datasheetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-[#00004d]/15 bg-white px-5 py-4 text-sm font-semibold text-[#00004d] transition hover:bg-[#00004d] hover:text-white"
                >
                  <span>📄</span>
                  Download Datasheet (PDF)
                </a>
              )}

              <Link
                href="/contact"
                className="rounded-full bg-[#00004d] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
              >
                Enquire About This Product
              </Link>
            </div>
          </div>

          {/* Specifications */}
          {product.specifications && product.specifications.length > 0 && (
            <div className="mt-16 animate-fade-up" style={{ animationDelay: "160ms" }}>
              <h2 className={`${playfair.className} text-2xl font-semibold text-[#0c0c2a] mb-6`}>
                Specifications
              </h2>
              <div className="flex flex-col gap-4">
                {product.specifications.map((tab) => (
                  <div key={tab._key} className="rounded-2xl border border-[#00004d]/10 bg-white overflow-hidden">
                    <div className="px-6 py-4 bg-[#00004d]/5 border-b border-[#00004d]/10">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
                        {tab.tabName}
                      </p>
                    </div>
                    {tab.sections && tab.sections.map((section) => (
                      <div key={section._key}>
                        {section.sectionName && (
                          <div className="px-6 py-3 bg-[#00004d]/[0.02] border-b border-[#00004d]/5">
                            <p className="text-xs font-semibold text-[#00004d]/70 uppercase tracking-widest">
                              {section.sectionName}
                            </p>
                          </div>
                        )}
                        {section.rows && section.rows.map((row, i) => (
                          <div
                            key={row._key}
                            className={`flex px-6 py-3 text-sm border-b border-[#00004d]/5 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-[#00004d]/[0.02]"}`}
                          >
                            <span className="w-1/2 font-medium text-[#15152e]">{row.label}</span>
                            <span className="w-1/2 text-[#4b4b6a]">{row.value}</span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    </SiteShell>
  );
}
