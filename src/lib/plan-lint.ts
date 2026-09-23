/**
 * PlanForge Anti-Slop Plan Linter
 * Location: src/lib/plan-lint.ts
 *
 * Lightweight, deterministic, framework-free linter that checks generated plans
 * against the 6 core Anti-Slop guarantees without calling any LLM.
 */

import { ANTI_SLOP_START_MARKER, ANTI_SLOP_END_MARKER } from "./prompts/anti-slop";

export interface LintCheck {
  id: string;
  name: string;
  description: string;
  passed: boolean;
  remediation: string;
}

export interface LintResult {
  passed: boolean;
  score: number;
  total: number;
  checks: LintCheck[];
  failedInstructions: string;
}

/**
 * Strips the verbatim Anti-Slop Blacklist block from the plan
 * so checks (like em dash detection) don't trigger on the blacklist itself.
 */
function extractBodyWithoutBlacklist(markdown: string): string {
  const startIdx = markdown.indexOf(ANTI_SLOP_START_MARKER);
  const endIdx = markdown.indexOf(ANTI_SLOP_END_MARKER);

  if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
    return (
      markdown.slice(0, startIdx) +
      markdown.slice(endIdx + ANTI_SLOP_END_MARKER.length)
    );
  }

  return markdown;
}

/**
 * Check 1: Verifies the Anti-Slop Blacklist is present between markers.
 */
function checkBlacklistPresent(markdown: string): LintCheck {
  const hasStart = markdown.includes(ANTI_SLOP_START_MARKER);
  const hasEnd = markdown.includes(ANTI_SLOP_END_MARKER);
  const passed = hasStart && hasEnd;

  return {
    id: "blacklist-present",
    name: "Anti-Slop Blacklist Verbatim Block",
    description: "Plan must contain the 36-item Anti-Slop Blacklist enclosed within START and END markers.",
    passed,
    remediation: "Include the full Anti-Slop Blacklist verbatim inside Section 3 (Design System) between <!-- ANTI-SLOP-BLACKLIST-START --> and <!-- ANTI-SLOP-BLACKLIST-END -->.",
  };
}

/**
 * Check 2: Verifies no em dash (—) characters appear outside the blacklist block.
 */
function checkNoEmDashes(markdown: string): LintCheck {
  const body = extractBodyWithoutBlacklist(markdown);
  const hasEmDash = body.includes("—") || body.includes("\u2014");

  return {
    id: "no-em-dashes",
    name: "No Em Dashes in Plan Body",
    description: "Plan copy must not use em dashes (—) outside the blacklist definition.",
    passed: !hasEmDash,
    remediation: "Remove all em dashes (—) from the plan copy. Use parentheses, colons, or standard hyphens instead.",
  };
}

/**
 * Check 3: Verifies the presence of an Anti-Slop audit task.
 */
function checkAntiSlopAuditTask(markdown: string): LintCheck {
  const body = extractBodyWithoutBlacklist(markdown);
  const auditRegex = /anti-slop\s+(?:audit|compliance|check)|anti\s+slop\s+audit/i;
  const passed = auditRegex.test(body);

  return {
    id: "anti-slop-audit-task",
    name: "Anti-Slop Final Audit Task",
    description: "Tasks must include a dedicated Anti-Slop audit task to evaluate the final UI against the 36 rules.",
    passed,
    remediation: "Add an explicit 'TASK: Anti-Slop Audit & Polish' in the final verification phase of the task checklist.",
  };
}

/**
 * Check 4: Verifies the presence of a Skeleton Loader task.
 */
function checkSkeletonLoaderTask(markdown: string): LintCheck {
  const body = extractBodyWithoutBlacklist(markdown);
  const skeletonRegex = /skeleton[- ](?:loader|loading|state|component)|skeleton/i;
  const passed = skeletonRegex.test(body);

  return {
    id: "skeleton-loader-task",
    name: "Skeleton Loader Task",
    description: "Tasks must include a skeleton loader implementation task shaped like the real content (no bare spinners).",
    passed,
    remediation: "Add a task specifically implementing custom skeleton loaders shaped like the real UI content for all loading states.",
  };
}

/**
 * Check 5: Verifies the design section does not rely on banned generic vibe words as the sole direction.
 */
