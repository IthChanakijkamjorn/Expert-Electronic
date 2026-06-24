"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { playfair } from "../_components/brand-fonts";
import {
  matchesProductSearch,
  normalizeGroupValue,
  slugToLabel,
} from "./products-utils";

function FilterChip({ active, children, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] transition ${
        active
          ? "border-[#00004d] bg-[#00004d] text-white"
          : "border-[#00004d]/10 bg-white text-[#00004d]/70 hover:border-[#00004d]/30 hover:text-[#00004d]"
      }`}
    >
      {children}
    </button>
  );
}

function ProductCard({ product }) {
  const categoryLabel = slugToLabel(product.category);

  return (
    <Link
      href={`/products/${product.category}/${product.slug}`}
      className="group rounded-3xl border border-white/70 bg-white/70 p-5 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)]"
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

      <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#00004d]/50">
        {product.brand} • {categoryLabel}
      </p>
      <h3 className="mt-2 text-base font-semibold text-[#15152e] transition group-hover:text-[#00004d]">
        {product.name}
      </h3>
      {(product.shortDescription || product.description) && (
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[#4b4b6a]">
          {product.shortDescription || product.description}
        </p>
      )}
      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
        View details &rarr;
      </p>
    </Link>
  );
}

export default function ProductsBrowser({ products }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const preparedProducts = useMemo(
    () =>
      products.map((product) => ({
        ...product,
        brand: normalizeGroupValue(product.brand, "Other"),
        category: normalizeGroupValue(product.category, "general"),
      })),
    [products]
  );

  const filteredByBrandAndSearch = useMemo(
    () =>
      preparedProducts.filter((product) => {
        const brandMatches =
          selectedBrand === "all" || product.brand === selectedBrand;

        return brandMatches && matchesProductSearch(product, searchQuery);
      }),
    [preparedProducts, searchQuery, selectedBrand]
  );

  const brandSummaries = useMemo(() => {
    const counts = new Map();

    preparedProducts.forEach((product) => {
      counts.set(product.brand, (counts.get(product.brand) || 0) + 1);
    });

    return [...counts.entries()]
      .map(([brand, count]) => ({ brand, count }))
      .sort((left, right) => left.brand.localeCompare(right.brand));
  }, [preparedProducts]);

  const availableCategories = useMemo(() => {
    const counts = new Map();

    filteredByBrandAndSearch.forEach((product) => {
      counts.set(product.category, (counts.get(product.category) || 0) + 1);
    });

    return [...counts.entries()]
      .map(([category, count]) => ({ category, count }))
      .sort((left, right) => left.category.localeCompare(right.category));
  }, [filteredByBrandAndSearch]);

  const activeCategory = useMemo(() => {
    if (
      selectedCategory !== "all" &&
      !availableCategories.some((item) => item.category === selectedCategory)
    ) {
      return "all";
    }

    return selectedCategory;
  }, [availableCategories, selectedCategory]);

  const visibleProducts = useMemo(
    () =>
      filteredByBrandAndSearch.filter(
        (product) =>
          activeCategory === "all" || product.category === activeCategory
      ),
    [activeCategory, filteredByBrandAndSearch]
  );

  const groupedProducts = useMemo(() => {
    const groups = new Map();

    visibleProducts.forEach((product) => {
      if (!groups.has(product.brand)) {
        groups.set(product.brand, new Map());
      }

      const categories = groups.get(product.brand);

      if (!categories.has(product.category)) {
        categories.set(product.category, []);
      }

      categories.get(product.category).push(product);
    });

    return [...groups.entries()]
      .sort(([leftBrand], [rightBrand]) => leftBrand.localeCompare(rightBrand))
      .map(([brand, categories]) => ({
        brand,
        categories: [...categories.entries()]
          .sort(([leftCategory], [rightCategory]) =>
            leftCategory.localeCompare(rightCategory)
          )
          .map(([category, brandProducts]) => ({
            category,
            products: brandProducts.sort((left, right) =>
              left.name.localeCompare(right.name)
            ),
          })),
      }));
  }, [visibleProducts]);

  return (
    <>
      <div className="mt-10 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] sm:p-8 animate-fade-up">
        <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr] lg:items-end">
          <div>
            <label
              htmlFor="product-search"
              className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70"
            >
              Search products
            </label>
            <div className="mt-3 flex items-center rounded-2xl border border-[#00004d]/10 bg-white px-4 py-3 shadow-sm">
              <span className="mr-3 text-[#00004d]/40">🔎</span>
              <input
                id="product-search"
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search name, brand, category, or description"
                className="w-full bg-transparent text-sm text-[#15152e] outline-none placeholder:text-[#00004d]/35"
              />
            </div>
          </div>

          <div className="grid gap-4 text-sm text-[#3d3d5f] sm:grid-cols-3 lg:grid-cols-1">
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
                Brands
              </span>
              <span className="mt-1 block text-lg font-semibold text-[#121233]">
                {brandSummaries.length}
              </span>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
                Categories
              </span>
              <span className="mt-1 block text-lg font-semibold text-[#121233]">
                {availableCategories.length}
              </span>
            </p>
            <p>
              <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/50">
                Matching products
              </span>
              <span className="mt-1 block text-lg font-semibold text-[#121233]">
                {visibleProducts.length}
              </span>
            </p>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
            Browse by brand
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <FilterChip
              active={selectedBrand === "all"}
              onClick={() => setSelectedBrand("all")}
            >
              All brands
            </FilterChip>
            {brandSummaries.map(({ brand, count }) => (
              <FilterChip
                key={brand}
                active={selectedBrand === brand}
                onClick={() => setSelectedBrand(brand)}
              >
                {brand} ({count})
              </FilterChip>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
            Then filter by category
          </p>
          <div className="mt-3 flex flex-wrap gap-3">
            <FilterChip
              active={activeCategory === "all"}
              onClick={() => setSelectedCategory("all")}
            >
              All categories
            </FilterChip>
            {availableCategories.map(({ category, count }) => (
              <FilterChip
                key={category}
                active={activeCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {slugToLabel(category)} ({count})
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      {groupedProducts.length === 0 ? (
        <div className="mt-10 rounded-3xl border border-white/70 bg-white/70 p-10 text-center animate-fade-up">
          <p className="text-lg font-semibold text-[#121233]">
            No matching products found.
          </p>
          <p className="mt-2 text-sm leading-6 text-[#4b4b6a]">
            Try another keyword, brand, or category filter.
          </p>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-8">
          {groupedProducts.map((brandGroup, brandIndex) => (
            <section
              key={brandGroup.brand}
              className="rounded-[32px] border border-white/70 bg-white/75 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] sm:p-8 animate-fade-up"
              style={{ animationDelay: `${brandIndex * 60}ms` }}
            >
              <div className="flex flex-col gap-3 border-b border-[#00004d]/10 pb-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/55">
                    Brand
                  </p>
                  <h2
                    className={`${playfair.className} mt-2 text-3xl font-semibold text-[#121233]`}
                  >
                    {brandGroup.brand}
                  </h2>
                </div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]/55">
                  {brandGroup.categories.reduce(
                    (total, group) => total + group.products.length,
                    0
                  )}{" "}
                  product
                  {brandGroup.categories.reduce(
                    (total, group) => total + group.products.length,
                    0
                  ) !== 1
                    ? "s"
                    : ""}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-8">
                {brandGroup.categories.map((categoryGroup) => (
                  <div key={`${brandGroup.brand}-${categoryGroup.category}`}>
                    <div className="mb-4 flex items-center justify-between gap-4">
                      <h3 className="text-lg font-semibold text-[#15152e]">
                        {slugToLabel(categoryGroup.category)}
                      </h3>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#00004d]/45">
                        {categoryGroup.products.length} item
                        {categoryGroup.products.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                      {categoryGroup.products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
