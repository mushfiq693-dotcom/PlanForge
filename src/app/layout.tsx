import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-main",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlanForge — Idea-to-Implementation-Plan Generator",
  description:
    "Convert raw app ideas into ONE complete, execution-ready IMPLEMENTATION_PLAN.md that AI coding agents (Antigravity, Claude Code) can execute immediately.",
  keywords: [
    "PlanForge",
    "AI coding agent",
    "implementation plan generator",
    "Antigravity",
    "Claude Code",
    "software architecture",
    "PRD generator",
    "vibe coding",
  ],
  authors: [{ name: "PlanForge Team" }],
  creator: "PlanForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://planforge.dev",
    siteName: "PlanForge",
    title: "PlanForge — Idea-to-Implementation-Plan Generator",
    description:
      "Convert raw app ideas into a single, execution-ready IMPLEMENTATION_PLAN.md for AI coding agents.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PlanForge — Idea-to-Implementation-Plan Generator",
    description:
      "Convert raw app ideas into a single, execution-ready IMPLEMENTATION_PLAN.md for AI coding agents.",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0E1116",
};

import { BackgroundVideo } from "@/components/BackgroundVideo";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className={`${inter.className} min-h-full flex flex-col bg-canvas text-text selection:bg-primary/20 selection:text-primary relative`}>
        <BackgroundVideo />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
