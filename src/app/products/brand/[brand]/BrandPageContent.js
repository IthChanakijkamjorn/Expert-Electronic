"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import { playfair } from "../../../_components/brand-fonts";
import GlobalProductSearch from "../../_components/GlobalProductSearch";
import { slugToLabel } from "@/lib/slugToLabel";

export default function BrandPageContent({ brand, categories, counts, allProducts }) {
  const { lang } = useLanguage();

  return (
    <main className="relative pt-28">
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <Link
          href="/products"
          className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60 hover:text-[#00004d]"
        >
          {t.products.allBrands[lang]}
        </Link>

        <div className="mt-4 flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">{t.products.brandEyebrow[lang]}</p>
          <h1 className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}>
            {brand}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
            {t.products.brandSub[lang](brand)}
          </p>
        </div>

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
                {t.products.productCount[lang](counts[cat])}
              </p>
              <h2 className={`${playfair.className} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}>
                {slugToLabel(cat)}
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">{t.products.viewAll[lang]}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
