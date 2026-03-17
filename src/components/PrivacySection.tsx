"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function PrivacySection() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const p = t.privacySection;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    const items = sectionRef.current?.querySelectorAll(".section-reveal");
    items?.forEach((i) => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="privacy"
      ref={sectionRef}
      className="py-24 px-6"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #1a1020 0%, #1a1a1a 100%)"
          : "linear-gradient(160deg, #ffe8ec 0%, #f0e8ff 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto text-center section-reveal">
        {/* Shield icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{
            background: isDark ? "rgba(230,57,70,0.15)" : "rgba(230,57,70,0.1)",
            border: "1px solid var(--color-primary)",
          }}
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <polyline points="9 12 11 14 15 10" />
          </svg>
        </div>

        <h2
          className="text-3xl font-bold mb-4 gradient-text"
        >
          {p.title}
        </h2>
        <p
          className="text-sm leading-relaxed mb-8 max-w-xl mx-auto"
          style={{ color: isDark ? "#aaa" : "var(--color-text-muted)" }}
        >
          {p.desc}
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {[
            "No tracking",
            "No accounts",
            "No servers",
            "100% local",
          ].map((badge) => (
            <span
              key={badge}
              className="text-xs px-4 py-1.5 rounded-full font-bold"
              style={{
                background: isDark
                  ? "rgba(230,57,70,0.12)"
                  : "rgba(230,57,70,0.08)",
                color: "var(--color-primary)",
                border: "1px solid rgba(230,57,70,0.2)",
              }}
            >
              ✓ {badge}
            </span>
          ))}
        </div>

        <Link
          href="/privacy"
          className="inline-flex items-center gap-2 text-sm font-bold px-6 py-3 rounded-full transition-all hover:opacity-80 hover:scale-105"
          style={{
            background: isDark ? "rgba(255,255,255,0.06)" : "rgba(45,45,45,0.06)",
            color: isDark ? "#f5f5f5" : "var(--color-text)",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(45,45,45,0.12)"}`,
          }}
        >
          {p.readMore}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
