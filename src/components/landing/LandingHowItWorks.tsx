"use client";

import React from "react";
import { MessageSquareCode, FileCode2, TerminalSquare } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: MessageSquareCode,
    title: "Describe Your App Idea",
    description:
      "Paste your raw concept into the prompt box. Add target users or project names if you want, or just write your core vision in plain words.",
  },
  {
    step: "02",
    icon: FileCode2,
    title: "Synthesize the 13-Section Plan",
    description:
      "PlanForge's planner engine generates a complete IMPLEMENTATION_PLAN.md with ASCII diagrams, design tokens, vertical tasks, and ADRs.",
  },
  {
    step: "03",
    icon: TerminalSquare,
    title: "Build with AI Coding Agents",
    description:
      "Copy the context-loading prompt into Antigravity, Claude Code, or Copilot. Execute TASK-001 immediately with zero hallucination.",
  },
];

export function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs font-medium text-primary mb-3">
            Execution Lifecycle
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text font-sans leading-tight">
            How It Works in 3 Steps
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-muted/90 font-sans leading-relaxed">
            From an unstructured napkin note to a production-grade codebase architecture in under a minute.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col rounded-[12px] border border-white/10 bg-surface/80 p-7"
              >
                {/* Step Number */}
                <div className="text-3xl font-extrabold font-sans text-primary/30 mb-4">
                  {item.step}
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-primary/10 border border-primary/20 text-primary mb-5">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-lg font-semibold text-text font-sans mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-text-muted/90 font-sans leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
