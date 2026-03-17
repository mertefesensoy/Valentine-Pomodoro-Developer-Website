"use client";

import { useLanguage } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
  const { t } = useLanguage();
  const p = t.privacy;

  return (
    <div
      data-theme-aware
      className="min-h-screen"
      style={{
        background: "var(--color-cream)",
        color: "var(--color-text)",
      }}
    >
      <Navbar />
      <main className="max-w-3xl mx-auto px-6 py-24">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm mb-8 hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-primary)" }}
        >
          <ArrowLeft size={16} />
          Back
        </Link>

        <h1
          className="text-3xl font-bold mb-2"
          style={{ color: "var(--color-primary)" }}
        >
          {p.title}
        </h1>
        <p className="text-sm mb-8" style={{ color: "var(--color-text-muted)" }}>
          {p.lastUpdated}
        </p>

        <p className="mb-10 leading-relaxed" style={{ color: "var(--color-text)" }}>
          {p.intro}
        </p>

        <div className="space-y-8">
          {p.sections.map((section, i) => (
            <section key={i}>
              <h2
                className="text-lg font-bold mb-3"
                style={{ color: "var(--color-text)" }}
              >
                {i + 1}. {section.title}
              </h2>
              <p
                className="leading-relaxed text-sm"
                style={{ color: "var(--color-text-muted)" }}
              >
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <div
          className="mt-12 pt-8 text-sm"
          style={{
            borderTop: "1px solid var(--color-border)",
            color: "var(--color-text-muted)",
          }}
        >
          Valentine Pomodoro &mdash; Built with ♥
        </div>
      </main>
      <Footer />
    </div>
  );
}
