"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

const brandLogos = {
  BOSE: "/icons/BOSE LOGO.jpg",
  ITC: "/icons/ITC LOGO.jpg",
  WISI: "/icons/WISI LOGO.png",
  MAXHUB: "/icons/MAXHUB LOGO.jpg",
  DAHUA: "/icons/DAHUA LOGO.png",
};

export default function ProductBrandSearch({ brands, counts, playfairClassName }) {
  const { lang } = useLanguage();

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
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                {t.products.productCount[lang](counts[brand])}
              </p>
              <h2 className={`${playfairClassName} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}>
                {brand}
              </h2>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
                {t.products.viewCategories[lang]} &rarr;
              </p>
            </div>
            {brandLogos[brand] && (
              <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-white border border-[#00004d]/10 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src={brandLogos[brand]}
                  alt={`${brand} logo`}
                  width={56}
                  height={56}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}