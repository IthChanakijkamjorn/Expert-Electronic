export function slugToLabel(slug) {
  return String(slug || "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function normalizeSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeGroupValue(value, fallback) {
  const normalized = String(value || "").trim();
  return normalized || fallback;
}

export function matchesProductSearch(product, query) {
  const terms = normalizeSearchText(query).split(" ").filter(Boolean);

  if (terms.length === 0) return true;

  const haystack = normalizeSearchText(
    [
      product.name,
      product.brand,
      product.category,
      product.shortDescription,
      product.description,
    ].join(" ")
  );

  return terms.every((term) => haystack.includes(term));
}
