"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

/* ── Color tokens matching src/theme/tokens.ts ─────────────────────────── */
const light = {
  bg: "#FFF8F0",
  card: "#FFFFFF",
  text: "#2D2D2D",
  textMuted: "#6B6B6B",
  accent: "#E63946",
  accentLight: "#FFB3BA",
  accentPurple: "#D4A5D9",
  border: "#E0E0E0",
  surfaceTint: "#FFE8EC",
};
const dark = {
  bg: "#1A1A1A",
  card: "#2D2D2D",
  text: "#F5F5F5",
  textMuted: "#A0A0A0",
  accent: "#FF6B7A",
  accentLight: "#FF9AA2",
  accentPurple: "#C197D2",
  border: "#404040",
  surfaceTint: "#2A2A2A",
};

/* ── Timer Screen ───────────────────────────────────────────────────────── */
function TimerScreen({ isDark }: { isDark: boolean }) {
  const c = isDark ? dark : light;
  const [seconds, setSeconds] = useState(1487);

  useEffect(() => {
    const t = setInterval(
      () => setSeconds((s) => (s > 0 ? s - 1 : 1500)),
      1000
    );
    return () => clearInterval(t);
  }, []);

  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  const progress = 1 - seconds / 1500;
  const SIZE = 180;
  const cx = SIZE / 2;
  const r = cx - 10;
  const circ = 2 * Math.PI * r;

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center gap-3"
      style={{ background: c.bg, paddingTop: 28 }}
    >
      {/* Header */}
      <span style={{ color: c.text, fontSize: 10, fontWeight: 600 }}>
        Valentine Pomodoro 💗
      </span>

      {/* Status chip */}
      <span
        style={{
          background: c.surfaceTint,
          color: c.accent,
          fontSize: 8,
          fontWeight: 600,
          padding: "3px 12px",
          borderRadius: 999,
        }}
      >
        Focus
      </span>

      {/* Circular progress */}
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={c.surfaceTint}
          strokeWidth={10}
        />
        <circle
          cx={cx}
          cy={cx}
          r={r}
          fill="none"
          stroke={c.accent}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
          transform={`rotate(-90 ${cx} ${cx})`}
        />
        <text
          x={cx}
          y={cx - 4}
          textAnchor="middle"
          fill={c.text}
          fontSize="28"
          fontWeight="700"
          fontFamily="monospace"
        >
          {m}:{s}
        </text>
        <text
          x={cx}
          y={cx + 14}
          textAnchor="middle"
          fill={c.textMuted}
          fontSize="9"
          fontFamily="monospace"
        >
          remaining
        </text>
      </svg>

      {/* Cycle text */}
      <span style={{ color: c.textMuted, fontSize: 8 }}>Session 1 of 4</span>

      {/* Primary button */}
      <div
        style={{
          background: c.accent,
          color: "#fff",
          fontSize: 12,
          fontWeight: 600,
          padding: "8px 32px",
          borderRadius: 999,
          boxShadow: `0 4px 12px ${c.accent}55`,
        }}
      >
        Start
      </div>

      {/* Secondary buttons */}
      <div style={{ display: "flex", gap: 8 }}>
        {["Skip", "Reset"].map((label) => (
          <div
            key={label}
            style={{
              border: `2px solid ${c.accentPurple}`,
              color: c.accentPurple,
              fontSize: 9,
              fontWeight: 500,
              padding: "5px 12px",
              borderRadius: 999,
            }}
          >
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Stats Screen ───────────────────────────────────────────────────────── */
function StatsScreen({ isDark }: { isDark: boolean }) {
  const c = isDark ? dark : light;
  const [metric, setMetric] = useState<"minutes" | "sessions">("minutes");

  const bars = [
    { day: "Mon", sessions: 3, minutes: 75 },
    { day: "Tue", sessions: 5, minutes: 125 },
    { day: "Wed", sessions: 2, minutes: 50 },
    { day: "Thu", sessions: 6, minutes: 150 },
    { day: "Fri", sessions: 4, minutes: 100 },
    { day: "Sat", sessions: 7, minutes: 175 },
    { day: "Sun", sessions: 5, minutes: 125 },
  ];

  const maxVal =
    metric === "minutes"
      ? Math.max(...bars.map((b) => b.minutes))
      : Math.max(...bars.map((b) => b.sessions));

  const cards = [
    { label: "Today Sessions", value: "5" },
    { label: "Today Minutes", value: "125" },
    { label: "All-Time Sessions", value: "248" },
    { label: "All-Time Minutes", value: "6200" },
    { label: "Daily Goal (min)", value: "100", hint: "Left today: 0" },
    { label: "Love Streak", value: "12", hint: "Best: 14" },
  ];

  return (
    <div
      className="w-full h-full overflow-hidden"
      style={{
        background: c.bg,
        padding: "28px 10px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <span style={{ color: c.text, fontSize: 11, fontWeight: 600 }}>
        Stats
      </span>

      {/* Summary cards 2×3 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 4,
        }}
      >
        {cards.map((card) => (
          <div
            key={card.label}
            style={{
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 8,
              padding: "4px 6px",
              textAlign: "center",
            }}
          >
            <div style={{ color: c.accent, fontSize: 11, fontWeight: 700 }}>
              {card.value}
            </div>
            <div style={{ color: c.textMuted, fontSize: 5.5, marginTop: 1 }}>
              {card.label}
            </div>
            {card.hint && (
              <div style={{ color: c.textMuted, fontSize: 5 }}>{card.hint}</div>
            )}
          </div>
        ))}
      </div>

      {/* Chart container */}
      <div
        style={{
          background: c.card,
          border: `1px solid ${c.border}`,
          borderRadius: 8,
          padding: "6px",
          flex: 1,
        }}
      >
        {/* Chart header with toggle */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <span style={{ color: c.text, fontSize: 6.5, fontWeight: 600 }}>
            Last 7 Days ({metric === "minutes" ? "Minutes" : "Sessions"})
          </span>
          <div
            style={{
              display: "flex",
              background: c.surfaceTint,
              borderRadius: 999,
              padding: 1,
              gap: 1,
            }}
          >
            {(["minutes", "sessions"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMetric(m)}
                style={{
                  background: metric === m ? c.accent : "transparent",
                  color: metric === m ? "#fff" : c.textMuted,
                  fontSize: 5,
                  fontWeight: 600,
                  padding: "2px 5px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                {m === "minutes" ? "Min" : "Ses"}
              </button>
            ))}
          </div>
        </div>

        {/* Bar chart */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            height: 44,
            gap: 2,
          }}
        >
          {bars.map((bar, i) => {
            const val = metric === "minutes" ? bar.minutes : bar.sessions;
            const h = (val / maxVal) * 40;
            const isToday = i === bars.length - 1;
            return (
              <div
                key={bar.day}
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: `${h}px`,
                    background: isToday ? c.accent : c.accentPurple,
                    borderRadius: "2px 2px 0 0",
                    opacity: isToday ? 1 : 0.7,
                    minHeight: 3,
                  }}
                />
                <span style={{ color: c.textMuted, fontSize: 4.5 }}>
                  {bar.day.slice(0, 2)}
                </span>
              </div>
            );
          })}
        </div>
        {/* Goal dashed line label */}
        <div style={{ color: c.textMuted, fontSize: 5, marginTop: 2, textAlign: "right" }}>
          goal: 100 min
        </div>
      </div>
    </div>
  );
}

/* ── Love Notes Screen ──────────────────────────────────────────────────── */
const NOTES = [
  "Bengisu, tiny focus — big love 💗",
  "I'm proud of you — truly.",
  "One pomodoro closer to your dreams",
  "Breathe in… you've got this",
  "Focus now, hugs later 🫶",
  "Your effort is the cutest thing",
  "Gentle focus, strong heart 💗",
];

function LoveNotesScreen({ isDark }: { isDark: boolean }) {
  const c = isDark ? dark : light;

  return (
    <div
      style={{
        background: c.bg,
        width: "100%",
        height: "100%",
        padding: "28px 10px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ color: c.text, fontSize: 11, fontWeight: 600 }}>
          Love Notes 💌 (20)
        </span>
        <span
          style={{
            background: c.accent,
            color: "#fff",
            fontSize: 8,
            fontWeight: 600,
            padding: "3px 8px",
            borderRadius: 8,
          }}
        >
          Add
        </span>
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", gap: 6 }}>
        {["Randomize preview", "Reset defaults"].map((btn) => (
          <span
            key={btn}
            style={{
              border: `2px solid ${c.accentPurple}`,
              color: c.accentPurple,
              fontSize: 6,
              fontWeight: 500,
              padding: "3px 6px",
              borderRadius: 8,
            }}
          >
            {btn}
          </span>
        ))}
      </div>

      {/* Preview card */}
      <div
        style={{
          background: c.card,
          border: `2px solid ${c.surfaceTint}`,
          borderRadius: 10,
          padding: "5px 8px",
        }}
      >
        <span style={{ color: c.text, fontSize: 7 }}>
          &ldquo;Bengisu, tiny focus — big love 💗&rdquo;
        </span>
      </div>

      {/* Notes list */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, overflow: "hidden" }}>
        {NOTES.map((note, i) => (
          <div
            key={i}
            style={{
              background: c.card,
              border: `1px solid ${c.border}`,
              borderRadius: 10,
              padding: "5px 8px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                color: c.text,
                fontSize: 6.5,
                flex: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {note}
            </span>
            <div style={{ display: "flex", gap: 4, flexShrink: 0, marginLeft: 4 }}>
              <span style={{ color: c.accentPurple, fontSize: 6 }}>Edit</span>
              <span style={{ color: c.accent, fontSize: 6 }}>Delete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Settings Screen ────────────────────────────────────────────────────── */
function SettingsScreen({ isDark }: { isDark: boolean }) {
  const c = isDark ? dark : light;
  const [activeTheme, setActiveTheme] = useState<"system" | "light" | "dark">(
    "system"
  );

  const durations = [
    { label: "Focus", value: "25" },
    { label: "Short Break", value: "5" },
    { label: "Long Break", value: "15" },
    { label: "Long break every N", value: "4" },
  ];

  const toggles = [
    { label: "Notifications", on: true },
    { label: "Sound", on: true },
    { label: "Haptics", on: true },
    { label: "Show Love Notes", on: true },
    { label: "Background Animations", on: true },
  ];

  return (
    <div
      style={{
        background: c.bg,
        width: "100%",
        height: "100%",
        padding: "28px 10px 10px",
        display: "flex",
        flexDirection: "column",
        gap: 6,
        overflow: "hidden",
      }}
    >
      <span style={{ color: c.text, fontSize: 11, fontWeight: 600 }}>
        Settings ⚙️
      </span>

      {/* Timer Durations */}
      <div>
        <span style={{ color: c.text, fontSize: 7, fontWeight: 600 }}>
          Timer Durations (minutes)
        </span>
        <div
          style={{
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            marginTop: 3,
          }}
        >
          {durations.map((d, i) => (
            <div
              key={d.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 8px",
                borderBottom:
                  i < durations.length - 1 ? `1px solid ${c.border}` : "none",
              }}
            >
              <span style={{ color: c.text, fontSize: 6.5 }}>{d.label}</span>
              <span
                style={{
                  border: `1px solid ${c.accentPurple}`,
                  color: c.text,
                  fontSize: 7,
                  fontWeight: 600,
                  padding: "1px 6px",
                  borderRadius: 4,
                  minWidth: 20,
                  textAlign: "center",
                }}
              >
                {d.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Appearance */}
      <div>
        <span style={{ color: c.text, fontSize: 7, fontWeight: 600 }}>
          Appearance
        </span>
        <div style={{ display: "flex", gap: 4, marginTop: 3 }}>
          {(["system", "light", "dark"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setActiveTheme(mode)}
              style={{
                flex: 1,
                background: activeTheme === mode ? c.accent : "transparent",
                color: activeTheme === mode ? "#fff" : c.text,
                border: `2px solid ${c.border}`,
                borderRadius: 6,
                fontSize: 6,
                fontWeight: 600,
                padding: "3px 0",
                cursor: "pointer",
              }}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Preferences toggles */}
      <div>
        <span style={{ color: c.text, fontSize: 7, fontWeight: 600 }}>
          Preferences
        </span>
        <div
          style={{
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 8,
            marginTop: 3,
          }}
        >
          {toggles.map((t, i) => (
            <div
              key={t.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "4px 8px",
                borderBottom:
                  i < toggles.length - 1 ? `1px solid ${c.border}` : "none",
              }}
            >
              <span style={{ color: c.text, fontSize: 6.5 }}>{t.label}</span>
              {/* iOS-style toggle */}
              <div
                style={{
                  width: 22,
                  height: 13,
                  borderRadius: 7,
                  background: t.on ? c.accent : (isDark ? "#444" : "#ddd"),
                  position: "relative",
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 2,
                    left: t.on ? 11 : 2,
                    width: 9,
                    height: 9,
                    borderRadius: "50%",
                    background: "#fff",
                    transition: "left 0.2s",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 4, marginTop: "auto" }}>
        <div
          style={{
            flex: 1,
            background: c.accentPurple,
            color: "#fff",
            fontSize: 6.5,
            fontWeight: 600,
            padding: "5px",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          Check Updates
        </div>
        <div
          style={{
            flex: 1,
            background: c.accent,
            color: "#fff",
            fontSize: 6.5,
            fontWeight: 600,
            padding: "5px",
            borderRadius: 8,
            textAlign: "center",
          }}
        >
          Reset Defaults
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ───────────────────────────────────────────────────────── */
const SCREENS = [TimerScreen, StatsScreen, LoveNotesScreen, SettingsScreen];

export default function Screenshots() {
  const { t } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const s = t.screenshots;
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
      id="screenshots"
      ref={sectionRef}
      className="py-24 px-6"
      style={{
        background: isDark
          ? "linear-gradient(180deg, #1a1a1a 0%, #1a1020 100%)"
          : "linear-gradient(180deg, #fff8f0 0%, #ffe8ec 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 section-reveal">
          <h2 className="text-3xl font-bold mb-3 gradient-text">{s.title}</h2>
          <p
            className="text-sm"
            style={{ color: isDark ? "#aaa" : "var(--color-text-muted)" }}
          >
            {s.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {SCREENS.map((Screen, i) => (
            <div
              key={i}
              className="flex flex-col items-center gap-3 section-reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              {/* Phone frame */}
              <div className="phone-frame">
                <div className="phone-notch" />
                <div className="phone-screen">
                  <Screen isDark={isDark} />
                </div>
              </div>
              <span
                className="text-xs font-bold"
                style={{ color: isDark ? "#aaa" : "var(--color-text-muted)" }}
              >
                {s.screens[i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
