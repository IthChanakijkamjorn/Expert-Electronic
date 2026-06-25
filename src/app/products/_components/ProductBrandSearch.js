"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function ProductBrandSearch({ brands, counts, playfairClassName }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return brands;
    return brands.filter((b) => b.toLowerCase().includes(q));
  }, [query, brands]);

  return (
    <>
      {/* Search Bar */}
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
          placeholder="Search brands\u2026"
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

      {/* Brand Cards */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-white/70 bg-white/70 p-10 text-center">
          <p className="text-[#4b4b6a]">No brands found for &ldquo;{query}&rdquo;.</p>
          <button
            onClick={() => setQuery("")}
            className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d] hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {filtered.map((brand, index) => (
            <Link
              key={brand}
              href={`/products/brand/${encodeURIComponent(brand)}`}
              className="group rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] hover:-translate-y-1 animate-fade-up"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                {counts[brand]} product{counts[brand] !== 1 ? "s" : ""}
              </p>
              <h2
                className={`${playfairClassName} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}
              >
                {brand}
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
                View categories &rarr;
              </p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
