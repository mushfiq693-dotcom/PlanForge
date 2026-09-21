"use client";

import React, { useState } from "react";
import { IdeaForm } from "@/components/IdeaForm";
import { AdvancedOptions, AdvancedOptionsValues } from "@/components/AdvancedOptions";
import { ExampleChips } from "@/components/ExampleChips";
import { PlanViewer } from "@/components/PlanViewer";
import { PlanActions } from "@/components/PlanActions";
import { EmptyState } from "@/components/states/EmptyState";
import { LoadingState } from "@/components/states/LoadingState";
import { ErrorState } from "@/components/states/ErrorState";
import { useGeneratePlan } from "@/features/generate/useGeneratePlan";
import { GeneratePlanRequest } from "@/features/generate/schema";

const initialAdvancedOptions: AdvancedOptionsValues = {
  name: "",
  targetUsers: "",
  stack: "",
  level: "",
  timeline: "",
  mustHave: "",
  outOfScope: "",
};

export default function Home() {
  const [idea, setIdea] = useState("");
  const [advancedOptions, setAdvancedOptions] = useState<AdvancedOptionsValues>(initialAdvancedOptions);
  const [viewMode, setViewMode] = useState<"preview" | "raw">("preview");

  const {
    status,
    plan,
    error,
    errorCode,
    isGenerating,
    generate,
    stop,
  } = useGeneratePlan();

  const handleGenerate = () => {
    const payload: GeneratePlanRequest = {
      idea,
      name: advancedOptions.name || undefined,
      targetUsers: advancedOptions.targetUsers || undefined,
      stack: advancedOptions.stack || undefined,
      level: advancedOptions.level || undefined,
      timeline: advancedOptions.timeline || undefined,
      mustHave: advancedOptions.mustHave || undefined,
      outOfScope: advancedOptions.outOfScope || undefined,
    };
    generate(payload);
  };

  const handleSelectExample = (
    exampleIdea: string,
    options?: Partial<AdvancedOptionsValues>
  ) => {
    setIdea(exampleIdea);
    if (options) {
      setAdvancedOptions((prev) => ({
        ...prev,
        ...options,
      }));
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas text-text">
      {/* Blueprint Header */}
      <header className="border-b border-border bg-surface/80 backdrop-blur-sm sticky top-0 z-10 px-4 py-3 sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-[6px] bg-primary text-canvas font-mono font-bold text-sm shadow-sm">
              PF
            </div>
            <div>
              <h1 className="text-sm font-semibold tracking-tight text-text flex items-center gap-2">
                <span>PlanForge</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-surface border border-border text-text-muted font-mono font-normal">
                  v1.0
                </span>
              </h1>
              <p className="text-xs text-text-muted font-mono hidden sm:block">
                Idea-to-Implementation-Plan Generator &bull; AI Agent Engine
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-mono text-text-muted">
              <span
                className={`h-2 w-2 rounded-full ${
                  isGenerating
                    ? "bg-primary animate-ping"
                    : status === "error"
                    ? "bg-danger"
                    : "bg-primary"
                }`}
              />
              {status === "loading"
                ? "Connecting..."
                : status === "streaming"
                ? "Generating Plan..."
                : status === "error"
                ? "Generation Error"
                : "Engine Ready"}
            </span>
          </div>
        </div>
      </header>

      {/* Main Two-Pane Workspace */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-stretch">
        {/* Left Column: Input Specification */}
        <section
          aria-label="Input Specification Panel"
          className="flex flex-1 flex-col rounded-[10px] border border-border bg-surface p-5 lg:max-w-xl shadow-sm"
        >
          <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-text-muted font-semibold flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Input Specification
            </h2>
          </div>

          <div className="flex-1 flex flex-col justify-start">
            <IdeaForm
              idea={idea}
              onIdeaChange={setIdea}
              onSubmit={handleGenerate}
              onStop={stop}
              isGenerating={isGenerating}
              error={status === "error" && !plan ? error : null}
            >
              {/* Example Chips */}
              <ExampleChips
                onSelect={handleSelectExample}
                disabled={isGenerating}
              />

              {/* Collapsible Advanced Options */}
              <AdvancedOptions
                values={advancedOptions}
                onChange={setAdvancedOptions}
                disabled={isGenerating}
              />
            </IdeaForm>
          </div>
        </section>

        {/* Right Column: Live Generated Plan */}
        <section
          aria-label="Plan Output Preview Panel"
          className="flex flex-1 flex-col rounded-[10px] border border-border bg-surface p-5 min-h-[500px] shadow-sm"
        >
          {/* Plan Actions Bar (Copy, Download, Toggle, Regenerate) */}
          <PlanActions
            plan={plan}
            projectName={advancedOptions.name || undefined}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onRegenerate={handleGenerate}
            onStop={stop}
            isGenerating={isGenerating}
          />

          {/* Dynamic State View */}
          <div className="flex flex-1 flex-col">
            {status === "loading" && !plan ? (
              <LoadingState />
            ) : status === "error" && !plan ? (
              <ErrorState
                error={error || "An error occurred"}
                code={errorCode}
                onRetry={handleGenerate}
              />
            ) : plan ? (
              <PlanViewer
                content={plan}
                isStreaming={isGenerating}
                mode={viewMode}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
      </main>

      {/* Blueprint Footer */}
      <footer className="border-t border-border bg-surface/50 py-3 px-4 text-center text-xs font-mono text-text-muted">
        Crafted for AI Agent Workflows &bull; Cursor &bull; Claude Code
      </footer>
    </div>
  );
}
