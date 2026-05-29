import Link from "next/link";
import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";

const productCategories = [
  {
    title: "NATV & Distribution",
    summary: "Headends, splitters, and signal management for clean TV delivery.",
    items: [
      "Headend amplifiers",
      "Multiswitches",
      "Distribution splitters",
      "Signal analyzers",
    ],
  },
  {
    title: "Sound Systems",
    summary: "Background music and event audio tuned to the room.",
    items: [
      "Ceiling and wall speakers",
      "Amplifiers and mixers",
      "DSP controllers",
      "Paging microphones",
    ],
  },
  {
    title: "LED & Display",
    summary: "Indoor and outdoor LED screens with control and mounting.",
    items: [
      "LED video panels",
      "Controller processors",
      "Mounting structures",
      "Content players",
    ],
  },
  {
    title: "CCTV & Security",
    summary: "IP surveillance with recording, monitoring, and access control.",
    items: [
      "IP cameras",
      "NVR recorders",
      "PoE switches",
      "Access control readers",
    ],
  },
];

const featuredBundles = [
  {
    title: "Venue AV Package",
    detail: "NATV distribution, zoned audio, and control built for venues.",
    includes: [
      "NATV headend + distribution",
      "Zoned audio with paging",
      "Control rack and labeling",
    ],
  },
  {
    title: "Security & Monitoring Suite",
    detail: "CCTV coverage with recording and remote access for managers.",
    includes: [
      "IP cameras + NVR storage",
      "Remote viewing setup",
      "Network switches and cabling",
    ],
  },
];

export default function ProductsPage() {
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
              Products
            </p>
            <h1
              className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
            >
              Equipment we specify and install.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              We supply gear as part of full design and installation projects,
              not as a standalone shop. These are the categories we typically
              source and install.
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-12 sm:px-10">
          <div className="grid gap-6 md:grid-cols-2">
            {productCategories.map((category, index) => (
              <div
                key={category.title}
                className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
                style={{ animationDelay: `${index * 90}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {category.title}
                </p>
                <h2 className="mt-4 text-2xl font-semibold text-[#15152e]">
                  {category.summary}
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-[#4b4b6a]">
                  {category.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 pb-16 sm:px-10">
          <div className="grid gap-6 lg:grid-cols-2">
            {featuredBundles.map((bundle, index) => (
              <div
                key={bundle.title}
                className="rounded-[32px] border border-white/70 bg-[#0f102c] p-6 text-white shadow-[0_25px_70px_rgba(0,0,77,0.28)] animate-fade-up"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70">
                  Featured Bundle
                </p>
                <h2 className={`${playfair.className} mt-4 text-2xl font-semibold`}>
                  {bundle.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-white/70">
                  {bundle.detail}
                </p>
                <ul className="mt-4 space-y-2 text-sm text-white/80">
                  {bundle.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

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
