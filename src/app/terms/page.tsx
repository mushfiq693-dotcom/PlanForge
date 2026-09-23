import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PlanForgeLogo } from "@/components/PlanForgeLogo";

export const metadata = {
  title: "Terms of Service | PlanForge",
  description: "Terms of Service and usage agreement for the PlanForge implementation blueprint generator.",
};

export default function TermsPage() {
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
              LEGAL AGREEMENT
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-text">Terms of Service</h1>
            <p className="mt-2 text-xs text-text-muted font-mono">Last updated: September 2026</p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-text-muted">
            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">1. Agreement to Terms</h2>
              <p>
                By accessing or using PlanForge, you agree to be bound by these Terms of Service. If you do not agree to all terms, do not use or access our service.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">2. Description of Service</h2>
              <p>
                PlanForge is a software planning and architectural blueprint generator. The service transforms user-provided app concepts into structured, phase-by-phase implementation plans optimized for AI coding agents such as Cursor and Claude Code.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">3. Intellectual Property and Generated Plans</h2>
              <p>
                You retain full ownership of any original product ideas, prompts, and concepts you submit to PlanForge. You also retain all rights and permissions to use, modify, distribute, or execute the generated implementation plans and blueprints in any commercial or personal software project.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">4. Acceptable Use</h2>
              <p>
                You agree not to use PlanForge to generate software blueprints intended for malicious activities, malware development, unauthorized access, or violations of applicable laws and regulations.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">5. Disclaimer of Warranties</h2>
              <p>
                PlanForge is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis without warranties of any kind. While blueprints follow strict architectural and anti-slop guidelines, software planning involves inherent trade-offs, and you are responsible for testing and auditing any code produced from generated plans.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-base font-semibold text-text">6. Contact and Inquiries</h2>
              <p>
                If you have questions regarding these Terms, please open an issue or reach out via our repository channels.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
