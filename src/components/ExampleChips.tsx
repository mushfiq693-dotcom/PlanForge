"use client";

import React from "react";
import { Database, BookOpen, Clock } from "lucide-react";
import { AdvancedOptionsValues } from "./AdvancedOptions";

export interface ExampleIdea {
  id: string;
  label: string;
  icon: React.ReactNode;
  idea: string;
  options?: Partial<AdvancedOptionsValues>;
}

export const EXAMPLE_IDEAS: ExampleIdea[] = [
  {
    id: "db-backup",
    label: "Automated DB Backups",
    icon: <Database className="h-3.5 w-3.5 text-primary" />,
    idea: "A lightweight automated backup service for PostgreSQL and SQLite databases that encrypts dumps, pushes them to Cloudflare R2 / AWS S3, and sends health alerts to a Discord webhook on failure.",
    options: {
      name: "SnapVault",
      targetUsers: "Indie hackers and solo developers running production databases",
      stack: "Next.js, Tailwind CSS, SQLite, Node.js cron",
      level: "intermediate",
      timeline: "weekend",
      mustHave: "S3 snapshot uploads, cron scheduling, Discord failure alerts",
      outOfScope: "Multi-cloud failover, team role permissions",
    },
  },
  {
    id: "flashcards",
    label: "Spaced Repetition Flashcards",
    icon: <BookOpen className="h-3.5 w-3.5 text-primary" />,
    idea: "A local-first Markdown flashcard app for medical students implementing the SuperMemo SM-2 spaced repetition algorithm, image occlusion masks, and offline study sessions with zero latency.",
    options: {
      name: "MedCards",
      targetUsers: "Medical students and high-volume memorizers",
      stack: "React, Vite, Tailwind CSS, IndexedDB (Dexie.js)",
      level: "intermediate",
      timeline: "2_weeks",
      mustHave: "SM-2 spaced repetition algorithm, markdown formatting, local IndexedDB storage",
      outOfScope: "Live collaborative study rooms, video uploads",
    },
  },
  {
    id: "freelance-timer",
    label: "Freelance Timer & Invoicing",
    icon: <Clock className="h-3.5 w-3.5 text-primary" />,
    idea: "A streamlined client time-tracker and invoice builder for freelance engineers with active project timers, billable rate calculations, customizable PDF export, and Stripe payment link embeds.",
    options: {
      name: "HourCraft",
      targetUsers: "Freelance developers, consultants, and contractors",
      stack: "Next.js, Tailwind CSS, Prisma, PostgreSQL",
      level: "intermediate",
      timeline: "2_weeks",
      mustHave: "Live task timer, client rate management, PDF invoice download",
      outOfScope: "Accounting software double-entry bookkeeping, payroll",
    },
  },
];

interface ExampleChipsProps {
  onSelect: (idea: string, options?: Partial<AdvancedOptionsValues>) => void;
  disabled?: boolean;
}

export function ExampleChips({ onSelect, disabled = false }: ExampleChipsProps) {
  return (
    <div className="flex flex-col gap-2 pt-1">
      <span className="text-[11px] font-mono text-text-muted">
        Quick examples:
      </span>

      <div className="flex flex-wrap gap-2">
        {EXAMPLE_IDEAS.map((item) => (
          <button
            key={item.id}
            type="button"
            disabled={disabled}
            onClick={() => onSelect(item.idea, item.options)}
            className="group inline-flex items-center gap-1.5 rounded-[6px] border border-border bg-surface px-2.5 py-1 text-xs font-mono text-text hover:border-primary/50 hover:bg-surface-hover active:bg-surface-active transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <span className="shrink-0 opacity-80 group-hover:opacity-100">{item.icon}</span>
            <span className="group-hover:text-primary transition-colors text-xs font-sans">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
