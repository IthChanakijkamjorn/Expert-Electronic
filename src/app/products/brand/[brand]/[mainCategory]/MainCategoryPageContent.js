"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import { playfair } from "../../../../_components/brand-fonts";
import GlobalProductSearch from "../../../_components/GlobalProductSearch";
import { slugToLabel } from "@/lib/slugToLabel";

export default function MainCategoryPageContent({ brand, mainCategory, subCategories, counts, allProducts }) {
  const { lang } = useLanguage();
  const mainLabel = slugToLabel(mainCategory);

  return (
    <main className="relative pt-28">
      <section className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10 sm:px-10">
        <nav className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/60">
          <Link href="/products" className="hover:text-[#00004d]">{t.products.breadcrumbProducts[lang]}</Link>
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
            {t.products.browseSub[lang](brand, mainLabel)}
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
                {t.products.productCount[lang](counts[sub])}
              </p>
              <h2 className={`${playfair.className} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}>
                {slugToLabel(sub)}
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">{t.products.viewAll[lang]}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
