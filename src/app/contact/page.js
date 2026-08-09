"use client";

import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";
import SiteHeader from "../_components/site-header";
import SiteShell from "../_components/site-shell";
import { playfair } from "../_components/brand-fonts";

function Toast({ type, onClose }) {
  const { lang } = useLanguage();

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
              {isSuccess
                ? t.contact.toastSuccessTitle[lang]
                : t.contact.toastErrorTitle[lang]}
            </p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              {isSuccess
                ? t.contact.toastSuccessSub[lang]
                : t.contact.toastErrorSub[lang]}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-white/30 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/10"
          >
            {t.contact.toastClose[lang]}
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
  const { lang } = useLanguage();
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
      alert(t.contact.rateLimitMsg[lang]);
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
              {t.contact.eyebrow[lang]}
            </p>
            <h1
              className={`${playfair.className} text-4xl font-semibold text-[#0c0c2a] sm:text-5xl`}
            >
              {t.contact.heading[lang]}
            </h1>
            <p className="text-lg leading-8 text-[#3d3d5f]">
              {t.contact.sub[lang]}
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.05fr_1fr]">
            {/* Direct line card */}
            <div
              className="rounded-3xl border border-white/70 bg-white/70 p-6 shadow-[0_18px_40px_rgba(0,0,77,0.12)] animate-fade-up"
              style={{ animationDelay: "120ms" }}
            >
              <h2 className={`${playfair.className} text-2xl font-semibold text-[#121233]`}>
                {t.contact.directLine[lang]}
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#4b4b6a]">
                {t.contact.directSub[lang]}
              </p>
              <div className="mt-6 space-y-4 text-sm text-[#2f2f4b]">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">{t.contact.emailLabel[lang]}</p>
                  <p className="font-semibold">admin@expertelectronic.co.th</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[#00004d]/60">{t.contact.phoneLabel[lang]}</p>
                  <p className="font-semibold">02 729 4225-6</p>
                </div>
              </div>
              <div className="mt-8 text-sm text-[#4b4b6a]">
                <p className="font-semibold text-[#00004d]">{t.contact.officeHours[lang]}</p>
                <p className="mt-2">{t.contact.officeTime[lang]}</p>
                <p className="mt-1">{t.contact.closed[lang]}</p>
              </div>
              <div className="mt-6 text-sm text-[#4b4b6a]">
                <p className="font-semibold text-[#00004d]">{t.contact.helpfulDetails[lang]}</p>
                <ul className="mt-2 space-y-2">
                  <li>{t.contact.detail1[lang]}</li>
                  <li>{t.contact.detail2[lang]}</li>
                  <li>{t.contact.detail3[lang]}</li>
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
                  {t.contact.formName[lang]}
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="fullName"
                    placeholder={t.contact.formNamePlaceholder[lang]}
                    required
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {t.contact.formEmail[lang]}
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="email"
                    placeholder={t.contact.emailPlaceholder[lang]}
                    required
                    type="email"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {t.contact.formCompany[lang]}
                  <input
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="company"
                    placeholder={t.contact.formCompanyPlaceholder[lang]}
                    type="text"
                  />
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70">
                  {t.contact.formTopic[lang]}
                  <select
                    className="mt-2 w-full rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="topic"
                  >
                    <option>{t.contact.topicGeneral[lang]}</option>
                    <option>{t.contact.topicPurchase[lang]}</option>
                    <option>{t.contact.topicProject[lang]}</option>
                  </select>
                </label>
                <label className="text-xs font-semibold uppercase tracking-[0.35em] text-[#00004d]/70 sm:col-span-2">
                  {t.contact.formMessage[lang]}
                  <textarea
                    className="mt-2 w-full resize-none rounded-2xl border border-[#00004d]/15 bg-white px-4 py-3 text-sm text-[#15152e] shadow-sm outline-none transition focus:border-[#00004d]/50"
                    name="message"
                    placeholder={t.contact.formMessagePlaceholder[lang]}
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
                {status === "loading"
                  ? t.contact.sending[lang]
                  : t.contact.sendButton[lang]}
              </button>

              <p className="mt-4 text-center text-[10px] text-[#00004d]/40">
                {t.contact.recaptchaProtected[lang]} &mdash;{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" className="underline">{t.contact.privacy[lang]}</a>{" "}&amp;{" "}
                <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer" className="underline">{t.contact.terms[lang]}</a>
              </p>
            </form>
          </div>
        </section>

        <div className="w-full animate-fade-up" style={{ animationDelay: "300ms" }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3873.8!2d100.66879092173525!3d13.773431235696176!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x311d617e3d712dc1%3A0x6ba8fa786858ff4b!2z4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4reC5h-C4geC4i-C5jOC5gOC4nuC4tOC4o-C5jOC4lyDguK3guLTguYDguKXguYfguITguYLguJfguKPguJnguLTguIQg4LmB4Lit4LiZ4LiU4LmMIOC4hOC4reC4oeC4oeC4ueC4meC4tOC5gOC4hOC4iuC4seC5iOC4mSDguIjguLPguIHguLHguJQ!5e0!3m2!1sth!2sth!4v1785571092173!5m2!1sth!2sth"
            width="100%"
            height="560"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            title={t.contact.mapTitle[lang]}
          />
        </div>
      </main>
    </SiteShell>
  );
}
