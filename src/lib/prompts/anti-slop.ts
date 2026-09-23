/**
 * Anti-Slop Blacklist & Rules Engine
 * Location: src/lib/prompts/anti-slop.ts
 *
 * Single source of truth for the 36-item Anti-Slop Blacklist.
 * Prevents generated plans and implementations from exhibiting generic, AI-generated aesthetics.
 */

export type AntiSlopCategory =
  | "Visual"
  | "Layout"
  | "Iconography and glyphs"
  | "Typography"
  | "Copy"
  | "Behavior and completeness";

export interface AntiSlopRule {
  id: number;
  category: AntiSlopCategory;
  rule: string;
}

export const ANTI_SLOP_RULES: readonly AntiSlopRule[] = [
  // Visual (1-12)
  {
    id: 1,
    category: "Visual",
    rule: "No harsh or decorative gradients (gradient washes, gradient text, gradient buttons/borders).",
  },
  {
    id: 2,
    category: "Visual",
    rule: "No pure white (#FFFFFF) page background. Use a deliberately tinted neutral.",
  },
  {
    id: 3,
    category: "Visual",
    rule: "No rainbow or multi-hue coloring. One accent color, used with restraint.",
  },
  {
    id: 4,
    category: "Visual",
    rule: "No purple-and-black default palette.",
  },
  {
    id: 5,
    category: "Visual",
    rule: "No neon colors.",
  },
  {
    id: 6,
    category: "Visual",
    rule: "No basic pastel palettes.",
  },
  {
    id: 7,
    category: "Visual",
    rule: "No radial glow orbs or blurred blob backgrounds.",
  },
  {
    id: 8,
    category: "Visual",
    rule: "No dot-grid or grid-pattern backgrounds used as decoration.",
  },
  {
    id: 9,
    category: "Visual",
    rule: "No liquid glass or glassmorphism panels unless the brief explicitly demands it.",
  },
  {
    id: 10,
    category: "Visual",
    rule: "No default drop shadow on every card. Separate with borders, spacing, or tone. If shadow is used, one system-wide, purposeful.",
  },
  {
    id: 11,
    category: "Visual",
    rule: "No one-size-fits-all soft corner radius. Radius follows hierarchy (controls, panels, modals differ).",
  },
  {
    id: 12,
    category: "Visual",
    rule: "No colored left-stripe or left-border accent on cards or callouts.",
  },

  // Layout (13-17)
  {
    id: 13,
    category: "Layout",
    rule: 'No "3 feature cards in a row" section.',
  },
  {
    id: 14,
    category: "Layout",
    rule: "No bento grid unless the content is genuinely heterogeneous.",
  },
  {
    id: 15,
    category: "Layout",
    rule: "No fake terminal window mockups as decoration.",
  },
  {
    id: 16,
    category: "Layout",
    rule: "No default 3-tier pricing table. Add pricing only if the product has pricing, structured by the real offering.",
  },
  {
    id: 17,
    category: "Layout",
    rule: "No generic hero (big headline, subtext, two buttons, gradient). Open with the most characteristic thing from the product's world: a live demo, real output, real data, or a specific interactive moment.",
  },

  // Iconography and glyphs (18-22)
  {
    id: 18,
    category: "Iconography and glyphs",
    rule: "No default Lucide icon set as decoration. Icons only where they carry meaning; prefer a distinct style or none.",
  },
  {
    id: 19,
    category: "Iconography and glyphs",
    rule: "No emojis as UI icons or bullets.",
  },
  {
    id: 20,
    category: "Iconography and glyphs",
    rule: 'No sparkle or magic-wand icons for "AI" features.',
  },
  {
    id: 21,
    category: "Iconography and glyphs",
    rule: "No checkmark-bullet feature lists.",
  },
  {
    id: 22,
    category: "Iconography and glyphs",
    rule: "No animated arrows (sliding on hover, or an arrow appended to every link or button).",
  },

  // Typography (23-26)
  {
    id: 23,
    category: "Typography",
    rule: "No default Inter, Geist, or Space Grotesk. Choose a deliberate family for this brief.",
  },
  {
    id: 24,
    category: "Typography",
    rule: "No ALL-CAPS tracked-out eyebrow labels above headings.",
  },
  {
    id: 25,
    category: "Typography",
    rule: "No accenting a single word in a headline with color or italic.",
  },
  {
    id: 26,
    category: "Typography",
    rule: "No monospace face for small labels or data purely as decoration.",
  },

  // Copy (27-30)
  {
    id: 27,
    category: "Copy",
    rule: "No em dashes in UI or marketing copy.",
  },
  {
    id: 28,
    category: "Copy",
    rule: 'No "It\'s not X, it\'s Y" phrasing or similar contrast-formula sentences.',
  },
  {
    id: 29,
    category: "Copy",
    rule: "No fake testimonials, fake logos, fake stats, or fake user counts. If none exist, omit the section.",
  },
  {
    id: 30,
    category: "Copy",
    rule: "No filler words such as seamless, supercharge, unlock, elevate, revolutionize.",
  },

  // Behavior and completeness (31-36)
  {
    id: 31,
    category: "Behavior and completeness",
    rule: "No hover animation on every card or button. Motion must answer a user action or draw attention once.",
  },
  {
    id: 32,
    category: "Behavior and completeness",
    rule: "No fade-and-slide-up entrance on every section.",
  },
  {
    id: 33,
    category: "Behavior and completeness",
    rule: "Loading states use skeleton loaders shaped like the real content. No bare spinners.",
  },
  {
    id: 34,
    category: "Behavior and completeness",
    rule: "The site shows a real product demo (screenshot, live widget, or real sample output). No abstract illustration in its place.",
  },
  {
    id: 35,
    category: "Behavior and completeness",
    rule: "Terms of Service and Privacy Policy pages exist (real content, linked in footer) for any product with accounts or user data.",
  },
  {
    id: 36,
    category: "Behavior and completeness",
    rule: "Empty and error states give direction: what happened and what to do next.",
  },
] as const;

export const ANTI_SLOP_START_MARKER = "<!-- ANTI-SLOP-BLACKLIST-START -->";
export const ANTI_SLOP_END_MARKER = "<!-- ANTI-SLOP-BLACKLIST-END -->";

/**
 * Builds the grouped Markdown string of all 36 Anti-Slop rules enclosed in standard boundary markers.
 */
function buildAntiSlopMarkdown(): string {
  const categories: AntiSlopCategory[] = [
    "Visual",
    "Layout",
    "Iconography and glyphs",
    "Typography",
    "Copy",
    "Behavior and completeness",
  ];

  const lines: string[] = [
    ANTI_SLOP_START_MARKER,
    "### ANTI-SLOP BLACKLIST (36 Strict Architectural Prohibitions)",
    "",
  ];

  for (const category of categories) {
    lines.push(`**${category}**`);
    const categoryRules = ANTI_SLOP_RULES.filter((r) => r.category === category);
    for (const rule of categoryRules) {
      lines.push(`${rule.id}. ${rule.rule}`);
    }
    lines.push("");
  }

  lines.push(ANTI_SLOP_END_MARKER);
  return lines.join("\n").trim();
}

export const ANTI_SLOP_BLACKLIST_MARKDOWN = buildAntiSlopMarkdown();
