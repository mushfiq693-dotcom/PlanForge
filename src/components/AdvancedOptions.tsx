"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { ExperienceLevel, Timeline } from "@/features/generate/schema";

export interface AdvancedOptionsValues {
  name: string;
  targetUsers: string;
  stack: string;
  level: ExperienceLevel | "";
  timeline: Timeline | "";
  mustHave: string;
  outOfScope: string;
}

interface AdvancedOptionsProps {
  values: AdvancedOptionsValues;
  onChange: (values: AdvancedOptionsValues) => void;
  disabled?: boolean;
}

export function AdvancedOptions({
  values,
  onChange,
  disabled = false,
}: AdvancedOptionsProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (
    field: keyof AdvancedOptionsValues,
    val: string
  ) => {
    onChange({
      ...values,
      [field]: val,
    });
  };

  const hasConfiguredValues = Boolean(
    values.name ||
      values.targetUsers ||
      values.stack ||
      values.level ||
      values.timeline ||
      values.mustHave ||
      values.outOfScope
  );

  return (
    <div className="rounded-[6px] border border-border bg-surface/50 transition-colors">
      <button
        type="button"
        id="advanced-options-toggle"
        aria-expanded={isOpen}
        aria-controls="advanced-options-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-3 text-left font-mono text-xs text-text-muted hover:text-text transition-colors"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-text">Advanced Context (Optional)</span>
          {hasConfiguredValues && (
            <span className="rounded bg-primary/15 border border-primary/30 px-1.5 py-0.2 text-[10px] text-primary font-mono">
              Customized
            </span>
          )}
        </span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-text-muted" />
        ) : (
          <ChevronDown className="h-4 w-4 text-text-muted" />
        )}
      </button>

      {isOpen && (
        <div
          id="advanced-options-panel"
          className="border-t border-border p-3.5 space-y-3.5 font-sans text-xs animate-in fade-in-50 duration-150"
        >
          {/* Row 1: Project Name & Target Users */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="adv-project-name"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Project Name
              </label>
              <input
                id="adv-project-name"
                type="text"
                disabled={disabled}
                placeholder="e.g. PlanForge"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="adv-target-users"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Target Users
              </label>
              <input
                id="adv-target-users"
                type="text"
                disabled={disabled}
                placeholder="e.g. Indie hackers, students, freelancers"
                value={values.targetUsers}
                onChange={(e) => handleChange("targetUsers", e.target.value)}
                maxLength={500}
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 2: Stack, Level, Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label
                htmlFor="adv-stack"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Preferred Stack
              </label>
              <input
                id="adv-stack"
                type="text"
                disabled={disabled}
                placeholder="e.g. Next.js, Tailwind, SQLite"
                value={values.stack}
                onChange={(e) => handleChange("stack", e.target.value)}
                maxLength={500}
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="adv-level"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Experience Level
              </label>
              <select
                id="adv-level"
                disabled={disabled}
                value={values.level}
                onChange={(e) =>
                  handleChange("level", e.target.value as ExperienceLevel | "")
                }
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-sans"
              >
                <option value="">Let AI decide</option>
                <option value="beginner">Beginner (Extra comments & guidance)</option>
                <option value="intermediate">Intermediate (Standard modern patterns)</option>
                <option value="advanced">Advanced (High-performance & modular)</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="adv-timeline"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Timeline Target
              </label>
              <select
                id="adv-timeline"
                disabled={disabled}
                value={values.timeline}
                onChange={(e) =>
                  handleChange("timeline", e.target.value as Timeline | "")
                }
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-sans"
              >
                <option value="">Let AI decide</option>
                <option value="weekend">Weekend Sprint (Ultra-tight MVP)</option>
                <option value="2_weeks">2 Weeks (Complete vertical slices)</option>
                <option value="1_month">1 Month (Production-ready with tests)</option>
                <option value="open">Open / Flexible</option>
              </select>
            </div>
          </div>

          {/* Row 3: Must-Have Features & Out of Scope */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="adv-must-have"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Must-Have Features
              </label>
              <textarea
                id="adv-must-have"
                rows={2}
                disabled={disabled}
                placeholder="e.g. Export to Markdown, live preview, rate limiting"
                value={values.mustHave}
                onChange={(e) => handleChange("mustHave", e.target.value)}
                maxLength={2000}
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label
                htmlFor="adv-out-of-scope"
                className="block font-mono text-[11px] text-text-muted mb-1"
              >
                Out of Scope (v1)
              </label>
              <textarea
                id="adv-out-of-scope"
                rows={2}
                disabled={disabled}
                placeholder="e.g. User accounts, payment processing, multi-tenant teams"
                value={values.outOfScope}
                onChange={(e) => handleChange("outOfScope", e.target.value)}
                maxLength={2000}
                className="w-full rounded-[6px] border border-border bg-canvas p-2 text-xs text-text placeholder:text-text-muted/50 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
