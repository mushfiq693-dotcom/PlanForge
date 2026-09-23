"use client";

import React from "react";
import {
  ListChecks,
  Network,
  Palette,
  ShieldCheck,
  FileCode2,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: ListChecks,
    title: "Vertical-Slice Tasks",
    description:
      "Every task (TASK-001...) touches frontend, backend, and types in one coherent slice. Small enough for a single AI prompt with binary acceptance criteria.",
    tag: "Phase-by-Phase",
  },
  {
    icon: Network,
    title: "ASCII System Flows",
    description:
      "Crystal clear ASCII diagrams mapping user interactions, API gateways, database schemas, and external services for zero architectural ambiguity.",
    tag: "Visual Flow",
  },
  {
    icon: Palette,
    title: "Concrete Design Tokens",
    description:
      "Exact hex codes (#0E1116, #3FB6A8), typography scales, spacing units, and responsive breakpoints. No generic placeholders.",
    tag: "Design System",
  },
  {
    icon: ShieldCheck,
    title: "AI Agent Rulebook",
    description:
      "Pre-coding rules forbidding regressions, enforcing strict typing, error handling, rate limiting, and exact git commit conventions.",
    tag: "Guardrails",
  },
  {
    icon: FileCode2,
    title: "Turnkey Kickoff Prompts",
    description:
      "Copy-paste ready prompt templates tailored for Antigravity and Claude Code. Start building TASK-001 within 30 seconds of generating.",
    tag: "Zero Setup",
  },
  {
    icon: Zap,
    title: "Live Token Streaming",
    description:
      "Real-time token streaming powered by modern LLMs. Watch your 13-section technical architecture assemble line-by-line before your eyes.",
    tag: "Ultra Fast",
  },
];

export function LandingFeatures() {
  return (
    <section id="features" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-medium text-primary mb-3">
            Architectural Guarantees
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text font-sans leading-tight">
            Engineered specifically for how AI coding agents work
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-muted/90 font-sans leading-relaxed">
            Standard AI prompts cause chaotic builds. PlanForge generates deterministic plans that agents like Antigravity and Claude Code execute with zero ambiguity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="flex flex-col rounded-[12px] border border-white/10 bg-surface/80 p-7 transition-colors"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-[8px] bg-primary/10 border border-primary/20 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium font-sans px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/10 text-text-muted">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-text font-sans mb-2">
                  {feature.title}
                </h3>

                <p className="text-sm text-text-muted/90 leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
