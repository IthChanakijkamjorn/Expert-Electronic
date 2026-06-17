import Link from "next/link";
import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";
import { client } from "../../lib/sanity";

function slugToLabel(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

async function getCategoriesWithCounts() {
  const products = await client.fetch(`*[_type == "product"] { category }`);
  const counts = {};
  products.forEach((p) => {
    if (p.category) {
      counts[p.category] = (counts[p.category] || 0) + 1;
    }
  });
  return counts;
}

export default async function ProductsPage() {
  const counts = await getCategoriesWithCounts();
  const categories = Object.keys(counts).sort();

  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        {/* Hero */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 sm:px-10">
          <div
            className="flex flex-col gap-3 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              Products
            </p>
            <h1
              className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
            >
              Equipment we specify and install.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              We supply gear as part of full design and installation projects.
              Browse by category below.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {categories.map((cat, index) => (
              <Link
                key={cat}
                href={`/products/${cat}`}
                className="group rounded-3xl border border-white/70 bg-white/70 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] transition hover:shadow-[0_24px_50px_rgba(0,0,77,0.18)] hover:-translate-y-1 animate-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/60">
                  {counts[cat]} product{counts[cat] !== 1 ? "s" : ""}
                </p>
                <h2
                  className={`${playfair.className} mt-2 text-2xl font-semibold text-[#121233] group-hover:text-[#00004d]`}
                >
                  {slugToLabel(cat)}
                </h2>
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#00004d]">
                  View all &rarr;
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
          <div
            className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_18px_40px_rgba(0,0,77,0.12)] lg:flex-row lg:items-center animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                Need a custom build
              </p>
              <h2
                className={`${playfair.className} mt-3 text-2xl font-semibold text-[#121233]`}
              >
                We can tailor a system for your environment.
              </h2>
            </div>
            <Link
              className="rounded-full bg-[#00004d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
              href="/contact"
            >
              Talk to Project Team
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
