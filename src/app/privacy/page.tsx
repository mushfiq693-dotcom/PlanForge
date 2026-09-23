import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlanForgeLogo } from "@/components/PlanForgeLogo";

export const metadata = {
  title: "Privacy Policy | PlanForge",
  description: "Privacy Policy explaining data handling for PlanForge blueprint generator.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-canvas text-text font-sans antialiased selection:bg-primary/20 selection:text-primary">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-canvas/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <PlanForgeLogo markSize={28} showBadge={false} />
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs text-text-muted hover:text-text transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded text-[11px] font-mono font-medium text-primary bg-primary/10 border border-primary/20 mb-3">
              DATA & PRIVACY
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text">Privacy Policy</h1>
            <p className="mt-2 text-xs text-text-muted font-mono">Last updated: September 2026</p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-text-muted">
            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">1. Overview</h2>
              <p>
                PlanForge values your privacy. We are committed to minimizing data collection and ensuring that your proprietary project ideas and technical concepts remain confidential.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">2. Data We Process</h2>
              <p>
                When you generate an implementation plan, your submitted project description and configuration options (stack preferences, experience level) are transmitted securely to our server-side generation endpoints to query the LLM provider (e.g. OpenRouter).
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>We do not sell your personal data or submitted prompts to third parties.</li>
                <li>Your API keys configured in local environment variables are strictly server-side and are never exposed to the client.</li>
                <li>Generated blueprints and plan histories are kept in client-side memory during your active session.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">3. Third-Party AI Providers</h2>
              <p>
                Plan generation relies on third-party language model inference APIs (such as OpenRouter). Data sent in generation requests is governed by the respective provider&apos;s privacy policies and data retention agreements.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">4. Cookies and Local Storage</h2>
              <p>
                PlanForge does not use intrusive tracking cookies or cross-site behavioral trackers. Minimal local storage or session state may be used solely for user interface preferences and session continuity.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">5. Contact Us</h2>
              <p>
                For any privacy questions or requests regarding data handling, please contact us via our project repository.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
