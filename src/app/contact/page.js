import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";

export default function ContactPage() {
  return (
    <SiteShell>
      <SiteHeader />
      <main className="relative pt-28">
        <section className="mx-auto w-full max-w-6xl px-6 pb-16 pt-10 sm:px-10">
          <div
            className="flex flex-col gap-3 animate-fade-up"
            style={{ animationDelay: "0ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#00004d]/70">
              Contact Us
            </p>
            <h1
              className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
            >
              Plan your installation with us.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-[#3d3d5f]">
              Tell us about your site, timeline, and the systems you need. We
              will schedule a survey and outline the design and installation
              plan.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <h2
                className={`${playfair.className} text-2xl font-semibold text-[#121233]`}
              >
                Direct line
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We design and install NATV, sound systems, LED displays, and
                CCTV. Share the basics and we will match you with the right
                specialist.
              </p>
              <div className="mt-6 space-y-4 text-sm text-[#2f2f4b]">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">
                    Email
                  </p>
                  <p className="font-semibold">hello@expertelectronic.com</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">
                    Phone
                  </p>
                  <p className="font-semibold">+44 (0) 1603 555 880</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">
                    Location
                  </p>
                  <p className="font-semibold">
                    Norwich Research Park, Norfolk, UK
                  </p>
                </div>
              </div>
              <div className="mt-8 rounded-2xl border border-[#00004d]/10 bg-white p-4 text-sm text-[#4b4b6a]">
                <p className="font-semibold text-[#00004d]">Response window</p>
                <p className="mt-2">Weekdays 08:00 - 19:00 GMT</p>
                <p className="mt-1">Emergency callouts available</p>
              </div>
              <div className="mt-6 text-sm text-[#4b4b6a]">
                <p className="font-semibold text-[#00004d]">Helpful details</p>
                <ul className="mt-2 space-y-2">
                  <li>Site address and size</li>
                  <li>Systems needed (NATV, sound, LED, CCTV)</li>
                  <li>Preferred survey and installation window</li>
                </ul>
              </div>
            </div>

            <form
              className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "200ms" }}
              action="mailto:hello@expertelectronic.com"
              method="post"
              encType="text/plain"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Full name
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50 focus:ring-2 focus:ring-[#00004d]/15"
                    name="fullName"
                    placeholder="Your name"
                    required
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Email
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50 focus:ring-2 focus:ring-[#00004d]/15"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Company
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50 focus:ring-2 focus:ring-[#00004d]/15"
                    name="company"
                    placeholder="Company or site"
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Topic
                  <select
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50 focus:ring-2 focus:ring-[#00004d]/15"
                    name="topic"
                  >
                    <option>NATV</option>
                    <option>Sound system</option>
                    <option>LED display</option>
                    <option>CCTV</option>
                    <option>Multiple systems</option>
                  </select>
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70 sm:col-span-2">
                  Project summary
                  <textarea
                    className="mt-2 w-full resize-none rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50 focus:ring-2 focus:ring-[#00004d]/15"
                    name="message"
                    placeholder="Tell us about your site, rooms, and system requirements."
                    required
                    rows={6}
                  />
                </label>
              </div>
              <button
                className="mt-6 w-full rounded-full bg-[#00004d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066]"
                type="submit"
              >
                Send Message
              </button>
              <p className="mt-3 text-xs text-[#6b6b8f]">
                This form opens your email client with the details filled in.
              </p>
            </form>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
