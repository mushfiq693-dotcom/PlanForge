"use client";

import React from "react";
import Link from "next/link";

import { PlanForgeLogo } from "@/components/PlanForgeLogo";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/10 bg-surface/40 backdrop-blur-md py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <PlanForgeLogo markSize={28} showBadge={false} />
          <span className="text-xs text-text-muted font-sans hidden sm:inline">
            &bull; Idea to Blueprint Generator
          </span>
        </div>

        <div className="flex items-center gap-6 text-xs text-text-muted font-sans">
          <Link href="/app" className="hover:text-primary transition-colors">
            Planner App
          </Link>
          <span className="text-text-muted">
            Antigravity
          </span>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary transition-colors"
          >
            Claude Code
          </a>
        </div>
      </div>
      <div className="mt-6 text-center text-xs font-sans text-text-muted/60">
        Crafted for modern development workflows with Antigravity &amp; Claude Code.
      </div>
    </footer>
  );
}
