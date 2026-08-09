"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import ProductBrandSearch from "./ProductBrandSearch";
import GlobalProductSearch from "./GlobalProductSearch";

export default function ProductsPageContent({
  allProducts,
  brands,
  counts,
  playfairClassName,
}) {
  const { lang } = useLanguage();

  return (
    <main className="relative pt-28">
      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 sm:px-10">
        <div
          className="flex flex-col gap-3 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
            {t.products.eyebrow[lang]}
          </p>
          <h1
            className={`${playfairClassName} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
          >
            {t.products.heading[lang]}
          </h1>
          <p className="text-lg leading-8 text-[#3d3d5f]">
            {t.products.sub[lang]}
          </p>
        </div>

        <GlobalProductSearch allProducts={allProducts} />

        <div className="mt-10">
          <ProductBrandSearch
            brands={brands}
            counts={counts}
            playfairClassName={playfairClassName}
          />
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
        <div
          className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] lg:flex-row lg:items-center animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
              {t.products.ctaEyebrow[lang]}
            </p>
            <h2
              className={`${playfairClassName} mt-3 text-2xl font-semibold text-[#121233]`}
            >
              {t.products.ctaHeading[lang]}
            </h2>
          </div>
          <Link
            className="rounded-full bg-[#00004d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
            href="/contact"
          >
            {t.products.ctaButton[lang]}
          </Link>
        </div>
      </section>
    </main>
  );
}
