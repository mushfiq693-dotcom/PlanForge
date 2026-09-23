"use client";

import React, { useState } from "react";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { LintResult } from "@/lib/plan-lint";

interface PlanQualityPanelProps {
  lintResult: LintResult | null;
  isGenerating?: boolean;
  onRegenerateWithFixes?: (failedInstructions: string) => void;
}

export function PlanQualityPanel({
  lintResult,
  isGenerating = false,
  onRegenerateWithFixes,
}: PlanQualityPanelProps) {
  const [expanded, setExpanded] = useState(false);

  if (isGenerating || !lintResult) {
    return null;
  }

  const { passed, score, total, checks, failedInstructions } = lintResult;

  return (
    <div
      className={`shrink-0 rounded-[10px] border transition-all duration-200 mb-4 overflow-hidden ${
        passed
          ? "border-emerald-500/30 bg-emerald-500/[0.04]"
          : "border-amber-500/40 bg-amber-500/[0.05]"
      }`}
    >
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between p-3.5 gap-3">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-[6px] border ${
              passed
                ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400"
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}
          >
            {passed ? (
              <ShieldCheck className="h-4 w-4" />
            ) : (
              <AlertTriangle className="h-4 w-4" />
            )}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold font-sans text-white">
                Anti-Slop Quality Audit
              </span>
              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-medium ${
                  passed
                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                    : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                }`}
              >
                {score} / {total} Checks Passed
              </span>
            </div>
            <p className="text-[11px] text-text-muted font-sans mt-0.5">
              {passed
                ? "This blueprint strictly adheres to all Anti-Slop architectural rules."
                : `${total - score} quality defect${total - score > 1 ? "s" : ""} detected. Fixes can be automatically applied.`}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {!passed && onRegenerateWithFixes && (
            <button
              type="button"
              onClick={() => onRegenerateWithFixes(failedInstructions)}
              className="inline-flex items-center gap-1.5 rounded-[6px] bg-amber-500/15 border border-amber-500/40 hover:bg-amber-500/25 px-3 py-1.5 text-xs font-medium text-amber-300 transition-all cursor-pointer active:scale-[0.98]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Regenerate with Fixes</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 rounded-[6px] border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] px-2.5 py-1.5 text-xs font-medium text-text-muted hover:text-white transition-all cursor-pointer"
          >
            <span>{expanded ? "Hide Details" : "Inspect Checks"}</span>
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Expanded Details List */}
      {expanded && (
        <div className="border-t border-white/10 bg-black/30 p-3.5 space-y-2.5">
          {checks.map((check) => (
            <div
              key={check.id}
              className={`flex items-start justify-between rounded-[6px] border p-2.5 gap-3 text-xs ${
                check.passed
                  ? "border-emerald-500/20 bg-emerald-500/[0.02]"
                  : "border-amber-500/30 bg-amber-500/[0.04]"
              }`}
            >
              <div className="flex items-start gap-2.5">
                {check.passed ? (
                  <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-medium text-white font-sans">
                    {check.name}
                  </div>
                  <div className="text-[11px] text-text-muted mt-0.5 leading-relaxed">
                    {check.passed ? check.description : check.remediation}
                  </div>
                </div>
              </div>

              <span
                className={`text-[10px] font-mono px-2 py-0.5 rounded shrink-0 font-medium ${
                  check.passed
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-amber-500/10 text-amber-300 border border-amber-500/20"
                }`}
              >
                {check.passed ? "PASS" : "DEFECT"}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
