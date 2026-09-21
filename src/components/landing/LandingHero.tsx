"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export function LandingHero() {
  return (
    <section className="relative pt-36 pb-24 sm:pt-48 sm:pb-36 overflow-hidden flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        {/* Bespoke Human-Crafted Hero Badge */}
        <Link
          href="/app"
          className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-4 py-2 text-xs sm:text-sm text-text-muted transition-all duration-200 mb-10 shadow-sm backdrop-blur-xl group cursor-pointer"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-text font-medium">Architecture Engine</span>
          <span className="text-white/20">&bull;</span>
          <span className="text-text-muted group-hover:text-text transition-colors">
            Tailored for Antigravity &amp; Claude Code
          </span>
          <ArrowRight className="h-3.5 w-3.5 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all ml-0.5" />
        </Link>

        {/* Cinematic 2-Line Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-text font-sans leading-[1.2] sm:leading-[1.15] mb-8 drop-shadow-md text-center max-w-4xl mx-auto">
          <span className="block">From Raw Idea to</span>
          <span className="block mt-1 sm:mt-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#65e8d6] to-primary">
              Execution-Ready
            </span>{" "}
            Blueprint
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-base sm:text-xl text-text-muted/95 font-sans leading-relaxed sm:leading-8 mb-12">
          Stop vibe-coding with chaotic prompts. PlanForge synthesizes your concept into a single, bulletproof IMPLEMENTATION_PLAN.md equipped with vertical slices, ASCII architecture, and turnkey prompts.
        </p>

        {/* Architecture Engine Styled CTA Button */}
        <div className="flex items-center justify-center w-full sm:w-auto">
          <Link
            href="/app"
            id="hero-start-building-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 px-8 py-3.5 text-sm sm:text-base font-medium text-text transition-all duration-200 shadow-sm backdrop-blur-xl group cursor-pointer active:scale-[0.99]"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-text group-hover:text-primary transition-colors">
              Start Building — It&apos;s Free
            </span>
            <ArrowRight className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
