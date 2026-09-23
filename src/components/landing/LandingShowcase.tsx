"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Copy, Check, FileText } from "lucide-react";

const tabs = [
  {
    id: "overview",
    name: "0. Overview & PRD",
    content: `# IMPLEMENTATION_PLAN.md: DevBookmark Pro

## SECTION 0: PROJECT SNAPSHOT
- **Project Name:** DevBookmark Pro
- **One-Line Pitch:** A keyboard-first developer bookmark manager with auto-tagging, full-text search, and local SQLite export.
- **Target User:** Senior software engineers & technical researchers managing 1000+ code snippets & docs.
- **Primary Success Metric:** Sub-50ms search response time across 5,000 saved bookmarks.

## SECTION 1: PRD
### Problem Statement
Developers save hundreds of links across browsers, Slack, and notes, but retrieve fewer than 5% due to poor search and disorganized tagging.

### MVP User Stories
- [x] As a dev, I can paste a URL and have metadata + auto-generated tags extracted.
- [x] As a dev, I can filter by tags with instant keyboard shortcuts (Cmd+K).`,
  },
  {
    id: "architecture",
    name: "2. ASCII Architecture",
    content: `## SECTION 2: SYSTEM ARCHITECTURE & DATA FLOW

\`\`\`
+------------------+         +------------------+
|   Next.js UI     | <-----> |   App Router     |
|   (Client Side)  |         |   /api/bookmarks |
+------------------+         +------------------+
        |                             |
        v                             v
+------------------+         +------------------+
|   TanStack Query |         |   Prisma / ORM   |
|   (Cache Layer)  |         |   (PostgreSQL)   |
+------------------+         +------------------+
        |                             |
        +-------------> + <-----------+
                        |
                        v
              +-------------------+
              |  Local IndexedDB  |
              |  (Offline Cache)  |
              +-------------------+
\`\`\`

### Architectural Rules
1. Server Components for static layouts; Client Components for search state.
2. Full-text search performed via pgvector / sqlite fts5 index.`,
  },
  {
    id: "tasks",
    name: "6. Vertical Tasks",
    content: `## SECTION 6: PHASE-BY-PHASE TASK CHECKLIST

### Phase 1: Foundation & Data Layer
- [ ] **TASK-001: Project Setup and Tailwind Config**
  - **Files:** \`package.json\`, \`tailwind.config.ts\`, \`src/styles/tokens.css\`
  - **Acceptance Criteria:** Strict TS mode passes, dev server starts on :3000 without errors.

- [ ] **TASK-002: Bookmark Schema & SQLite Migration**
  - **Files:** \`prisma/schema.prisma\`, \`src/lib/db.ts\`
  - **Acceptance Criteria:** Database migration runs cleanly; Bookmark entity stores URL, title, tags.

### Phase 2: Core Feature Slices
- [ ] **TASK-003: URL Parser & Metadata Extraction Service**
  - **Files:** \`src/services/metadata.ts\`, \`src/app/api/parse/route.ts\`
  - **Acceptance Criteria:** Given URL, extracts OpenGraph title, description, and favicon.`,
  },
  {
    id: "prompts",
    name: "12. Kickoff Prompts",
    content: `## SECTION 12: AGENT KICKOFF PROMPTS

### Context Loading Prompt (Antigravity / Claude Code)
\`\`\`text
You are an expert full-stack engineer. Read the entire IMPLEMENTATION_PLAN.md carefully.
Understand the PRD, architecture, design tokens, and task checklist.
Do NOT write any application code yet.
Confirm your understanding by listing:
1. The 3 main technical constraints
2. The exact files to be created in TASK-001
3. Confirmation that you will follow the git commit conventions in Section 4.
\`\`\`

### Prompt for TASK-001
\`\`\`text
Execute TASK-001 from IMPLEMENTATION_PLAN.md:
- Task: Project Setup and Tailwind Config
- Files to touch: package.json, tailwind.config.ts, src/styles/tokens.css
- Acceptance Criteria: dev server boots cleanly with zero typescript errors.
\`\`\``,
  },
];

export function LandingShowcase() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [copied, setCopied] = useState(false);

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentTab.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="blueprint" className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs text-text-muted backdrop-blur-xl mb-4 shadow-sm">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-text font-medium">13-Section Specification</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-text font-sans leading-tight">
            Inspect the Blueprint Output
          </h2>
          <p className="mt-5 text-base sm:text-lg text-text-muted/90 font-sans leading-relaxed">
            See how PlanForge turns a simple sentence into a comprehensive, agent-ready specification file.
          </p>
        </div>

        {/* Blueprint Viewer Card */}
        <div className="rounded-[20px] border border-white/10 bg-surface/60 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-white/10 bg-white/[0.02] p-4 sm:px-6 gap-4">
            {/* Pill Tab Selector */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] p-1 backdrop-blur-xl overflow-x-auto max-w-full">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white/[0.12] text-white border border-white/15 shadow-sm"
                      : "text-text-muted hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Action Pills */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/20 px-4 py-1.5 text-xs sm:text-sm font-medium text-text-muted hover:text-white transition-all cursor-pointer active:scale-[0.98]"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-primary" />
                    <span className="text-primary font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span>Copy Section</span>
                  </>
                )}
              </button>

              <Link
                href="/app"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 px-5 py-1.5 text-xs sm:text-sm font-medium text-text transition-all backdrop-blur-xl group cursor-pointer active:scale-[0.98]"
              >
                <span className="flex h-1.5 w-1.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
                </span>
                <span className="text-text group-hover:text-primary transition-colors">Forge Yours</span>
                <ArrowRight className="h-3.5 w-3.5 text-text-muted group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Clean Markdown Code Content */}
          <div className="p-6 sm:p-8 overflow-x-auto max-h-[460px] bg-black/40 backdrop-blur-md font-mono text-xs sm:text-[13px] text-zinc-200 leading-relaxed sm:leading-7">
            <pre className="whitespace-pre-wrap">{currentTab.content}</pre>
          </div>

          {/* Footer Bar */}
          <div className="border-t border-white/10 bg-white/[0.02] px-6 sm:px-8 py-4 flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-text-muted gap-3">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span>Full output contains all 13 sections (~3,000+ tokens)</span>
            </div>
            <Link
              href="/app"
              className="inline-flex items-center gap-1.5 text-text-muted hover:text-primary transition-colors"
            >
              <span>Generate your plan in Workspace</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
