"use client";

import Link from "next/link";

export default function ProductBrandSearch({ brands, counts, playfairClassName }) {
  if (brands.length === 0) return null;

  return (
    <div className="mt-10 grid gap-6 sm:grid-cols-2">
      {brands.map((brand, index) => (
        <Link
          key={brand}
          href={`/products/brand/${encodeURIComponent(brand)}`}
          className="group rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] hover:-translate-y-1 animate-fade-up"
          style={{ animationDelay: `${index * 80}ms` }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
            {counts[brand]} product{counts[brand] !== 1 ? "s" : ""}
          </p>
          <h2 className={`${playfairClassName} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}>
            {brand}
          </h2>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
            View categories &rarr;
          </p>
        </Link>
      ))}
    </div>
  );
}
