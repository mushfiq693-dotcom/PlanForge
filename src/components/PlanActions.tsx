"use client";

import React, { useState } from "react";
import { Copy, Check, Download, RefreshCw, Code, Eye, Square } from "lucide-react";
import { copyToClipboard, downloadMarkdownFile, sanitizeFilename } from "@/lib/download";

interface PlanActionsProps {
  plan: string;
  projectName?: string;
  viewMode: "preview" | "raw";
  onViewModeChange: (mode: "preview" | "raw") => void;
  onRegenerate: () => void;
  onStop?: () => void;
  isGenerating?: boolean;
}

export function PlanActions({
  plan,
  projectName,
  viewMode,
  onViewModeChange,
  onRegenerate,
  onStop,
  isGenerating = false,
}: PlanActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!plan) return;
    const success = await copyToClipboard(plan);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!plan) return;
    const filename = sanitizeFilename(projectName);
    downloadMarkdownFile(plan, filename);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3 mb-4">
      {/* Left side: View Mode Toggle */}
      <div className="flex items-center rounded-[6px] border border-border bg-canvas p-0.5">
        <button
          type="button"
          onClick={() => onViewModeChange("preview")}
          className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-mono transition-all cursor-pointer ${
            viewMode === "preview"
              ? "bg-surface text-primary font-medium shadow-sm"
              : "text-text-muted hover:text-text"
          }`}
        >
          <Eye className="h-3.5 w-3.5" />
          <span>Preview</span>
        </button>

        <button
          type="button"
          onClick={() => onViewModeChange("raw")}
          className={`flex items-center gap-1.5 rounded-[4px] px-2.5 py-1 text-xs font-mono transition-all cursor-pointer ${
            viewMode === "raw"
              ? "bg-surface text-primary font-medium shadow-sm"
              : "text-text-muted hover:text-text"
          }`}
        >
          <Code className="h-3.5 w-3.5" />
          <span>Raw .md</span>
        </button>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center gap-2">
        {isGenerating ? (
          <button
            type="button"
            onClick={onStop}
            className="inline-flex items-center gap-1.5 rounded-[6px] border border-danger/50 bg-danger-subtle px-2.5 py-1 text-xs font-mono text-danger hover:bg-danger/20 transition-colors cursor-pointer"
          >
            <Square className="h-3.5 w-3.5 fill-current" />
            <span>Stop</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={onRegenerate}
            disabled={!plan}
            className="inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-surface px-2.5 py-1 text-xs font-mono text-text hover:border-primary/50 hover:bg-surface-hover transition-colors disabled:opacity-40 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5 text-primary" />
            <span>Regenerate</span>
          </button>
        )}

        <button
          type="button"
          onClick={handleCopy}
          disabled={!plan}
          className="inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-surface px-2.5 py-1 text-xs font-mono text-text hover:border-primary/50 hover:bg-surface-hover transition-colors disabled:opacity-40 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" />
              <span className="text-primary font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5 text-text-muted" />
              <span>Copy Markdown</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={handleDownload}
          disabled={!plan}
          className="inline-flex items-center gap-1.5 rounded-[6px] bg-primary px-3 py-1 text-xs font-mono font-semibold text-canvas hover:bg-primary-hover active:scale-[0.99] transition-all disabled:opacity-40 cursor-pointer shadow-sm"
        >
          <Download className="h-3.5 w-3.5" />
          <span>Download .md</span>
        </button>
      </div>
    </div>
  );
}
