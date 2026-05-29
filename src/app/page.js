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
            <p
              className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70 animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              Design & Installation Studio
            </p>
            <h1
              className={`${playfair.className} mt-5 text-4xl font-semibold leading-tight text-[#0c0c2a] sm:text-5xl lg:text-6xl animate-fade-up`}
              style={{ animationDelay: "90ms" }}
            >
              Plan, design, and install NATV, sound, LED, and CCTV systems.
            </h1>
            <p
              className="mt-5 max-w-xl text-lg leading-8 text-[#3d3d5f] animate-fade-up"
              style={{ animationDelay: "170ms" }}
            >
              We deliver end-to-end projects: survey, design, cabling,
              installation, testing, and handover. From homes to venues and
              commercial sites, we build systems that are clean, reliable, and
              easy to maintain.
            </p>
            <div
              className="mt-8 flex flex-col gap-3 sm:flex-row animate-fade-up"
              style={{ animationDelay: "250ms" }}
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
              style={{ animationDelay: "330ms" }}
            >
              <div>
                <p className="text-2xl font-semibold text-[#00004d]">
                  End-to-end
                </p>
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

          <div className="flex-1">
            <div
              className="relative overflow-hidden rounded-[32px] border border-white/60 bg-white/80 p-8 shadow-[0_25px_70px_rgba(0,0,77,0.18)] backdrop-blur animate-fade-up"
              style={{ animationDelay: "210ms" }}
            >
              <div className="absolute right-8 top-8 h-24 w-24 rounded-full bg-[#ffb347]/40 blur-2xl" />
              <div className="absolute bottom-6 left-6 h-28 w-28 rounded-full bg-[#0c5f8c]/25 blur-2xl" />
              <div className="relative">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Project Status
                </p>
                <h2
                  className={`${playfair.className} mt-4 text-3xl font-semibold text-[#121233]`}
                >
                  Installation Snapshot
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="rounded-2xl border border-[#00004d]/10 bg-[#f5f5ff] p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#00004d]">
                        Site Survey
                      </span>
                      <span className="text-[#1f1f3d]">86%</span>
                    </div>
                    <div className="mt-3 h-2 w-full rounded-full bg-white">
                      <div className="h-2 w-[86%] rounded-full bg-[#00004d]" />
                    </div>
                  </div>
                  <div className="rounded-2xl border border-[#00004d]/10 bg-white p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-[#00004d]">
                        Cabling Plan
                      </span>
                      <span className="text-[#1f1f3d]">Ready</span>
                    </div>
                    <div className="mt-3 flex items-center gap-3 text-xs text-[#6b6b8f]">
                      <span className="rounded-full bg-[#e6ecff] px-3 py-1">
                        Rack layout
                      </span>
                      <span className="rounded-full bg-[#fff2d9] px-3 py-1">
                        Cable routes
                      </span>
                      <span className="rounded-full bg-[#e9f4f7] px-3 py-1">
                        Power plan
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#00004d]/10 bg-[#0f102c] px-4 py-3 text-white">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      Go-live Window
                    </p>
                    <p className="text-lg font-semibold">Week 02</p>
                  </div>
                  <span className="rounded-full bg-white/20 px-3 py-1 text-xs">
                    Scheduled
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
          <div className="flex flex-col gap-3 animate-fade-up" style={{ animationDelay: "0ms" }}>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              Why Expert Electronic
            </p>
            <h2
              className={`${playfair.className} text-3xl font-semibold text-[#121233]`}
            >
              Designed for real-world installs.
            </h2>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                Planning
              </p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">
                Site surveys and clear system drawings.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We document every run and connection so installation is tidy and
                future upgrades are easy.
              </p>
            </div>
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                Installation
              </p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">
                Clean cabling, tested endpoints, labeled racks.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We keep systems reliable with proper testing, commissioning, and
                handover walkthroughs.
              </p>
            </div>
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "280ms" }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                Support
              </p>
              <h3 className="mt-4 text-xl font-semibold text-[#15152e]">
                Maintenance plans and fast callouts.
              </h3>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We stay involved after go-live with upgrades, servicing, and
                rapid troubleshooting.
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
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Ready to build
                </p>
                <h2 className={`${playfair.className} mt-4 text-3xl font-semibold`}>
                  Let us plan your next installation.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-6 text-white/70">
                  Share your requirements and we will create a full design and
                  installation plan with commissioning and support.
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
