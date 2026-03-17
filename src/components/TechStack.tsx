"use client";

import { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

const STACK = [
  { name: "React Native", color: "#61DAFB", bg: "rgba(97,218,251,0.1)" },
  { name: "Expo SDK 54", color: "#000020", bg: "rgba(255,255,255,0.1)", darkColor: "#fff" },
  { name: "TypeScript", color: "#3178C6", bg: "rgba(49,120,198,0.1)" },
  { name: "AsyncStorage", color: "#E63946", bg: "rgba(230,57,70,0.1)" },
  { name: "expo-notifications", color: "#D4A5D9", bg: "rgba(212,165,217,0.1)" },
  { name: "expo-haptics", color: "#D4A5D9", bg: "rgba(212,165,217,0.1)" },
  { name: "React Navigation", color: "#6B7FD7", bg: "rgba(107,127,215,0.1)" },
  { name: "Google AdMob", color: "#4285F4", bg: "rgba(66,133,244,0.1)" },
];

const TIMER_CODE = `// Drift-free timer engine
const remaining = Math.max(
  0,
  state.endAt - Date.now()
);

// Survives backgrounding &
// OS setInterval throttling`;

export default function TechStack() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const tech = t.tech;
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    const items = sectionRef.current?.querySelectorAll(".section-reveal");
    items?.forEach((i) => observer.observe(i));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="py-24 px-6"
      style={{
        background: isDark ? "var(--color-dark-bg)" : "var(--color-cream)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 section-reveal">
          <h2 className="text-3xl font-bold mb-3 gradient-text">{tech.title}</h2>
          <p
            className="text-sm"
            style={{ color: isDark ? "#aaa" : "var(--color-text-muted)" }}
          >
            {tech.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Left: stack + version */}
          <div className="section-reveal flex flex-col gap-6">
            {/* Version badge */}
            <div
              className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full text-xs font-bold"
              style={{
                background: isDark ? "rgba(230,57,70,0.15)" : "var(--color-surface)",
                color: "var(--color-primary)",
                border: "1px solid var(--color-primary)",
              }}
            >
              <span>♥</span>
              <span>
                {tech.version} 1.2.4 &nbsp;·&nbsp; {tech.openSource}
              </span>
            </div>

            {/* Stack label */}
            <div>
              <h3
                className="text-xs font-bold mb-3 uppercase tracking-widest"
                style={{ color: isDark ? "#888" : "var(--color-text-muted)" }}
              >
                {tech.stack}
              </h3>
              <div className="flex flex-wrap gap-2">
                {STACK.map((item) => (
                  <span
                    key={item.name}
                    className="text-xs px-3 py-1.5 rounded-full font-bold"
                    style={{
                      background: isDark
                        ? item.bg
                        : item.bg.replace("0.1", "0.15"),
                      color: isDark
                        ? item.darkColor ?? item.color
                        : item.color === "#000020"
                        ? "#2d2d2d"
                        : item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.name}
                  </span>
                ))}
              </div>
            </div>

            {/* GitHub link */}
            <a
              href="https://github.com/mertefesensoy/valentine-pomodoro"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold hover:opacity-70 transition-opacity self-start"
              style={{ color: "var(--color-primary)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              {tech.github}
            </a>
          </div>

          {/* Right: architecture decisions */}
          <div className="section-reveal flex flex-col gap-4" style={{ transitionDelay: "0.1s" }}>
            <h3
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: isDark ? "#888" : "var(--color-text-muted)" }}
            >
              {tech.decisions}
            </h3>

            {/* Code snippet */}
            <div
              className="rounded-2xl p-4 text-xs overflow-x-auto"
              style={{
                background: isDark ? "#0d0d0d" : "#1a1a1a",
                border: `1px solid ${isDark ? "#2d2d2d" : "#333"}`,
              }}
            >
              <pre style={{ color: "#e5e5e5", lineHeight: 1.7 }}>
                <span style={{ color: "#888" }}>{"// Drift-free timer engine\n"}</span>
                <span style={{ color: "#79c0ff" }}>{"const "}</span>
                <span style={{ color: "#e5e5e5" }}>{"remaining = Math.max(\n"}</span>
                <span style={{ color: "#79c0ff" }}>{"  0,\n"}</span>
                <span style={{ color: "#e5e5e5" }}>{"  state.endAt - "}</span>
                <span style={{ color: "#d2a8ff" }}>{"Date"}</span>
                <span style={{ color: "#e5e5e5" }}>{".now()\n);\n\n"}</span>
                <span style={{ color: "#888" }}>{"// Survives backgrounding &\n"}</span>
                <span style={{ color: "#888" }}>{"// OS setInterval throttling"}</span>
              </pre>
            </div>

            {/* Decision list */}
            <ul className="flex flex-col gap-3">
              {tech.decisionItems.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-xs"
                  style={{ color: isDark ? "#ccc" : "var(--color-text)" }}
                >
                  <span
                    className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs mt-0.5"
                    style={{
                      background: isDark ? "rgba(230,57,70,0.2)" : "var(--color-surface)",
                      color: "var(--color-primary)",
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
