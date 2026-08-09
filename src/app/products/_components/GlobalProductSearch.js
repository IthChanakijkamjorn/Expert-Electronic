"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import { slugToLabel } from "../../../lib/slugToLabel";

export default function GlobalProductSearch({ allProducts }) {
  const { lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { brands: [], products: [] };

    const brandSet = new Set();
    allProducts.forEach((p) => {
      if (p.brand && p.brand.toLowerCase().includes(q)) brandSet.add(p.brand);
    });

    const products = allProducts.filter(
      (p) =>
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q)
    ).slice(0, 8);

    return { brands: [...brandSet].slice(0, 4), products };
  }, [query, allProducts]);

  const hasResults = results.brands.length > 0 || results.products.length > 0;

  return (
    <div ref={ref} className="relative mt-8">
      <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-3 shadow-[0_8px_24px_rgba(0,0,77,0.10)]">
        <svg
          className="h-4 w-4 shrink-0 text-[#00004d]/40"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder={t.products.searchPlaceholder[lang]}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => query && setOpen(true)}
          className="w-full bg-transparent text-sm text-[#15152e] placeholder-[#00004d]/30 outline-none"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="text-xs text-[#00004d]/40 hover:text-[#00004d]"
          >
            ✕
          </button>
        )}
      </div>

      {open && query && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-white/70 bg-white/95 shadow-[0_18px_40px_rgba(0,0,77,0.15)] backdrop-blur-sm overflow-hidden">
          {!hasResults ? (
            <div className="px-5 py-6 text-center text-sm text-[#4b4b6a]">
              {t.products.noResults[lang]} &ldquo;{query}&rdquo;
            </div>
          ) : (
            <>
              {results.brands.length > 0 && (
                <div>
                  <p className="px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00004d]/40">
                    {t.products.brandsLabel[lang]}
                  </p>
                  {results.brands.map((brand) => (
                    <Link
                      key={brand}
                      href={`/products/brand/${encodeURIComponent(brand)}`}
                      onClick={() => { setQuery(""); setOpen(false); }}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#00004d]/5 transition"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00004d]/10 text-[10px] font-bold text-[#00004d]">
                        {brand.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[#15152e]">{brand}</p>
                        <p className="text-xs text-[#00004d]/50">{t.products.viewAllCategories[lang]}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {results.brands.length > 0 && results.products.length > 0 && (
                <div className="mx-5 border-t border-[#00004d]/8" />
              )}

              {results.products.length > 0 && (
                <div>
                  <p className="px-5 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#00004d]/40">
                    {t.products.productsLabel[lang]}
                  </p>
                  {results.products.map((product) => (
                    <Link
                      key={product._id}
                      href={`/products/brand/${encodeURIComponent(product.brand)}/${product.category}/${product.slug}`}
                      onClick={() => { setQuery(""); setOpen(false); }}
                      className="flex items-center gap-3 px-5 py-3 hover:bg-[#00004d]/5 transition"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00004d]/5 text-[10px] text-[#00004d]/40">
                        &#9633;
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#15152e]">{product.name}</p>
                        <p className="text-xs text-[#00004d]/50">
                          {product.brand}{product.category ? ` · ${slugToLabel(product.category)}` : ""}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
              <div className="h-2" />
            </>
          )}
        </div>
      )}
    </div>
  );
}
