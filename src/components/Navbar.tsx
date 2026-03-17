"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: t.nav.features, href: "#features" },
    { label: t.nav.screenshots, href: "#screenshots" },
    { label: t.nav.tech, href: "#tech" },
    { label: t.nav.privacy, href: "#privacy" },
  ];

  const isDark = theme === "dark";

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? isDark
            ? "rgba(26,26,26,0.92)"
            : "rgba(255,248,240,0.92)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="text-xl animate-pulse-heart inline-block"
            style={{ color: "var(--color-primary)" }}
          >
            ♥
          </span>
          <span
            className="font-bold text-sm tracking-wide"
            style={{ color: isDark ? "#f5f5f5" : "var(--color-text)" }}
          >
            Valentine Pomodoro
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:opacity-70 transition-opacity"
              style={{ color: isDark ? "#ccc" : "var(--color-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://apps.apple.com/tr/app/valentine-pomodoro/id6757491918?l=tr" target="_blank" rel="noopener noreferrer"
            className="text-sm px-4 py-1.5 rounded-full font-bold transition-opacity hover:opacity-80"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
            }}
          >
            {t.nav.download}
          </a>
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:opacity-70 transition-opacity"
            aria-label="Toggle theme"
            style={{ color: isDark ? "#ccc" : "var(--color-text-muted)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageSwitcher />
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-full hover:opacity-70 transition-opacity"
            style={{ color: isDark ? "#ccc" : "var(--color-text-muted)" }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            style={{ color: isDark ? "#f5f5f5" : "var(--color-text)" }}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{
            background: isDark ? "rgba(26,26,26,0.97)" : "rgba(255,248,240,0.97)",
            borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}`,
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm py-1 hover:opacity-70 transition-opacity"
              style={{ color: isDark ? "#ccc" : "var(--color-text-muted)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://apps.apple.com/tr/app/valentine-pomodoro/id6757491918?l=tr" target="_blank" rel="noopener noreferrer"
            className="text-sm px-4 py-2 rounded-full font-bold text-center transition-opacity hover:opacity-80"
            style={{ background: "var(--color-primary)", color: "#fff" }}
            onClick={() => setMenuOpen(false)}
          >
            {t.nav.download}
          </a>
        </div>
      )}
    </nav>
  );
}
