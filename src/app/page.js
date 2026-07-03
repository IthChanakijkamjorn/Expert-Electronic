import Link from "next/link";
import { playfair } from "./_components/brand-fonts";
import SiteHeader from "./_components/site-header";
import SiteShell from "./_components/site-shell";

export default function Home() {
  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 pb-16 pt-10 sm:px-10 lg:flex-row lg:items-center">
          <div className="flex-1">
            <h1
              className={`${playfair.className} text-4xl font-semibold leading-tight text-[#0c0c2a] sm:text-5xl lg:text-6xl animate-fade-up`}
              style={{ animationDelay: "0ms" }}
            >
              Plan, design, and install MATV, sound, LED, and CCTV systems.
            </h1>
            <p
              className="mt-5 max-w-xl text-lg leading-8 text-[#3d3d5f] animate-fade-up"
              style={{ animationDelay: "100ms" }}
            >
              We deliver end-to-end projects: survey, design, cabling,
              installation, testing, and handover. From homes to venues and
              commercial sites, we build systems that are clean, reliable, and
              easy to maintain.
            </p>
            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up"
              style={{ animationDelay: "180ms" }}
            >
              <Link
                className="rounded-full bg-[#00004d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
                href="/contact"
              >
                Request a Site Visit
              </Link>
              <Link
                className="rounded-full border border-[#00004d]/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#00004d] transition hover:border-[#00004d]/50"
                href="/products"
              >
                View Products
              </Link>
            </div>
            <div
              className="mt-10 flex flex-wrap items-center gap-8 text-sm text-[#52526f] animate-fade-up"
              style={{ animationDelay: "260ms" }}
            >
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">End-to-end</p>
                <p>Design to handover</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">Onsite</p>
                <p>Install and testing</p>
              </div>
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">Ongoing</p>
                <p>Support and maintenance</p>
              </div>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="flex-1">
            <div
              className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_25px_70px_rgba(0,0,77,0.18)] backdrop-blur animate-fade-up"
              style={{ animationDelay: "210ms" }}
            >
              {/* Decorative blurs */}
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[#ffb347]/40 blur-2xl" />
              <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full bg-[#0c5f8c]/25 blur-2xl" />

              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Get in touch
                </p>
                <h2 className={`${playfair.className} mt-3 text-2xl font-semibold text-[#121233]`}>
                  Ready to start a project?
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                  Tell us about your site and what systems you need. We will schedule a survey and put together a plan.
                </p>

                {/* Contact details */}
                <div className="mt-6 space-y-3">
                  <a
                    href="tel:0272942256"
                    className="flex items-center gap-3 rounded-2xl border border-[#00004d]/10 bg-[#f5f5ff] px-4 py-3 text-sm text-[#00004d] transition hover:bg-[#eeeeff]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00004d]/10 text-base">📞</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#00004d]/50">Phone</p>
                      <p className="font-semibold">02 729 4225-6</p>
                    </div>
                  </a>
                  <a
                    href="mailto:admin@expertelectronic.co.th"
                    className="flex items-center gap-3 rounded-2xl border border-[#00004d]/10 bg-white px-4 py-3 text-sm text-[#00004d] transition hover:bg-[#f5f5ff]"
                  >
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00004d]/10 text-base">✉️</span>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-[#00004d]/50">Email</p>
                      <p className="font-semibold">admin@expertelectronic.co.th</p>
                    </div>
                  </a>
                </div>

                {/* Office hours */}
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#00004d]/10 bg-[#0f102c] px-4 py-3 text-white">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">Office hours</p>
                    <p className="mt-0.5 text-sm font-semibold">Mon – Fri: 08:30 – 17:30</p>
                  </div>
                  <span className="rounded-full bg-white/15 px-3 py-1 text-xs text-white/80">Bangkok, TH</span>
                </div>

                <Link
                  href="/contact"
                  className="mt-5 block rounded-full bg-[#00004d] px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
                >
                  Send us a message
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
          <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              Why Expert Electronic
            </p>
            <h2 className={`${playfair.className} text-3xl font-semibold text-[#121233]`}>
              Designed for real-world installs.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">Planning</p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">Site surveys and clear system drawings.</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We document every run and connection so installation is tidy and future upgrades are easy.
              </p>
            </div>
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">Installation</p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">Clean cabling, tested endpoints, labeled racks.</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We keep systems reliable with proper testing, commissioning, and handover walkthroughs.
              </p>
            </div>
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">Support</p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">Maintenance plans and fast callouts.</h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We stay involved after go-live with upgrades, servicing, and rapid troubleshooting.
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
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">Ready to build</p>
                <h2 className={`${playfair.className} mt-4 text-3xl font-semibold`}>
                  Let us plan your next installation.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
                  Share your requirements and we will create a full design and installation plan with commissioning and support.
                </p>
              </div>
              <Link
                className="rounded-full bg-white px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#00004d] transition hover:bg-[#f7f3ec]"
                href="/contact"
              >
                Start a Project
              </Link>
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
