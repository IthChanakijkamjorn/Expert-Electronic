"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { slugToLabel } from "../../../lib/slugToLabel";

export default function ProductSearch({ brands, allProducts, playfairClassName }) {
  const [query, setQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState("All");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allProducts.filter((p) => {
      const matchesQuery =
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.shortDescription?.toLowerCase().includes(q);
      const matchesBrand =
        activeBrand === "All" || p.brand === activeBrand;
      return matchesQuery && matchesBrand;
    });
  }, [query, activeBrand, allProducts]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((p) => {
      const brand = p.brand || "Other";
      const cat = p.category || "uncategorized";
      if (!map[brand]) map[brand] = {};
      if (!map[brand][cat]) map[brand][cat] = [];
      map[brand][cat].push(p);
    });
    return map;
  }, [filtered]);

  const brandList = ["All", ...brands];
  const isSearching = query.trim() !== "";

  return (
    <>
      <div className="mt-8 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/80 px-5 py-3 shadow-[0_8px_24px_rgba(0,0,77,0.10)]">
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
          placeholder="Search products, brands, categories\u2026"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent text-sm text-[#15152e] placeholder-[#00004d]/30 outline-none"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-xs text-[#00004d]/40 hover:text-[#00004d]"
          >
            ✕
          </button>
        )}
      </div>

      {!isSearching && (
        <div className="mt-6 flex flex-wrap gap-2">
          {brandList.map((brand) => (
            <button
              key={brand}
              onClick={() => setActiveBrand(brand)}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                activeBrand === brand
                  ? "bg-[#00004d] text-white shadow-md"
                  : "border border-[#00004d]/20 text-[#00004d]/70 hover:border-[#00004d]/50 hover:text-[#00004d]"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-white/70 bg-white/70 p-10 text-center">
          <p className="text-[#4b4b6a]">No products found for &ldquo;{query}&rdquo;.</p>
          <button
            onClick={() => { setQuery(""); setActiveBrand("All"); }}
            className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d] hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : isSearching ? (
        <div>
          <p className="mt-6 text-xs text-[#00004d]/50">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &ldquo;{query}&rdquo;
          </p>
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
              <ProductCard key={product._id} product={product} playfairClassName={playfairClassName} />
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-10 space-y-14">
          {Object.entries(grouped).map(([brand, categories]) => (
            <div key={brand}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className={`${playfairClassName} text-2xl font-semibold text-[#0c0c2a]`}>
                  {brand}
                </h2>
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/40">
                  {Object.values(categories).flat().length} product
                  {Object.values(categories).flat().length !== 1 ? "s" : ""}
                </span>
              </div>

              <div className="space-y-8">
                {Object.entries(categories).map(([cat, products]) => (
                  <div key={cat}>
                    <div className="mb-3 flex items-center justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                        {slugToLabel(cat)} \u2014 {products.length} item{products.length !== 1 ? "s" : ""}
                      </p>
                      <Link
                        href={`/products/${cat}`}
                        className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d] hover:underline"
                      >
                        View all &rarr;
                      </Link>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {products.slice(0, 3).map((product) => (
                        <ProductCard key={product._id} product={product} playfairClassName={playfairClassName} />
                      ))}
                    </div>
                    {products.length > 3 && (
                      <Link
                        href={`/products/${cat}`}
                        className="mt-4 inline-block text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d] hover:underline"
                      >
                        + {products.length - 3} more in {slugToLabel(cat)} &rarr;
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

function ProductCard({ product, playfairClassName }) {
  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] animate-fade-up"
    >
      {product.imageUrl ? (
        <div className="relative mb-4 h-40 w-full overflow-hidden rounded-2xl bg-gray-50">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-contain p-2 transition group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="mb-4 flex h-40 w-full items-center justify-center rounded-2xl bg-[#00004d]/5">
          <span className="text-[10px] uppercase tracking-widest text-[#00004d]/30">
            No image
          </span>
        </div>
      )}
      <h3 className="text-base font-semibold text-[#15152e] transition group-hover:text-[#00004d]">
        {product.name}
      </h3>
      {product.brand && (
        <p className="mt-1 text-xs font-medium text-[#00004d]/60">{product.brand}</p>
      )}
      {product.shortDescription && (
        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#4b4b6a]">
          {product.shortDescription}
        </p>
      )}
      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
        View details &rarr;
      </p>
    </Link>
  );
}
