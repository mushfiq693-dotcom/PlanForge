"use client";

import React, { useState } from "react";
import { Sparkles, Square, AlertCircle } from "lucide-react";

interface IdeaFormProps {
  idea: string;
  onIdeaChange: (value: string) => void;
  onSubmit: () => void;
  onStop?: () => void;
  isGenerating: boolean;
  error?: string | null;
  children?: React.ReactNode;
}

const MIN_CHARS = 30;
const MAX_CHARS = 6000;

export function IdeaForm({
  idea,
  onIdeaChange,
  onSubmit,
  onStop,
  isGenerating,
  error,
  children,
}: IdeaFormProps) {
  const [touched, setTouched] = useState(false);
  const charCount = idea.trim().length;

  const isTooShort = charCount > 0 && charCount < MIN_CHARS;
  const isTooLong = charCount > MAX_CHARS;
  const isValid = charCount >= MIN_CHARS && charCount <= MAX_CHARS;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (isValid && !isGenerating) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="idea-input"
            className="text-xs font-mono font-medium tracking-wide text-text uppercase flex items-center gap-1.5"
          >
            <span>Raw App Idea</span>
            <span className="text-text-muted lowercase font-normal">
              (describe core loop, users & features)
            </span>
          </label>
          <span
            className={`text-xs font-mono transition-colors ${
              isTooLong
                ? "text-danger font-semibold"
                : isTooShort
                ? "text-warning"
                : "text-text-muted"
            }`}
          >
            {charCount.toLocaleString()} / {MAX_CHARS.toLocaleString()} chars
          </span>
        </div>

        <div className="relative">
          <textarea
            id="idea-input"
            name="idea"
            rows={6}
            disabled={isGenerating}
            value={idea}
            onChange={(e) => {
              onIdeaChange(e.target.value);
              if (!touched) setTouched(true);
            }}
            placeholder="Paste your raw app idea here... e.g. A bookmark manager with automatic semantic tagging and full-text search across all saved articles, built for developers with local SQLite export..."
            className={`w-full rounded-[6px] border bg-canvas p-3.5 text-sm text-text placeholder:text-text-muted/60 focus:outline-none focus:ring-1 transition-all resize-y min-h-[140px] font-sans ${
              isTooLong || (touched && charCount > 0 && isTooShort)
                ? "border-danger focus:border-danger focus:ring-danger"
                : "border-border focus:border-primary focus:ring-primary"
            } ${isGenerating ? "opacity-60 cursor-not-allowed" : ""}`}
          />
        </div>

        {/* Validation Feedback */}
        {touched && charCount > 0 && isTooShort && (
          <p className="flex items-center gap-1.5 text-xs text-warning font-mono">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            Please enter at least {MIN_CHARS} characters ({MIN_CHARS - charCount} more needed for a high-quality plan).
          </p>
        )}

        {isTooLong && (
          <p className="flex items-center gap-1.5 text-xs text-danger font-mono">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            Idea exceeds maximum allowed length by {(charCount - MAX_CHARS).toLocaleString()} characters.
          </p>
        )}

        {error && (
          <div className="flex items-start gap-2 rounded-[6px] border border-danger/40 bg-danger-subtle p-3 text-xs text-danger font-mono">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}
      </div>

      {/* Children slots for ExampleChips and AdvancedOptions */}
      {children}

      {/* Action Controls */}
      <div className="flex items-center gap-3 pt-2">
        {isGenerating ? (
          <button
            type="button"
            onClick={onStop}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-[6px] border border-danger bg-danger/10 px-4 py-2.5 text-sm font-medium text-danger hover:bg-danger/20 active:bg-danger/30 transition-colors focus-visible:outline-2 focus-visible:outline-danger"
          >
            <Square className="h-4 w-4 fill-current" />
            Stop generating
          </button>
        ) : (
          <button
            type="submit"
            id="submit-plan-button"
            disabled={!isValid}
            aria-disabled={!isValid}
            className={`flex-1 inline-flex items-center justify-center gap-2 rounded-[6px] bg-primary px-4 py-2.5 text-sm font-semibold text-canvas transition-all shadow-sm ${
              isValid
                ? "hover:bg-primary-hover active:scale-[0.99] cursor-pointer"
                : "opacity-40 cursor-not-allowed"
            }`}
          >
            <Sparkles className="h-4 w-4" />
            Generate plan
          </button>
        )}
      </div>
    </form>
  );
}
