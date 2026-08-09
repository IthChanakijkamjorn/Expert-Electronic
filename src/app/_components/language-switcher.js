"use client";

import { useLanguage } from "@/lib/language-context";
import { t } from "@/lib/translations";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      className="rounded-full border border-white/30 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.35em] text-white/80 transition hover:bg-white/10 hover:text-white"
      aria-label={t.nav.switchLanguage[lang]}
    >
      {lang === "th" ? "EN" : "TH"}
    </button>
  );
}
