"use client";

import { useLanguage, type Locale } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const toggle = () => setLocale(locale === "en" ? "tr" : "en");

  return (
    <button
      onClick={toggle}
      className="text-xs font-bold px-2 py-1 rounded border transition-all hover:opacity-80"
      style={{
        borderColor: "var(--color-primary)",
        color: "var(--color-primary)",
        background: isDark ? "transparent" : "transparent",
      }}
      aria-label="Switch language"
    >
      {locale === "en" ? "TR" : "EN"}
    </button>
  );
}
