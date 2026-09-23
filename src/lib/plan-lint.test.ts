import { describe, it, expect } from "vitest";
import { lintPlan } from "./plan-lint";
import { ANTI_SLOP_BLACKLIST_MARKDOWN } from "./prompts/anti-slop";

const VALID_PLAN_FIXTURE = `# IMPLEMENTATION_PLAN.md -- DevBookmark Pro

## 0. PROJECT SNAPSHOT
- Project Name: DevBookmark Pro
- Target: Senior Engineers

## 1. PRD
### 1.1 Problem Statement
Engineers lose bookmarks across different browsers.

## 2. ARCHITECTURE
### 2.1 Stack
Next.js, Tailwind, SQLite, Prisma.

## 3. DESIGN SYSTEM
### 3.1 Subject Anchor
- Industry & Audience Vocabulary: Monospace code terminals and keyboard shortcuts for developers.

### 3.2 Aesthetic Direction
- Named Direction: High-Density Monospace Terminal
- Rationale: Optimized for rapid keyboard-driven navigation.

### 3.3 Color Tokens (Hex)
- Canvas: #0E1116
- Surface: #161B22
- Primary Accent: #3FB6A8
- Border: #2A313C
- Text: #E6EDF3

### 3.4 Typography
- Font Families: Inter, JetBrains Mono

### 3.5 Layout
- Single-page command palette with split preview.

### 3.6 Spacing
- 4px, 8px, 16px, 24px

### 3.7 Components & States
- Skeleton loaders for bookmark fetch.

### 3.10 Anti-Slop Blacklist
${ANTI_SLOP_BLACKLIST_MARKDOWN}

---

## 4. RULES
- Follow the Anti-Slop Blacklist. Any violation is a defect.

## 6. PHASED TASK LIST
- [ ] TASK-001: Baseline Setup
- [ ] TASK-002: Design Tokens & CSS Variables (must precede UI)
- [ ] TASK-003: Core Bookmark Schema
- [ ] TASK-004: Custom Skeleton Loaders for Data Slices
- [ ] TASK-005: Terms of Service and Privacy Policy Pages
- [ ] TASK-006: Anti-Slop Audit and Compliance Check
`;

describe("plan-lint", () => {
  it("passes all 6 checks on a fully compliant plan", () => {
    const result = lintPlan(VALID_PLAN_FIXTURE);

    expect(result.passed).toBe(true);
    expect(result.score).toBe(6);
    expect(result.total).toBe(6);
    expect(result.checks.every((c) => c.passed)).toBe(true);
    expect(result.failedInstructions).toBe("");
  });

  it("fails Check 1 when Anti-Slop Blacklist markers are missing", () => {
    const invalidPlan = VALID_PLAN_FIXTURE.replace(
      ANTI_SLOP_BLACKLIST_MARKDOWN,
      "No blacklist provided."
    );

    const result = lintPlan(invalidPlan);
    const check1 = result.checks.find((c) => c.id === "blacklist-present");

    expect(result.passed).toBe(false);
    expect(check1?.passed).toBe(false);
    expect(result.failedInstructions).toContain("Anti-Slop Blacklist Verbatim Block");
  });

  it("fails Check 2 when an em dash (—) is used in the plan body", () => {
    const invalidPlan = VALID_PLAN_FIXTURE.replace(
      "Next.js, Tailwind, SQLite, Prisma.",
      "Next.js, Tailwind — with SQLite and Prisma."
    );

    const result = lintPlan(invalidPlan);
    const check2 = result.checks.find((c) => c.id === "no-em-dashes");

    expect(result.passed).toBe(false);
    expect(check2?.passed).toBe(false);
    expect(result.failedInstructions).toContain("No Em Dashes in Plan Body");
  });

  it("passes Check 2 even when the blacklist itself mentions em dashes", () => {
    // The blacklist contains rule 27: "No em dashes in UI or marketing copy."
    // It should not trigger Check 2 because it is inside the blacklist block.
    const result = lintPlan(VALID_PLAN_FIXTURE);
    const check2 = result.checks.find((c) => c.id === "no-em-dashes");
    expect(check2?.passed).toBe(true);
  });

  it("fails Check 3 when the Anti-Slop audit task is missing", () => {
    const invalidPlan = VALID_PLAN_FIXTURE.replace(
      "- [ ] TASK-006: Anti-Slop Audit and Compliance Check",
      "- [ ] TASK-006: Final Review"
    );

    const result = lintPlan(invalidPlan);
    const check3 = result.checks.find((c) => c.id === "anti-slop-audit-task");

    expect(result.passed).toBe(false);
    expect(check3?.passed).toBe(false);
    expect(result.failedInstructions).toContain("Anti-Slop Final Audit Task");
  });

  it("fails Check 4 when the skeleton loader task is missing", () => {
    const invalidPlan = VALID_PLAN_FIXTURE.replace(
      "- [ ] TASK-004: Custom Skeleton Loaders for Data Slices",
      "- [ ] TASK-004: Spinner states"
    ).replace("Skeleton loaders for bookmark fetch.", "Spinners for bookmark fetch.");

    const result = lintPlan(invalidPlan);
    const check4 = result.checks.find((c) => c.id === "skeleton-loader-task");

    expect(result.passed).toBe(false);
    expect(check4?.passed).toBe(false);
    expect(result.failedInstructions).toContain("Skeleton Loader Task");
  });

  it("fails Check 5 when aesthetic direction uses generic vibe words as the sole direction", () => {
    const invalidPlan = VALID_PLAN_FIXTURE.replace(
      "Named Direction: High-Density Monospace Terminal",
      "Aesthetic Direction: modern, clean, minimal"
    );

    const result = lintPlan(invalidPlan);
    const check5 = result.checks.find((c) => c.id === "opinionated-design-direction");

    expect(result.passed).toBe(false);
    expect(check5?.passed).toBe(false);
    expect(result.failedInstructions).toContain("Opinionated Design Direction");
  });

  it("fails Check 6 when fewer than 4 unique hex color codes are provided", () => {
    const invalidPlan = VALID_PLAN_FIXTURE
      .replace("#161B22", "#0E1116")
      .replace("#3FB6A8", "#0E1116")
      .replace("#2A313C", "#0E1116")
      .replace("#E6EDF3", "#0E1116");

    const result = lintPlan(invalidPlan);
    const check6 = result.checks.find((c) => c.id === "hex-color-tokens");

    expect(result.passed).toBe(false);
    expect(check6?.passed).toBe(false);
    expect(result.failedInstructions).toContain("Concrete Hex Color Tokens");
  });

  it("handles empty or blank plan gracefully", () => {
    const result = lintPlan("");
    expect(result.passed).toBe(false);
    expect(result.score).toBe(0);
    expect(result.total).toBe(6);
  });
});
