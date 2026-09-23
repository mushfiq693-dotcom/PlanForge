"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, SlidersHorizontal } from "lucide-react";
import { ExperienceLevel } from "@/features/generate/schema";

export interface AdvancedOptionsValues {
  name: string;
  targetUsers: string;
  level: ExperienceLevel | "";
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
    (values.name && values.name.trim() !== "") ||
      (values.targetUsers && values.targetUsers.trim() !== "") ||
      Boolean(values.level)
  );

  return (
    <div className="rounded-[6px] border border-border bg-surface/50 transition-colors">
      <button
        type="button"
        id="advanced-options-toggle"
        aria-expanded={isOpen}
        aria-controls="advanced-options-panel"
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-2.5 text-left font-sans text-xs text-text-muted hover:text-text transition-colors cursor-pointer"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="h-3.5 w-3.5 text-primary" />
          <span className="font-medium text-text">Optional Context</span>
          {hasConfiguredValues && (
            <span className="rounded bg-primary/15 border border-primary/30 px-1.5 py-0.2 text-[10px] text-primary font-mono">
              Configured
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
          className="border-t border-border p-3.5 space-y-3 font-sans text-xs animate-in fade-in-50 duration-150"
        >
          {/* Row 1: Project Name & Target Users */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="adv-project-name"
                className="block font-medium text-[11px] text-text-muted mb-1"
              >
                Project Name
              </label>
              <input
                id="adv-project-name"
                type="text"
                disabled={disabled}
                placeholder="e.g. SnapVault"
                value={values.name}
                onChange={(e) => handleChange("name", e.target.value)}
                maxLength={100}
                className="w-full rounded-[6px] border border-border bg-canvas px-3 py-2 text-xs text-text placeholder:text-text-muted/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label
                htmlFor="adv-target-users"
                className="block font-medium text-[11px] text-text-muted mb-1"
              >
                Target Users
              </label>
              <input
                id="adv-target-users"
                type="text"
                disabled={disabled}
                placeholder="e.g. Solo developers, students"
                value={values.targetUsers}
                onChange={(e) => handleChange("targetUsers", e.target.value)}
                maxLength={500}
                className="w-full rounded-[6px] border border-border bg-canvas px-3 py-2 text-xs text-text placeholder:text-text-muted/40 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          {/* Row 2: Custom Modern Experience Level Dropdown */}
          <div>
            <label
              htmlFor="adv-level"
              className="block font-medium text-[11px] text-text-muted mb-1"
            >
              Experience Level
            </label>
            <div className="relative">
              <select
                id="adv-level"
                disabled={disabled}
                value={values.level}
                onChange={(e) =>
                  handleChange("level", e.target.value as ExperienceLevel | "")
                }
                className="w-full appearance-none rounded-[6px] border border-border bg-canvas px-3 py-2 pr-9 text-xs text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary font-sans cursor-pointer transition-colors"
              >
                <option value="" className="bg-surface text-text">Let AI decide (Recommended)</option>
                <option value="beginner" className="bg-surface text-text">Beginner: Extra explanation & starter-friendly setup</option>
                <option value="intermediate" className="bg-surface text-text">Intermediate: Standard modern design & architecture</option>
                <option value="advanced" className="bg-surface text-text">Advanced: Scalable architecture, testing & performance</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-text-muted">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
