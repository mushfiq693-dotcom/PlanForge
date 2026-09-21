"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function LandingCTA() {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-[18px] border border-primary/30 bg-gradient-to-b from-surface/85 via-surface/90 to-surface/95 backdrop-blur-2xl p-10 sm:p-16 text-center shadow-2xl glow-primary">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface/80 px-4 py-1.5 text-xs sm:text-sm font-medium text-text-muted mb-8">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          <span>Ready to build your next project?</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text font-sans leading-tight mb-6">
          Turn your app idea into a reality today
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-text-muted/95 font-sans leading-relaxed mb-10">
          No signups or credit cards required. Generate your complete 13-section technical architecture in seconds and start coding with Cursor &amp; Claude Code.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/app"
            id="bottom-cta-launch-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-[8px] bg-primary px-9 py-4 text-base font-semibold text-canvas hover:bg-primary-hover active:scale-[0.99] transition-colors shadow-lg"
          >
            <span>Launch PlanForge Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
