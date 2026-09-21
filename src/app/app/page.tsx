"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { IdeaForm } from "@/components/IdeaForm";
import { AdvancedOptions, AdvancedOptionsValues } from "@/components/AdvancedOptions";
import { PlanViewer } from "@/components/PlanViewer";
import { PlanActions } from "@/components/PlanActions";
import { EmptyState } from "@/components/states/EmptyState";
import { LoadingState } from "@/components/states/LoadingState";
import { ErrorState } from "@/components/states/ErrorState";
import { useGeneratePlan } from "@/features/generate/useGeneratePlan";
import { GeneratePlanRequest } from "@/features/generate/schema";
import { PlanForgeLogo } from "@/components/PlanForgeLogo";

const initialAdvancedOptions: AdvancedOptionsValues = {
  name: "",
  targetUsers: "",
  level: "",
};

export default function PlannerWorkspacePage() {
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
      level: advancedOptions.level || undefined,
    };
    generate(payload);
  };

  return (
    <div className="flex min-h-screen flex-col bg-transparent text-text font-sans">
      {/* Sleek Top Navigation Header */}
      <header className="border-b border-white/10 bg-surface/70 backdrop-blur-xl sticky top-0 z-30 px-4 py-3 sm:px-6 shadow-md shrink-0">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back to Home CTA */}
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5 text-xs font-sans font-medium text-text-muted hover:text-white hover:border-white/25 hover:bg-white/[0.08] transition-all"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Home</span>
            </Link>

            <div className="h-4 w-px bg-white/10 hidden sm:block" />

            <Link href="/" className="group inline-flex items-center">
              <PlanForgeLogo markSize={32} badgeText="Workspace" />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md px-3.5 py-1 text-xs font-sans font-medium text-text-muted">
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

      {/* Main Two-Pane Workspace (Desktop view is fixed bounded height, no infinite stretch) */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-start lg:h-[calc(100vh-100px)] lg:overflow-hidden">
        {/* Left Column: Input Specification (Fixed width, never expands vertically with right pane) */}
        <section
          aria-label="App Idea Input"
          className="w-full lg:w-[420px] xl:w-[460px] shrink-0 flex flex-col rounded-[16px] border border-white/10 bg-surface/70 backdrop-blur-2xl p-5 shadow-2xl lg:max-h-full lg:overflow-y-auto"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 shrink-0">
            <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider font-sans flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              App Specification
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
              {/* Collapsible Optional Context */}
              <AdvancedOptions
                values={advancedOptions}
                onChange={setAdvancedOptions}
                disabled={isGenerating}
              />
            </IdeaForm>
          </div>
        </section>

        {/* Right Column: Generated Plan View (Fixed flex height, content scrolls internally) */}
        <section
          aria-label="Generated Plan"
          className="flex flex-1 w-full h-full min-h-[520px] flex-col rounded-[16px] border border-white/10 bg-surface/70 backdrop-blur-2xl p-5 shadow-2xl overflow-hidden"
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

          {/* Dynamic State View Container */}
          <div className="flex flex-1 min-h-0 flex-col overflow-hidden">
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

      {/* Subtle Blueprint Footer */}
      <footer className="border-t border-white/10 bg-surface/40 backdrop-blur-md py-2.5 px-4 text-center text-xs font-sans text-text-muted/80 shrink-0">
        Crafted for modern development workflows &bull; Antigravity &bull; Claude Code
      </footer>
    </div>
  );
}
