import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PlanForge — Idea-to-Implementation-Plan Generator",
  description:
    "Convert raw app ideas into ONE complete, execution-ready IMPLEMENTATION_PLAN.md that AI coding agents (Cursor, Claude Code) can execute immediately.",
  keywords: [
    "PlanForge",
    "AI coding agent",
    "implementation plan generator",
    "Cursor AI",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${ibmPlexMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-text font-sans selection:bg-primary/20 selection:text-primary">
        {children}
      </body>
    </html>
  );
}
