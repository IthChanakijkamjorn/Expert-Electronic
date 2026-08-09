"use client";

import { createContext, useContext, useState } from "react";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") {
      return "th";
    }

    const saved = window.localStorage.getItem("lang");
    return saved === "en" || saved === "th" ? saved : "th";
  });

  function toggleLang() {
    const next = lang === "th" ? "en" : "th";
    setLang(next);
    window.localStorage.setItem("lang", next);
  }

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
