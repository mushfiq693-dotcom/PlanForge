import React from "react";
import { Sparkles, Layers, CheckCircle2 } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-[8px] border border-border/60 bg-canvas/30 p-8 text-center min-h-[420px] transition-all">
      <div className="relative mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-surface shadow-md">
        <Sparkles className="h-6 w-6 text-primary" />
        <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-canvas">
          <Layers className="h-3 w-3" />
        </div>
      </div>

      <h3 className="text-base font-semibold text-text mb-2 font-sans tracking-tight">
        Your blueprint will generate here
      </h3>

      <p className="max-w-md text-xs text-text-muted leading-relaxed mb-6 font-sans">
        Enter your app idea on the left. PlanForge will produce an execution-ready, 13-section <span className="font-mono text-primary font-medium">IMPLEMENTATION_PLAN.md</span> formatted for Cursor & Claude Code.
      </p>

      {/* Clean, minimal feature highlights */}
      <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-text-muted font-mono">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          Vertical slice tasks
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          Turnkey kickoff prompts
        </span>
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          Architecture & ADRs
        </span>
      </div>
    </div>
  );
}
