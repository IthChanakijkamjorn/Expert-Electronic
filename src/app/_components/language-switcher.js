"use client";
import { useLanguage } from "@/lib/language-context";

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLanguage();

  return (
    <button
      onClick={toggleLang}
      aria-label="Switch language"
      className="flex items-center gap-0 rounded-full bg-white/15 p-0.5 text-[10px] font-bold uppercase tracking-[0.25em] backdrop-blur-sm transition hover:bg-white/25"
    >
      <span className={`rounded-full px-3 py-1.5 transition-all ${lang === "th" ? "bg-white text-[#00004d] shadow-sm" : "text-white/60 hover:text-white/90"}`}>
        TH
      </span>
      <span className={`rounded-full px-3 py-1.5 transition-all ${lang === "en" ? "bg-white text-[#00004d] shadow-sm" : "text-white/60 hover:text-white/90"}`}>
        EN
      </span>
    </button>
  );
}