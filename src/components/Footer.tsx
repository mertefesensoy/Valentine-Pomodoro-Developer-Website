"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Footer() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const f = t.footer;

  return (
    <footer
      className="py-10 px-6"
      style={{
        background: isDark ? "#111" : "#2d2d2d",
        color: "#aaa",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: branding */}
        <div className="flex items-center gap-2 text-sm">
          <span style={{ color: "#e63946" }} className="animate-pulse-heart inline-block">
            ♥
          </span>
          <span>
            {f.madeWith}{" "}
            <span style={{ color: "#e63946" }}>♥</span>{" "}
            {f.for}
          </span>
          <span style={{ color: "#555" }}>·</span>
          <span style={{ color: "#555" }}>
            &copy; {new Date().getFullYear()} Valentine Pomodoro.{" "}
            {f.rights}.
          </span>
        </div>

        {/* Right: links */}
        <div className="flex items-center gap-5 text-xs">
          <Link
            href="/privacy"
            className="hover:text-white transition-colors"
            style={{ color: "#888" }}
          >
            {f.links.privacy}
          </Link>
          <a
            href="#"
            className="hover:text-white transition-colors"
            style={{ color: "#888" }}
          >
            {f.links.github}
          </a>
          <a
            href="#"
            className="hover:text-white transition-colors"
            style={{ color: "#888" }}
          >
            {f.links.appStore}
          </a>
        </div>
      </div>
    </footer>
  );
}
