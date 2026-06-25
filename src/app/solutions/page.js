import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";
import { client } from "../../lib/sanity";
import SolutionsGallery from "./_components/SolutionsGallery";
import Link from "next/link";

async function getProjects() {
  return client.fetch(
    `*[_type == "project"] | order(year desc, title asc) {
      _id,
      title,
      year,
      location,
      "images": images[] {
        _key,
        caption,
        "url": asset->url
      }
    }`
  );
}

export default async function SolutionsPage() {
  const projects = await getProjects();

  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 sm:px-10">
          <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              Solutions
            </p>
            <h1 className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}>
              Projects delivered across homes, venues, and commercial sites.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              We design and install NATV, sound, LED, and CCTV systems tailored to each site.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-4 sm:px-10">
          {projects.length === 0 ? (
            <div className="rounded-3xl border border-white/70 bg-white/70 p-16 text-center shadow-[0_18px_40px_rgba(0,0,77,0.08)]">
              <p className="text-[#4b4b6a]">Projects coming soon.</p>
            </div>
          ) : (
            <SolutionsGallery projects={projects} />
          )}
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
          <div
            className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/70 bg-[#0f102c] p-8 text-white shadow-[0_25px_70px_rgba(0,0,77,0.28)] lg:flex-row lg:items-center animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Ready to plan</p>
              <h2 className={`${playfair.className} mt-3 text-2xl font-semibold`}>
                Let us design the next system for your site.
              </h2>
            </div>
            <Link
              className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#00004d] transition hover:bg-[#f7f3ec]"
              href="/contact"
            >
              Start a Project
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
