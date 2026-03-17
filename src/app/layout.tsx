import type { Metadata } from "next";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valentine Pomodoro — A timer built with love",
  description:
    "A beautifully crafted Pomodoro timer built with love. Features focus sessions, break reminders, love notes, stats tracking, and a Valentine-themed UI.",
  keywords: [
    "pomodoro",
    "timer",
    "productivity",
    "valentine",
    "focus",
    "iOS app",
  ],
  openGraph: {
    title: "Valentine Pomodoro",
    description: "A Pomodoro timer built with love",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceMono.variable} font-mono`}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
