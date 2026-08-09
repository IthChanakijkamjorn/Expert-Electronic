"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import { playfair } from "./_components/brand-fonts";
import SiteHeader from "./_components/site-header";
import SiteShell from "./_components/site-shell";

export default function Home() {
  const { lang } = useLanguage();

  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-10 sm:px-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <p
              className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              {t.home.heroEyebrow[lang]}
            </p>
            <h1
              className={`${playfair.className} mt-4 whitespace-pre-line text-4xl font-semibold leading-tight text-[#0c0c2a] sm:text-5xl lg:text-6xl animate-fade-up`}
              style={{ animationDelay: "80ms" }}
            >
              {t.home.heroHeading[lang]}
            </h1>
            <p
              className="mt-5 max-w-xl text-lg leading-8 text-[#3d3d5f] animate-fade-up"
              style={{ animationDelay: "160ms" }}
            >
              {t.home.heroSub[lang]}
            </p>
            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up"
              style={{ animationDelay: "240ms" }}
            >
              <Link
                className="rounded-full bg-[#00004d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
                href="/contact"
              >
                {t.home.ctaSiteVisit[lang]}
              </Link>
              <Link
                className="rounded-full border border-[#00004d]/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#00004d] transition hover:border-[#00004d]/50"
                href="/products"
              >
                {t.home.ctaViewProducts[lang]}
              </Link>
            </div>
            <div
              className="mt-10 flex flex-wrap items-center gap-8 text-sm text-[#52526f] animate-fade-up"
              style={{ animationDelay: "320ms" }}
            >
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">{t.home.stat1Label[lang]}</p>
                <p>{t.home.stat1Sub[lang]}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">{t.home.stat2Label[lang]}</p>
                <p>{t.home.stat2Sub[lang]}</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">{t.home.stat3Label[lang]}</p>
                <p>{t.home.stat3Sub[lang]}</p>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div
              className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_25px_70px_rgba(0,0,77,0.18)] backdrop-blur animate-fade-up"
              style={{ animationDelay: "210ms" }}
            >
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[#ffb347]/40 blur-2xl" />
              <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full bg-[#0c5f8c]/25 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {t.home.cardEyebrow[lang]}
                </p>
                <h2 className={`${playfair.className} mt-3 text-2xl font-semibold text-[#121233]`}>
                  {t.home.cardHeading[lang]}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                  {t.home.cardSub[lang]}
                </p>

                <div className="mt-6 space-y-3">
                  <a
                    href="tel:0272942256"
                    className="flex items-center gap-3 rounded-2xl border border-[#00004d]/10 bg-[#f5f5ff] px-4 py-3 text-sm text-[#00004d] transition hover:bg-[#eeeeff]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00004d]/10 text-base">📞</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#00004d]/50">{t.home.phoneLabel[lang]}</p>
                      <p className="font-semibold">02 729 4225-6</p>
                    </div>
                  </a>
                  <a
                    href="mailto:admin@expertelectronic.co.th"
                    className="flex items-center gap-3 rounded-2xl border border-[#00004d]/10 bg-white px-4 py-3 text-sm text-[#00004d] transition hover:bg-[#f5f5ff]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00004d]/10 text-base">✉️</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#00004d]/50">{t.home.emailLabel[lang]}</p>
                      <p className="font-semibold">admin@expertelectronic.co.th</p>
                    </div>
                  </a>
                </div>

                <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#00004d]/10 bg-[#0f102c] px-4 py-3 text-white">
                  <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">{t.home.officeHours[lang]}</p>
                  <p className="mt-0.5 text-sm font-semibold">{t.home.officeTime[lang]}</p>
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/80">{t.home.locationBadge[lang]}</span>
                </div>

                <Link
                  href="/contact"
                  className="mt-5 block rounded-full bg-[#00004d] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
                >
                  {t.home.sendMessage[lang]}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
          <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              {t.home.whyEyebrow[lang]}
            </p>
            <h2 className={`${playfair.className} text-3xl font-semibold text-[#121233]`}>
              {t.home.whyHeading[lang]}
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">{t.home.card1Eyebrow[lang]}</p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">{t.home.card1Heading[lang]}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                {t.home.card1Body[lang]}
              </p>
            </div>
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">{t.home.card2Eyebrow[lang]}</p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">{t.home.card2Heading[lang]}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                {t.home.card2Body[lang]}
              </p>
            </div>
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">{t.home.card3Eyebrow[lang]}</p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">{t.home.card3Heading[lang]}</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                {t.home.card3Body[lang]}
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
          <div
            className="rounded-[36px] border border-white/70 bg-[#0f102c] p-8 text-white shadow-[0_25px_70px_rgba(0,0,77,0.3)] sm:p-12 animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">{t.home.ctaEyebrow[lang]}</p>
                <h2 className={`${playfair.className} mt-4 text-3xl font-semibold`}>
                  {t.home.ctaHeading[lang]}
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
                  {t.home.ctaBody[lang]}
                </p>
              </div>
              <Link
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#00004d] transition hover:bg-[#f7f3ec]"
                href="/contact"
              >
                {t.home.ctaButton[lang]}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
