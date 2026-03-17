"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface Heart {
  id: number;
  x: number;
  size: number;
  delay: number;
  duration: number;
  sideOffset: number;
}

function FloatingHearts() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    let id = 0;
    const spawn = () => {
      setHearts((prev) => [
        ...prev.slice(-12),
        {
          id: id++,
          x: 10 + Math.random() * 80,
          size: 12 + Math.random() * 20,
          delay: 0,
          duration: 2.5 + Math.random() * 2,
          sideOffset: (Math.random() - 0.5) * 40,
        },
      ]);
    };

    spawn();
    const interval = setInterval(spawn, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="absolute select-none"
          style={{
            left: `${h.x}%`,
            bottom: "60px",
            fontSize: h.size,
            color: "var(--color-primary)",
            opacity: 0.7,
            animation: `float-up ${h.duration}s ease-out forwards`,
            "--r": `${(Math.random() - 0.5) * 30}deg`,
          } as React.CSSProperties}
        >
          ♥
        </span>
      ))}
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const h = t.hero;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
      style={{
        background: isDark
          ? "linear-gradient(160deg, #1a1a1a 0%, #2d1a1f 50%, #1a1a2e 100%)"
          : "linear-gradient(160deg, #fff8f0 0%, #ffe8ec 50%, #f0e8ff 100%)",
      }}
    >
      <FloatingHearts />

      {/* Glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "rgba(230,57,70,0.12)"
            : "rgba(230,57,70,0.08)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl pointer-events-none"
        style={{
          background: isDark
            ? "rgba(212,165,217,0.12)"
            : "rgba(212,165,217,0.1)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto gap-6">
        {/* App icon */}
        <div
          className="w-28 h-28 rounded-3xl overflow-hidden shadow-2xl animate-pulse-heart"
          style={{
            boxShadow: "0 0 0 3px var(--color-primary), 0 24px 48px rgba(230,57,70,0.3)",
          }}
        >
          <Image
            src="/icon.png"
            alt="Valentine Pomodoro icon"
            width={112}
            height={112}
            className="w-full h-full object-cover"
            priority
          />
        </div>

        {/* Title */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s", opacity: 0, animationFillMode: "forwards" }}>
          <h1 className="text-4xl md:text-5xl font-bold mb-2 gradient-text">
            {h.title}
          </h1>
          <p
            className="text-lg md:text-xl font-bold"
            style={{ color: isDark ? "#f5f5f5" : "var(--color-text)" }}
          >
            {h.tagline}
          </p>
        </div>

        {/* Subtitle */}
        <p
          className="text-sm md:text-base animate-fade-in-up"
          style={{
            color: isDark ? "#aaa" : "var(--color-text-muted)",
            animationDelay: "0.2s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {h.subtitle}
        </p>

        {/* Download button */}
        <div
          className="flex flex-col sm:flex-row gap-3 animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0, animationFillMode: "forwards" }}
        >
          <a
            href="https://apps.apple.com/tr/app/valentine-pomodoro/id6757491918?l=tr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-6 py-3 rounded-2xl font-bold text-sm transition-all hover:scale-105 hover:shadow-lg"
            style={{
              background: "var(--color-primary)",
              color: "#fff",
              boxShadow: "0 8px 24px rgba(230,57,70,0.35)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            {h.downloadIos}
          </a>
        </div>

        {/* Built for note */}
        <p
          className="text-xs animate-fade-in-up"
          style={{
            color: isDark ? "#888" : "var(--color-text-muted)",
            animationDelay: "0.45s",
            opacity: 0,
            animationFillMode: "forwards",
          }}
        >
          {h.builtFor} &nbsp;·&nbsp; {h.version}
        </p>
      </div>

      {/* Scroll indicator */}
      <a
        href="#features"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 hover:opacity-70 transition-opacity"
        style={{ color: isDark ? "#f5f5f5" : "var(--color-text)" }}
      >
        <span className="text-xs tracking-widest uppercase">scroll</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </a>
    </section>
  );
}
