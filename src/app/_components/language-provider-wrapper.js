"use client";

import { LanguageProvider } from "@/lib/language-context";

export default function LanguageProviderWrapper({ children }) {
  return <LanguageProvider>{children}</LanguageProvider>;
}
