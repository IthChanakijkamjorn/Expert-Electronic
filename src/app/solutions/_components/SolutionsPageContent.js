"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import SolutionsGallery from "./SolutionsGallery";

export default function SolutionsPageContent({ projects, playfairClassName }) {
  const { lang } = useLanguage();

  return (
    <main className="relative pt-28">
      <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 sm:px-10">
        <div
          className="flex flex-col gap-3 animate-fade-up"
          style={{ animationDelay: "0ms" }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
            {t.solutions.eyebrow[lang]}
          </p>
          <h1
            className={`${playfairClassName} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
          >
            {t.solutions.heading[lang]}
          </h1>
          <p className="text-lg leading-8 text-[#3d3d5f]">
            {t.solutions.sub[lang]}
          </p>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-4 sm:px-10">
        {projects.length === 0 ? (
          <div className="rounded-3xl border border-white/70 bg-white/70 p-16 text-center shadow-[0_18px_40px_rgba(0,0,77,0.08)]">
            <p className="text-[#4b4b6a]">{t.solutions.empty[lang]}</p>
          </div>
        ) : (
          <SolutionsGallery projects={projects} />
        )}
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
        <div
          className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/70 bg-[#0f102c] p-8 text-white shadow-[0_25px_70px_rgba(0,0,77,0.28)] lg:flex-row lg:items-center animate-fade-up"
          style={{ animationDelay: "160ms" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
              {t.solutions.ctaEyebrow[lang]}
            </p>
            <h2 className={`${playfairClassName} mt-3 text-2xl font-semibold`}>
              {t.solutions.ctaHeading[lang]}
            </h2>
          </div>
          <Link
            className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#00004d] transition hover:bg-[#f7f3ec]"
            href="/contact"
          >
            {t.solutions.ctaButton[lang]}
          </Link>
        </div>
      </section>
    </main>
  );
}
