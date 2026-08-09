"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import { playfair } from "../../../../../_components/brand-fonts";
import GlobalProductSearch from "../../../../_components/GlobalProductSearch";
import { slugToLabel } from "@/lib/slugToLabel";

export default function SubCategoryPageContent({ brand, mainCategory, subCategory, products, allProducts }) {
  const { lang } = useLanguage();
  const mainLabel = slugToLabel(mainCategory);
  const subLabel = slugToLabel(subCategory);

  return (
    <main className="relative pt-28">
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60">
          <Link href="/products" className="hover:text-[#00004d]">{t.products.breadcrumbProducts[lang]}</Link>
          <span>/</span>
          <Link href={`/products/brand/${encodeURIComponent(brand)}`} className="hover:text-[#00004d]">{brand}</Link>
          <span>/</span>
          <Link href={`/products/brand/${encodeURIComponent(brand)}/${mainCategory}`} className="hover:text-[#00004d]">{mainLabel}</Link>
          <span>/</span>
          <span className="text-[#00004d]">{subLabel}</span>
        </nav>

        <div className="mt-4 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">{brand} · {mainLabel}</p>
          <h1 className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}>
            {subLabel}
          </h1>
          <p className="text-lg leading-8 text-[#3d3d5f]">
            {t.products.productsAvailable[lang](products.length)}
          </p>
        </div>

        <GlobalProductSearch allProducts={allProducts} />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <Link
              key={product._id}
              href={`/products/brand/${encodeURIComponent(brand)}/${mainCategory}/${subCategory}/${product.slug}`}
              className="group rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] animate-fade-up"
              style={{ animationDelay: `${index * 60}ms` }}
            >
              {product.imageUrl ? (
                <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-gray-50">
                  <Image src={product.imageUrl} alt={product.name} fill className="object-contain p-2 transition group-hover:scale-105" />
                </div>
              ) : (
                <div className="mb-4 flex h-40 w-full items-center justify-center rounded-2xl bg-[#00004d]/5">
                  <span className="text-[10px] uppercase tracking-widest text-[#00004d]/30">{t.products.noImage[lang]}</span>
                </div>
              )}
              <h3 className="text-base font-semibold text-[#15152e] transition group-hover:text-[#00004d]">{product.name}</h3>
              {product.shortDescription && (
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#4b4b6a]">{product.shortDescription}</p>
              )}
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">{t.products.viewDetails[lang]}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
