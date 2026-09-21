import React from "react";
import { Terminal, FileCode2, ArrowLeft } from "lucide-react";

export function EmptyState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center rounded-[6px] border border-dashed border-border bg-canvas/40 p-8 text-center min-h-[380px]">
      <div className="flex h-12 w-12 items-center justify-center rounded-[8px] border border-border bg-surface text-primary mb-4 shadow-inner">
        <FileCode2 className="h-6 w-6" />
      </div>

      <h3 className="text-sm font-semibold font-mono text-text mb-1">
        Ready for Specification
      </h3>
      <p className="max-w-md text-xs text-text-muted mb-6 leading-relaxed">
        Paste a raw app idea on the left or select an example starter. PlanForge will synthesize a complete, 13-section <code className="text-primary font-mono bg-surface px-1 py-0.5 rounded border border-border-subtle">IMPLEMENTATION_PLAN.md</code> ready for Cursor or Claude Code.
      </p>

      <div className="flex items-center gap-2 text-xs font-mono text-text-muted/80 bg-surface/70 border border-border rounded-[6px] px-3.5 py-2">
        <ArrowLeft className="h-3.5 w-3.5 text-primary animate-pulse" />
        <span>Enter idea and click <strong className="text-text font-semibold">Generate plan</strong></span>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-lg text-left">
        <div className="rounded-[6px] border border-border/80 bg-surface/50 p-2.5 text-xs font-mono">
          <div className="text-primary font-medium flex items-center gap-1 mb-1">
            <Terminal className="h-3 w-3" />
            1. Raw Idea
          </div>
          <p className="text-[11px] text-text-muted leading-tight">
            Describe features, goals & users in plain English.
          </p>
        </div>

        <div className="rounded-[6px] border border-border/80 bg-surface/50 p-2.5 text-xs font-mono">
          <div className="text-primary font-medium flex items-center gap-1 mb-1">
            <Terminal className="h-3 w-3" />
            2. Master Spec
          </div>
          <p className="text-[11px] text-text-muted leading-tight">
            Merged server-side into 13 structured sections.
          </p>
        </div>

        <div className="rounded-[6px] border border-border/80 bg-surface/50 p-2.5 text-xs font-mono">
          <div className="text-primary font-medium flex items-center gap-1 mb-1">
            <Terminal className="h-3 w-3" />
            3. AI Agent Ready
          </div>
          <p className="text-[11px] text-text-muted leading-tight">
            Turnkey tasks and kickoff prompts for immediate coding.
          </p>
        </div>
      </div>
    </div>
  );
}
