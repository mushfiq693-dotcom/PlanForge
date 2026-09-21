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
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-xs font-semibold text-primary uppercase tracking-wider font-sans mb-4">
            Why PlanForge?
          </h2>
          <p className="text-3xl sm:text-5xl font-bold tracking-tight text-text font-sans leading-tight">
            Engineered specifically for how AI coding agents work
          </p>
          <p className="mt-6 text-base sm:text-lg text-text-muted/90 font-sans leading-relaxed">
            Standard AI prompts cause chaotic builds. PlanForge generates deterministic plans that agents like Antigravity and Claude Code can execute seamlessly.
          </p>
        </div>

        {/* Features 6-Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="group relative flex flex-col rounded-[14px] border border-white/10 bg-surface/60 backdrop-blur-xl p-8 sm:p-9 shadow-xl transition-all duration-300 hover:border-primary/50 hover:bg-surface/80 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-primary/10 border border-primary/20 text-primary transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium font-sans px-3 py-1 rounded-full bg-surface/90 border border-white/10 text-text-muted">
                    {feature.tag}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-text font-sans mb-3 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>

                <p className="text-sm sm:text-base text-text-muted/90 leading-relaxed font-sans">
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