function checkOpinionatedDesignDirection(markdown: string): LintCheck {
  // Extract Section 3 (Design System) if possible
  const section3Match = markdown.match(/##\s*3\.?\s*DESIGN SYSTEM[\s\S]*?(?=##\s*4|\n---\s*\n|$)/i);
  const designText = section3Match ? section3Match[0] : markdown;

  // Check if aesthetic direction is purely generic without domain rationale
  const genericOnlyRegex = /Aesthetic\s*Direction[\s\S]{0,120}?(?:modern,\s*clean,\s*minimal|modern\s*and\s*clean|minimal\s*and\s*modern)/i;
  const isGeneric = genericOnlyRegex.test(designText);

  // Check if a named direction exists (e.g. "Named Direction:", "Aesthetic Direction:")
  const hasDirectionHeading = /Aesthetic\s*Direction|Named\s*Direction|Subject\s*Anchor/i.test(designText);

  const passed = hasDirectionHeading && !isGeneric;

  return {
    id: "opinionated-design-direction",
    name: "Opinionated Design Direction (No Generic Vibe Words)",
    description: "Design system must specify a concrete, named aesthetic direction anchored in domain vocabulary, not generic 'modern/clean/minimal'.",
    passed,
    remediation: "Replace generic vibe words like 'modern, clean, minimal' with a named, opinionated aesthetic direction and domain anchor rationale in Section 3.",
  };
}

/**
 * Check 6: Verifies at least 4 named hex color codes exist.
 */
function checkHexColorTokens(markdown: string): LintCheck {
  const hexMatches = markdown.match(/#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b/g) || [];
  const uniqueHex = new Set(hexMatches.map((h) => h.toUpperCase()));
  const passed = uniqueHex.size >= 4;

  return {
    id: "hex-color-tokens",
    name: "Concrete Hex Color Tokens (>= 4 unique colors)",
    description: "Design system must provide at least 4 concrete, named hex color values.",
    passed,
    remediation: "Provide at least 4 unique, concrete hex color codes (e.g. Canvas, Surface, Primary Accent, Text, Border) in Section 3.",
  };
}

/**
 * Evaluates a markdown implementation plan against all 6 Anti-Slop lint checks.
 */
export function lintPlan(markdown: string): LintResult {
  if (!markdown || typeof markdown !== "string" || markdown.trim().length === 0) {
    const defaultChecks: LintCheck[] = [
      {
        id: "blacklist-present",
        name: "Anti-Slop Blacklist Verbatim Block",
        description: "Plan must contain the 36-item Anti-Slop Blacklist.",
        passed: false,
        remediation: "Generate a complete plan.",
      },
      {
        id: "no-em-dashes",
        name: "No Em Dashes in Plan Body",
        description: "Plan copy must not use em dashes outside blacklist.",
        passed: false,
        remediation: "Generate a complete plan.",
      },
      {
        id: "anti-slop-audit-task",
        name: "Anti-Slop Final Audit Task",
        description: "Tasks must include a dedicated Anti-Slop audit task.",
        passed: false,
        remediation: "Generate a complete plan.",
      },
      {
        id: "skeleton-loader-task",
        name: "Skeleton Loader Task",
        description: "Tasks must include a skeleton loader implementation task.",
        passed: false,
        remediation: "Generate a complete plan.",
      },
      {
        id: "opinionated-design-direction",
        name: "Opinionated Design Direction",
        description: "Design system must specify a concrete aesthetic direction.",
        passed: false,
        remediation: "Generate a complete plan.",
      },
      {
        id: "hex-color-tokens",
        name: "Concrete Hex Color Tokens (>= 4)",
        description: "Design system must provide at least 4 concrete hex color values.",
        passed: false,
        remediation: "Generate a complete plan.",
      },
    ];

    return {
      passed: false,
      score: 0,
      total: defaultChecks.length,
      checks: defaultChecks,
      failedInstructions: "The generated plan was empty. Please generate a complete plan.",
    };
  }

  const checks: LintCheck[] = [
    checkBlacklistPresent(markdown),
    checkNoEmDashes(markdown),
    checkAntiSlopAuditTask(markdown),
    checkSkeletonLoaderTask(markdown),
    checkOpinionatedDesignDirection(markdown),
    checkHexColorTokens(markdown),
  ];

  const passedCount = checks.filter((c) => c.passed).length;
  const failedChecks = checks.filter((c) => !c.passed);

  const failedInstructions = failedChecks.length > 0
    ? failedChecks.map((fc, i) => `${i + 1}. [${fc.name}]: ${fc.remediation}`).join("\n")
    : "";

  return {
    passed: failedChecks.length === 0,
    score: passedCount,
    total: checks.length,
    checks,
    failedInstructions,
  };
}
