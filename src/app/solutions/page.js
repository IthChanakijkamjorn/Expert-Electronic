import Link from "next/link";
import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";

const caseStudies = [
  {
    title: "Hotel AV & NATV Refresh",
    sector: "Hospitality",
    summary:
      "Replaced aging NATV distribution, added zoned audio, and cleaned up rack wiring.",
    results: [
      "Multi-zone control",
      "Clean rack build",
      "Guest TV upgrade",
    ],
  },
  {
    title: "Commercial CCTV Rollout",
    sector: "Retail",
    summary:
      "Designed camera coverage and NVR storage across multiple sites.",
    results: [
      "Full perimeter coverage",
      "Remote viewing",
      "48-hour recording archive",
    ],
  },
  {
    title: "LED Signage Install",
    sector: "Events Venue",
    summary:
      "Installed an indoor LED wall with control room integration and training.",
    results: [
      "Bright, uniform panels",
      "Fast changeovers",
      "Operator training",
    ],
  },
];

const deliverySteps = [
  {
    title: "Survey & Scope",
    detail: "We visit the site, map cable runs, and define coverage.",
  },
  {
    title: "Design & Approval",
    detail: "We deliver drawings, equipment lists, and install timelines.",
  },
  {
    title: "Install & Handover",
    detail: "We install, test, label, and train your team.",
  },
];

export default function SolutionsPage() {
  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 pb-12 pt-10 sm:px-10">
          <div
            className="flex flex-col gap-3 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              Solutions
            </p>
            <h1
              className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
            >
              Projects delivered across homes, venues, and commercial sites.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              We design and install NATV, sound, LED, and CCTV systems tailored
              to each site and its operational needs.
            </p>
          </div>
          <div
            className="mt-8 flex flex-wrap items-center gap-6 text-sm text-[#52526f] animate-fade-up"
            style={{ animationDelay: "120ms" }}
          >
            <div>
              <p className="text-2xl font-semibold text-[#00004d]">
                Survey-first
              </p>
              <p>Every project starts onsite</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#00004d]">Design-led</p>
              <p>Clear drawings before install</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-[#00004d]">
                Install-ready
              </p>
              <p>Testing and handover included</p>
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {caseStudies.map((study, index) => (
              <div
                key={study.title}
                className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {study.sector}
                </p>
                <h2 className="mt-4 text-xl font-semibold text-[#15152e]">
                  {study.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                  {study.summary}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-[#4b4b6a]">
                  {study.results.map((result) => (
                    <li key={result}>{result}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
          <div className="grid gap-6 md:grid-cols-3">
            {deliverySteps.map((step, index) => (
              <div
                key={step.title}
                className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {step.title}
                </p>
                <p className="mt-4 text-sm leading-6 text-[#4b4b6a]">
                  {step.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-24 sm:px-10">
          <div
            className="flex flex-col items-start justify-between gap-6 rounded-[32px] border border-white/70 bg-[#0f102c] p-8 text-white shadow-[0_25px_70px_rgba(0,0,77,0.28)] lg:flex-row lg:items-center animate-fade-up"
            style={{ animationDelay: "160ms" }}
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                Ready to plan
              </p>
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
