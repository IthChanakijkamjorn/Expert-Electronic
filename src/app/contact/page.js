"use client";

import { useState, useEffect, useRef } from "react";
import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";

function Toast({ type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div
        className={`mx-4 w-full max-w-md rounded-3xl p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] animate-fade-up ${
          isSuccess ? "bg-[#0f102c] text-white" : "bg-red-600 text-white"
        }`}
      >
        <div className="flex flex-col items-center gap-5 text-center">
          <div
            className={`flex h-16 w-16 items-center justify-center rounded-full ${
              isSuccess ? "bg-white/15" : "bg-white/20"
            }`}
          >
            {isSuccess ? (
              <svg className="h-8 w-8 text-green-400" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : (
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </div>
          <div>
            <p className="text-xl font-semibold">
              {isSuccess ? "Message sent!" : "Something went wrong"}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {isSuccess
                ? "Thank you for reaching out. We will get back to you soon."
                : "Please try again or contact us directly by phone."}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

// Load reCAPTCHA v3 script
function useRecaptcha() {
  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || document.getElementById("recaptcha-script")) return;
    const script = document.createElement("script");
    script.id = "recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);
}

export default function ContactPage() {
  const [status, setStatus] = useState("idle");
  const lastSubmitRef = useRef(0);
  useRecaptcha();

  function handleClose() {
    setStatus("idle");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitRef.current < 60000) {
      alert("Please wait a moment before sending another message.");
      return;
    }
    lastSubmitRef.current = now;

    setStatus("loading");

    try {
      const token = await new Promise((resolve, reject) => {
        window.grecaptcha.ready(async () => {
          try {
            const t = await window.grecaptcha.execute(
              process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
              { action: "contact_form" }
            );
            resolve(t);
          } catch (err) {
            reject(err);
          }
        });
      });

      const formData = new FormData(e.target);
      const data = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        company: formData.get("company"),
        topic: formData.get("topic"),
        message: formData.get("message"),
        recaptchaToken: token,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        e.target.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <SiteShell>
      <SiteHeader />

      {(status === "success" || status === "error") && (
        <Toast type={status} onClose={handleClose} />
      )}

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
              Get in touch with us
            </h1>
            <p className="text-lg leading-8 text-[#3d3d5f]">
              Whether you have a general question, want to purchase a product, or need a full system design — we are here to help.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* Direct line card */}
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <h2 className={`${playfair.className} text-2xl font-semibold text-[#121233]`}>
                Direct line
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                We design and install MATV, sound systems, LED displays, and CCTV. Share the basics and we will match you with the right specialist.
              </p>
              <div className="mt-6 space-y-4 text-sm text-[#2f2f4b]">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">Email</p>
                  <p className="font-semibold">admin@expertelectronic.co.th</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">Phone</p>
                  <p className="font-semibold">02 729 4225-6</p>
                </div>
              </div>
              <div className="mt-8 text-sm text-[#4b4b6a]">
                <p className="font-semibold text-[#00004d]">Office hours</p>
                <p className="mt-2">Monday – Friday: 08:30 – 17:30</p>
                <p className="mt-1">Closed on Saturday &amp; Sunday</p>
              </div>
              <div className="mt-6 text-sm text-[#4b4b6a]">
                <p className="font-semibold text-[#00004d]">Helpful details</p>
                <ul className="mt-2 space-y-2">
                  <li>Site address and size</li>
                  <li>Systems needed (MATV, sound, LED, CCTV)</li>
                  <li>Preferred survey and installation window</li>
                </ul>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/70 bg-white/80 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Full name
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="fullName"
                    placeholder="Your name"
                    required
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Email
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="email"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Company
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="company"
                    placeholder="Company or site"
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  Topic
                  <select
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="topic"
                  >
                    <option>General Inquiry</option>
                    <option>Product Purchase</option>
                    <option>Project Planning</option>
                  </select>
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70 sm:col-span-2">
                  Message
                  <textarea
                    className="mt-2 w-full resize-none rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="message"
                    placeholder="Tell us how we can help you."
                    required
                    rows={6}
                  />
                </label>
              </div>

              <button
                className="mt-6 w-full rounded-full bg-[#00004d] px-6 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-white transition hover:bg-[#000066] disabled:opacity-50"
                type="submit"
                disabled={status === "loading"}
              >
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {/* reCAPTCHA badge notice (required by Google) */}
              <p className="mt-4 text-center text-[10px] text-[#00004d]/40">
                Protected by reCAPTCHA &mdash;{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">Privacy</a>{" "}&amp;{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">Terms</a>
              </p>
            </form>
          </div>
        </section>

        {/* Full-width map strip above footer */}
        <div className="w-full animate-fade-up" style={{ animationDelay: "300ms" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.8!2d100.66879092173525!3d13.773431235696176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d617e3d712dc1%3A0x6ba8fa786858ff4b!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4reC5h-C4geC4i-C5jOC5gOC4nuC4tOC4o-C5jOC4lyDguK3guLTguYDguKXguYfguITguYLguJfguKPguJnguLTguIQg4LmB4Lit4LiZ4LiU4LmMIOC4hOC4reC4oeC4oeC4ueC4meC4tOC5gOC4hOC4iuC4seC5iOC4mSDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1785571092173!5m2!1sth!2sth"
            width="100%"
            height="560"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title="Expert Electronic & Communication location"
          />
        </div>
      </main>
    </SiteShell>
  );
}
