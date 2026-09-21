import React from "react";
import { Loader2 } from "lucide-react";

export function LoadingState() {
  return (
    <div className="flex flex-1 flex-col justify-start rounded-[6px] border border-border bg-canvas p-6 font-mono">
      {/* Header Loading Status */}
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-2.5 text-primary text-xs font-semibold">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span>INITIALIZING GENERATION PIPELINE...</span>
        </div>
        <span className="text-[11px] text-text-muted">
          Connecting to OpenRouter SSE Stream
        </span>
      </div>

      {/* Blueprint Skeleton Wireframe */}
      <div className="flex flex-col gap-5 animate-pulse">
        {/* Title skeleton */}
        <div className="flex items-center gap-3">
          <div className="h-5 w-16 bg-primary/20 rounded-[4px]" />
          <div className="h-6 w-3/5 bg-surface rounded-[4px]" />
        </div>

        <div className="h-px w-full bg-border-subtle" />

        {/* Section 0 snapshot */}
        <div className="space-y-2">
          <div className="h-4 w-44 bg-surface rounded-[4px]" />
          <div className="h-3 w-full bg-surface/60 rounded-[4px]" />
          <div className="h-3 w-4/5 bg-surface/60 rounded-[4px]" />
        </div>

        {/* Section 1 PRD */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-52 bg-surface rounded-[4px]" />
          <div className="h-3 w-11/12 bg-surface/60 rounded-[4px]" />
          <div className="h-3 w-3/4 bg-surface/60 rounded-[4px]" />
        </div>

        {/* Section 2 Architecture block */}
        <div className="rounded-[6px] border border-border/80 bg-surface/40 p-4 space-y-2">
          <div className="h-3.5 w-36 bg-primary/20 rounded-[4px]" />
          <div className="h-2.5 w-full bg-surface/70 rounded-[4px]" />
          <div className="h-2.5 w-5/6 bg-surface/70 rounded-[4px]" />
          <div className="h-2.5 w-2/3 bg-surface/70 rounded-[4px]" />
        </div>

        {/* Section 6 Tasks Checklist Wireframe */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-60 bg-surface rounded-[4px]" />
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 bg-surface rounded-[2px]" />
            <div className="h-3 w-4/5 bg-surface/60 rounded-[4px]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 bg-surface rounded-[2px]" />
            <div className="h-3 w-3/4 bg-surface/60 rounded-[4px]" />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3.5 w-3.5 bg-surface rounded-[2px]" />
            <div className="h-3 w-2/3 bg-surface/60 rounded-[4px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
